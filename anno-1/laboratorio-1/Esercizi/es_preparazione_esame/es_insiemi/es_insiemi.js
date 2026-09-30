//ESERCIZIO 2 - Funzione che inserisce un elemento in un insieme
function insert(insieme, elemento) {
    insieme.elemento = true;
    return insieme
}

//ESERCIZIO 3 - Funzione che elimina un elemento dall'insieme
function delete_el(insieme, elemento) {
    delete insieme.elemento;
    return insieme
}

//ESERCIZIO 4 - Funzione che prende come parametri due insiemi a e b, e controlla se l'insieme a è sottoinsieme di b
var check_sottoinsieme = (a, b) => {
    for (property in a) {
        if (!(property in b)) return false;
    }
    return true;
}


//ESERCIZIO 5 - Funzione che controlla se due insiemi sono identici

var check_equal = (a, b) => {
    return check_sottoinsieme(a, b) && check_sottoinsieme(b, a);
}

//ESERCIZIO 6 - Funzione che restituisce l'intersezione di 2 insiemi

function intersezione(a, b) {
    var res = {}
    for (property in a) {
        if (property in b) res.property = true;
    }
    return res
}

//ESERCIZIO 7 - Funzione che restituisce l'unione di 2 insiemi
function unione(a, b) {
    var res = a
    for (property in b) {
        if (!(property in a)) res.property = true;
    }
    return res
}


//ESERCIZIO 8 - Similarità di Jaccard J(A,B) = |A ^ B| / | A U B |
var Jaccard = (a, b) => {

    function counter_el(ins) {
        let c = 0;
        for (property in ins) {
            c++
        }
        return c;
    }

    return (counter_el(intersezione(a, b)) / counter_el(unione(a, b))) * 100 + " %";

}


// Multi-insiemi (a.k.a. insiemi con cardinalità degli elementi)
//-> Inserimento multiset (++)
// Unione -> Max cardinalità elemento tra i 2 insiemi
// Intersezione -> Min cardinalità elemento tra i 2 insiemi

function unione_multiset(a, b) {
    var res = a
    for (property in b) {
        if (!(property in a)) res.property = b.property;
        else { // => property in a
            res.property = a.property >= b.property ? a.property : b.property
        }
    }
    return res
}

function intersezione_multiset(a, b) {
    var res = {}
    for (property in a) {
        if (property in b) {
            res.property = a.property <= b.property ? a.property : b.property
        }
    }
    return res
}

// ESERCIZIO 9 - Jaccard per multi-insiemi

function Jaccard_multi_insiemi(a, b) {
    function counter_el_j(ins) {
        let c = 0;
        for (property in ins) {
            c++
        }
        return c;
    }

    return (counter_el_j(intersezione_multiset(a, b)) / counter_el_j(unione_multiset(a, b)) * 100 + " %");
}


// ESERCIZIO 10 - Funzione che prende due stringhe che rappresentano un testo (parole separate da spazi) 
//come parametro e restituisce la similarità dei due testi, calcolata come Jaccard tra i rispettivi multi-insiemi

var text_similarity = (str1, str2) => {
    ar1 = str1.split(' ')
    ar2 = str2.split(' ')

    var ins_t_1 = {};
    var ins_t_2 = {};

    function riempi(ins, arr) {
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
            if (arr[i] in ins) {
                ins[arr[i]]++
            } else ins[arr[i]] = 1;
        }
    }

    riempi(ins_t_1, ar1)
    riempi(ins_t_2, ar2)

    console.log(ins_t_1, ins_t_2)

    return Jaccard_multi_insiemi(ins_t_1, ins_t_2)
}
var txt1 = "ciao ciao ciao mi mi annoio"
var txt2 = "ciao ho sonno mi mi annoio annoio"

console.log(text_similarity(txt1, txt2))