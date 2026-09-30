// https://drive.google.com/file/u/0/d/1GbahDHtO3ektxlW1tUeah5AFnb_GsDTB/view?usp=drive_web
// tipi, interfacce e classi

//interferenza di tipo
/* let x = 3 => ts deduce x: number
let y = [0,1,null] => let x :(number | null) [] => x viene preso con tipo unione

=> inferenza : quando si inizializzano le variabili / quando si ritornano valori di funzioni (se non specificato)

•regole implicite di TS (quando l'inferenza non è ovvia):
-> type system di tipo strutturale : (duck typing)
=> controllo e comparazione dei dati si basa sulla forma dei dati
es:
*/

function printLabel(label_obj : {label : string}){
    console.log(label_obj.label);
}

let myObj = {size:10,label:"Size 10 OBJECT"};
//let myObj_2 = {size:10,label:42}; => typeof(label) =! "string" => errore (funtion's signature non rispettata)
printLabel(myObj) // => va bene perché myObj ha attributo label e tale attributo è di tipo stringa (la funzione, se l'oggetto non ha l'attributo label di tipo string ritorna errorre!)


/*
•INTERFACCE: (=> utilizzate per definire la struttura di un oggetto)
*/


interface LabeledValue{ // => struttura i tipi 
    label: string;
}

function printLabel_2(label_obj :LabeledValue){ // => dico come è strutturato l'oggetto utilizzando l'interfaccia 
    console.log(label_obj.label);
}

let myObj_3 = {size:10,label:"Size 10 OBJECT"};
printLabel(myObj_3) // => va bene perché myObj ha attributo label e tale attributo è di tipo stringa (la funzione, se l'oggetto non ha l'attributo label di tipo string ritorna errorre!)
// => non dobbiamo specificare che l'oggetto (myObj_3) implementa l'interfaccia (a differenza di altri linguaggi) => TS tiene conto solo della forma
// => stesso meccanismo di prima, ma stavolta è espicito tramite l'uso dell'interfaccia 


// estensione interfacce: => gerarchia:

interface IPerson {
    nome:string;
    gender:string;
}

interface IEmployee extends IPerson{
    empCode:number;
}
let empObj : IEmployee = {empCode:1, nome:"Pippo",gender:"Alien"} // => questi 3 attributi, poichè l'oggetto è di tipo IEmployee, si aspetta questi 3 attributi con i corrispettivi tipi

// interfacce + classi => forzare una classe ad utilizzare il contratto definito da un'interfaccia 

interface ClockInterface {
    currentTime: Date;
    setTime(d:Date):void; // => interfaccia utilizzabile anche con i METODI
}

class Clock implements ClockInterface{
    currentTime: Date = new Date(); // => deve avere per forza l'attrinbuto con il corrispettivo tipo
    setTime(d: Date) { // => ci deve essere il metodo setTime con un parametro di tipo Date ed esso deve ritornare void 
        this.currentTime = d;
    }
    constructor (h:number, m:number) {}
} // => il traspailer di TS, quando esegue in JS, NON traduce l'interfaccia

/*
in JS (=> post traspailer):

"use strict";
class Clock{
    constructor(h,m){
        this.currentTime = new Date();
    }
}
*/



//TIPO DI UNA FUNZIONE 
/*
in JS le funzioni corrispondono (ritornano) a valori => hanno un tipo
in TS 
*/

let myAdd = function (x: number, y: number) : number{return x + y;};
// le funzioni in TS hanno un tipo specificato => signature 
// => nel caso dell'esemio la signature è = (x: number, y: number) => number 
// => nella signatura ovviamente NON CONTANO i NOMI dei parametri 
// la signature è il meccanismo che permette di istanziare i metodi nelle classi legate alle interfacce 


//In TS tutti i parametri in una funzione sono richiesti (in JS sono tutti opzionali, se non vengono passati prendono undefined, se sono in eccesso vengono ignorati e i parametri sono accessibili con "arguments" )
/*
function testParm(a,b,c){
    console.log(arguments); 
    
    return "Posso accedere a tutto: "+ a + " " + b + " " + c + arguments[3];    
}

*/

// PARAMETRI  OPZIONALI: => uso di ?
function buildName(firstName:string, lastName?: string): string {
    if(lastName) return firstName + " " + lastName;
    else return firstName;
} // tipo = firstName:string, lastName?: string | undefined): string => il tipo di lasName diviene un tipo composto -> ottiene undefined 

let res_1 = buildName("Pippo") // => ok
//let res_2 = buildName("Pippo","Baudo","no") // => NON ok
let res_3 = buildName("Pippo","Baudo") // => ok

// valori di inizializzazione ai parametri
// -> se parametro non fornito o se undefined 

// i parametri con inizzializzazione vengono dopo tutti quelli richiesti e sono trattati ocme opzionali (=> possono essere omessi )
function buildName_2(firstName:string, lastName="Woman"): string {
    if(lastName) return firstName + " " + lastName;
    else return firstName;
} // tipo = firstName:string, lastName?: string | undefined): string => il tipo di lasName diviene un tipo composto -> ottiene undefined 
// tipo = alla funzione che usa il parametro opzionale  

let res_4 = buildName_2("Wonder") // => ok -> wonder woman  
let res_5 = buildName_2("Pippo",undefined) // =>  ok -> Pippo Woman 
let res_6 = buildName_2("Pippo","Baudo") // => ok -> Pippo Baudo -> sovrascritto il parametro con inizializzazione 


function buildName_3(firstName = "Will", lastName : string): string {
    
    return firstName + " " + lastName;
} // tipo = firstName:string | undefined, lastName?: string): string 

//let res_7 = buildName_3("Wonder") // => NON ok -> troppi pochi parametri 
let res_8 = buildName_3(undefined,"Pippo") // =>  ok => Will Pippo
//let res_9 = buildName_3("Pippo","Baudo","nop") // => NON ok -> troppi  parametri 
let res_10 = buildName_3("Pippo","Baudo") // => OK -> Pippo Baudo




// ESERCIZIO:
// scrivere interfaccia che definisce tipo nodo, che implementa un elemento di una lista connessa bi-direzionale.
// una lista connessa permette lo scorrimento in avanti 

interface Nodo{
    next : Nodo | null;
    prev : Nodo | null;
    value : number;
}












