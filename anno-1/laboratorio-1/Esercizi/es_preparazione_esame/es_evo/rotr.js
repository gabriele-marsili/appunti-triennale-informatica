/*
Usando JavaScript, si aggiunga a tutte le stringhe del programma un metodo rotr() 
con il seguente comportamento:

se la stringa è vuota, la lascia immutata
altrimenti, toglie il primo carattere dall'inizio della stringa e lo aggiunge in coda


Per esempio, "pippo".rotr() ha come valore "ippop".
 */

String.prototype.rotr = function (){
    let res = this
    if(this != ""){    
        s = this[0] // get primo carattere
         
        res = this.slice(1,this.length) + s // aggiungo in coda
    }
    return res
}


console.log("pippo".rotr());