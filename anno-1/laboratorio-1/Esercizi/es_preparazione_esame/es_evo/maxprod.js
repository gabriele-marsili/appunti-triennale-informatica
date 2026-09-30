/*

Si scriva una funzione maxprod(a)
che, dato un array di numeri naturali a, restituisca un oggetto con struttura
{idx: i, val:n } 
in cui i sia l’indice e n il valore dell’elemento in a
per cui è massimo il prodotto dell’indice per il valore dell’elemento. In caso di parità, si scelga 
l’elemento di indice minore.

Esempi

maxprod([8, 2, 2, 1]) restituisce {idx: 2, val: 2}

maxprod([1, 8, 1, 2, 2]) restituisce {idx: 1, val: 8}
*/


function maxprod(a){
    res = {}
    let max_prod = -Infinity;

    for(let i = 0; i < a.length;i++){
        if(a[i]*i > max_prod){
            max_prod = a[i]*i;
            res.idx = i;
            res.val = a[i];
        }
    }

    return res;
}


console.log(maxprod([8, 2, 2, 1])) // {idx: 2, val: 2}

console.log(maxprod([1, 8, 1, 2, 2])) // {idx: 1, val: 8}