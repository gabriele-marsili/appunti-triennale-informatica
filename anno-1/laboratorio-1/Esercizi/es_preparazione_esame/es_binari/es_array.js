/*
Si scriva una funzione foo(a) che, dato un array di numeri a, restituisca un altro array contenente due elementi: 
il primo elemento contiene la media aritmetica dei numeri pari in a
il secondo elemento contiene la media aritmetica dei numeri dispari in a
 */
function foo(a) {
    let p_d = (num) => { return num % 2 === 0 }
    let c_p = 0;
    let c_d = 0;
    let sum_p = 0;
    let sum_d = 0;
    for (let i = 0; i < a.length; i++) {
        if (p_d(a[i])) {
            c_p++;
            sum_p += a[i]
        } else {
            c_d++;
            sum_d += a[i];
        }
    }
    return [sum_p / c_p, sum_d / c_d];

}

//console.log(foo([-21, 30, 2, 99, 101, 101, 2, 76, 22, 1349])) // [26.4,325.8]
//console.log(foo([0, 0, 12, -66, 9])) // [-13.5,9]


/*
Scrivere una funzione elimina(a,s) che, dati in input un array a di numeri e un numero s, 
modifica a eliminando gli elementi in fondo ad a fino a che la somma degli elementi eliminati non supera s. 
Con il termine "in fondo" ci si riferisce al fatto che gli elementi vanno cancellati a 
partire dall'ultimo elemento dell'array, procedendo a ritroso. 
La funzione elimina(a,s) restituisce poi l'array a modificato.
*/

var elimina = (a, s) => {
    let sum = 0;
    //let i = a.length -1;
    while (sum <= s) {
        sum += a.pop();
    }

    return a
}

//console.log(elimina([6, 20, 3, 5], 10)) // [6]
//console.log(elimina([10, 20, 30, 40, 50], 10)) // [10,20,30,40]


/*
Si scriva una funzione azzera(a,p) che prende in input un array a di stringhe e una funzione p.
La funzione p implementa un predicato, prendendo in input una stringa e restituendo true o false. 
L'invocazione di azzera(a,p) sostituisce ogni elemento in a per cui p(a)==true con la stringa "". */

var azzera = (a, p) => {
    for (let i = 0; i < a.length; i++) {
        if (p(a[i])) a[i] = "";
    }
    return a
}

//console.log(azzera(["pippo", "pluto", "paperino"], (s) => (s == "pippo"))) //["","pluto","paperino"]
//console.log(azzera(["b", "abab", "ab", "a"], (s) => (s.length > 1))) // ["b","","","a"]

/*
Scrivere una funzione calcola(a) che, dato un array di punti sul piano cartesiano 
(ciascuno del tipo { x: valX, y: valY }), determina il centroide di tali punti, ovvero il 
punto le cui coordinate sono date dalla media aritmetica delle coordinate di tutti i punti nell'array. 
(Se a è vuoto, restituisce il punto con coordinate 0,0)*/


var calcola = (a) => {
    if (a.length === 0) return { x: 0, y: 0 };
    else {
        let sum_x = 0;
        let sum_y = 0;
        let c = 0
        for (let point of a) {
            sum_x += point.x
            sum_y += point.y
            c++;
        }

        return {
            x: sum_x / c,
            y: sum_y / c
        }


    }
}

//console.log(calcola([{ x: 2, y: 3 }, { x: 3, y: 4 }, { x: 7, y: 5 }])) // {x:4,y:4}
//console.log(calcola([{ x: 10.5, y: 6 }, { x: 20.5, y: -6 }])) // {x:15.5,y:0}

/*Scrivere una funzione sposta(p) che prende in input 
un oggetto p che rappresenta un punto del piano cartesiano, 
ovvero del tipo {x: valX, y: valY }. La funzione sposta(p) 
restituisce una funzione che prende due numeri n e m e restituisce il punto 
p con coordinate aggiornate sommando n sull'asse x e m sull'asse y.
*/

var sposta = (p) => {
    var f = (n, m) => {
        p = {
            x: p.x + n,
            y: p.y + m,
        }
        return p
    }
    return f
}

var p = { x: 4, y: 7 }
    //console.log(sposta(p)(2, 1)) // {x:6,y:8}
var q = { x: 4, y: 7 }
    //console.log(sposta(q)(10, 20)) // {x:14,y:27}


/*
Si scriva un programma che, letto da tastiera un numero n>0, 
stampi sulla  console un albero di Natale, disegnato con asterischi, 
composto da n righe  centrate di asterischi che formino un triangolo, 
come nell’esempio sottostante  (che rappresenta l’output atteso per il caso n=6) 
*/

var print_ast = (n) => {
    let mess = "*"
    let space_n = n - 1

    for (let i = 0; i <= n; i++) { // colonne
        let space_r = ""
        if (i === n) space_r = ""
        else {
            for (let j = 0; j <= space_n; j++) {
                space_r = space_r + " "
            }
        }

        res = space_r + mess
        console.log(res)
        mess = mess + "**"
        space_n--
    }
}
print_ast(6)

/**
Si scriva una funzione mid(a) che, ricevuto come argomento un array di  interi a, 
restituisca un oggetto { idx: i, val: m, avg: r } in cui: 
r è la media dei valori contenuti in a 
m è l’elemento di a di valore più vicino ad r 
i è l’indice di un elemento di a con valore m 
 
 */


var mid = (a) => { // da controllare
    sum = 0
    c = 0
    for (let k = 0; k < a.length; k++) {
        sum += a[k]
        c++;
    }
    let r = sum / c
    let difference = +Infinity
    let m = undefined
    for (let k = 0; k < a.length; k++) {
        if (Math.abs(r - a[k]) < difference) {
            difference = Math.abs(r - a[k])
            m = a[k]
        }
    }

    let i = a.indexOf(m)
    return { idx: i, val: m, avg: r }
}


/*
 Si scriva una funzione ruota(a) che, ricevuto come argomento un array a  
 (con elementi di qualunque tipo), restituisca un array b identico ad a, tranne  
 per il fatto che l’ultimo elemento di a diventa il primo di b, e tutti gli altri sono  spostati di una posizione. 
 
 Esempio: ruota( [ “Qui”, “Quo”, “Qua” ] ) = [ “Qua”, “Qui”, “Quo” ] 
 */

var ruota = (a) => {
    let b = [a[a.length - 1]];
    for (let i = 0; i < a.length - 1; i++) {
        b.push(a[i]) //
    }
    return b;
}
console.log(ruota(["“Qui”", "“Quo”", "“Qua”"])) // => [ “Qua”, “Qui”, “Quo” ]