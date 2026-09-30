class ErroreTarga extends Error {}
class ErroreCilindrata extends Error {}




class Veicolo {
    constructor(modello, targa) { // modello e targa = stringhe 
        this.modello = modello;
        this.targa = this.check_targa(targa);
    }

    check_targa(t) {
        return t
    }

}

class Automobile extends Veicolo {
    constructor(modello, targa) {
        super(modello, targa);
    }

    // metodi:
    check_targa(t) {
        console.log(typeof(t))
        if (typeof(t) != "string") throw new ErroreTarga()
        else {
            console.log([...t])

            if ([...t].length != 7) throw new ErroreTarga()
            else return t
        }
    }

}

class Motoveicolo extends Veicolo {
    constructor(modello, targa, cilindrata) { // cilindrata = Int 
        super(modello, targa);
        this.cilindrata = this.check_cilindrata(cilindrata);
    }

    // metodi:
    check_targa(t) {
        console.log(typeof(t))
        if (typeof(t) != "string") throw new ErroreTarga()
        else {
            console.log([...t])

            if ([...t].length != 4) throw new ErroreTarga()
            else return t
        }
    }

    check_cilindrata(c) { return c }


}

class Motociclo extends Motoveicolo {
    constructor(modello, targa, cilindrata) { // cilindrata = Int 
        super(modello, targa, cilindrata);
    }

    check_cilindrata(c) {
        console.log(typeof(c))
        if (typeof(c) != "number" || String(c).includes(".")) throw new ErroreCilindrata()
        else {
            if (c <= 50) throw new ErroreCilindrata()
            else return c
        }
    }


}

class Ciclomotore extends Motoveicolo {
    constructor(modello, targa, cilindrata) { // cilindrata = Int 
        super(modello, targa, cilindrata);

    }

    check_cilindrata(c) {
        console.log(typeof(c))
        if (typeof(c) != "number" || String(c).includes(".")) throw new ErroreCilindrata()
        else {

            if (c <= 0 || c > 50) throw new ErroreCilindrata()
            else return c
        }
    }
}






function minimoCilindrata(veicoli) { //veicoli = arr di ogg di tipo veicolo    
    if (veicoli == []) {
        console.log("ritorno undefined veicoli.length == 0")
        return undefined
    }

    if (veicoli.length == 1) {
        console.log(veicoli)
        if (veicoli[0] instanceof Motociclo) {
            console.log("ritorno veicoli[0].cilindrata = " + veicoli[0].cilindrata)
            return veicoli[0].cilindrata
        } else {
            console.log("ritorno undefined")
            return undefined
        }
    }


    // veicoli.length > 1
    if (veicoli[0] instanceof Motoveicolo) {
        var sua_cilindrata = veicoli[0].cilindrata
        console.log("sua_cilindrata " + sua_cilindrata)



        if (veicoli[1] instanceof Motoveicolo && veicoli[1].cilindrata < sua_cilindrata) {
            veicoli.shift()
            console.log("nuovo veicoli = " + veicoli)

            minimoCilindrata(veicoli)
        } else {
            veicoli.pop()
            console.log("nuovo veicoli = " + veicoli)

            minimoCilindrata(veicoli)
        }





    } else { // => non motoveicolo 
        veicoli.shift() // => lo elimino 
        console.log("nuovo veicoli = " + veicoli)

        minimoCilindrata(veicoli)
    }
}





let c = new Ciclomotore("ciao", "r2d2", 40)
let m = new Motociclo("Desmosedici", "c3po", 1000)
let f = new Automobile("Ferrari Testarossa", "AA123BB")

console.log(minimoCilindrata([m, f, c]), 40)