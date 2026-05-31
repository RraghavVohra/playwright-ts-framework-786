# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_41 - Update access control for a document with schedule
- Location: tests\e2e\document-library.spec.ts:805:7

# Error details

```
Error: locator.click: Error: strict mode violation: locator('//div[contains(@class,\'xdsoft_datetimepicker\') and contains(@style,\'display: block\')]').locator('td.xdsoft_date:not(.xdsoft_disabled)[data-date=\'1\']') resolved to 2 elements:
    1) <td title="" data-date="1" data-month="6" data-year="2026" class="xdsoft_date xdsoft_day_of_week3 xdsoft_date xdsoft_current">…</td> aka getByRole('cell', { name: '1', exact: true }).first()
    2) <td title="" data-date="1" data-month="7" data-year="2026" class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_other_month xdsoft_weekend">…</td> aka getByRole('cell', { name: '1', exact: true }).nth(1)

Call log:
  - waiting for locator('//div[contains(@class,\'xdsoft_datetimepicker\') and contains(@style,\'display: block\')]').locator('td.xdsoft_date:not(.xdsoft_disabled)[data-date=\'1\']')

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
          - row "AutoDoc_1780211976590 JPG Important Announcements, Employee PMS & Perks, Leader Announcements Raj2024 Syndicated 2026-05-31 12:53 PM  " [ref=e67]:
            - cell [ref=e68]:
              - checkbox [ref=e70]
            - cell "AutoDoc_1780211976590" [ref=e71]
            - cell [ref=e72]:
              - img [ref=e73]
            - cell [ref=e74]
            - cell "JPG" [ref=e75]:
              - text: JPG
              - link [ref=e76] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1be10c6197d-goldengate.jpg
                - generic [ref=e77]: 
            - cell "Important Announcements, Employee PMS & Perks, Leader Announcements" [ref=e78]
            - cell "Raj2024" [ref=e79]
            - cell "Syndicated" [ref=e80]:
              - generic [ref=e81]: Syndicated
            - cell "2026-05-31 12:53 PM" [ref=e82]
            - cell " " [ref=e83]:
              - list [ref=e85]:
                - listitem [ref=e86]:
                  - link "" [ref=e87] [cursor=pointer]:
                    - /url: javascript:void(0);
                    - generic [ref=e88]: 
                - listitem [ref=e89]:
                  - generic "Copy" [ref=e90]:
                    - generic [ref=e92]: 
          - row "AutoDoc_1780211686277 XLSX Important Announcements Draft " [ref=e93]:
            - cell [ref=e94]:
              - checkbox [checked] [ref=e96]
            - cell "AutoDoc_1780211686277" [ref=e97]
            - cell [ref=e98]:
              - img [ref=e99]
            - cell [ref=e100]
            - cell "XLSX" [ref=e101]:
              - text: XLSX
              - link [ref=e102] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1bdfea0a91e-SemgrepRescanpoints.xlsx
                - generic [ref=e103]: 
            - cell "Important Announcements" [ref=e104]
            - cell [ref=e105]
            - cell "Draft" [ref=e106]:
              - generic [ref=e107]: Draft
            - cell [ref=e108]
            - cell "" [ref=e109]:
              - list [ref=e111]:
                - listitem [ref=e112]:
                  - link "" [ref=e113] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFMtQGBgCmAK
                    - generic [ref=e114]: 
          - row "AutoDoc_1780211636459 CSV Important Announcements Draft " [ref=e115]:
            - cell [ref=e116]:
              - checkbox [ref=e118]
            - cell "AutoDoc_1780211636459" [ref=e119]
            - cell [ref=e120]:
              - img [ref=e121]
            - cell [ref=e122]
            - cell "CSV" [ref=e123]:
              - text: CSV
              - link [ref=e124] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1bdfb7b0fab-pushnotificationsspuat---Production.csv
                - generic [ref=e125]: 
            - cell "Important Announcements" [ref=e126]
            - cell [ref=e127]
            - cell "Draft" [ref=e128]:
              - generic [ref=e129]: Draft
            - cell [ref=e130]
            - cell "" [ref=e131]:
              - list [ref=e133]:
                - listitem [ref=e134]:
                  - link "" [ref=e135] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFMtMGBgCmAK
                    - generic [ref=e136]: 
          - row "AutoDoc_1780211598576 JPG Important Announcements Draft " [ref=e137]:
            - cell [ref=e138]:
              - checkbox [ref=e140]
            - cell "AutoDoc_1780211598576" [ref=e141]
            - cell [ref=e142]:
              - img [ref=e143]
            - cell [ref=e144]
            - cell "JPG" [ref=e145]:
              - text: JPG
              - link [ref=e146] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1bdf922cc1c-goldengate.jpg
                - generic [ref=e147]: 
            - cell "Important Announcements" [ref=e148]
            - cell [ref=e149]
            - cell "Draft" [ref=e150]:
              - generic [ref=e151]: Draft
            - cell [ref=e152]
            - cell "" [ref=e153]:
              - list [ref=e155]:
                - listitem [ref=e156]:
                  - link "" [ref=e157] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFMtYGBgCmAK
                    - generic [ref=e158]: 
          - row "AutoDoc_1780211558674 PNG Important Announcements Draft " [ref=e159]:
            - cell [ref=e160]:
              - checkbox [ref=e162]
            - cell "AutoDoc_1780211558674" [ref=e163]
            - cell [ref=e164]:
              - img [ref=e165]
            - cell [ref=e166]
            - cell "PNG" [ref=e167]:
              - text: PNG
              - link [ref=e168] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1bdf6ba00e4-Amsterdam.png
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
                    - /url: sp-upload-document.php?document_id=JCwzMFMsUGBgCmAK
                    - generic [ref=e180]: 
          - row "AutoDoc_1780211487479 PDF Important Announcements Draft " [ref=e181]:
            - cell [ref=e182]:
              - checkbox [ref=e184]
            - cell "AutoDoc_1780211487479" [ref=e185]
            - cell [ref=e186]:
              - img [ref=e187]
            - cell [ref=e188]
            - cell "PDF" [ref=e189]:
              - text: PDF
              - link [ref=e190] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a1bdf27735a2-Document-Object-Model-(DOM)-Made-Easy.pdf
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
                    - /url: sp-upload-document.php?document_id=JCwzMFMsQGBgCmAK
                    - generic [ref=e202]: 
          - row "AutoDoc_1779618615393 XLSX Important Announcements Draft " [ref=e203]:
            - cell [ref=e204]:
              - checkbox [ref=e206]
            - cell "AutoDoc_1779618615393" [ref=e207]
            - cell [ref=e208]:
              - img [ref=e209]
            - cell [ref=e210]
            - cell "XLSX" [ref=e211]:
              - text: XLSX
              - link [ref=e212] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12d33f40d1a-SemgrepRescanpoints.xlsx
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
                    - /url: sp-upload-document.php?document_id=JCwzMFIuYGBgCmAK
                    - generic [ref=e224]: 
          - row "AutoDoc_1779618568331 CSV Important Announcements Draft " [ref=e225]:
            - cell [ref=e226]:
              - checkbox [ref=e228]
            - cell "AutoDoc_1779618568331" [ref=e229]
            - cell [ref=e230]:
              - img [ref=e231]
            - cell [ref=e232]
            - cell "CSV" [ref=e233]:
              - text: CSV
              - link [ref=e234] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12d3108348b-pushnotificationsspuat---Production.csv
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
                    - /url: sp-upload-document.php?document_id=JCwzMFItUGBgCmAK
                    - generic [ref=e246]: 
          - row "AutoDoc_1779618527471 JPG Important Announcements Draft " [ref=e247]:
            - cell [ref=e248]:
              - checkbox [ref=e250]
            - cell "AutoDoc_1779618527471" [ref=e251]
            - cell [ref=e252]:
              - img [ref=e253]
            - cell [ref=e254]
            - cell "JPG" [ref=e255]:
              - text: JPG
              - link [ref=e256] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12d2e572a9e-goldengate.jpg
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
                    - /url: sp-upload-document.php?document_id=JCwzMFItQGBgCmAK
                    - generic [ref=e268]: 
          - row "AutoDoc_1779618479884 PNG Important Announcements Draft " [ref=e269]:
            - cell [ref=e270]:
              - checkbox [ref=e272]
            - cell "AutoDoc_1779618479884" [ref=e273]
            - cell [ref=e274]:
              - img [ref=e275]
            - cell [ref=e276]
            - cell "PNG" [ref=e277]:
              - text: PNG
              - link [ref=e278] [cursor=pointer]:
                - /url: https://d2s7q4z8t1mini.cloudfront.net/SPP113741/brochure/data/6a12d2b82b759-Amsterdam.png
                - generic [ref=e279]: 
            - cell "Important Announcements" [ref=e280]
            - cell [ref=e281]
            - cell "Draft" [ref=e282]:
              - generic [ref=e283]: Draft
            - cell [ref=e284]
            - cell "" [ref=e285]:
              - list [ref=e287]:
                - listitem [ref=e288]:
                  - link "" [ref=e289] [cursor=pointer]:
                    - /url: sp-upload-document.php?document_id=JCwzMFItMGBgCmAK
                    - generic [ref=e290]: 
      - generic [ref=e292]:
        - text: Show
        - combobox "Show entries" [ref=e293]:
          - option "10" [selected]
          - option "25"
          - option "50"
          - option "100"
        - text: entries
      - status [ref=e294]: Showing 1 to 10 of 189 entries
      - generic [ref=e295]:
        - link "" [disabled]:
          - generic: 
        - generic [ref=e296]:
          - link "1" [ref=e297]
          - link "2" [ref=e298]
          - link "3" [ref=e299]
          - link "4" [ref=e300]
          - link "5" [ref=e301]
          - text: …
          - link "19" [ref=e302]
        - link "" [ref=e303]:
          - generic [ref=e304]: 
  - dialog "Select document creative to access" [ref=e305]:
    - generic [ref=e306]:
      - generic [ref=e308]:
        - generic [ref=e309]:
          - button "Close" [ref=e310] [cursor=pointer]
          - heading "Select document creative to access" [level=5] [ref=e311]
        - generic [ref=e312]:
          - checkbox [checked] [ref=e314]
          - generic [ref=e316]: Push Notifications
        - generic [ref=e317]:
          - checkbox [checked] [ref=e319]
          - generic [ref=e321]: Email Notification
      - generic [ref=e322]:
        - generic [ref=e323]:
          - generic [ref=e324]:
            - generic [ref=e326]:
              - generic [ref=e327]:
                - radio "Team" [checked] [ref=e328]
                - text: Team
              - generic [ref=e329]:
                - radio "Users" [ref=e330]
                - text: Users
            - generic [ref=e332]:
              - generic [ref=e333]: Content Date
              - textbox [ref=e334]: 2026/05/31 12:54
            - generic [ref=e336]:
              - generic [ref=e337]: Expired On
              - textbox [ref=e338]
          - generic [ref=e339]:
            - generic [ref=e341]:
              - checkbox "Schedule" [checked] [ref=e342]
              - generic [ref=e343]: Schedule
            - generic [ref=e345]:
              - textbox [active] [ref=e346]
              - generic [ref=e348]: 
        - button "Raj2024" [ref=e352] [cursor=pointer]
      - generic [ref=e353]:
        - button "Cancel" [ref=e354] [cursor=pointer]
        - button "Update Access" [ref=e355] [cursor=pointer]
  - generic [ref=e356]: 
  - text: 
  - generic [ref=e357]:
    - generic [ref=e358]:
      - generic:
        - button [ref=e359] [cursor=pointer]
        - button [ref=e360] [cursor=pointer]
        - generic [ref=e361] [cursor=pointer]: July
        - generic [ref=e363] [cursor=pointer]: "2026"
        - button [ref=e365] [cursor=pointer]
      - table [ref=e367]:
        - rowgroup [ref=e368]:
          - row "Sun Mon Tue Wed Thu Fri Sat" [ref=e369]:
            - columnheader "Sun" [ref=e370]
            - columnheader "Mon" [ref=e371]
            - columnheader "Tue" [ref=e372]
            - columnheader "Wed" [ref=e373]
            - columnheader "Thu" [ref=e374]
            - columnheader "Fri" [ref=e375]
            - columnheader "Sat" [ref=e376]
        - rowgroup [ref=e377]:
          - row "28 29 30 1 2 3 4" [ref=e378]:
            - cell "28" [ref=e379]:
              - generic [ref=e380]: "28"
            - cell "29" [ref=e381]:
              - generic [ref=e382]: "29"
            - cell "30" [ref=e383]:
              - generic [ref=e384]: "30"
            - cell "1" [ref=e385] [cursor=pointer]:
              - generic [ref=e386]: "1"
            - cell "2" [ref=e387] [cursor=pointer]:
              - generic [ref=e388]: "2"
            - cell "3" [ref=e389] [cursor=pointer]:
              - generic [ref=e390]: "3"
            - cell "4" [ref=e391] [cursor=pointer]:
              - generic [ref=e392]: "4"
          - row "5 6 7 8 9 10 11" [ref=e393]:
            - cell "5" [ref=e394] [cursor=pointer]:
              - generic [ref=e395]: "5"
            - cell "6" [ref=e396] [cursor=pointer]:
              - generic [ref=e397]: "6"
            - cell "7" [ref=e398] [cursor=pointer]:
              - generic [ref=e399]: "7"
            - cell "8" [ref=e400] [cursor=pointer]:
              - generic [ref=e401]: "8"
            - cell "9" [ref=e402] [cursor=pointer]:
              - generic [ref=e403]: "9"
            - cell "10" [ref=e404] [cursor=pointer]:
              - generic [ref=e405]: "10"
            - cell "11" [ref=e406] [cursor=pointer]:
              - generic [ref=e407]: "11"
          - row "12 13 14 15 16 17 18" [ref=e408]:
            - cell "12" [ref=e409] [cursor=pointer]:
              - generic [ref=e410]: "12"
            - cell "13" [ref=e411] [cursor=pointer]:
              - generic [ref=e412]: "13"
            - cell "14" [ref=e413] [cursor=pointer]:
              - generic [ref=e414]: "14"
            - cell "15" [ref=e415] [cursor=pointer]:
              - generic [ref=e416]: "15"
            - cell "16" [ref=e417] [cursor=pointer]:
              - generic [ref=e418]: "16"
            - cell "17" [ref=e419] [cursor=pointer]:
              - generic [ref=e420]: "17"
            - cell "18" [ref=e421] [cursor=pointer]:
              - generic [ref=e422]: "18"
          - row "19 20 21 22 23 24 25" [ref=e423]:
            - cell "19" [ref=e424] [cursor=pointer]:
              - generic [ref=e425]: "19"
            - cell "20" [ref=e426] [cursor=pointer]:
              - generic [ref=e427]: "20"
            - cell "21" [ref=e428] [cursor=pointer]:
              - generic [ref=e429]: "21"
            - cell "22" [ref=e430] [cursor=pointer]:
              - generic [ref=e431]: "22"
            - cell "23" [ref=e432] [cursor=pointer]:
              - generic [ref=e433]: "23"
            - cell "24" [ref=e434] [cursor=pointer]:
              - generic [ref=e435]: "24"
            - cell "25" [ref=e436] [cursor=pointer]:
              - generic [ref=e437]: "25"
          - row "26 27 28 29 30 31 1" [ref=e438]:
            - cell "26" [ref=e439] [cursor=pointer]:
              - generic [ref=e440]: "26"
            - cell "27" [ref=e441] [cursor=pointer]:
              - generic [ref=e442]: "27"
            - cell "28" [ref=e443] [cursor=pointer]:
              - generic [ref=e444]: "28"
            - cell "29" [ref=e445] [cursor=pointer]:
              - generic [ref=e446]: "29"
            - cell "30" [ref=e447] [cursor=pointer]:
              - generic [ref=e448]: "30"
            - cell "31" [ref=e449] [cursor=pointer]:
              - generic [ref=e450]: "31"
            - cell "1" [ref=e451]:
              - generic [ref=e452]: "1"
    - generic [ref=e453]:
      - button [ref=e454] [cursor=pointer]
      - generic [ref=e456]:
        - generic [ref=e457] [cursor=pointer]: 00:00
        - generic [ref=e458] [cursor=pointer]: 01:00
        - generic [ref=e459] [cursor=pointer]: 02:00
        - generic [ref=e460] [cursor=pointer]: 03:00
        - generic [ref=e461] [cursor=pointer]: 04:00
        - generic [ref=e462] [cursor=pointer]: 05:00
        - generic [ref=e463] [cursor=pointer]: 06:00
        - generic [ref=e464] [cursor=pointer]: 07:00
        - generic [ref=e465] [cursor=pointer]: 08:00
        - generic [ref=e466] [cursor=pointer]: 09:00
        - generic [ref=e467] [cursor=pointer]: 10:00
        - generic [ref=e468] [cursor=pointer]: 11:00
        - generic [ref=e469] [cursor=pointer]: 12:00
        - generic [ref=e470] [cursor=pointer]: 13:00
        - generic [ref=e471] [cursor=pointer]: 14:00
        - generic [ref=e472] [cursor=pointer]: 15:00
        - generic [ref=e473] [cursor=pointer]: 16:00
        - generic [ref=e474] [cursor=pointer]: 17:00
        - generic [ref=e475] [cursor=pointer]: 18:00
        - generic [ref=e476] [cursor=pointer]: 19:00
        - generic [ref=e477] [cursor=pointer]: 20:00
        - generic [ref=e478] [cursor=pointer]: 21:00
        - generic [ref=e479] [cursor=pointer]: 22:00
        - generic [ref=e480] [cursor=pointer]: 23:00
      - button [ref=e483] [cursor=pointer]
  - status [ref=e484]
```

# Test source

```ts
  371 |     await this.draftDocumentCheckbox.first().click();
  372 |   }
  373 | 
  374 |   // dynamicElement only appears (with cursor:no-drop style) after a checkbox is selected
  375 |   async getDynamicText(): Promise<string> {
  376 |     await this.dynamicElement.waitFor({ state: 'visible' });
  377 |     return (await this.dynamicElement.innerText()).trim();
  378 |   }
  379 | 
  380 | 
  381 |   // ─────────────────────────────────────────────────────────────────────
  382 |   // ACCESS CONTROL METHODS
  383 |   // ─────────────────────────────────────────────────────────────────────
  384 | 
  385 |   async clickTeamRadioButton(): Promise<void> {
  386 |     await this.teamRadioButton.click();
  387 |   }
  388 | 
  389 |   async clickPartnerCategoryButton(): Promise<void> {
  390 |     await this.partnerCategoryButton.click();
  391 |   }
  392 | 
  393 |   async clickCategoryLabel(): Promise<void> {
  394 |     await this.categoryLabel.waitFor({ state: 'visible' });
  395 |     await this.categoryLabel.click();
  396 |   }
  397 | 
  398 |   async clickUpdateAccessButton(): Promise<void> {
  399 |     await this.updateAccessButton.click();
  400 |   }
  401 | 
  402 | 
  403 |   // ─────────────────────────────────────────────────────────────────────
  404 |   // SCHEDULE METHODS
  405 |   // ─────────────────────────────────────────────────────────────────────
  406 | 
  407 |   async clickScheduleCheckbox(): Promise<void> {
  408 |     await this.scheduleCheckbox.click();
  409 |   }
  410 | 
  411 |   async clickScheduleTextbox(): Promise<void> {
  412 |     await this.scheduleTextbox.click();
  413 |   }
  414 | 
  415 | 
  416 |   // ─────────────────────────────────────────────────────────────────────
  417 |   // CALENDAR METHODS (xdsoft datetime picker)
  418 |   // ─────────────────────────────────────────────────────────────────────
  419 | 
  420 |   // Private helper — shared by selectDateOfYourChoice() and selectCurrentActiveTime()
  421 |   // Clicks the currently highlighted time slot, or falls back to the first available one
  422 |   // Extracted so both callers share one implementation instead of copy-pasting
  423 |   private async selectActiveOrFirstTime(): Promise<void> {
  424 |     const activeTime = this.page.locator(
  425 |       "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]" +
  426 |       "//div[contains(@class,'xdsoft_time') and contains(@class,'xdsoft_current')]"
  427 |     );
  428 | 
  429 |     if (await activeTime.isVisible()) {
  430 |       await activeTime.scrollIntoViewIfNeeded();
  431 |       await activeTime.click();
  432 |     } else {
  433 |       const firstTime = this.page.locator(
  434 |         "(//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]" +
  435 |         "//div[contains(@class,'xdsoft_time')])[1]"
  436 |       );
  437 |       await firstTime.scrollIntoViewIfNeeded();
  438 |       await firstTime.click();
  439 |     }
  440 |   }
  441 | 
  442 |   async selectTodayInCalendar(): Promise<void> {
  443 |     await this.page.locator(
  444 |       "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]"
  445 |     ).waitFor({ state: 'visible' });
  446 | 
  447 |     const todayElement = this.page.locator(
  448 |       "//td[contains(@class,'xdsoft_date') and contains(@class,'xdsoft_today')]"
  449 |     );
  450 |     await todayElement.waitFor({ state: 'visible' });
  451 |     await todayElement.click();
  452 |   }
  453 | 
  454 |   // Selects a specific date in the xdsoft calendar picker
  455 |   // month is 1-based (January = 1) but xdsoft stores months 0-based internally
  456 |   async selectDateOfYourChoice(day: number, month: number, year: number): Promise<void> {
  457 |     const picker = this.page.locator(
  458 |       "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]"
  459 |     );
  460 |     await picker.waitFor({ state: 'visible' });
  461 | 
  462 |     // Year
  463 |     await picker.locator("div.xdsoft_label.xdsoft_year span").click();
  464 |     await picker.locator(`div.xdsoft_yearselect div[data-value='${year}']`).click();
  465 | 
  466 |     // Month — subtract 1 because xdsoft uses 0-based month index
  467 |     await picker.locator("div.xdsoft_label.xdsoft_month span").click();
  468 |     await picker.locator(`div.xdsoft_monthselect div[data-value='${month - 1}']`).click();
  469 | 
  470 |     // Day — skips disabled dates (past dates)
> 471 |     await picker.locator(`td.xdsoft_date:not(.xdsoft_disabled)[data-date='${day}']`).click();
      |                                                                                      ^ Error: locator.click: Error: strict mode violation: locator('//div[contains(@class,\'xdsoft_datetimepicker\') and contains(@style,\'display: block\')]').locator('td.xdsoft_date:not(.xdsoft_disabled)[data-date=\'1\']') resolved to 2 elements:
  472 | 
  473 |     await this.selectActiveOrFirstTime();
  474 |   }
  475 | 
  476 |   // Selects just the time from an already-open calendar picker
  477 |   async selectCurrentActiveTime(): Promise<void> {
  478 |     await this.page.locator(
  479 |       "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]"
  480 |     ).waitFor({ state: 'visible' });
  481 |     await this.selectActiveOrFirstTime();
  482 |   }
  483 | 
  484 | 
  485 |   // ─────────────────────────────────────────────────────────────────────
  486 |   // SCROLL HELPERS
  487 |   // page.evaluate() runs JavaScript directly in the browser
  488 |   // ─────────────────────────────────────────────────────────────────────
  489 | 
  490 |   async scrollToTop(): Promise<void> {
  491 |     await this.page.evaluate(() => window.scrollTo(0, 0));
  492 |   }
  493 | 
  494 |   async scrollToBottom(): Promise<void> {
  495 |     await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  496 |   }
  497 | 
  498 |   async scrollDownByFiveHundred(): Promise<void> {
  499 |     await this.page.evaluate(() => window.scrollBy(0, 500));
  500 |   }
  501 | }
  502 | 
```