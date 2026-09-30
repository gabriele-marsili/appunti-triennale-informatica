//GRAFI CON MATRICI DI ADIACENZA

//ESERCITAZIONE SUI GRAFI
// https://drive.google.com/file/d/1_mRLVUx8B7ZaRthLaVgSt2--_kAl5tnu/view



// Classe per rappresentare matrici di r righe e c colonne
class Matrix {
    r: number;
    c: number;
    A: number[][];
  
    //inizializzo la matrice a tutti 0
    //la matrice e´un array di array
  
    constructor(r = 1, c = 1) {
      this.r = r;
      this.c = c;
      this.A = []; // creare il primo array vuoto per ogni riga
      for (let i = 0; i < r; i++) {
        this.A[i] = []; //dobbiamo creare inizialmente l'array A[i] per poi assegnare zero tutti gli elementi di quella riga
        for (let j = 0; j < c; j++) {
          this.A[i][j] = 0;
        }
      }
    }
  
    // Imposta il valore contenuto nella cella i,j
    setValue(i: number, j: number, v: number): void {
      this.A[i][j] = v;
    }
  
    // Restituisce il valore contenuto nella cella i,j
    getValue(i: number, j: number): number {
      return this.A[i][j];
    }
  
    // Verifica se la matrice è quadrata
    quadrata(): boolean { 
      return this.r == this.c;
    }
  
    // da qui in poi lo lascio per casa cose generiche per lavorare con matrici
  
    // Azzera tutti gli elementi della matrice
    setZero(): void {
      this.A.forEach(riga => riga.map(e => 0));
    }
  
    // Genera una matrice identità, ovvero una matrice con 
    // - 1 sulla diagonale principale
    // - 0 nelle altre celle
    setId(): void {
      if (this.quadrata()) {
        this.setZero();
        for (let i = 0; i < this.r; i++)
          this.A[i][i] = 1;
      }
    }
  
    // Imposta il contenuto delle celle nella riga i
    // copiando i valori dalla "riga" passata
    // i>=0 ho scritto 0<=i ma e' la stessa cosa 
    // la riga deve essere di lunghezza c come impostato nella matrice
    setRiga(i: number, riga: number[]) {
      if (0 <= i && i < this.r && riga.length == this.c)
        for (let j = 0; j < this.c; j++)
          this.A[i][j] = riga[j]
    }
  
    // Imposta il contenuto delle celle nella colonna j
    // copiando i valori dalla "colonna" passata
    // j>=0 ho scritto 0<=j ma e' la stessa cosa 
    // la colonna deve essere di lunghezza r come impostato nella matrice
    setColonna(j: number, colonna: number[]) {
      if (0 <= j && j < this.c && colonna.length == this.r) {
        for (let i = 0; i < this.r; i++)
          this.A[i][j] = colonna[i];
      }
    }
  
    // Imposta i valori contenuti nelle celle della matrice
    // copiandoli valori dalla matrice (array di array) passata
    setAll(dati: number[][]) {
      if (this.r == dati.length)
        for (let i = 0; i < this.r; i++)
          this.setRiga(i, dati[i]);
    }
  
    // Restituisce la matrice ottenuta moltiplicando la matrice
    // corrente con la matrice B passata come argomento
    mul(B: Matrix): Matrix {
      let A = this;
      // Mmoltiplicazione fatta solo se si può fare
      if (A.c == B.r) {
        let R = new Matrix(A.r, B.c);
        for (let i = 0; i < R.r; i++) {
          for (let j = 0; j < R.c; j++) {
            let t = 0;
            for (let h = 0; h < A.c; h++)
              t += (A.getValue(i, h) * B.getValue(h, j));
            R.setValue(i, j, t);
          }
        }
        return R;
      }
      // Altrimenti, restituisce un'eccezione
      throw new Error("Non posso moltiplicare!");
    }
  
    // Restituisce una stringa che rappresenta la matrice 
    toString() {
      return `${this.r}x${this.c}:\n|${this.A.join("|\n|")}|`
      // la join crea una stringa concatenando tutti gli elementi di un array
    }
  }
  
  // ESEMPI DI UTILIZZO
  /*
  var a=new Matrix(4,2)
  a.setAll([[1,2], [2,1], [0,1], [3,3]])
  console.log("A", a.toString())
  var b=new Matrix(2,3)
  b.setAll([[3,2,4], [2,0,1]])
  console.log("B", b.toString())
  console.log("MUL", a.mul(b).toString())
  */
  
  // Classe che rappresenta un NodO del grafo
class NodO<T> {
    id: number; // indice del NodO nella matrice di adiacenza il primo NodO indice 0 il secondo indice 1 e cosi via
    value: T|null; // valore del NodO
  
    constructor() {
      this.id = -1; // quando creo un nuovo NodO non ha indice
      this.value = null; // inizialmente non ha neanche un valore
    }
}
  
  // Classe che rappresenta il grafo come matrice
  // NB: Estende Matrix, creando una matrice che è sempre quadrata
class Graph<T> extends Matrix {
  
    constructor(v: T) {
      super(1,1);
      let n = new NodO<T>();
      n.id = this.r;
      n.value = v;
    }
  
    // Restituisce il numero di nodi che e' il numero di righe della matrice di adiacenza
    getNNodi(): number {
      return this.r;
    }
  
    // Restituisce il numero di archi (usando reduce per sommare gli 1
    // presenti nelle righe e nelle colonne)
    getNArchi(): number { //
      return this.A.map(r => r.reduce((a,b) => a + b)).reduce((a,b) => a+b);
    }
  
    // Aggiunge un nuovo arco orientato da idn1 a idn2 
    // (settando a 1 la cella corrispondente)
    addOrientedEdge(idn1: number, idn2: number): void {
      if (idn1 >= this.r || idn2 >= this.r || idn1 < 0 || idn2 < 0)
        throw new Error("Arco non creabile");
      if (idn1 != idn2)
        super.setValue(idn1,idn2,1);
    }
  
    // Aggiunge un nuovo arco non-orientrato tra idn1 e idn2 
    // (settando a 1 le celle corrispondenti)
    addUnorientedEdge(idn1: number, idn2: number) {
      this.addOrientedEdge(idn1, idn2);
      this.addOrientedEdge(idn2, idn1);
    }
  
    // Aggiunge un nuovo NodO, inserendo un nuovo indice 
    // potrei dover far crescere la matrice aggiungendo elementi
    // nella matrice di adiacenza (NB: sia su righe sia su colonne)
    // ovvero se ho un grafo con 6 nodi e voglio creare il settimo ho bisogno della settima riga e settima colonna nella matrice di adiacenza per memorizzare gli archi che vanno al nuovo NodO 7 o partono sempre dal nuovo NodO 7
    addNode(v: T): NodO<T> {
      let n = new NodO<T>();
      n.id = this.r;
      n.value = v;
      let rc: number[] = []; // creiamo la nuova riga in piu' e poi la riempiamo di zeri
      for (let i = 0; i < this.r; i++) {
        this.A[i].push(0);
        rc.push(0);
      }
      rc.push(0);
      this.A.push(rc); // aggiungiamo la nuova riga alla matrice
      this.r++; // incrementiamo il numero di righe e di colonne della matrice
      this.c++;
  
      return n;
    }
  
    // Rimuove un NodO dal grafo, rimuovendo l'indice corrispondente
    // dalla matrice di adiacenza (NB: sia su righe sia su colonne)
    removeNode(idn: number) {
      if (idn > this.r)
        return false;
  
      while (idn < this.r - 1) {
        // shifting righe a sx  
        for (let i = 0; i < this.r; i++) {
          this.A[i][idn] = this.A[i][idn + 1];
        }
        // shifting colonne sx 
        for (let i = 0; i < this.r; i++) {
          this.A[idn][i] = this.A[idn + 1][i];
        }
        idn++;
      }
  
      // elimina ultima riga e ultima colonna
      this.A.length--;
      this.r--;
      for (let i = 0; i < this.r; i++)
        this.A[i].length--;
      this.c--;
      return true;
    }
  
    // Genera archi casuali per i nodi presenti
    randomArcs() {
      for (let i = 0; i < this.r; i++) {
        this.A[i] = [];
        for (let j = 0; j < this.c; j++) {
          if (i==j)
            this.A[i][j] = 0; // per non creare self-loop la diagonale a zero
          else
            this.A[i][j] = Math.round(Math.random()); // random e arrotondo cosi mi viene o zeor o uno a caso
        }
      }
    }
  }
  
  // ESEMPI DI UTILIZZO 
  let G: Graph<number> = new Graph<number>(21);
  G.addNode(52);
  G.addNode(42);
  // G.addUnorientedEdge(0,1)
  // G.addOrientedEdge(1,2)
  console.log("#nodi:",G.getNNodi()) // 3 nodi 21,52, 42
  console.log("#archi:",G.getNArchi()) //0 archi per ora
  console.log(G.toString());
  
  console.log("- - -")
  
  G.randomArcs();
  console.log("#nodi:",G.getNNodi())
  console.log("#archi:",G.getNArchi())
  console.log(G.toString());