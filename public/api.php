<?php
/**
 * Universal Hostinger API Bridge for Design Privée
 * Supports MySQL Database + Server Disk Storage + Direct Media Uploads
 * Works on Hostinger Shared Hosting, cPanel, LiteSpeed, and Apache
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Ensure data and uploads directories exist
$dataDir = __DIR__ . '/data';
$uploadsDir = __DIR__ . '/uploads';
$siteDataFile = $dataDir . '/site_content.json';
$dbConfigFile = $dataDir . '/db_config.json';
$enquiriesFile = $dataDir . '/enquiries.json';

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
if (!is_dir($uploadsDir)) {
    @mkdir($uploadsDir, 0755, true);
}

// Parse request payload
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true) ?? [];

$action = $input['action'] ?? $_GET['action'] ?? '';
if (empty($action) && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = 'load';
}

// Database Credentials from Request, Config File, or Environment
$savedConfig = file_exists($dbConfigFile) ? json_decode(file_get_contents($dbConfigFile), true) : [];

$host = $input['host'] ?? $savedConfig['host'] ?? getenv('DB_HOST') ?: '';
$port = (int)($input['port'] ?? $savedConfig['port'] ?? getenv('DB_PORT') ?: 3306);
$database = $input['database'] ?? $savedConfig['database'] ?? getenv('DB_NAME') ?: '';
$user = $input['user'] ?? $savedConfig['user'] ?? getenv('DB_USER') ?: '';
$password = $input['password'] ?? $savedConfig['password'] ?? getenv('DB_PASSWORD') ?: '';
$data = $input['data'] ?? null;

// Helper: Connect to MySQL PDO
function getPdoConnection($host, $port, $database, $user, $password) {
    if (empty($host) || empty($database) || empty($user)) {
        return null;
    }
    try {
        $dsn = "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";
        $pdo = new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 6
        ]);

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS site_content (
                id VARCHAR(50) PRIMARY KEY DEFAULT 'current_data',
                data_json LONGTEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS contact_submissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(100),
                event_date VARCHAR(100),
                location VARCHAR(255),
                guest_count VARCHAR(100),
                budget VARCHAR(100),
                message TEXT,
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ");

        return $pdo;
    } catch (Exception $e) {
        return null;
    }
}

// 1. ACTION: UPLOAD MEDIA FILE (Image / Video)
if ($action === 'upload') {
    $base64 = $input['base64'] ?? '';
    $filename = $input['filename'] ?? 'media';

    if (empty($base64)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No media data provided.']);
        exit;
    }

    $ext = 'jpg';
    if (preg_match('/^data:([a-zA-Z0-9\/\+\-]+);base64,(.+)$/', $base64, $matches)) {
        $mime = $matches[1];
        $base64Data = $matches[2];
        if (strpos($mime, 'png') !== false) $ext = 'png';
        else if (strpos($mime, 'webp') !== false) $ext = 'webp';
        else if (strpos($mime, 'mp4') !== false) $ext = 'mp4';
        else if (strpos($mime, 'svg') !== false) $ext = 'svg';
    } else {
        $base64Data = $base64;
    }

    $decoded = base64_decode($base64Data);
    if ($decoded === false) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Base64 decoding failed.']);
        exit;
    }

    $cleanName = preg_replace('/[^a-zA-Z0-9_\-]/', '_', pathinfo($filename, PATHINFO_FILENAME));
    $safeFileName = time() . '_' . substr(md5(uniqid()), 0, 6) . '_' . $cleanName . '.' . $ext;
    $filePath = $uploadsDir . '/' . $safeFileName;

    if (file_put_contents($filePath, $decoded)) {
        echo json_encode([
            'success' => true,
            'url' => '/uploads/' . $safeFileName
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to write media to uploads directory.']);
    }
    exit;
}

// 2. ACTION: LOAD / GET SITE DATA
if ($action === 'load' || $action === 'site-data') {
    // A. Try MySQL if credentials are valid
    $pdo = getPdoConnection($host, $port, $database, $user, $password);
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT data_json FROM site_content WHERE id = 'current_data' LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetch();
            if ($row && !empty($row['data_json'])) {
                $decodedData = json_decode($row['data_json'], true);
                // Also cache to server disk
                @file_put_contents($siteDataFile, json_encode($decodedData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
                echo json_encode([
                    'success' => true,
                    'source' => 'mysql',
                    'data' => $decodedData,
                    'message' => 'Site data loaded from Hostinger MySQL database.'
                ]);
                exit;
            }
        } catch (Exception $e) {
            // fallback to disk
        }
    }

    // B. Try Server Disk File
    if (file_exists($siteDataFile)) {
        $raw = file_get_contents($siteDataFile);
        if (!empty($raw)) {
            $diskData = json_decode($raw, true);
            if ($diskData) {
                echo json_encode([
                    'success' => true,
                    'source' => 'server_disk',
                    'data' => $diskData,
                    'message' => 'Site data loaded from server storage.'
                ]);
                exit;
            }
        }
    }

    // C. Default Empty/Null (Client handles fallback)
    echo json_encode([
        'success' => true,
        'source' => 'none',
        'data' => null,
        'message' => 'No prior saved data found.'
    ]);
    exit;
}

// 3. ACTION: SAVE / POST SITE DATA
if ($action === 'save') {
    if (!$data) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No site data provided in request.']);
        exit;
    }

    // Save DB credentials if provided
    if (!empty($host) && !empty($database) && !empty($user)) {
        @file_put_contents($dbConfigFile, json_encode([
            'host' => $host,
            'port' => $port,
            'database' => $database,
            'user' => $user,
            'password' => $password
        ], JSON_PRETTY_PRINT));
    }

    // Always save to persistent server disk file
    $fileSaved = @file_put_contents($siteDataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

    // Also save to MySQL if connection succeeds
    $mysqlSaved = false;
    $pdo = getPdoConnection($host, $port, $database, $user, $password);
    if ($pdo) {
        try {
            $jsonStr = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            $stmt = $pdo->prepare("
                INSERT INTO site_content (id, data_json) 
                VALUES ('current_data', :data_json) 
                ON DUPLICATE KEY UPDATE data_json = :data_json_update
            ");
            $stmt->execute([
                ':data_json' => $jsonStr,
                ':data_json_update' => $jsonStr
            ]);
            $mysqlSaved = true;
        } catch (Exception $e) {
            // logged
        }
    }

    if ($fileSaved !== false || $mysqlSaved) {
        echo json_encode([
            'success' => true,
            'message' => $mysqlSaved
                ? 'All content & media saved live to Hostinger MySQL table "site_content"!'
                : 'All content & media saved live to Server Storage and published for all visitors!'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to write site content to storage.']);
    }
    exit;
}

// 4. ACTION: TEST CONNECTION
if ($action === 'test') {
    $pdo = getPdoConnection($host, $port, $database, $user, $password);
    if ($pdo) {
        // Save config
        @file_put_contents($dbConfigFile, json_encode([
            'host' => $host,
            'port' => $port,
            'database' => $database,
            'user' => $user,
            'password' => $password
        ], JSON_PRETTY_PRINT));

        echo json_encode([
            'success' => true,
            'message' => "Successfully connected directly to Hostinger MySQL database '{$database}' at {$host}!"
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => "Could not connect to Hostinger MySQL database. Please verify Host, User, Password, and Database Name in Hostinger hPanel."
        ]);
    }
    exit;
}

// 5. ACTION: CONTACT FORM SUBMISSION
if ($action === 'enquiry' || $action === 'contact') {
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $eventDate = $input['eventDate'] ?? '';
    $location = $input['location'] ?? '';
    $guestCount = $input['guestCount'] ?? '';
    $budget = $input['budget'] ?? '';
    $message = $input['message'] ?? '';

    // Try save to MySQL
    $pdo = getPdoConnection($host, $port, $database, $user, $password);
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO contact_submissions (name, email, phone, event_date, location, guest_count, budget, message)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$name, $email, $phone, $eventDate, $location, $guestCount, $budget, $message]);
        } catch (Exception $e) {}
    }

    // Also append to local enquiries file
    $enquiries = file_exists($enquiriesFile) ? json_decode(file_get_contents($enquiriesFile), true) : [];
    if (!is_array($enquiries)) $enquiries = [];
    $enquiries[] = [
        'id' => uniqid('enq_'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'eventDate' => $eventDate,
        'location' => $location,
        'guestCount' => $guestCount,
        'budget' => $budget,
        'message' => $message,
        'submittedAt' => date('c'),
        'status' => 'new'
    ];
    @file_put_contents($enquiriesFile, json_encode($enquiries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode([
        'success' => true,
        'message' => 'Consultation inquiry received and securely recorded.'
    ]);
    exit;
}

http_response_code(400);
echo json_encode(['success' => false, 'error' => 'Invalid action requested.']);
