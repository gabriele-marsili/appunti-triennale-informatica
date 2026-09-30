function transf(n, b1, b2) {
    let n1 = parseInt(n, b1) // => restituisce n in base b1
    return n1.toString(b2) // => trasformo n1 (in base b1) nella stringa equivalente in base b2
}

//console.log(parseInt(transf(10, 10, 2), 16))

//complemento a 2:

//function complemento_2


// scambiare i valori di due variabili a e b utilizzando XOR:
// XOR funziona su bit => funziona anche su non numeri => operazioni di somma e sottrazione su bit 
/*
a = a ^ b // => mette in a l'equivalente di a + b
b = a ^ b // = > restituisce a(dalla somma di a +b tolgo b => rimane a ) => METTE A IN B 
a = a ^ b // => variabili scambiate
*/

a = { v: 1 }
b = { v: 3 }

function scambia(a, b) { // => gli oggetti non si passano per copia => non viene creata una copia dell'array associato al paramtro a, ma viene passato direttamente l'array
    // passaggio di oggetti avviene per riferimento ! (altrimenti il passaggio avviene per valore) (le funzioni sono oggetti!)
    a.val = a.val ^ b.val
    a.v = a - v ^ b.v
    b.v = a - v ^ b.v
    b.v = a - v ^ b.v

}


// ricerca lineare  - funzione che cerca un elemento in un array e restituisce la sua posizione

var a = [11, 4, 2, 42, 5, 54, 52]
var el = 42

function riclin(a, el) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] == el) {
            return i;
        }
    }
    return undefined; // => automatico 
}
//console.log(riclin(a, el))


// ricerca binaria (su array ordinato)  - funzione che cerca un elemento in un array ordinato e restituisce la sua posizione


var arr_A = [1, 2, 3, 3, 46, 57, 69, 125];
k = 69

function Binary_search_IT(arr_A, k) {
    let p = 0
    let r = (arr_A.length) - 1
    let t_i = Date.now(); // - > seconds
    if (k < arr_A[p] || k > arr_A[r]) {
        let t_f = Date.now();

        console.log("\nT B.S.  = " + parseInt(t_f - t_i) + " mil.secondi")
        return -1
    };
    do {

        q = parseInt((r + p) / 2);
        //console.log("p = ", p, " r = ", r, " q = ", q);
        if (arr_A[q] == k) {
            let t_f = Date.now();

            console.log("\nT B.S.  = " + parseInt(t_f - t_i) + " mil.secondi");
            return q;
        };
        if (arr_A[q] > k) { r = q - 1 };
        if (arr_A[q] < k) { p = q + 1 };

    }

    while (p <= r)
    let t_f = Date.now();

    console.log("\nT B.S.  = " + parseInt(t_f - t_i) + " mil.secondi");
    return -1;
}
//console.log(Binary_search_IT(arr_A, k))


/*
Si scriva una funzione foo(a) che, dato un array di numeri a, restituisca un altro array contenente due elementi: 
il primo elemento contiene la media aritmetica dei numeri pari in a
il secondo elemento contiene la media aritmetica dei numeri dispari in a
*/
var q_p = 0,
    somma_p = 0,
    media_p = 0
var q_d = 0,
    somma_d = 0,
    media_d = 0
var new_array = [];

function foo(a) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] % 2 == 0) { // => num pari
            somma_p = somma_p + a[i];
            q_p++;
        } else { // => num dispari
            somma_d = somma_d + a[i];
            q_d++;
        };
    };
    media_p = somma_p / q_p;
    media_d = somma_d / q_d;

    new_array.push(media_p, media_d);
    return new_array

}

//console.log(foo(a))



/*
Scrivere una funzione elimina(a,s) che, dati in input un array a di numeri e un numero s,
modifica a eliminando gli elementi in fondo ad a fino a che la somma degli elementi eliminati 
non supera s. 
Con il termine "in fondo" ci si riferisce al fatto che gli elementi vanno cancellati 
a partire dall'ultimo elemento dell'array, procedendo a ritroso. 
La funzione elimina(a,s) restituisce poi l'array a modificato.
*/

var sum = 0

function elimina(a, s) {
    do {
        console.log(sum)
        let last_el = a[a.length - 1];

        a.pop() // => remove the last element

        sum = sum + last_el // => incremento sum di last el 
    } while (sum <= s);
    return a;
}
//console.log(elimina(a, 10))


//ESERCIZIO 1 - Funzione che presa come parametro una stringa, restituisce s al contrario
var s_res = ""

function s_contrario(string) {
    for (let i = string.length - 1; i >= 0; i--) {
        s_res = s_res + string[i]
    }
    return s_res
}
console.log("s res di ciao = " + s_contrario("ciao"))