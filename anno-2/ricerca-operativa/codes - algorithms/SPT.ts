/*Algoritmo per Shortest Path Tree : 
dato un grafo G = (N,A) radicato in r 
1) crea un albero di copertura T = (N,At) 
2) controlla ammissibiltà di T (|At| = n-1, dove |N| = n )
3) calcola l'albero di copertura dei cammini aventi minimo costo e lo restituisce 
*/

/*Rappresentazione grafo G = (N,A) radicato in r :
linked list di nodi 
dove ogni nodo ha :
•identificatore (tipo generico, teoricamente str / intero)
•etichetta d(i) = costo del cammino (minimo) da r a tale nodo 
•array contenente nodi j per cui esiste arco i-j (dove i è il nodo)
•array contenente i costi degli archi i-j (stessa lunghezza arr sopra, indici corrispondenti)
*/

/*Variabili utili : 
d_arr = array con le etichette d dei nodi 
p_arr = array dei predecessori 
Q_arr = array di nodi che potrebbero violare le condizione di Bellman
r = nodo radice 
*/

type Nodo<T> = {
    identificatore : T;
    etichetta_d : number;
    arr_successori : Nodo<T>[];
    arr_costi_archi : number[];
    predecessore? : Nodo<T> | null;
}

type Grafo<T> = {
    N : Nodo<T>[];    
}

function popola<T>(nodo : Nodo<T>, arr_s : Nodo<T>[], arr_c : number[]) : void {
    nodo.arr_costi_archi = arr_c;
    nodo.arr_successori = arr_s;
}

//assumo che il grafo contenga una sorgente (/sia aciclico)
function printGraph<T>(nodo : Nodo<T>, arrIdVisti : T[] ): void {
    if(arrIdVisti.indexOf(nodo.identificatore) < 0){
        arrIdVisti.push(nodo.identificatore);
    }

    if(nodo.arr_successori.length > 0){
        nodo.arr_successori.forEach(element => {            
            if(arrIdVisti.indexOf(element.identificatore) < 0){                
                printGraph(element,arrIdVisti);            
            }
        });
    }
    let currentId : T = nodo.identificatore
    for(let i = 0; i <nodo.arr_successori.length; i++) {
        let e : Nodo<T> = nodo.arr_successori[i];
        let currentSuccID : T = e.identificatore;
        let currentCostArch : number = nodo.arr_costi_archi[i];
        let msg : string = currentId + "-->("+currentCostArch+")-->"+currentSuccID;
        console.log(msg);
    }
    console.log("\n")
}

//stampa grafo in base ai predecessori
//assumo che il grafo contenga una sorgente (/sia aciclico)
function printGraph2<T>(nodo : Nodo<T>, arrIdVisti : T[] ): void {
    if(arrIdVisti.indexOf(nodo.identificatore) < 0){
        arrIdVisti.push(nodo.identificatore);
    }

    if(nodo.arr_successori.length > 0){
        nodo.arr_successori.forEach(element => {            
            if(arrIdVisti.indexOf(element.identificatore) < 0){                
                printGraph2(element,arrIdVisti);            
            }
        });
    }
    let currentId : T = nodo.identificatore
    let currentEtichettaD : number = nodo.etichetta_d
    for(let i = 0; i <nodo.arr_successori.length; i++) {
        let e : Nodo<T> = nodo.arr_successori[i];
        let currentSuccID : T = e.identificatore;
        let currentCostArch : number = nodo.arr_costi_archi[i];
        let etichettaD_successore : number = e.etichetta_d;
        let msg : string = currentId+" d="+currentEtichettaD+ "-->("+currentCostArch+")-->"+currentSuccID+" d="+etichettaD_successore;
        if(e.predecessore && e.predecessore.identificatore == currentId){ //controllo sul predecessore
            console.log(msg);
        }
    }
    console.log("\n")
}

//trova costo max tra gli archi
function findCMax<T>(N : Nodo<T>[], max : number) : number{
    N.forEach(node => {
        node.arr_costi_archi.forEach(costo => {
            if(costo > max) max = costo;
        })
    })

    return max;
}

//algoritmo :
function SPT_procedure<T>(graph : Grafo<T>, r : Nodo<T>) : Grafo<T>{
    
    var M : number = (graph.N.length-1) * findCMax(graph.N, graph.N[0].arr_costi_archi[0]) - 1;

    //inizializzazione :
    graph.N.forEach(node => {
        node.predecessore = r;
        node.etichetta_d = M
    });

    r.etichetta_d = 0;
    var Q : Nodo<T>[] = [r];

    while(Q.length > 0) {
        var NodeI = Q.shift(); // prendo primo elemento da Q (e lo tolgo)
        if(NodeI){
            for(let i = 0; i < NodeI.arr_successori.length; i++){ // scorrro archi stella uscente di nodeI (FS(I))
                var NodeJ : Nodo<T> = NodeI.arr_successori[i];
                var costoArco : number = NodeI.arr_costi_archi[i];
                if(NodeI.etichetta_d + costoArco < NodeJ.etichetta_d){ // => arco (I,J) viola condizione Bellman
                    NodeJ.etichetta_d = NodeI.etichetta_d + costoArco;
                    NodeJ.predecessore = NodeI
                    Q.push(NodeJ)
                }
            }
        }
    }

    return graph;
}

// inizializzazione e creazione grafo per test :
var Radice : Nodo<number> = {
    identificatore : 1,
    etichetta_d : 0,
    arr_successori : [],
    arr_costi_archi : [],
}

var Node2 : Nodo<number> = {
    identificatore : 2,
    etichetta_d : 0,
    arr_successori : [],
    arr_costi_archi : [],
}


var Node3 : Nodo<number> = {
    identificatore : 3,
    etichetta_d : 0,
    arr_successori : [],
    arr_costi_archi : [],
}

var Node4 : Nodo<number> = {
    identificatore : 4,
    etichetta_d : 0,
    arr_successori : [],
    arr_costi_archi : [],
}

var Node5 : Nodo<number> = {
    identificatore : 5,
    etichetta_d : 0,
    arr_successori : [],
    arr_costi_archi : [],
}

var Node6 : Nodo<number> = {
    identificatore : 6,
    etichetta_d : 0,
    arr_successori : [],
    arr_costi_archi : [],
}

var grafo : Grafo<number> = {
    N : [Radice,Node2, Node3, Node4, Node5, Node6]
}

popola(Node4,[],[])
popola(Node5,[Node4],[4])
popola(Node6,[Node5,Node4],[3,3])
popola(Node2,[Node4,Node5,Node6],[9,5,1])
popola(Node3,[Node2,Node5,Node6],[2,1,9])
popola(Radice,[Node2,Node3],[3,7])

printGraph(Radice, [Radice.identificatore]);
//console.log("C max = ",findCMax(grafo.N, grafo.N[0].arr_costi_archi[0]))
console.log("\n--------------\n");
var SPT_graph :Grafo<number> = SPT_procedure(grafo,Radice);
printGraph2(SPT_graph.N[0],[SPT_graph.N[0].identificatore]);