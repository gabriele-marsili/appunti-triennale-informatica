/*

La convoluzione (semplificata) è un operatore matematico che dati in input una funzione
f ed un array a di elementi (di dimensione n), restituisce un nuovo array b tale che

b[0] = f(0,a[0],a[1])
b[i] = f(a[i-1],a[i],a[i+1]) 	// per ogni i tra 1 e n-2
b[n-1] = f(a[n-2],a[n-1],0)	

Si implementi la funzione convolve(f) che, data una funzione f, restituisca come valore di ritorno una funzione g. 
La funzione g prenderà in input un array a di numeri (di dimensione n>=2) e restituirà un nuovo array ottenuto applicando 
la convoluzione di f ad a. (Nota: Se la dimensione dell’array in input è minore di 2, la funzione restituita calcola undefined)

Esempio: 
convolve(Math.max)([1]) →undefined
convolve(Math.max)([1, 3, 8, 5, 7, 2, -1]) →[3, 8, 8, 8, 7, 7, 2]


*/

// ES 1
convolve = (f) => {
    var new_array = [];

    return g = (arr_A) => {
        //console.log("arr_A= ", arr_A)
        if (arr_A.length < 2) return undefined;
        for (let i = 0; i <= arr_A.length - 1; i++) {
            switch (i) {
                case 0: // => b[0]
                    new_array.push(f(i, arr_A[i], arr_A[i + 1]))
                    break;

                case (arr_A.length - 1): // => b[n-1] => i = n - 1 
                    new_array.push(f(arr_A[i - 1], arr_A[i], 0))
                    break;

                default: // => b[i]
                    new_array.push(f(arr_A[i - 1], arr_A[i], arr_A[i + 1]))
                    break
            }
        };

        return new_array;
    }
}


//console.log(convolve(Math.max)([1]))
//console.log(convolve(Math.max)([1, 3, 8, 5, 7, 2, -1])) // →[3, 8, 8, 8, 7, 7, 2]





// ES 2

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


function scontrino(a) {
    let scontrino_finale = {} // oggetto vuoto da riempire con oggetti 

    for (let i = 0; i < a.length; i++) { // → scorre arr a di pggetti 

        let prodotto = a[i]; // => oggetto con prodotto
        let barcode_prodotto = prodotto.barcode; // => chiave 
        let prezzo_prodotto = prodotto.prezzo;

        function trova_q(arr_a, b) {
            let c = 0;
            for (let i = 0; i < arr_a.length; i++) { // scorro array a di oggetti ( prodotti )
                if (arr_a[i].barcode == b) c++;
            }

            return c;
        }

        if (!(barcode_prodotto in scontrino_finale)) {
            barcode_prodotto = String(barcode_prodotto)
                //let b_p = `${barcode_prodotto}`
            let ogg_da_assegnare = ({ "prezzo": prezzo_prodotto, "quantità": trova_q(a, barcode_prodotto) })
                //console.log("ogg_da_assegnare = ", ogg_da_assegnare)
            scontrino_finale[barcode_prodotto] = ogg_da_assegnare
                //let o = { b_p = { "prezzo": prezzo_prodotto, "quantità": trova_q(a, barcode_prodotto) } }
                //scontrino_finale = Object.assign({}, scontrino_finale, o);
        }

        console.log(scontrino_finale);




    }
    let totale = 0
    for (k in scontrino_finale) {
        let ogg = scontrino_finale[k]
        console.log(ogg);
        let prezzo_p = ogg.prezzo
        let quantità_p = ogg.quantità

        console.log(prezzo_p);
        console.log(quantità_p);

        totale = totale + prezzo_p * quantità_p

    }

    //scontrino_finale.push(totale);
    (scontrino_finale["totale"]) = totale
    return scontrino_finale;



}


//console.log(scontrino(prodotti))


// ES 3 (Unione estremi)

function unisci_estremi(a, b) {
    let insieme_finale = {}

    function find_max_and_min(insieme) {
        let max = -Infinity
        let min = +Infinity
        for (k in insieme) { // => scorre elementi dell'insieme
            if (k >= max) {
                max = k
            }
            if (k <= min) {
                min = k
            }
        }
        console.log("min = ", min)
        console.log("max = ", max)
        if (max == min) {
            insieme_finale[max] = true
        } else {
            insieme_finale[min] = true;
            insieme_finale[max] = true;
            // li mette ordinandoli a caso
        }
    }

    find_max_and_min(a);
    find_max_and_min(b);

    return insieme_finale
}
let s1 = { "1": true, "-5": true, "10": true }
let s2 = { "12": true }
    //console.log(unisci_estremi(s1, s2))


// ES 4 

function sbarbalbero(t) {
    for (k in t) {
        //console.log("k = val or figli = ", k) // k = val / figli


        if (k == "figli") { // => se valore = array --> check (=> figli) | => k == figli / Array.isArray(t[k]) 
            let arr = t[k] // => arr di oggetti 
                //console.log("arr = ", arr)
                //console.log(" arr.length = ", arr.length)
            for (let i = 0; i < arr.length; i++) { // => scorro array e faccio ricorsione su oggetti  
                //console.log("chiamo sbarbalbero su arr[] = ", arr[i])
                sbarbalbero(arr[i]) // chiamo sbarbalbero ricorsivamente 
                    //return
            }

        }


    }

    if (t["val"] == "barbalbero") {
        t["val"] = "sbarbato"
        t["figli"] = [] // => tolgo figli
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

// ES 5 

function sort_vehicles(v) {
    let arr_precedenze = ["auto", "camion", "moto"]

    for (let i = 0; i < v.length; i++) { // scorre array di veicoli 

        for (let j = i; j > 0; j--) { // dal veicolo scorro indietro per confronto con precedenti
            // arr_precedenze.indexOf(v[i].tipo) => restituisce 0 or 1 or 2 dove 0 ha maggior precedenza
            tipo_v_i = String(v[i]["tipo"])
            tipo_v_j = String(v[j]["tipo"])

            //console.log("tipo_v_i = ", tipo_v_i)
            //console.log("tipo_v_j = ", tipo_v_j)


            //console.log("arr_precedenze.indexOf(tipo_v_i)= ", arr_precedenze.indexOf(tipo_v_i))
            //console.log("arr_precedenze.indexOf(tipo_v_j)= ", arr_precedenze.indexOf(tipo_v_j))

            if (arr_precedenze.indexOf(tipo_v_i) < arr_precedenze.indexOf(tipo_v_j)) { // controllo tipo
                //scambio elem v[i] con precedente (v[j])
                let appoggio_1 = v[j];
                v[j] = v[i];
                v[i] = appoggio_1;
                i = i - 1
            }

            if (arr_precedenze.indexOf(v[i].tipo) == arr_precedenze.indexOf(v[j].tipo)) { // tipo uguale 

                if (v[i].cilindrata < v[j].cilindrata) { // controllo cilindrata 
                    //scambio elem v[i] con precedente (v[j])
                    let appoggio_2 = v[j];
                    avrr[j] = v[i];
                    v[i] = appoggio_2;
                    i = i - 1
                }

                if (v[i].cilindrata == v[j].cilindrata) { // cilindrata uguale 

                    if (v[i].peso < v[j].peso) { // controllo peso 
                        //scambio elem v[i] con precedente (v[j])
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

console.log(sort_vehicles(my_v))