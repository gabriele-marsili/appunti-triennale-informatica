/**
 * 
 * Si progetti una classe Cineteca rappresentante un insieme di film. 

Ogni film è un
oggetto avente i seguenti attributi: titolo, regista, annoUscita, volteVisto.

Si può assumere che il titolo rappresenti univocamente un film, ossia che non esistono due film diversi aventi lo stesso titolo.

• c.add(titolo, regista, anno) Il metodo aggiunge il film alla cineteca e
restituisce il numero totale dopo l’aggiunta.

• c.remove(titolo) Il metodo rimuove il film, se presente, e restituisce il numero di
film dopo l’operazione. Il numero va comunque restituito anche in caso non sia
possibile rimuovere alcun film)

• c.count() Numero di film presenti nella cineteca.

• c.vedi(titolo) Se il film è presente, incrementa di uno il suo numero di
visualizzazioni e restituisce il numero di visualizzazioni totale; altrimenti, restituisce -1.

 */

class Cineteca {
    constructor() {
        this.insiemeFilm = []
    }

    count() { return this.insiemeFilm.length }

    add(t, r, a) {
        let film = {
            titolo: t,
            regista: r,
            annoUscita: a,
            volteVisto: 0
        }

        if (!(this.insiemeFilm.includes(film))) this.insiemeFilm.push(film);
        return this.count()
    }

    remove(titolo) {
        for (let film of this.insiemeFilm) {
            if (film.titolo === titolo) {
                this.insiemeFilm.splice(this.insiemeFilm.indexOf(film), 1)
            }
        }

        return this.count();
    }

    vedi(titolo) {
        for (let film of this.insiemeFilm) {
            if (film.titolo === titolo) {
                film.volteVisto++;
                return film.volteVisto
            }
        }
        return -1
    }

}



//esempio:
c = new Cineteca();
console.log(c.add("Il Signore degli Anelli", "Peter Jackson", 2001)) ////-> 1
console.log(c.add("Guida galattica per autostoppisti", "Garth Jennings", 2005)) //-> 2
console.log(c.vedi("Il Signore degli Anelli")) //-> 1
console.log(c.vedi("Il Signore degli Anelli")) //-> 2
console.log(c.add("Spaceballs", "Mel Brooks", 1987)) //-> 3
console.log(c.remove("Il nome della rosa")) //-> 3
console.log(c.count()) //-> 3