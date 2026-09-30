/*BFS : theory + pseudo-code
BFS(G,V){ // => prende come parametri il grafo G e l'insieme dei suoi nodi V 
	For all v ∈ V \ {s} { // => scorro tutti i nodi del grafo (ad eccezione della sorgente)
		v.color = B; // => coloro tutto di bianco
		v.d = + infinity // =>inizializzo la distanza di ogni vertice ad infinito-> vertici non raggiunti dalla visita hanno distanza infinita 
v.π = nil // => inizializzo con nil il predecessore 
	}


	s.color = G; //=> cambio il colore della sorgente da bianco a Grigio
	S.d = 0 // => inizializzo la distanza della sorgente (da se stessa) a 0
s.π = nil; // => inizializzo nil come predecessore della sorgente 
	
    Q = nuova coda // => policy: first in first out 
enqueue(Q,s) // => inserisco la sorgente nella coda 
while(Q ≠Ø){ // => finché la coda non è vuota estraggo
		u =  dequeue(Q) // => vertice che ritorna dall'estrazione della coda (quello che si trovava da più tempo nella coda) -> 1° inserito
//vado a vedere se nella lista di adiacenza u ci son nodi 
		For all v  ∈ Adj[u]{
			If  (v.color == B){ // => prima volta che vedo v 
				v.color = G // cambio il colore di v 
				v.π = u // => v è t stato scoperto da u
				v.d = u.d + 1 // => modifico la distanza 
				Enqueue(Q,v) // => rimetto in coda 
			}
		
		} // => ho fatto tutta la scansione della lista di adiacenza di u => u può diventare nero 
		u.color = N ;
	}
	
}
*/

/*DFS : theory + pseudo-code:

DFS(G){ // prende come parametro solo il grafo G, rappresentato con liste di adiacenza 
	For all v ∈ V { // => scorro tutti i vertici 
		v.color = B; // coloro tutto di bianco 
		v.π = nil; // => inizializzo tutti i predecessori a nil 
	}
time = 0;  // => inizializzo una variabile globale 
	
	For all v ∈ V { // scorro nuovamente tutti i vertici
		If  (v.color == B ) then DFS-visit(G,v); // => chiamo la visita DFS sul vertice v 
	}
	
}


DFS-visit(G,u){
	time ++ // => incremento la variabile globale time 
	u.d= time // => metto il tempo nella discovery di u
	u.color = G // => cambio il colore da B a G 
	
	For all v ∈ Adj[u]{ // => scorro la lista di adiacenza di u
		// ispeziono l'arco (u,v)
		If (v.color == B){ // => prima volta che visito v 
			v.π = u; // => v è stato "scoperto" da u, quindi il suo predecessore è u
			DEF-VISIT(G,v) //chiamata ricorsiva sul vertice che era bianco 

		}
	}
	u.color = N // => ho terminato l'esame della lista di adiacenza di u  (Adj[u]) -> cambio colore
	time ++ //=> incremento il tempo ( -> ora è uguale al tempo di fine visita)
	
	u.f  = time; // => modifico il tempo di fine visita di u, assegnandoli time 
}
*/


/*ORDINAMENTO TOPOLOGICO : theory + pseudo-code:
OT(G){  // G : DAG
	•esegui una DFS per calcolare i tempi di fine visita 
	•quando termina la visita di un vertice (e tale vertice diviene N) inserisci il vertice IN TESTA ad una lista
	•restituisci la lista 
	
}
*/

class NodeError extends Error {};
class AdJListError extends Error {}; 
class SorgentError extends Error {};

class Nodo<T>{
    public value: T | null;
    public lista_di_adiacenza : Nodo<T>[] 

    public color: string
    public distance : number
    public predecessor : Nodo<T> | null
    public discovery : number
    public end_visit_time : number


    constructor(val:T,AdJ:Nodo<T>[]) {
        this.value = val;
        this.lista_di_adiacenza = AdJ

        this.color = "B";
        this.distance = Infinity;
        this.predecessor = null;
        this.discovery = 0
        this.end_visit_time = 0
    }


    public change_color(c:string):void{
        this.color = c;
    }

    public change_distance(d:number):void{
        this.distance = d;
    }

    public change_predecessor(π:Nodo<T>):void{
        this.predecessor = π;
    }

    public change_value(v:T):void{
        this.value = v;
    }

    public add_collegamento(node: Nodo<T>): void{
        this.lista_di_adiacenza.push(node);
    }


    public rimuovi_collegamento(node: Nodo<T>): void{
        if (this.lista_di_adiacenza.length == 0){
            throw new AdJListError("You can't delete a node by an empty list");
        }
        else{
            let index : number = this.lista_di_adiacenza.indexOf(node)
            if(index != -1){
                this.lista_di_adiacenza.splice(index,1);            
            } 
            else{
                throw new NodeError("Invalid node: there is no node like this in the adj list of this node");
            }
    
        }
    }    
}

class Grafo<T>{
    V_ins_nodi : Nodo<T>[] ;
    E_ins_archi : [Nodo<T>, Nodo<T>[] | null][] // lista contenente coppie: (nodo-lista AdJ) di tale nodo

    constructor(insieme_nodi: Nodo<T>[] , insieme_archi: [Nodo<T>, Nodo<T>[] | null][]) {
        this.V_ins_nodi = insieme_nodi;
        this.E_ins_archi = insieme_archi;
    }

    public num_nodi(): number {
        return this.V_ins_nodi.length
    }

    public num_archi(): number {
        return this.E_ins_archi.length
    }

    public add_nodo(nodo: Nodo<T>):void{
        this.V_ins_nodi.push(nodo)
        this.E_ins_archi.push([nodo, nodo.lista_di_adiacenza])
    }

    public delete_nodo(nodo:Nodo<T>):void{
        let index : number = this.V_ins_nodi.indexOf(nodo)
        if(index != -1){
            this.V_ins_nodi.splice(index,1);
            this.E_ins_archi.splice(index,1);
        } 
        else{
            throw new NodeError("Invalid node: there is no node like this in the graph");
        }
    }

    // per scansionare l'intero grafo basta rifare la visita scegliendo come sorgente un nodo il cui colore è rimasto bianco (non visitato)
    public BFS(s:Nodo<T>):void{
        let index : number = this.V_ins_nodi.indexOf(s)
        if(index==-1) throw new SorgentError("Invalid sorgent: this node there insn't found in this graph");
        
        this.V_ins_nodi[index].change_color("G")
        this.V_ins_nodi[index].change_distance(0)

        let Q : Array<Nodo<T>> = [] // => coda con policy FIFO (first in first out )
        Q.push(s);

        while (Q.length >0){
            let a_u: Array<Nodo<T>>= Q.splice(0,1)
            let u : Nodo<T> = a_u[0]

            for(let i =0;i<u.lista_di_adiacenza.length;i++){
                let v : Nodo<T> = u.lista_di_adiacenza[i]

                if(v.color == "B"){// => prima volta che vedo v 
                    v.change_color("G")// cambio il colore di v  
                    v.change_predecessor(u)// => v è t stato scoperto da u
                    v.change_distance(u.distance+1)// => modifico la distanza 
                    Q.push(v)// => rimetto in coda 
                }
            }
            // => ho fatto tutta la scansione della lista di adiacenza di u => u può diventare nero 
            u.change_color("N")
        }


        for(let i=0; i<this.V_ins_nodi.length;i++){
            if(i != index){

            }
        }

    }

    public DFS():void{ // prende come parametro solo il grafo G, rappresentato con liste di adiacenza 
        let time : number = 0; // => inizializzo una variabile time  
        for(let i = 0; i < this.V_ins_nodi.length;i++){ // => scorro tutti i vertici 
            let v  = this.V_ins_nodi[i];
            if(v.color == "B"){
                this.DFS_visit(v, time) // => chiamo la visita DFS sul vertice v 
            }
        }
    }

    public DFS_visit(v:Nodo<T>,time:number):Nodo<T>[] {
        var OT_list : Nodo<T>[] = [];
        time =+ 1;// => incremento la variabile globale time 
        v.discovery = time; // => metto il tempo nella discovery di u
        v.color = "G"; // => cambio il colore da B a G 

        for(let i = 0; i < v.lista_di_adiacenza.length; i++){ // => scorro la lista di adiacenza di v          
            let u : Nodo<T> = v.lista_di_adiacenza[i]
            // ispeziono l'arco (v,u):
            if (u.color == "B"){ // => prima volta che visito u 
                u.change_predecessor(v) // => u è stato "scoperto" da v, quindi il suo predecessore è v
                this.DFS_visit(u,time) //chiamata ricorsiva sul vertice che era bianco 
            }
        }

        v.change_color("N")// => ho terminato l'esame della lista di adiacenza di v  (Adj[v]) -> cambio colore
        time += 1 //=> incremento il tempo ( -> ora è uguale al tempo di fine visita)

        v.end_visit_time = time; // => modifico il tempo di fine visita di v, assegnandoli time 
        OT_list.push(v);
        console.log("OT_list= ",OT_list)
        return OT_list;
    }

   
    public print_predecessors():void{
        for(let i =0; i<this.V_ins_nodi.length;i++){
            let nodo  = graph.V_ins_nodi[i]
            console.log("il predecessore di ",nodo.value, " è : ", nodo.predecessor?.value)
        }
    }

    

}

let N9 : Nodo<number> = new Nodo(9,[]);
let N7 : Nodo<number> = new Nodo(7,[N9]);
let N8 : Nodo<number> = new Nodo(8,[]);


let N3 : Nodo<number> = new Nodo(3,[]);
let N6 : Nodo<number> = new Nodo(6,[N3]);
let N5 : Nodo<number> = new Nodo(5,[N6]);
N3.add_collegamento(N5)
let N4 : Nodo<number> = new Nodo(4,[N3,N6]);
N8.add_collegamento(N4)
N7.add_collegamento(N8)



let N2 : Nodo<number> = new Nodo(2,[N3,N4,N5]);
let N1 : Nodo<number> = new Nodo(1,[N2,N4]);


let insieme_nodi_G: Nodo<number>[] = [N1,N2,N3,N4,N5,N6,N7,N8,N9]; 
let insieme_archi_G:[Nodo<number>, Nodo<number>[]][] = [[N1,N1.lista_di_adiacenza],[N2,N2.lista_di_adiacenza],[N3,N3.lista_di_adiacenza],[N4,N4.lista_di_adiacenza],[N5,N5.lista_di_adiacenza],[N6,N6.lista_di_adiacenza],[N7,N7.lista_di_adiacenza],[N8,N8.lista_di_adiacenza],[N9,N9.lista_di_adiacenza]]
let graph: Grafo<number> = new Grafo(insieme_nodi_G,insieme_archi_G)

//graph.BFS(N1);
graph.DFS()
console.log(graph)
graph.print_predecessors()




