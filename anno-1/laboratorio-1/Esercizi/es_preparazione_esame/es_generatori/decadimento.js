//decadimento => https://replit.com/@731AA2223LABIB/Decadimento-GABRIELEMARSILI#index.js

/*
definire un generatore decadimento(n,k) che, dato in input un numero n, generi infiniti numeri interi ottenuti dividendo n 
per potenze successive di k 
=> il generatore restituirà n/(k^0) la prima volta, n/(k^1) poi n/(k^2) ecc

Attenzione : si arrotondi ogni valore generato con Math.round e si assuma k != 0 sempre.
*/

function* decadimento(n,k){
    let i = 0
    while(true){
        yield Math.round(n / Math.pow(k,i))
        i++;
    }
}

var num = decadimento(4, 2)
for (var i = 1; i < 5; i++) {
    console.log(num.next())
}