/*Si scriva una classe Collezione che rappresenta una struttura dati astratta. 
Oltre alcostruttore, la classe deve definire i metodi:

• occurrences(o) che restituisce il numero di occorrenze di o.

• len() che restituisce il numero di elementi presenti nella struttura dati.

• isEmpty() che restituisce true se la struttura dati è vuota, false altrimenti.

Infine si specializzino le classi Coda e Pila che implementano i metodi:

• add(o) che aggiunge l’elemento alla collezione.

• remove() che rimuove l’elemento dalla collezione e lo restituisce.

Nel caso di Coda l’elemento rimosso è il primo inserito (FIFO), mentre nel caso di Pila
l’elemento rimosso è l’ultimo inserito (LIFO). Si definisca infine una funzione
mediaCollezioni che data una lista di collezioni restituisce la loro lunghezza media,
indipendentemente dall’implementazione. */

class Collezione {
    constructor() {
        this.collection = [];
    }

    occurrences(o) {
        let c = 0;
        for (let el of this.collection) {
            if (el === o) c++;
        }
        return c;
    }

    len() {
        return this.collection.length;
    }

    isEmpty() {
        return this.len() === 0;
    }
}

class Coda extends Collezione {
    constructor(...args) {
        super(...args);
    }

    add(o) {
        return this.collection.push(o);
    }

    remove() {
        return this.collection.shift();
    }
}

/*
Si definisca infine una funzione
mediaCollezioni che data una lista di collezioni restituisce la loro lunghezza media,
indipendentemente dall’implementazione. */

class Pila extends Coda {
    constructor(...args) {
        super(...args);
    }

    remove() {
        return this.collection.pop();
    }

}

var mediaCollezioni = (lista_collezioni) => {
    if (lista_collezioni.length === 0) return undefined;

    let sum = 0;
    for (let collection of lista_collezioni) {

        sum += collection.len()
    }
    return (sum / lista_collezioni.length);
}

c = new Coda()
c.add(1)
c.add(2)
c.add(3)
console.log(c.remove()) //->1
p = new Pila()
p.add(1)
p.add(2)
p.add(3)
p.add(4)
console.log(p.remove()) //->3
console.log(p.remove()) //->2
console.log(c.collection, p.collection)
console.log(mediaCollezioni([c, p])) //->2