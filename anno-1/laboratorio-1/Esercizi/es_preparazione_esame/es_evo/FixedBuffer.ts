/*

Si scriva una classe TypeScript FixedBuffer con il seguente comportamento:

la classe implementa un buffer di lunghezza fissata (al momento della costruzione), n
la classe memorizza al più n valori, tutti dello stesso tipo (con controllo dei tipi statico)
La classe implementa, oltre al costruttore, i seguenti metodi:

put() che ha come argomenti un numero qualunque di valori del tipo degli elementi, 
e li aggiunge in coda al buffer (fino a capienza, n); i tentati di inserire elementi oltre il limite della capienza vengono ignorati

get() che estrae dalla cima del buffer un elemento e lo restituisce

peek() che restituisce l'elemento in cima al buffer, senza estrarlo

clear() che svuota il buffer


Come sempre, abbiate cura di annotare i tipi nella maniera più precisa possibile.
*/
class FixedBuffer<T> {
    buffer : T[];
    max_l: number;
    
    constructor(n:number) {
        this.buffer = [];
        this.max_l = n;
    }

    public put(...args : T[]) : void {
        for(let element of args) {
            if(this.buffer.length +1 > this.max_l) break;
            else{
                this.buffer.push(element);
            }
        }
    }

    public get() : T | undefined {
        return this.buffer.shift();
    }

    public peek ()  : T | undefined {
        return this.buffer[0]
    }

    public clear() : void {
        this.buffer = [];
    }

}