/*
Si scriva una funzione raggruppa_nascita(persone) che dato un array di oggetti con 
chiavi nome, annonascita, e luogonascita, restituisca un oggetto che ha come chiavi 
i diversi anni di nascita e come valori degli array che raggruppino i rispettivi oggetti.

NOTA: L'ordine degli oggetti negli array deve preservare l'ordine dell'array persone.
*/
function raggruppa_nascita(persone){
    let res = {}
    for(let p of persone){
        if(!(p.annonascita in res)){
            res[p.annonascita] = [p]
        }
        else{
            res[p.annonascita].push(p)
        }
    }
    return res
}

var persone_arr = [
    {'nome': 'Leonardo da Vinci', 'annonascita': 1452, 'luogonascita': 'Vinci'},
    {'nome': 'Pietro del Donzello', 'annonascita': 1452, 'luogonascita': 'Firenze'},
    {'nome': 'Davide Ghirlandaio', 'annonascita': 1452, 'luogonascita': 'Firenze'},
    {'nome': 'Leonardo Fibonacci', 'annonascita': 1170, 'luogonascita': 'Pisa'}
]


console.log(raggruppa_nascita(persone_arr))