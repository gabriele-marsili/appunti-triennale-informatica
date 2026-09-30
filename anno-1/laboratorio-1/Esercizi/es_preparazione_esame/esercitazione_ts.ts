/*
  Esercizio 0: Forme Geometriche
  ==============================

  Si definisca una interfaccia
  FormaGeometrica che rappresenti una
  generica forma geometrica. Da questa, si
  derivino le classi Quadrato, Rettangolo e Cerchio.

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

interface FormaGeometrica {
    lato : number;
    perimetro() : number;
    area() : number;
}

class Rettangolo implements FormaGeometrica {
    public lato: number;
    public altezza: number
    constructor(l:number,h : number) { 
        this.lato = l;
        this.altezza = h;
    }

    public perimetro(): number {
        return this.lato*2 + this.altezza*2 
    }

    public area() : number {
        return this.lato * this.altezza
    }
}

class Quadrato extends Rettangolo implements FormaGeometrica{
    constructor(l : number) {
        super(l,l)
    }

    /* not necessary:
    public perimetro(): number {
        return 4*this.lato
    }

    public area() : number {
        return Math.pow(this.lato,2)
    }
    */
}

class Cerchio implements FormaGeometrica{
    public lato : number;
    constructor(l:number) {
        this.lato = l;
    }

    public perimetro(): number {
        return 2*Math.PI *this.lato;

    }   

    public area(): number {
        return Math.PI * Math.pow(this.lato,2)
    }
}

var mediaPerimetroRettangoli = (arr : FormaGeometrica[]) : number => {
    if(arr.length === 0 ) {throw new Error("you need at least one element")}
    let c = 0; // counter 
    let sum = 0; // somma
    for(let element of arr ){ 
        if(element instanceof Rettangolo || element instanceof Quadrato){
            c++
            sum += element.perimetro()
        }
    }
    return sum / c 
}

/*
Esercizio 1: Dilemma del Prigioniero
  ====================================

  Si definisca una enum Azioni contenente
  le possibili azioni: “Confessa” e “Non
  Confessa”. Successivamente, si definisca
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
    Confessa, // 0 => false ( => !Confessa = true )
    Non_Confessa  // 1 => true  ( => !Non_Confessa = false )
}

var prisonerDilemma = (a: Azioni, b: Azioni)  : [number, number] => {
        
    if(!a && !b) return [-3,-3] // C && C

    else if(!a && b) return [0,-6] // C && NC 

    else if(a && !b) return [-6,0] // NC && C

    else if(a && b) return [-1,-1] // NC && NC 

    else {
        throw new Error("Profilo di azioni non valido")
    }

    
}

function bestReply(azioni_possibili : Azioni[], azione_avversario : Azioni) : Azioni { 
    
    let best_action : Azioni = 0
    let v = -Infinity
    for(let azione of azioni_possibili){
        let ar = prisonerDilemma(azione,azione_avversario)
        if(ar[0] > v) {
            v = ar[0]
            best_action = azione
        }
        
    }
    return best_action
}

// 
function nashEquilibria_default():Azioni[][]{
    let confessa : Azioni = Azioni.Confessa
    let non_confessa : Azioni = Azioni.Non_Confessa
    let res :Azioni[][] = [ [confessa,bestReply([0,1],0)] , [non_confessa , bestReply([0,1],1)] ] 

    return res
}

// Nash Equilibria
function nash_equilibria(azioni: Azioni[]): [Azioni, Azioni][] {
    // Esercizio plus: trovare gli equilibri nash di un dato gioco simmetrico
    let equilibri: [Azioni, Azioni][] = [];

    for (let a1 of azioni) {
        for (let a2 of azioni) {
            let br_1 = bestReply(azioni, a1);
            let br_2 = bestReply(azioni, a2);
            // Mutual Best Reply
            if (br_1 == a2 && br_2 == a1) {
                equilibri.push([a1, a2]);
            }
        }
    }

    return equilibri;
}

/**
 * Plus: due mosse costituiscono un equilibrio
  di Nash se sono mutualmente migliori
  risposte. Si definisca una funzione
  nashEquilibria che calcoli tutti gli
  equilibri di Nash.

 */
//let a : Azioni = 0 // confessa
//let b : Azioni = 0 // non confessa 

//console.log(prisonerDilemma(a,b)); // => [0,-6] 
//console.log(prisonerDilemma(a,a)); // =>  [-3,-3]
//console.log(prisonerDilemma(b,a)); // => [-6,0]
//console.log(prisonerDilemma(b,b)); // => [-1,-1]


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
  superare 21. 
  
  Il punteggio è dato dalla
  somma delle carte pescate. Le carte hanno
  valore nominale, ad eccezione dell’Asso
  che vale 10 punti.

  La classe implementa due metodi:
    • pesca() che estrae una carta per il
      giocatore. 
      
      Ritorna true se la partita è
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
    Quori, // 0
    Quadri,
    Fiori,
    Picche // 3
}

enum NomeCarta {
    Asso = 1,
    Due = 2,
    Tre = 3,
    Quattro = 4,
    Cinque = 5,
    Sei = 6,
    Sette = 7, // 7
    Jack = 8,  // 8
    Regina = 9, // 9
    Re = 10// 10 
}

type Carta = [Seme, NomeCarta]

class Mazzo{
    public mazzo : Carta[] = []
    public stato_partita : boolean = false; 

    constructor() {
        // avvia partita:
        this.crea_mazzo(); // crea mazzo ordinato
        this.mescola_mazzo(); // mescola mazzo
        this.stato_partita = true;
    }


    public crea_mazzo(): Carta[]{
        for(let i = 0; i<4; i++){ // 0-3 => semi
            for(let j = 1; j<=10;j++){ // 1-10 => nomi carta
                let nome_carta : NomeCarta = j
                this.mazzo.push([i,nome_carta]) // Seme , nomecarta (entrambi in numeri)
            }
        }
        return this.mazzo
    }

    public mescola_mazzo(): void{
        if(this.mazzo.length === 0) {
            this.stato_partita = false;
            throw new Error("Non ci sono più carte nel mazzo");            
        }
        let currentIndex = this.mazzo.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.mazzo[currentIndex], this.mazzo[randomIndex]] = [this.mazzo[randomIndex], this.mazzo[currentIndex]];
        }
    }

    public pesca_dal_mazzo():Carta{
        if(this.mazzo.length === 0) {
            this.stato_partita = false;
            throw new Error("Non ci sono più carte nel mazzo");            
        }
        let c : Carta = this.mazzo[0]
        this.mazzo.splice(0,1)
        return c
    }



}

class BlackJack extends Mazzo {
    public punteggio_giocatore = 0;
    public punteggio_banco : number = 0;
    constructor() {
        super();
    }

    public pesca():boolean{
        if(this.mazzo.length === 0) {
            this.stato_partita = false;
            throw new Error("Non ci sono più carte nel mazzo");            
        }
        let c : Carta = this.mazzo[0]
        this.mazzo.splice(0,1)
        if(c[1] === 1) this.punteggio_giocatore += 10 // => asso
        else this.punteggio_giocatore += c[1]

        if(this.punteggio_giocatore > 21 || this.mazzo.length === 0) this.stato_partita = false
        return this.stato_partita
    }

    public concludi() : boolean {
        while(this.punteggio_banco < 17 && this.punteggio_banco < 22){
            let carta_pescata : Carta = this.pesca_dal_mazzo();
            if(carta_pescata[1]===1)this.punteggio_banco += 10 // => asso
            else this.punteggio_banco += carta_pescata[1]

        }
        this.stato_partita = false
        if(this.punteggio_giocatore <= 21 && (this.punteggio_giocatore > this.punteggio_banco || this.punteggio_banco >= 22)) return true
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


class CollezioneOrdinata<T> {
    public comp = (a:T, b:T) : boolean => {return a > b};
    public collection : T[] = [];
    constructor( comparatore? : (a:T, b:T) => boolean) {
        if(comparatore) this.comp = comparatore
    }

    private binarySearch(element : T, p: number, r: number) : boolean {
        let q : number = Math.floor((this.collection.length -1) / 2 )
        if(p>r) return false
        if(this.collection[q] === element) return true
        if(this.comp(this.collection[q],element)){ // => element cercato <= element dato
            return this.binarySearch(element,p,q-1)
        }   
        else return this.binarySearch(element,q+1,r)
    }


    public add(element : T):void{
        if(!this.binarySearch(element,0,this.collection.length-1)){
            let initial_L : number = this.collection.length;
            for(let el of this.collection){
                if(this.comp(el,element)){ // => el > element
                    this.collection.splice(this.collection.indexOf(el),0,element);
                }
            }
            if(this.collection.length === initial_L) this.collection.push(element);
        }
    }

    public find(element:T):number{
        if(this.binarySearch(element,0,this.collection.length-1)){
            return this.collection.indexOf(element);
        }
        else throw new Error("Element not found");
    }

    public get(index: number): T{
        if(index >= this.collection.length || index < 0) throw new Error("Unable to find element ")
        else{
            return this.collection[index];
        }
    }

    public size(): number{
        return this.collection.length
    }

}