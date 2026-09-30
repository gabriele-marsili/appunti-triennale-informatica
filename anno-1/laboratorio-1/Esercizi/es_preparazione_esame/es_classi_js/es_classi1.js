/*Implementare la classe sotto definita che realizza una struttura dati coda di dimensione massima definita. 
Gli oggetti di tipo CodaLimitata devono prevedere una chiave "arr" che corrisponde all'array utilizzato 
per implementare la coda e una chiave "max" che rappresenta la dimensione massima della coda. 
Il costruttore prende un unico parametro che definisce la dimensione massima della coda (e deve ovviamente inizializzare tutte le chiavi).

La classe implementa i metodi
enqueue(item) -> inserisce l'elemento item nella coda. Se raggiunta la dimensione massima, 
si fa spazio al nuovo elemento in accordo con la politica di priorità della coda
dequeue() -> estrae dalla coda
peek() -> restituisce l'elemento in testa senza estrazione
len()-> restituisce il numero di elementi nella coda
*/

class CodaLimitata {
    constructor(max) {
        this.arr = [];
        this.max = max;
    }

    enqueue(item) {
        if (this.arr.length + 1 > this.max) {
            this.arr.shift();
        }
        this.arr.push(item);
    }


    dequeue() {
        if (this.arr.length === 0)
            return undefined
        this.arr.shift();
    }

    peek() {
        if (this.arr.length === 0)
            return undefined
        return this.arr[0]
    }

    len() {
        return this.arr.length
    }
}



/*Implementare la classe sotto definita che realizza oggetti di tipo polinomio. Gli oggetti di questo tipo devono prevedere una chiave 
"coef" che è un array contenente di coefficienti del polinomio, con il grado più alto in coda all'array, es. [1,0,3] => 3*x**2 + 1. 
La classe definisce anche una chiave "degree" che memorizza il grado del polinomio. 

Si dia un'implementazione per il costruttore (che prende come argomento l'array dei coefficienti con cui inizializzare l'oggetto) 
e per i metodi sotto elencati:
 print() -> Scrive il polinomio in HTML (usando la funzione console.poly)
 toString() -> Stampa a console i coefficienti
 eval(x) -> Valuta il polinomio con i valori di x forniti in input
 sum(p) -> Restituisce un nuovo polinomio risultante dalla somma dell'oggetto con il polinomio p passato come argomento
 trim() -> Ripulisce l'array dei coefficienti da eventuali 0 presenti in coda all'array: es. [1,2,3,0] non è un polinomio d
 i terzo grado ma di secondo, perchè l'ultimo coefficiente è 0. Quindi l'array dei coefficienti va semplificato a [1,2,3].
 derivative() -> Restituisce un nuovo polinomio corrispondente alla derivata del poliniomio oggetto.
*/

class Polinomio {
    constructor(ar_coeff) {
        this.coef = ar_coeff; // array of coefficients
        this.trim(); // => chiamo trim per sistemare il polinomio 
        this.degree = this.coef.length - 1
    }

    print() {

    }

    toString() {
        let res = [];
        for (let i = 0; i < this.coef.length; i++) {
            //console.log(this.coef[i]);
            res.push(this.coef[i]);
        }
        return res;
    }

    eval(x) {
        let res = 0;
        for (let i = 0; i < this.coef.length; i++) {
            res += this.coef[i] * Math.pow(x, i); // x ^ 0 = 1 
        }
        return res;
    }

    sum(p) {
        let arrCoeff_r = []
        let l = p.coef.length < this.coef.length ? p.coef.length : this.coef.length
        for (let i = 0; i < l; i++) {
            arrCoeff_r.push(p.coef[i] + this.coef[i]) // somma coefficienti 
        }
        if (l != p.coef.length) { // ci sono coeff di p non in ar res 
            for (let i = l; i < p.coef.length; i++) {
                arrCoeff_r.push(p.coef[i])
            }
        }
        if (l != this.coef.length) { // ci sono coeff di this.coef non in ar res 
            for (let i = l; i < this.coef.length; i++) {
                arrCoeff_r.push(this.coef[i])
            }
        }

        return new Polinomio(arrCoeff_r)
    }

    trim() {
        while (this.coef[this.coef.length - 1] === 0) {
            this.coef.pop()
        }
    }

    derivate() {
        let arr_res = [];
        for (let i = 1; i < this.coef.length; i++) {
            arr_res.push(this.coef[i] * i) // coeff * x^a =>  coeff * a * x ^ (a-1)
        }
        return new Polinomio(arr_res)
    }
}

/*  sum(p) -> Restituisce un nuovo polinomio risultante dalla somma dell'oggetto con il polinomio p passato come argomento
 trim() -> Ripulisce l'array dei coefficienti da eventuali 0 presenti in coda all'array: es. [1,2,3,0] non è un polinomio d
 i terzo grado ma di secondo, perchè l'ultimo coefficiente è 0. Quindi l'array dei coefficienti va semplificato a [1,2,3].
 derivative() -> Restituisce un nuovo polinomio corrispondente alla derivata del poliniomio oggetto. */

let poliniomio = new Polinomio([1, 2, 3, 0, 0, 0, 0])
    //console.log(poliniomio.eval(1)) // 1 + 2 + 3 = 6
console.log((poliniomio.sum(new Polinomio([1, 2]))).toString()) // => 
console.log((poliniomio.derivate()).toString()) // d(p) = 2 + 6x