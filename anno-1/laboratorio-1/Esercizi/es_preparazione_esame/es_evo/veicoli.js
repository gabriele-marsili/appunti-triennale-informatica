/*
Si realizzi un sistema per la gestione dei dati relativi ad una collezione di veicoli.

Il sistema si compone delle seguenti classi:

Classe Veicolo per registrare un generico veicolo, possiede gli attributi: modello (stringa) e targa (stringa);
Classe Automobile per rappresentare un'automobile, possiede gli attributi: modello (stringa), targa (stringa);
Classe Motoveicolo per rappresentare un generico veicolo a due ruote, possiede gli attributi: modello (stringa), targa (stringa), e cilindrata (intero);
Classe Motociclo per rappresentare un motoveicolo ad alta cilindrata, possiede gli attributi: modello (stringa), targa (stringa), e cilindrata (intero);
Classe Ciclomotore per rappresentare un motoveicolo a bassa cilindrata, possiede gli attributi: modello (stringa), targa (stringa), e cilindrata (intero);


Ogni classe deve presentare un costruttore e controllare le seguenti proprietà:



L'attributo targa deve avere essattamente 7 caratteri per gli oggetti Automobile 
ed esattamente 4 caratteri per gli oggetti Motoveicolo, Motociclo e Ciclomotore;

L'attributo cilindrata deve essere maggiore di zero e minore o uguale di 50 per gli oggetti Ciclomotore 
e deve essere maggiore di 50 per gli oggetti Motociclo;


nel caso le condizioni non siano rispettate, il costruttore lancia rispettivamente una eccezione ErroreTarga o ErroreCilindrata.


Infine si scriva una funzione ricorsiva massimoCilindrata(veicoli) che dato un array di oggetti di tipo Veicolo calcoli la cilindrata 
massima dei motoveicoli a due ruote nell'array veicoli, nel caso in cui non siano presenti la funzione restituisce undefined.



Nota: Si organizzino le classi/eccezioni in modo da sfruttare l'ereditarietà.
*/

class ErroreTarga extends Error{}
class ErroreCilindrata extends Error{}

class Veicolo {
    constructor(m,t) {
        this.modello = m;
        this.targa = t
    }
}
class Automobile extends Veicolo{
    constructor(modello,targa) {        
        if(targa.length === 7) super(modello,targa)
        else throw new ErroreTarga("la targa di un'automobile deve avere 7 caratteri")
        
    }
}

class Motoveicolo extends Veicolo{
    constructor(modello,targa,cilindrata) {    
        
        if(targa.length === 4) super(modello,targa)
        else throw new ErroreTarga("la targa di un motoveicolo deve avere 4 caratteri")
        this.cilindrata = cilindrata
    }
}

class Motociclo extends Motoveicolo{
    constructor(modello,targa,cilindrata) {        
        if(cilindrata > 50) super(modello,targa,cilindrata)
        else throw new ErroreCilindrata("la cilindrata deve esser > di 50")

    }
}

class Ciclomotore extends Motoveicolo {
    constructor(modello,targa,cilindrata) {        
        if(cilindrata > 0 && cilindrata <= 50) super(modello,targa,cilindrata)
        else throw new ErroreCilindrata("la cilindrata deve esser <= di 50")

    }

}

//Infine si scriva una funzione ricorsiva massimoCilindrata(veicoli) che dato un array di oggetti di tipo Veicolo calcoli la cilindrata 
//massima dei motoveicoli a due ruote nell'array veicoli, nel caso in cui non siano presenti la funzione restituisce undefined.


function  massimoCilindrata(veicoli) {
    let res = -Infinity
    for(let v of veicoli){
        if(v instanceof Motoveicolo){
            if(v.cilindrata > res)  res = v.cilindrata
        }
    }
    if(res === -Infinity) return undefined;
    else return res
}

let c = new Ciclomotore("ciao", "r2d2", 40)
let m = new Motociclo("Desmosedici", "c3po", 1000)
let f = new Automobile("Ferrari Testarossa", "AA123BB")

console.log(massimoCilindrata([m, f, c]) )//-> 1000