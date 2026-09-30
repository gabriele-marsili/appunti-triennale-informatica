/*
Si scriva in TS una struttura dati generica DrunkenList<T> 
che implementi una linked list (lista collegata) 
su degli oggetti generici di tipo Nodo<T>.

La classe DrunkenList<T> 
prevede un costruttore senza argomenti 
per inizializzare una lista vuota, una proprietà length contenente 
il numero di elementi della lista, ed espone le seguenti operazioni:

push che prende come argomento un oggetto di tipo T e lo inserisce in 
testa se la lista contiene un numero pari di elementi, sia in testa che in 
coda se contiene un numero dispari.

pop che rimuove e ritorna l'elemento in testa alla lista se questa ha un numero dispari di elementi, 
l'elemento in coda se invece la lunghezza è pari. 
Nel caso la lista sia vuota, la funzione lancia un’eccezione 
con tipo ReferenceError (non la dovete ridefinire voi).

as_array che restituisce il contenuto della lista sotto forma di array.


La soluzione deve essere scritta in TypeScript, tenendo conto della corretta dichiarazione dei tipi in 
ingresso ed in uscita dei metodi (e non usando any o unknown).

Nota: la lista deve essere implementata in modo collegato (linked).

Per l'implementazione della classe Nodo<T>, si faccia riferimento al seguente snippet (da copiare nel vostro codice):

class Nodo<T> {
    value: T;
    next: Nodo<T> | undefined;
    prec: Nodo<T> | undefined;

    constructor(value: T){
        this.value = value;
        this.next = undefined;
        this.prec = undefined;
    }
}
*/

class Nodo<T> {
    value: T;
    next: Nodo<T> | undefined;
    prec: Nodo<T> | undefined;

    constructor(value: T){
        this.value = value;
        this.next = undefined;
        this.prec = undefined;
    }
}



class DrunkenList<T> {
    node_list: Nodo<T>[];
    length : number;

    constructor() {
        this.node_list = [];
        this.length = this.node_list.length; // => 0
    }


    public push(node: Nodo<T>): void {
        if(this.length % 2 ===0){
            this.length++;
            this.node_list.splice(0,0,node);
        }
        else{
            this.length=+2;
            this.node_list.splice(0,0,node);
            this.node_list.push(node);
        }
    }

    public pop(): Nodo<T>{
        if (this.length==0) throw new ReferenceError("You must have at least one element to pop")
    
        if(this.length % 2 ===0){
            this.length--;
            let last_e:Nodo<T> = this.node_list[this.length-1];
            this.node_list.pop();
            return last_e;
        }
        else{
            this.length--;
            let first_e:Nodo<T> = this.node_list[0];
            this.node_list.splice(0,1);
            return first_e;            
        }
    }   


    public as_array():Nodo<T>[]{
        return this.node_list
    }
}