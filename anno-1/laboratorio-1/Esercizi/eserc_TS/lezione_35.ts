/* NUMERI: si scriva una classe Rational per rappresentare i numeri razionali, ovvero con numeratore (num) e denominatore (den). 
Si definisca un nuovo tipo "num" per numeri "normali" (number) o Rational.  

Infine si definisca una classe Complex per i numeri complessi, ovvero con parte reale (real) e immaginaria (imm), entrambi di tipo num.

Il costruttore di Complex accetta due parametri: se il primo argomento è di tipo Complex allora inizializza i campi real 
e imm usando quelli del primo argomento. Se il primo argomento è di tipo num, allora guarda al secondo argomento (sempre di tipo num) 
per la parte immaginaria (e il primo argomento viene usato per quella reale). */

class Rational {
    public num : number;
    public den : number;
    constructor(num:number,den:number) {
        this.num = num;
        this.den = den;
    }
}

type num = number | Rational;

class Complex {
    public real : num;
    public imm : num;

    constructor(real_o_c : num | Complex, imm : num = 0) {
        
        if(real_o_c instanceof Complex){
            this.real = real_o_c.real;
            this.imm = real_o_c.imm
        }
        else{
            this.real = real_o_c;
            this.imm = imm;
        }
    }
}


/*ESAMI: si scriva un'interfaccia Esame, che prevede un campo "codice" (numerico) e uno nome (stringa). 
Si scrivano due classi, EsameTriennale ed EsameMagistrale che implementano Esame. 

Si scriva poi una funzione "filtra" che prenda come argomento un array di Esame e restituisca in uscita un nuovo array 
che contiene quegli elementi dell'array argomento che sono Esami Magistrali (filtrando gli Esami Triennali).*/

interface Esame{
    codice : number;
    nome : string;
}

class EsameTriennale implements Esame {
    public codice : number;
    public nome : string;

    constructor(c : number, n : string) {
        this.codice = c;
        this.nome = n;
    }
}

class EsameMagistrale implements Esame {
    public codice : number;
    public nome : string;

    constructor(c : number, n : string) {
        this.codice = c;
        this.nome = n;
    }
}

var filtra = (arr : Esame[]) : EsameMagistrale[] => {
    let res : Esame[] = [];
    for(let esame of arr){  
        if(esame instanceof EsameMagistrale) res.push(esame)
    }
    return res;
}

/* NODO - Si scriva un'interfaccia che definisca un tipo Nodo, che implementa un elemento di una lista connessa bi-direzionale. 
Una lista connessa permette lo scorrimento in avanti al prossimo elemento (con il campo next), 
e indietro all'elemento precendente (con il campo prev). 
L'elemento deve avere un campo value che contiene il valore memorizzato (un intero).*/

interface Nodo {
    value : number;
    next : Nodo | null;
    prev : Nodo | null;
}

/* CODA BIDIREZIONALE - Si crei una classe CodaB che implementa una lista bidirezionale di elementi di tipo Nodo. 
La classe include chiavi head e tail per memorizzare il nodo di testa e di coda. 
In più si preveda un campo dimensione la cui natura è ovvia.
Il costruttore della classe deve creare una lista vuota (quindi si tratti adeguatamente il caso di coda vuota!).

Si implementino i seguenti metodi:
-  enqueue(nuovoNodo) -> inserisce nuovo nodo in testa e restituisce in uscita la nuova dimensione.
- dequeue() -> elimina l'elemento in coda e restituisce la nuova dimensione della coda (-1 se vuota)
-  enqueueT(nuovoNodo) -> come enqueue ma inserisce nuovo nodo in coda
- size() -> restituisce la dimensione attuale della coda
- print() -> restituisce la stringa dei valori memorizzati negli elementi della coda, ordinati dalla testa alla coda e separati da spazi.
 */

class CodaB{
    public lista : Nodo[];
    public head : Nodo | null;
    public tail : Nodo | null;

    public dimensione : number = 0;

    constructor() {
        this.lista = [];
        this.head = null;
        this.tail = null;
    }

    public aggiorna_testa_e_coda(): void {
        // aggiorno nodo in coda e nodo in testa : 
        this.head = this.lista[0];
        this.head = this.lista[this.lista.length - 1];
    }

    public enqueue(nuovoNodo : Nodo) : number {
        this.lista.unshift(nuovoNodo);
        this.dimensione += 1;
        // aggiorno nodo in coda e nodo in testa : 
        this.aggiorna_testa_e_coda()

        return this.dimensione;
    }

    public dequeue() : number {
        if(this.dimensione > 0) this.lista.pop();
        this.dimensione -= 1;
        // aggiorno nodo in coda e nodo in testa : 
        this.aggiorna_testa_e_coda()

        return this.dimensione;
    }

    public enqueueT(nuovoNodo: Nodo) : number {
        this.lista.push(nuovoNodo);
        this.dimensione += 1;
        // aggiorno nodo in coda e nodo in testa : 
        this.aggiorna_testa_e_coda()

        return this.dimensione;
    }

    public size() : number {return this.dimensione}

    public print() : string {
        let res : string = ""
        for(let element of this.lista){ // scorre dalla testa alla coda 
            res += element.value
            res += " "
        }

        return res;
    }//-> restituisce la stringa dei valori memorizzati negli elementi della coda, ordinati dalla testa alla coda e separati da spazi.

}