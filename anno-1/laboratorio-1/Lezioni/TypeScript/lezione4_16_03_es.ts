// esercizi 

//NUMERI: 

class Rational {
    num : number;
    den : number;

    constructor (numeratore:number, denominatore:number) {
        this.num = numeratore;
        this.den = denominatore;
    }

}


type num = number | Rational


class Complex { // parte reale + parte immaginaria con i ( i = sqrt(-1) ) 
    real : num;
    imm  : num;

    constructor (a:num | Complex, b?:num | Complex) {
        if(a instanceof Complex){
            
            this.real  =  a.real;
            if(a.imm) this.imm  =  a.imm;
            
        }

        // => a e b parametri entambi di tipo num
        if((typeof a == "number" || a instanceof Rational) && (typeof b == "number" || b instanceof Rational) ){
            this.real  =  a;
            if(b) this.imm  =  b;
        }

        
    }

}
/*
var n1 = new Rational(1,2)
var n2 = new Complex(n1)
var n3 = new Complex(n2)

console.log(n1)
console.log(n2)
console.log(n3)

*/


//ESAMI:

interface Esame{
    codice : number;
    nome : string;
}

class EsameTriennale implements Esame{
    codice : number;
    nome : string;
    constructor(code : number, name : string){
        this.codice = code;
        this.nome = name;
    }

}


class EsameMagistrale implements Esame{
    codice : number;
    nome : string;
    constructor(code : number, name : string){
        this.codice = code;
        this.nome = name;
    }
}

/*
class EsameMagistrale extends EsameTriennale{
    codice : number;
    nome : string;
    constructor(code : number, name : string){
        super(code,name)
    }
}
*/


function filtra(arr:Esame[]):EsameMagistrale[]{
    let new_arr : EsameMagistrale[] = []

    for (let el of arr){
        if (el instanceof EsameMagistrale) new_arr.push(el)
    }   

    return new_arr

}