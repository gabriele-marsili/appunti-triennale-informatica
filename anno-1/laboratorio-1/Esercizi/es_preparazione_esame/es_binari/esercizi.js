//https://replit.com/@731AA2223LABIB/Lezione-11-Rappresentazione-binaria-GABRIELEMARSILI#index.js

// Funzione che stampa le cifre di un numero (rappresentato in base 10) in altra base "b"
var tab = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]

function converti(n, B) {
    let resto
    let s = "-" + B
    while (n > 0) {
        resto = n % B
        s = tab[resto] + s
        n = (n - resto) / B
    }
    console.log(s)
}

//Funzione che trasforma da una base all’altra
function trasf(n, b1, b2) {
    let n1 = parseInt(n, b1)
    return n1.toString(b2)
}

/*Funzione che prende un numero naturale in base 10 e restituisce le cifre in base 2 */

function cambia_in_base2(num) {
    let res = ""
    let ar_res = []
    while (num >= 1) {
        let resto = num % 2
        ar_res.unshift(String(resto))
        num = Math.floor(num / 2)
    }
    for (let i = 0; i < ar_res.length; i++) {
        res += ar_res[i]
    }
    return res
}

//console.log(cambia_in_base2(154))

function cambia_in_base_10(str) { // str = numero in base 2 formato da stringhe
    let num = [...str]
    console.log(num)

    let res = 0
    for (let i = num.length - 1; i >= 0; i--) {
        let p = (num.length - 1) - i
            //console.log(p)
        res = res + (Math.pow(2, p) * num[i]);
    }
    return res
}



function complemento_a_2(num) { // num in base 10
    num = cambia_in_base2(num) // trasforomo num in complemento a 2
    num = [...num] // destrutturo num in array contenente cifre (in string)
        //console.log(num)
        //inverto 0 e 1 
    for (let i = 0; i < num.length; i++) {
        if (num[i] === "1") num[i] = 0
        else num[i] = 1
    }

    //sommo 1
    for (let i = num.length - 1; i >= 0; i--) {
        if (num[i] === 1) num[1] = 0
        else {
            num[i] = 1 // 0+1
            break
        }
    }

    let res = ""
    for (let i = 0; i < num.length; i++) {
        res += String(num[i])
    }

    return res

}

//console.log(complemento_a_2(154))
//console.log(cambia_in_base2(154))
//console.log(cambia_in_base_10(cambia_in_base2(154)))
// 10011010 => 2 +


// Dati due interi a e b, rimuovere da a i bit settati a 1 in b 
class lengthError extends Error {}

function remove(a, b) {
    a_base_2 = [...cambia_in_base2(a)];
    b_base_2 = [...cambia_in_base2(b)];
    if (a_base_2.length != b_base_2.length) throw new lengthError("incongruent length")
    for (let i = 0; i < a_base_2.length; i++) {
        if (b_base_2[i] === "1") a_base_2.splice(i, 1)
    }

    return a_base_2
}

//Contare i bit settati a 1 in un numero a
function cout(a) {
    a_base_2 = [...cambia_in_base2(a)];
    let c = 0;
    for (let i = 0; i < a_base_2.length; i++) {
        if (a_base_2[i] === "1") c++
    }
    return c;
}



// Programma che legge una bitmap 8×8 e restituisce un array di 8 interi a 8 bit che la codifica


//Funzione che stampa la rappresentazione in complemento a 2 per un numero intero ~
function complemento2(n) {
    return ~a + 1
}

//Scambiare i valori di due variabili a e b utilizzando lo XOR
a = { v: 1 }
b = { v: 2 }

function scambia(a, b) {
    a.v = a.v ^ b.v //-> mette in a l'equivalente di a+b
    b.v = a.v ^ b.v //mette a in b ((a+b) - b)
    a.v = a.v ^ b.v
}

//Ricerca lineare - funzione che cerca un elemento in un array e restituisce la sua posizione
function riclin(a, el) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] == el) return i
    }
    return undefined
}

//Ricerca binaria - funzione che cerca un elemento in un array ordinato e restituisce la sua posizione
function cercaB(a, el) {
    let b = 0
    let e = a.length - 1
    let mid
    while (b = !e) {
        mid = Math.floor((e + b) / 2)
        if (el == a[mid]) return mid
        if (el < a[mid]) e = mid - 1
        else b = mid + 1
    }
    if (a[b] == el) return b
}