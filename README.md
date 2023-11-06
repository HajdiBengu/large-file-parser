# large-file-parser

Kodi ne kete projekt eshte implementimi vetem ne Javascript, HTML dhe CSS i nje funksionaliteti qe ngarkon, lexon dhe parson file te medha teksti dhe i formaton ne permbajtje qe shfaqet ne HTML. Funksionaliteti i ketij programi kryhet me ane te nje readableStream, qe merr te gjithe file-in e ngarkuar dhe e lexon pjese-pjese, ne menyre qe te mos shkaktoje vonese dhe t'i jape mundesi Javascriptit qe te perpunoje pjeset e para, nderkohe qe pjeset e tjera vazhdojne te lexohen.

Perfshirja e nje loaderi eshte i panevojshem per shkak se rezultatet shfaqen pa asnje vonese. Megjithate sic mund ta shihni ne kete projekt ekzistojne te dy kodet, nje me loader dhe nje pa loader, per te krahasuar implementimin e tij. Në kod do të gjeni komente ne shqip për të shpjeguar logjikën e djekur, variablat dhe funksionet.
