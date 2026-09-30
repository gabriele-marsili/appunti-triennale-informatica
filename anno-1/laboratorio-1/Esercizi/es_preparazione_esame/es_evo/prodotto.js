/*
Si definisca la classe Prodotto per rappresentare prodotti di un supermercato. La classe fornisce i campi barcode (stringa) 
e prezzo (numerico). La classe definisce inoltre

un costruttore cui passare barcode e prezzo dell'oggetto rappresentato,
un metodo codice() che restituisce il barcode dell'oggetto,
un metodo netto() che restituisce il prezzo dell'oggetto, e
un metodo lordo() che restituisce il prezzo lordo dell'oggetto, calcolato maggiorando il prezzo con IVA del 22%.
Si definisca poi una classe ProdottoAlimentare che rappresenti prodotti alimentari, ridefinendo il metodo lordo() in modo da 
maggiorare il prezzo con IVA del 10%.

Infine, si definisca una funzione conto(a) che, dato un array a di prodotti, restituisce un oggetto contenente tre campi:

totale: prezzo totale dei prodotti acquistati;
iva10: somma delle maggiorazioni per IVA al 10% su prodotti alimentari;
iva22: somma delle maggiorazioni per IVA al 22% su prodotti non alimentari.
*/

class Prodotto{
    constructor(barcode,prezzo) {
        this.barcode = barcode;
        this.prezzo = prezzo;
    }

    codice(){
        return this.barcode
    }

    netto(){
        return this.prezzo
    }

    lordo(){
        return this.prezzo/100*122

    }
}

class ProdottoAlimentare extends Prodotto {
    constructor(...args){ 
        super(...args)
    }

    lordo(){
        return this.prezzo/100*110
    }
}

var conto = (a) => {
    let tot_p = 0;
    let iva_22 = 0;
    let iva_10 = 0;
    for(let product of a){
        if(product instanceof ProdottoAlimentare) iva_10 +=( product.lordo() - product.netto());
        else iva_22 += ( product.lordo() - product.netto());

        tot_p += product.lordo();
    }


    return {
        totale : tot_p,
        iva10 : iva_10,
        iva22 : iva_22
    }
}


let banana = new ProdottoAlimentare("b4n4n4",2)
let mela = new ProdottoAlimentare("m3l4",1)
let sapone = new Prodotto("s4p0n3",2)
let c = conto([banana, mela, sapone ])
console.log(c)
console.log(Math.abs(c.totale-5.74)<0.00001,true)
console.log(Math.abs(c.iva10-0.3)<0.00001,true)
console.log(Math.abs(c.iva22-0.44)<0.00001,true)
