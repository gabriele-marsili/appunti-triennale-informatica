/*
Slide:

• oggetti I -> riferimenti, proprietà, funzioni e metodi (+ uso di this), prototipi : 
https://drive.google.com/file/d/1o4PIYEGLU46eOEcCZYvxa6gOcFlpmhZq/view

•oggetti II -> costruttori e metodi, new, prototipi e catena prototipi:
https://drive.google.com/file/d/1-bmtXAh34fMtqSh1WQWSWbTzQFSfU4P3/view

•classi, oggetti, ereditarietà, membri privati e statici, getter e setter, generatori 
https://drive.google.com/file/d/1JM_v3ieiqMj018VnMt8PspUa4IX7YU_t/view

*/

//superclasse 
class Persona { // costrutto inizializzazione classe 
    constructor(name, età) { // costruttore (con due parametri)
        this.name = name; // attributi 
        this.età = età;
    }
    compleanno() { // metodo ( = proprietà dell'oggetto di tipo funzione )
        this.età++; // riferimento a specifico oggetto creato con new Persona(...) tramite this
    }
}

//sottoclasse => uso di extends
class Studente extends Persona { // estendo la classe Persona con Studente 
    //=> i metodi e gli attributi della classe Persona (superclasse) vengono dati anche alla classe Studente (sottoclasse)

    laurea() { // metodo solo della classe studente
        return `Lo studente ${this.name} è laureato`;
    }
}

var Pippo = new Studente("Pippo", 19); // => creo oggetto stanciato nella classe Persona con new  
Pippo.compleanno(); // incrementa età di Pippo 
// Pippo => {nome:"Pippo",età: 20}
// Pippo.laurea => "Lo studente Pippo è laureato"

// sottoclasse di una sottoclasse (Persona > Studente > StMagistrale)
class StMagistrale extends Studente { // => StMagistrale sottoclasse di Studente 

    laurea() { // Overridding esempio 1
        return `Lo studente ${this.name} ha concluso la magistrale!`;
    }
}
var Mario = new StMagistrale("Mario", 25);
Mario.laurea(); // => `Lo studente Mario ha concluso la magistrale!`;




//Overridding : una sottoclasse ridefinisce un metodo della superclasse
class alieno extends Persona {
    compleanno() { // Overridding esempio 2
        this.età = this.età + 2; // incrementa di 2, non più di 1 
    }
}
var Pluto = new alieno("Pippo", 19);
Pluto.compleanno(); // incrementa età di Pluto di 2 (non di 1)


//SUPER: key word "super" => riferimento alla superclasse di un oggetto (NB: possobile anche super() senza argomenti)
class StMagistrale_migliorata extends Studente {
    constructor(name, età, triennale) {
        super(name, età) // key word "super" => riferimento alla superclasse di un oggetto 
        this.triennale = triennale
    }

    laurea() {
        return super.laurea() + " , evviva galattico!" // => invoco la superclasse Studente con super  
    }
}

//DICHIARAZIONE DI CAMPO
class Persona_non_standardizzata { // => creo attributi senza metodo costruttore, li inizializzo direttamente 
    nome = "Anonimo";
    età = -1;
    congnome; // => undefined
    lavoro = work() // => utile quando il valore di inizializzazione è calcolato chiamando un metodo (anche della superclasse)
        // eccetera 
} // => utile quando il valore di inizializzazione è calcolato chiamando un metodo (anche della superclasse)



//METODI PRIVATI : (utilizzati per mantenere parti di codice privato => parti di classi che non devono esser cambiare da un futuro proprietario del codice)
class C {
    // #privato() { /*codice */ } //=> metodo dell'oggetto che non posso chiamare al di fuori della classe 
    pubblico() { /* qui posso utilizzare this.#privato() */ }
}
var c = new C()
c.pubblico() //=> utilizzabile 
    // c.#privato() //=> NON utilizzabile (=> errore)



//METODI STATICI : (utilizzati -per esempio- per contare istanze di una classe )
class Auto {
    static metodo() { /*codice */ }
}
var Audi = new Auto()
Auto.metodo() // => non si può accedere ad un membro statico tramite istanza
Audi.metodo() // =>  occorre indicare il nome della classe
    // Auto.metodo() non va bene, Audi.metodo() si 

//ancora METODI STATICI: (-> counter occorrenze / numero istanze della classe)
class Liceale extends Studente {
    static quanti = 0 // conta quanti studenti ho creato dalla classe Liceale (numero istanze della classe Liceale)

    // #iscritto = false
    constructor(...args) { // uso dello spread per passare i parametri (args = vettore di parametri)
        super(...args)
        Liceale.quanti++; // ogni volta che invoco la classe Liceale la variabile quanti viene incrementata 
        delete this.laurea() // elimina il metodo laurea che la classe Liceale eredita da Studente
    }

    unipi() { return this.#iscritto }
    static bellaVita() { return true } // metodo statico 
}

var Luca = new Liceale("Luca", 15)
var Anna = new Liceale("Anna", 16)
Liceale.quanti() // => 2 
Luca.unipi() // => false 
    // Luca.#iscritto() // => SyntaxError : Private field '#iscritto' must be declared in an enclosing class
Luca.quanti() // => undefined
    // Luca => Liceale{name: "Luca", età: 15 "}
    //Liceale => [class Liceale extends Studente {quanti:2} ]
Liceale.bellaVita() // => true
Anna.bellaVita() // => TypeError (Anna.bellaVita() is not a function)

//Ereditarietà e tipi:
typeof anna // → “object”
anna instanceof Liceale // → true
anna instanceof Persona // → true
pippo instanceof Studente // → false


// PROTOTIPI:
/*


1)Ogni oggetto ha un prototipo (che è un altro oggetto), tranne il prototipo 
dell’oggetto Object, che non ha prototipo.

2) Quando si vuole leggere il valore di una proprietà di un oggetto, si guarda se
l’oggetto ha la chiave cercata:

a. Se la chiave è presente, il valore è quello della chiave nell’oggetto
b. Se la chiave non è presente, e l’oggetto ha un prototipo, si cerca la proprietà nel prototipo
c. Se la chiave non è presente, e l’oggetto non ha un prototipo, il risultato è undefined

3. Quando si vuole scrivere il valore di una proprietà di un oggetto, la chiave e il
valore vengono inseriti nell’oggetto (eventualmente sovrascrivendo il valore
precedente)


Possiamo scoprire chi è il prototipo di un
oggetto o accedendo alla sua proprietà
“speciale” o.__proto__ (scritta con due _
prefissi e due suffissi), oppure invocando
Object.getPrototypeOf(o)

*/

var Prototipo_Pluto = Pluto.__proto__ // = Object.getPrototypeOf(Pluto)

/*
Notate che l’enumerazione delle proprietà di un oggetto, fatta con

for (k in o) { ... }

Restituisce solo le chiavi proprie dell’oggetto, quindi non quelle che vengono
trovate nei prototipi.
Lo stesso vale per Object.keys(o), Object.entries(o), ecc.
In questo modo, le chiavi presenti nel prototipo sono leggibili se le accedete, ma
non sono enumerabili (ciò è particolarmente comodo per array e dizionari)
*/

for (key in Pluto) {
    console.log(key) // => name / età = chiavi 
        // => ritorna chiave propria dell'oggetto, non quella trovate nei prototipi (chiavi leggibili, ma non enumerabili)
    console.log(Pippo[key]) // => Pippo / 20  = VALORE delle chiavi
}

Persona.prototype.compleanno = function() { this.età++ } // => altro modo di aggiungere un metodo ad una classe (metodo non bello, meglio usare class)

/*
OSSERVAZIONE:
Se aggiungiamo un metodo a un particolare oggetto (diciamo, pippo), il metodo
sarà disponibile solo per quell’oggetto.
Se aggiungiamo un metodo al prototipo di un oggetto, (diciamo, Persona), il
metodo sarà disponibile per tutti gli oggetti che hanno lo stesso prototipo.
 */



// GETTER E SETTER : (usabili anche fuori da classi)
// => leggere e scrivere i metodi di un oggetto come se esistessero come proprietà oggetto

/*
I metodi di accesso consentono di “simulare” la presenza di una proprietà in un
oggetto; però le letture o le scritture di quella proprietà causano l’esecuzione di un
metodo, anziché una lettura o scrittura nel dizionario dell’oggetto.

Le parole chiave get e set, davanti al nome della proprietà, creano i metodi di
accesso. 
Dall’esterno, la proprietà appare come una normale chiave con valore.

Ogni lettura di proprietà causa l’invocazione del getter. 
Ogni scrittura di proprietà causa l’invocazione del setter (passando come argomento il valore assegnato).
*/
var oggetto = {get x() { return 1 }, set x(v) {; } }
oggetto.x() // invoco get => 1 // lettura di prorpietà 
oggetto.x = 5 // invoco set => 5  // scrittura di prorpietà

// esempio getter e setter :
class Distanza {
    //static #MIGLIO = 1.60934 // => fattore di conversione 
    //#distanza = 0 // in km 
    get km() { return this.#distanza } // legge la proprietà km 
    set km(v) { this.#distanza = v } // setto (scrivo) la proprietà km 
    get miglia() { return this.#distanza / Distanza.#MIGLIO }
    set miglia(v) { this.#distanza = v * Distanza.#MIGLIO }
}

var d = new Distanza();
/*
leggere proprietà => invocare get 
scrivere proprietà => invocare set

d => Distanza{}
d.km => 0 
d.km = 5 => invoca setter passandogli il valore 5 come parametro => avrò poi: d.km = 5 
d.miglia => converte 5km in miglia => 3.10
d.miglia = 3 => invoco set => 3
d.km => chiamo get di km ed ho i km convertiti in miglia => 4.82 

meccanismo per proteggere gli attributi privati (le proprietà devono passare per i gettter e i setter ) => incapsulamento 


Precisiamo la STRATEGIA DI RICERCA DI UNA PRORPIETA'

1. Quando si vuole LEGGERE il valore di una proprietà di un oggetto, si guarda se l’oggetto ha la
chiave cercata_
a. Se la chiave è presente, si controlla se è un getter o una proprietà base
    i. Se è un getter, si invoca la funzione corrispondente, e il valore è quello restituito dalla funzione
    ii. Se è una proprietà base, il valore è quello della chiave nell’oggetto
b. Se la chiave non è presente, e l’oggetto ha un prototipo, si cerca la proprietà nel prototipo, ricorsivamente
c. Se la chiave non è presente, e l’oggetto non ha un prototipo, il risultato è undefined

2. Quando si vuole SCRIVERE il valore di una proprietà di un oggetto, si guarda se l’oggetto ha la
chiave cercata.
a. Se la chiave è presente, si controlla se è un setter o una proprietà base
    i. Se è un setter, si invoca la funzione corrispondente, passando come unico argomento il valore che si vuole
    assegnare
    ii. Se è una proprietà base, si assegna il valore alla proprietà (eventualmente sovrascrivendo il valore precedente)
b. Se la chiave non è presente, si cerca ricorsivamente un setter nel prototipo, ricorsivamente
    i. Se si trova un setter lungo la catena, si invoca la funzione corrispondente, passando come unico argomento il
    valore che si vuole assegnare
    ii. Se non si trova un setter lungo la catena, la proprietà viene aggiunta all’oggetto, con il valore che si vuole
    assegnare.
*/




//GENERATORI : 
// -> tornare da una invocazione di funzione restituendo il controllo al chiamante, ma poi riprendere la computazione da dove si era rimasti. 
//=> restituizione risultati parziali (tornare da un'invocazione restituendo il controllo al chiamante, ma poi riprendere...)
/*
I generatori si dichiarano con function* f() {} anziché function f() {},
oppure *metodo() {} anziché metodo() {} (dentro le classi).

YIELD: 
Nel corpo di un generatore (e solo lì) si può usare il comando yield expr, che
restituisce al chiamante il valore di espressione, ma riprende l’esecuzione dal
comando successivo (e non dall’inizio del corpo) in caso di “rientro”
*/



//esempio:
function* range(a, b) { var i = a; while (i < b) yield i++ }

// range restituiesce un valore compreso tra a e b, ricordandosi il valore a cui si era arrivati nella chiamata precedente 
//per scorrere un generatore vi è il metodo next()
//generatore => 2 proprietà: value (valore restituito) e done (= true quando viene completata la generazione)


var x = range(4, 8)
    /*
    x => Object [generator] {}
    x.next() => {value:4, done:false}
    x.next() => {value:5, done:false}
    x.next() => {value:6, done:false}
    x.next() => {value:7, done:false}
    x.next() => {value:undefined, done:true}
    x.next() => {value:undefined, done:true}
    */

//scorrere un generatore:
for (var i of range(4, 8)) {
    console.log(i) // ritorna 4, poi 5, poi 6, poi 7 e poi finisce 
}

[...range(3, 7)] //=> [3,4,5,6] // range chiamata concatenando l'uso di spread (...)


//es 2: 
//metodo babilonese => https://replit.com/@731AA2223LABIB/MetodoBabilonese-GABRIELEMARSILI


function* babylon(an) { // => dichiarazione funzione con * per denotare che + generatore 
    while (true) { // => ciclo infinito del generatore (si stoppa ad ogni "iterazione")
        yield an = an / 2 + 1 / an
    }
}

// generatore e classi:
/*
class Poesia {
    //#testo
    constructor(t) { this.#testo = t } 
        *parole() {
            var i = 0
            while (true) {
                let f = this.#testo.indexOf(" ", i) // cerca spazi nel testo => primo spazio  incontrato
                if (f >= 0) {
                    yield this.#testo.slice(i, f) // slice di f fino al primo spazio incontrato 
                } else {
                    yield this.#testo.slice(i) // ultimo spazio 
                    break // interrompe 
                }
                i = f + 1 // sposta l'indice all'ultimo carattere che aveva incontrato 
            }
        }
}
var p = new Poesia("La vispa ecc ")
    // [...p.parole()] => ritorna lista di parole singole in base agli spazi del testo
*/