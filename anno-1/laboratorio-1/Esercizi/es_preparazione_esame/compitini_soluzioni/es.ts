/*
Gran Premio
===========
Un circuito è composto dai seguenti settori: Partenza, PrimaCurva, Rettilineo, SecondaCurva e Arrivo. 
Ognuno di questi deve essere codificato all'interno di una enum Settore. 

Durante una gara, i tempi vengono registrati tramite una tupla di tipo Cronometro che contiene il settore come primo elemento, 
ed il tempo (in secondi) trascorso dalla partenza del circuito alla fine del settore. 
Per ultimo, il tipo Traiettoria è un array di Cronometro, contenente il momento di uscita per ogni settore.

Potete assumere che una traiettoria sia sempre valida, ovvero che contenga un tempo per ogni settore e che questi siano ordinati e crescenti.

Si definisca una funzione media_tempo che, dato un array di traiettorie, restituisca il tempo medio di percorrenza calcolato su ogni settore.
Il tempo medio di percorrenza di un settore è dato dalla differenza tra il cronometro del settore stesso ed il precedente. 
La funzione prende anche un parametro opzionale settore; se definito, il tempo medio deve essere calcolato solo su questo settore. 
Un array di traiettorie vuoto deve sollevare un'eccezione.

Variante: miglior_tempo, peggior_tempo
*/

class QuantityError extends Error{}
enum Settore {
    Partenza, // 0
    PrimaCurva,
    Rettilineo,
    SecondaCurva,
    Arrivo // 4
}
type Cronometro = [Settore, number] // settore + tempo dalla partenza alla fine del settore 
type Traiettoria = Cronometro[] // contiene il momento d'uscita da ogni settore 


function media_tempo(arr : Traiettoria[],settore ? : Settore):number{
    //let res :number[] = [];
    //soluzione prof : 
    let sum: number = 0;
    let n: number = 0; // counter 


    if(arr.length == 0) throw new QuantityError("È necessaria almeno una traiettoria");
    for (const traiettoria of arr){ // scorro  le traiettorie 
        let precedente: number = 0; // inizializzo il precedente a 0 (=> partenza)
        for (const cronometro of traiettoria) { // scorro i cronometri 
          if (settore === undefined || settore === cronometro[0]) { // se il settore non è definito o se è definito ed è uguale al settore corrente (=> cronometro[0])
            sum += cronometro[1] - precedente;//incremento la somma con il tempo del settore corrente - il tempo del settore precedente
            n++; // incremento il contatore dei settori su cui faccio la media 
          }
          precedente = cronometro[1]; // aggiorno il precedente con il settore corrente (=> al prossimo giro del for il corrente è il precedente)
        }
    }
    return sum / n; // ritorno la media (somma / numero tot di settori)
    
    /*
    for(let i = 0; i < arr.length; i++){ // scorre le traiettorie
        for(let j = 0; j < arr[i].length; j++){// scorre i cronometri
            let cronometro = arr[i][j];
            let tempo_prec = 0
            if(j>0){
                let prec_cronometro = arr[i][j-1];
                tempo_prec = prec_cronometro[1]; 

            }
            
            let s = cronometro[0]; // => settore 
            
            let tempo = cronometro[1]; // tempo dalla partenza alla fine del settore 
            let tempo_medio : number = tempo - tempo_prec
            if(settore ){
                if(settore == s) res.push(tempo_medio) // calcolo solo su settore 
            }
            else res.push(tempo_medio) // => settore non definito -> aggiungo tutti i tempi medi
            
        }
    }
    return res
    */
}

/*
Si implementi una classe BocceNascoste che simuli una partita di bocce dove solo le distanze, 
e non le posizioni, delle sfere sono visibili ai giocatori. I due giocatori Alpha e Beta devono essere codificati in una enum Giocatore.
 l costruttore di BocceNascoste richiede la posizione iniziale del boccino, come Punto. 
 
 Ad inizio gioco, la posizione delle sfere dei giocatori è [Infinity, Infinity]. 
 Ogni turno si compone prima di una mossa di Alpha, poi una mossa di Beta.

Oltre al costruttore, la classe deve offrire i seguenti metodi:

- posiziona, che dati un punto ed un giocatore, aggiorna la posizione della sfera del giocatore. 
Il metodo solleva un'eccezione PlayerError se non è il turno del giocatore; 
se il punto ha una/due coordinate negative viene invece sollevata una eccezione PointError.
  
- vincitore, che restituisce il giocatore che ha vinto, ossia il più vicino al boccino. In caso di parità vince Alpha.

- distanza, che dati due giocatori, restituisce la distanza tra le rispettive bocce. Il secondo parametro è opzionale, 
  in caso non sia presente il metodo restituisce la distanza tra il giocatore passato come primo argomento ed il boccino.

Si richiede inoltre di definire una gerarchia di eccezioni che strutturi opportunamente le eccezioni sollevabili da BocceNascoste, 
ovvero PointError e PlayerError.
*/

type Punto = [number,number] // array contenente le cooridinate x,y del punto 

enum Giocatore{
  Alpha,
  Beta
}
class BocceError extends Error {}
class PlayerError extends BocceError {}
class PointError extends BocceError {}

class BocceNascoste {
  private posizione_boccino : Punto 
  private posizione_Alpha : Punto 
  private posizione_Beta : Punto 
  public turno : number 
  
  constructor(pos_iniziale: Punto ) {
    this.posizione_boccino = pos_iniziale
    this.posizione_Alpha = [Infinity,Infinity]
    this.posizione_Beta = [Infinity,Infinity]
    this.turno = 0 // => primo turno di Alpha 
    
  }

  public posiziona(p: Punto, g : Giocatore):void {
    if(g != this.turno) throw new PlayerError("wrong turn")
    else if(p[0]<0 || p[1] < 0) throw new PointError("bad point, negative coordinates are not allowed")
    else{
      //cambio posizione : 
      if(g === 0){
        this.posizione_Alpha = p
      }
      else if(g === 1) this.posizione_Beta = p

      //cambio turno:
      if(this.turno === 0) this.turno = 1
      else this.turno = 0 
    }
  }
 
  public distanza(a:Giocatore,b ? :Giocatore) : number{
    if(b != undefined){
      return Math.sqrt( (Math.pow( (this.posizione_Beta[0] -this.posizione_Alpha[0]) ,2) ) + (Math.pow( (this.posizione_Beta[1]-this.posizione_Alpha[1]),2) ) )
    }
    else{
      if(a === 0) return Math.sqrt( (Math.pow( (this.posizione_boccino[0] -this.posizione_Alpha[0]) ,2) ) + (Math.pow( (this.posizione_boccino[1]-this.posizione_Alpha[1]),2) ) )
      else return Math.sqrt( (Math.pow( (this.posizione_boccino[0] -this.posizione_Beta[0]) ,2) ) + (Math.pow( (this.posizione_boccino[1]-this.posizione_Beta[1]),2) ) )
    }
  }

  public vincitore():Giocatore{
    //calcolo distanze dal boccino:
    
    let d_a : number = this.distanza(0)
    let d_b : number = this.distanza(1)
  
    if(d_a <= d_b) return Giocatore.Alpha
    else return Giocatore.Beta
    
  }




}



/*
Si definisca una classe BinaryTree che rappresenti un albero binario sfruttando il meccanismo dei generics. 
Il costruttore inizializza l'albero tramite il valore della radice, salvato nella proprietà root. 

La classe contiene il sottoalbero sinistro e destro rispettivamente nelle proprietà left e right. 

Infine, la classe deve implementare i metodi insert, per inserire un nuovo valore, ed il getter size, 
che restituisce il numero di elementi dell'albero.

Si estenda poi la classe BinaryTree con una classe FilteredTree. 
Oltre al valore della radice, 
il costruttore inizializza anche una metodo filtro, che rappresenta una funzione booleana, 
ed una proprietà opzionale placeholder, che rappresenta un valore di default.

Nel metodo insert di FilteredTree, se il filtro restituisce false per il valore passato, 
allora viene inserito il valore di placeholder. 
In caso il placeholder non sia definito allora viene sollevata un'eccezione.

NOTA: il sottoalbero di sinistra contiene elementi minori o uguali al valore della radice, mentre quello di destra contiene valori maggiori.
 
Variante: placeholder nel costruttore o nel metodo.
*/

class MissingPlaceholderException extends Error{}

class BinaryTree<T> { // albero binario 
  root : T;
  left : BinaryTree<T> | undefined;  // sottoalbero sinistro 
  right : BinaryTree<T> | undefined;  // sottoalbero destro 
  size : number;

  constructor(r_val:T) {
    this.root = r_val; // valore della radice
    this.left = undefined; // inzializzo sottoalbero sx con undefined 
    this.right = undefined; // inzializzo sottoalbero dx con undefined 
    this.size = 1; // inzializzo size con 1 (radice)
  }

  public getter_size(): number {
    return this.size;
  }

  public insert(val : T):void{
    let insertKey = true; // inzializzo chiave (-> diviene fase quando ho aggiunto val)
    if(this.left === undefined && insertKey){ // non c'è sottoalbero sx => aggiungo elemento come sottoalbero sx
      this.left = new BinaryTree(val)
      this.size += 1 // incremento la size dell'albero
      insertKey = false
    }
    else if(this.right === undefined && insertKey){ // non c'è sottoalbero dx => aggiungo elemento come sottoalbero dx
      this.right = new BinaryTree(val)
      this.size += 1 // incremento la size dell'albero
      insertKey = false
    }

    // da migliorare (se ho albero con sottoalberi dx e sx con entrambi 2 sottoalberi ciascuno allora non aggiunge il valore all'estremo sx)
    else if(this.left != undefined && this.right != undefined && insertKey){ // ho già sia sottoalbero sx che sottoalbero dx => 
      if(this.left.getter_size() < 2 && insertKey){ // => ho meno di 2 elementi nel sottoalbero sx -> posso aggiungere val lì
        this.left.insert(val)
        insertKey = false;
        this.size =+ 1 
      }
      else if(this.right.getter_size() < 2 && insertKey){ // => ho meno di 2 elementi nel sottoalbero dx -> posso aggiungere val lì
        this.right.insert(val)
        insertKey = false;
        this.size =+ 1 
      }
    }

  }

}

class FilteredTree<T> extends BinaryTree<T>{
  placeholder ? : T | undefined;
  filtro : (val:T) => boolean

  constructor(val_r:T, f : (val:T) => boolean , p_holder ? : T) {
    super(val_r); // riprendo la radice dalla classe genitore
    this.placeholder = p_holder
    this.filtro = f;
  }

  public insert(val: T): void {
    //let insertKey = true; // inzializzo chiave (-> diviene fase quando ho aggiunto val)
    
    if(!(this.filtro(val))){ //=> filtro restituise false su val 
      if(this.placeholder === undefined) throw new MissingPlaceholderException("The placeholder is required")
      else{ // => placeholder != undefined
        // uso placeholder al posto di val      
        val = this.placeholder // cambio val con il valore di placeholder
      }
    }

    //faccio l'insert :
    super.insert(val) // richiamo insert della classe genitore 

  }

}