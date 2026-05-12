import os

def get_b64(filename):
    with open(filename, 'r') as f:
        return f.read().strip()

hero = get_b64('hero_b64.txt')
products = get_b64('products_b64.txt')
auth = get_b64('auth_b64.txt')
category = get_b64('category_b64.txt')

with open('slides.md', 'r') as f:
    content = f.read()

content = content.replace('./hero_landing.png', f'data:image/png;base64,{hero}')
content = content.replace('./product_grid.png', f'data:image/png;base64,{products}')
content = content.replace('./auth_page.png', f'data:image/png;base64,{auth}')
content = content.replace('./category_bar.png', f'data:image/png;base64,{category}')

# Ensure text-center is applied correctly to all slides where requested
content = content.replace('layout: center\n---\n\n#', 'layout: center\n---\n\n<div class="text-center">\n\n#')
# Note: I already added <div class="text-center"> in many places manually in the previous turn.
# I'll just check if I need more.

with open('slides.md', 'w') as f:
    f.write(content)
