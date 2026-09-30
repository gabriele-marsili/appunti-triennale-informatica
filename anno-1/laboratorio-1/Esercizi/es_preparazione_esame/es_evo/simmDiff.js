/*
La differenza simmetrica fra due insiemi a e b è l’insieme c
che contiene gli elementi presenti solo in uno dei due (o in altre parole che non sono presenti nell’insieme 
unione di a con b ).  Si implementi una funzione simmdiff(a,b) che, dati due insiemi a e b,
restituisca l’insieme risultato della differenza simmetrica tra a e b, 
nel quale il valore massimo viene raddoppiato.



ESEMPIO

a = {0:1, 4:1, 5:1, 9:1, 10:1, 544:1}

b = {0:1, 9:1, 22:1, 544:1}

simmdiff(a,b) -> {4:1, 5:1, 10:1, 44:1}


*/

function simmdiff(a,b){
    res = {}
    
    for(let el in a ){
        if(!(el in b)){
            res[el] = 1;
        }
    }
    for(let el in b ){
        if(!(el in a)){
            res[el] = 1;
        }
    }
    let val = []
    for(let el in res){
        val.push(el)
    }
    
    res[Math.max(...val)] = 2
    
    return res
}

let a = {0:1, 4:1, 5:1, 9:1, 10:1, 544:1}
let b = {0:1, 9:1, 22:1, 544:1}

console.log(simmdiff(a,b))