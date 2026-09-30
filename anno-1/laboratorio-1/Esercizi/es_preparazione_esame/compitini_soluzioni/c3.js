/*ESERCITAZIONE: 

Si scriva una funzione scontrino(a) che dato un array di prodotti restituisca un oggetto
che rappresenta lo scontrino degli acquisti. 
Un PRODOTTO: è rappresentato dall’oggetto avente come chiavi: 
nome (stringa), 
barcode (stringa) 
e prezzo (numerico). 

L’oggetto restituito da  scontrino(a) contiene 
Le chiavi corrispondenti ai barcode dei prodotti in a. 
I valori di queste chiavi sono a loro volta oggetti che hanno come chiavi prezzo e quantità. 
Il valore del campo prezzo corrisponde al costo del singolo prodotto. 
Il valore del campo quantità corrisponde al numero di prodotti con quel barcode presenti in a.
Una chiave totale, il cui valore è il costo totale speso dal cliente per acquistare tutti i prodotti presenti nello scontrino.



*/

function scontrino(a) {
    let scontrino = {};
    let sum = 0;

    for (let obj of a) {
        let barcode = obj.barcode
        let val = {
            prezzo: obj.prezzo,
            quantità: 1
        };

        if (!(barcode in scontrino)) { // => nello scontrino non ho ancora il prodotto 
            scontrino[barcode] = val
        } else { // => nello scontrino ho già il prodotto => ne aumento la quantità
            scontrino[barcode]["quantità"] += 1
            console.log("nuova quantità = ", scontrino[barcode]["quantità"])
        }
        sum += obj.prezzo

    }
    scontrino["totale"] = sum

    return scontrino

}


var prodotti = [{
        'nome': 'tonno',
        'barcode': '33',
        'prezzo': 2.50
    },
    {
        'nome': 'pasta',
        'barcode': '12',
        'prezzo': 0.90
    },
    {
        'nome': 'pasta',
        'barcode': '12',
        'prezzo': 0.90
    },
    {
        'nome': 'tonno',
        'barcode': '33',
        'prezzo': 2.50
    },
    {
        'nome': 'tonno',
        'barcode': '33',
        'prezzo': 2.50
    },
    {
        'nome': 'bagnoschiuma',
        'barcode': '456',
        'prezzo': 3.50
    }
]


//console.log(scontrino(prodotti))


/*
Si definisca una funzione unisci_estremi(a,b) che, dato due insieme a e b contenenti numeri, 
restituisce l’insieme contenente il massimo ed il minimo di entrambi gli insiemi 
(Si consideri la rappresentazione dell’insieme come stringa: true) */

function unisci_estremi(a, b) {
    let res = {}

    function get_m(obj) {
        let max = -Infinity;
        let min = +Infinity;
        for (key in obj) {
            if (key < min) min = key;
            if (key > max) max = key;
        }
        return [min, max]
    }

    let max_a = get_m(a)[1];
    let max_b = get_m(b)[1];
    let min_a = get_m(a)[0];
    let min_b = get_m(b)[0];

    if (max_a == min_a) res[max_a] = true; // aggiungo solo una chiave
    else {
        res[max_a] = true;
        res[min_a] = true;
    }

    if (max_b == min_b && !(max_b in res)) res[max_b] = true; // aggiungo solo una chiave
    else {
        if (!(max_b in res)) res[max_b] = true;
        if (!(min_b in res)) res[min_b] = true;
    }

    return res
}

let s1 = { "1": true, "-5": true, "10": true }
let s2 = { "12": true }
    //console.log(unisci_estremi(s1, s2)) //→ {"-5":true,"10":true,"12":true}

/*Si definisca una funzione sbarbalbero(t) che, 
dato un albero k-ario t contenente stringhe, 

modifica t sostituendo tutti i sottoalberi radicati in un nodo contenente la stringa 
"barbalbero" con una foglia contenente "sbarbato". 

Si assuma che l’albero contenga almeno un nodo e si consideri la rappresentazione {val:valore, figli:array_figli}
 */

function sbarbalbero(t) {
    if (t.val == "barbalbero") {
        t.val = "sbarbato"
        t.figli = []; // CB :sbarbo 
    } else { // devo controllare tutti i figli 
        if ("figli" in t) {
            for (let obj of t.figli) {
                sbarbalbero(obj)
            }
        }
    }

    return t

}

let tree = {
        val: "bilbo",
        figli: [
            { val: "barbalbero", figli: [{ val: "frodo" }, { val: "samvise" }] },
            { val: "sauron", figli: [{ val: "trudy" }] },
            { val: "barbalbero", figli: [] }
        ]
    }
    //console.log(sbarbalbero(tree))

/*
Si scriva la funzione sort_vehicles(v), il cui input è un array di veicoli, 
rappresentati come oggetti con chiavi 
tipo (stringa), 
cilindrata (numero) 
e peso (numero). 

La  funzione sort_vehicles ordina in-place l’array ricevuto in input: 

per tipo (alfabeticamente)
a parità di tipo, per cilindrata (crescente),
a parità di tipo e cilindrata, per peso (crescente)
 
*/

function sort_vehicles(v) {
    for (let i = 0; i < v.length; i++) {

        console.log(v[i])
        for (let j = i; j > 0; j--) { // dal veicolo scorro indietro per confronto con precedenti

            console.log(v[j])
            console.log("i = ", i, " j = ", j)

            if (v[i].tipo < v[j].tipo) {
                let appoggio_1 = v[j];
                v[j] = v[i];
                v[i] = appoggio_1;
                i = i - 1
            }
            if (v[i].tipo == v[j].tipo) {
                if (v[i].cilindrata < v[j].cilindrata) {
                    let appoggio_2 = v[j];
                    avrr[j] = v[i];
                    v[i] = appoggio_2;
                    i = i - 1
                }

                if (v[i].cilindrata == v[j].cilindrata) {
                    if (v[i].peso < v[j].peso) {
                        let appoggio_3 = v[j];
                        v[j] = v[i];
                        v[i] = appoggio_3;
                        i = i - 1
                    }
                }
            }

        }

    }
    return v
}


function quick_sort(arr, p, q) {

    function partition(v, p, q) {
        let piv = v[q];
        let i = p - 1
        let key = true;
        for (let j = p; j <= q - 1; j++) {
            if (v[j].tipo < piv.tipo && key) {
                i++
                let app = v[j]
                v[j] = v[i]
                v[i] = app
                key = false // ho scambiato
            }
            if (v[j].tipo == piv.tipo && key) {
                if (v[j].cilindrata < piv.cilindrata && key) {
                    i++
                    let app = v[j]
                    v[j] = v[i]
                    v[i] = app
                    key = false // ho scambiato
                }
                if (v[j].cilindrata == piv.cilindrata && key) {
                    if (v[j].peso <= piv.peso && key) {
                        i++
                        let app = v[j]
                        v[j] = v[i]
                        v[i] = app
                        key = false // ho scambiato
                    }
                }
            }
        }
        let app_2 = v[q]
        v[q] = v[i + 1]
        v[i + 1] = app_2
        return i + 1

    }

    function random_partition(v, p, q) {
        r = Math.floor(Math.random() * (q - p + 1) + p)
        let appoggio = v[q];
        v[q] = v[r];
        v[r] = appoggio
        partition(v, p, q)
    }

    if (p < q) {
        let pivot = random_partition(arr, p, q)
        quick_sort(arr, p, pivot - 1);
        quick_sort(arr, pivot + 1, q);
    }


}

function sort_vehicles_2(v) { // random quick sort version :
    quick_sort(v, 0, v.length - 1);
}



let my_v = [
    { 'tipo': 'auto', 'cilindrata': 1500, 'peso': 1400 },
    { 'tipo': 'moto', 'cilindrata': 50, 'peso': 2000 },
    { 'tipo': 'moto', 'cilindrata': 50, 'peso': 1300 },
    { 'tipo': 'camion', 'cilindrata': 8000, 'peso': 2000 },
    { 'tipo': 'moto', 'cilindrata': 125, 'peso': 300 },
    { 'tipo': 'auto', 'cilindrata': 1500, 'peso': 1400 },
    { 'tipo': 'auto', 'cilindrata': 1500, 'peso': 1600 },
    { 'tipo': 'moto', 'cilindrata': 800, 'peso': 500 },
    { 'tipo': 'auto', 'cilindrata': 3000, 'peso': 1100 }
]
sort_vehicles(my_v)
console.log(my_v)



/*COMPITO: */

// funzione che, dato un albero (radice), restituiesce in un array i valori delle foglie ottenuti tramite visita anticipata (sx - radice - dx )
//l'albero è rappresentato come : 
// tree = {
//  val : number,
//  sx : sottoalberoSinistro,
//  dx : sottoalberoDestro,    
// }
function flattenTree(tree) {
    // Caso Base
    if (tree == null) {
        return [];
    }

    // Chiamate ricorsive
    let left_arr = flattenTree(tree.sx); // => get result from left part 
    let right_arr = flattenTree(tree.dx); // => get result from right part 

    // Aggregazione del risultato
    //return left_arr.concat([tree.val], right_arr);

    let result = [];


    for (elem of left_arr) { // => aggregazione parte sinistra 
        result.push(elem);
    }
    result.push(tree.val); // => aggiunta del valore dell'albero 
    for (elem of right_arr) { // => aggregazione parte destra
        result.push(elem);
    }

    return result;
}

/*
Partition Until
  
Si implementi una funzione partition_until(arr, depth), con arr un array di numeri interi (non vuoto) e depth un intero >= 0. 
La funzione, ricorsivamente, applica il paradigma “divide-et-impera” come segue:
  
se depth=0 o l’array arr contiene un solo elemento, restituisce un array contenente arr;

altrimenti, calcola ricorsivamente le partizioni di profondità 
depth-1 delle due metà di arr (calcolate rispetto all'elemento centrale, 
ovvero in indice arr.length/2 approssimato all'intero inferiore se la lunghezza è dispari).

*/

function partition_until_M(arr, depth) {
    if (depth == 0 || arr.length == 1) return [arr];
    let f_r = [];
    let p_r = [];
    let r = Math.floor(arr.length / 2)
    for (let i = 0; i < r; i++) {
        f_r.push(arr[i]);
    }
    for (let i = r + 1; i < arr.length; i++) {
        p_r.push(arr[i]);
    }
    partition_until_M(f_r, depth - 1)
    partition_until_M(p_r, depth - 1)

    // Impera
    return f_r.concat(p_r);

}

//soluzione 
function partition_until(arr, depth) {
    // Caso Base
    if (arr.length == 1 || depth == 0) {
        return [arr];
    }

    // Divisione dell'array in base al centro
    let center = Math.floor(arr.length / 2);
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        if (i < center) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Chiamata ricorsiva
    left = partition_until(left, depth - 1);
    right = partition_until(right, depth - 1);

    // Impera
    return left.concat(right);
}


// Punto Fisso <-> insieme degli x t.c. f(x) = x con F:A-->A
//dati due insiemi x ed y controllare se x è sottoinsieme di y 
function controlla_sottoinsieme(x, y) {
    for (let el in x) { // scorro gli elementi di x 
        if (!(el in y)) { // per ogni elemento di x controllo se NON è in y 
            return false; // => se c'è un elemento di x che non è in y allora ritorno false (x non è sottoinsieme di y)
        }
    }
    return true; // => tutti gli elementi di x sono anche elementi di y => x sottoinsieme di y => ritorno true 
}

function punto_fisso(f) { //f è la funzione 
    return (x) => {
        let y = f(x); // y è l'insieme degli elementi dati dall'applicazione della funzione agli elementi di x 
        return controlla_sottoinsieme(x, y) && controlla_sottoinsieme(y, x);
    }
}

// Aggiorna POI
function distanza(lat1, lon1, lat2, lon2) {
    return Math.round(Math.sqrt(Math.pow((lat2 - lat1), 2) + Math.pow((lon2 - lon1), 2)))
}

// Comparazione dei punti per ordinamento
function compara_punti(a, b) {
    if (a.distanza > b.distanza) {
        return -1;
    } else if (a.distanza < b.distanza) {
        return 1;
    } else {
        if (a.ID > b.ID) {
            return -1;
        } else {
            return 1;
        }
    }
}



function ordina_punti(arr, lat, lon) {
    // Aggiungere campo distanza
    for (let i = 0; i < arr.length; i++) {
        // Distanza tra i-esimo oggetto e riferimento
        arr[i]["distanza"] = distanza(arr[i]["latitudine"],
            arr[i]["longitudine"],
            lat, lon);
        // arr[i].distanza
    }

    // Ordina Array
    arr.sort(compara_punti);

    return arr;
}

// Aggiorna Ordini
function aggiorna(ordini) {
    // Copia degli ordini
    let ordini_copy = [];

    for (let i = 0; i < ordini.length; i++) {
        ordini_copy.push({
            numero_ordine: ordini[i].numero_ordine,
            giorno: ordini[i].giorno,
            mese: ordini[i].mese,
            anno: ordini[i].anno,
            prezzo: ordini[i].prezzo,
            posizione: i
        })
    }

    // Ordiniamo la copia dell'array
    ordini_copy.sort((x, y) => {
        let diff = x.anno - y.anno;
        if (diff == 0) {
            diff = x.mese - y.mese;
            if (diff == 0) {
                diff = x.giorno - y.giorno;
                if (diff == 0) {
                    diff = x.numero_ordine - y.numero_ordine
                }
            }
        }

        return diff;
    })

    // L'elemento in posizione 3 dopo l'ordinamento
    // si trova in posizione 5 in ordini_copy

    // Se l'elemento si trova in posizione 5
    // nell'array ordini_copy

    for (let i = 0; i < ordini_copy.length; i++) {
        ordini[ordini_copy[i].posizione].numero_ordine = i + 1;
        // ordini[ordini_copy[5].posizione].numero_ordine = 6;
        // ordini[3].numero_ordine = 6;
    }
}