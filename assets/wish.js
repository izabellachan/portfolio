/* Wish clover field (Figma: portfolio › wish clover field), the footer on Work and About.
   Click a clover to read its wish; "make a wish" opens a panel to pick a clover, write a wish
   (120 characters) and choose who can read it. Your clover is planted in an open spot, draws itself
   in green and is shared with everyone through /api/wishes (api/wishes.js); a secret wish shares only
   its clover, and its words stay in this browser. Your own clovers are remembered in this browser. */
(() => {
  const mount = document.querySelector('[data-wish-field]');
  if (!mount) return;

  // the five clover styles, drawn on a 48×48 grid
  const STYLES = {
    ruffled: 'M24.4683 21.7756L23.5317 22.0098L23.0634 22.7122L22.8293 24.5854L22.1268 26.8098L21.8927 29.3854L20.839 31.961L20.2537 32.4293H19.6683L18.9659 31.8439L18.6146 30.9073L18.0293 30.439L16.9756 30.3219L16.7415 30.6732L16.8585 31.4927L17.561 33.0146L18.7317 34.1854L20.3707 34.7707L20.722 34.6537L22.1268 33.1317L23.7659 28.9171L24 28.8L24.2341 29.1512V35.9415L24 37.5805L23.4146 39.1024L23.0634 41.561L22.7122 42.3805V43.0829L23.0634 43.4341L24.1171 43.2L24.5854 42.4976L24.8195 40.6244L25.7561 37.5805L25.9902 33.1317L26.5756 33.0146L27.7463 34.0683L29.8537 34.6537H31.0244L32.7805 34.0683L33.9512 32.6634L34.1854 31.961L34.3024 28.6829L33.6 27.8634H33.1317L32.5463 28.3317V31.2585L31.961 32.3122L30.439 32.8976L29.0341 32.6634L27.278 31.1415L26.9268 30.3219L26.6927 27.8634L25.639 22.7122L25.2878 22.1268L24.4683 21.7756ZM22.1268 21.0732H20.9561L20.722 22.5951L18.6146 25.0537L17.9122 26.2244V26.9268L18.1463 27.161L19.3171 26.8098L20.9561 25.2878L22.1268 23.6488L22.478 22.5951V21.5415L22.1268 21.0732ZM33.7171 7.72683L31.4927 8.19512L31.2585 8.42927V9.01463L31.4927 9.36585L32.078 9.6L34.1854 9.48293L35.239 10.0683L35.4732 10.4195V11.0049L34.6537 12.6439L32.5463 14.7512L30.9073 15.922L29.5024 16.3902L28.2146 17.2098L25.9902 17.678L25.522 19.2L24.9366 19.6683L23.7659 19.9024L23.4146 20.4878L23.8829 21.1902L25.0537 21.4244L26.2244 22.1268L27.3951 22.478L28.2146 23.4146L29.0341 23.8829L30.5561 25.639L31.3756 25.7561L31.8439 25.2878V24.5854L30.439 22.5951L29.6195 21.8927L27.3951 20.722L27.161 20.2537L28.0976 19.6683H33.3659L35.5902 20.1366L37.2293 21.7756L37.3463 23.2976L36.6439 24.3512L34.5366 24.5854L33.2488 25.639L33.3659 26.3415L34.6537 26.4585L38.1659 25.7561L39.2195 24.2341L39.3366 23.0634L38.5171 20.4878L37.2293 19.0829L36.2927 18.4976L32.7805 17.7951L32.3122 17.3268L32.7805 16.6244L34.7707 15.3366L36.2927 13.6976L37.3463 11.3561V10.3024L36.4098 8.3122L35.5902 7.8439L33.7171 7.72683ZM29.2683 4.44878L28.6829 4.21463L26.2244 4.44878L25.4049 4.91707L23.5317 6.79024L22.7122 9.01463L22.0098 9.71707L21.4244 9.6L19.9024 7.02439L18.3805 5.85366L17.3268 5.50244H15.6878L15.1024 5.85366L13.9317 7.96098L14.0488 11.239L14.4 11.4732L15.2195 11.239L15.5707 10.3024V9.01463L16.039 7.96098L16.9756 7.25854L17.6781 7.49268L19.4341 9.36585L20.1366 11.0049L20.6049 11.5902L20.839 12.5268L20.9561 15.5707L20.4878 16.039H19.9024L19.0829 15.3366L18.0293 14.8683L16.9756 13.8146L15.5707 13.6976L15.1024 14.2829L15.3366 15.1024L16.9756 16.2732L18.1463 16.7415L18.6146 17.3268L18.4976 18.0293L17.6781 18.3805L15.3366 18.6146L11.3561 18.4976L10.7707 17.9122V17.0927L12.9951 14.7512V14.0488L12.1756 13.5805L11.3561 13.9317L8.42927 16.9756L8.07805 17.7951L8.19512 18.3805L10.1854 19.9024L12.2927 20.2537L16.9756 20.1366L17.2098 20.3707L16.9756 20.722L16.039 20.9561L15.2195 21.6585L12.0585 23.2976L11.122 24.1171L10.5366 24.3512L9.48293 25.522L9.13171 26.2244L9.01463 28.5659L9.24878 29.1512L10.5366 30.3219L11.0049 30.5561L14.7512 30.439L15.2195 29.8537V29.3854L14.8683 28.8L14.4 28.6829L12.4098 29.0341L11.3561 28.8L11.0049 28.4488L10.7707 27.8634L10.8878 26.4585L14.2829 23.8829L15.3366 23.5317L16.5073 22.7122L17.6781 22.361L19.2 21.3073L20.3707 20.839L20.722 20.3707L20.839 19.6683L22.0098 18.7317L22.8293 17.678L24.1171 16.9756L25.522 16.8585L28.0976 14.0488L28.9171 12.6439V12.0585L28.3317 11.7073L27.6293 11.8244L26.9268 12.4098L26.5756 13.2293L25.522 14.1659L24.1171 16.1561H23.8829L23.5317 15.6878V11.9415L24.8195 7.8439L26.3415 6.32195L27.278 5.97073L28.5659 6.20488L29.5024 7.72683L29.9707 7.8439L30.5561 7.37561V5.97073L29.2683 4.44878Z',
    round: 'M25.2279 4.24186H22.9953L21.4326 4.91163L19.7581 6.58605L19.5349 7.36744V9.04186L19.0884 9.37674L17.1907 8.8186H15.0698L12.5023 10.0465L11.6093 11.6093L11.0512 13.9535L10.8279 16.4093L10.9395 18.0837L11.6093 18.9767L13.6186 19.8698H14.8465L15.9628 19.2L16.8558 18.9767L17.8605 18.1953L19.2 17.7488H19.6465L19.8698 17.9721L19.5349 19.0884L17.9721 20.4279L16.7442 21.9907L16.2977 23.3302L16.5209 25.1163L17.3023 26.0093L17.6372 27.014L17.414 29.0233L16.8558 30.4744L16.5209 32.3721V37.1721L17.8605 39.8512L18.6419 40.8558L18.8651 41.9721L19.9814 43.5349L20.7628 43.7581L21.3209 43.3116V42.1954L20.5395 41.1907L19.9814 39.8512L19.3116 39.0698L18.7535 37.8419L18.307 37.3954L17.9721 35.8326L18.0837 32.8186L18.8651 30.1395L19.0884 28.5767L19.8698 28.1302L21.6558 29.0233L23.3302 29.1349L25.4512 28.1302L26.6791 26.5674L26.9023 25.786V23.4419L26.4558 21.3209L26.5674 20.7628L27.2372 20.6512L28.5767 21.5442L31.2558 21.4326L33.0419 21.0977L34.8279 20.2047L35.7209 19.3116L36.5023 16.8558V14.9581L35.7209 13.3953L35.1628 13.0605L33.0419 12.7256L28.8 13.1721L26.7907 13.8419L26.4558 13.6186L27.014 12.2791L28.0186 10.9395L28.5767 7.81395L28.0186 5.91628L27.4605 5.35814L26.6791 5.13488L25.2279 4.24186ZM23.2186 17.7488L23.7767 17.9721L24.4465 18.9767L24.5581 20.986L25.2279 22.9953L25.3395 24.893L25.0047 26.0093L23.2186 27.3488H21.8791L19.9814 26.3442L18.1953 24.5581L17.9721 24.1116V23.3302L18.9767 21.7674L21.3209 19.7581L22.6605 17.9721L23.2186 17.7488ZM34.7163 15.6279V16.9674L34.2698 18.307L32.5953 19.5349L31.1442 19.8698H29.2465L28.2419 19.5349L25.6744 16.5209V16.0744L26.1209 15.7395L29.9163 14.6233L33.2651 14.4L34.1581 14.7349L34.7163 15.6279ZM19.2 11.386L20.8744 13.6186L21.2093 14.5116L20.8744 15.293L19.9814 15.5163L18.5302 16.4093L17.414 16.6326L16.2977 17.414L14.4 18.0837L13.2837 17.8605L12.614 17.3023V14.5116L12.9488 13.1721L13.8419 11.386L15.5163 10.3814L17.1907 10.493L19.2 11.386ZM24.6698 5.80465L26.4558 7.14419L26.7907 8.03721L26.6791 9.6L26.3442 10.7163L25.4512 11.9442L23.8884 13.507H23.3302L22.8837 13.1721L21.4326 10.8279L21.2093 10.0465V8.03721L21.5442 7.03256L22.7721 6.02791L23.3302 5.80465H24.6698Z',
    longstem: 'M24.1021 3.77872L20.3234 3.88085L19.4043 4.18723L17.9745 5.10638L16.7489 6.74043L16.8511 8.37447L17.7702 10.5191L18.9957 12.3574L19.8128 13.1745L19.9149 13.7872L19.4043 14.0936L16.2383 14.1957L14.9106 14.8085L13.6851 15.1149L12.5617 16.034L11.8468 17.7702L11.9489 18.4851L12.6638 19.9149L14.4 21.2426L15.6255 21.5489L22.366 21.4468L23.0809 21.6511L23.3872 22.0596L23.0809 23.0809L22.6723 30.2298L21.9574 32.5787L21.6511 35.8468L20.9362 37.583L20.5277 39.3191L20.017 39.9319L19.6085 41.1574L18.6894 42.5872L18.5872 43.3021L18.7915 43.8128L19.0979 44.017H19.6085L19.9149 43.8128L20.2213 42.8936L20.9362 41.7702L21.1404 40.9532L21.9574 39.7277L22.366 38.0936L22.8766 37.0723L23.183 34.2128L24 31.2511L24.2043 27.983L24.6128 25.2255L25.3277 24.817L27.983 26.3489L29.5149 26.7574L30.8426 26.6553L31.966 25.3277L32.2723 24.6128V21.0383L32.0681 20.1191L31.4553 19.2V18.4851L31.966 18.0766H33.3957L34.8255 17.4638L35.9489 16.1362L36.3574 15.3191L36.4596 13.4809L36.2553 11.6426L35.234 9.6L34.7234 9.08936L32.783 8.37447H31.6596L30.6383 8.78298L28.0851 9.29362L27.3702 8.57872L27.0638 6.74043L26.1447 5.10638L24.817 3.98298L24.1021 3.77872ZM20.3234 5.41277L21.2426 5.20851L23.7957 5.31064L24.2043 5.51489L25.5319 6.94468L26.3489 10.1106L25.8383 11.7447L26.0426 12.2553L26.3489 12.4596H27.4723L27.8808 12.2553L28.5957 11.1319L29.617 10.417L31.6596 10.0085H32.4766L33.8043 10.5191L34.8255 11.9489L35.0298 13.7872L34.9277 14.8085L33.8043 16.034L33.1915 16.3404L31.5574 16.4426L30.0255 16.034L28.5957 16.2383L27.6766 15.217L27.2681 15.0128L25.7362 14.8085L25.5319 15.1149V15.6255L25.0213 16.5447L25.1234 17.1574L25.7362 17.4638H26.7574L27.7787 17.0553H28.2894L29.8213 18.7915L30.0255 19.6085L30.6383 20.6298L30.8426 21.4468V24L30.6383 24.4085L29.8213 25.0213L29.0043 25.1234L26.8596 24.1021L25.3277 22.0596L25.0213 20.7319L23.5915 19.7106L21.0383 20.1191H15.8298L14.4 19.3021L13.7872 18.5872L13.583 17.8723L13.9915 16.9532L14.6043 16.4426L16.7489 15.6255L20.6298 15.5234L22.5702 16.2383L23.0809 16.034L23.4894 15.5234V14.6043L21.5489 13.0723L20.2213 11.5404L19.8128 10.7234L19.0979 9.90638L18.383 8.06808V7.35319L18.6894 6.74043L20.3234 5.41277Z',
    bow: 'M26.0093 4.24186L24 4.35349L22.7721 5.35814L22.1023 6.25116L21.8791 7.70232L21.2093 9.04186L20.986 10.8279V15.0698L21.4326 15.8512L22.214 16.0744L22.6605 16.5209L22.7721 17.1907L22.5488 17.5256L21.6558 17.6372L20.986 17.414L20.3163 16.8558L18.7535 16.4093L17.1907 15.5163L15.8512 15.293L14.2884 14.4L13.1721 14.1767L12.1674 13.3953H11.386L10.0465 14.8465L9.6 16.4093L8.8186 17.7488L8.59535 21.2093L9.04186 22.214L9.82326 22.5488L12.5023 22.4372L12.9488 22.8837L13.2837 24.4465L15.293 25.786L16.7442 25.5628L17.7488 24.7814L18.4186 24.5581L18.8651 25.0047L16.6326 29.2465L16.2977 31.0326L15.5163 32.707L14.8465 37.7302V39.0698L15.4047 41.7488L15.6279 42.1954L17.0791 43.4233L17.7488 43.0884V42.4186L16.9674 41.3023L16.6326 39.6279V36.9488L16.9674 33.6L17.8605 31.4791L18.1953 29.693L18.8651 28.8L19.3116 27.3488L21.4326 24.1116L21.9907 23.6651H22.4372L22.7721 24.1116L22.6605 29.5814L23.3302 32.2605L25.0047 33.8233H26.5674L28.0186 32.4837L28.6884 31.0326L29.3581 30.3628L30.4744 30.2512L32.1488 30.4744L33.1535 30.2512L33.6 29.8047L33.8233 29.2465V28.1302L33.6 27.4605L32.3721 25.786L30.8093 24.2233V23.8884L31.2558 23.5535L35.0512 23.4419L36.5023 22.6605L37.9535 20.5395L37.7302 19.0884L37.8419 18.5302L39.293 16.7442L39.6279 15.8512L39.5163 14.9581L39.1814 14.5116L37.0605 13.3953L34.493 13.6186L32.707 14.1767H31.2558L31.0326 13.9535L31.1442 13.507L32.4837 12.2791L33.3767 10.8279L33.6 10.1581L33.4884 7.92558L31.9256 6.58605H31.2558L30.3628 7.14419H29.8047L28.0186 5.35814L26.0093 4.24186ZM27.1256 22.7721L27.907 23.3302L28.5767 24.3349L31.9256 27.6837L32.0372 28.3535L31.3674 28.8L28.3535 28.5767L27.907 28.8L26.5674 31.5907L25.786 32.0372L25.0047 31.5907L24.4465 29.9163V24.6698L25.0047 23.7767H25.4512L26.0093 24.1116L26.3442 24L26.5674 22.8837L27.1256 22.7721ZM10.2698 19.2L11.386 16.0744L11.8326 15.7395L12.5023 15.6279L13.8419 15.9628L15.0698 16.7442L16.7442 17.0791L18.5302 17.9721L18.8651 18.4186L17.6372 19.3116L17.7488 19.9814L18.0837 20.2047L20.2047 20.093L20.5395 20.5395L17.8605 22.9953L16.186 24H15.5163L14.6233 22.7721L14.2884 21.2093L13.2837 20.093L12.5023 19.9814L11.6093 20.7628L10.8279 20.8744L10.2698 20.3163V19.2ZM37.2837 15.8512L37.1721 16.4093L36.5023 16.9674L35.9442 18.1953L36.0558 19.9814L35.2744 21.2093L34.493 21.8791H30.2512L28.3535 20.8744L26.4558 19.5349L26.7907 19.0884L28.3535 18.6419L28.4651 18.1953L28.0186 17.5256L28.2419 17.0791L30.4744 16.0744L35.2744 15.293H36.5023L37.2837 15.8512ZM25.786 5.80465L29.1349 9.04186L29.8047 9.15349L31.4791 8.70698L31.9256 9.15349L32.0372 9.82326L30.6977 11.7209L29.4698 12.9488L25.0047 15.9628L24.6698 15.6279L24.7814 14.4L25.4512 13.2837V12.614L25.1163 12.3907L24.5581 12.5023L23.4419 13.507L22.8837 14.5116L22.5488 13.8419V11.1628L22.7721 9.71163L23.7767 7.03256L25.0047 5.80465H25.786Z',
    loop: 'M30.6286 4.91428L29.0286 5.02857L26.6286 5.82857L24.4571 7.77143L23.2 9.82857L22.8571 12.9143L22.9714 14.8571L23.5429 15.6571H24.1143L24.5714 14.9714V11.8857L24.8 10.2857L26.0571 8.45714L27.5429 7.2L29.2571 6.74286H30.6286L31.8857 7.2L33.3714 8.91429L33.4857 12.9143L33.1429 13.9429L32.5714 14.4L32.1143 15.3143L29.8286 16.8L28.2286 17.1429H26.0571L25.7143 17.3714L25.6 17.8286L25.9429 18.5143L26.5143 18.8571L27.3143 18.9714L27.6571 19.4286V20.3429L27.3143 20.6857L26.5143 20.9143L25.6 20.8L24.9143 19.8857L24.5714 18.0571L24.1143 17.7143L23.3143 17.6L22.8571 17.1429L22.6286 16.1143L22.2857 15.6571L17.0286 11.5429L14.4 10.4L11.5429 10.1714L9.6 10.9714L8.45714 12.1143L7.2 14.8571V18.2857L8.34286 20L8.91429 20.5714L10.4 21.3714L12.3429 21.6L13.0286 22.1714L12 23.4286L10.8571 25.8286V27.6571L11.7714 29.4857L13.6 30.9714L16.6857 32.1143L18.6286 32.3429L20 32.1143L21.0286 31.0857L22.5143 28.8L23.4286 27.7714L24.6857 25.3714L25.0286 25.0286L25.3714 25.2571L25.7143 28.2286V33.3714L25.2571 37.0286L24.4571 38.7429L24.2286 40.2286L23.2 42.0571L23.0857 42.6286L23.5429 43.0857L24.3429 42.8571L25.4857 41.4857L26.0571 39.2L26.7429 37.8286L27.5429 32.9143L27.4286 28.8L27.6571 28.4571L28.4571 28.5714L29.6 29.6L32 30.8571L36.4571 30.9714L39.0857 29.8286L40.6857 28.2286L41.0286 26.9714V25.8286L40.5714 23.7714L38.8571 21.6L37.1429 20.4571L35.8857 20.2286L34.1714 19.5429L32.1143 19.2H30.4L29.8286 18.8571L29.9429 18.5143L32.2286 17.3714L33.8286 16L34.8571 14.1714L35.2 12L35.0857 9.37143L34.7429 8L34.0571 6.97143L32.8 5.71428L30.6286 4.91428ZM23.7714 21.4857L23.8857 22.1714L23.2 23.2L22.9714 25.2571L22.4 25.9429L21.8286 27.2L19.3143 30.4L18.2857 30.6286L16.5714 30.4L15.6571 29.8286L14.2857 29.3714L12.8 27.6571L12.5714 27.2V26.2857L13.1429 24.8L15.0857 22.7429L16.2286 21.9429L19.4286 20.9143L21.8286 21.1429L22.4 20.8H23.0857L23.7714 21.4857ZM28 21.0286L28.6857 20.6857L31.8857 20.8L36.5714 22.0571L39.2 24.8L39.3143 26.5143L38.8571 27.5429L38.2857 28.1143L36.1143 29.3714H32.9143L30.9714 28.4571L29.2571 26.6286L28.3429 24.8L27.8857 22.0571L28 21.0286ZM8.8 15.2L10.0571 12.9143L11.7714 11.8857H13.1429L15.6571 12.6857L17.7143 14.0571L20.5714 16.5714L20.6857 17.4857L20 18.0571L18.7429 18.2857L17.3714 19.0857L14.1714 20H12.1143L10.5143 19.4286L8.91429 17.8286L8.68571 17.2571L8.8 15.2Z',
  };
  const ORDER = ['ruffled', 'round', 'longstem', 'bow', 'loop'];

  // Clovers already in the field: centre as % of the field, tilt, style. Evenly spaced across the
  // width, alternating high and low so no two sit close together.
  // The wishes are placeholders: edit the text here (secret: true shows only "this wish is a secret").
  const FIELD = [
    { x: 6,    y: 40, r: -10, s: 'bow',      wish: 'I wish my grandma’s garden blooms early this year' },
    { x: 15,   y: 74, r: 8,   s: 'round',    wish: 'I wish my sister gets into her dream school', size: 40 },
    { x: 24,   y: 26, r: 0,   s: 'bow',      wish: 'I wish for a slow, sunny Sunday', secret: true },
    { x: 33,   y: 58, r: 12,  s: 'longstem', wish: 'I wish everyone I love stays healthy' },
    { x: 42,   y: 30, r: -6,  s: 'loop',     wish: 'I wish to finally finish my sketchbook' },
    { x: 51,   y: 72, r: 4,   s: 'longstem', wish: 'I wish my dog lives forever' },
    { x: 60,   y: 44, r: -8,  s: 'ruffled',  wish: 'I wish to see the northern lights one day' },
    { x: 69,   y: 24, r: 10,  s: 'loop',     wish: 'I wish for more long phone calls with old friends', secret: true },
    { x: 78,   y: 66, r: -4,  s: 'ruffled',  wish: 'I wish to be brave enough to start' },
    { x: 87,   y: 34, r: -10, s: 'round',    wish: 'I wish for good news this week' },
    { x: 95,   y: 62, r: 6,   s: 'longstem', wish: 'I wish to keep making things that make people smile' },
  ];


  const KEY = 'izy-wishes';
  const OPENED = 'izy-wish-opened'; // set once someone opens the panel: no more wiggle
  const MAX = 120;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BRACKETS = (n, w) => `<svg viewBox="0 0 ${n} ${n}" fill="none" stroke="#262626" stroke-width="${w}" aria-hidden="true"><path d="M${w / 2} ${n * .22}V${w / 2}H${n * .22}M${n * .78} ${w / 2}H${n - w / 2}V${n * .22}M${w / 2} ${n * .78}V${n - w / 2}H${n * .22}M${n * .78} ${n - w / 2}H${n - w / 2}V${n * .78}"/></svg>`;
  const clover = (s, extra = '') => `<svg viewBox="0 0 48 48" aria-hidden="true"${extra}><path class="fill" d="${STYLES[s]}" fill-rule="evenodd"/></svg>`;
  const ICON = {
    close: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#959595" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l8 8M14 6l-8 8"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#262626" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z"/><circle cx="8" cy="8" r="2"/></svg>',
    lock: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#262626" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7h6c.83 0 1.5.67 1.5 1.5V12c0 .83-.67 1.5-1.5 1.5H5c-.83 0-1.5-.67-1.5-1.5V8.5C3.5 7.67 4.17 7 5 7Z"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></svg>',
  };

  const load = () => { try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
  const save = list => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} };
  const mine = load().filter(w => w && STYLES[w.s] && typeof w.x === 'number' && typeof w.y === 'number');

  mount.className = 'wish';
  mount.innerHTML = `
    <div class="wish-field">
      <div class="wish-brackets" aria-hidden="true">${BRACKETS(46, 1)}</div>
      <p class="wish-pop" role="status" aria-live="polite"></p>
      <p class="wish-toast" aria-live="polite">Your wish has been planted</p>
      <p class="wish-count"></p>
      <p class="wish-hint" aria-hidden="true"><span class="ink">psst… make a wish!</span><svg viewBox="0 0 34 30" fill="none"><path d="M2 5C12 3 22 8 27 22" pathLength="1"/><path d="M21.5 19.5L27.5 23.5L30 16.5" pathLength="1"/></svg></p>
      <button class="wish-open" type="button" aria-expanded="false" aria-controls="wish-panel">
        <span class="stamp"><img src="/assets/logo-stamp.png" alt=""></span>
        <span class="wish-eyebrow">Make a wish</span>
      </button>
    </div>
    <div class="wish-panel" id="wish-panel" role="dialog" aria-label="Make a wish">
      <form class="wish-card" novalidate>
        <p class="wish-eyebrow">Make a wish</p>
        <button class="wish-close" type="button" aria-label="Close">${ICON.close}</button>
        <div class="wish-picker">
          <div class="wish-styles" role="radiogroup" aria-label="Pick a clover">
            ${ORDER.map((s, i) => `<button class="wish-style" type="button" role="radio" data-style="${s}" aria-label="${s === 'longstem' ? 'long stem' : s} clover">${clover(s)}</button>`).join('')}
          </div>
          <div class="wish-picker-brackets" aria-hidden="true">${BRACKETS(44, .92)}</div>
          <div class="wish-preview"></div>
        </div>
        <div class="wish-write">
          <textarea class="wish-input" maxlength="${MAX}" placeholder="I wish…" aria-label="Your wish (up to ${MAX} characters)"></textarea>
          <div class="wish-row">
            <p class="wish-who">everyone can read this</p>
            <div class="wish-toggle" role="group" aria-label="Who can read it">
              <span class="wish-toggle-knob" aria-hidden="true"></span>
              <button type="button" data-secret="0" aria-pressed="true" aria-label="Everyone can read it">${ICON.eye}</button>
              <button type="button" data-secret="1" aria-pressed="false" aria-label="Keep it secret">${ICON.lock}</button>
            </div>
          </div>
        </div>
        <button class="wish-send" type="submit" disabled>send wish</button>
      </form>
    </div>`;

  const $ = sel => mount.querySelector(sel);
  const field = $('.wish-field'), brackets = $('.wish-brackets'), pop = $('.wish-pop'), toast = $('.wish-toast');
  const count = $('.wish-count'), openBtn = $('.wish-open'), panel = $('.wish-panel'), form = $('.wish-card');
  const input = $('.wish-input'), send = $('.wish-send'), who = $('.wish-who'), toggle = $('.wish-toggle');
  const preview = $('.wish-preview'), pickerBrackets = $('.wish-picker-brackets');

  /* ---------- the field ---------- */
  // Positions are % of the field, held at least 16px from its edges: PAD is 16px plus the reach of
  // the 46px brackets around a picked clover.
  const at = p => `clamp(${PAD}px, ${p}%, calc(100% - ${PAD}px))`;
  const PAD = 16 + 23;
  const all = [];
  let pens = 0;
  const plant = (w, isMine, fresh) => {
    const size = w.size || (isMine ? 40 : 34);
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'wc' + (isMine ? ' mine' : '') + (fresh && !reduce ? ' drawing' : '');
    b.style.cssText = `left:${at(w.x)};top:${at(w.y)};--r:${w.r || 0}deg;--s:${size}px`;
    b.setAttribute('aria-label', isMine ? 'Your wish' : 'Read a wish');
    b.innerHTML = clover(w.s);
    if (fresh && !reduce) {
      // draws itself in green: a thick pen traces the drawing's outline, uncovering the clover as it goes
      const id = `wish-pen-${++pens}`;
      const svg = b.firstElementChild;
      svg.insertAdjacentHTML('afterbegin', `<mask id="${id}" maskUnits="userSpaceOnUse" x="-8" y="-8" width="64" height="64"><path class="pen" d="${STYLES[w.s]}" pathLength="1"/></mask>`);
      const fill = svg.querySelector('.fill');
      fill.setAttribute('mask', `url(#${id})`);
      svg.querySelector('.pen').addEventListener('animationend', () => { fill.removeAttribute('mask'); b.classList.remove('drawing'); }, { once: true });
    }
    field.insertBefore(b, brackets);
    const entry = { el: b, w, isMine };
    all.push(entry);
    b.addEventListener('click', e => { e.stopPropagation(); entry === picked ? unpick() : pick(entry); });
    return entry;
  };

  const setCount = () => { const n = all.length; count.textContent = `${n} wish${n === 1 ? '' : 'es'} planted`; };

  FIELD.forEach(w => plant(w, false));
  mine.forEach(w => plant(w, true));
  setCount();

  // everyone else's wishes (yours are already on the field from this browser)
  const mineIds = new Set(mine.map(w => w.id).filter(Boolean));
  fetch('/api/wishes', { cache: 'no-store' })
    .then(r => (r.ok ? r.json() : null))
    .then(data => {
      if (!data || !Array.isArray(data.wishes)) return;
      data.wishes
        .filter(w => w && !mineIds.has(w.id) && STYLES[w.s] && typeof w.x === 'number' && typeof w.y === 'number' && (w.secret || typeof w.wish === 'string'))
        .reverse() // oldest first, so newer clovers sit on top
        .forEach(w => plant({ s: w.s, x: w.x, y: w.y, r: w.r, wish: w.wish, secret: !!w.secret }, false));
      setCount();
    })
    .catch(() => {});

  /* ---------- read a wish ---------- */
  let picked = null;
  const pick = entry => {
    if (picked) picked.el.classList.remove('on');
    const moving = brackets.classList.contains('on');
    picked = entry;
    entry.el.classList.add('on');
    brackets.classList.toggle('slide', moving && !reduce);
    brackets.style.left = entry.el.style.left;
    brackets.style.top = entry.el.style.top;
    brackets.classList.add('on');
    const { w, isMine } = entry;
    const hidden = w.secret && !isMine;
    pop.classList.toggle('secret', !!w.secret); // every secret wish is gray, yours included
    pop.textContent = hidden ? 'this wish is a secret' : w.wish + (isMine && w.secret ? ' (only you can see this)' : '');
    // beside the clover, on whichever side has room
    const fr = field.getBoundingClientRect(), cr = entry.el.getBoundingClientRect();
    const cx = cr.left + cr.width / 2 - fr.left, cy = cr.top + cr.height / 2 - fr.top;
    pop.style.left = '0px';
    const pw = pop.offsetWidth;
    let left = cx + 43;
    if (left + pw > fr.width - 16) left = cx - 43 - pw;
    if (left < 16) left = Math.max(16, Math.min(fr.width - 16 - pw, cx - pw / 2));
    pop.style.left = `${left}px`;
    pop.style.top = `${Math.min(fr.height - 40, Math.max(40, left === cx + 43 || left === cx - 43 - pw ? cy : cy + 40))}px`;
    pop.classList.add('on');
  };
  const unpick = () => {
    if (!picked) return;
    picked.el.classList.remove('on');
    picked = null;
    brackets.classList.remove('on');
    pop.classList.remove('on');
  };
  document.addEventListener('click', e => { if (picked && !field.contains(e.target)) unpick(); });
  field.addEventListener('click', e => { if (!e.target.closest('.wc')) unpick(); });

  /* ---------- make a wish ---------- */
  let style = 'ruffled', secret = false;
  const setStyle = (s, animate) => {
    style = s;
    const i = ORDER.indexOf(s);
    mount.querySelectorAll('.wish-style').forEach((b, n) => { b.classList.toggle('on', n === i); b.setAttribute('aria-checked', n === i); b.tabIndex = n === i ? 0 : -1; });
    pickerBrackets.style.transform = `translateX(${i * 42}px)`;
    preview.innerHTML = clover(s, animate && !reduce ? ' class="swap"' : '');
  };
  const setSecret = v => {
    secret = v;
    toggle.classList.toggle('secret', v);
    toggle.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.secret === (v ? '1' : '0'))));
    who.textContent = v ? 'only you can read this' : 'everyone can read this';
  };
  setStyle(style);
  setSecret(false);

  mount.querySelectorAll('.wish-style').forEach(b => b.addEventListener('click', () => setStyle(b.dataset.style, true)));
  $('.wish-styles').addEventListener('keydown', e => {
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const i = (ORDER.indexOf(style) + d + ORDER.length) % ORDER.length;
    setStyle(ORDER[i], true);
    mount.querySelectorAll('.wish-style')[i].focus();
  });
  toggle.querySelectorAll('button').forEach(b => b.addEventListener('click', () => setSecret(b.dataset.secret === '1')));
  input.addEventListener('input', () => { send.disabled = !input.value.trim(); });

  const open = () => {
    unpick();
    mount.classList.add('open');
    openBtn.setAttribute('aria-expanded', 'true');
    setTimeout(() => input.focus({ preventScroll: true }), reduce ? 0 : 250);
  };
  const close = () => {
    mount.classList.remove('open');
    openBtn.setAttribute('aria-expanded', 'false');
  };
  openBtn.addEventListener('click', e => { e.stopPropagation(); open(); });

  /* ---------- point people at the button ---------- */
  // The stamp wiggles now and then until it has been clicked once (remembered in this browser),
  // and the handwritten note writes itself in when the field scrolls into view.
  let opened = false;
  try { opened = !!localStorage.getItem(OPENED); } catch (e) {}
  if (!opened) mount.classList.add('hint');
  openBtn.addEventListener('click', () => {
    mount.classList.remove('hint');
    try { localStorage.setItem(OPENED, '1'); } catch (e) {}
  });
  const showNote = () => mount.classList.add('noted');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { showNote(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(field);
  } else showNote();
  $('.wish-close').addEventListener('click', () => { close(); openBtn.focus({ preventScroll: true }); });
  mount.addEventListener('keydown', e => { if (e.key === 'Escape' && mount.classList.contains('open')) { close(); openBtn.focus({ preventScroll: true }); } });

  // an open spot: the candidate farthest from every other clover, clear of the corner labels and the toast
  const spot = () => {
    const fr = field.getBoundingClientRect();
    const taken = all.map(({ w }) => [w.x / 100 * fr.width, w.y / 100 * fr.height]);
    let best = null, bestD = -1;
    for (let k = 0; k < 300; k++) {
      const px = PAD + Math.random() * (fr.width - 2 * PAD), py = PAD + Math.random() * (fr.height - 2 * PAD);
      if ((px > fr.width - 210 && py > fr.height - 160) || (px < 180 && py > fr.height - 100)) continue;
      const x = px / fr.width * 100, y = py / fr.height * 100;
      const d = Math.min(...taken.map(([tx, ty]) => Math.hypot(tx - px, ty - py)));
      if (d > bestD) { bestD = d; best = { x: +x.toFixed(2), y: +y.toFixed(2) }; }
    }
    return best || { x: 50, y: 50 };
  };

  // send it to everyone (a secret wish without its words); keep the id so it isn't shown twice here
  const share = w => {
    fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ s: w.s, x: w.x, y: w.y, r: w.r, secret: w.secret, wish: w.secret ? '' : w.wish }),
    })
      .then(r => (r.ok ? r.json() : null))
      .then(data => { if (data && data.id) { w.id = data.id; save(mine); } })
      .catch(() => {});
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim().slice(0, MAX);
    if (!text) return;
    close();
    // once the panel has slid away (so the spot is picked in the field's full width), the
    // "Your wish has been planted" message writes itself in, then the clover draws
    setTimeout(() => {
      const w = { s: style, wish: text, secret, ...spot(), r: Math.round((Math.random() - .5) * 20), at: Date.now() };
      mine.push(w);
      save(mine);
      share(w);
      toast.classList.remove('on');
      void toast.offsetWidth;
      toast.classList.add('on');
      setTimeout(() => { plant(w, true, true); setCount(); }, reduce ? 0 : 700);
      input.value = '';
      send.disabled = true;
      setSecret(false);
      openBtn.focus({ preventScroll: true });
    }, reduce ? 0 : 480);
  });
})();
