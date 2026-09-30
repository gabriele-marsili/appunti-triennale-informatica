/*
Si riproduca la tassonomia in figura come una gerarchia di
classi. 
Ogni classe dovrà implementare almeno un costruttore,
che dato il nome e l’età dell’animale costruisce l’oggetto.

Inoltre, definire nelle classi appropriate i metodi: 
abbaia,
bevi, 
mangia, 
ulula. 

Ognuno di questi aggiorna lo stato
interno dell’animale, incrementando un contatore
num_actions che indica il numero di azioni eseguite.

Si scriva infine una funzione contaAzioni, che data una lista
di animali e un riferimento a una classe, restituisce la somma
del numero di azioni compiute dagli animali istanza della
classe.
 */

class Canino {
    constructor(n, e) {
        this.animale = {
            nome: n,
            età: e,
            num_actions: 0
        }
    }
    bevi() {
        this.animale.num_actions++;
    }

    mangia() {
        this.animale.num_actions++;
    }
}

class Lupo extends Canino {
    constructor(...args) {
        super(...args)
    }

    ulula() {
        this.animale.num_actions++;
    }
}

class Cane extends Canino {
    constructor(...args) {
        super(...args)
    }

    abbaia() {
        this.animale.num_actions++;
    }
}


class Pitbull extends Cane {
    constructor(...args) {
        super(...args)
    }
}

class Labrador extends Cane {
    constructor(...args) {
        super(...args)
    }
}

var contaAzioni = (lista_animali, riferimento) => {
    if (lista_animali.length === 0) return undefined;
    let s = 0;
    for (let a of lista_animali) {
        if (a instanceof riferimento) {
            s += a.animale.num_actions
        }
    }
    return s
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