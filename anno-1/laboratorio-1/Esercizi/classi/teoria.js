//La classe Studente (sotto-classe) eredita il prototipo (=> attributi e metodi) dalla classe Persona (super-classe). (non il contrario)

//superclasse 
class Persona {
    constructor(name, età) {
        this.name = name; // attributi 
        this.età = età;
    }
    compleanno() { // metodo 
        this.età++;
    }
}

//sottoclasse 
class Studente extends Persona { // estendo la classe Persona con Studente (i metodi e gli attributi della classe Persona vengono dati anche alla classe Studente)
    laurea() { // metodo solo della classe studente
        return `Lo studente ${this.name} è laureato`;
    }
}

var Pippo = new Studente("Pippo", 19);
Pippo.compleanno(); // incrementa età di Pippo 
// Pippo => {nome:"Pippo",età: 20}
// Pippo.laurea => "Lo studente Pippo è laureato"


//Overridding : una sottoclasse ridefinisce un metodo della superclasse
class alieno extends Persona {
    compleanno() { // Overridding 
        this.età = this.età + 2;
    }
}
var Pluto = new alieno("Pippo", 19);
Pluto.compleanno(); // incrementa età di Pluto di 2 (non di 1) 

class StMagistrale extends Studente { // => StMagistrale sottoclasse di Studente 

    laurea() { // Overridding esempio 2
        return `Lo studente ${this.name} ha concluso la magistrale!`;
    }
}
var Mario = new StMagistrale("Mario", 25);
Mario.laurea(); // => `Lo studente Mario ha concluso la magistrale!`;


// key word "super" => riferimento alla superclasse di un oggetto 
class StMagistrale_migliorata extends Studente {
    constructor(name, età, triennale) {
        super(name, età) // key word "super" => riferimento alla superclasse di un oggetto 
        this.triennale = triennale
    }

    laurea() {
        return super.laurea() + " , evviva galattico!" // => invoco la superclasse Studente 
    }
}

var Pino = new StMagistrale_migliorata("Pino", 24, "Informatica")
    // Pino => {name:"Pino", età:24, triennale:"Informatica"}
    // Pino.laurea() => "Evviva!, evviva galattico!"


class Persona_non_standardizzata { // => creo attributi senza metodo costruttore, li inizializzo direttamente 
    nome = "Anonimo";
    età = -1;
    congnome; // => undefined
    lavoro = work() // => utile quando il valore di inizializzazione è calcolato chiamando un metodo (anche della superclasse)
        // eccetera 
} // => utile quando il valore di inizializzazione è calcolato chiamando un metodo (anche della superclasse)


//Membri privati : (utilizzati per mantenere parti di codice privato => parti di classi che non devono esser cambiare da un futuro proprietario del codice)
class C {
    // #privato() { /*codice */ } //=> metodo dell'oggetto che non posso chiamare al di fuori della classe 
    pubblico() { /* qui posso utilizzare this.#privato() */ }
}
var c = new C()
c.pubblico() //=> utilizzabile 
    // c.#privato() //=> NON utilizzabile (=> errore)

//Metodi Statici : (utilizzati -per esempio- per contare istanze di una classe )
class Auto {
    static metodo() { /*codice */ }
}
var Audi = new Auto()
Auto.metodo()
    // Audi.metodo() // => non si può accedere ad un membro statico tramite istanza (occorre indicare il nome della classe)

class Liceale extends Studente {
    static quanti = 0 // conta quanti studenti ho creato dalla classe Liceale (numero istanze della classe Liceale)

    // #iscritto = false
    constructor(...args) { // uso dello spread per passare i parametri (args = vettore di parametri)
        super(...args)
        Liceale.quanti++; // ogni volta che invoco la classe Liceale la variabile quanti viene incrementata 
        delete this.laurea() // elimina il metodo laurea che la classe Liceale eredita da Studente
    }

    unipi() { return this.#iscritto }
    static bellaVita() { return true }
}

var Luca = new Liceale("Luca", 15)
var Anna = new Liceale("Anna", 16)
Liceale.quanti() // => 2 
Luca.unipi() // => false 
    // Luca.iscritto() // => SyntaxError
Luca.quanti() // => undefined
    // Luca => Liceale{name: "Luca", età: 15 "}
    //Liceale => [class Liceale extends Studente {quanti:2} ]
Liceale.bellaVita() // => true
Anna.bellaVita() // => TypeError (Anna.bellaVita() is not a function)


//UML = linguaggio per modellare oggetti e classi --> strutturazione del codice in forma grafica


// Getter, Setter e Generatori => leggere e scrivere i metodi di un oggetto come se esistessero come proprietà oggetto
var o = {get x() { return 1 }, set x(v) {; } }
o.x() // invoco get => 1 // lettura di prorpietà 
o.x = 5 // invoco set => 5  // scrittura di prorpietà
    // esempio:

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
leggere proprietà => invicare get 
scrivere proprietà => invicare set

d => Distanza{}
d.km => 0 
d.km => 5 => invoca setter passandogli il valore 5 come parametro 
d.miglia => converte 5km in miglia => 3.10
d.miglia = 3 => invoco set => 3
d.km => chiamo get di km ed ho i km convertiti in miglia => 4.82 

meccanismo per proteggere gli attributi privati (le proprietà devono passare per i gettter e i setter ) => incapsulamento 

*/


//Generatori => restituizione risultati parziali (tornare da un'invocazione restituendo il controllo al chiamante, ma poi riprendere...)
//esempio:
function* range(a, b) { var i = a; while (i < b) yield i++ } // range restituiesce un valore compreso tra a e b, ricordandosi il valore a cui si era arrivati nella chiamata precedente 
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

for (var i of range(4, 8)) {
    console.log(i) // ritorna 4, poi 5, poi 6, poi 7 e poi finisce 
}

[...range(3, 7)] //=> [3,4,5,6] // range chiamata concatenando l'uso di spread (...)


// generatore e classi:

class Poesia {
    //#testo
    constructor(t) { this.#testo = t } *
        parole() {
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