//esercizi su classi: 

// aggiungere math rational alla classe math

Math.rational = function(x) {
    let numeratore = x
    let denominatore = 1
    let res = []
    if (typeof x != 'number') return undefined;
    else {
        while (!Number.isInteger(numeratore)) { // => verifico che numeratore sia decimale 
            numeratore += numeratore // => aumento numeratore
            denominatore++; // => incremento il denominatore

        }
        res[0] = numeratore;
        res[1] = denominatore;
    }

    return res;
}


/*

Math.rational = function(x) {
    let numeratore = x
    let denominatore = 1
    let res = []
    if (typeof x != 'number') return undefined;
    
    else {
        if (!Number.isInteger(numeratore)) { // => verifico che numeratore sia decimale 
            
            let stringa = String(numeratore)
            // => trasformo in stringa, e trasformo la stringa in array 
            // => ottengo numero cifre dopo la virgola cercano l'indice della virgola e facendo arr.length - (indice_virgola+1)
            // moltiplico numeratore per 10^ numero cifre post virgola 
            // scorrendo array numerioco divido il numeratore per le cifre fino a quando ho % != 0, poi passo cifra 
            // ...
        }
        res[0] = numeratore;
        res[1] = denominatore;
    }

    return res;
}
*/



//MultiSet (replit)

class NoSuchElementException {}

class MultiSet {
    constructor() {
        this.multinsieme = []
    }


    //metodi:

    add(e) {
        this.multinsieme.push(e)
    }

    remove(e) {
        if (!this.multiinsieme.includes(e))
            throw new NoSuchElementException(`elemento ${e} non presente nel multiinsieme.`);

        // se ho più occorrenze di e elimino la prima scorrendo in ordine crescente dall'indice 0
        this.multiinsieme.splice(this.multiinsieme.indexOf(e), 1);
    }


    get size() {
        return this.multinsieme.length
    }

    unnion(S) {
        let m = new MultiSet();
        m.multinsieme = new Array([...this.multinsieme]);
        for (let i in S.multinsieme) {
            m.add(S.multinsieme[i]);
        }
        return m;
    }


    diff(S) {
        let a = [...this.multiinsieme]
        let b = [...S.multiinsieme];
        let res = [];

        for (let i in a) {
            if (b.includes(a[i]))
                b.remove(a[i]);
            //b.splice(b.indexOf(a[i], 1)); // levo una occorrenza dell'elem a[i]
            else
                res.push(a[i]);
        }
        return res;
    }
}

/*insieme:
ogg {
    nome_key: quantità    
}

*/



// STUDENTE:

/*
class Studente {
    constructor(numero_matricola, nome, attributi) {


        if (numero_matricola) {
            if (!Number.isInteger(numero_matricola)) {
                throw new Error("inserisci un numero come il numero della matricola!")
            } else this.numero_matricola = numero_matricola;
        } else throw new Error("inserisci il numero della matricola!")


        if (nome) {
            if (typeof(nome) == "string") this.nome = nome;
            else throw new Error("inserisci il nome della matricola come stringa!")
        } else throw new Error("inserisci il nome della matricola!")

        this.attributi = attributi // => oggetto con  attributi nome_attributo : valore

        #carriera = [];
    }

    
    esame = {
        materia : stringa,
        cfu:number,
        voto: number,
        lode: boolean
    }
  


    // metodi:

    passato(esame) {
        this.#carriera.push(esame);
    }

    La media ponderata è data dal rapporto tra la somma di ogni prodotto (voto * CFU) di ogni esame diviso la somma di tutti i CFU attribuiti agli esami. Nel computo della media non devono essere considerati le lodi e gli esami senza voto (convalide). 


    media() { // => media ponderata
        let somma = 0;
        let somma_cfu = 0;
        for (let i = 0; i < this.#carriera.length; i++) {
            let voto = this.#carriera[i].voto
            if (this.#carriera[i].lode) voto = 32;
            somma += voto * this.#carriera[i].cfu;
            somma_cfu += this.#carriera[i].cfu;
        }

        return (somma / somma_cfu)
    }


    libretto() {
        console.log(this.#carriera);
    }
}

class Esame {
    constructor(materia, cfu, voto, lode) {
        this.materia = materia;
        this.cfu = cfu;
        this.voto = voto;
        this.lode = lode;
    }
}



try {
    var pippo = new Studente(1, 'Alessio');
    //var pippo = new Studente(3,'Francesco');
    //var pippo = new Studente();
    //var pippo = new Studente('0001','Pluto');

    var esame1 = new Esame('analisi I', 6, 25, false);
    var esame2 = new Esame('fisica I', 3, 30, false);
    pippo.passato(esame1);
    pippo.passato(esame2);
    pippo.libretto();
    console.log(pippo.media());
} catch (e) {
    console.log(e.message);
}
*/


/*Implementare la classe sotto definita che realizza una struttura dati coda 
di dimensione massima definita. 

Gli oggetti di tipo CodaLimitata devono prevedere una chiave 
"arr" che corrisponde all'array utilizzato per implementare la coda e una chiave 
"max" che rappresenta la dimensione massima della coda.

Il costruttore prende un unico parametro che definisce la dimensione massima della coda 
(e deve ovviamente inizializzare tutte le chiavi).

La classe implementa i metodi
enqueue(item) -> inserisce l'elemento item nella coda. 
Se raggiunta la dimensione massima, 
si fa spazio al nuovo elemento in accordo con la politica di priorità della coda

dequeue() -> estrae dalla coda
peek() -> restituisce l'elemento in testa senza estrazione
len()-> restituisce il numero di elementi nella coda
*/


//CodaLimitata

class CodaLimitata {
    constructor(max) {
        this.arr = [];
        this.max = max;
    }

    //metodi:
    enqueue(item) {
        if (this.arr.length == this.max) {
            this.arr.shift() // => elimino il primo elemento (il primo della coda)
        }

        this.arr.push(item); // => aggiugo nuovo elemento in fondo alla coda 
    }

    dequeue() {
            if (this.arr.length == 0) return undefined
            this.arr.shift()
        } // => estrae dalla coda 

    peek() {
            if (this.arr.length == 0) return undefined
            return this.arr[0]
        } // => restituisce l'elemento in testa (senza estrazione)

    len() { return this.arr.length } //=> restituisce numero elementi in coda

}

/*Implementare la classe sotto definita che realizza oggetti di tipo polinomio.

Gli oggetti di questo tipo devono prevedere una chiave "coef" 
che è un array contenente di coefficienti del polinomio, 
con il grado più alto in coda all'array, 
es. [1,0,3] => 3*x**2 + 1. 

La classe definisce anche una chiave "degree" che memorizza il grado del polinomio. 

Si dia un'implementazione per il costruttore 
(che prende come argomento l'array dei coefficienti con cui inizializzare l'oggetto) 
e per i metodi sotto elencati:

 print() -> Scrive il polinomio in HTML (usando la funzione console.poly)
 toString() -> Stampa a console i coefficienti
 eval(x) -> Valuta il polinomio con i valori di x forniti in input
 sum(p) -> Restituisce un nuovo polinomio risultante dalla somma dell'oggetto con il polinomio p passato come argomento
 trim() -> Ripulisce l'array dei coefficienti da eventuali 0 presenti in coda all'array: es. [1,2,3,0] non è un polinomio di terzo grado ma di secondo, perchè l'ultimo coefficiente è 0. Quindi l'array dei coefficienti va semplificato a [1,2,3].
 derivative() -> Restituisce un nuovo polinomio corrispondente alla derivata del poliniomio oggetto.
*/
class ValueError extends Error {};
class NoValueError extends Error {};

class Polynomial {
    constructor(coeff) {
        this.coeff = [...coeff]; // => coeff = array dei coefficienti del polinomio con il grado più alto in coda all'array
        // es. [1,0,3] => 3*x**2 + 1.  
        this.trim()
        this.degree = this.coeff.length - 1 // =>  chiave che memorizza il grado del polinomio
    }

    //metodi:

    print() {
        console.poly(this.coef);
    }

    toString() {
        let s = poly(this.coef)
        console.log(s)
        return s
    }

    print_2() {
        var string = ""
        for (let i = 0; i <= this.degree; i++) {
            if (i != 0) {
                if (i != this.degree) string = string + (`${this.coeff[i]}x^${i} + `)
                else string = string + (`${this.coeff[i]}x^${i}`)
            } else {
                string = string + (`${this.coeff[i]} + `)
            }
        }
        return string
    }



    eval(x) {
        let val = 0
        for (let i = 0; i < this.coef.length; i++) {
            val += this.coef[i] * (x ** i) // => ** è esponenziale (x^1) (i=0 => x = 1 => corretto)
        }
        return val
    }

    sum(p) {
        var min = this.degree <= p.degree ? this.degree : p.degree // => prendo grado polinomio minore 
        var boolean = this.degree <= p.degree ? true : false // => variabile d'appoggio per capire quale dei due polinomi ha grado più alto
            // boolean =true => p ha grado maggiore 

        var diff = Math.abs(this.degree - p.degree) // => differenza gradi polinomi 
        var coeff_arr = [] // grado più alto in coda


        for (let i = 0; i <= min; i++) {
            coeff_arr.push(this.coeff[i] + p.coeff[i])
        }

        if (diff > 0) { // => uno dei due polinomi ha grado maggiore
            if (boolean) { // => p ha grado maggiore 
                var coeff_scelti = p.coeff // => prendo i coefficienti di p 
            } else var coeff_scelti = this.coeff // => prendo i coefficienti del polinomio 



            for (let j = diff + 1; j < coeff_scelti.length; j++) {
                coeff_arr.push(coeff_scelti[j])
            }
        }

        return new Polynomial(coeff_arr)
    }


    trim() {
        if (this.coeff.length == 0) throw new ValueError("No coefficients\n\nInsert at least one coefficient")
        this.coeff.forEach((coeff) => {
            console.log(coeff)
            console.log(typeof(coeff))
            if (typeof(coeff) != "number") throw new ValueError("The coeffiecients could be only numbers\nPlease, insert only numbers")
        });

        //if (!this.coeff.forEach(isNaN())) throw new ValueError("The coeffiecients could be only numbers\nPlease, insert only numbers")

        //while (this.coeff[this.coeff.length - 1] == 0 && this.coeff.length >0) { // => se ultimo elemento = 0 va tolto
        while (!this.coeff[this.coeff.length - 1]) { // => se ultimo elemento = 0 va tolto
            this.coeff.pop() // => elimino ultimo elemento (=0 )
        }
    }


    derivate() {
        var new_coeff = []

        for (let i = 0; i <= this.degree; i++) {
            if (i != 0) { // => i = 0 => => derivata di num intero = 0 (non la conto)
                new_coeff.push(this.coeff[i] * i)
            }

        }

        return new Polynomial(new_coeff)
            /*
            let c=[...this.coef] // => creo nuovo arr (modificabile) con coefficienti del polinomio
            for (let i=0; i<c.length;i++){
              c[i]*=i; // => moltiplico ogni coeff per i (=> per il corrispondente grado -> NB: in prima posizione del nuovo arr avrò 0, che corrisponde alla derivata di un intero)
            }
            c.shift() // => elimino primo elemento => elimino lo 0 ad inizio array 
            return new Polynomial(c) // creo e ritorno la il polinomio corrispondente alla derivata
            */
    }

}


try {
    var polinomio_p = new Polynomial([9, 2, 3, 0, 0, 0, 0, 0])
    var polinomio_1 = new Polynomial([1, 2, 3, 4, 5])
    var polinomio_2 = new Polynomial([])
} catch (err) {
    console.log(err)
}





var sum = polinomio_1.sum(polinomio_p)
console.log(polinomio_p.print_2())
console.log(polinomio_1.print_2())
console.log(sum.print_2())
var derivata = sum.derivate()
console.log(derivata.print_2())