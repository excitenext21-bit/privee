import os
from PIL import Image

def extract_and_export_logos():
    src_path = 'C:/Users/Mahi/.gemini/antigravity-ide/brain/42be03cb-fce5-4d18-80f2-dfdef81c551d/.user_uploaded/media_1791539896473.jpg'
    src = Image.open(src_path).convert('RGB')
    gray = src.convert('L')

    BRAND_COLOR = (144, 143, 138) # Authentic taupe
    T_BG = 210.0
    T_FG = 152.0

    # 1. Extract taupe logo with high-fidelity anti-aliasing
    out = Image.new('RGBA', src.size, (0, 0, 0, 0))

    for y in range(src.height):
        for x in range(src.width):
            l = gray.getpixel((x, y))
            if l >= T_BG:
                continue
            elif l <= T_FG:
                out.putpixel((x, y), (BRAND_COLOR[0], BRAND_COLOR[1], BRAND_COLOR[2], 255))
            else:
                alpha_ratio = (T_BG - l) / (T_BG - T_FG)
                alpha_ratio = min(1.0, max(0.0, alpha_ratio))
                alpha_ratio = alpha_ratio ** 1.15
                a = int(round(alpha_ratio * 255))
                if a > 0:
                    out.putpixel((x, y), (BRAND_COLOR[0], BRAND_COLOR[1], BRAND_COLOR[2], a))

    # Clean bounding box crop
    bbox = out.getbbox()
    cropped = out.crop(bbox)

    # Balanced padding
    pad_x, pad_y = 36, 24
    taupe_logo = Image.new('RGBA', (cropped.width + pad_x*2, cropped.height + pad_y*2), (0, 0, 0, 0))
    taupe_logo.paste(cropped, (pad_x, pad_y))

    # 2. Pure White Logo (for dark footer)
    white_logo = Image.new('RGBA', taupe_logo.size, (0, 0, 0, 0))
    for y in range(taupe_logo.height):
        for x in range(taupe_logo.width):
            r, g, b, a = taupe_logo.getpixel((x, y))
            if a > 0:
                white_logo.putpixel((x, y), (255, 255, 255, a))

    # 3. Pure Black Logo
    black_logo = Image.new('RGBA', taupe_logo.size, (0, 0, 0, 0))
    for y in range(taupe_logo.height):
        for x in range(taupe_logo.width):
            r, g, b, a = taupe_logo.getpixel((x, y))
            if a > 0:
                black_logo.putpixel((x, y), (0, 0, 0, a))

    # Save to target directories
    target_dirs = [
        os.path.join(os.getcwd(), 'public', 'assets', 'images'),
        os.path.join(os.getcwd(), 'src', 'assets', 'images'),
        os.path.join(os.getcwd(), 'dist', 'assets', 'images')
    ]

    for d in target_dirs:
        os.makedirs(d, exist_ok=True)
        taupe_logo.save(os.path.join(d, 'brand_logo.png'), format='PNG', optimize=True)
        white_logo.save(os.path.join(d, 'brand_logo_white.png'), format='PNG', optimize=True)
        black_logo.save(os.path.join(d, 'brand_logo_black.png'), format='PNG', optimize=True)
        print(f'Exported logos to: {d}')

    print('All logos exported successfully with perfect transparency!')

if __name__ == '__main__':
    extract_and_export_logos()
