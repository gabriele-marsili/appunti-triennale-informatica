/*
Esercizio 1.

Si definisca una funzione media(arr, a, b) che dato un array arr di n elementi 
ritorni la media sull'intervallo [a, b] se a<=b<n, altrimenti ritorni undefined.
*/

function media(arr, a, b) {
    if (a <= b && b < n) {
        let sum = 0;
        for (let i = a; i <= b; i++) {
            sum = sum + arr[i]; // somma 
        }
        return sum / (b - a + 1) // media 
    } else return undefined
}



/*
Esercizio 2.

Si definisca una funzione replace_first(arr, target, replacement, max_rep) 
che dato un array arr ritorni un array in cui le prime max_rep occorrenze di target 
sono sostituite dall'elemento replacement. Se max_rep = -1 la funzione sostituisce tutte le occorrenze.

La funzione deve ritornare un nuovo array e non modificare quello passato come argomento.
*/

function replace_first(arr, target, replacement, max_rep) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == target && (max_rep == -1 || max_rep > 0)) {
            if (max_rep != -1) max_rep-- // decremento 
                res.push(replacement)
        } else {
            res.push(arr[i])
        }
    }

    return res
}

/*
Esercizio 3.

Dato un array x di n elementi, ed una finestra di dimensione w, 
l'operatore di somma convoluzionale restituisce un array di m elementi il cui i-esimo elemento assume valore

C_i = sum_{j=max(0,i-w)}^{min(n-1,i+w)} x_j

Si scriva una funzione convoluzione(arr, window_size) che ritorni la 
somma convoluzionale dell'array arr con una finestra di dimensione window_size.

Nota: Sfruttare le funzioni di libreria Math.min e Math.max.
*/

function convoluzione(arr, window_size) { // arr ha n elementi  / window_size = w (number)
    res = []
    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        let start = Math.max(0, i - window_size)
        let end = Math.min(arr.length - 1, i + window_size);
        for (let j = start; j < end; j++) {
            sum += arr[j]
        }
        res.push(sum)
    }
    return res

}


/*
Esercizio 4.

Si scriva una funzione map_senior(db) che, dato un array immutabile (ovvero, l'array non deve essere modificato) 
contenente oggetti persona con chiavi nome ed eta, restituisca lo stesso array dove a tutti gli oggetti 
viene aggiunta una chiave maggiorenne con valore booleano che dica se l'età della persona è >=18.
*/

function map_senior(db) {
    res = []
    for (obj of db) {
        let key = (obj.eta >= 18)
        let ogg = {
            "nome": obj.nome,
            "eta": obj.eta,
            "maggiorene": key
        }
        res.push(ogg)
    }
    return res
}

/*
Esercizio 5.

Sia dato l'oggetto veicolo con chiavi tipo e altezza con valori, rispettivamente, 
stringa e float (e.g., {'tipo': tir, 'altezza': 3.2}). 
Si scriva una funzione tunnel(convoy, max_height) che, 
dato un array di veicoli convoy e un 
altezza massima max_height, restituisca un array contenente tutti i veicoli con altezza minore di max_height.

In caso di array vuoto o indefinito, si restituisca un array vuoto.

Bonus: se l'array convoy è definito, si modifichi in-place.
*/

function tunnel(convoy, max_height) { // convoy = array di veicoli 
    if (convoy == null || convoy == undefined || convoy.length == 0) return [];
    else {
        for (let i = 0; i < convoy.length; i++) {
            if (convoy[i].altezza >= max_height) {
                convoy.splice(i, 1); // elimino il veicolo con altezza >= max_height
            }
        }
        return convoy
    }



}


/*
Esercizio 6.

Scrivere una funzione JS applicaF(p, d), con p e d due funzioni. 
applicaF(p, d) restituisce una funzione che, preso un array a, 
restituisce un nuovo array dove gli elementi di indice pari contengono 
il risultato dell'applicazione di p all'elemento di a in quella posizione, mentre gli elementi di indice
*/

function applicaF(p, d) {
    function f(a) {
        res = []
        for (let i = 0; i < a.length; i++) {
            if (i % 2 == 0) res.push(p(a[i]))
            else res.push(d(a[i]));
        }
        return res
    }

    return f;
}