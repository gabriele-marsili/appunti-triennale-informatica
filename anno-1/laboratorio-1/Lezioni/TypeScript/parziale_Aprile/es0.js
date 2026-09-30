class BadTreeError extends Error {}

class BNode {
    val = undefined;
    label = "";
    children = []; // array che contiene 2 figli del nodo 

    constructor(valore, etichetta) {
        this.val = valore; // tipo qualunque 
        this.label = etichetta; // str 
        this.children = this.children;
    }

    add(node) { // più di un nodo passabile come parametro 
        for (let i = 0; i < arguments.length; i++) {
            let node = arguments[i];
            if (this.children.length == 2) throw new BadTreeError("Troppi figli")
            else {
                this.children.push(node)
            }
        }
    }


    *
    visit() {
        var i = 0
        yield this.val

        while (i < this.children.length) {
            //this.children[i].visit()
            //yield res.next().value
            //}    



            if (this.children.length > 0) {
                let res = this.children[0].visit()
                console.log("res = ", res)
                yield res.next().value
                if (this.children[0].children.length > 0) {
                    //let res_c = this.children[0].visit()
                    yield res.next().value
                }
                //yield this.children[0].val
                //yield this.children[0].visit()
                if (this.children.length > 1) {
                    let res2 = this.children[1].visit()
                    console.log("res 2 = ", res)

                    yield res2.next().value
                        //yield this.children[1].visit()
                }
            }
            i++
        }


    }


}