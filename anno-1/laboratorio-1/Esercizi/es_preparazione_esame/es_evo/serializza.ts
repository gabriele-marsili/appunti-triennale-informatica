/*
Si scriva in TypeScript un generatore serializza(o) che, dato un qualunque oggetto o, 
restituisca una dopo l'altra le proprietà dell'oggetto sotto forma di coppie [chiave, valore]. 

Le proprietà vanno restituite in ordine lessicografico di chiave. 
Si considerino solo le proprietà proprie dell'oggetto, 
ignorando quindi quelle che vengono dalla catena dei prototipi.
*/

function* serializza(o : object){
    let proprietà : [unknown,unknown][] = Object.entries(o)
    proprietà.sort()

    for(let el of proprietà){
        yield el
    }
}