/* ===== UPDATE LOG DATA =====
   Add an update by adding ONE line to `entries`:
     'YYYY-MM-DD':['Area','What changed','Optional second bullet'],
   today:  the date the "current month" and the outlined future dots count from
   months: the 3 months shown, as 'YYYY-MM'
   sample: set to false to hide the "Sample updates" note
   Used by both /updates and the Update log doc in /playground. */
const LOG = {title:'Update log', kind:'Log', sample:true, sections:[], today:'2026-10-24',
    months:['2026-09','2026-10','2026-11'],
    entries:{
      '2026-08-03':['Site','Moved the portfolio to Framer','Rebuilt every page from scratch so I can edit without code.'],
      '2026-08-05':['Home','Desktop canvas you can drag around','The home page became a canvas with a dock instead of a nav bar.'],
      '2026-08-12':['Case studies','Published the beleaf case study','First full write-up: research, pivots and final hardware.'],
      '2026-08-19':['Home','Text message closing note','Swapped the footer for a little message bubble.'],
      '2026-08-27':['Case studies','Slow Factory first draft','Outline, hero image and the problem section.'],
      '2026-09-02':['Case studies','TownShare case study live','17 interviews, 3 pivots and 5 iterations, all in one page.'],
      '2026-09-04':['Home','Dock icons and tooltips','Each dock icon now says where it goes on hover.'],
      '2026-09-09':['About','New headshot and bio','Shorter bio that sounds more like me.'],
      '2026-09-10':['About','Added resume download',''],
      '2026-09-15':['Case studies','Fixed mobile image crops','Device frames no longer get cut off on phones.'],
      '2026-09-17':['Playground','Started the playground canvas','A space for projects outside of design.'],
      '2026-09-18':['Playground','Added the crochet video',''],
      '2026-09-23':['Case studies','Meta lists beside every hero','Role, team, timeline and tools in one place.'],
      '2026-09-24':['Site','Faster image loading','Compressed every image and added lazy loading.'],
      '2026-09-29':['Case studies','Slow Factory published',''],
      '2026-10-01':['Design system','Audited every text style','Found 23 text styles and 9 greys across the site.'],
      '2026-10-02':['Design system','Wrote down the izy tokens','Colours, type, spacing and corners in one file.'],
      '2026-10-06':['Design system','Fixed low-contrast greys','Muted text now passes AA on every surface.'],
      '2026-10-08':['Design system','Cut text styles from 23 to 8','Helvetica for headings, Inter for reading.'],
      '2026-10-13':['Case studies','Bracketed eyebrows everywhere','Every section label now reads like [PROBLEM].'],
      '2026-10-16':['Case studies','TownShare, the after version','Rebuilt the case study page with izy.'],
      '2026-10-20':['Design system','Applied izy in Figma','Variables and text styles on the homepage file.'],
      '2026-10-22':['Playground','Glass folders with photos inside','Folders fan out on hover and open into boards.'],
      '2026-10-23':['Playground','AKPsi and ceramics club folders','Moved recruitment and club work into their own folders.'],
      '2026-10-24':['Playground','Update log becomes a dot log','Tap any dot to see what changed that day.']
    }};
