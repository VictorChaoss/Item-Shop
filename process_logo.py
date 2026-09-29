from PIL import Image

input_path = '/Users/emrxh/.gemini/antigravity/brain/83346e71-9e0c-42a6-af91-1cd292039d76/.user_uploaded/media_1790630121280.png'
img = Image.open(input_path).convert("RGBA")
width, height = img.size

# Let's say the FBR text is below y=360.
# We take a 1-pixel high strip at y=350, and resize it to cover the bottom part.
strip_y = 350
strip = img.crop((0, strip_y, width, strip_y + 1))
fill_height = height - strip_y
fill_area = strip.resize((width, fill_height))
img.paste(fill_area, (0, strip_y))

output_path = 'public/images/item_shop_logo.png'
img.save(output_path)
print("Saved logo to", output_path)

# Favicon version (usually 32x32 or 64x64 or just use the same image as apple-touch-icon and icon in nextjs)
# Next.js supports an `icon.png` in the app directory!
img_icon = img.resize((512, 512), Image.Resampling.LANCZOS)
img_icon.save('src/app/icon.png')
print("Saved icon to src/app/icon.png")

