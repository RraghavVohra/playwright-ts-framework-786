# -*- coding: utf-8 -*-
"""Draws constructor-flow.png — the journey of 'page' from test -> parameter -> field -> methods."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1180, 980
img = Image.new('RGB', (W, H), 'white')
d = ImageDraw.Draw(img)

def font(sz, bold=False, mono=False):
    if mono:
        name = 'consolab.ttf' if bold else 'consola.ttf'
    else:
        name = 'arialbd.ttf' if bold else 'arial.ttf'
    try:
        return ImageFont.truetype('C:/Windows/Fonts/' + name, sz)
    except Exception:
        return ImageFont.load_default()

F_TITLE = font(30, bold=True)
F_STEP  = font(20, bold=True)
F_CODE  = font(18, mono=True)
F_SUB   = font(15)
F_LABEL = font(16, bold=True)
F_TAG   = font(14, bold=True)

def ctext(cx, y, text, fnt, fill='black'):
    w = d.textlength(text, font=fnt)
    d.text((cx - w / 2, y), text, font=fnt, fill=fill)

def wrap(cx, y, text, fnt, max_w, fill='black', lh=20):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    for i, ln in enumerate(lines):
        ctext(cx, y + i * lh, ln, fnt, fill)
    return len(lines)

def box(x0, y0, x1, y1, fill, outline):
    d.rounded_rectangle([x0, y0, x1, y1], radius=12, fill=fill, outline=outline, width=3)

def down_arrow(cx, y0, y1, label):
    d.line([cx, y0, cx, y1 - 12], fill='#555555', width=4)
    d.polygon([(cx, y1), (cx - 9, y1 - 14), (cx + 9, y1 - 14)], fill='#555555')
    w = d.textlength(label, font=F_LABEL)
    d.rectangle([cx + 18, (y0+y1)/2 - 14, cx + 38 + w, (y0+y1)/2 + 12], fill='white')
    d.text((cx + 26, (y0+y1)/2 - 12), label, font=F_LABEL, fill='#1F4E79')

def tag(x, y, text, color):
    w = d.textlength(text, font=F_TAG)
    d.rounded_rectangle([x, y, x + w + 16, y + 26], radius=8, fill=color)
    d.text((x + 8, y + 4), text, font=F_TAG, fill='white')

ctext(W/2, 22, "The journey of 'page' through the constructor", F_TITLE, '#1F4E79')

LX, RX = 240, 940
CX = (LX + RX) / 2

# STEP 1 — test file
y0, y1 = 80, 190
box(LX, y0, RX, y1, '#D6E4F0', '#2E6DA4')
d.text((LX+20, y0+12), '1.  In the test file', font=F_STEP, fill='#1F4E79')
ctext(CX, y0+44, 'const testimonialsPage = new TestimonialsPage(page);', F_CODE, '#202020')
wrap(CX, y0+74, "page here = the real browser tab, given to the test by Playwright", F_SUB, 640, '#444')
tag(RX-150, y0+12, 'page  #1', '#2E6DA4')

down_arrow(CX, y1, 245, 'the tab is passed IN as an argument')

# STEP 2 — constructor receives
y0, y1 = 245, 360
box(LX, y0, RX, y1, '#FFF2CC', '#C8A415')
d.text((LX+20, y0+12), '2.  The constructor receives it', font=F_STEP, fill='#7a5b00')
ctext(CX, y0+46, 'constructor(page: Page) { ... }', F_CODE, '#202020')
wrap(CX, y0+76, "page here = a parameter: a temporary local name for the tab that just arrived", F_SUB, 640, '#444')
tag(RX-150, y0+12, 'page  #2', '#C8A415')

down_arrow(CX, y1, 415, 'this.page = page   (copy it into the object)')

# STEP 3 — stored on object
y0, y1 = 415, 560
box(LX, y0, RX, y1, '#D5E8D4', '#4F8A45')
d.text((LX+20, y0+12), '3.  Stored on the object (its fields)', font=F_STEP, fill='#2f5e28')
ctext(CX, y0+46, 'this.page = page;', F_CODE, '#202020')
ctext(CX, y0+72, "this.setupTab = page.getByText('Setup', ...);", F_CODE, '#202020')
wrap(CX, y0+102, "this.page is the object's permanent field. setupTab is built from page too.", F_SUB, 640, '#444')
tag(RX-150, y0+12, 'page  #3', '#4F8A45')

down_arrow(CX, y1, 615, 'every method uses these fields')

# STEP 4 — methods use it
y0, y1 = 615, 720
box(LX, y0, RX, y1, '#E1D5E7', '#8064A2')
d.text((LX+20, y0+12), '4.  Methods use what the constructor set up', font=F_STEP, fill='#5b3f86')
ctext(CX, y0+48, 'await this.setupTab.click();', F_CODE, '#202020')
wrap(CX, y0+78, "reads the value the constructor prepared earlier — no setup needed here", F_SUB, 640, '#444')

# bottom note — the three pages
ny0 = 760
box(60, ny0, W-60, 940, '#FBE9E7', '#C0392B')
ctext(W/2, ny0+12, "Same word 'page' — THREE different things", F_LABEL, '#B00000')
d.text((90, ny0+50), "#1  new TestimonialsPage(page)   ->  the REAL browser tab from Playwright", font=F_CODE, fill='#202020')
d.text((90, ny0+86), "#2  constructor(page: Page)       ->  a PARAMETER that receives that tab (temporary)", font=F_CODE, fill='#202020')
d.text((90, ny0+122), "#3  this.page                     ->  the object's FIELD that stores the tab (permanent)", font=F_CODE, fill='#202020')
ctext(W/2, ny0+158, "this.page = page   is just  #2 being copied into  #3", F_LABEL, '#B00000')

img.save('constructor-flow.png')
print('OK: constructor-flow.png written')
