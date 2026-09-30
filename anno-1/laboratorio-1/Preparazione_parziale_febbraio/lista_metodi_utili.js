//GENERALI:
//controllare che un numero sia intero:
//1) n == parseInt(n) : => true se è intero 
//2) String(n).includes(".") : => true se NON è intero 
//3) Number.isInteger() : => true se è intero 

//elevamento a potenza 
var n = 2 ** 3 // => 2^3 = 8

//ARRAY:
// metodi array:
// https://www.w3schools.com/jsref/jsref_obj_array.asp 

// slice => Array.slice() returns selected array elements as a new array:
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const myBest = fruits.slice(-3, -1); // => ["Lemon","Mango"]
// -1 => ultimo elemento 

// includes => vedere su un elemento appartiene ad array o meno => ritorna un booleano 

var arr = ["first", 1, 2, 3, 4, 5, 6, 7, 8, "last"]
arr.pop() // => elimina ultimo -> ["first",1,2,3,4,5,6,7,8]
arr.shift() //  => elimina primo -> [,1,2,3,4,5,6,7,8,"last"]
arr.unshift("nuovo primo") // => aggiunge in cima -> ["nuovo primo","first",1,2,3,4,5,6,7,8,"last"]
arr.push("nuovo ultimo") // => aggiunge in fodo -> ["first",1,2,3,4,5,6,7,8,"last","nuovo ultimo"]

arr.splice(arr.indexOf(1), 1) // => splice(indice, quantità elementi da rimuovere)
    // => rimuove tot elementi dall'indice inserito, facendo scorrere gli altri 

//push + pop => lista in / out (ultimo in ingresso è primo ad uscire)
//shift + unshift => lista in / out (cresce in testa)

//first in first out => push + shift (slide)



//reduce 
// sintassi : array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
//arr.reduce()


//scorrere array => for of 
const array1 = ['a', 'b', 'c'];

for (const element of array1) {
    console.log(element); //=> a,b,c
}


/*ARRAY destrutturati :
A = [4,7,1]

[a,b] = A => a = 4, b = 7 (1 non assegnato perché non uso spread)

[a,b,c=3,d=default] = A =>  a = 4, b = 7, c= 1, default = 8

[,,c] = A => c = 1 (skip)

[a,...r] =A  => a =4, r = [7,1] (spread)

[y,x] = [x,y] => scambia i valori x,y (senza variabili intermedie) */

//operatore destrutturante (array) + spread (...): => assegnare separatamente gli elementi 

var a = ["+", 4, 5, 21];

[op, ...x] = a // assegnamento destrutturante per estrarre operatore
// op = operatore (+ , - ,*, /) 
// x = array numerico

//restituire più valori con funzioni (=> destrutturaizione di valori restituiti da funzione)
//[a,b] = f(t) ; => valore di ritorno di f viene destrutturato in due variabili a e b


//array come ALBERI => https://docs.google.com/presentation/d/1KCkoK68nIDpe9bltBBJfintPCKOB2006x_ai08vj3fk/edit#slide=id.g1fb303b21d6372cd_17 
// array com MATRICI => dichiarazione matrice vuota + doppio for (uno annidato all'altro) => lezione_25_11

//OGGETTI: => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Objects


//scorrere oggetto:
let Pippo = {
    name: "Pippo",
    età: "20"
}
for (key in Pippo) {
    console.log(key) // => name / età = chiavi 
        // => ritorna chiave propria dell'oggetto, non quella trovate nei prototipi (chiavi leggibili, ma non enumerabili)
    console.log(Pippo[key]) // => Pippo / 20  = VALORE delle chiavi
}

const object1 = {
    a: 'somestring',
    b: 42,
    c: false
};
// metodo Object.keys(object) => ritorna array con NOMI CHIAVI oggetto 
console.log(Object.keys(object1));
// Expected output: Array ["a", "b", "c"]

// metodo Object.values(object) => ritorna array con VALORI chiavi oggetto 
console.log(Object.values(object1));
// Expected output: Array ["somestring", 42, false]


//Destrutturazione con oggetti:
/*
O = {n:"pippo" ,a:35, c:true}

{a,c} = O => a = 35, c = true
{a,b} = O => a = 35, b = undefined
{a,b=2} = O => a = 35, b = 2 (default)

{a,...r} = O => a = 35, r =  {n:"pippo", c:true}

{a:età,n:nome} = O => eta = 35, nome = "Pippo"
{a:età,b:bimbi = 0} = O => eta = 35, bimbi = 0
{x,y} anche con funzioni (slide)

graffe=> ! ambiguità con blocco => uso di tonde attorno a graffe per destrutturazione ({a:età,n:nome}) = O


funzione che prende due parameri x,y ed un terzo parametro che dipende e posso scelierlo => posso avere funzioni con parametri di default
function disegna(x,y,{raggio =0, colore = "nero",bordo=1,etichetta=""})
{
    => codice di disegno; usa x,y, raggio, colore, bordo, etichetta 
}


spread e funzioni:

f(...A)=> chiama funzione f dandole come parametri la lista dei valori in A 

p = {...q,c:3} => metto in p l'oggetto q destrutturato e, se c è definito tra le chiavi di q ne cambio il valore con 3, altrimenti lo aggiungo

p = {c:3,...q} => p è una copia di q con aggiunto c=3 se manca in q, altrimenti il val di c in q 


*/


// assegnazione valore con if forma contratta 
var condition = true
var boolean = condition == true ? "condizione vera" : "condizione falsa"
console.log(boolean)

/*INSIEME:
ogg {
    nome_key: quantità    
}

*/

//CLASSI 

// ogg instanceof Classe => true | false (se oggetto è istanza / creato da una classe )

// aggiungere metodo a classe (Math):
// Math.log_b=function(b,x){return Math.log(x)/Math.log(b);}

// oppure col prototipo
// Math.__proto__.log_b=function(b,x){ return this.log(x) / this.log(b); }