# -*- coding: utf-8 -*-
"""Draws di-flow.png — how Playwright injects a fixture by matching the parameter name."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1180, 860
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

F_TITLE = font(29, bold=True)
F_STEP  = font(19, bold=True)
F_CODE  = font(17, mono=True)
F_SUB   = font(14)
F_LABEL = font(15, bold=True)

def ctext(cx, y, text, fnt, fill='black'):
    w = d.textlength(text, font=fnt)
    d.text((cx - w / 2, y), text, font=fnt, fill=fill)

def wrap(cx, y, text, fnt, max_w, fill='black', lh=19):
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

def box(x0, y0, x1, y1, fill, outline):
    d.rounded_rectangle([x0, y0, x1, y1], radius=12, fill=fill, outline=outline, width=3)

def varrow(cx, y0, y1, label=None):
    d.line([cx, y0, cx, y1 - 12], fill='#555555', width=4)
    d.polygon([(cx, y1), (cx - 9, y1 - 14), (cx + 9, y1 - 14)], fill='#555555')
    if label:
        w = d.textlength(label, font=F_LABEL)
        d.rectangle([cx + 16, (y0+y1)/2 - 12, cx + 34 + w, (y0+y1)/2 + 12], fill='white')
        d.text((cx + 24, (y0+y1)/2 - 10), label, font=F_LABEL, fill='#1F4E79')

ctext(W/2, 20, 'How a fixture gets injected (the recipe machine)', F_TITLE, '#1F4E79')

# STEP 1 — the test asks
box(290, 74, 890, 178, '#D6E4F0', '#2E6DA4')
d.text((310, 86), '1.  The test asks — by NAME', font=F_STEP, fill='#1F4E79')
ctext(590, 118, 'async ({ testimonialsPage }) => { ... }', F_CODE, '#202020')
wrap(590, 146, 'you declare a parameter; its name is the request', F_SUB, 540, '#444')

varrow(590, 178, 222, 'Playwright reads the name')

# STEP 2 — lookup
box(290, 222, 890, 318, '#FFF2CC', '#C8A415')
d.text((310, 234), '2.  Playwright checks its recipes (fixtures)', F_STEP, '#7a5b00') if False else \
    d.text((310, 234), '2.  Playwright checks its recipes (fixtures)', font=F_STEP, fill='#7a5b00')
ctext(590, 270, "Is there a fixture named 'testimonialsPage' ?", F_CODE, '#202020')

# elbow split
d.line([590, 318, 590, 360], fill='#555555', width=4)
d.line([360, 360, 880, 360], fill='#555555', width=4)
# left down to FOUND
d.line([360, 360, 360, 402], fill='#4F8A45', width=4)
d.polygon([(360, 414), (351, 400), (369, 400)], fill='#4F8A45')
# right down to NOT FOUND
d.line([880, 360, 880, 402], fill='#C0392B', width=4)
d.polygon([(880, 414), (871, 400), (889, 400)], fill='#C0392B')
d.text((150, 366), 'name MATCHES a fixture', font=F_LABEL, fill='#2f5e28')
d.text((690, 366), 'NO fixture with that name', font=F_LABEL, fill='#B00000')

# FOUND box
box(110, 414, 610, 560, '#D5E8D4', '#4F8A45')
d.text((130, 426), '3.  FOUND — run the recipe', font=F_STEP, fill='#2f5e28')
ctext(360, 462, 'const testimonialsPage =', F_CODE, '#202020')
ctext(360, 486, 'new TestimonialsPage(page);', F_CODE, '#202020')
wrap(360, 518, "the fixture builds the object — the 'new' lives here", F_SUB, 460, '#444')

# NOT FOUND box
box(690, 414, 1070, 540, '#FBE9E7', '#C0392B')
d.text((710, 426), 'NOT FOUND  (e.g. bananaPage)', font=F_STEP, fill='#B00000')
wrap(880, 470, 'no recipe with that name', F_SUB, 340, '#444')
ctext(880, 500, 'X   ERROR', F_STEP, '#B00000')

varrow(360, 560, 612)

# INJECT box
box(110, 612, 610, 740, '#D5E8D4', '#4F8A45')
d.text((130, 624), '4.  Inject into the test', font=F_STEP, fill='#2f5e28')
wrap(360, 664, 'the test runs with a ready-made object — you never wrote new', F_SUB, 460, '#444')
ctext(360, 706, 'OK   test runs', F_STEP, '#2f5e28')

# bottom note
box(60, 776, W-60, 848, '#EDE7F6', '#8064A2')
ctext(W/2, 788, 'Same machine, two recipes', F_LABEL, '#5b3f86')
ctext(W/2, 814, "page = Playwright's built-in recipe      testimonialsPage = YOUR recipe (in fixtures.ts)",
      F_CODE, '#202020')

img.save('di-flow.png')
print('OK: di-flow.png written')
