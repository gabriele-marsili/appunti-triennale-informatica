/*
Si definisca una classe Solido che rappresenti un generico solido. 
A partire dalla classe Solido, si costruisca una gerarchia di classi che contenga le classi Parallelepipedo, Cubo e Sfera, 
in modo da consentire la rappresentazione dei solidi corrispondenti.
*/

class Solido {
    constructor(l) {
        this.l = l;
    }
}

class Parallelepipedo extends Solido {
    constructor(l, p, h) {
        super(l)
        this.p = p;
        this.h = h;
    }

    superficie() {
        // 2*(l+p)*h + 2*l*p
        return 2 * (this.l + this.p) * this.h + 2 * this.l * this.p
    }

    volume() {
        return this.l * this.p * this.h
    }
}

class Cubo extends Parallelepipedo {
    constructor(l) {
        super(l);
    }

    superficie() {
        return 6 * Math.pow(this.l, 2)
    }

    volume() {
        return Math.pow(this.l, 3)
    }
}

class Sfera extends Solido {
    constructor(l) {
        super(l); // raggio
    }

    superficie() {
        return 12.56 * Math.pow(this.l, 2)
    }

    volume() {
        var res = Math.pow(this.l, 3) * 4.19
        res = res.toFixed(2)
        return res
    }
}

var sommaVolumiParallelepipedi = (array_di_solidi) => {
    let res = 0
    for (let solido of array_di_solidi) {
        if (solido instanceof Parallelepipedo) {
            res += solido.volume()
        }
    }
    return res;
}