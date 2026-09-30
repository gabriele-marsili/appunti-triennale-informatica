/*
https://drive.google.com/file/d/1vsRaVGpkPISSn1FlC001P9v29SVyZTjN/view
*/


//GENERICS E CLASSI
/*
=> stessa forma 
*/

class Numero_Generico<T>{
    zeroValue : T; // -> Con strictPropertyInitializationabilitato, avrete un errore Property 'zeroValue' has no initializer and is not definitely assigned in the constructor
    add:(x:T, y:T) => T;
}

interface myGenericNumber<T>{
    my_zeroValue : T; // -> Con strictPropertyInitializationabilitato, avrete un errore Property 'zeroValue' has no initializer and is not definitely assigned in the constructor
    my_add:(x:T, y:T) => T;
}

let myGenericNumber = new Numero_Generico<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => (x+y);
// differenze : 
/*
classi vs interfacce

-Interfaccia usata in TS solo per
scopi legati al type check (dopo il
transpiling, non esiste più)

-Da una classe potete creare
oggetti, e la struttura che
definite continua ad esistere in
JS (dopo il transpiling)

-> esempi nelle slide  -> https://drive.google.com/file/d/1vsRaVGpkPISSn1FlC001P9v29SVyZTjN/view
*/


//CLASSI E VISIVILITA'

/*
In TS: 
● public: visibilità di default
● protected: visibile alla
classe o alle sottoclassi
● private: visibile solo alla
classe

*/

class Greeter_2 {
    private a : number = 0; // visibile solo alla classe
    public greet(){ // visibilità di default
        console.log("Hi "+this.getName());
    }

    protected getName(){ // visibile alla classe o alle sottoclassi
        return "ciao ciao ";
    }
}

//var e = new Greeter_2
//e.getName()  => error : "getName() is protected"


// uso "strano" del constructor :

class Pizza{
    constructor(
        public name: string, 
        public toppings: string[])
        {        
    };
}

/*
equivale a :
"use strict"
class Pizza{
    constructor(name,toppings){
        this.name = name;
        this.toppings = toppings;
    }
}
*/

//GENERICS CONSTRAITS :

// => limitarci a tipi <T> che hanno una determinata proprietà:
// => uso di inerfacce 

interface Lengthwise {
    length: number; 
}
    
function loggingIdentity <T extends Lengthwise> (arg: T) : T { // il tipo T generico è esteso dal tipo dell'interfaccia => deve avere proprietà  (attributo) length
    // => l'interfaccia "forza" che <T> abbia proprietà .length
    console.log(arg.length); // Ora <T> ha la proprietà .length
    return arg;
}
    
loggingIdentity({ length: 10, value: 3 });


