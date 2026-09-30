class Nodo<T>{
    value:T;
    next:Nodo<T> | undefined;
    prec:Nodo<T> | undefined;

    constructor(value:T) {
        this.value = value;
        this.next = undefined;
        this.prec = undefined;
    }
}

class DrunkenList<T>{
    public length : number 
    public head : Nodo<T> | undefined
    public tail : Nodo<T> | undefined
    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    public push(obj:T) {
        let node : Nodo<T> = new Nodo<T>(obj);
        if(this.head) { // => testa già presente            
            this.head.prec = node // => lista linked : inserisco il nuovo nodo (nuova testa) come precedente della vecchia testa
            node.next = this.head // => il successivo del nodo appena inserito in testa è la precedente testa
            this.head.prec = node // => riaggiorno poiché ora node ha next (che prima non aveva)
            this.head = node // inserisco il nodo come testa
            this.length ++ // incremento la lunghezza
        }
        else{ // => testa era undefined
            this.head = node // aggiorno testa
        }

        if(this.length != 0 && this.length % 2 != 0){ // inserimento anche in coda
            if(this.tail){ // => coda già presente
                this.tail.next = node // => lista linked : inserisco il nuovo nodo (nuova coda) come successivo della vecchia coda
                node.prec = this.tail // => il successivo del nodo appena inserito in testa è la precedente testa
                this.head.prec = node // => riaggiorno poiché ora node ha next (che prima non aveva)
                this.head = node // inserisco il nodo come testa
                this.length ++ // incremento la lunghezza
            }   
            else{ // => coda era undefined
                this.tail = node // aggiorno testa
            }
            
        }
        
    }



}