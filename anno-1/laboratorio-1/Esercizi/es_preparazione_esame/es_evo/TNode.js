/*

Si scriva in JavaScript una classe TNode che implementi un nodo di un albero, con le seguenti caratteristiche:

ogni nodo ha un campo valore, di tipo qualunque, una etichetta (una stringa) e un numero qualunque di figli
il costruttore ha come argomenti il valore e l'etichetta, che per default è vuota
ogni nodo ha un metodo add() che prende come argomenti un numero qualunque di altri TNode, che diventano figli del nodo
ogni nodo ha un generatore visit() che restituisce, in pre-order (ovvero: visitando prima il padre, poi i figli nell'ordine 
in cui sono stati aggiunti) tutti i valori dei nodi del sottoalbero radicato nel nodo, uno alla volta


Si scriva poi una classe BNode che estende TNode in modo che sia possibile aggiungere a un nodo al più due figli (quindi, è un nodo binario).
Il tentativo di aggiungere più di due figli deve lanciare una eccezione di tipo BadTreeError (che dovrete definire nel vostro codice). 
NOTA: Non è detto che i figli di un nodo binario siano a loro volta nodi binari

*/
class BadTreeError extends Error {};

class TNode {
   
    constructor(val, label = "") {
        this.valore = val;
        this.etichetta = label; // di default è vuota
        this.figli = [];
    }

    add(...args) {
        //console.log(args)
        for (let f of args) {
            this.figli.push(f);
        }
    }

    *
    visit() {
        /*
        yield this.valore
        for (let n of this.figli) {
            for (let v of n.visit()) {
                yield v
            }
        }
        return;
        */
        //console.log(this.figli.length)
        yield this.valore

        if (this.figli.length != 0) {
            //console.log(this.figli)
            for (let figlio of this.figli) {
                //console.log(figlio)
                //console.log(figlio.valore)
                if (figlio != undefined) {
                    yield figlio.valore
                    if (figlio.figli != undefined) {
                        if (figlio.figli.length != 0) {
                            let f_res = [...figlio.visit()]
                                //console.log(f_res)
                            for (let j = 1; j < f_res.length; j++) {
                                yield f_res[j];
                            }


                        }
                    }
                }
            }
        }


    }
}

class BNode extends TNode {
    constructor(...args) {
        super(...args)
    }

    add(...args) {

        if (this.figli.length + args.length > 2) {
            throw new BadTreeError("too much nodes")
        }
        else {
            let i = 0
            while (this.figli.length <= 2) {
                this.figli.push(args[i])
                i++
                //arr_nodi.shift()
            }
            if (args.length > i) { //if (arr_nodi.length != 0) {
                let ar = [];
                for (i; i < args.length; i++) {
                    ar.push(args[i]);
                }
                if (this.figli[0] instanceof BNode && this.figli[0].figli.length >= 2) {
                    this.figli[1].add(ar)
                } else this.figli[0].add(ar)
            }
        }
    }
}

const n0 = new TNode(0, "radice"),
    n1 = new TNode(1, "sx"),
    n11 = new TNode(11),
    n12 = new TNode(12),
    n2 = new TNode(2, "centro"),
    n3 = new TNode(3, "dx"),
    n31 = new TNode(31),
    n32 = new TNode(32),
    n33 = new TNode(33),
    n34 = new TNode(34),
    n341 = new TNode(341, "nipotino")

n0.add(n1, n2, n3)
n1.add(n11, n12)
n3.add(n31, n32, n33)
n34.add(n341)
n3.add(n34)

const b21 = new BNode(21, "binario 1")
const b22 = new BNode(22, "binario 2")
const b221 = new TNode(221)
const b222 = new BNode(222)
const b223 = new TNode(223)

n2.add(b21, b22)
b22.add(b221)
b22.add(b222)

const rg = [...n0.visit()]
console.log(rg[7]) //221
console.log(rg[14]) //341

console.log(() => b22.add(b223))


/*soluzione:
class TNode {
    constructor(val,label="") {
        this.val=val
        this.label=label
        this.children=[]
    }
    add(...children) {
        this.children.push(...children)
    }
    *visit() {
        yield this.val
        for (var c of this.children) {
            for (var v of c.visit())
                yield v
        }
        return
    }
}

class BadTreeError extends Error {}

class BNode extends TNode {
    add(...children) {
        if (this.children.length+children.length >2)
            throw new BadTreeError("Not binary")
        else
            super.add(...children)
    }
}
*/