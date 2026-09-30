//INSIEMI
//Che cosa e' un insieme?  => collezione di elementi ->distinti<-  
//Come possiamo rappresentarlo in JS? => oggetto (posso controllare se chiave è in oggetto utilizzando costrutto "in")
//Come differisce dal concetto di "array"? => 


// uso 1 al posto di True 
//var A = { uva: 1, mela: 1, cachi: 1, fichi: 1 } // => dizionari : serve a memorizzare chiavi 

// aggiungere el => es. A["pesca"]
//if ("uva" in A)  => return true


//ESERCIZIO 2 - Funzione che inserisce un elemento in un insieme
function add_el(insieme, elemento) {

    insieme[elemento] = 1
    return insieme
}
//console.log("new insieme  = ", add_el(A, "banane"))

//ESERCIZIO 3 - Funzione che elimina un elemento dall'insieme

function del_el(insieme, elemento) {
    delete insieme[elemento];
    return insieme
}
//console.log("new insieme  = ", del_el(A, "mela"))

//ESERCIZIO 4 - Funzione che prende come parametri due insiemi a e b, e controlla se l'insieme a è sottoinsieme di b
var ins_A = { uva: 3, cachi: 4, fichi: 3 }
var ins_B = { uva: 8, mela: 1, cachi: 1 }

function check_sottoinsieme(a, b) {
    for (let i in a) {
        if (!(i in b)) {
            return "a non è sottoinsieme di b!"
        }
    }
    return "a è sottoinsieme di b!"
}
//console.log(check_sottoinsieme(ins_A, ins_B))


//ESERCIZIO 5 - Funzione che controlla se due insiemi sono identici
function check_uguale(a, b) {
    return check_sottoinsieme(a, b) && check_sottoinsieme(b, a)
}
//console.log(check_uguale(ins_A, ins_B))

//ESERCIZIO 6 - Funzione che restituisce l'intersezione di 2 insiemi
var ins_C = {}

function intersezione(a, b) {
    for (i in a) {
        if (i in b) {
            add_el(ins_C, i)
        }
    }
    return ins_C
}
//console.log("ins A intrsezione ins B = ", intersezione(ins_A, ins_B))



//ESERCIZIO 7 - Funzione che restituisce l'unione di 2 insiemi
function unione(a, b) {
    for (i in a) {
        add_el(ins_C, i)
    }
    for (i in b) {
        if (!(i in a)) {
            add_el(ins_C, i)
        }
    }
    return ins_C
}
//console.log("ins A unione ins B = ", unione(ins_A, ins_B))


//ESERCIZIO 8 - Similarità di Jaccard J(A,B) = |A ^ B| / | A U B |
function card(ins) {
    let x = 0
    for (let e in ins) x++;
    return x
}

function Jaccard(a, b) {

    let c_b = card(b)
    let c_a = card(a)
    let n = c_a
    let un = unione(a, b)
    console.log("unione  = ", un)

    let c_unione = card(un)
    console.log("c_unione  = ", c_unione)


    for (let i = 0; i < c_b; i++) {
        n = n * c_a
    }
    console.log("n  = ", n)

    return n / c_unione

}
//console.log("Jaccard a b  = ", Jaccard(ins_A, ins_B))


// Multi-insiemi (a.k.a. insiemi con cardinalità degli elementi)
//-> Inserimento multiset (++)

function add_el_multiset(insieme, elemento) {
    if (elemento in insieme) insieme[elemento] = insieme[elemento] + 1;
    else insieme[elemento] = 1
    return insieme
}


function del_el_multiset(insieme, elemento) {

    if (elemento in insieme) insieme[elemento] = insieme[elemento] - 1;
    else delete insieme[elemento];
    return insieme
}

// Unione -> Max cardinalità elemento tra i 2 insiemi

function unione_card(a, b, elemento) {
    let c_a = 0
    let c_b = 0
    if (elemento in a) c_a = a[elemento];
    if (elemento in b) c_b = b[elemento];

    if (c_a >= c_b) return c_a;
    else return c_b;

}


//console.log("un card uva tra a e b = ", unione_card(add_el_multiset(ins_A, "uva"), del_el_multiset(ins_B, "uva"), "uva"))

// Intersezione -> Min cardinalità elemento tra i 2 insiemi

function intersezione_card(a, b, elemento) {
    let c_a = 0
    let c_b = 0
    if (elemento in a) c_a = a[elemento];
    if (elemento in b) c_b = b[elemento];

    if (c_a <= c_b) return c_a;
    else return c_b;

}
//console.log("intersez card uva tra a e b = ", intersezione_card(add_el_multiset(ins_A, "uva"), del_el_multiset(ins_B, "uva"), "uva"))

function card_multinsieme(ins) {
    let x = 0
    for (let e in ins) x = x + ins[e];

    return x
}
//console.log("card multinsieme a = ", card_multinsieme(ins_A))
var appoggio = {}

function unione_multinsiemi(a, b) {

    for (i in a) {
        //add_el(appoggio, i)
        //console.log(appoggio)
        appoggio[i] = unione_card(a, b, i)

        console.log(appoggio)
    }
    for (i in b) {
        if (!(i in a)) {
            appoggio[i] = unione_card(a, b, i)
        } else appoggio[i] = unione_card(a, b, i) + intersezione_card(a, b, i)
    }
    return appoggio
}
//console.log("unione multinsieme a con b = ", unione_multinsiemi(ins_A, ins_B))


// ESERCIZIO 9 - Jaccard per multi-insiemi
function Jaccard_multiinsiemi(a, b) {

    let c_b = card_multinsieme(b)
    let c_a = card_multinsieme(a)
    let n = c_a
    let un = unione_multinsiemi(a, b)
    console.log("unione  = ", un)

    let c_unione = card_multinsieme(un)
    console.log("c_unione  = ", c_unione)


    for (let i = 0; i < c_b; i++) {
        n = n * c_a
    }
    console.log("n  = ", n)

    return n / c_unione

}
//console.log("Jaccard_multiinsiemi(ins_A, ins_B) = ", Jaccard_multiinsiemi(ins_A, ins_B))



// ESERCIZIO 10 - Funzione che prende due stringhe che rappresentano un testo 
//(parole separate da spazi)=> split(" ") 
//come parametro e restituisce la similarità dei due testi, 
//calcolata come Jaccard tra i rispettivi multi-insiemi
var testo_1 = {}
var testo_2 = {}

function compara_testi(t1, t2) {
    let arr_t1 = t1.split(" ");
    let arr_t2 = t2.split(" ");

    for (let i = 0; i < arr_t1.length - 1; i++) {
        add_el_multiset(testo_1, arr_t1[i])
    }
    console.log(testo_1) // oggetto con testo 1 diviso in: parola:num ripetizione

    for (let i = 0; i < arr_t2.length - 1; i++) {
        add_el_multiset(testo_2, arr_t2[i])
    }
    console.log(testo_2)

    similarità = Jaccard_multiinsiemi(testo_1, testo_2)
    return similarità

}
tst_1 = "ciao bello bello belo"
tst_2 = "ciao bello bello belo"

console.log("similarità testo 1 con testo 2 = ", compara_testi(tst_1, tst_2))




/*

let A = {'a': true, 'b': true, 'c': true}
let B = {'d': true, 'e': true, 'f': true}
assert.deepEqual(
    prodotto(A, B),
    {'ad':true, 'ae':true, 'af':true, 'bd':true, 'be':true, 'bf':true, 'cd':true, 'ce':true, 'cf': true}
)

*/

let A = { 'a': true, 'b': true, 'c': true }
let B = { 'd': true, 'e': true, 'f': true }




//{'ad':true, 'ae':true, 'af':true, 'bd':true, 'be':true, 'bf':true, 'cd':true, 'ce':true, 'cf': true}


// PRODOTTO DI DUE INSIEMI 
function prodotto(A, B) {

    let insieme_risultante = {}

    function add_el(insieme, elemento) {

        insieme[elemento] = true
        return insieme
    }

    function concatena(el_a, el_b) {
        return String(el_a + el_b)
    }


    if (A == insieme_risultante || B == insieme_risultante || A == undefined || B == undefined) {
        return insieme_risultante
    } else {
        for (i in A) {
            for (j in B) {
                console.log("A[i] = ", i)
                console.log("B[j] = ", j)

                //console.log("concat = ", concat(A[i], B[j]))
                add_el(insieme_risultante, concatena(i, j));
            }
        }
        return insieme_risultante
    }



}

console.log("proddotto A e B :\n\n", prodotto(A, B))