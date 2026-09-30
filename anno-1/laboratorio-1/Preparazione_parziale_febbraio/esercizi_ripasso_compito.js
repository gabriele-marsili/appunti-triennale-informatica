// txt esercitazione: https://drive.google.com/file/d/12PhVlHJL5ng3RuhsMxxlcIx792zFuJ7Z/view 

/*solidi: https://replit.com/@731AA2223LABIB/Solidi-GABRIELEMARSILI#index.js
classe solido => classe che definisce solido generico
*/

class Solido {}

class Parallelepipedo extends Solido {
    constructor(l, h, p) {
        super() // poiché Parallelepipedo estende Solido devo usare super (in questo caso vuoto)
        this.lunghezzza = l;
        this.altezza = h
        this.profondità = p;
    }

    // metodi:
    superficie() {
        var s = 2 * (this.lunghezzza + this.profondità) * this.altezza + 2 * this.lunghezzza * this.profondità
        return s
    }

    volume() {
        var v = this.lunghezzza * this.profondità * this.altezza
        return v
    }

}

class Cubo extends Parallelepipedo { // => cubo è un caso speciale di parallelepipedo 
    constructor(l) {
        super(l, l, l) // => lunghezza, altezza e profondità son tutti uguali nel cubo, per questo l,l,l con l passato come parametro al costruttore
    }

    // metodi presi da Parallelepipedo
}

class Sfera extends Solido {
    constructor(r) {
        super() // => poiché Sfera estende Solido devo usare super (in questo caso vuoto)
        this.raggio = r;
    }

    // metodi:
    superficie() {
        var s = 12.56 * this.raggio * this.raggio //  = 12.56 * (this.raggio ** 2) ** => elevamento a potenza (2)
        return s
    }

    volume() {
        var v = 4.19 * this.raggio * this.raggio * this.raggio //= 4.19 * (this.raggio ** 3)
        return v
    }

}



var sommaSuperficiParallelepipedi = (arr_solidi) => {
    let sum = 0
        //scorrere array => for of 

    for (ogg of arr_solidi) { // => ogg = arr_solidi[i]
        //let ogg = arr_solidi[i]
        //let prototipo = Object.getPrototypeOf(ogg)
        //console.log(prototipo)

        if (ogg instanceof Parallelepipedo && !(ogg instanceof Cubo)) {
            sum += ogg.superficie()
            console.log(sum)
        }
    }
    return sum
}




/*
var a = new Parallelepipedo(10, 10, 10)
var b = new Sfera(1, 2, 3)
var c = new Cubo(10, 10, 10)
var d = new Parallelepipedo(12, 11, 12)
var arr = [a, b, c, d]


sommaSuperficiParallelepipedi(arr)

*/



// ES GENERATORI :

//metodo babilonese => https://replit.com/@731AA2223LABIB/MetodoBabilonese-GABRIELEMARSILI


function* babylon(an) { // => dichiarazione funzione con * per denotare che + generatore 
    while (true) { // => ciclo infinito del generatore (si stoppa ad ogni "iterazione")
        yield an = an / 2 + 1 / an
    }
}

/*
var b = babylon(1)
for (var i = 1; i < 5; i++) {
    console.l(b.next())
}

var r = b.next()
console.log(r.next())
console.log(Math.abs(r.value-Math.sqrt(2)))
*/



//decadimento => https://replit.com/@731AA2223LABIB/Decadimento-GABRIELEMARSILI#index.js
function* decadimento(n, k) {
    var divisore = 1

    while (true) {
        yield(Math.round(n / divisore))
        divisore = divisore * k
    }
}

var num = decadimento(4, 2)
for (var i = 1; i < 5; i++) {
    console.log(num.next())
}



//ZeriUni => https://replit.com/@731AA2223LABIB/ZeriUni-GABRIELEMARSILI#index.js

// creo due classi di errori :
class NonIntegerError extends Error {}
class OutOfRangeError extends Error {}


var zeriuni = (n) => {
    var res = []

    if (n != parseInt(n)) throw new NonIntegerError("numero " + n + " inserito non intero \n inserisci numero intero!")
        // =   if (String(n).includes(".")) throw new NonIntegerError() //Number.isInteger()
    if (n < 0 || n >= 256) throw new OutOfRangeError("numero " + n + " inserito non codificabile in 8 bit")


    do { // => do - while sostituibile da for 
        let resto = n % 2
        n = Math.floor(n / 2) // approssimato per difetto 

        res.unshift(resto)
    } while (res.length < 8)

    return res


    // altro metodo (prof):  
    /*
    let bits = []
    let resto = n // inizializzo resto = al numero da codificare in 8 bits 
    for (let i = 0; i < 8; i++) { // => 8 volte poichè codifico in 8 bits 
        let div = 2 ** (7 - i) // => divisore = 2^(7-i) 
        bits[i] = (resto - (resto % div)) / div // => 1. : (200-(200 % 2^7)) /  2^7 -> (200 - 72) / 2^7 = 1
        resto = resto % div // => 1. : 200 % 2^7 -> 72
    }
    return bits
    */

}


//console.log(zeriuni(5))
//console.log(zeriuni(3.1))
//console.log(zeriuni(311))