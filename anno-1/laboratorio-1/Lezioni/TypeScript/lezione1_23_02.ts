/*
TYPE SCRIPT I 

-> tipi, tuple e tipi strani

•Typescript (ts) = "sopra-insieme di js"
=> in ts devo dichiarare i tipi: fa l'analisi statica del codice (a diferenza di js)
 => è più rigido, ma permette di eliminare errori a tempo di compilazione (prima di eseguire il codice)



JS: linguaggio tipizzato, non prevede controlli statici, effettua conversione implicita tra tipi
 => js flessibile, ma l'assenza di controlli può generare errori difficili da analizzare.

Type script => estensione js --> supporto controllo statico tipi e altre funzioni.
=> codice ts --> "transpailing" --> esecuzione di codice trasformato in js 
•Transpailer = compilatori source to source (=> strumenti che leggono codice sorgente in un linguaggio di programmazione e producono codice equivalente in un altro linguaggio che ha un simile liv. di astraizione.)

-> typescript playground (sito utile)
*/

"use strict";

/*
function punto_medio(a: number, b: number) : number { 
    return (a + b) / 2;
}


equivalente in js
 function punto_medio(a,b){
    return (a + b) / 2
 } 
*/



class Greeter{
    greeting : string;

    constructor(mesage: string){
        this.greeting = mesage;
    }

    greet():string{
        return "Hi " + this.greeting;
    }
}
let greeter : Greeter = new Greeter("Pippo");
//greeter.greet() // => hi Pippo


/*
Tipi base: boolean, number, string, bigInt, array (dati omogenei)

Tipi tupla: permettono di esprimere array di dati eterogenei (i tipi sono indicati al momento della dichiarazione)
=> let tupla: [string, number] OK
-->  tupla: ["hi", 10] =>  OK
-->  tupla: [10,"hi"] => NOT OK -> error

(si accede agli elementi tramite indice ) => errori in base a tipi errati / tentare di accedere ad elementi al di fuori degli indici noti

-> nelle tuple posso aggiungere elemeni (usare stessi metodi che ho su array in js), ma con degli accorgimenti (es: non posso aggiungere un booleano ad una tupla di numbers)


•Novità: ENUM:
= > serve per dare nomi ad insiemi di valori numerici 
*/

enum Color {
    Red, // 0 / posso inizializzare Red = 1 per partire da un altro numeo anziché 0 
    Green, // 1
    Blue, // 2    
}
let variabile : Color = Color.Green // => variabile = 1 
let ColorName : string = Color[2] // => "Blue" (enum biiettiva)
console.log(Color)


/* il tipo Any
=> utile quando si parte da codice js, per iniziare ad inserirre il controllo dei tipi nella trasformazione in TS (o viceversa)
=> usando any si perde il controllo dei tipi 
*/
var MyVar : any = 123;
MyVar = "Una Stringa";
MyVar = true;
var myArr : any[] = ["sring", 123, true]


/* il tipo Unknown 
=> variabili di cui non conosciamo il tipo staticamete 
=> Unknown NON permette di accedere a proprietà che non esistono (a differenza di Any)

=> non è possibile usare variabili di tipo unknown in espessioni "tipate" (a meno di inserire espliciti controlli sui tipi)
*/

let NonSicuro : unknown = 4;
NonSicuro = "forse una stringa";
NonSicuro = false;


var aVar : any = 678;
aVar.getCodiceFiscale() // =>  ok


var aVar2 : unknown = 678;
aVar.getCodiceFiscale() // =>  errore

// => non è possibile usare variabili di tipo unknown in espessioni "tipate" (a meno di inserire espliciti controlli sui tipi)
let maybe : unknown 
// const aNumber : number  = maybe => errore 

if (typeof maybe === "boolean"){
    // TS sa che maybe è boolean 
    const aBoolean : boolean = maybe
    // const aNumber : number = maybe => errore 
}



/* il tipo Void 
=> tipo nullo = mancanza di un tipo, ovvero assenza di un valore a cui è poter assegnare un tipo 
=> viene usato per inidicaere una funzione che non ritorna nulla (=> ha poco senso usarlo su una variabile, che in caso potrebbe ottenere solo null o undefined)
*/

function warnUser() : void {
    console.log("warning message");
}

/* il tipo null & undefined 

=> se voglio usare una variabile che può esser string, null o undefined
 => risolvibile con any (ha poco senso)
 => si usano i TIPI UNIONE
*/

/*TIPI UNIONE :

=> descrivono un valore che può essere uno fra i diversi tipi
 
number | string | boolean = variabile che può essere tipo number, string o boolean
*/

function padLeft (value: string, padding: number | string) {
    //...
}

let prezzo: string | number 
prezzo = 10.01
prezzo = "€10.01"
// => è anche possibile definire un nome per un tipo, in termini di un altro tipo, con keyword TYPE 

type Price = number | string ;
let price: Price;
price = 10.01
price = "€10.01"



let try_arr : [Price]
try_arr = [10.01]
try_arr.push("€10.01")

console.log(try_arr)