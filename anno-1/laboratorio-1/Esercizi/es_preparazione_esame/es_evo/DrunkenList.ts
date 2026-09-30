/*
Si scriva in TS una struttura dati generica DrunkenList<T> che implementi una linked list (lista collegata) su degli 
oggetti generici di tipo Nodo<T>.

La classe DrunkenList<T> prevede un costruttore senza argomenti per inizializzare una lista vuota, una proprietà length contenente il 
numero di elementi della lista, ed espone le seguenti operazioni:

pop che rimuove e ritorna l'elemento in testa alla lista se questa ha un numero dispari di elementi, l'elemento in coda se invece la 
lunghezza è pari. Nel caso la lista sia vuota, la funzione lancia un’eccezione con tipo ReferenceError (non la dovete ridefinire voi).

as_array che restituisce il contenuto della lista sotto forma di array.


Nota: la lista deve essere implementata in modo collegato (linked).

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
    //public list :  Nodo<T>[];
    public length :number;
    public head : Nodo<T> | undefined;
    public tail : Nodo<T> | undefined;
    
    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    public push(obj : T) : void {
        console.log("initial length = ", this.length)
        let nodo : Nodo<T> = new Nodo(obj);
           
        //aggiungo in cima: (SEMPRE)
        if(this.head) {
            
            this.head.prec = nodo
            nodo.next = this.head
            nodo.prec = undefined
            this.head.prec = nodo
            if(this.head.next == undefined){this.tail = this.head}

            
        }
        this.head = nodo // => cambio la testa
        
          

        
        if(this.length % 2 != 0 && this.length != 0){ // aggiungo in cima e in fondo
            //aggiungo in fondo:
            let nodo_fondo : Nodo<T> = new Nodo(obj); 
            if(this.tail) {
                this.tail.next = nodo_fondo
                nodo_fondo.prec = this.tail
                nodo_fondo.next = undefined
                this.tail.next = nodo_fondo
                
            }
            this.tail = nodo_fondo // => cambio la coda
            this.length ++  
        }      
        
              
        this.length += 1 
        console.log("new length = ", this.length)
        console.log("new head = ", this.head)
      
        
    }

    public pop() :  T | undefined {
        if(this.length === 0){throw new ReferenceError("Empty list")}
        else{
            
            if(this.length % 2 !=0){  // => remove first element
                let new_head : Nodo<T> | undefined = this.head?.next  
                let current_head : Nodo<T> | undefined = this.head
                if(new_head){
                    new_head.prec = undefined // => delete current head from new head. prec
                    this.head = new_head
                }
                else {
                    this.head = undefined
                }

                this.length -= 1 
                console.log("new length = ", this.length)

                if(current_head) return current_head.value
                else return undefined
            }
            else{// => remove last element
                let new_tail : Nodo<T> | undefined = this.tail?.prec  
                let current_tail : Nodo<T> | undefined = this.tail
                if(new_tail){
                    new_tail.next = undefined // => delete current tail from new tail. next
                    this.tail = new_tail
                }
                else {
                    this.tail = undefined
                }

                this.length -= 1 
                console.log("new length = ", this.length)
                
                if(current_tail) return current_tail.value
                else return undefined
                
            }
            
            
            

        }
        
       
    }

    public as_array():T[]{
        let current_node : Nodo<T> | undefined = this.head;
        let res: T[] = [];

        while(current_node != undefined) {
          console.log("current_node = ", current_node)
          
            res.push(current_node.value);
            current_node = current_node.next;
        }

        return res;

    }

}



let list = new DrunkenList<string>();
list.push('a'); // length == 0 => aggiungo solo in testa (pari) => [a]
list.push('b'); // length == 1 => aggiungo sia in testa che in coda (dispari) => [b,a,b]
list.pop(); // length == 3 => rimuovo in testa => [a,b]
list.push('c'); // length == 2 => aggiungo solo in testa (pari) => [c,a,b] 
list.push('k'); //  length == 3 => aggiungo sia in testa che in coda (dispari) => [k c a b k] 
console.log(list.as_array()) // => , ['k','c','a','b','k']
