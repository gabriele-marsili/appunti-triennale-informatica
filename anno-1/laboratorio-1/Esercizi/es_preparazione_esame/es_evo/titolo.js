/*
Scrivete un frammento di codice JavaScript che,
una volta eseguito, aggiunga a tutte le stringhe del 
vostro programma un metodo titolo() il cui effetto è di 
restituire la stringa su cui è invocato, ma tutta in maiuscolo e 
con uno spazio aggiunto fra le lettere della stringa originale.
*/
String.prototype.titolo = function () {
    let res = "";
    let MyStr = new RegExp("[a-z]+"); // oppure e = /[a-z]+/
    let My_UStr = new RegExp("[A-Z]+"); // oppure e = /[a-z]+/
    for(let c of this){ // scorre i caratteri della stringa     
        if(MyStr.test(c) || My_UStr.test(c))res +=  c.toUpperCase() + " " 
        else res+=c        
    }
    return res;
}


console.log("Pippo".titolo())
console.log("P57%p/(PPPp0".titolo())
console.log(`3*2 fa ${3*2}`.titolo())