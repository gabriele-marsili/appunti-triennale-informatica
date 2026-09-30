
/*
Vogliamo modellare una azienda manifatturiera. L'azienda costruisce tante fabbriche, 
ciascuna delle quali produce un solo tipo di prodotto (per esempio: un certo modello di automobile); 
è possibile in fase di produzione di uno specifico prodotto indicare certe caratteristiche desiderate 
(per esempio: il colore di una particolare automobile, come ordinato dal cliente).

Si scriva una classe JavaScript Fabbrica con i seguenti metodi:

un costruttore con un argomento, prodotto, che stabilisce le caratteristiche degli oggetti prodotti dalla 
fabbrica (tramite il metodo produci() descritto sotto).


una proprietà nProdotti il cui valore è il numero totale di oggetti prodotti dalla fabbrica, dal momento della sua costruzione
una proprietà nFabbriche il cui valore è il numero totale di fabbriche costruite
un metodo produci(opzioni) che produce (e restituisce) un nuovo prodotto; l'argomento opzioni è opzionale. 

Questo metodo deve restituire al chiamante un nuovo oggetto che è il prodotto richiesto; quest'ultimo sarà un 
oggetto con tutte le proprietà contenute nell'argomento "prodotto" passato al costruttore, ed eventualmente con 
aggiunte le proprietà contenute nell'argomento "opzioni" passato a questo metodo. Le opzioni non possono cambiare 
il tipo di prodotto: se "opzioni" contiene una proprietà che era già presente in "prodotto", con un valore diverso 
da quello presente in "prodotto", allora il metodo produci() deve lanciare un'eccezione di tipo IllegalOptionsError 
che dovete definire nel vostro codice.


La Fabbrica deve essere "robusta" rispetto a modifiche esterne. Non deve essere possibile modificare dall'esterno il 
tipo di prodotto dopo la costruzione, né i contatori di fabbriche e di prodotti.
*/

class IllegalOptionsError extends Error{}
class Fabbrica{
    #nProdotti = 0 // numero totale di oggetti prodotti dalla fabbrica, dal momento della sua costruzione
    static nFabbriche = 0 // numero totale di fabbriche costruite (attributo della classe stessa)
    #prodotto = undefined; // # => privato 
    constructor(p) {
        this.#prodotto = p;
        Fabbrica.num_F() // => ogni volta che viene creata una fabbrica incremento il numero di fabbriche costruite
    }
    
    static num_F(){
        Fabbrica.nFabbriche +=1
    }

    get nFabbriche() { return Fabbrica.nFabbriche}
    get nProdotti() { return this.#nProdotti}


    produci(opzioni = undefined){
        
        this.#nProdotti++
        let res = {}
        for(let propriety in this.#prodotto){
            res[propriety] = this.#prodotto[propriety]
        }
        if(opzioni){
            //Fabbrica.num_F() // => ogni volta che viene creata una fabbrica incremento il numero di fabbriche costruite
            for(let p in opzioni){
                if(p in this.#prodotto) throw new IllegalOptionsError("Invalid option")
                res[p] = opzioni[p]
            }
        }
        return res
    }
}


var f1=new Fabbrica({modello: "500"}) // => 1 fabbrica di modelli 
var p1=f1.produci({colore: "verde"}) // => 1 f di colore 
var p2=f1.produci({cambio: "auto"}) // 1 f di cambi 
var f2=new Fabbrica({gusto: "limone"}) // => 1 f di gusti 
console.log((f2.nFabbriche)) //4)

console.log((f2.nProdotti)) //,0)
var p3=f2.produci()
console.log(p3)//,{gusto: "limone"}
console.log((f2.nProdotti)) //,1)
console.log((f1.nProdotti)) //2)
console.log((f1.nFabbriche)) //4)