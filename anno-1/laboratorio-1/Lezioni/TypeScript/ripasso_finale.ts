//ENUM : = > serve per dare nomi ad insiemi di valori numerici 

enum Color {
    Orange = 0, // 0 omettibile -> di default / posso inizializzare Orange = 1 per partire da un altro numeo anziché 0 
    White, // 1
    Black, // 2    
}
let var_c : Color = Color.White // => var_c = 1 
let C_Name : string = Color[2] // => "Black" (enum biiettiva) = Color.2 = Color[2] (Coloro = obj)
console.log(Color) 
/*console.log(Color)=> :

{
  '0': 'Orange',
  '1': 'White',
  '2': 'Black',
  Orange: 0,
  White: 1,
  Black: 2
} */


/* --- LEZIONE 1 : --- 
TIPI any, unknown, void, null, undefined 
TIPI UNIONE, uso di type per creazone tipo  
https://drive.google.com/file/d/15MIwGdW-3QK2jevJC7LvMOLrwpwRk1NN/view
*/

/* --- LEZIONE 2 : --- 
variabili / parametri opzioniali ( -> uso "?" )
esercizi (funzione calcola con operatore str, funzione taglia stringa, altre versioni funzione calcola)
https://drive.google.com/file/d/1GbahDHtO3ektxlW1tUeah5AFnb_GsDTB/view
*/


/* --- LEZIONE 3 : --- 
tipi funzioni, 
interfacce (-> definire struttura obj, usabili anche con metodi) 
classi 
inferenza di tipo (TS deduce il tipo automaticamente)
parametri opzionali e parametri con inizializzazione (sovrascrivibili)
https://drive.google.com/file/d/1vsRaVGpkPISSn1FlC001P9v29SVyZTjN/view
*/
let fun : (arg : string) => number  // tipo funzione che prende string arg e ritorna un number 

/* --- LEZIONE 4 : --- 
esercizi : 
•classi di numeri (razionali e complessi)
•classi esami con uso interfacce (e grearchie)
•funzione filtra esami (uso istanceof per controllo se obj appartiene a classe)
https://drive.google.com/file/d/1vsRaVGpkPISSn1FlC001P9v29SVyZTjN/view
*/

/* --- LEZIONE 5 : --- 
GENERICS E CLASSI -> uso <T>
differenze tra classi ed interfacce 
visibilità classi : public, protected, private
GENERICS CONSTRAITS => tipi <T> generics che estendono interfacce 
https://drive.google.com/file/d/1vsRaVGpkPISSn1FlC001P9v29SVyZTjN/view
*/
// es di generiscs constraint:

interface Example {
    ex_attribute : number;
}

function ex_function <T extends Example> (arg: T): T {// il tipo T generico è esteso dal tipo dell'interfaccia => deve avere proprietà  (attributo) length
    // => l'interfaccia "forza" che <T> abbia proprietà .ex_attribute
    console.log(arg.ex_attribute); // Ora <T> ha la proprietà .ex_attribute
    return arg;
}

ex_function({ ex_attribute : 10, value: 3 });

//es di generics + classi:
class MyNumero_Generico<T>{
    zeroValue : T; // -> Con strictPropertyInitializationabilitato, avrete un errore Property 'zeroValue' has no initializer and is not definitely assigned in the constructor
    add:(x:T, y:T) => T;
}

interface MyGenericNumber<T>{
    my_zeroValue : T; // -> Con strictPropertyInitializationabilitato, avrete un errore Property 'zeroValue' has no initializer and is not definitely assigned in the constructor
    my_add:(x:T, y:T) => T;
}

let MyGenericNumber = new MyNumero_Generico<number>();
MyGenericNumber.zeroValue = 0;
MyGenericNumber.add = (x, y) => (x+y);


/* --- LEZIONE 5 - esercizi : --- 
ABR con generics (-> permette diversi tipi di dati)
https://drive.google.com/file/d/1vsRaVGpkPISSn1FlC001P9v29SVyZTjN/view
*/


/* --- LEZIONE 6 --- 
WRAPPER -> classi con stessi nomi dei tipi, ma con lettera maiuscola
DATE
! ESPRESSIONI REGOLARI (= schemi di corrispondenza su stringhe) -> controlli su str (utili se devo controlare che stringa corrisponda a tipo / altro)
array con tipi macchina 
COLLECTION -> SET (collezioni = insiemi di valori qualsiasi con chiavi che possono essere valori qualunque) -> creazione INSIEMI di funzioni, obj...
MAP => mappe che associa chiavi (non solo str) a valori (di tutit i tipi)
JSON
oggetti ambiente -> HOST 
moduli : require ...
https://drive.google.com/file/d/1prky_eMGU2Y2kDYa36hAC8dFib88SJ58/view 
*/

//esempio espressioni regolari -> controllo che stringa (t) corrisponda ad un tipo
// => uso del metodo .test()
function type_check(t:string):boolean {
    return /string|number|boolean|undefined|object|function/.test(t)
}

// esempio dichiarazione di str che rispetti una data corrispondenza :
let MyStr = new RegExp("[a-z]+"); // oppure e = /[a-z]+/
// => MyStr deve esser una stringa che deve contenere almeno 1 carattere dalla a alla z 


/* --- LEZIONE 7 - esercitazione : --- 
•forme geometriche: interfacce + classi + gerarchie + error
•dilemma del prigionero : enum + funzioni 
•BlackJack : tipi, enum, classi, funzioni
•Collezione Ordinata : classi + generics, parametri opzionali, visibilità
•Linked List : classi + generics + gerarchie, parametri opzionali,visibilità
https://replit.com/@cikay72/Esercitazione-Libera-Typescript-Soluzione#index.ts
*/


//lezione_30_03 => esercizi su GRAFI (con liste /  matrici di adiacenza) ->  https://drive.google.com/file/d/1_mRLVUx8B7ZaRthLaVgSt2--_kAl5tnu/view