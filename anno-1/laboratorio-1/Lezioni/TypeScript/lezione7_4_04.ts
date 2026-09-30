//ESERCITAZIONE:

/*
  Esercizio 0: Forme Geometriche
  ==============================

  Si definisca una interfaccia
  FormaGeometrica che rappresenti una
  generica forma geometrica. 
  
  Da questa, si
  derivino le classi 
  
  Quadrato
  Rettangolo
  Cerchio.

  Ognuna di queste classi dovrà
  implementare almeno:
    • Costruttore, che dati i parametri
      appropriati costruisce la forma
      geometrica.
    • area() che restituisce l’area della
      forma geometrica.
    • perimetro() che restituisce il
      perimetro della forma geometrica.

  Si scriva infine una funzione
  mediaPerimetroRettangoli, che dato
  un array di forme geometriche fornito come
  argomento, restituisce la media dei
  perimetri di tutte le forme geometriche con
  quattro lati. La media di un’array vuoto
  scatena un’eccezione.
*/

class QuantityError extends Error {}

interface FormaGeometrica {
    perimetro() : number;
    area() : number;
}

class Rettangolo implements FormaGeometrica  {
    base : number;
    altezza : number;
    constructor(b: number,a: number)   {
        this.base = b;
        this.altezza = a;
    }

    area(): number{
        return this.base * this.altezza
    }

    perimetro(): number{
        return (this.base + this.altezza) * 2
    }
}

class Quadrato extends Rettangolo {
    constructor(lato: number){
        super(lato,lato)
    }
}

class Cerchio implements FormaGeometrica  {
    raggio : number;
    constructor(r: number)   {
        this.raggio = r;
    }

    area(): number{
        return Math.PI * this.raggio*this.raggio
    }

    perimetro(): number{
        return 2*Math.PI * this.raggio
    }
}

function mediaPerimetroRettangoli(arr : FormaGeometrica[]): number  {
    if(arr.length == 0) throw new QuantityError("inserisci almeno un elemento nell'array")
    let sum : number = 0
    let c : number = 0

    for(let el of arr) {
        if (el instanceof Quadrato || el instanceof Rettangolo){
            c = c++
            sum += el.perimetro()
        }
    }

    return sum / c ;

}




/*
  Esercizio 1: Dilemma del Prigioniero
  ====================================

  Si definisca una enum Azioni contenente
  le possibili azioni: “Confessa” e “Non
  Confessa”. 
  
  Successivamente, si definisca
  una funzione prisonerDilemma che date
  due azioni restituisce una coppia di numeri
  rappresentanti la “reward” per ognuno dei
  due giocatori.

  I valori devono essere i seguenti:

          |     Giocatore 2    |  
          |     C    |    NC   |
          |--------------------|
     | C  | (−3, −3) | ( 0, -6)|
  P1 | NC | (-6,  0) | (−1, −1)|
  
  Si scriva infine una funzione
  bestReply(azioni_possibili,
  azione_avversario) che restituisca la
  migliore azione, in termini di massima
  reward, supponendo che l’avversario abbia
  compiuto una data azione.

  Plus: due mosse costituiscono un equilibrio
  di Nash se sono mutualmente migliori
  risposte. Si definisca una funzione
  nashEquilibria che calcoli tutti gli
  equilibri di Nash.
*/


enum Azioni {
    Confessa, // 0
    Non_Confessa // 1
}

function prisonerDilemma(a1: Azioni, a2 : Azioni) : [number, number] {
    let arr : [number, number] = [a1, a2];
    switch (a1) {
        case 0:
            switch(a2){
                case 0: arr = [-3,-3]
                case 1: arr = [0,-6]
                default: throw new Error("azioni inserite non valide!")
            }
        case 1 :
            switch (a2){
                case 0: arr = [-6,0]
                case 1: arr = [-1,-1]       
                default: throw new Error("azioni inserite non valide!")

            }        
    }
    return arr        
}


function bestReply(azioni_possibili:Azioni[],azione_avversario:Azioni):Azioni | undefined{
    let reward : number = -Infinity
    let best_action : Azioni | undefined  
    
    for(let azione of azioni_possibili){
        let res:[number,number] = prisonerDilemma(azione, azione_avversario)
        let current_reward = res[0] 
        if (current_reward > reward) {
            reward = current_reward
            best_action = azione            
        }

    }

    return best_action
}


function nashEquilibria(action_arr : Azioni[]) : [Azioni, Azioni][] | null{
    if (action_arr.length == 0) return null

    let best_a_arr : [Azioni, Azioni][]= [];
    for(let action of action_arr ){
        for(let action_2 of action_arr){
            let best_a_1 = bestReply(action_arr,action)
            let best_a_2= bestReply(action_arr,action_2)

            if (best_a_1 == action_2 && best_a_2 == action) {
                best_a_arr.push([action, action_2]);
            }
        }


        /*
        let azione_migliore : Azioni | undefined= bestReply(action_arr,action)
        if (typeof azione_migliore == "undefined") throw new Error("azione migliore non definita")
        let mutua_azione_migliore : Azioni | undefined = bestReply(action_arr,azione_migliore)

        if (mutua_azione_migliore == action){
            let couple_A : [Azioni,Azioni] = [action, azione_migliore]
            best_a_arr.push(couple_A)
        }
         */

        
    }
    return best_a_arr
}


/*
  Esercizio 2: BlackJack
  ======================

  Si definisca un tipo Carta costituito da una
  tupla di un elemento della enum Seme
  (Cuori, Quadri, Fiori o Picche) ed uno della
  enum NomeCarta (Asso, Due, . . . , Sette,
  Jack, Regina, Re).

  Si definisca poi una classe BlackJack.
  Semplificando, in una partita di BlackJack
  l’obiettivo del giocatore è quello di ottenere
  un punteggio più alto del banco senza però
  superare 21. Il punteggio è dato dalla
  somma delle carte pescate. Le carte hanno
  valore nominale, ad eccezione dell’Asso
  che vale 10 punti.

  La classe implementa due metodi:
    • pesca() che estrae una carta per il
      giocatore. Ritorna true se la partita è
      ancora in corso, false se il giocatore ha
      perso (punteggio > 21) o la partita è
      conclusa.
    • concludi() termina il turno del
      giocatore e dà inizio a quello del
      banco. Il computer estrae a ripetizione
      una carta dal mazzo fin quando il suo
      punteggio è minore di 17.
      Successivamente si confrontano i
      punteggi e si ritorna true se il giocatore
      ha vinto, altrimenti ritorna false. In caso
      di parità la vittoria è al computer.

  Plus: si definisca una classe Mazzo da
  sfruttare internamente a BlackJack.
*/


enum Seme {
    Cuori = 0,
    Quadri = 1,
    Fiori = 2,
    Picche = 3
}

enum NomeCarta{
    Asso = 1, // 1
    Due = 2,
    Tre = 3,
    Quattro = 4,
    Cinque = 5 ,
    Sei = 6 ,
    Sette = 7,
    Jack = 8,
    Regin = 9,
    Re = 10 // 10
}

type Carta = [Seme, NomeCarta]

class Mazzo {
    mazzo : Carta[];

    constructor(){
        this.mazzo = [];            
        this.ricrea_mazzo();
        
        /*
        for(let i = 0; i < 5;i++){
            for(let j = 1; j < 11;j++){
                let current_card : Carta = [i,j]
                this.mazzo.push(current_card)
            }   
        } 
        */       
    }


    pesca_carte() : Carta{
        let r_index : number = Math.floor(Math.random() * this.mazzo.length); 
        let r_card : Carta = this.mazzo[r_index]
        console.log("r_card = ",r_card)

        this.mazzo.splice(r_index,1) // => remove the card from the deck 

        return r_card
       
    }

    carte_rimaste() : number{
        return this.mazzo.length
    }

    ricrea_mazzo(): void{ // => ricrea il mazzo completo 
        this.mazzo = [];        
    
        for(let i = 0; i < 5;i++){
            for(let j = 1; j < 11;j++){
                let current_card : Carta = [i,j]
                this.mazzo.push(current_card)
            }   
        } 
    }

}

class BlackJack {
    punteggio : number;
    mazzo : Mazzo;
    //mazzo : Carta[];
    punteggio_banco : number;
    finita: boolean;

    constructor(){
        this.punteggio = 0;
        this.mazzo = new Mazzo();
        //this.mazzo = [];
        this.punteggio_banco = 0;
        this.finita = false;
        
        /*
        for(let i = 0; i < 5;i++){
            for(let j = 1; j < 11;j++){
                let current_card : Carta = [i,j]
                this.mazzo.push(current_card)
            }   
        }
        */

    }


    // metodi:
    pesca() : boolean{
        /*
        let r_index : number = Math.floor(Math.random() * this.mazzo.length); // 0-4
        let r_card : Carta = this.mazzo[r_index]
        console.log("r_card = ",r_card)

        this.mazzo.splice(r_index,1) // => remove the card from the deck 
        */
        if(!this.finita){
            let r_card = this.mazzo.pesca_carte()
            let value : number = r_card[1]
            if (value == 1) this.punteggio += 10 // => 1 <--> asso => devo aumentare il punteggio di 10 
            else this.punteggio += value  
            
            if (this.punteggio > 21 || this.mazzo.carte_rimaste() == 0){
                this.finita = true
                return false 
            } 
            else return true    
        }
        else return false       
    }


    concludi() : boolean{
        if(this.finita) return false;
        
        while(this.punteggio_banco < 17){
            /*
            let r_index : number = Math.floor(Math.random() * this.mazzo.length); // 0-4
            let r_card : Carta = this.mazzo[r_index]
            console.log("r_card = ",r_card)

            this.mazzo.splice(r_index,1) // => remove the card from the deck 
            */
            let r_card = this.mazzo.pesca_carte()
            
            let value : number = r_card[1]
            if (value == 1) this.punteggio_banco += 10 // => 1 <--> asso => devo aumentare il punteggio di 10 
            else this.punteggio_banco += value            
        }

        this.finita = true;

        if(this.punteggio_banco > 21 || this.punteggio_banco < this.punteggio) return true
        else return false



    }

}




/*
  Esercizio 3: Collezione Ordinata
  ================================
      
  Si definisca una classe
  CollezioneOrdinata<T> che
  implementa una collezione i cui elementi
  sono sempre ordinati. La classe deve
  essere inizializzata da un costruttore che
  accetta una funzione di comparazione
  (comparatore) che, dati due elementi di
  tipo T, restituisce true se e solo se il primo
  elemento è maggiore del secondo. Il
  comparatore è un parametro opzionale, se
  non viene passato viene adottato
  l’operatore standard di comparazione (>).

  Inoltre, la classe deve implementare le
  seguenti operazioni:
    • add(element) che inserisce un
      elemento nella collezione.
    • find(element) che restituisce la
      posizione di un dato elemento se
      esiste, altrimenti solleva un’eccezione.
    • get(index) che restituisce
      l’elemento in posizione index.
    • size() che restituisce il numero di
      elementi della collezione.

  Plus: si usi internamente un metodo privato
  binarySearch(element) per
  find(element) e add(element).
*/

class CollezioneOrdinata<T>{
    collezione : T[];

    comparatore : (a: T,b: T) => boolean // => true if a > b / false otherwise

    constructor(comparatore? : (a: T,b: T) => boolean){
        
        this.collezione = []

        if(comparatore){
            this.comparatore  = comparatore
        }
        else{
            this.comparatore  = (a:T,b:T) => a>b;
        }
        
    }

    private binarySearch(element:T) : number{
        let start:number = 0 
        let end:number = this.collezione.length
        let middle : number = Math.floor(end+start / 2)

        while(this.collezione.length > 0 ){
            if (this.collezione[middle] === element) {
                return middle;
            }
            else if (this.comparatore(this.collezione[middle], element)){
                end = middle - 1;
            } else {
                start = middle + 1;
            }
            middle = Math.floor((start + end) / 2);            
        
       
        }
        // Ritorna la posizione attesa dell'elemento
        return start;
    }


    public add(element:T):void{
        let posizione : number = this.binarySearch(element)
        this.collezione.splice(posizione,0,element)
    }

    public find(element:T):number{
        let posizione : number = this.binarySearch(element)

        if(posizione >= this.collezione.length || this.collezione[posizione] != element) throw new Error("element not in collection")
        
        return posizione
    }

    public get(index: number):T{
        if(index >= this.collezione.length) throw new Error("index out of range")
        if(index < 0) throw new Error("Invalid index")

        return this.collezione[index]

    }
    
    public size():number{
        return this.collezione.length
    }
}


/*
  Esercizio 4: Linked List
  ========================

  Si definisca una classe Lista<T> che
  implementa una generica lista collegata di
  oggetti di tipo Nodo<T> (vedi Replit). La
  classe deve essere inizializzata da un
  construttore senza parametri.

  Inoltre, deve implementare le seguenti
  operazioni:
    • add(element, target?) che
      inserisce un elemento nella collezione. 
      Se viene passato un parametro
      target e questo è presente nella lista, 
      allora l’elemento viene posizionato
      immediatamente dopo l’elemento
      target. In qualsiasi altro caso
      l’elemento viene inserito in fondo alla
      lista.
    • contains(element) restituisce true
      se l’elemento element esiste,
      altrimenti ritorna false.
    • size() che restituisce il numero di
      elementi della lista.

  Plus: si estenda ListaFinita<T>, il cui
  costruttore richiede come parametro un
  numero non-negativo di elementi
  contenibili. In caso la lista sia piena, il
  metodo add(element) solleva
  un’eccezione.
*/

// versione prof : 
class Nodo_es<T> {
    public value: T;
    public next: Nodo_es<T> | undefined;

    constructor(value: T) {
        this.value = value;
    }
}

class Lista<T> {
  private _head: Nodo_es<T> | undefined;
  private _size: number;

  constructor() {
    this._head = undefined;
    this._size = 0;
  }

  public add(value: T, target?: T){
    let node = new Nodo_es(value);

    if (this._head === undefined) {
      this._head = node;
      this._size ++;
      return;
    }

    let current = this._head;

    while(current !== undefined) {
      if ((target !== undefined && current.value == target) || current.next === undefined) {
        node.next = current.next;
        current.next = node;

        this._size ++;
        return;
      }

      current = current.next;
    }
  }

  public contains(value: T): boolean {
    let current = this._head;

    while(current !== undefined) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  public size(): number {
    return this._size;
  }
}

class ListaFinita<T> extends Lista<T> {
    private maxSize: number;

    constructor(maxSize: number) {
        super();
        this.maxSize = maxSize;
    }

    public add(value: T, target?: T): void {
        if (this.size() < this.maxSize) {
            super.add(value, target);
        } else {
            throw new Error('Lista piena');
        }
    }
}


/*
mia versione :
class Nodo_es<T> {
    public value: T;
    public next: Nodo_es<T> | undefined;

    constructor(value: T) {
        this.value = value;
    }
}

class Lista<T>{
    lista: Nodo_es<T> [] ;

    constructor(){
        this.lista = [];
    }

    public add(element: Nodo_es<T>, target? : Nodo_es<T>) : void{

        if(target){
            let index : number = this.lista.indexOf(target);
            if(index != -1){
                this.lista.splice(index, 0,target);
            }
        }
        else this.lista.push(element);
    }


    public contains(element: Nodo_es<T>): boolean{
        return this.lista.includes(element)        
    }

    public size(): number{
        return this.lista.length;
    }

}

class ListaFinita<T> extends Lista<T>{
    max_size: number;

    constructor(quantity_elements: number){
        super();
        this.max_size = quantity_elements;
    }

    public add(element: Nodo_es<T>, target? : Nodo_es<T>) : void{
        if(this.lista.length+1> this.max_size) throw new Error("Too many elements");

        if(target){
            let index : number = this.lista.indexOf(target);
            if(index != -1){
                
                this.lista.splice(index, 0,target);
            }
        }
        else this.lista.push(element);
    }

}
*/
