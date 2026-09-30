// come sfruttare i generics per implementare un albero binario di ricerca riutilizzabile (per diversi tipi di dato)

//ABR implementa le funzioni principali:

class NodoABR <T> {
    value: T ;
    left: NodoABR<T> | null;
    right: NodoABR<T> | null;

    constructor(v:T){
        this.value = v
        this.left = null;
        this.right =  null; 
    }

    print():T{
        return this.value;
        //stampa
    }
}


class ABR <T> {
    root: NodoABR<T>;

    constructor(v:T){
        this.root = new NodoABR<T>(v); // => assegna il valore alla radice
    }

    //parametri search = valore da cercare ed il nodo da cui partire a cercare
    search(v:T,x:NodoABR<T> | null): NodoABR<T> | null {
        if(x == null || x.value == v){
            return x;
        }

        if(x.value <v){
            return this.search (v,x.left);
        }
        else return this.search (v,x.right);
    }

    searchMin(x:NodoABR<T> = this.root): NodoABR<T>{
        let temp = x ;

        while(temp.left != null){
            temp = temp.left
        }
        return temp;
    }

    searchMax(x:NodoABR<T> = this.root): NodoABR<T>{
        let temp = x ;

        while(temp.right != null){
            temp = temp.right
        }
        return temp;
    }

    insert(z:NodoABR<T>):void{
        let y : NodoABR<T> | null = null;
        let x : NodoABR<T> | null = this.root;

        while(x != null){
            y = x;
            if (z.value < x.value){
                x = x.left;
            }
            else x  = x.right;
        }
        // => alla fine del while  ho l'ultmo nodo visitato o null se ho finito

        if(y == null){
            this.root = z;
        } else{
            if(z.value < y.value){
                y.left = z
            }else y.right = z
        }        
    }

    printOrd(x: NodoABR<T> | null): void { //sfrutta la struttura dell'albero di ricerca con una visita simmetrica
        let temp = x;
        if (temp != null) {
          this.printOrd(temp.left);
          console.log(temp.value);
          this.printOrd(temp.right);
        }
    }
}

//TEST:

var alb = new ABR<number>(5);
var zz = new NodoABR<number>(21);
alb.insert(zz);
alb.insert(new NodoABR<number>(42));
alb.insert(new NodoABR<number>(1));
alb.insert(new NodoABR<number>(-1));
alb.insert(new NodoABR<number>(22));


console.log(alb.root.print());
console.log("min: ", alb.searchMin());
console.log("max: ", alb.searchMax());

alb.printOrd(alb.root);

// TEST 2 : - albero di stringhe:

var alb2 = new ABR("soldani");
alb2.insert(new NodoABR("malizia"));
alb2.insert(new NodoABR("prencipe"));
alb2.insert(new NodoABR("bacciu"));

console.log(alb2.root.print());
console.log("min: ", alb2.searchMin());
console.log("max: ", alb2.searchMax());

alb2.printOrd(alb2.root);


