//GRAFI CON LISTE DI ADIACENZA


//ESERCITAZIONE SUI GRAFI
// https://drive.google.com/file/d/1_mRLVUx8B7ZaRthLaVgSt2--_kAl5tnu/view

// Aggiungere archi oreintati e non 
//  e modifica toString per Visualizare archi

// Nodo di lista di adiacenza 
class ALNode {
    index: number; // indice del nodo adiacente (nel grafo)
    next: ALNode|null; // resto della lista di adiacenza
  
    constructor(index: number) {
      this.index = index
      this.next = null
    }
}
  
  // Nodo del grafo
class GNode<T> {
    content: T; // contenuto del nodo
    alist: ALNode|null; // lista di adiacenza
  
    
    constructor(content: T) {
      this.content = content;
      this.alist = null;
    }
}
  
  // Grafo
class GrapH<T> {
    nodes: GNode<T>[];
    
    constructor(c: T) {
      let n = new GNode(c);
      this.nodes = [n]; // chiedere Tommaso
    }
  
    // Aggiunge un nuovo nodo al grafo (e lo restituisce)
    addNode(c: T): GNode<T> {
      let n = new GNode(c);
      this.nodes.push(n);
      return n;
    }
  
    // Aggiunge un arco orientato (da indice nodo 1 a indice nodo 2)
    addOrientedEdge(in1: number, in2: number): void {
      // controlla se gli indici sono validi
      if (in1 >= this.nodes.length || in1 < 0) 
        throw new Error("Arco non creabile; indice nodo 1 non valido");
      if (in2 >= this.nodes.length || in2 < 0) 
        throw new Error("Arco non creabile; indice nodo 2 non valido");
      // aggiunge l'arco, evitando self-loop (nodi che puntano a sé)
      if (in1 != in2) {
        // inserimento in testa alla lista di adiacenza
        let aln: ALNode = new ALNode(in2);
        let tmp: ALNode|null = this.nodes[in1].alist;
        this.nodes[in1].alist = aln;
        aln.next = tmp
      }
    }
  
    // Aggiunge arco non orientato (ovvero che va in entrambe le direzioni)
    addUnorientedEdge(in1: number, in2: number): void {
      this.addOrientedEdge(in1,in2);
      this.addOrientedEdge(in2,in1);
    }
  
    // Restituisce una rappresentazione del grafo (liste di adiacenza)
    toString(): string {
      let s: string = "";
      // for perche´grafo e´un array di nodi 
      for (let i = 0; i < this.nodes.length; i++) {
        let n = this.nodes[i]
        s += n.content // concateno alla stringa s il contenuto del nodo
        let aln: ALNode|null = n.alist
        while(aln != null) {
          s += " -> " + this.nodes[aln.index].content
          aln = aln.next
        }
        s += "\n"
      }
      return s;
    }
  
}

// ESEMPI DI ESECUZIONE
let g = new GrapH("r");
g.addNode("s");
g.addNode("t");
g.addNode("v");
g.addNode("w");
g.addNode("x");
g.addNode("y");
g.addNode("u");
  // aggiungiamo archi
g.addUnorientedEdge(0,1); // r--s
  //g.addOrientedEdge(0,1); // r->s
g.addUnorientedEdge(0,3); // r--t
  //g.addOrientedEdge(0,3); // r->t
g.addUnorientedEdge(1,4); // s--w
g.addUnorientedEdge(4,2); // w--t
g.addUnorientedEdge(4,5); // w--x
g.addUnorientedEdge(2,7); // t--u
g.addUnorientedEdge(5,6); // x--y
console.log(g.toString());
  
  
  //Esempio delle slides
  /*
  console.log("Esempio delle Slides")
  let g1 = new GrapH("r");
  g1.addNode("s");
  g1.addNode("t");
  g1.addNode("u");
  g1.addUnorientedEdge(0,1); // r--s
  g1.addUnorientedEdge(0,2); // r--t
  g1.addUnorientedEdge(2,3); // t--u
  console.log(g1.toString());
  */