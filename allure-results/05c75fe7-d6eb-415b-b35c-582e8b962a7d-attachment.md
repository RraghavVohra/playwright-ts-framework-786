# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_41 - Update access control for a document with schedule
- Location: tests\e2e\document-library.spec.ts:806:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('//div[contains(@class,\'xdsoft_datetimepicker\') and contains(@style,\'display: block\')]').locator('td.xdsoft_date:not(.xdsoft_disabled)[data-date=\'1\'][data-month=\'5\']')

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
      - link [ref=e39] [cursor=pointer]:
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
          - row "AutoDoc_1780239642565 teaser JPG Important Announcements, Employee PMS & Perks, Leader Announcements Draft " [ref=e67]:
            - cell [ref=e68]:
              - checkbox [checked] [ref=e70]
            - cell "AutoDoc_1780239642565" [ref=e71]
            - cell [ref=e72]:
              - img [ref=e73]
            - cell "teaser" [ref=e74]
            - cell "JPG" [ref=e75]:
              - text: JPG
              - link [ref=e76] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1c4d1fc1050-goldengate.jpg
                - generic [ref=e77]: 
            - cell "Important Announcements, Employee PMS & Perks, Leader Announcements" [ref=e78]
            - cell [ref=e79]
            - cell "Draft" [ref=e80]:
              - generic [ref=e81]: Draft
            - cell [ref=e82]
            - cell "" [ref=e83]:
              - list [ref=e85]:
                - listitem [ref=e86]:
                  - link "" [ref=e87] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFQuYGBgCmAK
                    - generic [ref=e88]: 
          - row "AutoDoc_1780239592722 JPG Important Announcements, Employee PMS & Perks, Leader Announcements Draft " [ref=e89]:
            - cell [ref=e90]:
              - checkbox [ref=e92]
            - cell "AutoDoc_1780239592722" [ref=e93]
            - cell [ref=e94]:
              - img [ref=e95]
            - cell [ref=e96]
            - cell "JPG" [ref=e97]:
              - text: JPG
              - link [ref=e98] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1c4ceea0091-goldengate.jpg
                - generic [ref=e99]: 
            - cell "Important Announcements, Employee PMS & Perks, Leader Announcements" [ref=e100]
            - cell [ref=e101]
            - cell "Draft" [ref=e102]:
              - generic [ref=e103]: Draft
            - cell [ref=e104]
            - cell "" [ref=e105]:
              - list [ref=e107]:
                - listitem [ref=e108]:
                  - link "" [ref=e109] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFQtUGBgCmAK
                    - generic [ref=e110]: 
          - row "AutoDoc_1780239419094 XLSX Important Announcements Draft " [ref=e111]:
            - cell [ref=e112]:
              - checkbox [ref=e114]
            - cell "AutoDoc_1780239419094" [ref=e115]
            - cell [ref=e116]:
              - img [ref=e117]
            - cell [ref=e118]
            - cell "XLSX" [ref=e119]:
              - text: XLSX
              - link [ref=e120] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1c4c40583e9-SemgrepRescanpoints.xlsx
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
                    - /url: sp-upload-document.php?document_id=JCwzMFQtQGBgCmAK
                    - generic [ref=e132]: 
          - row "AutoDoc_1780230387068 MP4 Important Announcements Raj2024 Syndicated 2026-05-31 06:03 PM  " [ref=e133]:
            - cell [ref=e134]:
              - checkbox [ref=e136]
            - cell "AutoDoc_1780230387068" [ref=e137]
            - cell [ref=e138]:
              - img [ref=e139]
            - cell [ref=e140]
            - cell "MP4" [ref=e141]:
              - text: MP4
              - link [ref=e142] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1c28fb14987-video.mp4
                - generic [ref=e143]: 
            - cell "Important Announcements" [ref=e144]
            - cell "Raj2024" [ref=e145]
            - cell "Syndicated" [ref=e146]:
              - generic [ref=e147]: Syndicated
            - cell "2026-05-31 06:03 PM" [ref=e148]
            - cell " " [ref=e149]:
              - list [ref=e151]:
                - listitem [ref=e152]:
                  - link "" [ref=e153] [cursor=pointer]:
                    - /url: javascript:void(0);
                    - generic [ref=e154]: 
                - listitem [ref=e155]:
                  - generic "Copy" [ref=e156]:
                    - generic [ref=e158]: 
          - row "AutoDoc_1780230261602 MP4 Important Announcements Draft " [ref=e159]:
            - cell [ref=e160]:
              - checkbox [ref=e162]
            - cell "AutoDoc_1780230261602" [ref=e163]
            - cell [ref=e164]:
              - img [ref=e165]
            - cell [ref=e166]
            - cell "MP4" [ref=e167]:
              - text: MP4
              - link [ref=e168] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1c28840751a-video.mp4
                - generic [ref=e169]: 
            - cell "Important Announcements" [ref=e170]
            - cell [ref=e171]
            - cell "Draft" [ref=e172]:
              - generic [ref=e173]: Draft
            - cell [ref=e174]
            - cell "" [ref=e175]:
              - list [ref=e177]:
                - listitem [ref=e178]:
                  - link "" [ref=e179] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFQsUGBgCmAK
                    - generic [ref=e180]: 
          - row "AutoDoc_1780230143672 CSV Important Announcements Draft " [ref=e181]:
            - cell [ref=e182]:
              - checkbox [ref=e184]
            - cell "AutoDoc_1780230143672" [ref=e185]
            - cell [ref=e186]:
              - img [ref=e187]
            - cell [ref=e188]
            - cell "CSV" [ref=e189]:
              - text: CSV
              - link [ref=e190] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1c280435ccc-pushnotificationsspuat---Production.csv
                - generic [ref=e191]: 
            - cell "Important Announcements" [ref=e192]
            - cell [ref=e193]
            - cell "Draft" [ref=e194]:
              - generic [ref=e195]: Draft
            - cell [ref=e196]
            - cell "" [ref=e197]:
              - list [ref=e199]:
                - listitem [ref=e200]:
                  - link "" [ref=e201] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFQsQGBgCmAK
                    - generic [ref=e202]: 
          - row "AutoDoc_1780230099918 JPG Important Announcements Draft " [ref=e203]:
            - cell [ref=e204]:
              - checkbox [ref=e206]
            - cell "AutoDoc_1780230099918" [ref=e207]
            - cell [ref=e208]:
              - img [ref=e209]
            - cell [ref=e210]
            - cell "JPG" [ref=e211]:
              - text: JPG
              - link [ref=e212] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1c27d71d609-goldengate.jpg
                - generic [ref=e213]: 
            - cell "Important Announcements" [ref=e214]
            - cell [ref=e215]
            - cell "Draft" [ref=e216]:
              - generic [ref=e217]: Draft
            - cell [ref=e218]
            - cell "" [ref=e219]:
              - list [ref=e221]:
                - listitem [ref=e222]:
                  - link "" [ref=e223] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFQsMGBgCmAK
                    - generic [ref=e224]: 
          - row "AutoDoc_1780230057980 PNG Important Announcements Draft " [ref=e225]:
            - cell [ref=e226]:
              - checkbox [ref=e228]
            - cell "AutoDoc_1780230057980" [ref=e229]
            - cell [ref=e230]:
              - img [ref=e231]
            - cell [ref=e232]
            - cell "PNG" [ref=e233]:
              - text: PNG
              - link [ref=e234] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1c27af7aa7f-Amsterdam.png
                - generic [ref=e235]: 
            - cell "Important Announcements" [ref=e236]
            - cell [ref=e237]
            - cell "Draft" [ref=e238]:
              - generic [ref=e239]: Draft
            - cell [ref=e240]
            - cell "" [ref=e241]:
              - list [ref=e243]:
                - listitem [ref=e244]:
                  - link "" [ref=e245] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFQsYGBgCmAK
                    - generic [ref=e246]: 
          - row "AutoDoc_1780229970944 PDF Important Announcements Draft " [ref=e247]:
            - cell [ref=e248]:
              - checkbox [ref=e250]
            - cell "AutoDoc_1780229970944" [ref=e251]
            - cell [ref=e252]:
              - img [ref=e253]
            - cell [ref=e254]
            - cell "PDF" [ref=e255]:
              - text: PDF
              - link [ref=e256] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1c275f0db15-Document-Object-Model-(DOM)-Made-Easy.pdf
                - generic [ref=e257]: 
            - cell "Important Announcements" [ref=e258]
            - cell [ref=e259]
            - cell "Draft" [ref=e260]:
              - generic [ref=e261]: Draft
            - cell [ref=e262]
            - cell "" [ref=e263]:
              - list [ref=e265]:
                - listitem [ref=e266]:
                  - link "" [ref=e267] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFMuMGBgCmAK
                    - generic [ref=e268]: 
          - row "Document's TESTING & 11TH MAY 2026 PNG IMAGE With Name special characters MP4 Important Announcements Raj2024 Syndicated 2026-05-11 02:28 PM  " [ref=e269]:
            - cell [ref=e270]:
              - checkbox [ref=e272]
            - cell "Document's TESTING & 11TH MAY 2026 PNG IMAGE With Name special characters" [ref=e273]
            - cell [ref=e274]:
              - img [ref=e275]
            - cell [ref=e276]
            - cell "MP4" [ref=e277]:
              - text: MP4
              - link [ref=e278] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a0199fc29786-AUTO-VID.mp4
                - generic [ref=e279]: 
            - cell "Important Announcements" [ref=e280]
            - cell "Raj2024" [ref=e281]
            - cell "Syndicated" [ref=e282]:
              - generic [ref=e283]: Syndicated
            - cell "2026-05-11 02:28 PM" [ref=e284]
            - cell " " [ref=e285]:
              - list [ref=e287]:
                - listitem [ref=e288]:
                  - link "" [ref=e289] [cursor=pointer]:
                    - /url: javascript:void(0);
                    - generic [ref=e290]: 
                - listitem [ref=e291]:
                  - generic "Copy" [ref=e292]:
                    - generic [ref=e294]: 
      - generic [ref=e296]:
        - text: Show
        - combobox "Show entries" [ref=e297]:
          - option "10" [selected]
          - option "25"
          - option "50"
          - option "100"
        - text: entries
      - status [ref=e298]: Showing 1 to 10 of 186 entries
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
  - dialog "Select document creative to access" [ref=e309]:
    - generic [ref=e310]:
      - generic [ref=e312]:
        - generic [ref=e313]:
          - button "Close" [ref=e314] [cursor=pointer]
          - heading "Select document creative to access" [level=5] [ref=e315]
        - generic [ref=e316]:
          - checkbox [checked] [ref=e318]
          - generic [ref=e320]: Push Notifications
        - generic [ref=e321]:
          - checkbox [checked] [ref=e323]
          - generic [ref=e325]: Email Notification
      - generic [ref=e326]:
        - generic [ref=e327]:
          - generic [ref=e328]:
            - generic [ref=e330]:
              - generic [ref=e331]:
                - radio "Team" [checked] [ref=e332]
                - text: Team
              - generic [ref=e333]:
                - radio "Users" [ref=e334]
                - text: Users
            - generic [ref=e336]:
              - generic [ref=e337]: Content Date
              - textbox [ref=e338]: 2026/05/31 20:32
            - generic [ref=e340]:
              - generic [ref=e341]: Expired On
              - textbox [ref=e342]
          - generic [ref=e343]:
            - generic [ref=e345]:
              - checkbox "Schedule" [checked] [ref=e346]
              - generic [ref=e347]: Schedule
            - generic [ref=e349]:
              - textbox [active] [ref=e350]
              - generic [ref=e352]: 
        - button "Raj2024" [ref=e356] [cursor=pointer]
      - generic [ref=e357]:
        - button "Cancel" [ref=e358] [cursor=pointer]
        - button "Update Access" [ref=e359] [cursor=pointer]
  - generic [ref=e360]: 
  - text: 
  - generic [ref=e361]:
    - generic [ref=e362]:
      - generic:
        - button [ref=e363] [cursor=pointer]
        - button [ref=e364] [cursor=pointer]
        - generic [ref=e365] [cursor=pointer]: July
        - generic [ref=e367] [cursor=pointer]: "2026"
        - button [ref=e369] [cursor=pointer]
      - table [ref=e371]:
        - rowgroup [ref=e372]:
          - row "Sun Mon Tue Wed Thu Fri Sat" [ref=e373]:
            - columnheader "Sun" [ref=e374]
            - columnheader "Mon" [ref=e375]
            - columnheader "Tue" [ref=e376]
            - columnheader "Wed" [ref=e377]
            - columnheader "Thu" [ref=e378]
            - columnheader "Fri" [ref=e379]
            - columnheader "Sat" [ref=e380]
        - rowgroup [ref=e381]:
          - row "28 29 30 1 2 3 4" [ref=e382]:
            - cell "28" [ref=e383]:
              - generic [ref=e384]: "28"
            - cell "29" [ref=e385]:
              - generic [ref=e386]: "29"
            - cell "30" [ref=e387]:
              - generic [ref=e388]: "30"
            - cell "1" [ref=e389] [cursor=pointer]:
              - generic [ref=e390]: "1"
            - cell "2" [ref=e391] [cursor=pointer]:
              - generic [ref=e392]: "2"
            - cell "3" [ref=e393] [cursor=pointer]:
              - generic [ref=e394]: "3"
            - cell "4" [ref=e395] [cursor=pointer]:
              - generic [ref=e396]: "4"
          - row "5 6 7 8 9 10 11" [ref=e397]:
            - cell "5" [ref=e398] [cursor=pointer]:
              - generic [ref=e399]: "5"
            - cell "6" [ref=e400] [cursor=pointer]:
              - generic [ref=e401]: "6"
            - cell "7" [ref=e402] [cursor=pointer]:
              - generic [ref=e403]: "7"
            - cell "8" [ref=e404] [cursor=pointer]:
              - generic [ref=e405]: "8"
            - cell "9" [ref=e406] [cursor=pointer]:
              - generic [ref=e407]: "9"
            - cell "10" [ref=e408] [cursor=pointer]:
              - generic [ref=e409]: "10"
            - cell "11" [ref=e410] [cursor=pointer]:
              - generic [ref=e411]: "11"
          - row "12 13 14 15 16 17 18" [ref=e412]:
            - cell "12" [ref=e413] [cursor=pointer]:
              - generic [ref=e414]: "12"
            - cell "13" [ref=e415] [cursor=pointer]:
              - generic [ref=e416]: "13"
            - cell "14" [ref=e417] [cursor=pointer]:
              - generic [ref=e418]: "14"
            - cell "15" [ref=e419] [cursor=pointer]:
              - generic [ref=e420]: "15"
            - cell "16" [ref=e421] [cursor=pointer]:
              - generic [ref=e422]: "16"
            - cell "17" [ref=e423] [cursor=pointer]:
              - generic [ref=e424]: "17"
            - cell "18" [ref=e425] [cursor=pointer]:
              - generic [ref=e426]: "18"
          - row "19 20 21 22 23 24 25" [ref=e427]:
            - cell "19" [ref=e428] [cursor=pointer]:
              - generic [ref=e429]: "19"
            - cell "20" [ref=e430] [cursor=pointer]:
              - generic [ref=e431]: "20"
            - cell "21" [ref=e432] [cursor=pointer]:
              - generic [ref=e433]: "21"
            - cell "22" [ref=e434] [cursor=pointer]:
              - generic [ref=e435]: "22"
            - cell "23" [ref=e436] [cursor=pointer]:
              - generic [ref=e437]: "23"
            - cell "24" [ref=e438] [cursor=pointer]:
              - generic [ref=e439]: "24"
            - cell "25" [ref=e440] [cursor=pointer]:
              - generic [ref=e441]: "25"
          - row "26 27 28 29 30 31 1" [ref=e442]:
            - cell "26" [ref=e443] [cursor=pointer]:
              - generic [ref=e444]: "26"
            - cell "27" [ref=e445] [cursor=pointer]:
              - generic [ref=e446]: "27"
            - cell "28" [ref=e447] [cursor=pointer]:
              - generic [ref=e448]: "28"
            - cell "29" [ref=e449] [cursor=pointer]:
              - generic [ref=e450]: "29"
            - cell "30" [ref=e451] [cursor=pointer]:
              - generic [ref=e452]: "30"
            - cell "31" [ref=e453] [cursor=pointer]:
              - generic [ref=e454]: "31"
            - cell "1" [ref=e455]:
              - generic [ref=e456]: "1"
    - generic [ref=e457]:
      - button [ref=e458] [cursor=pointer]
      - generic [ref=e460]:
        - generic [ref=e461] [cursor=pointer]: 00:00
        - generic [ref=e462] [cursor=pointer]: 01:00
        - generic [ref=e463] [cursor=pointer]: 02:00
        - generic [ref=e464] [cursor=pointer]: 03:00
        - generic [ref=e465] [cursor=pointer]: 04:00
        - generic [ref=e466] [cursor=pointer]: 05:00
        - generic [ref=e467] [cursor=pointer]: 06:00
        - generic [ref=e468] [cursor=pointer]: 07:00
        - generic [ref=e469] [cursor=pointer]: 08:00
        - generic [ref=e470] [cursor=pointer]: 09:00
        - generic [ref=e471] [cursor=pointer]: 10:00
        - generic [ref=e472] [cursor=pointer]: 11:00
        - generic [ref=e473] [cursor=pointer]: 12:00
        - generic [ref=e474] [cursor=pointer]: 13:00
        - generic [ref=e475] [cursor=pointer]: 14:00
        - generic [ref=e476] [cursor=pointer]: 15:00
        - generic [ref=e477] [cursor=pointer]: 16:00
        - generic [ref=e478] [cursor=pointer]: 17:00
        - generic [ref=e479] [cursor=pointer]: 18:00
        - generic [ref=e480] [cursor=pointer]: 19:00
        - generic [ref=e481] [cursor=pointer]: 20:00
        - generic [ref=e482] [cursor=pointer]: 21:00
        - generic [ref=e483] [cursor=pointer]: 22:00
        - generic [ref=e484] [cursor=pointer]: 23:00
      - button [ref=e486] [cursor=pointer]
  - status [ref=e487]
```

# Test source

```ts
  383 |   // dynamicElement only appears (with cursor:no-drop style) after a checkbox is selected
  384 |   async getDynamicText(): Promise<string> {
  385 |     await this.dynamicElement.waitFor({ state: 'visible' });
  386 |     return (await this.dynamicElement.innerText()).trim();
  387 |   }
  388 | 
  389 | 
  390 |   // ─────────────────────────────────────────────────────────────────────
  391 |   // ACCESS CONTROL METHODS
  392 |   // ─────────────────────────────────────────────────────────────────────
  393 | 
  394 |   async clickTeamRadioButton(): Promise<void> {
  395 |     await this.teamRadioButton.click();
  396 |   }
  397 | 
  398 |   async clickPartnerCategoryButton(): Promise<void> {
  399 |     await this.partnerCategoryButton.click();
  400 |   }
  401 | 
  402 |   async clickCategoryLabel(): Promise<void> {
  403 |     await this.categoryLabel.waitFor({ state: 'visible' });
  404 |     await this.categoryLabel.click();
  405 |   }
  406 | 
  407 |   async clickUpdateAccessButton(): Promise<void> {
  408 |     await this.updateAccessButton.click();
  409 |   }
  410 | 
  411 | 
  412 |   // ─────────────────────────────────────────────────────────────────────
  413 |   // SCHEDULE METHODS
  414 |   // ─────────────────────────────────────────────────────────────────────
  415 | 
  416 |   async clickScheduleCheckbox(): Promise<void> {
  417 |     await this.scheduleCheckbox.click();
  418 |   }
  419 | 
  420 |   async clickScheduleTextbox(): Promise<void> {
  421 |     await this.scheduleTextbox.click();
  422 |   }
  423 | 
  424 | 
  425 |   // ─────────────────────────────────────────────────────────────────────
  426 |   // CALENDAR METHODS (xdsoft datetime picker)
  427 |   // ─────────────────────────────────────────────────────────────────────
  428 | 
  429 |   // Private helper — shared by selectDateOfYourChoice() and selectCurrentActiveTime()
  430 |   // Clicks the currently highlighted time slot, or falls back to the first available one
  431 |   // Extracted so both callers share one implementation instead of copy-pasting
  432 |   private async selectActiveOrFirstTime(): Promise<void> {
  433 |     const activeTime = this.page.locator(
  434 |       "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]" +
  435 |       "//div[contains(@class,'xdsoft_time') and contains(@class,'xdsoft_current')]"
  436 |     );
  437 | 
  438 |     if (await activeTime.isVisible()) {
  439 |       await activeTime.scrollIntoViewIfNeeded();
  440 |       await activeTime.click();
  441 |     } else {
  442 |       const firstTime = this.page.locator(
  443 |         "(//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]" +
  444 |         "//div[contains(@class,'xdsoft_time')])[1]"
  445 |       );
  446 |       await firstTime.scrollIntoViewIfNeeded();
  447 |       await firstTime.click();
  448 |     }
  449 |   }
  450 | 
  451 |   async selectTodayInCalendar(): Promise<void> {
  452 |     await this.page.locator(
  453 |       "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]"
  454 |     ).waitFor({ state: 'visible' });
  455 | 
  456 |     const todayElement = this.page.locator(
  457 |       "//td[contains(@class,'xdsoft_date') and contains(@class,'xdsoft_today')]"
  458 |     );
  459 |     await todayElement.waitFor({ state: 'visible' });
  460 |     await todayElement.click();
  461 |   }
  462 | 
  463 |   // Selects a specific date in the xdsoft calendar picker
  464 |   // month is 1-based (January = 1) but xdsoft stores months 0-based internally
  465 |   async selectDateOfYourChoice(day: number, month: number, year: number): Promise<void> {
  466 |     const picker = this.page.locator(
  467 |       "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]"
  468 |     );
  469 |     await picker.waitFor({ state: 'visible' });
  470 | 
  471 |     // Year
  472 |     await picker.locator("div.xdsoft_label.xdsoft_year span").click();
  473 |     await picker.locator(`div.xdsoft_yearselect div[data-value='${year}']`).click();
  474 | 
  475 |     // Month — subtract 1 because xdsoft uses 0-based month index
  476 |     await picker.locator("div.xdsoft_label.xdsoft_month span").click();
  477 |     await picker.locator(`div.xdsoft_monthselect div[data-value='${month - 1}']`).click();
  478 |     // xdsoft re-renders the grid asynchronously after month selection — wait until at least
  479 |     // one cell from the new month is visible before targeting the specific day
  480 |     await picker.locator(`td.xdsoft_date[data-month='${month - 1}']`).first().waitFor({ state: 'visible' });
  481 | 
  482 |     // Day — data-month pins to the selected month, excluding overflow days from adjacent months
> 483 |     await picker.locator(`td.xdsoft_date:not(.xdsoft_disabled)[data-date='${day}'][data-month='${month - 1}']`).click();
      |                                                                                                                 ^ Error: locator.click: Test timeout of 90000ms exceeded.
  484 | 
  485 |     await this.selectActiveOrFirstTime();
  486 |   }
  487 | 
  488 |   // Selects just the time from an already-open calendar picker
  489 |   async selectCurrentActiveTime(): Promise<void> {
  490 |     await this.page.locator(
  491 |       "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]"
  492 |     ).waitFor({ state: 'visible' });
  493 |     await this.selectActiveOrFirstTime();
  494 |   }
  495 | 
  496 | 
  497 |   // ─────────────────────────────────────────────────────────────────────
  498 |   // SCROLL HELPERS
  499 |   // page.evaluate() runs JavaScript directly in the browser
  500 |   // ─────────────────────────────────────────────────────────────────────
  501 | 
  502 |   async scrollToTop(): Promise<void> {
  503 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  504 |   }
  505 | 
  506 |   async scrollToBottom(): Promise<void> {
  507 |     await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  508 |   }
  509 | 
  510 |   async scrollDownByFiveHundred(): Promise<void> {
  511 |     await this.page.evaluate(() => window.scrollBy(0, 500));
  512 |   }
  513 | }
  514 | 
```