/* Esercizio 1.

Si scriva una funzione map_tree(tree, sx_fun, dx_fun) che, dato un albero binario 
e due funzioni sx_fun e dx_fun, restituisca un altro albero senza alterare l'originale. 

Nell'albero risultante, il valore di ciascun figlio di sinistra è sostituito con il risultato dell’applicazione di sx_fun; 
rispettivamente, i figli di destra sono sostituiti dall’applicazione di dx_fun. 
Se sx_fun o dx_fun sono undefined, 
il valore del nodo non viene alterato. Si assuma che alla radice si applichi la funzione sx_fun.

Notazione: Come visto a lezione, un albero binario è codificato come un oggetto JavaScript con proprietà val, sx, 
e dx, dove sx e dx sono rispettivamente il ramo di sinistra e di destra. 
L’albero segnala l’assenza di un figlio con il valore null nella rispettiva proprietà.
*/

function map_tree(tree, sx_fun, dx_fun) {
    if (tree.sx != null) {
        if (sx_fun != undefined) tree.sx.val = sx_fun(tree.sx.val)
        map_tree(tree.sx)
    }

    if (tree.dx != null) {
        if (dx_fun != undefined) tree.dx.val = dx_fun(tree.dx.val)
        map_tree(tree.dx)
    }

}


/*SOLUZIONE:
function map_tree(tree, sx_fun, dx_fun) {
    // Defaults to identify function
    if (sx_fun === undefined) {
        sx_fun = (x) => x;
    }
    if (dx_fun === undefined) {
        dx_fun = (x) => x;
    }

    function apply_fun(node, branch) {
        // Check if node exists
        if (node == null){
            return null;
        }

        // Compute new value
        let new_val = null;
        if (branch == 'left') {
            new_val = sx_fun(node.val);
        } else {
            new_val = dx_fun(node.val);
        }

        // Return new tree
        return {
            val: new_val,
            sx: apply_fun(node.sx, 'left'),
            dx: apply_fun(node.dx, 'right')                
        }
    }

    return apply_fun(tree, 'left')
}
 */

/*
Sia partite un array di oggetti, dove ogni oggetto contiene uno storico degli scontri diretti tra due squadre, con i seguenti campi:

- squadraCasa: nome della squadra che gioca in casa
- squadraOspite: nome della squadra ospite
- vittorieCasa: numero di vittorie della squadra in casa
- totalePartite: numero di incontri totali tra le due squadre

Si scriva una funzione pronostico(partite) che restituisca un array di oggetti a cui si aggiunge 
la proprietà "probVincita" calcolata come vittorieCasa/totalePartite arrotondata alla seconda cifra decimale (più vicina).

In caso di totalePartite uguale a zero, la probabilità di vincita è zero.

L'array ritornato deve essere ordinato in maniera decrescente in base alla probabilità di vincita della squadra di casa; 
a parità di probabilità di vincita, ordinare alfabeticamente per il nome della squadra di casa.

Tip: L'arrotondamento di una variabile x alla seconda cifra decimale (più vicina) si può calcolare con Math.round(100*x)/100
*/

function pronostico(partite) {
    let res = [];
    for (let i = 0; i < partite.length; i++) {
        let partita = partite[i]
        if (partita["totalePartite"] == 0) partita.probVincita = 0
        else {

            //console.log(partita)
            //console.log(partita["vittorieCasa"])
            //console.log(partita["totalePartite"])
            let prob = partita["vittorieCasa"] / partita["totalePartite"]
                //console.log(prob)
            partita["probVincita"] = Math.round(100 * prob)
                //console.log(partita.probVincita)
        }
        res.push(partita)
            /*
            if (res.length == 0) res.push(partita)
            else {
                for (var j = 0; j < res.length; j++) {
                    let key = true
                    console.log(partita["probVincita"])
                    console.log(res[j].probVincita)
                    if (partita["probVincita"] > res[j].probVincita) {
                        res.splice(j, 0, partita);
                        j++;
                        console.log("nuovo res = ", res)
                        key = false
                    }

                    if (partita.probVincita == res[j].probVincita && partita.squadraCasa < res[j].squadraCasa) {
                        res.splice(j, 0, partita);
                        j++
                        key = false;
                        console.log("nuovo res = ", res)

                    }

                    if (key) res.push(partita);
                }
            }
            */
    }
    //console.log(res)
    for (let i = 0; i < res.length; i++) {
        key = false
        for (let j = 0; j < res.length; j++) {
            //console.log("i = ", i, "res[i][probVincita = ", res[i]["probVincita"])
            //console.log("j = ", j, "res[j][probVincita = ", res[j]["probVincita"])
            if (res[i]["probVincita"] > res[j]["probVincita"]) {
                app = res[j]
                res[j] = res[i];
                res[i] = app
                key = true
            }
        }
        if (key) i--
    }

    return res;
}

var partite_es = [{
        squadraCasa: "Siviglia",
        squadraOspite: "Juventus",
        vittorieCasa: 1,
        totalePartite: 5
    },


    {
        squadraCasa: "Bologna",
        squadraOspite: "Barcellona",
        vittorieCasa: 0,
        totalePartite: 3
    },

    {
        squadraCasa: "Juventus",
        squadraOspite: "Siviglia",
        vittorieCasa: 2,
        totalePartite: 5
    },

    {
        squadraCasa: "Inter",
        squadraOspite: "Milan",
        vittorieCasa: 13,
        totalePartite: 30
    }

];
console.log(pronostico(partite_es))

/*soluzione:
function compareFn(a, b){
    if(a.probVincita != b.probVincita){
        return b.probVincita - a.probVincita;
    }
    else if(a.squadraCasa < b.squadraCasa){
        return -1;
    } else {
        return 1;
    }
}

function pronostico(partite){
  for (let partita of partite) {
    if (partita.totalePartite == 0) {
      partita["probVincita"] = 0.0
    } else {
      partita["probVincita"] = Math.round(
        100*partita.vittorieCasa/partita.totalePartite) / 100
    }
  }

  return partite.sort(compareFn)
}
 */


/*
Esercizio 3

Dato un albero k-ario T, definire una funzione ricorsiva taglia_nodi_interni che, 
preso in input un intero positivo m, modifica T in-place, rimuovendo tutti i nodi interni 
(e i rispettivi sottalberi) che hanno meno di m figli.

Notazione: Si codifichi l'albero k-ario T come visto a lezione, 
perciò un albero è rappresentato da un oggetto così formato {val: , figli: [...]}
Si noti inoltre che l'albero vuoto è codificato con il valore null.
*/

function taglia_nodi_interni(T, m) {
    if (T.val == null || T.figli.length == 0) return T;
    else {
        for (var i = 0; i < T.figli.length; i++) {
            if (T.figli[i]["figli"].length < m) T.figli[i].splice(i, 1)
            else taglia_nodi_interni(T.figli[i], m);
        }

    }
}

/*soluzione:
function taglia_nodi_interni(T, m) {
    if (T == null) {
        return;
    }

    if (T.figli.length == 0) return;
    else {
        var elementi_da_rimuovere = [];

        for (let i = 0; i < T.figli.length; ++i) {
            let t = T.figli[i];
            if (t.figli.length > 0 && t.figli.length < m) {
                elementi_da_rimuovere.push(i);
            } else {
              taglia_nodi_interni(t, m);
            }
        }

        let nuovi_figli = [];
        for (let i = 0; i < T.figli.length; ++i) {
            if (!elementi_da_rimuovere.includes(i)) {
                nuovi_figli.push(T.figli[i]);
            }
        }
        T.figli = nuovi_figli;
    }
}
 */

/*
Esercizio 4.

Si scriva una funzione ricorsiva check_array(arr) 
che dato un array a=[a_0, ..., a_n] 
di interi positivi restituisca true o false in base alla veridicità della seguente proprietà.

Sia c un array contenente il prodotto di cifre dell'array arr dalla coppia 
iù esterna (c_0 = a_0 * a_n) a quella più interna (c_{k-1} = a_{k-1} * a_{k+1}), 
dove k=floor(n/2) è l'indice centrale dell'array approssimato per difetto.

La funzione check_arr(arr) ritorna true se e solo se c_1 è divisibile per c_0, c_2 è divisibile per c_1,, 
e così via, fino a c_{k-1} divisible per c_{k-2}.

Nota: Tutti gli array con n <= 3 avendo solo una coppia o nessuna, rispettano per definizione la proprietà.
*/


function check_array(arr) {
    if (arr.length <= 3) return true
    c = []
    let i = 0;
    let j = arr.length - 1
    let k = Math.floor(arr.length / 2)
    while (i < j && i < k && j > k) {
        c.push(arr[i] * arr[j])
        i++
        j--
    }
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] % arr[i - 1] != 0) return false
    }
    return true

}
/*soluzione
function _check_array(arr, prod) {

    if(arr.length <= 1)
        return true;
    
    if((arr[0] * arr[arr.length-1]) % prod != 0)
        return false
        
    return check_array(arr.slice(1, -1), arr[0] * arr[arr.length-1]);
};

function check_array(arr) {
  return _check_array(arr, 1);
}
 */

/*
Esercizio 5.

Si scriva una funzione recludi_punti_fissi(f) 
che prenda in input una funzione f (da insiemi a insiemi) 
e restituisca una nuova funzione. 

La nuova funzione prende in input un array di insiemi di interi A e un intero n, e 
modifica A in place eliminando i primi n punti fissi di f dall'array. 
(Si ricordi che, data una funzione f definita su insiemi, un insieme X è punto fisso di f se f(X) = X)
*/

function recludi_punti_fissi(f) {
    var new_f = (A, n) => {
        for (let i = 0; i < A.length; i++) {
            if (f(A[i]) === A[i] && n > 0) {
                A.splice(i, 1)
                n--
            }
        }
        return A;
    }

    return new_f
}

/*soluzione:
function check_sub(x1, x2) {
    for (let el in x1)
        if (!(el in x2)) return false;
    return true;
}

function pf(f){
    return (x1) => {
        let x2 = f(x1)
        if (check_sub(x1, x2) && check_sub(x2, x1)) return true;
        return false;
    }
}

function recludi_punti_fissi(f){
    let f_pf = pf(f);
    return (a, n) => {
        let i = 0;
        let n_deleted = 0;
        while (i < a.length && n_deleted < n){
            if (f_pf(a[i])) {
                a.splice(i, 1);
                n_deleted++;    
            }
            else i++
        }
        return a
    }
}

*/

/*
Esercizio 6.

Si consideri il problema di gestire una concessionaria, 
le cui automobili sono memorizzate in un array di oggetti, i cui campi sono i seguenti:

- Telaio: stringa alfanumerica che identifica l'automobile;
- Anno: numero che indica l'anno di produzione;
- Prezzo: numero che indica il prezzo di acquisto in euro;
- Disponibile: booleano che indica se l'auto è disponibile per la vendita.

Sviluppare le tre seguenti funzioni:
  - (i). presente(concessionaria,auto): restituisce true se l'array concessionaria 
  contiene un'automobile uguale all'auto passata in input;
  
  - (ii). disponibili(concessionaria): restituisce un nuovo array contenente le auto 
  disponibili nell'array concessionaria;
  
  - (iii). filtra_per_anno(concessionaria, anno, operatore): restituisce un nuovo array 
  contenente le automobili il cui anno soddisfa il controllo "operatore anno", 
  dove operatore può essere "<", ">", o "==".
  
  Ad esempio, filtra_per_anno(concessionaria, 2017, "<") restituisce tutte le automobili
 in concessionaria il cui anno indica che sono precedenti al 2017. In caso di operatore non valido, restituire il valore undefined
*/


function presente(concessionaria, auto) {
    //if (auto in concessionaria) return true
    //else return false
    for (let car of concessionaria) {
        if (car.Anno == auto.Anno && car.Telaio == auto.Telaio && car.Prezzo == auto.Prezzo && car.Disponibile == auto.Disponibile) return true
    }
    return false;
}

function disponibili(concessionaria) {
    let res = []
    for (auto of concessionaria) {
        if (auto.Disponibile) res.push(auto)
    }
    return res;
}

function filtra_per_anno(concessionaria, anno, operatore) {
    // Check valid operator
    if (operatore != "<" && operatore != ">" && operatore != "==") {
        return undefined;
    }

    res = [];
    switch (operatore) {
        case "<":
            for (auto of concessionaria) {
                if (auto.anno < anno) res.push(auto)
            }
            return res
        case ">":
            for (auto of concessionaria) {
                if (auto.anno > anno) res.push(auto)
            }
            return res
        case "==":
            for (auto of concessionaria) {
                if (auto.anno == anno) res.push(auto)
            }
            return res
        default:
            return undefined
    }

}

/*soluzione:
function presente(concessionaria, macchina){
  var trovata = false
  for (let macchina_i of concessionaria) {
    trovata = macchina_i.Telaio == macchina.Telaio;
    trovata = trovata && macchina_i.Anno == macchina.Anno;
    trovata = trovata && macchina_i.Prezzo == macchina.Prezzo;
    trovata = trovata && macchina_i.Disponibile == macchina.Disponibile;
    // Controllo aggiuntivo sulle chiavi
    if (trovata) {
      return true;
    }
  }

	return false;
}

function disponibili(concessionaria){
	var macchine_disponibili = []
  for (let macchina of concessionaria) {
    if (macchina.Disponibile === true) {
      macchine_disponibili.push(macchina)
    }
  }

	return macchine_disponibili
}

function filtra_per_anno(concessionaria, anno, operatore){
  // Check valid operator
  if (operatore != "<" && operatore != ">" && operatore != "==" ){
    return undefined;
  }
	var macchine = []
	var check = false
	for(let i=0; i<concessionaria.length;i++){
		switch (operatore) {
		    case '>':
		      check = concessionaria[i].Anno > anno;
		      break;
		    case '<':
		      check = concessionaria[i].Anno < anno;
		      break;
		    case '==':
		      check = concessionaria[i].Anno == anno;
		      break;
		    default:
		      return undefined
		  }

		if(check){
			macchine.push(concessionaria[i])
		}
	}

	return macchine
}
 */