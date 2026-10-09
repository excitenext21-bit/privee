import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Pre-compute CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function encodeRGBA(width, height, rgbaBuf) {
  const stride = width * 4;
  const filtered = Buffer.alloc(height * (1 + stride));
  for (let y = 0; y < height; y++) {
    filtered[y * (1 + stride)] = 0; // Filter None
    rgbaBuf.copy(filtered, y * (1 + stride) + 1, y * stride, (y + 1) * stride);
  }
  const compressed = zlib.deflateSync(filtered, { level: 9 });

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdr = createChunk('IHDR', ihdrData);
  const idat = createChunk('IDAT', compressed);
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

const sourcePngPath = path.join(process.cwd(), 'public', 'assets', 'images', 'regenerated_image_1786437616291.png');
const origBuf = fs.readFileSync(sourcePngPath);

let offset = 8, idatChunks = [];
while (offset < origBuf.length) {
  const len = origBuf.readUInt32BE(offset);
  const type = origBuf.subarray(offset + 4, offset + 8).toString('ascii');
  if (type === 'IDAT') idatChunks.push(origBuf.subarray(offset + 8, offset + 8 + len));
  offset += 12 + len;
}

const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const width = 1190, height = 472;
const bpp = 4, stride = width * bpp;
const uncompressed = Buffer.alloc(height * stride);

let prevRow = Buffer.alloc(stride);
for (let y = 0; y < height; y++) {
  const filterType = raw[y * (stride + 1)];
  const rowStart = y * (stride + 1) + 1;
  const currRow = Buffer.alloc(stride);
  for (let x = 0; x < stride; x++) {
    const val = raw[rowStart + x];
    const a = x >= bpp ? currRow[x - bpp] : 0;
    const b = prevRow[x];
    const c = x >= bpp ? prevRow[x - bpp] : 0;
    let recon = 0;
    if (filterType === 0) recon = val;
    else if (filterType === 1) recon = (val + a) & 0xff;
    else if (filterType === 2) recon = (val + b) & 0xff;
    else if (filterType === 3) recon = (val + Math.floor((a + b) / 2)) & 0xff;
    else if (filterType === 4) recon = (val + paeth(a, b, c)) & 0xff;
    currRow[x] = recon;
    uncompressed[y * stride + x] = recon;
  }
  prevRow = currRow;
}

// 1. brand_logo.png (original valid taupe PNG)
const brandLogoBuf = origBuf;

// 2. brand_logo_white.png (pure white with original transparency)
const whiteBuf = Buffer.from(uncompressed);
for (let i = 0; i < whiteBuf.length; i += 4) {
  if (whiteBuf[i + 3] > 0) {
    whiteBuf[i] = 255;
    whiteBuf[i + 1] = 255;
    whiteBuf[i + 2] = 255;
  }
}
const whitePng = encodeRGBA(width, height, whiteBuf);

// 3. brand_logo_black.png (pure black with original transparency)
const blackBuf = Buffer.from(uncompressed);
for (let i = 0; i < blackBuf.length; i += 4) {
  if (blackBuf[i + 3] > 0) {
    blackBuf[i] = 0;
    blackBuf[i + 1] = 0;
    blackBuf[i + 2] = 0;
  }
}
const blackPng = encodeRGBA(width, height, blackBuf);

// Target directories
const targetDirs = [
  path.join(process.cwd(), 'public', 'assets', 'images'),
  path.join(process.cwd(), 'src', 'assets', 'images'),
  path.join(process.cwd(), 'dist', 'assets', 'images')
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'brand_logo.png'), brandLogoBuf);
  fs.writeFileSync(path.join(dir, 'brand_logo_white.png'), whitePng);
  fs.writeFileSync(path.join(dir, 'brand_logo_black.png'), blackPng);
  console.log('Successfully wrote logos to:', dir);
}

console.log('All logo variants rebuilt and verified successfully!');
