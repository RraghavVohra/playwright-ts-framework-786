# -*- coding: utf-8 -*-
"""Draws async-await-flow.png — a visual of how async / Promise / await connect."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1140, 600
img = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(img)

def font(sz, bold=False):
    name = 'arialbd.ttf' if bold else 'arial.ttf'
    try:
        return ImageFont.truetype('C:/Windows/Fonts/' + name, sz)
    except Exception:
        return ImageFont.load_default()

F_TITLE = font(30, bold=True)
F_BOX   = font(26, bold=True)
F_SUB   = font(15)
F_LABEL = font(15, bold=True)
F_CAP   = font(17)
F_MONO  = font(16)

def center_text(cx, y, text, fnt, fill='black'):
    w = d.textlength(text, font=fnt)
    d.text((cx - w / 2, y), text, font=fnt, fill=fill)

def wrap_center(cx, y, text, fnt, max_w, fill='black', lh=20):
    words = text.split()
    lines, cur = [], ''
    for w in words:
        test = (cur + ' ' + w).strip()
        if d.textlength(test, font=fnt) <= max_w:
            cur = test
        else:
            lines.append(cur); cur = w
    if cur:
        lines.append(cur)
    for i, ln in enumerate(lines):
        center_text(cx, y + i * lh, ln, fnt, fill)

def box(x0, y0, x1, y1, fill, outline):
    d.rounded_rectangle([x0, y0, x1, y1], radius=14, fill=fill, outline=outline, width=3)

def arrow(x0, y, x1, label):
    d.line([x0, y, x1 - 12, y], fill='#555555', width=4)
    d.polygon([(x1, y), (x1 - 14, y - 8), (x1 - 14, y + 8)], fill='#555555')
    center_text((x0 + x1) / 2, y - 34, label, F_LABEL, '#333333')

# ---- title ----
center_text(W / 2, 24, 'How async / Promise / await connect', F_TITLE, '#1F4E79')

# ---- three boxes ----
top, bot = 110, 250
b1 = (50, top, 350, bot)
b2 = (420, top, 720, bot)
b3 = (790, top, 1090, bot)

box(*b1, fill='#D6E4F0', outline='#2E6DA4')   # async - blue
box(*b2, fill='#FFF2CC', outline='#C8A415')   # promise - yellow
box(*b3, fill='#D5E8D4', outline='#4F8A45')   # value - green

center_text((b1[0]+b1[2])/2, top+18, 'async', F_BOX, '#1F4E79')
wrap_center((b1[0]+b1[2])/2, top+62, 'put on a function — makes it return a Promise', F_SUB, 270)

center_text((b2[0]+b2[2])/2, top+18, 'Promise', F_BOX, '#7a5b00')
wrap_center((b2[0]+b2[2])/2, top+62, 'a receipt for a result coming later (pending then fulfilled)', F_SUB, 270)

center_text((b3[0]+b3[2])/2, top+18, 'value', F_BOX, '#2f5e28')
wrap_center((b3[0]+b3[2])/2, top+62, 'the real result you can use', F_SUB, 270)

mid = (top + bot) / 2
arrow(350, mid, 420, 'returns')
arrow(720, mid, 790, 'await unwraps')

# ---- caption ----
wrap_center(W/2, 285, 'async makes a function hand back a Promise; await opens that Promise to get the value.',
            F_CAP, 1000, '#333333', lh=24)

# ---- forgetting await panel ----
d.line([50, 350, 1090, 350], fill='#DDDDDD', width=2)
center_text(W/2, 366, 'Why await matters', F_LABEL, '#B00000')

d.text((70, 410), 'WITH await:', font=F_LABEL, fill='#2f5e28')
d.text((230, 410), "const x = await getText();   ->   x = 'Hello'   (the actual text)", font=F_MONO, fill='black')

d.text((70, 460), 'NO await:', font=F_LABEL, fill='#B00000')
d.text((230, 460), 'const x = getText();          ->   x = Promise   (the receipt, NOT the text)', font=F_MONO, fill='black')

wrap_center(W/2, 520,
            'Without await the next line runs before the work finishes — the #1 cause of flaky tests.',
            F_CAP, 1000, '#333333', lh=24)

img.save('async-await-flow.png')
print('OK: async-await-flow.png written')
