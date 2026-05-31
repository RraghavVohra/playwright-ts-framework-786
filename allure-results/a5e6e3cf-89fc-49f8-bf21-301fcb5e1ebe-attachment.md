# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_04 - Clicking Upload navigates to upload screen
- Location: tests\e2e\document-library.spec.ts:104:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('//a[contains(@href,\'sp-upload-document.php\') and not(contains(@href,\'document_id\'))]') to be visible
    81 × locator resolved to hidden <a href="sp-upload-document.php">…</a>

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - img [ref=e5]
    - list [ref=e8]:
      - listitem
      - listitem [ref=e9]:
        - link "AssetLibrary" [ref=e10] [cursor=pointer]:
          - /url: ../home/AssetLibrary
          - text:  AssetLibrary
      - listitem [ref=e11]:
        - link "Campaign" [ref=e12] [cursor=pointer]:
          - /url: javascript:;
          - text:  Campaign
      - listitem [ref=e13]:
        - link "Conversion" [ref=e14] [cursor=pointer]:
          - /url: javascript:;
          - text:  Conversion
      - listitem [ref=e15]:
        - link "journey" [ref=e16] [cursor=pointer]:
          - /url: javascript:;
          - text:  journey
      - listitem [ref=e17]:
        - link "Communication" [ref=e18] [cursor=pointer]:
          - /url: javascript:;
          - text:  Communication
      - listitem [ref=e19]:
        - link "Dashboard" [ref=e20] [cursor=pointer]:
          - /url: javascript:;
          - text:  Dashboard
      - listitem [ref=e21]:
        - link "" [ref=e22] [cursor=pointer]:
          - /url: javascript:;
          - generic [ref=e23]: 
    - list [ref=e25]:
      - listitem [ref=e26]:
        - button " PiyushAdmin" [ref=e27] [cursor=pointer]:
          - generic [ref=e28]: 
          - text: PiyushAdmin
        - text:   
  - generic [ref=e34]:
    - generic [ref=e38]:
      - link [active] [ref=e39] [cursor=pointer]:
        - /url: javascript:;
        - img [ref=e40]
      - text: "  # "
    - generic [ref=e47]:
      - searchbox [ref=e50]
      - table [ref=e51]:
        - rowgroup [ref=e52]:
          - 'row ": activate to sort column ascending Title: activate to sort column ascending Thumbnail: activate to sort column descending Internal HashTags: activate to sort column ascending File Type: activate to sort column ascending Options: activate to sort column ascending Access: activate to sort column ascending Status: activate to sort column ascending Syndication/Expired Date: activate to sort column ascending Actions: activate to sort column ascending" [ref=e53]':
            - 'columnheader ": activate to sort column ascending" [ref=e54] [cursor=pointer]':
              - checkbox [ref=e56]
            - 'columnheader "Title: activate to sort column ascending" [ref=e57] [cursor=pointer]': Title
            - 'columnheader "Thumbnail: activate to sort column descending" [ref=e58] [cursor=pointer]': Thumbnail
            - 'columnheader "Internal HashTags: activate to sort column ascending" [ref=e59] [cursor=pointer]': Internal HashTags
            - 'columnheader "File Type: activate to sort column ascending" [ref=e60] [cursor=pointer]': File Type
            - 'columnheader "Options: activate to sort column ascending" [ref=e61] [cursor=pointer]': Options
            - 'columnheader "Access: activate to sort column ascending" [ref=e62] [cursor=pointer]': Access
            - 'columnheader "Status: activate to sort column ascending" [ref=e63] [cursor=pointer]': Status
            - 'columnheader "Syndication/Expired Date: activate to sort column ascending" [ref=e64] [cursor=pointer]': Syndication/Expired Date
            - 'columnheader "Actions: activate to sort column ascending" [ref=e65] [cursor=pointer]': Actions
        - rowgroup [ref=e66]:
          - row "AutoDoc_1779618615393 XLSX Important Announcements Draft " [ref=e67]:
            - cell [ref=e68]:
              - checkbox [ref=e70]
            - cell "AutoDoc_1779618615393" [ref=e71]
            - cell [ref=e72]:
              - img [ref=e73]
            - cell [ref=e74]
            - cell "XLSX" [ref=e75]:
              - text: XLSX
              - link [ref=e76] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12d33f40d1a-SemgrepRescanpoints.xlsx
                - generic [ref=e77]: 
            - cell "Important Announcements" [ref=e78]
            - cell [ref=e79]
            - cell "Draft" [ref=e80]:
              - generic [ref=e81]: Draft
            - cell [ref=e82]
            - cell "" [ref=e83]:
              - list [ref=e85]:
                - listitem [ref=e86]:
                  - link "" [ref=e87] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFIuYGBgCmAK
                    - generic [ref=e88]: 
          - row "AutoDoc_1779618568331 CSV Important Announcements Draft " [ref=e89]:
            - cell [ref=e90]:
              - checkbox [ref=e92]
            - cell "AutoDoc_1779618568331" [ref=e93]
            - cell [ref=e94]:
              - img [ref=e95]
            - cell [ref=e96]
            - cell "CSV" [ref=e97]:
              - text: CSV
              - link [ref=e98] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12d3108348b-pushnotificationsspuat---Production.csv
                - generic [ref=e99]: 
            - cell "Important Announcements" [ref=e100]
            - cell [ref=e101]
            - cell "Draft" [ref=e102]:
              - generic [ref=e103]: Draft
            - cell [ref=e104]
            - cell "" [ref=e105]:
              - list [ref=e107]:
                - listitem [ref=e108]:
                  - link "" [ref=e109] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFItUGBgCmAK
                    - generic [ref=e110]: 
          - row "AutoDoc_1779618527471 JPG Important Announcements Draft " [ref=e111]:
            - cell [ref=e112]:
              - checkbox [ref=e114]
            - cell "AutoDoc_1779618527471" [ref=e115]
            - cell [ref=e116]:
              - img [ref=e117]
            - cell [ref=e118]
            - cell "JPG" [ref=e119]:
              - text: JPG
              - link [ref=e120] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12d2e572a9e-goldengate.jpg
                - generic [ref=e121]: 
            - cell "Important Announcements" [ref=e122]
            - cell [ref=e123]
            - cell "Draft" [ref=e124]:
              - generic [ref=e125]: Draft
            - cell [ref=e126]
            - cell "" [ref=e127]:
              - list [ref=e129]:
                - listitem [ref=e130]:
                  - link "" [ref=e131] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFItQGBgCmAK
                    - generic [ref=e132]: 
          - row "AutoDoc_1779618479884 PNG Important Announcements Draft " [ref=e133]:
            - cell [ref=e134]:
              - checkbox [ref=e136]
            - cell "AutoDoc_1779618479884" [ref=e137]
            - cell [ref=e138]:
              - img [ref=e139]
            - cell [ref=e140]
            - cell "PNG" [ref=e141]:
              - text: PNG
              - link [ref=e142] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12d2b82b759-Amsterdam.png
                - generic [ref=e143]: 
            - cell "Important Announcements" [ref=e144]
            - cell [ref=e145]
            - cell "Draft" [ref=e146]:
              - generic [ref=e147]: Draft
            - cell [ref=e148]
            - cell "" [ref=e149]:
              - list [ref=e151]:
                - listitem [ref=e152]:
                  - link "" [ref=e153] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFItMGBgCmAK
                    - generic [ref=e154]: 
          - row "AutoDoc_1779618383998 PDF Important Announcements Draft " [ref=e155]:
            - cell [ref=e156]:
              - checkbox [ref=e158]
            - cell "AutoDoc_1779618383998" [ref=e159]
            - cell [ref=e160]:
              - img [ref=e161]
            - cell [ref=e162]
            - cell "PDF" [ref=e163]:
              - text: PDF
              - link [ref=e164] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12d259be7dc-Document-Object-Model-(DOM)-Made-Easy.pdf
                - generic [ref=e165]: 
            - cell "Important Announcements" [ref=e166]
            - cell [ref=e167]
            - cell "Draft" [ref=e168]:
              - generic [ref=e169]: Draft
            - cell [ref=e170]
            - cell "" [ref=e171]:
              - list [ref=e173]:
                - listitem [ref=e174]:
                  - link "" [ref=e175] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFItYGBgCmAK
                    - generic [ref=e176]: 
          - row "AutoDoc_1779599622689 PDF Important Announcements Draft " [ref=e177]:
            - cell [ref=e178]:
              - checkbox [ref=e180]
            - cell "AutoDoc_1779599622689" [ref=e181]
            - cell [ref=e182]:
              - img [ref=e183]
            - cell [ref=e184]
            - cell "PDF" [ref=e185]:
              - text: PDF
              - link [ref=e186] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12890c8fc76-Document-Object-Model-(DOM)-Made-Easy.pdf
                - generic [ref=e187]: 
            - cell "Important Announcements" [ref=e188]
            - cell [ref=e189]
            - cell "Draft" [ref=e190]:
              - generic [ref=e191]: Draft
            - cell [ref=e192]
            - cell "" [ref=e193]:
              - list [ref=e195]:
                - listitem [ref=e196]:
                  - link "" [ref=e197] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFIsUGBgCmAK
                    - generic [ref=e198]: 
          - row "Document's TESTING & 11TH MAY 2026 PNG IMAGE With Name special characters MP4 Important Announcements Raj2024 Syndicated 2026-05-11 02:28 PM  " [ref=e199]:
            - cell [ref=e200]:
              - checkbox [ref=e202]
            - cell "Document's TESTING & 11TH MAY 2026 PNG IMAGE With Name special characters" [ref=e203]
            - cell [ref=e204]:
              - img [ref=e205]
            - cell [ref=e206]
            - cell "MP4" [ref=e207]:
              - text: MP4
              - link [ref=e208] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a0199fc29786-AUTO-VID.mp4
                - generic [ref=e209]: 
            - cell "Important Announcements" [ref=e210]
            - cell "Raj2024" [ref=e211]
            - cell "Syndicated" [ref=e212]:
              - generic [ref=e213]: Syndicated
            - cell "2026-05-11 02:28 PM" [ref=e214]
            - cell " " [ref=e215]:
              - list [ref=e217]:
                - listitem [ref=e218]:
                  - link "" [ref=e219] [cursor=pointer]:
                    - /url: javascript:void(0);
                    - generic [ref=e220]: 
                - listitem [ref=e221]:
                  - generic "Copy" [ref=e222]:
                    - generic [ref=e224]: 
          - row "TestDocument_1776002967038 JPG Important Announcements, Employee PMS & Perks, Leader Announcements Rraghav Test 999 Syndicated 2026-04-12 08:05 PM  " [ref=e225]:
            - cell [ref=e226]:
              - checkbox [ref=e228]
            - cell "TestDocument_1776002967038" [ref=e229]
            - cell [ref=e230]:
              - img [ref=e231]
            - cell [ref=e232]
            - cell "JPG" [ref=e233]:
              - text: JPG
              - link [ref=e234] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/69dba79b64d92-budapest.jpg
                - generic [ref=e235]: 
            - cell "Important Announcements, Employee PMS & Perks, Leader Announcements" [ref=e236]
            - cell "Rraghav Test 999" [ref=e237]
            - cell "Syndicated" [ref=e238]:
              - generic [ref=e239]: Syndicated
            - cell "2026-04-12 08:05 PM" [ref=e240]
            - cell " " [ref=e241]:
              - list [ref=e243]:
                - listitem [ref=e244]:
                  - link "" [ref=e245] [cursor=pointer]:
                    - /url: javascript:void(0);
                    - generic [ref=e246]: 
                - listitem [ref=e247]:
                  - generic "Copy" [ref=e248]:
                    - generic [ref=e250]: 
          - row "TestDocument_1776002923745 JPG Important Announcements, Employee PMS & Perks, Leader Announcements Draft " [ref=e251]:
            - cell [ref=e252]:
              - checkbox [ref=e254]
            - cell "TestDocument_1776002923745" [ref=e255]
            - cell [ref=e256]:
              - img [ref=e257]
            - cell [ref=e258]
            - cell "JPG" [ref=e259]:
              - text: JPG
              - link [ref=e260] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/69dba76fee74a-budapest.jpg
                - generic [ref=e261]: 
            - cell "Important Announcements, Employee PMS & Perks, Leader Announcements" [ref=e262]
            - cell [ref=e263]
            - cell "Draft" [ref=e264]:
              - generic [ref=e265]: Draft
            - cell [ref=e266]
            - cell "" [ref=e267]:
              - list [ref=e269]:
                - listitem [ref=e270]:
                  - link "" [ref=e271] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzLFQtYGBgCmAK
                    - generic [ref=e272]: 
          - row "TestDocument_1776002760163 MP4 Important Announcements Draft " [ref=e273]:
            - cell [ref=e274]:
              - checkbox [ref=e276]
            - cell "TestDocument_1776002760163" [ref=e277]
            - cell [ref=e278]:
              - img [ref=e279]
            - cell [ref=e280]
            - cell "MP4" [ref=e281]:
              - text: MP4
              - link [ref=e282] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/69dba6d1af130-AUTO-VID.mp4
                - generic [ref=e283]: 
            - cell "Important Announcements" [ref=e284]
            - cell [ref=e285]
            - cell "Draft" [ref=e286]:
              - generic [ref=e287]: Draft
            - cell [ref=e288]
            - cell "" [ref=e289]:
              - list [ref=e291]:
                - listitem [ref=e292]:
                  - link "" [ref=e293] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzLFQsUGBgCmAK
                    - generic [ref=e294]: 
      - generic [ref=e296]:
        - text: Show
        - combobox "Show entries" [ref=e297]:
          - option "10" [selected]
          - option "25"
          - option "50"
          - option "100"
        - text: entries
      - status [ref=e298]: Showing 1 to 10 of 183 entries
      - generic [ref=e299]:
        - link "" [disabled]:
          - generic: 
        - generic [ref=e300]:
          - link "1" [ref=e301]
          - link "2" [ref=e302]
          - link "3" [ref=e303]
          - link "4" [ref=e304]
          - link "5" [ref=e305]
          - text: …
          - link "19" [ref=e306]
        - link "" [ref=e307]:
          - generic [ref=e308]: 
  - text: 
  - generic [ref=e309]: 
  - text: 
  - status [ref=e310]
```

# Test source

```ts
  102 |     // contains(@href) instead of exact match — preprod adds a path prefix (/manager/...)
  103 |     // not(contains(@href,'document_id')) excludes row-level Edit buttons that share the same base URL
  104 |     this.uploadMenuOption        = page.locator("//a[contains(@href,'sp-upload-document.php') and not(contains(@href,'document_id'))]");
  105 |     this.accessMenuOption        = page.locator("#add_synd");
  106 |     this.updateHashtagMenuOption = page.locator("#add_hastag");
  107 |     this.deleteMenuOption        = page.locator("#Delete3");
  108 | 
  109 |     // Upload form
  110 |     this.uploadButton      = page.locator("//input[@id='share_button']");
  111 |     this.documentNameField = page.locator("#document_name");
  112 |     this.fileInput         = page.locator("#document_file");
  113 |     this.thumbnailInput    = page.locator("#img_validate");
  114 |     this.croppingHandle    = page.locator("//div[contains(@class,'imgareaselect-border4')]");
  115 |     this.applyButton       = page.locator("//a[@class='btn yes yellow-gold pull-right']");
  116 |     this.descriptionField  = page.locator("//textarea[@class='form-control h150']");
  117 | 
  118 |     // Document options — radio buttons selected by their value attribute
  119 |     this.documentOptionTwo   = page.locator("//input[@value='2']");
  120 |     this.documentOptionThree = page.locator("//input[@value='3']");
  121 |     // Toggle switch — clicking the off-handle turns the toggle on
  122 |     this.downloadableToggle  = page.locator("//span[@class='bootstrap-switch-handle-off bootstrap-switch-default']");
  123 | 
  124 |     // Hashtag autocomplete
  125 |     this.hashtagField = page.locator("#tagcsv");
  126 |     // On preprod/prod the suggestion li has extra classes so we also match by exact text
  127 |     // On dev the generic ui-menu-item match is enough
  128 |     this.hashtagSuggestion = ENV === 'dev'
  129 |       ? page.locator("//li[contains(@class,'ui-menu-item')]")
  130 |       : page.locator("//li[contains(@class,'ui-menu-item') and text()='teaser']");
  131 | 
  132 |     // Search & listing
  133 |     this.searchBox                = page.locator("//input[@type='search' and @placeholder='Search']");
  134 |     // First document name in the table — used to grab a real name before searching/deleting
  135 |     this.firstDocumentNameElement = page.locator("(//td[@class='wBreak d-none d-md-table-cell'])[1]");
  136 |     this.noRecordsElement         = page.locator("//td[contains(@class,'dataTables_empty') and normalize-space()='No matching records found']");
  137 | 
  138 |     // Delete flow
  139 |     this.okButton  = page.locator("//button[@type='button' and @class='btn btn-primary bootbox-accept' and text()='OK']");
  140 |     this.dialogBox = page.locator("//div[@class='bootbox-body']");
  141 | 
  142 |     // First checkbox in the listing and the dynamic text cell it unlocks
  143 |     this.checkboxOption = page.locator("(//input[@id='document_content'])[1]");
  144 |     // Finds a row containing a 'Draft' badge and targets its checkbox
  145 |     // Used in TC_DL_40 — access can only be updated for Draft documents
  146 |     this.draftDocumentCheckbox = page.getByText('Draft', { exact: true })
  147 |       .first()
  148 |       .locator('xpath=ancestor::tr')
  149 |       .locator('input[id="document_content"]');
  150 |     // This cell only shows cursor:no-drop style after a checkbox is selected
  151 |     this.dynamicElement = page.locator("(//td[@class='wBreak d-none d-md-table-cell' and @style='cursor: no-drop;'])[1]");
  152 | 
  153 |     // Access control
  154 |     this.teamRadioButton      = page.locator("#partners_option");
  155 |     this.partnerCategoryButton = page.locator("#btn_ptr_category");
  156 |     this.categoryLabel         = page.locator("//label[normalize-space()='Raj2024']");
  157 |     this.updateAccessButton    = page.locator("#synd_update_id");
  158 | 
  159 |     // Schedule
  160 |     this.scheduleCheckbox  = page.locator("#schedule");
  161 |     this.scheduleTextbox   = page.locator("#schedule_synd");
  162 |     this.contentUpdateDate = page.locator("//input[@id='start_date' and @name='start_date' and @type='text']");
  163 |   }
  164 | 
  165 | 
  166 |   // ─────────────────────────────────────────────────────────────────────
  167 |   // NAVIGATION METHODS
  168 |   // ─────────────────────────────────────────────────────────────────────
  169 | 
  170 |   // Compound navigation — clicks Communication tab then Document Library link
  171 |   // Used in beforeEach so every test starts on the Document Library list page
  172 |   async navigateToDocumentLibrary(): Promise<void> {
  173 |     await this.communicationTab.click();
  174 |     await this.documentLibraryLink.click();
  175 |   }
  176 | 
  177 |   // Opens the Actions dropdown
  178 |   // actionsButton is already env-aware from the constructor — plain click works for all envs
  179 |   async clickActionsButton(): Promise<void> {
  180 |     await this.actionsButton.click();
  181 |   }
  182 | 
  183 | 
  184 |   // ─────────────────────────────────────────────────────────────────────
  185 |   // ACTIONS MENU METHODS
  186 |   // ─────────────────────────────────────────────────────────────────────
  187 | 
  188 |   // Returns the visible text of all 4 options in the open Actions menu
  189 |   // Reads each locator individually — same approach as the Java project
  190 |   async getDocumentLibraryOptions(): Promise<string[]> {
  191 |     return [
  192 |       (await this.uploadMenuOption.innerText()).trim(),
  193 |       (await this.accessMenuOption.innerText()).trim(),
  194 |       (await this.updateHashtagMenuOption.innerText()).trim(),
  195 |       (await this.deleteMenuOption.innerText()).trim(),
  196 |     ];
  197 |   }
  198 | 
  199 |   // Waits for the Upload option to be visible before clicking
  200 |   // On preprod the dropdown can close before the element is interactable
  201 |   async clickUploadOption(): Promise<void> {
> 202 |     await this.uploadMenuOption.waitFor({ state: 'visible' });
      |                                 ^ Error: locator.waitFor: Test timeout of 60000ms exceeded.
  203 |     await this.uploadMenuOption.click();
  204 |   }
  205 | 
  206 |   async clickAccessOption(): Promise<void> {
  207 |     await this.accessMenuOption.click();
  208 |   }
  209 | 
  210 |   async clickDeleteOption(): Promise<void> {
  211 |     await this.deleteMenuOption.click();
  212 |   }
  213 | 
  214 | 
  215 |   // ─────────────────────────────────────────────────────────────────────
  216 |   // UPLOAD FORM METHODS
  217 |   // ─────────────────────────────────────────────────────────────────────
  218 | 
  219 |   async enterDocumentName(name: string): Promise<void> {
  220 |     await this.documentNameField.fill(name);
  221 |   }
  222 | 
  223 |   // Core upload method — sets the file directly on the hidden input
  224 |   // No OS dialog, no AutoIt — Playwright handles file inputs natively
  225 |   async uploadDocument(filePath: string): Promise<void> {
  226 |     await this.fileInput.setInputFiles(filePath);
  227 |   }
  228 | 
  229 |   // Convenience wrappers — each one calls uploadDocument() with the right static path
  230 |   async uploadDocumentUsingPDF():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.PDF_FILE);  }
  231 |   async uploadDocumentUsingPNG():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.PNG_FILE);  }
  232 |   async uploadDocumentUsingJPG():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.JPG_FILE);  }
  233 |   async uploadDocumentUsingXLSX(): Promise<void> { await this.uploadDocument(DocumentLibraryPage.XLSX_FILE); }
  234 |   async uploadDocumentUsingMP4():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.MP4_FILE);  }
  235 |   async uploadDocumentUsingGIF():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.GIF_FILE);  }
  236 | 
  237 |   async attachThumbnail(thumbnailPath: string): Promise<void> {
  238 |     await this.thumbnailInput.setInputFiles(thumbnailPath);
  239 |   }
  240 | 
  241 |   // Drags the crop handle to resize the cropping area on the thumbnail
  242 |   // Playwright mouse API: move → down → move (drag) → up
  243 |   // boundingBox() gives us the element's position and size on screen
  244 |   async resizeCroppingArea(): Promise<void> {
  245 |     await this.croppingHandle.waitFor({ state: 'visible' });
  246 |     const box = await this.croppingHandle.boundingBox();
  247 |     if (box) {
  248 |       await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  249 |       await this.page.mouse.down();
  250 |       await this.page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2 + 50);
  251 |       await this.page.mouse.up();
  252 |     }
  253 |   }
  254 | 
  255 |   async clickApplyButton(): Promise<void> {
  256 |     await this.applyButton.click();
  257 |   }
  258 | 
  259 |   async enterDescription(text: string): Promise<void> {
  260 |     await this.descriptionField.scrollIntoViewIfNeeded();
  261 |     await this.descriptionField.fill(text);
  262 |   }
  263 | 
  264 |   async clickUploadButton(): Promise<void> {
  265 |     await this.uploadButton.scrollIntoViewIfNeeded();
  266 |     await this.uploadButton.click();
  267 |   }
  268 | 
  269 | 
  270 |   // ─────────────────────────────────────────────────────────────────────
  271 |   // DOCUMENT OPTIONS METHODS
  272 |   // ─────────────────────────────────────────────────────────────────────
  273 | 
  274 |   async clickDocumentOptionTwo(): Promise<void> {
  275 |     await this.documentOptionTwo.click();
  276 |   }
  277 | 
  278 |   async clickDocumentOptionThree(): Promise<void> {
  279 |     await this.documentOptionThree.click();
  280 |   }
  281 | 
  282 |   async clickDownloadableToggle(): Promise<void> {
  283 |     await this.downloadableToggle.click();
  284 |   }
  285 | 
  286 | 
  287 |   // ─────────────────────────────────────────────────────────────────────
  288 |   // HASHTAG METHODS
  289 |   // ─────────────────────────────────────────────────────────────────────
  290 | 
  291 |   async enterHashtag(text: string): Promise<void> {
  292 |     await this.hashtagField.fill(text);
  293 |   }
  294 | 
  295 |   // hashtagSuggestion is already env-aware from the constructor
  296 |   async selectHashtagSuggestion(): Promise<void> {
  297 |     await this.hashtagSuggestion.click();
  298 |   }
  299 | 
  300 | 
  301 |   // ─────────────────────────────────────────────────────────────────────
  302 |   // VALIDATION MESSAGE METHODS
```