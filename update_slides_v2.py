with open('slides.md', 'r') as f:
    content = f.read()

# Replace any data:image/png;base64,... strings back to URLs
import re
content = re.sub(r'src="data:image/png;base64,[^"]+"', 'src="placeholder"', content)

content = content.replace('src="https://myz21.github.io/AYBUStore/hero_landing.png"', 'src="https://myz21.github.io/AYBUStore/images/hero_landing.png"')
content = content.replace('src="https://myz21.github.io/AYBUStore/category_bar.png"', 'src="https://myz21.github.io/AYBUStore/images/category_bar.png"')
content = content.replace('src="https://myz21.github.io/AYBUStore/product_grid.png"', 'src="https://myz21.github.io/AYBUStore/images/product_grid.png"')
content = content.replace('src="https://myz21.github.io/AYBUStore/auth_page.png"', 'src="https://myz21.github.io/AYBUStore/images/auth_page.png"')

# If I used placeholders in the previous turned embed_images.py, I'll just rewrite the whole file for safety
# Or just replace the base64 part.

with open('slides.md', 'w') as f:
    f.write(content)
