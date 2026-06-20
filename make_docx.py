# -*- coding: utf-8 -*-
"""Generates Concepts-Study-Guide.docx from in-script content."""
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document()

# ---- base styles ----
normal = doc.styles['Normal']
normal.font.name = 'Calibri'
normal.font.size = Pt(11)

ACCENT = RGBColor(0x1F, 0x4E, 0x79)   # dark blue
CODEBG = 'F2F2F2'

def shade(paragraph, fill):
    pPr = paragraph._p.get_or_add_pPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:fill'), fill)
    pPr.append(shd)

def h1(text):
    p = doc.add_heading(text, level=1)
    for r in p.runs:
        r.font.color.rgb = ACCENT
    return p

def h2(text):
    p = doc.add_heading(text, level=2)
    for r in p.runs:
        r.font.color.rgb = ACCENT
    return p

def para(text, bold=False, italic=False):
    p = doc.add_paragraph()
    r = p.add_run(text)
    r.bold = bold
    r.italic = italic
    return p

def bullet(text):
    return doc.add_paragraph(text, style='List Bullet')

def numbered(text):
    return doc.add_paragraph(text, style='List Number')

def code(text):
    p = doc.add_paragraph()
    shade(p, CODEBG)
    p.paragraph_format.left_indent = Inches(0.1)
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(text)
    r.font.name = 'Consolas'
    r.font.size = Pt(9.5)
    # ensure monospace applies for east-asian too
    rpr = r._element.get_or_add_rPr()
    rfonts = rpr.find(qn('w:rFonts'))
    if rfonts is None:
        rfonts = OxmlElement('w:rFonts')
        rpr.append(rfonts)
    rfonts.set(qn('w:ascii'), 'Consolas')
    rfonts.set(qn('w:hAnsi'), 'Consolas')
    return p

def soundbite(text):
    p = doc.add_paragraph()
    shade(p, 'FFF2CC')
    p.paragraph_format.left_indent = Inches(0.1)
    r = p.add_run('Interview soundbite:  ')
    r.bold = True
    r2 = p.add_run(text)
    r2.italic = True
    return p

def table(headers, rows):
    t = doc.add_table(rows=1, cols=len(headers))
    t.style = 'Light Grid Accent 1'
    for i, htext in enumerate(headers):
        cell = t.rows[0].cells[i]
        cell.text = ''
        run = cell.paragraphs[0].add_run(htext)
        run.bold = True
    for row in rows:
        cells = t.add_row().cells
        for i, val in enumerate(row):
            cells[i].text = val
    doc.add_paragraph()
    return t

# ============================ TITLE ============================
title = doc.add_heading('JavaScript + TypeScript Concepts', level=0)
sub = doc.add_paragraph()
sr = sub.add_run('A Study Guide for Interviews  —  taught simply, compared to Java, '
                 'grounded in our Playwright + TypeScript framework')
sr.italic = True
sr.font.size = Pt(11)
doc.add_paragraph()
para('How to read this: each concept has four parts — the idea, the Java comparison, '
     'our actual code, and an interview soundbite you can say out loud.', italic=True)
doc.add_page_break()

# ============================ 0 ============================
h1('0. The Big Picture: JS + TS')
para('JavaScript (JS) is the language that actually runs. TypeScript (TS) is a layer on top '
     'that adds types — labels saying "this value must be a number / string / Page". The browser '
     'and Node do not run TS directly; it is compiled to JS first.')
bullet('JS gives us: how the code behaves — functions, objects, Promises, modules.')
bullet('TS adds: safety — it catches type mistakes before the code runs.')
para('Mental model: JS is the engine. TS is the safety inspector checking your parts fit before '
     'you start it. Coming from Java (also strongly typed), TS gives back the type safety you know, '
     'on top of JavaScript.', italic=True)

# ============================ 1 FUNCTIONS ============================
h1('1. Functions')
h2('The idea')
para('A function is a reusable block of code that takes inputs and optionally returns an output. '
     'The biggest shift from Java: in JavaScript a function is a value — it can be stored in a '
     'variable, passed as an argument, or returned from another function. This is called '
     '"functions are first-class citizens".')
h2('The Java comparison')
para('In Java a function must live inside a class (a method) — it cannot exist on its own. In JS a '
     'function can float freely and be passed around as data. That single difference explains '
     'fixtures, callbacks, and much of what looks "weird" coming from Java.')
h2('The four forms we use in this project')
table(['Form', 'Looks like', 'Where in our project', 'Java analogue'],
      [['Function declaration', 'function globalSetup() {}', 'utils/global-setup.ts', 'a static method'],
       ['Class method', 'async navigateToTestimonials() {}', 'every page object', 'instance method'],
       ['Arrow function (as a value)', 'async ({ page }, use) => {}', 'utils/fixtures.ts', 'lambda (closest)'],
       ['Callback (passed as arg)', 'evaluate(el => el.click())', 'page objects', 'lambda + functional interface']])
h2('Typing a function (the TS layer)')
code("getFutureDate(daysFromToday: number): string { ... }\n"
     "//            \\____ param ____/        \\ return type")
bullet('Parameter: name: type — the type comes AFTER the name (Java is reverse: int days).')
bullet('Return type: : string after the ().')
bullet("Async functions return Promise<void> — the async version of Java's void.")
soundbite('"I use three forms depending on context — function declarations for hooks, class methods '
          'for Page Object actions, and arrow functions wherever a function is used as a value, like '
          'fixtures and callbacks. The big shift from Java is that functions are first-class values "'
          'in JS. TypeScript only adds the type layer on top."')

# ============================ 2 MODULES ============================
h1('2. Modules: import / export')
h2('The idea')
para('In JavaScript every file is a module. A file is a sealed box: nothing inside it is visible to '
     'other files unless you export it. Other files then import what they need.')
h2('The Java comparison')
table(['Java', 'TypeScript'],
      [['Organise by classes & packages', 'Organise by files'],
       ['import com.app.Config; then Config.ENV', "import { ENV } from './utils/config' — value directly"],
       ['package-private (no modifier)', 'no export = file-private'],
       ['Import a class, then dot into it', 'The file itself is the namespace']])
h2('Named exports — a toolbox of several things')
code("export const ENV = ...;        // exported — importable\n"
     "export const BASE_URL = ...;   // exported\n"
     "const BASE_URLS = { ... };     // NO export — private to this file")
para('Import named exports with curly braces, using the exact name:')
code("import { ENV, USER_EMAIL } from './utils/config';")
para('Key encapsulation point: BASE_URLS (the full map) has no export, so it is file-private — like '
     'a private field. Only BASE_URL (the one resolved URL) is exported — like a public getter. '
     'Other files get the result, never the internal map.')
h2('Default exports — the one main thing')
code("export default async function globalSetup() { ... }\n"
     "// imported WITHOUT braces, and you choose the name:\n"
     "import globalSetup from './utils/global-setup';")
h2('Re-exporting & aliasing — our fixtures file')
code("import { test as base, expect } from '@playwright/test';  // 'as' = rename on import\n"
     "export const test = base.extend(...);                     // build our own 'test'\n"
     "export { expect };                                        // re-export\n"
     "// result: tests need ONE import:\n"
     "import { test, expect } from '../../utils/fixtures';")
h2('Relative paths')
bullet('./ = same folder · ../ = one folder up · counted from the file you are in.')
bullet('A bare name (@playwright/test, fs, path) = a package or Node built-in.')
bullet('No .ts extension in the path — TypeScript resolves it.')
bullet('If you move a file, every ../ count changes — a misplaced spec and a broken import appear together.')
soundbite('"Every file is a module. Named exports are imported with braces by exact name; anything '
          'without export stays file-private — encapsulation at the file level. I use a default '
          'export for global-setup, and in fixtures I alias and re-export so every test has one clean import line."')

# ============================ 3 PROMISES ============================
h1('3. Promises & async/await')
h2('The idea')
para('A Promise is an object representing a value that is not ready yet but will be — an IOU. It is '
     'always pending, fulfilled (success + value), or rejected (failure + error).')
h2('Why JS needs Promises (the crucial fact)')
para('JavaScript runs on a single thread. It cannot afford to block and wait, because freezing the '
     'one thread freezes everything. So slow operations (clicks, navigation, network) immediately '
     'return a Promise instead of blocking.')
h2('The Java comparison')
bullet('A Promise is like Java CompletableFuture<T> — a container for a result that arrives later.')
bullet('await somePromise is like future.get() — wait for the result and unwrap it.')
bullet('Difference: Java .get() blocks the whole thread. JS await only pauses the current function — '
       'the single thread stays free. This is non-blocking concurrency.')
h2('async and await')
code("await testimonialsPage.navigateToTestimonials();   // wait for completion (Promise<void>)\n\n"
     "const heading = await page.getPageHeading();        // wait AND unwrap the value\n"
     "expect(heading).toBe('PUSH NOTIFICATION');          // heading is now a real string")
h2('The #1 bug: forgetting await')
code("const heading = page.getPageHeading();   // no await\n"
     "expect(heading).toBe('PUSH NOTIFICATION'); // compares a Promise to a string -> FAILS")
para('Without await, heading holds the Promise object itself, not the string — a wrong TYPE. With '
     'actions, forgetting await makes the next line race ahead before the action finishes — the #1 '
     'cause of flaky tests.')
h2('Which expect needs await?')
code("expect(heading).toBe('PUSH NOTIFICATION');       // NO await — value already in hand (sync)\n"
     "await expect(page).toHaveURL(/testimonial/);     // await — polls the LIVE page, retries (async)")
para('Rule: await expect(...) when the matcher checks the live page (toHaveURL, toBeVisible, '
     'toHaveText). Plain expect(...) when asserting on a value you already have (toBe, toEqual).')
soundbite('"JavaScript is single-threaded, so it cannot block while waiting for the browser. Slow '
          'operations return a Promise — like Java CompletableFuture. async makes a function return a '
          'Promise; await pauses that function until it resolves and unwraps the value. Forgetting '
          'await is the top cause of flaky tests. Unlike Java .get(), await only pauses the current '
          'function, not the whole thread."')

# ============================ 4 OOP ============================
h1('4. OOP: Classes, Objects, Constructors')
h2('The vocabulary (identical to Java)')
bullet('Class = a blueprint. (TestimonialsPage)')
bullet('Object / instance = one real thing built from the blueprint. (testimonialsPage)')
bullet('new = builds an instance and triggers the constructor.')
bullet('Field = an instance variable. (private page: Page)')
bullet('this = "this specific instance I am inside".')
h2('Our real class')
code("import { Page, Locator } from '@playwright/test';\n\n"
     "export class TestimonialsPage {\n\n"
     "  private page: Page;                    // field: name 'page', type 'Page', private\n"
     "  private setupTab: Locator;\n"
     "  private testimonialsNewOption: Locator;\n\n"
     "  constructor(page: Page) {              // TS ctor is ALWAYS the word 'constructor'\n"
     "    this.page = page;                    // store the parameter into the object's field\n"
     "    this.setupTab = page.getByText('Setup', { exact: true });\n"
     "    this.testimonialsNewOption = page.getByRole('link', { name: 'Testimonials New' });\n"
     "  }\n\n"
     "  async navigateToTestimonials(): Promise<void> {\n"
     "    await this.setupTab.click();\n"
     "    await this.testimonialsNewOption.click();\n"
     "  }\n"
     "}")
h2('Java differences to remember')
table(['Concept', 'Java', 'TypeScript'],
      [['Constructor name', 'same as class: TestimonialsPage()', "always the word 'constructor'"],
       ['Field declaration', 'private Page page; (type first)', 'private page: Page; (name first)'],
       ['this', 'current instance', 'identical'],
       ['private', 'only this class', 'identical']])
h2('name : Type — the confusion killer')
code("private page: Page;\n"
     "//      ^      ^\n"
     "//    NAME   TYPE")
bullet('page (lowercase) = the name you chose — could be tab, browserTab, anything.')
bullet('Page (capital) = the type — the rule for what is allowed in it.')
bullet('They only look alike because we named the field after its type. Rename to tab and it is clear: private tab: Page;')
h2('The constructor — what it is REALLY for')
para('The constructor turns a freshly-created empty object into a usable one. It runs once, '
     'automatically, the instant you write new. Flow:')
numbered('new TestimonialsPage(page) creates a blank object.')
numbered('JS immediately calls the constructor, passing in page.')
numbered('this.page = page stamps the tab onto the object; locators get registered.')
para('Analogy: the page object is a TV remote; the browser tab is the TV. new TestimonialsPage(page) '
     'pairs the remote to one specific TV — and the constructor is the pairing step. Every method '
     'afterwards is a button that works because you paired first.', italic=True)
para('Without it: this.page is undefined, and the first this.page.click() crashes with "cannot read '
     'property click of undefined". The constructor is what makes this.page exist. Locators live in '
     'the constructor because it runs once — set up once, use everywhere.')
soundbite('"The constructor wires the page object to a live browser tab and registers all locators '
          'once at creation. Without it, this.page is undefined and every action crashes — the '
          'constructor turns an empty object into a usable one bound to a specific tab."')

# ============================ 5 LOCATORS LAZY ============================
h1('5. Locators are Lazy')
h2('The idea')
para("Writing page.getByRole('link', { name: 'Setup' }) does NOT search the page. It only describes "
     "how to find the element — like saving a recipe, not cooking. The real search happens only when "
     "you call an action on it (.click(), .textContent()).")
h2('Why this matters')
para('It is why we can safely define all locators in the constructor before navigating — defining is '
     'free, searching is deferred to action time.')
numbered('Constructor runs -> locators described (page may be blank). No searching.')
numbered('Test navigates -> real page loads.')
numbered('Method calls .click() -> NOW Playwright searches the loaded page and acts.')
h2('The Selenium contrast (great interview point)')
para('Selenium driver.findElement searches the DOM immediately — call it too early and it throws '
     'NoSuchElementException. Playwright Locator is lazy AND auto-waits — far less flaky.')
h2('Locator strategy (priority order)')
table(['Priority', 'Strategy', 'Example', 'Why'],
      [['1', 'Role + name', "getByRole('link', { name: 'Setup' })", 'resilient, user-facing — preferred'],
       ['2', 'Text', "getByText('Setup', { exact: true })", 'simple, but can match siblings'],
       ['3', 'ID', '#setup-menu', 'stable & fast when present'],
       ['4', 'XPath by text', "//a[normalize-space()='Setup']", 'when no ID/role works'],
       ['last', 'CSS class', '.nav-setup', 'classes change often — least stable']])
soundbite('"Playwright locators are lazy — defining one does not touch the DOM; it describes how to '
          'find the element. The search happens at action time, with auto-waiting built in. That is '
          'why I register every locator in the constructor before the page exists, and a big reason '
          'Playwright is less flaky than Selenium."')

# ============================ 6 POM ============================
h1('6. Page Object Model (POM)')
h2('The idea')
para('POM is a design pattern where each screen of the app gets its own class holding the locators '
     '(the elements) and the methods (the actions) for that screen. Tests call high-level methods '
     'instead of dealing with raw selectors. It is OOP applied to test automation.')
h2('Why it is good (interview gold)')
bullet('No duplication — a locator is defined once; every test reuses it.')
bullet('Easy maintenance — UI changes -> fix the locator in ONE place, not in 50 tests.')
bullet('Readable tests — the test reads like a user story, not CSS selectors.')
bullet('Encapsulation — locators are private; tests use methods, not raw selectors.')
soundbite('"POM is OOP applied to automation — one class per screen holding that screen\'s locators '
          'and actions. The payoff is maintenance: when the UI changes I update one locator in one '
          'page object, and every test that uses it is fixed."')

# ============================ 7 FIXTURES ============================
h1('7. Fixtures & Dependency Injection')
h2('The idea')
para('A fixture lets a test receive a ready-built object just by declaring it as a parameter — no '
     'manual new. You register it once; every test can ask for it.')
code("// WITHOUT a fixture (repetitive):\n"
     "test('x', async ({ page }) => {\n"
     "  const testimonialsPage = new TestimonialsPage(page);  // every test repeats this\n"
     "});\n\n"
     "// WITH a fixture (clean):\n"
     "test('x', async ({ testimonialsPage }) => {             // just ask — it is built for you\n"
     "  await testimonialsPage.navigateToTestimonials();\n"
     "});")
h2('This is Dependency Injection (DI)')
para('The test declares what it needs, and the framework provides (injects) it. Java comparison: '
     'this is exactly Spring @Autowired — declare a dependency, the framework supplies the instance.')
h2('The fixture shape (utils/fixtures.ts)')
code("testimonialsPage: async ({ page }, use) => {\n"
     "  const testimonialsPage = new TestimonialsPage(page);  // 1. SETUP — build once\n"
     "  await use(testimonialsPage);                          // 2. hand to test; test RUNS here\n"
     "  // 3. TEARDOWN — cleanup would go here (none needed yet)\n"
     "},")
para('Three edits register a new page object as a fixture: (1) import it, (2) add it to the '
     'MyFixtures type, (3) add the fixture function to base.extend({...}).')
h2('use — the most subtle part')
para('await use(obj) is NOT "return the value". It means: hand the object to the test, pause the '
     'fixture here, let the whole test run, then come back for teardown. Code before use = setup; '
     'code after use = teardown. A plain return would kill the fixture immediately — losing teardown.')
para('Analogy: use is a librarian lending you a book — fetches it (setup), waits at the desk while '
     'you read (the test runs), then shelves it when you return (teardown). return would be throwing '
     'the book and walking away.', italic=True)
soundbite('"Fixtures are Playwright\'s dependency injection — register a page object once, tests '
          'receive a ready-built instance by naming it as a parameter, same idea as Spring '
          '@Autowired. The use callback hands the object to the test and pauses the fixture around '
          'it, so code before use is setup and code after is teardown."')

# ============================ 8 SPEC ============================
h1('8. Putting It Together: The Spec File')
para('tests/e2e/testimonials.spec.ts — every concept in one place:')
code("// MODULES: import from OUR fixtures (not '@playwright/test')\n"
     "import { test, expect } from '../../utils/fixtures';\n\n"
     "// FUNCTION (arrow) passed to a HOOK; async + await on a browser action\n"
     "test.beforeEach(async ({ page }) => {\n"
     "  await page.goto('/home');                 // logged in already via auth.json\n"
     "});\n\n"
     "// DEPENDENCY INJECTION: declare the fixtures we need\n"
     "test('TC_TST_01 - navigates to Testimonials screen', async ({ testimonialsPage, page }) => {\n"
     "  await testimonialsPage.navigateToTestimonials();         // POM method; awaited\n"
     "  await expect(page).toHaveURL(/framework\\/testimonial/); // auto-retrying matcher -> awaited\n"
     "});")
para('Who creates the TestimonialsPage object, and when? The fixture does, via new, right before the '
     'test runs — because the test declared testimonialsPage as a parameter. The test never calls '
     'new. That is DI in action.')
para('Why import from ../../utils/fixtures and not @playwright/test? Because our fixtures file exports '
     'the extended test that knows our custom fixtures, plus a re-exported expect. Importing from '
     'Playwright directly gives the plain test with no testimonialsPage fixture.')

# ============================ 9 CHEAT SHEET ============================
h1('9. Java <-> TypeScript Cheat Sheet')
table(['Concept', 'Java', 'TypeScript'],
      [['Variable + type', 'int days', 'days: number (type after name)'],
       ['Method return type', 'String f()', 'f(): string'],
       ['Function as a value', 'not possible directly', 'const f = () => {}'],
       ['Visibility (file)', 'package-private', 'no export = file-private'],
       ['Visibility (class)', 'private', 'private (same)'],
       ['Import a value', 'import class, then Config.ENV', "import { ENV } from './config'"],
       ['Async result type', 'CompletableFuture<T>', 'Promise<T>'],
       ['Wait for async result', 'future.get() (blocks thread)', 'await promise (pauses function only)'],
       ['Constructor name', 'same as class', 'always constructor'],
       ['Dependency injection', 'Spring @Autowired', 'Playwright fixtures'],
       ['this', 'current instance', 'current instance (same)'],
       ['new', 'creates instance + runs ctor', 'identical']])

# ============================ 10 QUIZ ============================
h1('10. Active Recall — Quiz Yourself')
para('Cover the answers. Say each out loud before checking.', italic=True)
qa = [
 ('What does "functions are first-class citizens" mean?',
  'A function is a value — it can be stored in a variable, passed as an argument, or returned from '
  'another function, just like a number or string. Impossible in Java directly.'),
 ('export const ENV vs an un-exported BASE_URLS — what is the difference?',
  'ENV is visible to other files; BASE_URLS has no export, so it is file-private — like a private '
  'field. Encapsulation at the file level.'),
 ('Named import vs default import?',
  'Named: curly braces, exact name. Default: no braces, you choose the name. A file has only one default export.'),
 ('Why does JavaScript need Promises?',
  'JS is single-threaded; it cannot block while waiting. Slow operations return a Promise so the one thread stays free.'),
 ('What is wrong with: const h = page.getHeading(); expect(h).toBe("X");',
  'No await — h holds the Promise object, not the string. toBe compares a Promise to a string and fails. Wrong type.'),
 ('Why does await expect(page).toHaveURL(...) need await but expect(h).toBe("X") does not?',
  'toHaveURL polls the live page and retries (async -> Promise -> await). toBe compares a value already in hand (sync).'),
 ('What does the constructor really do?',
  'Turns a freshly new-ed empty object into a usable one: stores the tab on this.page and registers '
  'locators, once. Without it this.page is undefined and actions crash.'),
 ('Why is it safe to define locators in the constructor before navigating?',
  'Locators are lazy — defining one does not search the DOM; the search happens at action time.'),
 ('What is a fixture, and what Java concept does it match?',
  'Playwright\'s dependency injection — register a page object once, tests receive it by naming it as '
  'a parameter. Same as Spring @Autowired.'),
 ('What does await use(obj) do that return obj cannot?',
  'It hands the object to the test and pauses the fixture around it, enabling teardown after the '
  'test. return ends the fixture immediately, losing teardown.'),
]
for i, (q, a) in enumerate(qa, 1):
    p = doc.add_paragraph()
    p.add_run('Q%d. %s' % (i, q)).bold = True
    ap = doc.add_paragraph()
    ar = ap.add_run('A: ' + a)
    ar.italic = True
    ar.font.color.rgb = RGBColor(0x55, 0x55, 0x55)

doc.add_paragraph()
foot = doc.add_paragraph()
fr = foot.add_run('Built from the Testimonials-feature session. Companion to PROGRESS.md '
                  '(what was built) and Fixes.md (bugs fixed).')
fr.italic = True
fr.font.size = Pt(9)

doc.save('Concepts-Study-Guide.docx')
print('OK: Concepts-Study-Guide.docx written')
