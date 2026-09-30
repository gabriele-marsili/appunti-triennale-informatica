/*
Un anno di dice bisestile se è divisibile per 400, oppure se è divisibile per 4 e non per 100.
Si scriva una funzione 
, con 
 e 
 due interi positivi che rappresentano anni, con 
, // il numero di anni bisestili nell'intervallo 
.

*/

function contaBisestile(y1,y2){
    let c = 0
    for (let i = y1; i <= y2; i++){
        if (i%400 === 0) c++
        else if(i%4 === 0 && i%100 != 0) c++
    }
    return c 
}

console.log(contaBisestile(2020,2020)) // 1

console.log(contaBisestile(1904,1908)) // 2

console.log(contaBisestile(2049,2051)) // 0

console.log(contaBisestile(0,2020)) // 491