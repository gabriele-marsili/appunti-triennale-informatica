
class ErroreVeicolo extends Error{}


class Veicolo {
    constructor(m,t) {
        this.modello = m;
        this.targa = t
    }

    toString(){
        return JSON.stringify(this)
    }

    controllaVeicolo(){
        //console.log("this = ",this);
        //console.log("this targa = ",this.targa);
        //console.log("this cilindrata = ",this.cilindrata);
        if(this instanceof Automobile){
            if(this.targa.length != 7) {
                throw new ErroreVeicolo("la targa di un'automobile deve avere 7 caratteri")
            }
            else return true
        }
        else if (this instanceof Motociclo || this instanceof Ciclomotore){
            
            if(this.targa.length != 4 || (this.cilindrata > 125 && this instanceof Ciclomotore)){
                throw new ErroreVeicolo("err targa motoveicolo o cilindrata")            
            }
            else return true
        }
        
    }

}
class Automobile extends Veicolo{
    constructor(modello,targa,num_p) {        
        super(modello,targa)
        this.numero_passeggeri = num_p
        //this.controllaVeicolo()
    }
    
}

class Motociclo extends Veicolo{
    constructor(modello,targa,cilindrata) {        
        super(modello,targa)
        this.cilindrata = cilindrata
        //this.controllaVeicolo()    
    }
}

class Ciclomotore extends Veicolo {
    constructor(modello,targa,cilindrata) {        
        super(modello,targa)
        this.cilindrata = cilindrata
        //this.controllaVeicolo()

    }

}

function  controllaVeicoli(veicoli) {
    for(let v of veicoli){
        console.log("v = ",v);
        try{
            v.controllaVeicolo()
        }
        catch(e){
            return false
        }
    }  
    return true
}


let tir = new Veicolo("mercedes", "0000000");
let ferrari = new Automobile("ferrari", "0000000", 2);
let ducati = new Motociclo("ducati", "0000",250);
let lambo = new Automobile("lamborghini", "0000000", 2);
let ciao = new Ciclomotore("ciao", "0000", 50);


let tir_err = new Veicolo("mercedes", "000000000");
let ferrari_err = new Automobile("ferrari", "00", 2);
let ducati_err = new Motociclo("ducati", "00000",250);
let lambo_err = new Automobile("lamborghini", "00000000", 2);
let ciao_err = new Ciclomotore("ciao", "0000", 300);

let v0 = [tir, ferrari, ducati, lambo, ciao];
let v1 = [tir, ferrari_err, ducati, lambo, ciao];
let v2 = [tir, ferrari, ducati_err, lambo, ciao];
let v3 = [tir, ferrari, ducati, lambo_err, ciao];
let v4 = [tir, ferrari, ducati, lambo, ciao_err];


//console.log(controllaVeicoli(v0)) // t
//console.log(controllaVeicoli(v1), false)
console.log(controllaVeicoli(v2), false)
//console.log(controllaVeicoli(v3), false)
//console.log(controllaVeicoli(v4), false)
