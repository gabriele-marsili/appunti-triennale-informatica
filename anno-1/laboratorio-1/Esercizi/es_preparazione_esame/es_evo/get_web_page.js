const https = require('https');

let req = https.get('https://www.solebox.com/en_IT/p/jordan-air_jordan_1_high_og_%22spider-man_across_the_spider-verse%22_%28gs%29-university_red%2Fblack-0226039600000008.html','utf8', res=>{
    var pag = 'page:\n';
    res.on('data',chunk=> {pag+=chunk})
    res.on('end',()=> {console.log(pag)});
})
req.end();


// https://www.solebox.com/en_IT/view-account?registration=false



let req_2 = https.get('https://www.solebox.com/en_IT/p/jordan-air_jordan_1_high_og_%22spider-man_across_the_spider-verse%22_%28gs%29-university_red%2Fblack-0226039600000008.html','utf8', res_2=>{
    var pag_2 = 'page:\n';
    res_2.on('data',chunk=> {pag_2+=chunk})
    res_2.on('end',()=> {console.log(pag_2)});
})
req_2.end();

