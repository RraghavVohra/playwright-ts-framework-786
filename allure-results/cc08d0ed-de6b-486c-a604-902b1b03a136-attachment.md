# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_39 - Delete a document and verify it disappears from search
- Location: tests\e2e\document-library.spec.ts:708:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('//button[@type=\'button\' and @class=\'btn btn-primary bootbox-accept\' and text()=\'OK\']')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - img [ref=e5]
      - button "Toggle navigation" [ref=e6]
    - list [ref=e9]:
      - listitem [ref=e10]
      - listitem
      - listitem [ref=e11]:
        - link "Automation" [ref=e12] [cursor=pointer]:
          - /url: javascript:;
          - text:  Automation
        - list [ref=e13]:
          - listitem [ref=e14]:
            - link "Social" [ref=e15] [cursor=pointer]:
              - /url: sp-list-social.php
          - listitem [ref=e16]:
            - link "Auto Post" [ref=e17] [cursor=pointer]:
              - /url: sp-auto-post-campaign-list.php
      - listitem [ref=e18]:
        - link "AssetLibrary" [ref=e19] [cursor=pointer]:
          - /url: ../home/AssetLibrary
      - listitem [ref=e20]:
        - link "journey" [ref=e21] [cursor=pointer]:
          - /url: javascript:;
        - list [ref=e22]:
          - listitem [ref=e23]:
            - link "journey" [ref=e24] [cursor=pointer]:
              - /url: ../home/journey/list
          - listitem [ref=e25]:
            - link "Segment" [ref=e26] [cursor=pointer]:
              - /url: ../home/segment/list
      - listitem [ref=e27]:
        - link "Campaign" [ref=e28] [cursor=pointer]:
          - /url: javascript:;
          - text:  Campaign
        - list [ref=e29]:
          - listitem [ref=e30]:
            - link "Email Campaign" [ref=e31] [cursor=pointer]:
              - /url: create_template.php
          - listitem [ref=e32]:
            - link "Run Email" [ref=e33] [cursor=pointer]:
              - /url: run_campaign.php
          - listitem [ref=e34]:
            - link "Lists" [ref=e35] [cursor=pointer]:
              - /url: list-dashboard.php
      - listitem [ref=e36]:
        - link "Conversion" [ref=e37] [cursor=pointer]:
          - /url: javascript:;
          - text:  Conversion
        - list [ref=e38]:
          - listitem [ref=e39]:
            - link "Landing Pages" [ref=e40] [cursor=pointer]:
              - /url: landingpage-dashboard.php
          - listitem [ref=e41]:
            - link "CTA" [ref=e42] [cursor=pointer]:
              - /url: cta.php
      - listitem [ref=e43]:
        - link "Social" [ref=e44] [cursor=pointer]:
          - /url: javascript:;
          - text:  Social
        - list [ref=e45]:
          - listitem [ref=e46]:
            - link "Social Post" [ref=e47] [cursor=pointer]:
              - /url: sp-list-social.php
          - listitem [ref=e48]:
            - link "Auto Post" [ref=e49] [cursor=pointer]:
              - /url: sp-auto-post-campaign-list.php
      - listitem [ref=e50]:
        - link "Communication" [ref=e51] [cursor=pointer]:
          - /url: javascript:;
          - text:  Communication
        - list [ref=e52]:
          - listitem [ref=e53]:
            - link "Push Notification" [ref=e54] [cursor=pointer]:
              - /url: /framework/AgencyCommunication/list
          - listitem [ref=e55]:
            - link "Document Library" [ref=e56] [cursor=pointer]:
              - /url: sp-document-list.php
      - listitem [ref=e57]:
        - link "Pipeline" [ref=e58] [cursor=pointer]:
          - /url: javascript:;
          - text:  Pipeline
        - list [ref=e59]:
          - listitem [ref=e60]:
            - link "Contacts" [ref=e61] [cursor=pointer]:
              - /url: contact.php
          - listitem [ref=e62]:
            - link "Leads" [ref=e63] [cursor=pointer]:
              - /url: lead.php
          - listitem [ref=e64]:
            - link "Email Activity" [ref=e65] [cursor=pointer]:
              - /url: email_campaign.php
      - listitem [ref=e66]:
        - link "Dashboard" [ref=e67] [cursor=pointer]:
          - /url: javascript:;
        - list [ref=e68]:
          - listitem [ref=e69]:
            - link "Master Dashboard" [ref=e70] [cursor=pointer]:
              - /url: master-dashboard.php
          - listitem [ref=e71]:
            - link "Quick Sight Dashboard" [ref=e72] [cursor=pointer]:
              - /url: quick-sight-dashboard.php
      - listitem [ref=e73]:
        - link "" [ref=e74] [cursor=pointer]:
          - /url: javascript:;
          - generic [ref=e75]: 
        - list [ref=e76]:
          - listitem [ref=e77]:
            - link "New General Setup" [ref=e78] [cursor=pointer]:
              - /url: ../framework/general-setup/social-list
          - listitem [ref=e79]:
            - link "Testimonials New" [ref=e80] [cursor=pointer]:
              - /url: /framework/testimonial
          - listitem [ref=e81]:
            - link "General Setup" [ref=e82] [cursor=pointer]:
              - /url: setup.php
          - listitem [ref=e83]:
            - link "Microsite Settings" [ref=e84] [cursor=pointer]:
              - /url: sp-microsite-setup.php
          - listitem [ref=e85]:
            - link "#tag Setup" [ref=e86] [cursor=pointer]:
              - /url: hashtag-solution.php
          - listitem [ref=e87]:
            - link "#category Setup" [ref=e88] [cursor=pointer]:
              - /url: hashtag-image-solution.php
          - listitem [ref=e89]:
            - link "#greeting Setup" [ref=e90] [cursor=pointer]:
              - /url: greeting-setup.php
          - listitem [ref=e91]:
            - link "Banner setup" [ref=e92] [cursor=pointer]:
              - /url: ../framework/banners
          - listitem [ref=e93]:
            - link "Lead Setup" [ref=e94] [cursor=pointer]:
              - /url: ../framework/lead-setup
          - listitem [ref=e95]:
            - link "#tag Internal" [ref=e96] [cursor=pointer]:
              - /url: intrl-hashtag-listgp.php
          - listitem [ref=e97]:
            - link "Team Management" [ref=e98] [cursor=pointer]:
              - /url: sub-members.php
          - listitem [ref=e99]:
            - link "Add Lead Stage" [ref=e100] [cursor=pointer]:
              - /url: add-leadstage.php
          - listitem [ref=e101]:
            - link "Lead Score" [ref=e102] [cursor=pointer]:
              - /url: lead-scope.php
          - listitem [ref=e103]:
            - link "Chatbot" [ref=e104] [cursor=pointer]:
              - /url: chatbot-setup.php
          - listitem [ref=e105]:
            - link "Testimonials" [ref=e106] [cursor=pointer]:
              - /url: sp-testimonials-list.php
          - listitem [ref=e107]:
            - link "Achievements" [ref=e108] [cursor=pointer]:
              - /url: sp-achievements-list.php
    - dialog [ref=e109]:
      - generic [ref=e111]:
        - generic [ref=e112]:
          - button "X" [ref=e113]
          - heading "SalesPanda Explanatory Video" [level=4] [ref=e114]
        - iframe [ref=e116]:
          - generic "YouTube Video Player" [ref=f1e3]:
            - alert [ref=f1e4]:
              - generic [ref=f1e5]:
                - generic [ref=f1e6]:
                  - img
                - generic [ref=f1e7]:
                  - link "Watch video on YouTube" [ref=f1e10] [cursor=pointer]:
                    - /url: https://www.youtube.com/watch?v=Bdoz8JEnKj8&source_ve_path=MTc4NDI0
                  - generic [ref=f1e12]:
                    - text: Error 153
                    - text: Video player configuration error
              - link "Visit YouTube to search for more videos" [ref=f1e13] [cursor=pointer]:
                - /url: https://www.youtube.com
                - img
        - button "Close" [ref=e118]
    - button "Toggle navigation" [ref=e119]
    - list [ref=e121]:
      - listitem [ref=e122]:
        - button " UAT Server" [ref=e123] [cursor=pointer]:
          - generic [ref=e124]: 
          - text: UAT Server
        - list " UAT Server" [ref=e125]:
          - listitem [ref=e126]:
            - link " My Profile" [ref=e127] [cursor=pointer]:
              - /url: my-profile.php
              - generic [ref=e128]: 
              - text: My Profile
          - listitem [ref=e129]:
            - link " Log Out" [ref=e130] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e131]: 
              - text: Log Out
  - generic "Logout" [ref=e132]:
    - generic [ref=e134]:
      - generic [ref=e135]:
        - heading "Logout" [level=5] [ref=e136]
        - button "Close" [ref=e137]
      - generic [ref=e138]: Are You Sure?
      - generic [ref=e139]:
        - link "Yes" [ref=e140] [cursor=pointer]:
          - /url: ../logout.php
        - button "No" [ref=e141]
  - generic [ref=e147]:
    - generic [ref=e151]:
      - link [ref=e152] [cursor=pointer]:
        - /url: javascript:;
        - img [ref=e153]
      - list [ref=e159]:
        - listitem [ref=e160]:
          - link " Upload" [ref=e161] [cursor=pointer]:
            - /url: sp-upload-document.php
            - generic [ref=e162]: 
            - text: Upload
        - listitem [ref=e163]:
          - generic [ref=e164]:
            - generic [ref=e165]: 
            - text: Access
        - listitem [ref=e166]:
          - generic [ref=e167]:
            - generic [ref=e168]: "#"
            - text: Update Hashtag(s)
        - listitem [ref=e169]:
          - generic "Delete" [ref=e170]:
            - generic [ref=e171]: 
            - text: Delete
    - table [ref=e173]:
      - rowgroup [ref=e174]:
        - row "Title Thumbnail Internal HashTags File Type Options Access Status Syndication/Expired Date Actions" [ref=e175]:
          - columnheader [ref=e176]:
            - checkbox [ref=e178]
          - columnheader "Title" [ref=e179]
          - columnheader "Thumbnail" [ref=e180]
          - columnheader "Internal HashTags" [ref=e181]
          - columnheader "File Type" [ref=e182]
          - columnheader "Options" [ref=e183]
          - columnheader "Access" [ref=e184]
          - columnheader "Status" [ref=e185]
          - columnheader "Syndication/Expired Date" [ref=e186]
          - columnheader "Actions" [ref=e187]
      - rowgroup [ref=e188]:
        - row "AutoDoc_1782047266809 JPG Forms & Brochures, CXO Announcements, Training/Sales Content Draft " [ref=e189]:
          - cell [ref=e190]:
            - checkbox [checked] [ref=e192]
          - cell "AutoDoc_1782047266809" [ref=e193]
          - cell [ref=e194]:
            - img [ref=e195]
          - cell [ref=e196]
          - cell "JPG" [ref=e197]:
            - text: JPG
            - link [ref=e198] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a37e22577844-goldengate.jpg
              - generic [ref=e199]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e200]
          - cell [ref=e201]
          - cell "Draft" [ref=e202]
          - cell [ref=e203]
          - cell "" [ref=e204]:
            - list [ref=e206]:
              - listitem [ref=e207]:
                - link "" [ref=e208] [cursor=pointer]:
                  - /url: sp-upload-document.php?document_id=IyxDRFEKYAo=
                  - generic [ref=e209]: 
        - row "AutoDoc_1782047119117 MP4 Forms & Brochures Draft " [ref=e210]:
          - cell [ref=e211]:
            - checkbox [ref=e213]
          - cell "AutoDoc_1782047119117" [ref=e214]
          - cell [ref=e215]:
            - img [ref=e216]
          - cell [ref=e217]
          - cell "MP4" [ref=e218]:
            - text: MP4
            - link [ref=e219] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a37e19d34fc7-video.mp4
              - generic [ref=e220]: 
          - cell "Forms & Brochures" [ref=e221]
          - cell [ref=e222]
          - cell "Draft" [ref=e223]
          - cell [ref=e224]
          - cell "" [ref=e225]:
            - list [ref=e227]:
              - listitem [ref=e228]:
                - link "" [ref=e229] [cursor=pointer]:
                  - /url: sp-upload-document.php?document_id=IyxDRFAKYAo=
                  - generic [ref=e230]: 
        - row "AutoDoc_1782046996471 MP4 Forms & Brochures Draft " [ref=e231]:
          - cell [ref=e232]:
            - checkbox [ref=e234]
          - cell "AutoDoc_1782046996471" [ref=e235]
          - cell [ref=e236]:
            - img [ref=e237]
          - cell [ref=e238]
          - cell "MP4" [ref=e239]:
            - text: MP4
            - link [ref=e240] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a37e11d00b60-video.mp4
              - generic [ref=e241]: 
          - cell "Forms & Brochures" [ref=e242]
          - cell [ref=e243]
          - cell "Draft" [ref=e244]
          - cell [ref=e245]
          - cell "" [ref=e246]:
            - list [ref=e248]:
              - listitem [ref=e249]:
                - link "" [ref=e250] [cursor=pointer]:
                  - /url: sp-upload-document.php?document_id=IyxDQFkKYAo=
                  - generic [ref=e251]: 
        - row "AutoDoc_1782046880008 CSV Forms & Brochures Draft " [ref=e252]:
          - cell [ref=e253]:
            - checkbox [ref=e255]
          - cell "AutoDoc_1782046880008" [ref=e256]
          - cell [ref=e257]:
            - img [ref=e258]
          - cell [ref=e259]
          - cell "CSV" [ref=e260]:
            - text: CSV
            - link [ref=e261] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a37e0a3a0e31-pushnotificationsspuat---Production.csv
              - generic [ref=e262]: 
          - cell "Forms & Brochures" [ref=e263]
          - cell [ref=e264]
          - cell "Draft" [ref=e265]
          - cell [ref=e266]
          - cell "" [ref=e267]:
            - list [ref=e269]:
              - listitem [ref=e270]:
                - link "" [ref=e271] [cursor=pointer]:
                  - /url: sp-upload-document.php?document_id=IyxDQFgKYAo=
                  - generic [ref=e272]: 
        - row "Document Library's Image 166th June 2026 PNG+PDF jerry PDF Forms & Brochures, CXO Announcements AutoPost, All, Raj2024 Syndicated 2026-06-17 06:30 PM  " [ref=e273]:
          - cell [ref=e274]:
            - checkbox [ref=e276]
          - cell "Document Library's Image 166th June 2026 PNG+PDF" [ref=e277]
          - cell [ref=e278]:
            - img [ref=e279]
          - cell "jerry" [ref=e280]
          - cell "PDF" [ref=e281]:
            - text: PDF
            - link [ref=e282] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a329971d6338-Web-Email-Stats-(1).pdf
              - generic [ref=e283]: 
          - cell "Forms & Brochures, CXO Announcements" [ref=e284]
          - cell "AutoPost, All, Raj2024" [ref=e285]
          - cell "Syndicated" [ref=e286]
          - cell "2026-06-17 06:30 PM" [ref=e287]
          - cell " " [ref=e288]:
            - list [ref=e290]:
              - listitem [ref=e291]:
                - link "" [ref=e292] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e293]: 
              - listitem [ref=e294]:
                - generic "Copy" [ref=e295]:
                  - generic [ref=e297]: 
        - row "Document Library's Image 166th June 2026 PNG+PNG Rraghav 369 PNG Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-17 06:24 PM  " [ref=e298]:
          - cell [ref=e299]:
            - checkbox [ref=e301]
          - cell "Document Library's Image 166th June 2026 PNG+PNG" [ref=e302]
          - cell [ref=e303]:
            - img [ref=e304]
          - cell "Rraghav 369" [ref=e305]
          - cell "PNG" [ref=e306]:
            - text: PNG
            - link [ref=e307] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a3298cbb82a6-Amsterdam's_&-Test's.png
              - generic [ref=e308]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e309]
          - cell "AutoPost, All, Raj2024" [ref=e310]
          - cell "Syndicated" [ref=e311]
          - cell "2026-06-17 06:24 PM" [ref=e312]
          - cell " " [ref=e313]:
            - list [ref=e315]:
              - listitem [ref=e316]:
                - link "" [ref=e317] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e318]: 
              - listitem [ref=e319]:
                - generic "Copy" [ref=e320]:
                  - generic [ref=e322]: 
        - row "AMANC C MP4 Forms & Brochures, CXO Announcements, Training/Sales Content Draft " [ref=e323]:
          - cell [ref=e324]:
            - checkbox [ref=e326]
          - cell "AMANC C" [ref=e327]
          - cell [ref=e328]:
            - img [ref=e329]
          - cell [ref=e330]
          - cell "MP4" [ref=e331]:
            - text: MP4
            - link [ref=e332] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a315977be489-1280X720-video.mp4
              - generic [ref=e333]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e334]
          - cell [ref=e335]
          - cell "Draft" [ref=e336]
          - cell [ref=e337]
          - cell "" [ref=e338]:
            - list [ref=e340]:
              - listitem [ref=e341]:
                - link "" [ref=e342] [cursor=pointer]:
                  - /url: sp-upload-document.php?document_id=IyxDQFUKYAo=
                  - generic [ref=e343]: 
        - row "Document Library's Image 166th June 2026 JPEG+JPEG 786 JPEG Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-16 08:00 PM  " [ref=e344]:
          - cell [ref=e345]:
            - checkbox [ref=e347]
          - cell "Document Library's Image 166th June 2026 JPEG+JPEG 786" [ref=e348]
          - cell [ref=e349]:
            - img [ref=e350]
          - cell [ref=e351]
          - cell "JPEG" [ref=e352]:
            - text: JPEG
            - link [ref=e353] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a3157887eac5-happy_chhath_puja.jpeg
              - generic [ref=e354]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e355]
          - cell "AutoPost, All, Raj2024" [ref=e356]
          - cell "Syndicated" [ref=e357]
          - cell "2026-06-16 08:00 PM" [ref=e358]
          - cell " " [ref=e359]:
            - list [ref=e361]:
              - listitem [ref=e362]:
                - link "" [ref=e363] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e364]: 
              - listitem [ref=e365]:
                - generic "Copy" [ref=e366]:
                  - generic [ref=e368]: 
        - row "Document Library's Image 166th June 2026 PNG+PDF 786 QA Test,Raghav 09th July PDF Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-16 08:00 PM  " [ref=e369]:
          - cell [ref=e370]:
            - checkbox [ref=e372]
          - cell "Document Library's Image 166th June 2026 PNG+PDF 786" [ref=e373]
          - cell [ref=e374]:
            - img [ref=e375]
          - cell "QA Test,Raghav 09th July" [ref=e376]
          - cell "PDF" [ref=e377]:
            - text: PDF
            - link [ref=e378] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a315693a2a56-CHLI-_-Contests-&-Leaderboard.pdf
              - generic [ref=e379]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e380]
          - cell "AutoPost, All, Raj2024" [ref=e381]
          - cell "Syndicated" [ref=e382]
          - cell "2026-06-16 08:00 PM" [ref=e383]
          - cell " " [ref=e384]:
            - list [ref=e386]:
              - listitem [ref=e387]:
                - link "" [ref=e388] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e389]: 
              - listitem [ref=e390]:
                - generic "Copy" [ref=e391]:
                  - generic [ref=e393]: 
        - row "Document Library's Image 166th June 2026 JPG+JPG 786 PNG Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-16 07:43 PM  " [ref=e394]:
          - cell [ref=e395]:
            - checkbox [ref=e397]
          - cell "Document Library's Image 166th June 2026 JPG+JPG 786" [ref=e398]
          - cell [ref=e399]:
            - img [ref=e400]
          - cell [ref=e401]
          - cell "PNG" [ref=e402]:
            - text: PNG
            - link [ref=e403] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a3159f86e9f6-BROOKLYN'S-BRIDGE-DISTANCE-2323.png
              - generic [ref=e404]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e405]
          - cell "AutoPost, All, Raj2024" [ref=e406]
          - cell "Syndicated" [ref=e407]
          - cell "2026-06-16 07:43 PM" [ref=e408]
          - cell " " [ref=e409]:
            - list [ref=e411]:
              - listitem [ref=e412]:
                - link "" [ref=e413] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e414]: 
              - listitem [ref=e415]:
                - generic "Copy" [ref=e416]:
                  - generic [ref=e418]: 
        - row "Document Library's Image 166th June 2026 PNG+PNG 786 PNG Forms & Brochures, CXO Announcements AutoPost, All, Raj2024 Syndicated 2026-06-16 08:00 PM  " [ref=e419]:
          - cell [ref=e420]:
            - checkbox [ref=e422]
          - cell "Document Library's Image 166th June 2026 PNG+PNG 786" [ref=e423]
          - cell [ref=e424]:
            - img [ref=e425]
          - cell [ref=e426]
          - cell "PNG" [ref=e427]:
            - text: PNG
            - link [ref=e428] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a3154b9c22dd-Amsterdam's_&-Test's.png
              - generic [ref=e429]: 
          - cell "Forms & Brochures, CXO Announcements" [ref=e430]
          - cell "AutoPost, All, Raj2024" [ref=e431]
          - cell "Syndicated" [ref=e432]
          - cell "2026-06-16 08:00 PM" [ref=e433]
          - cell " " [ref=e434]:
            - list [ref=e436]:
              - listitem [ref=e437]:
                - link "" [ref=e438] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e439]: 
              - listitem [ref=e440]:
                - generic "Copy" [ref=e441]:
                  - generic [ref=e443]: 
        - row "Document Library's Image 166th June 2026 JPEG + VIDEO MP4 Forms & Brochures, CXO Announcements AutoPost, All, Raj2024 Syndicated 2026-06-16 07:18 PM  " [ref=e444]:
          - cell [ref=e445]:
            - checkbox [ref=e447]
          - cell "Document Library's Image 166th June 2026 JPEG + VIDEO" [ref=e448]
          - cell [ref=e449]:
            - img [ref=e450]
          - cell [ref=e451]
          - cell "MP4" [ref=e452]:
            - text: MP4
            - link [ref=e453] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a315404b9a1a-1280X720-video.mp4
              - generic [ref=e454]: 
          - cell "Forms & Brochures, CXO Announcements" [ref=e455]
          - cell "AutoPost, All, Raj2024" [ref=e456]
          - cell "Syndicated" [ref=e457]
          - cell "2026-06-16 07:18 PM" [ref=e458]
          - cell " " [ref=e459]:
            - list [ref=e461]:
              - listitem [ref=e462]:
                - link "" [ref=e463] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e464]: 
              - listitem [ref=e465]:
                - generic "Copy" [ref=e466]:
                  - generic [ref=e468]: 
        - row "Document Library's Image 166th June 2026 JPEG IT IS DOWNLLL Hello,QA Test,Rraghav 369 JPEG Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-16 06:20 PM  " [ref=e469]:
          - cell [ref=e470]:
            - checkbox [ref=e472]
          - cell "Document Library's Image 166th June 2026 JPEG IT IS DOWNLLL" [ref=e473]
          - cell [ref=e474]:
            - img [ref=e475]
          - cell "Hello,QA Test,Rraghav 369" [ref=e476]
          - cell "JPEG" [ref=e477]:
            - text: JPEG
            - link [ref=e478] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a311bd6879b4-400X400VIDEOCOBIM.jpeg
              - generic [ref=e479]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e480]
          - cell "AutoPost, All, Raj2024" [ref=e481]
          - cell "Syndicated" [ref=e482]
          - cell "2026-06-16 06:20 PM" [ref=e483]
          - cell " " [ref=e484]:
            - list [ref=e486]:
              - listitem [ref=e487]:
                - link "" [ref=e488] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e489]: 
              - listitem [ref=e490]:
                - generic "Copy" [ref=e491]:
                  - generic [ref=e493]: 
        - row "Document Library's Image 166th June 2026 PNG+PDF IT IS NON-DOWNLO PDF Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-16 03:00 PM  " [ref=e494]:
          - cell [ref=e495]:
            - checkbox [ref=e497]
          - cell "Document Library's Image 166th June 2026 PNG+PDF IT IS NON-DOWNLO" [ref=e498]
          - cell [ref=e499]:
            - img [ref=e500]
          - cell [ref=e501]
          - cell "PDF" [ref=e502]:
            - text: PDF
            - link [ref=e503] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a311766547cf-Stories-view-in-app-HELLO.pdf
              - generic [ref=e504]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e505]
          - cell "AutoPost, All, Raj2024" [ref=e506]
          - cell "Syndicated" [ref=e507]
          - cell "2026-06-16 03:00 PM" [ref=e508]
          - cell " " [ref=e509]:
            - list [ref=e511]:
              - listitem [ref=e512]:
                - link "" [ref=e513] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e514]: 
              - listitem [ref=e515]:
                - generic "Copy" [ref=e516]:
                  - generic [ref=e518]: 
        - row "Document Library's Image 166th June 2026 JPG+PDF IT IS NON-DOWNLOAD PDF Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-16 03:00 PM  " [ref=e519]:
          - cell [ref=e520]:
            - checkbox [ref=e522]
          - cell "Document Library's Image 166th June 2026 JPG+PDF IT IS NON-DOWNLOAD" [ref=e523]
          - cell [ref=e524]:
            - img [ref=e525]
          - cell [ref=e526]
          - cell "PDF" [ref=e527]:
            - text: PDF
            - link [ref=e528] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a31171beaf6b-Web-Email-Stats-(1).pdf
              - generic [ref=e529]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e530]
          - cell "AutoPost, All, Raj2024" [ref=e531]
          - cell "Syndicated" [ref=e532]
          - cell "2026-06-16 03:00 PM" [ref=e533]
          - cell " " [ref=e534]:
            - list [ref=e536]:
              - listitem [ref=e537]:
                - link "" [ref=e538] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e539]: 
              - listitem [ref=e540]:
                - generic "Copy" [ref=e541]:
                  - generic [ref=e543]: 
        - row "Document Library's Image 166th June 2026 PNG+VIDEO IT IS DOWNLOAD MP4 Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-17 06:30 PM  " [ref=e544]:
          - cell [ref=e545]:
            - checkbox [ref=e547]
          - cell "Document Library's Image 166th June 2026 PNG+VIDEO IT IS DOWNLOAD" [ref=e548]
          - cell [ref=e549]:
            - img [ref=e550]
          - cell [ref=e551]
          - cell "MP4" [ref=e552]:
            - text: MP4
            - link [ref=e553] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a329a4f29ba7-1280X720-video.mp4
              - generic [ref=e554]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e555]
          - cell "AutoPost, All, Raj2024" [ref=e556]
          - cell "Syndicated" [ref=e557]
          - cell "2026-06-17 06:30 PM" [ref=e558]
          - cell " " [ref=e559]:
            - list [ref=e561]:
              - listitem [ref=e562]:
                - link "" [ref=e563] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e564]: 
              - listitem [ref=e565]:
                - generic "Copy" [ref=e566]:
                  - generic [ref=e568]: 
        - row "Document Library's Image 166th June 2026 PNG+PNG IT IS DOWNLOad PNG Forms & Brochures, CXO Announcements AutoPost, All, Raj2024 Syndicated 2026-06-16 03:00 PM  " [ref=e569]:
          - cell [ref=e570]:
            - checkbox [ref=e572]
          - cell "Document Library's Image 166th June 2026 PNG+PNG IT IS DOWNLOad" [ref=e573]
          - cell [ref=e574]:
            - img [ref=e575]
          - cell [ref=e576]
          - cell "PNG" [ref=e577]:
            - text: PNG
            - link [ref=e578] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a3115e27443a-Aut.png
              - generic [ref=e579]: 
          - cell "Forms & Brochures, CXO Announcements" [ref=e580]
          - cell "AutoPost, All, Raj2024" [ref=e581]
          - cell "Syndicated" [ref=e582]
          - cell "2026-06-16 03:00 PM" [ref=e583]
          - cell " " [ref=e584]:
            - list [ref=e586]:
              - listitem [ref=e587]:
                - link "" [ref=e588] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e589]: 
              - listitem [ref=e590]:
                - generic "Copy" [ref=e591]:
                  - generic [ref=e593]: 
        - row "Document Library's Image 166th June 2026 JPG+JPG IT IS DOWNLOADABLLE JPG Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-16 03:00 PM  " [ref=e594]:
          - cell [ref=e595]:
            - checkbox [ref=e597]
          - cell "Document Library's Image 166th June 2026 JPG+JPG IT IS DOWNLOADABLLE" [ref=e598]
          - cell [ref=e599]:
            - img [ref=e600]
          - cell [ref=e601]
          - cell "JPG" [ref=e602]:
            - text: JPG
            - link [ref=e603] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a3115628d88f-budapest's-&-Raghav.jpg
              - generic [ref=e604]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e605]
          - cell "AutoPost, All, Raj2024" [ref=e606]
          - cell "Syndicated" [ref=e607]
          - cell "2026-06-16 03:00 PM" [ref=e608]
          - cell " " [ref=e609]:
            - list [ref=e611]:
              - listitem [ref=e612]:
                - link "" [ref=e613] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e614]: 
              - listitem [ref=e615]:
                - generic "Copy" [ref=e616]:
                  - generic [ref=e618]: 
        - row "Document Library's Image 166th June 2026 JPG+Video IT IS DOWNLOADABLE MP4 Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-16 02:45 PM  " [ref=e619]:
          - cell [ref=e620]:
            - checkbox [ref=e622]
          - cell "Document Library's Image 166th June 2026 JPG+Video IT IS DOWNLOADABLE" [ref=e623]
          - cell [ref=e624]:
            - img [ref=e625]
          - cell [ref=e626]
          - cell "MP4" [ref=e627]:
            - text: MP4
            - link [ref=e628] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a311407adcd6-1280X720-video.mp4
              - generic [ref=e629]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e630]
          - cell "AutoPost, All, Raj2024" [ref=e631]
          - cell "Syndicated" [ref=e632]
          - cell "2026-06-16 02:45 PM" [ref=e633]
          - cell " " [ref=e634]:
            - list [ref=e636]:
              - listitem [ref=e637]:
                - link "" [ref=e638] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e639]: 
              - listitem [ref=e640]:
                - generic "Copy" [ref=e641]:
                  - generic [ref=e643]: 
        - row "Document Library's Image 16th June 2026 PNG+PDF PDF Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All, Raj2024 Syndicated 2026-06-16 11:00 AM  " [ref=e644]:
          - cell [ref=e645]:
            - checkbox [ref=e647]
          - cell "Document Library's Image 16th June 2026 PNG+PDF" [ref=e648]
          - cell [ref=e649]:
            - img [ref=e650]
          - cell [ref=e651]
          - cell "PDF" [ref=e652]:
            - text: PDF
            - link [ref=e653] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a30dd1acbb4f-Stories-view-in-app-HELLO.pdf
              - generic [ref=e654]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e655]
          - cell "AutoPost, All, Raj2024" [ref=e656]
          - cell "Syndicated" [ref=e657]
          - cell "2026-06-16 11:00 AM" [ref=e658]
          - cell " " [ref=e659]:
            - list [ref=e661]:
              - listitem [ref=e662]:
                - link "" [ref=e663] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e664]: 
              - listitem [ref=e665]:
                - generic "Copy" [ref=e666]:
                  - generic [ref=e668]: 
        - row "Document Library Image 16th June 2026 JPG+PDF PDF Forms & Brochures, CXO Announcements AutoPost, All, Raj2024 Syndicated 2026-06-16 04:59 PM  " [ref=e669]:
          - cell [ref=e670]:
            - checkbox [ref=e672]
          - cell "Document Library Image 16th June 2026 JPG+PDF" [ref=e673]
          - cell [ref=e674]:
            - img [ref=e675]
          - cell [ref=e676]
          - cell "PDF" [ref=e677]:
            - text: PDF
            - link [ref=e678] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a31334420246-Polls.pdf
              - generic [ref=e679]: 
          - cell "Forms & Brochures, CXO Announcements" [ref=e680]
          - cell "AutoPost, All, Raj2024" [ref=e681]
          - cell "Syndicated" [ref=e682]
          - cell "2026-06-16 04:59 PM" [ref=e683]
          - cell " " [ref=e684]:
            - list [ref=e686]:
              - listitem [ref=e687]:
                - link "" [ref=e688] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e689]: 
              - listitem [ref=e690]:
                - generic "Copy" [ref=e691]:
                  - generic [ref=e693]: 
        - row "Document Library Social Image 16th June 2026 JPG+JPG JPG Forms & Brochures, CXO Announcements AutoPost, All, Raj2024 Syndicated 2026-06-16 03:28 PM  " [ref=e694]:
          - cell [ref=e695]:
            - checkbox [ref=e697]
          - cell "Document Library Social Image 16th June 2026 JPG+JPG" [ref=e698]
          - cell [ref=e699]:
            - img [ref=e700]
          - cell [ref=e701]
          - cell "JPG" [ref=e702]:
            - text: JPG
            - link [ref=e703] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a311e0f3ca7a-Brooklyn's-BRIDGE-2015.jpg
              - generic [ref=e704]: 
          - cell "Forms & Brochures, CXO Announcements" [ref=e705]
          - cell "AutoPost, All, Raj2024" [ref=e706]
          - cell "Syndicated" [ref=e707]
          - cell "2026-06-16 03:28 PM" [ref=e708]
          - cell " " [ref=e709]:
            - list [ref=e711]:
              - listitem [ref=e712]:
                - link "" [ref=e713] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e714]: 
              - listitem [ref=e715]:
                - generic "Copy" [ref=e716]:
                  - generic [ref=e718]: 
        - row "Document Library's Image 16th June 2026 PNG+PNG PNG Forms & Brochures AutoPost, All, Raj2024 Syndicated 2026-06-16 11:00 AM  " [ref=e719]:
          - cell [ref=e720]:
            - checkbox [ref=e722]
          - cell "Document Library's Image 16th June 2026 PNG+PNG" [ref=e723]
          - cell [ref=e724]:
            - img [ref=e725]
          - cell [ref=e726]
          - cell "PNG" [ref=e727]:
            - text: PNG
            - link [ref=e728] [cursor=pointer]:
              - /url: https://d2s7q4z8t1mini.cloudfront.net/SPU11374/brochure/data/6a30db3a4bbf0-Sap-1024X628.png
              - generic [ref=e729]: 
          - cell "Forms & Brochures" [ref=e730]
          - cell "AutoPost, All, Raj2024" [ref=e731]
          - cell "Syndicated" [ref=e732]
          - cell "2026-06-16 11:00 AM" [ref=e733]
          - cell " " [ref=e734]:
            - list [ref=e736]:
              - listitem [ref=e737]:
                - link "" [ref=e738] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e739]: 
              - listitem [ref=e740]:
                - generic "Copy" [ref=e741]:
                  - generic [ref=e743]: 
        - 'row "9th Sept 2025 : Find Your Balance: Life’s Harmony & Well-Being QA Test DOCUMENT Forms & Brochures, CXO Announcements, Training/Sales Content Draft " [ref=e744]':
          - cell [ref=e745]:
            - checkbox [ref=e747]
          - 'cell "9th Sept 2025 : Find Your Balance: Life’s Harmony & Well-Being" [ref=e748]'
          - cell [ref=e749]:
            - img [ref=e750]
          - cell "QA Test" [ref=e751]
          - cell "DOCUMENT" [ref=e752]:
            - text: DOCUMENT
            - link [ref=e753] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-375-68c006898e74a-Atomic Habits - James Clear 786 786.pdf
              - generic [ref=e754]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e755]
          - cell [ref=e756]
          - cell "Draft" [ref=e757]
          - cell [ref=e758]
          - cell "" [ref=e759]:
            - list [ref=e761]:
              - listitem [ref=e762]:
                - link "" [ref=e763] [cursor=pointer]:
                  - /url: sp-upload-document.php?document_id=IyxDLFQKYAo=
                  - generic [ref=e764]: 
        - 'row "Empire State Building: NYC’s Sky 04TH SEPT 2025 -High Icon & Art Deco Masterpiece Test''s 4050,QA Test DOCUMENT Forms & Brochures AutoPost, All Syndicated 2025-09-04 02:00 PM  " [ref=e765]':
          - cell [ref=e766]:
            - checkbox [ref=e768]
          - 'cell "Empire State Building: NYC’s Sky 04TH SEPT 2025 -High Icon & Art Deco Masterpiece" [ref=e769]'
          - cell [ref=e770]:
            - img [ref=e771]
          - cell "Test's 4050,QA Test" [ref=e772]
          - cell "DOCUMENT" [ref=e773]:
            - text: DOCUMENT
            - link [ref=e774] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-365-68b9430194da0-Testing Video.mp4
              - generic [ref=e775]: 
          - cell "Forms & Brochures" [ref=e776]
          - cell "AutoPost, All" [ref=e777]
          - cell "Syndicated" [ref=e778]
          - cell "2025-09-04 02:00 PM" [ref=e779]
          - cell " " [ref=e780]:
            - list [ref=e782]:
              - listitem [ref=e783]:
                - link "" [ref=e784] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e785]: 
              - listitem [ref=e786]:
                - generic "Copy" [ref=e787]:
                  - generic [ref=e789]: 
        - 'row "Find Your Balance 4TH Sept 2025 : Life’s Harmony & Well-Being Test''s 786 DOCUMENT Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All Syndicated 2025-09-04 02:00 PM  " [ref=e790]':
          - cell [ref=e791]:
            - checkbox [ref=e793]
          - 'cell "Find Your Balance 4TH Sept 2025 : Life’s Harmony & Well-Being" [ref=e794]'
          - cell [ref=e795]:
            - img [ref=e796]
          - cell "Test's 786" [ref=e797]
          - cell "DOCUMENT" [ref=e798]:
            - text: DOCUMENT
            - link [ref=e799] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-36-68b94119060ac-Thinking, Fast and Slow - 2150.pdf
              - generic [ref=e800]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e801]
          - cell "AutoPost, All" [ref=e802]
          - cell "Syndicated" [ref=e803]
          - cell "2025-09-04 02:00 PM" [ref=e804]
          - cell " " [ref=e805]:
            - list [ref=e807]:
              - listitem [ref=e808]:
                - link "" [ref=e809] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e810]: 
              - listitem [ref=e811]:
                - generic "Copy" [ref=e812]:
                  - generic [ref=e814]: 
        - 'row "Empire State Building: NYC’s Sky-High Icon & Art Deco Masterpiec TEST 20330 DOCUMENT Forms & Brochures AutoPost, All Syndicated 2025-09-03 03:00 PM  " [ref=e815]':
          - cell [ref=e816]:
            - checkbox [ref=e818]
          - 'cell "Empire State Building: NYC’s Sky-High Icon & Art Deco Masterpiec" [ref=e819]'
          - cell [ref=e820]:
            - img [ref=e821]
          - cell "TEST 20330" [ref=e822]
          - cell "DOCUMENT" [ref=e823]:
            - text: DOCUMENT
            - link [ref=e824] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-381-68b809172892e-ABC Multi-LOB Lead Flow.pdf
              - generic [ref=e825]: 
          - cell "Forms & Brochures" [ref=e826]
          - cell "AutoPost, All" [ref=e827]
          - cell "Syndicated" [ref=e828]
          - cell "2025-09-03 03:00 PM" [ref=e829]
          - cell " " [ref=e830]:
            - list [ref=e832]:
              - listitem [ref=e833]:
                - link "" [ref=e834] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e835]: 
              - listitem [ref=e836]:
                - generic "Copy" [ref=e837]:
                  - generic [ref=e839]: 
        - 'row "Brooklyn Bridge: NYC’s Timeless Icon & Gateway Between Boroughs QA Test DOCUMENT Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All Syndicated 2025-09-03 03:00 PM  " [ref=e840]':
          - cell [ref=e841]:
            - checkbox [ref=e843]
          - 'cell "Brooklyn Bridge: NYC’s Timeless Icon & Gateway Between Boroughs" [ref=e844]'
          - cell [ref=e845]:
            - img [ref=e846]
          - cell "QA Test" [ref=e847]
          - cell "DOCUMENT" [ref=e848]:
            - text: DOCUMENT
            - link [ref=e849] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-430-68b8081a2d107-GMB Integration with SalesPanda.docx
              - generic [ref=e850]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e851]
          - cell "AutoPost, All" [ref=e852]
          - cell "Syndicated" [ref=e853]
          - cell "2025-09-03 03:00 PM" [ref=e854]
          - cell " " [ref=e855]:
            - list [ref=e857]:
              - listitem [ref=e858]:
                - link "" [ref=e859] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e860]: 
              - listitem [ref=e861]:
                - generic "Copy" [ref=e862]:
                  - generic [ref=e864]: 
        - 'row "Budapest: The Danube''s Jewel of History & Healing Rraghav QA Test PDF Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All Syndicated 2025-08-14 03:00 PM  " [ref=e865]':
          - cell [ref=e866]:
            - checkbox [ref=e868]
          - 'cell "Budapest: The Danube''s Jewel of History & Healing Rraghav" [ref=e869]'
          - cell [ref=e870]:
            - img [ref=e871]
          - cell "QA Test" [ref=e872]
          - cell "PDF" [ref=e873]:
            - text: PDF
            - link [ref=e874] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-139-689da0e75970c-ContactsUpload.csv
              - generic [ref=e875]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e876]
          - cell "AutoPost, All" [ref=e877]
          - cell "Syndicated" [ref=e878]
          - cell "2025-08-14 03:00 PM" [ref=e879]
          - cell " " [ref=e880]:
            - list [ref=e882]:
              - listitem [ref=e883]:
                - link "" [ref=e884] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e885]: 
              - listitem [ref=e886]:
                - generic "Copy" [ref=e887]:
                  - generic [ref=e889]: 
        - 'row "USA,Brooklyn Bridge: NYC''s Iconic Landmark & Engineering Marvel Raghav 09th July DOCUMENT Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All Syndicated 2025-08-08 03:00 PM  " [ref=e890]':
          - cell [ref=e891]:
            - checkbox [ref=e893]
          - 'cell "USA,Brooklyn Bridge: NYC''s Iconic Landmark & Engineering Marvel" [ref=e894]'
          - cell [ref=e895]:
            - img [ref=e896]
          - cell "Raghav 09th July" [ref=e897]
          - cell "DOCUMENT" [ref=e898]:
            - text: DOCUMENT
            - link [ref=e899] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-402-6895bdfac7b71-1280X720-8Mb25fps.mp4
              - generic [ref=e900]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e901]
          - cell "AutoPost, All" [ref=e902]
          - cell "Syndicated" [ref=e903]
          - cell "2025-08-08 03:00 PM" [ref=e904]
          - cell " " [ref=e905]:
            - list [ref=e907]:
              - listitem [ref=e908]:
                - link "" [ref=e909] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e910]: 
              - listitem [ref=e911]:
                - generic "Copy" [ref=e912]:
                  - generic [ref=e914]: 
        - 'row "Hungary,Budapest: The Danube’s Jewel of History & Healing QA Test DOCUMENT Forms & Brochures, CXO Announcements AutoPost, All Syndicated 2025-08-08 03:00 PM  " [ref=e915]':
          - cell [ref=e916]:
            - checkbox [ref=e918]
          - 'cell "Hungary,Budapest: The Danube’s Jewel of History & Healing" [ref=e919]'
          - cell [ref=e920]:
            - img [ref=e921]
          - cell "QA Test" [ref=e922]
          - cell "DOCUMENT" [ref=e923]:
            - text: DOCUMENT
            - link [ref=e924] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-467-6895bbe2219d3-Bizight Solutions 27.pdf
              - generic [ref=e925]: 
          - cell "Forms & Brochures, CXO Announcements" [ref=e926]
          - cell "AutoPost, All" [ref=e927]
          - cell "Syndicated" [ref=e928]
          - cell "2025-08-08 03:00 PM" [ref=e929]
          - cell " " [ref=e930]:
            - list [ref=e932]:
              - listitem [ref=e933]:
                - link "" [ref=e934] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e935]: 
              - listitem [ref=e936]:
                - generic "Copy" [ref=e937]:
                  - generic [ref=e939]: 
        - 'row "Praggue: Europe’s Fairytale City of Castles & Culture Gigantic DOCUMENT CXO Announcements, Training/Sales Content AutoPost, All, Nine Nine Syndicated 2025-08-01 05:00 PM  " [ref=e940]':
          - cell [ref=e941]:
            - checkbox [ref=e943]
          - 'cell "Praggue: Europe’s Fairytale City of Castles & Culture" [ref=e944]'
          - cell [ref=e945]:
            - img [ref=e946]
          - cell "Gigantic" [ref=e947]
          - cell "DOCUMENT" [ref=e948]:
            - text: DOCUMENT
            - link [ref=e949] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-712-688c9cd363992-sample_upload_csv-PushNotification.csv
              - generic [ref=e950]: 
          - cell "CXO Announcements, Training/Sales Content" [ref=e951]
          - cell "AutoPost, All, Nine Nine" [ref=e952]
          - cell "Syndicated" [ref=e953]
          - cell "2025-08-01 05:00 PM" [ref=e954]
          - cell " " [ref=e955]:
            - list [ref=e957]:
              - listitem [ref=e958]:
                - link "" [ref=e959] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e960]: 
              - listitem [ref=e961]:
                - generic "Copy" [ref=e962]:
                  - generic [ref=e964]: 
        - 'row "Swweden: Nature''s Beauty & Nordic Innovation QA Test,Raghav 09th July DOCUMENT Forms & Brochures, CXO Announcements, Training/Sales Content AutoPost, All Syndicated 2025-08-01 04:00 PM  " [ref=e965]':
          - cell [ref=e966]:
            - checkbox [ref=e968]
          - 'cell "Swweden: Nature''s Beauty & Nordic Innovation" [ref=e969]'
          - cell [ref=e970]:
            - img [ref=e971]
          - cell "QA Test,Raghav 09th July" [ref=e972]
          - cell "DOCUMENT" [ref=e973]:
            - text: DOCUMENT
            - link [ref=e974] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-320-688c9684b8852-The Power Of Now - A Guide To Spiritual Enlightenment.pdf
              - generic [ref=e975]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e976]
          - cell "AutoPost, All" [ref=e977]
          - cell "Syndicated" [ref=e978]
          - cell "2025-08-01 04:00 PM" [ref=e979]
          - cell " " [ref=e980]:
            - list [ref=e982]:
              - listitem [ref=e983]:
                - link "" [ref=e984] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e985]: 
              - listitem [ref=e986]:
                - generic "Copy" [ref=e987]:
                  - generic [ref=e989]: 
        - 'row "Buddapest: The Danube’s Jewel of History & Healing QA Test DOCUMENT Forms & Brochures AutoPost, All Syndicated 2025-08-01 02:00 PM  " [ref=e990]':
          - cell [ref=e991]:
            - checkbox [ref=e993]
          - 'cell "Buddapest: The Danube’s Jewel of History & Healing" [ref=e994]'
          - cell [ref=e995]:
            - img [ref=e996]
          - cell "QA Test" [ref=e997]
          - cell "DOCUMENT" [ref=e998]:
            - text: DOCUMENT
            - link [ref=e999] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-672-688c72e8a1dff-autopostforfacebook.png
              - generic [ref=e1000]: 
          - cell "Forms & Brochures" [ref=e1001]
          - cell "AutoPost, All" [ref=e1002]
          - cell "Syndicated" [ref=e1003]
          - cell "2025-08-01 02:00 PM" [ref=e1004]
          - cell " " [ref=e1005]:
            - list [ref=e1007]:
              - listitem [ref=e1008]:
                - link "" [ref=e1009] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1010]: 
              - listitem [ref=e1011]:
                - generic "Copy" [ref=e1012]:
                  - generic [ref=e1014]: 
        - 'row "Budapest: The Danube’s Jewel of History & Healing QA Test DOCUMENT Forms & Brochures AutoPost, All Syndicated 2025-07-31 04:00 PM  " [ref=e1015]':
          - cell [ref=e1016]:
            - checkbox [ref=e1018]
          - 'cell "Budapest: The Danube’s Jewel of History & Healing" [ref=e1019]'
          - cell [ref=e1020]:
            - img [ref=e1021]
          - cell "QA Test" [ref=e1022]
          - cell "DOCUMENT" [ref=e1023]:
            - text: DOCUMENT
            - link [ref=e1024] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-287-688b4242ae003-Bizight Solutions Pvt Ltd 2025.pdf
              - generic [ref=e1025]: 
          - cell "Forms & Brochures" [ref=e1026]
          - cell "AutoPost, All" [ref=e1027]
          - cell "Syndicated" [ref=e1028]
          - cell "2025-07-31 04:00 PM" [ref=e1029]
          - cell " " [ref=e1030]:
            - list [ref=e1032]:
              - listitem [ref=e1033]:
                - link "" [ref=e1034] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1035]: 
              - listitem [ref=e1036]:
                - generic "Copy" [ref=e1037]:
                  - generic [ref=e1039]: 
        - row "test document leates furry DOCUMENT CXO Announcements, Training/Sales Content AutoPost Syndicated 2025-07-30 07:00 PM  " [ref=e1040]:
          - cell [ref=e1041]:
            - checkbox [ref=e1043]
          - cell "test document leates" [ref=e1044]
          - cell [ref=e1045]:
            - img [ref=e1046]
          - cell "furry" [ref=e1047]
          - cell "DOCUMENT" [ref=e1048]:
            - text: DOCUMENT
            - link [ref=e1049] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-831-688a0d121f4a5-response.csv
              - generic [ref=e1050]: 
          - cell "CXO Announcements, Training/Sales Content" [ref=e1051]
          - cell "AutoPost" [ref=e1052]
          - cell "Syndicated" [ref=e1053]
          - cell "2025-07-30 07:00 PM" [ref=e1054]
          - cell " " [ref=e1055]:
            - list [ref=e1057]:
              - listitem [ref=e1058]:
                - link "" [ref=e1059] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1060]: 
              - listitem [ref=e1061]:
                - generic "Copy" [ref=e1062]:
                  - generic [ref=e1064]: 
        - row "test document data123,test,jerry DOCUMENT Training/Sales Content AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners Syndicated 2025-07-30 05:43 PM  " [ref=e1065]:
          - cell [ref=e1066]:
            - checkbox [ref=e1068]
          - cell "test document" [ref=e1069]
          - cell [ref=e1070]:
            - img [ref=e1071]
          - cell "data123,test,jerry" [ref=e1072]
          - cell "DOCUMENT" [ref=e1073]:
            - text: DOCUMENT
            - link [ref=e1074] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/doc/document_library/DocumentFile-698-68876cce89375-pushnotificationsspuat.csv
              - generic [ref=e1075]: 
          - cell "Training/Sales Content" [ref=e1076]
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners" [ref=e1077]
          - cell "Syndicated" [ref=e1078]
          - cell "2025-07-30 05:43 PM" [ref=e1079]
          - cell " " [ref=e1080]:
            - list [ref=e1082]:
              - listitem [ref=e1083]:
                - link "" [ref=e1084] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1085]: 
              - listitem [ref=e1086]:
                - generic "Copy" [ref=e1087]:
                  - generic [ref=e1089]: 
        - 'row "Belgium: Europe''s Hidden Gem - Waffles, Wonders & World-Class Charm PDF Forms & Brochures AutoPost, All, Nine Nine, Digipulse Testing''s, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners Syndicated 2025-07-30 05:43 PM  " [ref=e1090]':
          - cell [ref=e1091]:
            - checkbox [ref=e1093]
          - 'cell "Belgium: Europe''s Hidden Gem - Waffles, Wonders & World-Class Charm" [ref=e1094]'
          - cell [ref=e1095]:
            - img [ref=e1096]
          - cell [ref=e1097]
          - cell "PDF" [ref=e1098]:
            - text: PDF
            - link [ref=e1099] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/686fa0054f52b-Bizight-Solutions-0911.pdf
              - generic [ref=e1100]: 
          - cell "Forms & Brochures" [ref=e1101]
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners" [ref=e1102]
          - cell "Syndicated" [ref=e1103]
          - cell "2025-07-30 05:43 PM" [ref=e1104]
          - cell " " [ref=e1105]:
            - list [ref=e1107]:
              - listitem [ref=e1108]:
                - link "" [ref=e1109] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1110]: 
              - listitem [ref=e1111]:
                - generic "Copy" [ref=e1112]:
                  - generic [ref=e1114]: 
        - 'row "Belgium: Europe''s Hidden Gem of Waffles, Beer & Art QA Test PDF Forms & Brochures AutoPost, All, Nine Nine, Digipulse Testing''s, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners Syndicated 2025-07-30 05:43 PM  " [ref=e1115]':
          - cell [ref=e1116]:
            - checkbox [ref=e1118]
          - 'cell "Belgium: Europe''s Hidden Gem of Waffles, Beer & Art" [ref=e1119]'
          - cell [ref=e1120]:
            - img [ref=e1121]
          - cell "QA Test" [ref=e1122]
          - cell "PDF" [ref=e1123]:
            - text: PDF
            - link [ref=e1124] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/686e3587868ef-Bizight-Solutions-0911.pdf
              - generic [ref=e1125]: 
          - cell "Forms & Brochures" [ref=e1126]
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners" [ref=e1127]
          - cell "Syndicated" [ref=e1128]
          - cell "2025-07-30 05:43 PM" [ref=e1129]
          - cell " " [ref=e1130]:
            - list [ref=e1132]:
              - listitem [ref=e1133]:
                - link "" [ref=e1134] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1135]: 
              - listitem [ref=e1136]:
                - generic "Copy" [ref=e1137]:
                  - generic [ref=e1139]: 
        - 'row "Amsterdam: Having Some''s of the Best Landscapes in the World QA Test PDF Forms & Brochures AutoPost, All, Nine Nine, Digipulse Testing''s, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners Syndicated 2025-07-30 05:43 PM  " [ref=e1140]':
          - cell [ref=e1141]:
            - checkbox [ref=e1143]
          - 'cell "Amsterdam: Having Some''s of the Best Landscapes in the World" [ref=e1144]'
          - cell [ref=e1145]:
            - img [ref=e1146]
          - cell "QA Test" [ref=e1147]
          - cell "PDF" [ref=e1148]:
            - text: PDF
            - link [ref=e1149] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/685ba63b35aac-Bizight-Solutions-Pvt-Ltd-2026.pdf
              - generic [ref=e1150]: 
          - cell "Forms & Brochures" [ref=e1151]
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners" [ref=e1152]
          - cell "Syndicated" [ref=e1153]
          - cell "2025-07-30 05:43 PM" [ref=e1154]
          - cell " " [ref=e1155]:
            - list [ref=e1157]:
              - listitem [ref=e1158]:
                - link "" [ref=e1159] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1160]: 
              - listitem [ref=e1161]:
                - generic "Copy" [ref=e1162]:
                  - generic [ref=e1164]: 
        - row "New Annoucement112 PDF Forms & Brochures AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners Syndicated 2025-07-30 05:43 PM  " [ref=e1165]:
          - cell [ref=e1166]:
            - checkbox [ref=e1168]
          - cell "New Annoucement112" [ref=e1169]
          - cell [ref=e1170]:
            - img [ref=e1171]
          - cell [ref=e1172]
          - cell "PDF" [ref=e1173]:
            - text: PDF
            - link [ref=e1174] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/6835a3700d4ea-CRMTFAug24.pdf
              - generic [ref=e1175]: 
          - cell "Forms & Brochures" [ref=e1176]
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners" [ref=e1177]
          - cell "Syndicated" [ref=e1178]
          - cell "2025-07-30 05:43 PM" [ref=e1179]
          - cell " " [ref=e1180]:
            - list [ref=e1182]:
              - listitem [ref=e1183]:
                - link "" [ref=e1184] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1185]: 
              - listitem [ref=e1186]:
                - generic "Copy" [ref=e1187]:
                  - generic [ref=e1189]: 
        - row "New Annoucement111 PDF Forms & Brochures AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners Syndicated 2025-07-30 05:43 PM  " [ref=e1190]:
          - cell [ref=e1191]:
            - checkbox [ref=e1193]
          - cell "New Annoucement111" [ref=e1194]
          - cell [ref=e1195]:
            - img [ref=e1196]
          - cell [ref=e1197]
          - cell "PDF" [ref=e1198]:
            - text: PDF
            - link [ref=e1199] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/6835a31c288c8-CRMTFAug24.pdf
              - generic [ref=e1200]: 
          - cell "Forms & Brochures" [ref=e1201]
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners" [ref=e1202]
          - cell "Syndicated" [ref=e1203]
          - cell "2025-07-30 05:43 PM" [ref=e1204]
          - cell " " [ref=e1205]:
            - list [ref=e1207]:
              - listitem [ref=e1208]:
                - link "" [ref=e1209] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1210]: 
              - listitem [ref=e1211]:
                - generic "Copy" [ref=e1212]:
                  - generic [ref=e1214]: 
        - row "SPUAT DOC Library's PDF Forms & Brochures, CXO Announcements AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners Syndicated 2025-07-30 05:43 PM  " [ref=e1215]:
          - cell [ref=e1216]:
            - checkbox [ref=e1218]
          - cell "SPUAT DOC Library's" [ref=e1219]
          - cell [ref=e1220]:
            - img [ref=e1221]
          - cell [ref=e1222]
          - cell "PDF" [ref=e1223]:
            - text: PDF
            - link [ref=e1224] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/68259c4140db7-Financial-Services-Brochure.pdf
              - generic [ref=e1225]: 
          - cell "Forms & Brochures, CXO Announcements" [ref=e1226]
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners" [ref=e1227]
          - cell "Syndicated" [ref=e1228]
          - cell "2025-07-30 05:43 PM" [ref=e1229]
          - cell " " [ref=e1230]:
            - list [ref=e1232]:
              - listitem [ref=e1233]:
                - link "" [ref=e1234] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1235]: 
              - listitem [ref=e1236]:
                - generic "Copy" [ref=e1237]:
                  - generic [ref=e1239]: 
        - row "Document & SPUAT's Hello PDF Forms & Brochures, CXO Announcements, Training/Sales Content ExpiredDraft 2025-07-30 05:43 PM / 2025-04-17 01:00 PM " [ref=e1240]:
          - cell [ref=e1241]:
            - checkbox [ref=e1243]
          - cell "Document & SPUAT's" [ref=e1244]
          - cell [ref=e1245]:
            - img [ref=e1246]
          - cell "Hello" [ref=e1247]
          - cell "PDF" [ref=e1248]:
            - text: PDF
            - link [ref=e1249] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/6800acc4d1174-Financial-Services-Brochure.pdf
              - generic [ref=e1250]: 
          - cell "Forms & Brochures, CXO Announcements, Training/Sales Content" [ref=e1251]
          - cell [ref=e1252]
          - cell "ExpiredDraft" [ref=e1253]
          - cell "2025-07-30 05:43 PM / 2025-04-17 01:00 PM" [ref=e1254]
          - cell "" [ref=e1255]:
            - list [ref=e1257]:
              - listitem [ref=e1258]:
                - link "" [ref=e1259] [cursor=pointer]:
                  - /url: sp-upload-document.php?document_id=IywzNFkKYAo=
                  - generic [ref=e1260]: 
        - row "Document Library's SpUAT PDF Forms & Brochures AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners Syndicated 2025-07-30 05:43 PM  " [ref=e1261]:
          - cell [ref=e1262]:
            - checkbox [ref=e1264]
          - cell "Document Library's SpUAT" [ref=e1265]
          - cell [ref=e1266]:
            - img [ref=e1267]
          - cell [ref=e1268]
          - cell "PDF" [ref=e1269]:
            - text: PDF
            - link [ref=e1270] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/6800abbf3cc1a-Financial-Services-Brochure.pdf
              - generic [ref=e1271]: 
          - cell "Forms & Brochures" [ref=e1272]
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners" [ref=e1273]
          - cell "Syndicated" [ref=e1274]
          - cell "2025-07-30 05:43 PM" [ref=e1275]
          - cell " " [ref=e1276]:
            - list [ref=e1278]:
              - listitem [ref=e1279]:
                - link "" [ref=e1280] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1281]: 
              - listitem [ref=e1282]:
                - generic "Copy" [ref=e1283]:
                  - generic [ref=e1285]: 
        - row "Testing Document List - 90922 PDF Forms & Brochures, CXO Announcements AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners Syndicated 2025-07-30 05:43 PM  " [ref=e1286]:
          - cell [ref=e1287]:
            - checkbox [ref=e1289]
          - cell "Testing Document List - 90922" [ref=e1290]
          - cell [ref=e1291]:
            - img [ref=e1292]
          - cell [ref=e1293]
          - cell "PDF" [ref=e1294]:
            - text: PDF
            - link [ref=e1295] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/67e2824b354fe-SQL-STATEMENTS.pdf
              - generic [ref=e1296]: 
          - cell "Forms & Brochures, CXO Announcements" [ref=e1297]
          - cell "AutoPost, All, Nine Nine, Digipulse Testing's, Hindi, Marathi, Punjabi, Kannada, Tamil, New Partners" [ref=e1298]
          - cell "Syndicated" [ref=e1299]
          - cell "2025-07-30 05:43 PM" [ref=e1300]
          - cell " " [ref=e1301]:
            - list [ref=e1303]:
              - listitem [ref=e1304]:
                - link "" [ref=e1305] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1306]: 
              - listitem [ref=e1307]:
                - generic "Copy" [ref=e1308]:
                  - generic [ref=e1310]: 
        - row "Document Lib Digipulse's Test PDF Forms & Brochures All, Digipulse Testing's Syndicated 2025-03-25 09:44 AM  " [ref=e1311]:
          - cell [ref=e1312]:
            - checkbox [ref=e1314]
          - cell "Document Lib Digipulse's Test" [ref=e1315]
          - cell [ref=e1316]:
            - img [ref=e1317]
          - cell [ref=e1318]
          - cell "PDF" [ref=e1319]:
            - text: PDF
            - link [ref=e1320] [cursor=pointer]:
              - /url: https://developer-sp.s3.amazonaws.com/SPU11374/brochure/data/67e27af7ed178-SQL-STATEMENTS.pdf
              - generic [ref=e1321]: 
          - cell "Forms & Brochures" [ref=e1322]
          - cell "All, Digipulse Testing's" [ref=e1323]
          - cell "Syndicated" [ref=e1324]
          - cell "2025-03-25 09:44 AM" [ref=e1325]
          - cell " " [ref=e1326]:
            - list [ref=e1328]:
              - listitem [ref=e1329]:
                - link "" [ref=e1330] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e1331]: 
              - listitem [ref=e1332]:
                - generic "Copy" [ref=e1333]:
                  - generic [ref=e1335]: 
  - generic [ref=e1338]:
    - generic [ref=e1340]:
      - generic [ref=e1341]:
        - button [ref=e1342]
        - heading [level=5] [ref=e1343]: Select document creative to access
      - generic [ref=e1344]: Push Notifications
      - generic [ref=e1347]: Email Notification
    - generic [ref=e1351]:
      - generic [ref=e1352]:
        - generic [ref=e1354]:
          - generic [ref=e1355]:
            - radio [ref=e1356]
            - text: Team
          - generic [ref=e1357]:
            - radio [ref=e1358]
            - text: Users
        - generic [ref=e1360]:
          - generic [ref=e1361]: Content Date
          - textbox [ref=e1362]
        - generic [ref=e1364]:
          - generic [ref=e1365]: Expired On
          - textbox [ref=e1366]
      - generic [ref=e1367]:
        - generic [ref=e1369]:
          - checkbox [ref=e1370]
          - text: Schedule
        - text: 
    - generic [ref=e1371]:
      - button [ref=e1372]: Cancel
      - button [ref=e1373]: Update Access
  - generic [ref=e1376]:
    - generic [ref=e1377]:
      - button [ref=e1378]
      - heading [level=5] [ref=e1379]: Update hashtag(s) to selected content(s)
    - generic [ref=e1380]:
      - generic [ref=e1382]:
        - generic [ref=e1383]:
          - radio [checked] [ref=e1384]
          - text: Add
        - generic [ref=e1385]:
          - radio [ref=e1386]
          - text: Remove
      - generic [ref=e1387]:
        - generic [ref=e1389]:
          - text: Internal Hashtags
          - textbox [ref=e1390]
        - generic [ref=e1393]:
          - generic [ref=e1394]: 
          - text: Add New Tag
      - button [ref=e1398]: Update Hashtag(s)
  - generic [ref=e1401]:
    - generic [ref=e1402]:
      - button "Close" [ref=e1403]
      - heading "Update Category And Sub-Category to selected content(s)" [level=4] [ref=e1404]
    - generic [ref=e1405]:
      - generic [ref=e1406]:
        - text: Solutions
        - listbox [ref=e1408]
      - generic [ref=e1409]:
        - text: Sub-Category
        - listbox [ref=e1411]
      - button "Update" [ref=e1415]
  - dialog [ref=e1416]:
    - generic [ref=e1418]:
      - generic [ref=e1419]:
        - button [ref=e1420]
        - heading [level=4] [ref=e1421]: Update Buy Now link to selected content(s)
      - generic [ref=e1422]:
        - generic [ref=e1423]:
          - text: Buy Now Link
          - checkbox [ref=e1425]
        - button [ref=e1429]: Update
```

# Test source

```ts
  267 | 
  268 |   async enterDescription(text: string): Promise<void> {
  269 |     await this.descriptionField.scrollIntoViewIfNeeded();
  270 |     await this.descriptionField.fill(text);
  271 |   }
  272 | 
  273 |   async clickUploadButton(): Promise<void> {
  274 |     await this.uploadButton.scrollIntoViewIfNeeded();
  275 |     await this.uploadButton.click();
  276 |   }
  277 | 
  278 | 
  279 |   // ─────────────────────────────────────────────────────────────────────
  280 |   // DOCUMENT OPTIONS METHODS
  281 |   // ─────────────────────────────────────────────────────────────────────
  282 | 
  283 |   async clickDocumentOptionTwo(): Promise<void> {
  284 |     await this.documentOptionTwo.click();
  285 |   }
  286 | 
  287 |   async clickDocumentOptionThree(): Promise<void> {
  288 |     await this.documentOptionThree.click();
  289 |   }
  290 | 
  291 |   async clickDownloadableToggle(): Promise<void> {
  292 |     await this.downloadableToggle.click();
  293 |   }
  294 | 
  295 | 
  296 |   // ─────────────────────────────────────────────────────────────────────
  297 |   // HASHTAG METHODS
  298 |   // ─────────────────────────────────────────────────────────────────────
  299 | 
  300 |   async enterHashtag(text: string): Promise<void> {
  301 |     await this.hashtagField.fill(text);
  302 |   }
  303 | 
  304 |   // hashtagSuggestion is already env-aware from the constructor
  305 |   async selectHashtagSuggestion(): Promise<void> {
  306 |     await this.hashtagSuggestion.click();
  307 |   }
  308 | 
  309 | 
  310 |   // ─────────────────────────────────────────────────────────────────────
  311 |   // VALIDATION MESSAGE METHODS
  312 |   // ─────────────────────────────────────────────────────────────────────
  313 | 
  314 |   // evaluate() runs JS in the browser on the actual DOM element
  315 |   // el.validationMessage is the browser's built-in HTML5 validation tooltip text
  316 |   async getDocumentNameValidation(): Promise<string> {
  317 |     return await this.documentNameField.evaluate((el: HTMLInputElement) => el.validationMessage);
  318 |   }
  319 | 
  320 |   async getDescriptionValidation(): Promise<string> {
  321 |     return await this.descriptionField.evaluate((el: HTMLTextAreaElement) => el.validationMessage);
  322 |   }
  323 | 
  324 |   async getFileInputValidation(): Promise<string> {
  325 |     return await this.fileInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  326 |   }
  327 | 
  328 | 
  329 |   // ─────────────────────────────────────────────────────────────────────
  330 |   // SEARCH & LISTING METHODS
  331 |   // ─────────────────────────────────────────────────────────────────────
  332 | 
  333 |   async enterSearchTerm(text: string): Promise<void> {
  334 |     await this.searchBox.fill(text);
  335 |   }
  336 | 
  337 |   // Reads the first document name from the listing table
  338 |   // Used by TC_DL_37 to get a real name dynamically instead of relying on hardcoded config
  339 |   async getFirstDocumentName(): Promise<string> {
  340 |     await this.firstDocumentNameElement.waitFor({ state: 'visible' });
  341 |     return (await this.firstDocumentNameElement.innerText()).trim();
  342 |   }
  343 | 
  344 |   // Dynamic locator — built at call time with the exact text to match
  345 |   // getByRole('cell') avoids XPath string interpolation — safe for names with apostrophes or quotes
  346 |   async getSearchResultText(text: string): Promise<string> {
  347 |     return await this.page.getByRole('cell', { name: text, exact: true }).innerText();
  348 |   }
  349 | 
  350 |   async getNoRecordsText(): Promise<string> {
  351 |     await this.noRecordsElement.waitFor({ state: 'visible' });
  352 |     return await this.noRecordsElement.innerText();
  353 |   }
  354 | 
  355 | 
  356 |   // ─────────────────────────────────────────────────────────────────────
  357 |   // DELETE FLOW METHODS
  358 |   // ─────────────────────────────────────────────────────────────────────
  359 | 
  360 |   // waitFor(visible) here so tests don't need a sleep before reading the dialog
  361 |   async getDialogBoxText(): Promise<string> {
  362 |     await this.dialogBox.waitFor({ state: 'visible' });
  363 |     return await this.dialogBox.innerText();
  364 |   }
  365 | 
  366 |   async clickOkButton(): Promise<void> {
> 367 |     await this.okButton.click();
      |                         ^ Error: locator.click: Test timeout of 90000ms exceeded.
  368 |   }
  369 | 
  370 | 
  371 |   // ─────────────────────────────────────────────────────────────────────
  372 |   // CHECKBOX & DYNAMIC TEXT METHODS
  373 |   // ─────────────────────────────────────────────────────────────────────
  374 | 
  375 |   async clickCheckbox(): Promise<void> {
  376 |     await this.checkboxOption.click();
  377 |   }
  378 | 
  379 |   async clickDraftDocumentCheckbox(): Promise<void> {
  380 |     await this.draftDocumentCheckbox.first().click();
  381 |   }
  382 | 
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
```