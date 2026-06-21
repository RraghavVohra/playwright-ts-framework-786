# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: social-autopost.spec.ts >> Social Auto Post >> TC_SAP_09 - Upload wrong size image shows validation errors
- Location: tests\e2e\social-autopost.spec.ts:329:7

# Error details

```
Test timeout of 90000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('//a[normalize-space()=\'Create Post\']')
    - locator resolved to <a href="sp-partnersocial.php">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    152 × waiting for element to be visible, enabled and stable
        - element is not visible
      - retrying click action
        - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - img [ref=e5]
    - list [ref=e8]:
      - listitem
      - listitem [ref=e9]:
        - link "Automation" [ref=e10] [cursor=pointer]:
          - /url: javascript:;
          - text:  Automation
      - listitem [ref=e11]:
        - link "AssetLibrary" [ref=e12] [cursor=pointer]:
          - /url: ../home/AssetLibrary
      - listitem [ref=e13]:
        - link "journey" [ref=e14] [cursor=pointer]:
          - /url: javascript:;
          - text:  journey
      - listitem [ref=e15]:
        - link "Campaign" [ref=e16] [cursor=pointer]:
          - /url: javascript:;
          - text:  Campaign
      - listitem [ref=e17]:
        - link "Conversion" [ref=e18] [cursor=pointer]:
          - /url: javascript:;
          - text:  Conversion
      - listitem [ref=e19]:
        - link "Social" [ref=e20] [cursor=pointer]:
          - /url: javascript:;
          - text:  Social
      - listitem [ref=e21]:
        - link "Communication" [ref=e22] [cursor=pointer]:
          - /url: javascript:;
          - text:  Communication
      - listitem [ref=e23]:
        - link "Pipeline" [ref=e24] [cursor=pointer]:
          - /url: javascript:;
          - text:  Pipeline
      - listitem [ref=e25]:
        - link "Dashboard" [ref=e26] [cursor=pointer]:
          - /url: javascript:;
          - text:  Dashboard
      - listitem [ref=e27]:
        - link "" [ref=e28] [cursor=pointer]:
          - /url: javascript:;
          - generic [ref=e29]: 
    - list [ref=e31]:
      - listitem [ref=e32]:
        - button " UAT Server" [ref=e33] [cursor=pointer]:
          - generic [ref=e34]: 
          - text: UAT Server
        - text:  
  - generic [ref=e40]:
    - generic [ref=e44]:
      - link [active] [ref=e45] [cursor=pointer]:
        - /url: javascript:;
        - img [ref=e46]
      - text: 
    - table [ref=e52]:
      - rowgroup [ref=e53]:
        - row "S.No. Title Channel Partner Category Type Date Status Creation Date Action" [ref=e54]:
          - columnheader "S.No." [ref=e55]
          - columnheader "Title" [ref=e56]
          - columnheader "Channel" [ref=e57]
          - columnheader "Partner Category" [ref=e58]
          - columnheader "Type" [ref=e59]
          - columnheader "Date" [ref=e60]
          - columnheader "Status" [ref=e61]
          - columnheader "Creation Date" [ref=e62]
          - columnheader "Action" [ref=e63]
      - rowgroup [ref=e64]:
        - row "1. Canadian Citizenship within 5 years 11th June 2026 AutoPost, All, Raj2024 Scheduled 11 Jun 2026 17:08 Completed 11 Jun 2026 13:10" [ref=e65]:
          - cell "1." [ref=e66]
          - cell "Canadian Citizenship within 5 years 11th June 2026" [ref=e67]
          - cell [ref=e68]:
            - generic [ref=e69]: 
            - text:  
          - cell "AutoPost, All, Raj2024" [ref=e70]
          - cell "Scheduled" [ref=e71]
          - cell "11 Jun 2026 17:08" [ref=e72]
          - cell "Completed" [ref=e73]:
            - paragraph [ref=e74]: Completed 
          - cell "11 Jun 2026 13:10" [ref=e75]
          - cell [ref=e76]:
            - button [ref=e78] [cursor=pointer]: 
        - row "2. Cobranded 1:1 Test Digipulse AutoPost, All, Raj2024, Rraghav Two Scheduled 11 Jun 2026 15:48 Pending 10 Jun 2026 12:49" [ref=e79]:
          - cell "2." [ref=e80]
          - cell "Cobranded 1:1 Test Digipulse" [ref=e81]
          - cell [ref=e82]:
            - generic [ref=e83]: 
            - text:  
          - cell "AutoPost, All, Raj2024, Rraghav Two" [ref=e84]
          - cell "Scheduled" [ref=e85]
          - cell "11 Jun 2026 15:48" [ref=e86]
          - cell "Pending" [ref=e87]:
            - paragraph [ref=e88]:
              - text: Pending
              - button [ref=e89] [cursor=pointer]: 
          - cell "10 Jun 2026 12:49" [ref=e90]
          - cell [ref=e91]:
            - button [ref=e93] [cursor=pointer]: 
        - row "3. Testing 1080X1370 Raj2024 Scheduled 08 Jun 2026 16:50 Completed 08 Jun 2026 12:52" [ref=e94]:
          - cell "3." [ref=e95]
          - cell "Testing 1080X1370" [ref=e96]
          - cell [ref=e97]:
            - generic [ref=e98]: 
            - text:  
          - cell "Raj2024" [ref=e99]
          - cell "Scheduled" [ref=e100]
          - cell "08 Jun 2026 16:50" [ref=e101]
          - cell "Completed" [ref=e102]:
            - paragraph [ref=e103]: Completed 
          - cell "08 Jun 2026 12:52" [ref=e104]
          - cell [ref=e105]:
            - button [ref=e107] [cursor=pointer]: 
        - row "4. ncsoicoiwc Raj2024 Scheduled 08 Jun 2026 16:48 Completed 08 Jun 2026 12:49" [ref=e108]:
          - cell "4." [ref=e109]
          - cell "ncsoicoiwc" [ref=e110]
          - cell [ref=e111]:
            - generic [ref=e112]: 
            - generic [ref=e113]: 
            - generic [ref=e114]: 
          - cell "Raj2024" [ref=e115]
          - cell "Scheduled" [ref=e116]
          - cell "08 Jun 2026 16:48" [ref=e117]
          - cell "Completed" [ref=e118]:
            - paragraph [ref=e119]: Completed 
          - cell "08 Jun 2026 12:49" [ref=e120]
          - cell [ref=e121]:
            - button [ref=e123] [cursor=pointer]: 
        - 'row "5. Find Your Balance: Life’s Harmony & Well-Being Rraghav Vohra 18th December AutoPost, All, Raj2024 Scheduled 18 Dec 2025 15:45 Completed 18 Dec 2025 12:47" [ref=e124]':
          - cell "5." [ref=e125]
          - 'cell "Find Your Balance: Life’s Harmony & Well-Being Rraghav Vohra 18th December" [ref=e126]'
          - cell [ref=e127]:
            - generic [ref=e128]: 
            - text:  
          - cell "AutoPost, All, Raj2024" [ref=e129]
          - cell "Scheduled" [ref=e130]
          - cell "18 Dec 2025 15:45" [ref=e131]
          - cell "Completed" [ref=e132]:
            - paragraph [ref=e133]: Completed 
          - cell "18 Dec 2025 12:47" [ref=e134]
          - cell [ref=e135]:
            - button [ref=e137] [cursor=pointer]: 
        - 'row "6. Find Your Balance: Life’s Harmony & Well-Being Rraghav 18th December AutoPost, All, Raj2024 Scheduled 18 Dec 2025 15:45 Completed 18 Dec 2025 12:42" [ref=e138]':
          - cell "6." [ref=e139]
          - 'cell "Find Your Balance: Life’s Harmony & Well-Being Rraghav 18th December" [ref=e140]'
          - cell [ref=e141]:
            - generic [ref=e142]: 
            - generic [ref=e143]: 
            - generic [ref=e144]: 
          - cell "AutoPost, All, Raj2024" [ref=e145]
          - cell "Scheduled" [ref=e146]
          - cell "18 Dec 2025 15:45" [ref=e147]
          - cell "Completed" [ref=e148]:
            - paragraph [ref=e149]: Completed 
          - cell "18 Dec 2025 12:42" [ref=e150]
          - cell [ref=e151]:
            - button [ref=e153] [cursor=pointer]: 
        - 'row "7. Rraghav Find Your Balance: Life’s Harmony & Well-Being AutoPost, Raj2024, All Scheduled 17 Dec 2025 20:42 Pending 17 Dec 2025 16:50" [ref=e154]':
          - cell "7." [ref=e155]
          - 'cell "Rraghav Find Your Balance: Life’s Harmony & Well-Being" [ref=e156]'
          - cell [ref=e157]:
            - generic [ref=e158]: 
            - generic [ref=e159]: 
            - generic [ref=e160]: 
          - cell "AutoPost, Raj2024, All" [ref=e161]
          - cell "Scheduled" [ref=e162]
          - cell "17 Dec 2025 20:42" [ref=e163]
          - cell "Pending" [ref=e164]:
            - paragraph [ref=e165]:
              - text: Pending
              - button [ref=e166] [cursor=pointer]: 
          - cell "17 Dec 2025 16:50" [ref=e167]
          - cell [ref=e168]:
            - button [ref=e170] [cursor=pointer]: 
        - row "8. recent test fb digi New Partners Scheduled 20 Nov 2025 13:04 Completed 20 Nov 2025 13:03" [ref=e171]:
          - cell "8." [ref=e172]
          - cell "recent test fb digi" [ref=e173]
          - cell [ref=e174]:
            - generic [ref=e175]: 
            - text:  
          - cell "New Partners" [ref=e176]
          - cell "Scheduled" [ref=e177]
          - cell "20 Nov 2025 13:04" [ref=e178]
          - cell "Completed" [ref=e179]:
            - paragraph [ref=e180]: Completed 
          - cell "20 Nov 2025 13:03" [ref=e181]
          - cell [ref=e182]:
            - button [ref=e184] [cursor=pointer]: 
        - row "9. 20 nov facbook post digi New Partners Scheduled 20 Nov 2025 11:08 Completed 20 Nov 2025 11:05" [ref=e185]:
          - cell "9." [ref=e186]
          - cell "20 nov facbook post digi" [ref=e187]
          - cell [ref=e188]:
            - generic [ref=e189]: 
            - text:  
          - cell "New Partners" [ref=e190]
          - cell "Scheduled" [ref=e191]
          - cell "20 Nov 2025 11:08" [ref=e192]
          - cell "Completed" [ref=e193]:
            - paragraph [ref=e194]: Completed 
          - cell "20 Nov 2025 11:05" [ref=e195]
          - cell [ref=e196]:
            - button [ref=e198] [cursor=pointer]: 
        - row "10. Test Post New Partners Scheduled 19 Nov 2025 16:36 Completed 19 Nov 2025 15:59" [ref=e199]:
          - cell "10." [ref=e200]
          - cell "Test Post" [ref=e201]
          - cell [ref=e202]:
            - generic [ref=e203]: 
            - generic [ref=e204]: 
            - text: 
          - cell "New Partners" [ref=e205]
          - cell "Scheduled" [ref=e206]
          - cell "19 Nov 2025 16:36" [ref=e207]
          - cell "Completed" [ref=e208]:
            - paragraph [ref=e209]: Completed 
          - cell "19 Nov 2025 15:59" [ref=e210]
          - cell [ref=e211]:
            - button [ref=e213] [cursor=pointer]: 
        - 'row "11. Brooklyn Bridge Video : NYC''s Iconic Landmark & Engineering Marvel All Scheduled 02 Sep 2025 16:00 Completed 02 Sep 2025 11:31" [ref=e214]':
          - cell "11." [ref=e215]
          - 'cell "Brooklyn Bridge Video : NYC''s Iconic Landmark & Engineering Marvel" [ref=e216]'
          - cell [ref=e217]:
            - generic [ref=e218]: 
            - text:  
          - cell "All" [ref=e219]
          - cell "Scheduled" [ref=e220]
          - cell "02 Sep 2025 16:00" [ref=e221]
          - cell "Completed" [ref=e222]:
            - paragraph [ref=e223]: Completed 
          - cell "02 Sep 2025 11:31" [ref=e224]
          - cell [ref=e225]:
            - button [ref=e227] [cursor=pointer]: 
        - 'row "12. Prague All Channels ke Liye : Europe’s Fairytale City of Castles & Culture All Scheduled 02 Sep 2025 15:23 Completed 02 Sep 2025 11:24" [ref=e228]':
          - cell "12." [ref=e229]
          - 'cell "Prague All Channels ke Liye : Europe’s Fairytale City of Castles & Culture" [ref=e230]'
          - cell [ref=e231]:
            - generic [ref=e232]: 
            - generic [ref=e233]: 
            - generic [ref=e234]: 
          - cell "All" [ref=e235]
          - cell "Scheduled" [ref=e236]
          - cell "02 Sep 2025 15:23" [ref=e237]
          - cell "Completed" [ref=e238]:
            - paragraph [ref=e239]: Completed 
          - cell "02 Sep 2025 11:24" [ref=e240]
          - cell [ref=e241]:
            - button [ref=e243] [cursor=pointer]: 
        - 'row "13. Sweden FB Ke Liye Sirf : Nature''s Beauty & Nordic Innovation All Scheduled 02 Sep 2025 15:19 Completed 02 Sep 2025 11:21" [ref=e244]':
          - cell "13." [ref=e245]
          - 'cell "Sweden FB Ke Liye Sirf : Nature''s Beauty & Nordic Innovation" [ref=e246]'
          - cell [ref=e247]:
            - generic [ref=e248]: 
            - text:  
          - cell "All" [ref=e249]
          - cell "Scheduled" [ref=e250]
          - cell "02 Sep 2025 15:19" [ref=e251]
          - cell "Completed" [ref=e252]:
            - paragraph [ref=e253]: Completed 
          - cell "02 Sep 2025 11:21" [ref=e254]
          - cell [ref=e255]:
            - button [ref=e257] [cursor=pointer]: 
        - 'row "14. Empire State Building: NYC’s Sky-High Icon & Art Deco Masterpiece Rraghav All Scheduled 14 Aug 2025 17:23 Completed 14 Aug 2025 13:24" [ref=e258]':
          - cell "14." [ref=e259]
          - 'cell "Empire State Building: NYC’s Sky-High Icon & Art Deco Masterpiece Rraghav" [ref=e260]'
          - cell [ref=e261]:
            - generic [ref=e262]: 
            - generic [ref=e263]: 
            - generic [ref=e264]: 
          - cell "All" [ref=e265]
          - cell "Scheduled" [ref=e266]
          - cell "14 Aug 2025 17:23" [ref=e267]
          - cell "Completed" [ref=e268]:
            - paragraph [ref=e269]: Completed 
          - cell "14 Aug 2025 13:24" [ref=e270]
          - cell [ref=e271]:
            - button [ref=e273] [cursor=pointer]: 
        - 'row "15. Find Your Balance 12th August : Life’s Harmony & Well-Being All Scheduled 12 Aug 2025 14:39 Completed 12 Aug 2025 10:44" [ref=e274]':
          - cell "15." [ref=e275]
          - 'cell "Find Your Balance 12th August : Life’s Harmony & Well-Being" [ref=e276]'
          - cell [ref=e277]:
            - generic [ref=e278]: 
            - text:  
          - cell "All" [ref=e279]
          - cell "Scheduled" [ref=e280]
          - cell "12 Aug 2025 14:39" [ref=e281]
          - cell "Completed" [ref=e282]:
            - paragraph [ref=e283]: Completed 
          - cell "12 Aug 2025 10:44" [ref=e284]
          - cell [ref=e285]:
            - button [ref=e287] [cursor=pointer]: 
        - 'row "16. Brooklyn Bridge: NYC’s Timeless Icon & Gateway Between Boroughs All Scheduled 12 Aug 2025 15:30 Completed 12 Aug 2025 10:34" [ref=e288]':
          - cell "16." [ref=e289]
          - 'cell "Brooklyn Bridge: NYC’s Timeless Icon & Gateway Between Boroughs" [ref=e290]'
          - cell [ref=e291]:
            - generic [ref=e292]: 
            - generic [ref=e293]: 
            - generic [ref=e294]: 
          - cell "All" [ref=e295]
          - cell "Scheduled" [ref=e296]
          - cell "12 Aug 2025 15:30" [ref=e297]
          - cell "Completed" [ref=e298]:
            - paragraph [ref=e299]: Completed 
          - cell "12 Aug 2025 10:34" [ref=e300]
          - cell [ref=e301]:
            - button [ref=e303] [cursor=pointer]: 
        - 'row "17. Empire State Building: NYC’s Sky-High Icon & Art Deco Masterpiece All Scheduled 11 Aug 2025 17:30 Completed 11 Aug 2025 10:39" [ref=e304]':
          - cell "17." [ref=e305]
          - 'cell "Empire State Building: NYC’s Sky-High Icon & Art Deco Masterpiece" [ref=e306]'
          - cell [ref=e307]:
            - generic [ref=e308]: 
            - generic [ref=e309]: 
            - generic [ref=e310]: 
          - cell "All" [ref=e311]
          - cell "Scheduled" [ref=e312]
          - cell "11 Aug 2025 17:30" [ref=e313]
          - cell "Completed" [ref=e314]:
            - paragraph [ref=e315]: Completed 
          - cell "11 Aug 2025 10:39" [ref=e316]
          - cell [ref=e317]:
            - button [ref=e319] [cursor=pointer]: 
        - 'row "18. USA,Brooklyn Bridge: NYC''s Iconic Landmark & Engineering Marvel All Scheduled 08 Aug 2025 19:39 Completed 08 Aug 2025 15:40" [ref=e320]':
          - cell "18." [ref=e321]
          - 'cell "USA,Brooklyn Bridge: NYC''s Iconic Landmark & Engineering Marvel" [ref=e322]'
          - cell [ref=e323]:
            - generic [ref=e324]: 
            - generic [ref=e325]: 
            - generic [ref=e326]: 
          - cell "All" [ref=e327]
          - cell "Scheduled" [ref=e328]
          - cell "08 Aug 2025 19:39" [ref=e329]
          - cell "Completed" [ref=e330]:
            - paragraph [ref=e331]: Completed 
          - cell "08 Aug 2025 15:40" [ref=e332]
          - cell [ref=e333]:
            - button [ref=e335] [cursor=pointer]: 
        - 'row "19. Swweden: Nnature''s Beauty & Nordic Innovation All Scheduled 08 Aug 2025 20:00 Completed 08 Aug 2025 15:35" [ref=e336]':
          - cell "19." [ref=e337]
          - 'cell "Swweden: Nnature''s Beauty & Nordic Innovation" [ref=e338]'
          - cell [ref=e339]:
            - generic [ref=e340]: 
            - text:  
          - cell "All" [ref=e341]
          - cell "Scheduled" [ref=e342]
          - cell "08 Aug 2025 20:00" [ref=e343]
          - cell "Completed" [ref=e344]:
            - paragraph [ref=e345]: Completed 
          - cell "08 Aug 2025 15:35" [ref=e346]
          - cell [ref=e347]:
            - button [ref=e349] [cursor=pointer]: 
        - 'row "20. Brooklyn Bridge: NYC''s Iconic Landmark & Engineering Marvel All Scheduled 31 Jul 2025 15:52 Completed 31 Jul 2025 12:00" [ref=e350]':
          - cell "20." [ref=e351]
          - 'cell "Brooklyn Bridge: NYC''s Iconic Landmark & Engineering Marvel" [ref=e352]'
          - cell [ref=e353]:
            - generic [ref=e354]: 
            - text:  
          - cell "All" [ref=e355]
          - cell "Scheduled" [ref=e356]
          - cell "31 Jul 2025 15:52" [ref=e357]
          - cell "Completed" [ref=e358]:
            - paragraph [ref=e359]: Completed 
          - cell "31 Jul 2025 12:00" [ref=e360]
          - cell [ref=e361]:
            - button [ref=e363] [cursor=pointer]: 
        - 'row "21. Prague: Europe’s Fairytale City of Castles & Culture All Scheduled 31 Jul 2025 15:49 Completed 31 Jul 2025 11:51" [ref=e364]':
          - cell "21." [ref=e365]
          - 'cell "Prague: Europe’s Fairytale City of Castles & Culture" [ref=e366]'
          - cell [ref=e367]:
            - generic [ref=e368]: 
            - generic [ref=e369]: 
            - generic [ref=e370]: 
          - cell "All" [ref=e371]
          - cell "Scheduled" [ref=e372]
          - cell "31 Jul 2025 15:49" [ref=e373]
          - cell "Completed" [ref=e374]:
            - paragraph [ref=e375]: Completed 
          - cell "31 Jul 2025 11:51" [ref=e376]
          - cell [ref=e377]:
            - button [ref=e379] [cursor=pointer]: 
        - 'row "22. Budapest: The Danube’s Jewel of History & Healing All Scheduled 28 Jul 2025 19:26 Pending 28 Jul 2025 15:28" [ref=e380]':
          - cell "22." [ref=e381]
          - 'cell "Budapest: The Danube’s Jewel of History & Healing" [ref=e382]'
          - cell [ref=e383]:
            - generic [ref=e384]: 
            - text:  
          - cell "All" [ref=e385]
          - cell "Scheduled" [ref=e386]
          - cell "28 Jul 2025 19:26" [ref=e387]
          - cell "Pending" [ref=e388]:
            - paragraph [ref=e389]:
              - text: Pending
              - button [ref=e390] [cursor=pointer]: 
          - cell "28 Jul 2025 15:28" [ref=e391]
          - cell [ref=e392]:
            - button [ref=e394] [cursor=pointer]: 
        - 'row "23. Sweden: Nature''s Beauty & Nordic Innovation All Scheduled 28 Jul 2025 19:24 Completed 28 Jul 2025 15:25" [ref=e395]':
          - cell "23." [ref=e396]
          - 'cell "Sweden: Nature''s Beauty & Nordic Innovation" [ref=e397]'
          - cell [ref=e398]:
            - generic [ref=e399]: 
            - generic [ref=e400]: 
            - generic [ref=e401]: 
          - cell "All" [ref=e402]
          - cell "Scheduled" [ref=e403]
          - cell "28 Jul 2025 19:24" [ref=e404]
          - cell "Completed" [ref=e405]:
            - paragraph [ref=e406]: Completed 
          - cell "28 Jul 2025 15:25" [ref=e407]
          - cell [ref=e408]:
            - button [ref=e410] [cursor=pointer]: 
        - 'row "24. Prague: Europe’s Fairytale City of Castles & Culture All Scheduled 28 Jul 2025 19:22 Completed 28 Jul 2025 15:23" [ref=e411]':
          - cell "24." [ref=e412]
          - 'cell "Prague: Europe’s Fairytale City of Castles & Culture" [ref=e413]'
          - cell [ref=e414]:
            - generic [ref=e415]: 
            - generic [ref=e416]: 
            - generic [ref=e417]: 
          - cell "All" [ref=e418]
          - cell "Scheduled" [ref=e419]
          - cell "28 Jul 2025 19:22" [ref=e420]
          - cell "Completed" [ref=e421]:
            - paragraph [ref=e422]: Completed 
          - cell "28 Jul 2025 15:23" [ref=e423]
          - cell [ref=e424]:
            - button [ref=e426] [cursor=pointer]: 
        - 'row "25. Brussels: Europe’s Hidden Gem @ the Heart of Culture & Politics All Scheduled 14 Jul 2025 15:30 Completed 14 Jul 2025 11:12" [ref=e427]':
          - cell "25." [ref=e428]
          - 'cell "Brussels: Europe’s Hidden Gem @ the Heart of Culture & Politics" [ref=e429]'
          - cell [ref=e430]:
            - generic [ref=e431]: 
            - generic [ref=e432]: 
            - generic [ref=e433]: 
          - cell "All" [ref=e434]
          - cell "Scheduled" [ref=e435]
          - cell "14 Jul 2025 15:30" [ref=e436]
          - cell "Completed" [ref=e437]:
            - paragraph [ref=e438]: Completed 
          - cell "14 Jul 2025 11:12" [ref=e439]
          - cell [ref=e440]:
            - button [ref=e442] [cursor=pointer]: 
        - 'row "26. Belgium''s Blend: Waffles, Wonders & History @ Every Step2 AutoPost, All, Nine Nine, Digipulse Testing''s, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners... Scheduled 11 Jul 2025 23:30 Completed 11 Jul 2025 18:54" [ref=e443]':
          - cell "26." [ref=e444]
          - 'cell "Belgium''s Blend: Waffles, Wonders & History @ Every Step2" [ref=e445]'
          - cell [ref=e446]:
            - generic [ref=e447]: 
            - generic [ref=e448]: 
            - generic [ref=e449]: 
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners..." [ref=e450]
          - cell "Scheduled" [ref=e451]
          - cell "11 Jul 2025 23:30" [ref=e452]
          - cell "Completed" [ref=e453]:
            - paragraph [ref=e454]: Completed 
          - cell "11 Jul 2025 18:54" [ref=e455]
          - cell [ref=e456]:
            - button [ref=e458] [cursor=pointer]: 
        - 'row "27. Belgium''s Blend: Waffles, Wonders & History @ Every Step All Scheduled 11 Jul 2025 22:30 Completed 11 Jul 2025 18:28" [ref=e459]':
          - cell "27." [ref=e460]
          - 'cell "Belgium''s Blend: Waffles, Wonders & History @ Every Step" [ref=e461]'
          - cell [ref=e462]:
            - generic [ref=e463]: 
            - text:  
          - cell "All" [ref=e464]
          - cell "Scheduled" [ref=e465]
          - cell "11 Jul 2025 22:30" [ref=e466]
          - cell "Completed" [ref=e467]:
            - paragraph [ref=e468]: Completed 
          - cell "11 Jul 2025 18:28" [ref=e469]
          - cell [ref=e470]:
            - button [ref=e472] [cursor=pointer]: 
        - 'row "28. Prague''s Magic: Castles, Cobblestones & Culture @ Every Corner All Scheduled 11 Jul 2025 20:00 Completed 11 Jul 2025 15:43" [ref=e473]':
          - cell "28." [ref=e474]
          - 'cell "Prague''s Magic: Castles, Cobblestones & Culture @ Every Corner" [ref=e475]'
          - cell [ref=e476]:
            - generic [ref=e477]: 
            - generic [ref=e478]: 
            - generic [ref=e479]: 
          - cell "All" [ref=e480]
          - cell "Scheduled" [ref=e481]
          - cell "11 Jul 2025 20:00" [ref=e482]
          - cell "Completed" [ref=e483]:
            - paragraph [ref=e484]: Completed 
          - cell "11 Jul 2025 15:43" [ref=e485]
          - cell [ref=e486]:
            - button [ref=e488] [cursor=pointer]: 
        - 'row "29. Tomorrow''s Wealth: Smart Investment Strategies @ Your Fingertips Digipulse Testing''s, New Partners Scheduled 11 Jul 2025 20:30 Pending 11 Jul 2025 15:38" [ref=e489]':
          - cell "29." [ref=e490]
          - 'cell "Tomorrow''s Wealth: Smart Investment Strategies @ Your Fingertips" [ref=e491]'
          - cell [ref=e492]:
            - generic [ref=e493]: 
            - generic [ref=e494]: 
            - generic [ref=e495]: 
          - cell "Digipulse Testing's, New Partners" [ref=e496]
          - cell "Scheduled" [ref=e497]
          - cell "11 Jul 2025 20:30" [ref=e498]
          - cell "Pending" [ref=e499]:
            - paragraph [ref=e500]:
              - text: Pending
              - button [ref=e501] [cursor=pointer]: 
          - cell "11 Jul 2025 15:38" [ref=e502]
          - cell [ref=e503]:
            - button [ref=e505] [cursor=pointer]: 
        - 'row "30. Tomorrow''s Wealth: Smart Investment Strategies @ Your Fingertips All Scheduled 11 Jul 2025 15:30 Completed 11 Jul 2025 11:14" [ref=e506]':
          - cell "30." [ref=e507]
          - 'cell "Tomorrow''s Wealth: Smart Investment Strategies @ Your Fingertips" [ref=e508]'
          - cell [ref=e509]:
            - generic [ref=e510]: 
            - text:  
          - cell "All" [ref=e511]
          - cell "Scheduled" [ref=e512]
          - cell "11 Jul 2025 15:30" [ref=e513]
          - cell "Completed" [ref=e514]:
            - paragraph [ref=e515]: Completed 
          - cell "11 Jul 2025 11:14" [ref=e516]
          - cell [ref=e517]:
            - button [ref=e519] [cursor=pointer]: 
        - 'row "31. Canada''s Wonders: Nature, Culture & Adventure @ Every Turn All Scheduled 11 Jul 2025 15:30 Completed 11 Jul 2025 11:04" [ref=e520]':
          - cell "31." [ref=e521]
          - 'cell "Canada''s Wonders: Nature, Culture & Adventure @ Every Turn" [ref=e522]'
          - cell [ref=e523]:
            - generic [ref=e524]: 
            - text:  
          - cell "All" [ref=e525]
          - cell "Scheduled" [ref=e526]
          - cell "11 Jul 2025 15:30" [ref=e527]
          - cell "Completed" [ref=e528]:
            - paragraph [ref=e529]: Completed 
          - cell "11 Jul 2025 11:04" [ref=e530]
          - cell [ref=e531]:
            - button [ref=e533] [cursor=pointer]: 
        - 'row "32. Golden Gate''s Glory: San Francisco''s Iconic Bridge @ Sunset & Beyond All Scheduled 11 Jul 2025 15:00 Completed 11 Jul 2025 10:53" [ref=e534]':
          - cell "32." [ref=e535]
          - 'cell "Golden Gate''s Glory: San Francisco''s Iconic Bridge @ Sunset & Beyond" [ref=e536]'
          - cell [ref=e537]:
            - generic [ref=e538]: 
            - generic [ref=e539]: 
            - generic [ref=e540]: 
          - cell "All" [ref=e541]
          - cell "Scheduled" [ref=e542]
          - cell "11 Jul 2025 15:00" [ref=e543]
          - cell "Completed" [ref=e544]:
            - paragraph [ref=e545]: Completed 
          - cell "11 Jul 2025 10:53" [ref=e546]
          - cell [ref=e547]:
            - button [ref=e549] [cursor=pointer]: 
        - row "33. Social Auto-Post's Rraghav 2025 4th July All Scheduled 04 Jul 2025 14:50 Pending 04 Jul 2025 11:45" [ref=e550]:
          - cell "33." [ref=e551]
          - cell "Social Auto-Post's Rraghav 2025 4th July" [ref=e552]
          - cell [ref=e553]:
            - generic [ref=e554]: 
            - generic [ref=e555]: 
            - generic [ref=e556]: 
          - cell "All" [ref=e557]
          - cell "Scheduled" [ref=e558]
          - cell "04 Jul 2025 14:50" [ref=e559]
          - cell "Pending" [ref=e560]:
            - paragraph [ref=e561]:
              - text: Pending
              - button [ref=e562] [cursor=pointer]: 
          - cell "04 Jul 2025 11:45" [ref=e563]
          - cell [ref=e564]:
            - button [ref=e566] [cursor=pointer]: 
        - row "34. New Zealand's Landscape & having 30th June 2025 All Scheduled 30 Jun 2025 15:51 Pending 30 Jun 2025 11:53" [ref=e567]:
          - cell "34." [ref=e568]
          - cell "New Zealand's Landscape & having 30th June 2025" [ref=e569]
          - cell [ref=e570]:
            - generic [ref=e571]: 
            - generic [ref=e572]: 
            - generic [ref=e573]: 
          - cell "All" [ref=e574]
          - cell "Scheduled" [ref=e575]
          - cell "30 Jun 2025 15:51" [ref=e576]
          - cell "Pending" [ref=e577]:
            - paragraph [ref=e578]:
              - text: Pending
              - button [ref=e579] [cursor=pointer]: 
          - cell "30 Jun 2025 11:53" [ref=e580]
          - cell [ref=e581]:
            - button [ref=e583] [cursor=pointer]: 
        - 'row "35. Amsterdam: Having Some of the Best Landscape''s in the World All Scheduled 25 Jun 2025 16:52 Pending 25 Jun 2025 12:54" [ref=e584]':
          - cell "35." [ref=e585]
          - 'cell "Amsterdam: Having Some of the Best Landscape''s in the World" [ref=e586]'
          - cell [ref=e587]:
            - generic [ref=e588]: 
            - generic [ref=e589]: 
            - generic [ref=e590]: 
          - cell "All" [ref=e591]
          - cell "Scheduled" [ref=e592]
          - cell "25 Jun 2025 16:52" [ref=e593]
          - cell "Pending" [ref=e594]:
            - paragraph [ref=e595]:
              - text: Pending
              - button [ref=e596] [cursor=pointer]: 
          - cell "25 Jun 2025 12:54" [ref=e597]
          - cell [ref=e598]:
            - button [ref=e600] [cursor=pointer]: 
        - row "36. Empire's State Building PNG 16th June All Scheduled 16 Jun 2025 15:33 Pending 16 Jun 2025 11:34" [ref=e601]:
          - cell "36." [ref=e602]
          - cell "Empire's State Building PNG 16th June" [ref=e603]
          - cell [ref=e604]:
            - generic [ref=e605]: 
            - generic [ref=e606]: 
            - generic [ref=e607]: 
          - cell "All" [ref=e608]
          - cell "Scheduled" [ref=e609]
          - cell "16 Jun 2025 15:33" [ref=e610]
          - cell "Pending" [ref=e611]:
            - paragraph [ref=e612]:
              - text: Pending
              - button [ref=e613] [cursor=pointer]: 
          - cell "16 Jun 2025 11:34" [ref=e614]
          - cell [ref=e615]:
            - button [ref=e617] [cursor=pointer]: 
        - row "37. Important Fund's for All Media AutoPost, All Scheduled 17 Apr 2025 18:30 Completed 17 Apr 2025 14:20" [ref=e618]:
          - cell "37." [ref=e619]
          - cell "Important Fund's for All Media" [ref=e620]
          - cell [ref=e621]:
            - generic [ref=e622]: 
            - generic [ref=e623]: 
            - generic [ref=e624]: 
          - cell "AutoPost, All" [ref=e625]
          - cell "Scheduled" [ref=e626]
          - cell "17 Apr 2025 18:30" [ref=e627]
          - cell "Completed" [ref=e628]:
            - paragraph [ref=e629]: Completed 
          - cell "17 Apr 2025 14:20" [ref=e630]
          - cell [ref=e631]:
            - button [ref=e633] [cursor=pointer]: 
        - row "38. Insurance's Testing AutoPost, All Scheduled 17 Apr 2025 18:30 Completed 17 Apr 2025 14:18" [ref=e634]:
          - cell "38." [ref=e635]
          - cell "Insurance's Testing" [ref=e636]
          - cell [ref=e637]:
            - generic [ref=e638]: 
            - text:  
          - cell "AutoPost, All" [ref=e639]
          - cell "Scheduled" [ref=e640]
          - cell "17 Apr 2025 18:30" [ref=e641]
          - cell "Completed" [ref=e642]:
            - paragraph [ref=e643]: Completed 
          - cell "17 Apr 2025 14:18" [ref=e644]
          - cell [ref=e645]:
            - button [ref=e647] [cursor=pointer]: 
        - row "39. Mutual Funds SPUAT's - 1997 AutoPost, All Scheduled 17 Apr 2025 17:30 Completed 17 Apr 2025 13:24" [ref=e648]:
          - cell "39." [ref=e649]
          - cell "Mutual Funds SPUAT's - 1997" [ref=e650]
          - cell [ref=e651]:
            - generic [ref=e652]: 
            - text:  
          - cell "AutoPost, All" [ref=e653]
          - cell "Scheduled" [ref=e654]
          - cell "17 Apr 2025 17:30" [ref=e655]
          - cell "Completed" [ref=e656]:
            - paragraph [ref=e657]: Completed 
          - cell "17 Apr 2025 13:24" [ref=e658]
          - cell [ref=e659]:
            - button [ref=e661] [cursor=pointer]: 
        - row "40. test Nine Nine Scheduled 24 Feb 2025 20:30 Pending 12 Feb 2025 16:20" [ref=e662]:
          - cell "40." [ref=e663]
          - cell "test" [ref=e664]
          - cell [ref=e665]:
            - generic [ref=e666]: 
            - text:  
          - cell "Nine Nine" [ref=e667]
          - cell "Scheduled" [ref=e668]
          - cell "24 Feb 2025 20:30" [ref=e669]
          - cell "Pending" [ref=e670]:
            - paragraph [ref=e671]:
              - text: Pending
              - button [ref=e672] [cursor=pointer]: 
          - cell "12 Feb 2025 16:20" [ref=e673]
          - cell [ref=e674]:
            - button [ref=e676] [cursor=pointer]: 
  - generic [ref=e677]: 
  - text: 
```

# Test source

```ts
  89  |   // ─────────────────────────────────────────────────────────────────────
  90  | 
  91  |   constructor(page: Page) {
  92  |     this.page = page;
  93  | 
  94  |     // Navigation
  95  |     // communicationTab — same locator as DocumentLibraryPage for consistency
  96  |     this.communicationTab   = page.locator("//span[text()='Communication']");
  97  |     this.automationTabProd  = page.locator("//span[normalize-space()='Automation']");
  98  |     this.socialOptionProd   = page.locator("//a[normalize-space()='Social']");
  99  |     this.socialAutoPostLink = page.locator("//a[normalize-space()='Social Auto Post']");
  100 |     this.autoPostTabProd    = page.locator("//a[normalize-space()='Auto Post']");
  101 |     this.automationTabDigipulse = page.getByText('Automation' ,{ exact : true});
  102 |     this.autoPostOptionDigipulse = page.getByRole('link', { name: 'Auto Post' });
  103 | 
  104 |     // Actions
  105 |     // actionsButton uses data-bs-toggle to target the dropdown trigger specifically —
  106 |     // avoids matching other btn-group elements on the page
  107 |     this.actionsButton    = page.locator("//div[contains(@class,'btn-group')]//a[@data-bs-toggle='dropdown']");
  108 |     this.createPostButton = page.locator("//a[normalize-space()='Create Post']");
  109 | 
  110 |     // Image Allowed Sizes tooltip
  111 |     // Scoped to the label so it won't match other info icons on the page
  112 |     this.imageAllowedSizesIcon    = page.locator("//label[contains(text(),'Image Allowed Sizes')]//span[contains(@class,'fa-info-circle')]");
  113 |     // Bootstrap 5 appends .tooltip-inner to <body> when a tooltip is triggered
  114 |     this.imageAllowedSizesTooltip = page.locator(".tooltip-inner");
  115 | 
  116 |     // File Upload
  117 |     this.fileInput      = page.locator("#file-upload");
  118 |     // Note: Java project spells this 'social_tumbnail' (typo in the app's HTML) — kept as-is
  119 |     this.thumbnailInput = page.locator("#social_tumbnail");
  120 | 
  121 |     // Form Fields
  122 |     this.cobrandingButton = page.locator("#videobrand");
  123 |     this.titleField       = page.locator("//input[@name='title' and @id='title']");
  124 |     this.descriptionField = page.locator("//textarea[@id='description_link']");
  125 | 
  126 |     // Partner Category
  127 |     this.partnerCategoryButton = page.getByText('Select Category');
  128 |     this.searchBox             = page.getByRole('textbox', { name: 'Search' });
  129 |     this.categoryLabel         = page.getByText(SOCIAL_PARTNER_NAME);
  130 |     // facebookLabel used as a post-close confirmation — visible only when dropdown is closed
  131 |     this.facebookLabel = page.locator("//label[normalize-space()='Facebook']");
  132 | 
  133 |     // Social Media Checkboxes
  134 |     this.twitterLabel  = page.locator("//label[normalize-space()='Twitter']");
  135 |     this.linkedInLabel = page.locator("//label[normalize-space()='LinkedIn']");
  136 | 
  137 |     // URL Options
  138 |     // Radio buttons use evaluate() — they don't respond to Playwright's regular click()
  139 |     this.customUrlRadio = page.locator("//input[@type='radio' and @id='C']");
  140 |     this.customUrlInput = page.locator("//input[@name='custom_url']");
  141 |     this.noneRadio      = page.locator("//input[@type='radio' and @id='N']");
  142 | 
  143 |     // Date / Time Picker
  144 |     this.dateTimeInput = page.locator("//input[contains(@class,'form_datetime')]");
  145 |     // Scoped to xdsoft_datepicker to exclude the timepicker's own next button —
  146 |     // without this scope the locator matches 2 elements and Playwright throws a strict mode violation
  147 |     this.nextMonthButton = page.locator(
  148 |       "//div[contains(@class,'xdsoft_datepicker')]//button[contains(@class,'xdsoft_next')]"
  149 |     );
  150 | 
  151 |     // Submit
  152 |     this.sendNotificationCheckbox = page.getByRole('checkbox', { name: 'Send Notification' });
  153 |     this.schedulePostButton       = page.getByRole('button', { name: 'Schedule Post' });
  154 | 
  155 |     // Validation
  156 |     this.imageSizeError = page.getByText('Image Size not valid');
  157 |   }
  158 | 
  159 | 
  160 |   // ─────────────────────────────────────────────────────────────────────
  161 |   // NAVIGATION METHODS
  162 |   // ─────────────────────────────────────────────────────────────────────
  163 | 
  164 |   // Navigation path differs by environment:
  165 |   //   dev / preprod : Communication tab → Social Auto Post link
  166 |   //   prod          : Automation tab → Social → Auto Post
  167 |   //   digipulse     : Automation tab → Auto Post
  168 |   async navigateToSocialAutoPost(): Promise<void> {
  169 |     if (ENV === 'prod') {
  170 |       await this.automationTabProd.click();
  171 |       await this.socialOptionProd.click();
  172 |       await this.autoPostTabProd.click();
  173 |     } else if (ENV === 'digipulse') {
  174 |       await this.automationTabDigipulse.click();
  175 |       await this.autoPostOptionDigipulse.click();
  176 |     } else {
  177 |       await this.communicationTab.click();
  178 |       await this.socialAutoPostLink.click();
  179 |     }
  180 |   }
  181 | 
  182 |   async clickActionsButton(): Promise<void> {
  183 |     await this.actionsButton.waitFor({ state: 'visible' });
  184 |     await this.actionsButton.hover();
  185 |     await this.actionsButton.click();
  186 |   }
  187 | 
  188 |   async clickCreatePostButton(): Promise<void> {
> 189 |     await this.createPostButton.click();
      |                                 ^ Error: locator.click: Test timeout of 90000ms exceeded.
  190 |   }
  191 | 
  192 | 
  193 |   // ─────────────────────────────────────────────────────────────────────
  194 |   // FILE UPLOAD METHODS
  195 |   // ─────────────────────────────────────────────────────────────────────
  196 | 
  197 |   async uploadFile(filePath: string): Promise<void> {
  198 |     await this.fileInput.setInputFiles(filePath);
  199 |     await expect(this.imageSizeError).not.toBeVisible();
  200 |   }
  201 | 
  202 |   // Convenience wrappers — each calls uploadFile() with the right static path
  203 |   async uploadFileInPNG(): Promise<void>     { await this.uploadFile(SocialAutoPostPage.PNG_FILE); }
  204 |   async uploadFileInJPG(): Promise<void>     { await this.uploadFile(SocialAutoPostPage.JPG_FILE); }
  205 |   async uploadFileInMP4(): Promise<void>     { await this.uploadFile(SocialAutoPostPage.MP4_FILE); }
  206 |   async uploadInvalidPNG(): Promise<void>    { await this.uploadFile(SocialAutoPostPage.INVALID_PNG_FILE); }
  207 |   async uploadFilePath(filePath: string): Promise<void> { await this.uploadFile(filePath); }
  208 | 
  209 |   async uploadThumbnailInJPG(): Promise<void> {
  210 |     await this.thumbnailInput.setInputFiles(SocialAutoPostPage.THUMBNAIL_JPG);
  211 |   }
  212 | 
  213 |   async assertImageSizeError(): Promise<void> {
  214 |     await expect(this.imageSizeError).toBeVisible();
  215 |   }
  216 | 
  217 |   async assertImageRequiredError(): Promise<void> {
  218 |     await this.page.waitForSelector('text=Image/Video is required while creating a social post!', { state: 'visible' });
  219 |   }
  220 | 
  221 | 
  222 |   // ─────────────────────────────────────────────────────────────────────
  223 |   // FORM FIELD METHODS
  224 |   // ─────────────────────────────────────────────────────────────────────
  225 | 
  226 |   // The cobranding checkbox (#videobrand) doesn't respond to Playwright's regular click()
  227 |   // evaluate() bypasses the issue by triggering click() directly in the browser's JS context
  228 |   async clickEnableCobrandingButton(): Promise<void> {
  229 |     await this.cobrandingButton.evaluate(el => (el as HTMLElement).click());
  230 |   }
  231 | 
  232 |   async enterTitle(title: string): Promise<void> {
  233 |     await this.titleField.fill(title);
  234 |   }
  235 | 
  236 |   async enterDescription(description: string): Promise<void> {
  237 |     await this.descriptionField.fill(description);
  238 |   }
  239 | 
  240 | 
  241 |   // ─────────────────────────────────────────────────────────────────────
  242 |   // PARTNER CATEGORY METHODS
  243 |   // ─────────────────────────────────────────────────────────────────────
  244 | 
  245 |   // Opens the partner category multi-select dropdown and waits for the search box to appear
  246 |   async clickPartnerCategoryButton(): Promise<void> {
  247 |     await this.partnerCategoryButton.waitFor({ state: 'visible' });
  248 |     await this.partnerCategoryButton.click();
  249 |     await this.searchBox.waitFor({ state: 'visible' });
  250 |   }
  251 | 
  252 |   // Types the search term to filter options, waits for the label to appear, then clicks it
  253 |   // SOCIAL_PARTNER_SEARCH and SOCIAL_PARTNER_NAME come from env so they can change per server
  254 |   async selectPartnerCategory(): Promise<void> {
  255 |     await this.searchBox.fill(SOCIAL_PARTNER_SEARCH);
  256 |     await this.categoryLabel.waitFor({ state: 'visible' });
  257 |     await this.categoryLabel.click();
  258 |   }
  259 | 
  260 |   // Closes the partner category dropdown
  261 |   // Waits for facebookLabel to confirm the dropdown is fully closed and social checkboxes are accessible
  262 |   async closePartnerCategoryDropdown(): Promise<void> {
  263 |     if (await this.searchBox.isVisible()) {
  264 |       await this.partnerCategoryButton.click();
  265 |       await this.searchBox.waitFor({ state: 'hidden' });
  266 |     }
  267 |     await this.facebookLabel.waitFor({ state: 'visible' });
  268 |   }
  269 | 
  270 | 
  271 |   // ─────────────────────────────────────────────────────────────────────
  272 |   // SOCIAL MEDIA CHECKBOX METHODS
  273 |   // ─────────────────────────────────────────────────────────────────────
  274 | 
  275 |   async clickTwitter(): Promise<void> {
  276 |     await this.twitterLabel.click();
  277 |   }
  278 | 
  279 |   async clickLinkedIn(): Promise<void> {
  280 |     await this.linkedInLabel.click();
  281 |   }
  282 | 
  283 |   async clickFacebook(): Promise<void> {
  284 |     await this.facebookLabel.scrollIntoViewIfNeeded();
  285 |     await this.facebookLabel.click();
  286 |   }
  287 | 
  288 | 
  289 |   // ─────────────────────────────────────────────────────────────────────
```