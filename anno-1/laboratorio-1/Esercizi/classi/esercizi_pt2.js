class PuntoCartesiano {
    constructor(coordinate) { // coordinate = array : ex => [x,y]
        this.p = coordinate
            /*  
            fattibile anche con coordinate dirette :
            constructor(x,y){
                this.x = x;
                this.y = y
            }
            */
    }

    //metodi: 


    dist(q) { // q punto   = array : ex => [x,y] 
        if (this.p.lenght != 2) return undefined
        return distanza = Math.sqrt(Math.pow(this.p[0] - q[0], 2) + Math.pow(this.p[1] - q[1], 2))

    }

    translate(q) {
        if (this.p.lenght != 2) return undefined

        this.p[0] = this.p[0] + q[0];
        this.p[1] = this.p[1] + q[1];
        return this.p
    }

    zero() {
        if (this.p.lenght != 2) return undefined

        this.p[0] = 0
        this.p[1] = 0
        return this.p
    }
}


class Cineteca {
    constructor() {
        this.insieme_film = []
    }


    // metodi:

    add(titolo, regista, anno) {

        var film = {
            titolo: titolo, // univoco 
            regista: regista,
            annoUscita: anno,
            volteVisto: 0,
        }

        this.insieme_film.push(film);
        return this.insieme_film.length
    }

    remove(titolo) {
        if (this.insieme_film.length < 1) return 0

        for (let i = 0; i < this.insieme_film.length; i++) {
            if (this.insieme_film[i].titolo == titolo) {
                this.insieme_film.splice(i, 1); // remove film in base a titolo 
            }
        }

        return this.insieme_film.length
    }

    count() {
        return this.insieme_film.length
    }

    vedi(titolo) {
        if (this.insieme_film.length < 1) return undefined;

        for (let i = 0; i < this.insieme_film.length; i++) {
            if (this.insieme_film[i].titolo == titolo) {
                this.insieme_film[i].volteVisto += 1 // incrementa visulazzazioni
                return this.insieme_film[i].volteVisto
            }
        }
        return -1 // for finito => non è stato trovato il film => ritorno -1 


    }

    /*
    Se il film è presente, incrementa di uno il suo numero di
    visualizzazioni e restituisce il numero di visualizzazioni totale; altrimenti, restituisce -1.
    */
}
/*
c = new Cineteca();
console.log(c.add("Il Signore degli Anelli", "Peter Jackson", 2001)) //-> 1
console.log(c.add("Guida galattica per autostoppisti", "Garth Jennings", 2005)) //-> 2
console.log(c.vedi("Il Signore degli Anelli")) //-> 1
console.log(c.vedi("Il Signore degli Anelli")) //-> 2
console.log(c.add("Spaceballs", "Mel Brooks", 1987)) //-> 3
console.log(c.remove("Il nome della rosa")) //-> 3
console.log(c.count()) //-> 3

 */


class Collezione {
    constructor() {
        this.dati = [];
    }

    //metodi:

    occurrences(o) {
        if (this.dati.length < 1) return undefined

        number_occurrences = 0
        for (let i = 0; i < this.dati.length; i++) {
            if (this.dati[i] === o) number_occurrences += 1; // incremento n occorenze 
        }
        return number_occurrences;
    }

    len() { return this.dati.length; }

    isEmpty() { return this.dati.length == 0 ? true : false; }

}

class Coda extends Collezione {
    add(o) {
        this.dati.unshift(o); // aggiunge in cima 
    }

    remove() {
        if (this.dati.length < 1) return undefined

        return this.dati.pop() // elimina dal fondo (primo inserio = primo eliminato - FIFO) 
    }
}



class Pila extends Collezione {
    add(o) {
        this.dati.unshift(o); // aggiunge in cima 
    }

    remove() {
        if (this.dati.length < 1) return undefined

        return this.dati.shift() // elimina dalla cima (ultimo inserio = primo eliminato - LIFO) 
    }
}


function mediaCollezioni(arr_collezioni) {

    let sum = 0
    for (let i = 0; i < arr_collezioni.length; i++) {
        console.log(arr_collezioni[i])
        sum = sum + arr_collezioni[i].len()
    }

    return sum / arr_collezioni.length // => media 
}

/*
c = new Coda()
c.add(1)
c.add(2)
c.add(3)
console.log(c.remove()) //-> 1
p = new Pila()
p.add(1)
p.add(2)
p.add(3)
console.log(p.remove()) //-> 3
console.log(p.remove()) //-> 2
console.log(mediaCollezioni([c, p])) //-> 1.5
*/




class Canino {
    constructor(name, età) {
        this.animal = {
            nome: name,
            età: età,
            num_actios: 0
        }
    }

    //metodi:

    bevi() {
        this.animal.num_actios += 1 // incrementa il numero di azioni dell'animale
            //console.log("bevi => " + this.animal.num_actios)
    }

    mangia() {
        this.animal.num_actios += 1 // incrementa il numero di azioni dell'animale 
    }
}


class Lupo extends Canino {

    //metodi:
    ulula() {
        this.animal.num_actios += 1 // incrementa il numero di azioni dell'animale 

    }
}

class Cane extends Canino {

    //metodi:
    abbaia() {
        this.animal.num_actios += 1 // incrementa il numero di azioni dell'animale 

    }
}


class Pitbull extends Cane {

}


class Labrador extends Cane {

}


function contaAzioni(lista_animali, riferimento_classe) {
    if (lista_animali.length < 1) return undefined
    let sum = 0;

    for (let i = 0; i < lista_animali.length; i++) {
        if (lista_animali[i] instanceof riferimento_classe) {
            //console.log("animale.num_actios " + lista_animali[i].animal.num_actios)
            sum = sum + lista_animali[i].animal.num_actios
        }
    }

    return sum;
}


p = new Pitbull("Fido", 2);
l = new Labrador("Britta", 3);
w = new Lupo("Pippo", 5);
p.abbaia()
p.mangia()
l.bevi()
w.mangia()
w.ulula()
console.log(contaAzioni([p, l, w], Cane)) //-> 3