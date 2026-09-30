//GENERICS 

/*
https://drive.google.com/file/d/1vsRaVGpkPISSn1FlC001P9v29SVyZTjN/view
*/

// ES :
function identity(arg:number) : number {
    return arg
}

//senza generics -> per poter usare la funzione identità con altri tipi dovremmo scriverne una per ogni tipo
//-> oppure è possibile utilizzare il tipo any => perdo le informazioni sul tipo!

function fake_identity(arg : any) : any {
    return arg
}


// meccanismo per catturare il tipo dell'argomento: 
// => TYPE - VARIABLE variabile speciale che permette di avere il tipo dell'a variabile !
function identity_bella<T> (arg:T):T{    
    return arg;
}

let myStr :string = "miao";
console.log(identity_bella(myStr)) // => miao 

// => abbiamo usato una type variable T, che permette di catturare il tipo del dato passato come parametro 
// -> non perde il tipo dell'informaizione (a differenza di any)

//invocare funzione identità:
let output = identity_bella<string>("myString") // => output myString : string  
let output_2 = identity_bella("myString");// => tipo inferito automaticamente tramite type inference di TS 
console.log(output_2); // => output_2 myString : string

//problema: 

function loggigIdentity<T>(arg:T):T{
    //console.log(arg.length) //=> KO assumo che dato sia array, ma non posso farlo! (length non è definita per tutti i dati)
    return arg
}


// remember : le funzioni hanno un loro tipo => tipo dei parametri e tipo di ritorno 
// tipo di funzione identity ? (di funzione scritta con generics)
let myIdentity_1 = identity_bella;
let myIdentity : <U>(arg:U) => U = identity_bella; // => tipo di identity_bella = tipo generico, inglobato con interfaccia GenericIdentityFn

interface GenericIdentityFn{
    <T>(arg:T):T;
} // => interfaccia generica 

let myIdentity_2 : GenericIdentityFn = identity_bella;


interface GenericIdentityFn_2<T>{
    (arg:T) : T;
}

let myIdentity_3: GenericIdentityFn_2<number> = identity_bella


//Generics types:
// Generics + interfacce 

interface Nodo_generico<T>{
    value:T;
    next: Nodo_generico<T> | null;
    prev: Nodo_generico<T> | null;
} // => struttura che astrae dal tipo

let num1: Nodo_generico<number> = {value :1, next:null, prev:null}


//Generics con classi:

class GenericNumber<T>{
    zeroValue : T; // -> Con strictPropertyInitializationabilitato, avrete un errore Property 'zeroValue' has no initializer and is not definitely assigned in the constructor
    add:(x:T, y:T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};


/*
classi vs interfacce

Interfaccia usata in TS solo per
scopi legati al type check (dopo il
transpiling, non esiste più)

Da una classe potete creare
oggetti, e la struttura che
definite continua ad esistere in
JS (dopo il transpiling)


*/

//CLASSI E VISIVILITA'

/*
In TS: 
•public: visibilità di default
● protected: visibile alla
classe o alle sottoclassi
● private: visibile solo alla
classe

*/