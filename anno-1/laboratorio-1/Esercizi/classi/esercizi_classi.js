// esercitazione in classe 2/2/2023


/* ES 1
Implementare la classe sotto definita che realizza una struttura dati coda di dimensione massima definita. 

Gli oggetti di tipo CodaLimitata devono prevedere una chiave "arr" che corrisponde all'array utilizzato 
per implementare la coda e una chiave "max" che rappresenta la dimensione massima della coda. 

Il costruttore prende un unico parametro che definisce la dimensione massima della coda 
(e deve ovviamente inizializzare tutte le chiavi).

La classe implementa i metodi
enqueue(item) -> inserisce l'elemento item nella coda. Se raggiunta la dimensione massima, si fa spazio al nuovo elemento in accordo con la politica di priorità della coda
dequeue() -> estrae dalla testa (eliminando l'elemento dalla coda)
peek() -> restituisce l'elemento in testa senza estrazione
len()-> restituisce il numero di elementi nella coda
*/





class CodaLimitata { // 2 attributi => 
    constructor(max_dimension) { // costruisce oggetto 
        this.arr = [];
        this.max = max_dimension // => imposta le proprietà dell'oggetto
    }


    //metodi della classe: 
    enqueue(item) { // -> inserisce l'elemento item nella coda. Se raggiunta la dimensione massima, si fa spazio al nuovo elemento in accordo con la politica di priorità della coda (estraggo dalla testa ed inserisco in coda)
        if (this.arr.length == this.max) { // => raggiunta la dimensione massima aggiungendo nuovo elemento            
            this.arr.shift(); // estraggo dalla testa        
        }
        this.arr.push(item) // inserisco in coda 

    }


    dequeue() {
        if (this.arr.length == 0) return undefined;
        else this.arr.shift() //  -> estrae dalla coda -> sposto tutti gli elementi davanti e tolgo il primo
    }


    peek() { // = guardare 
        if (this.arr.length == 0) return undefined;
        return this.arr[0] // -> restituisce l'elemento in testa senza estrazione
    }
    len() {
        return this.arr.length;
        // -> restituisce il numero di elementi nella coda    
    }
}
/* 
var test = new CodaLimitata(5)

test.enqueue(0) // 3 4 5 6 7
test.enqueue(1) // 3 4 5 6 7
test.enqueue(2) // 3 4 5 6 7
test.enqueue(3) // 3 4 5 6 7
test.enqueue(4) // 3 4 5 6 7
test.enqueue(5) // 3 4 5 6 7
test.enqueue(6) // 3 4 5 6 7
test.enqueue(7) // 3 4 5 6 7

console.log(test.arr) // =>  3 4 5 6 7 

test.dequeue()
console.log(test.arr) // =>   4 5 6 7 


//test.peek()
console.log(test.peek()) // => 4 

//test.len()
console.log(test.len()) // =>  4
*/



/* ES 2
Implementare la classe sotto definita che realizza oggetti di tipo polinomio. 

Gli oggetti di questo tipo devono prevedere una chiave "coef" 
che è un array contenente di coefficienti del polinomio, 
con il grado più alto in coda all'array, es. [1,0,3] => 3x^2 + 1. 

La classe definisce anche una chiave "degree" che 
memorizza il grado del polinomio. 

Si dia un'implementazione per il costruttore (che prende come argomento l'array 
dei coefficienti con cui inizializzare l'oggetto) 
e per i metodi sotto elencati:


 print() -> Scrive il polinomio in HTML (usando la funzione console.poly)
 toString() -> Stampa a console i coefficienti
 eval(x) -> Valuta il polinomio con i valori di x forniti in input
 sum(p) -> Restituisce un nuovo polinomio risultante dalla somma dell'oggetto con il polinomio p passato come argomento
 trim() -> Ripulisce l'array dei coefficienti da eventuali 0 presenti in coda all'array: es. [1,2,3,0] non è un polinomio di terzo 
 grado ma di secondo, perchè l'ultimo coefficiente è 0. Quindi l'array dei coefficienti va semplificato a [1,2,3].
 derivative() -> Restituisce un nuovo polinomio corrispondente alla derivata del poliniomio oggetto.
*/



class poliniomio {
    constructor(coef) { // => chiave "coef" che è un array contenente di coefficienti del polinomio,
        this.coef = coef;
        this.coef.trim();
        this.degree = coef.length - 1; // => chiave "degree" che memorizza il grado del polinomio. 
    }


    print() { //  -> Scrive il polinomio in HTML (usando la funzione console.poly)
        if (this.coef.length > 0) poly(this.coef)
        else return "Error"
    }

    toString() { // -> Stampa a console i coefficienti
        if (this.coef.length > 0) {
            console.log("\nCoefficienti del polinomio:\n")
            for (var i = 0; i < this.coef.length; i++) {
                console.log(`${this.coef[i]}`)
            }
        } else return "Error"

    }

    eval(x) { //  -> Valuta il polinomio con il valore di x fornito in input 
        var res = 0
        if (this.coef.length > 0) {
            for (var i = 0; i < this.coef.length; i++) {
                if (i == 0) res = res + this.coef[i]; // => incrementa res con coeff singolo (che non moltiplica x)
                else {
                    var val_x = 1 // => valore neutro moltiplicazione  
                    for (var j = 0; j <= i; j++) {
                        val_x = val_x * x
                    } // => in val_x alla fine avrò il valore dell'x data in impur elevata al proprio grado 
                    res = res + val_x * this.coef[i] // => incremento res con il valore di x elevata al proprio grado * il suo corrispettivo coeff
                }
            }
            return res
        } else return "Error"

    }

    sum(p) { //-> Restituisce un nuovo polinomio risultante dalla somma dell'oggetto con il polinomio p passato come argomento (dove p è un array di coeff)
        let new_p_coeff = []
        let grade_difference = Math.abs(this.degree - p.degree) // => differenza di grado tra i due polinomi 
        let p_with_minor_grade = p.length >= this.coef.length ? this.coef : p // => inserisce nella variabile inizializzata il polinomio con grado minore (con accesso diretto alla locazioe di memoria di tale array)

        let p_with_major_grade = p == p_with_minor_grade ? this.coef : p //=> restituisce il polinomio con grado maggiore tra i due (con accesso diretto alla locazioe di memoria di tale array)

        if (this.coef.length > 0 && p.length > 0) {
            for (var i = 0; i < p_with_minor_grade.length; i++) {
                new_p_coeff.push(p[i] + this.coef[i]); // => in new coeff viene inserita la somma tra i coeff dei polinomi da sommare 
            }
        } else return "Error"


        if (grade_difference != 0) { // => un polinomio ha grado maggiore dell'altro
            for (var i = p_with_minor_grade.length; i < grade_difference; i++) { // => for utilizzato per aggiungere in new_p_coeff i coefficienti mancanti (quelli del polinomio con grado maggiore - a cui non viene sommato nulla)
                new_p_coeff.push(p_with_major_grade[i]);
            }
        }

        console.log(new poliniomio(new_p_coeff))
        return new poliniomio(new_p_coeff)

    }

    trim() { // -> Ripulisce l'array dei coefficienti da eventuali 0 presenti in coda all'array: es. [1,2,3,0] non è un polinomio di terzo 
        if (this.coef.length > 0) {
            for (var i = this.coef.length - 1; i >= 0; i--) {
                if (this.coef[i] == 0) this.coef.pop() // elimino l'ultimo elemento
                else break // => se l'ultimo elemnto non è uno 0 non ho motivo di controllare gli altri elementi e posso "stoppare " la funzione 
            }
            return new poliniomio(this.coef)
        } else return "Error"


    }

    derivative() { // -> Restituisce un nuovo polinomio corrispondente alla derivata del poliniomio oggetto.
        if (this.coef.length > 0) {
            let coeff_deriv = []
            for (var i = 0; i < this.coef.length; i++) {
                if (i == 0) continue // la derivata di una costante è 0 e non deve esser inserita nell'array dei coeff
                else {
                    coeff_deriv.push(this.coef[i] * i)
                }
            }
            console.log(coeff_deriv)
            console.log(new poliniomio(coeff_deriv))
            return new poliniomio(coeff_deriv)
        } else return "Error"
    }
}

var test_polinomio = new poliniomio([1, 2, 3, 4]) // => 4x^3 + 3x^2 + 2x^1 + 1
    // console.log(test_polinomio) // ✅
    // test_polinomio.toString() // ✅
    // test_polinomio.eval(2) // ✅
    // test_polinomio.sum([1, 2, 3]) // ✅
    // console.log(test_polinomio.trim()) // ✅
    // test_polinomio.derivative() // ✅  => 12x^2 + 6x^1 + 2 + 0 => [2,6,12]