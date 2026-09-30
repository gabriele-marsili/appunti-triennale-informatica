/*
Si scriva una funzione frequenzaC(s) che, preso come parametro una stringa , 
restituisca un dizionario (oggetto) le cui chiavi sono i caratteri contenuti in s
e i cui valori il numero di volte che quel carattere compare nella stringa 
(anche il carattere spazio va considerato).



Esempi:

frequenzaC("i vitelli dei romani sono belli") restituisce {i: 6,' ': 5,v: 1,t: 1,e: 3,l: 4,d: 1,r: 1,o: 3,m:1,a: 1,n: 2,s: 1,b: 1}

frequenzaC("La forzA sia con te!") restituisce {L: 1,a: 2,' ': 4,f: 1,o: 2,r: 1,z: 1,A: 1,s: 1,i:1,c: 1,n: 1,t: 1,e: 1,'!': 1}
*/

function frequenzaC(s){
    let res = {};
    let ar_s = s.split("")
    for(let el of ar_s){
        if(!(el in res)){
            res[el] = 0
        }
        res[el] ++
    }
    return res
}

console.log(frequenzaC("i vitelli dei romani sono belli"))