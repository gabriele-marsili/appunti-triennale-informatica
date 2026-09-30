/*
ES 1
Si scriva una funzione map_tree(tree, sx_fun, dx_fun) che, 
dato un albero binario e due funzioni sx_fun e dx_fun, 
restituisca un altro albero senza alterare l'originale. 
Nell'albero risultante, il valore di ciascun figlio di sinistra 
è sostituito con il risultato dell’applicazione di sx_fun; rispettivamente, 
i figli di destra sono sostituiti dall’applicazione di dx_fun. 
Se sx_fun o dx_fun sono undefined, il valore del nodo non viene alterato. 
Si assuma che alla radice si applichi la funzione sx_fun.



Notazione.

Come visto a lezione, un albero binario è codificato come un oggetto JavaScript 
con proprietà val, sx, e dx, dove sx e dx sono rispettivamente il ramo di sinistra e di destra. 
L’albero segnala l’assenza di un figlio con il valore null nella rispettiva proprietà.

var map_tree = (tree, sx_fun, dx_fun) => {

    function sotto_albero(albero, funz) {
        //console.log("albero:\n ", albero)
        if (albero == null) {
            return null
        }

        return SottoAlbero = {
            val: funz == undefined ? albero.val : funz(albero.val),
            sx: albero.sx == null ? null : sotto_albero(albero.sx, sx_fun),
            dx: albero.dx == null ? null : sotto_albero(albero.dx, dx_fun)

            //sx: albero.sx == null ? null : albero.sx,
            //dx: albero.dx == null ? null : albero.dx
        }
    }

    return result_tree = {
        val: sx_fun != undefined ? sx_fun(tree.val) : tree.val,
        sx: tree.sx == null ? null : sotto_albero(tree.sx, sx_fun),
        dx: tree.dx == null ? null : sotto_albero(tree.dx, dx_fun),
    }


}
*/

/*
ES 2
Sia partite un array di oggetti, dove ogni oggetto contiene uno storico degli scontri 
diretti tra due squadre, con i seguenti campi:


squadraCasa: nome della squadra che gioca in casa
squadraOspite: nome della squadra ospite
vittorieCasa: numero di vittorie della squadra in casa
totalePartite: numero di incontri totali tra le due squadre


Si scriva una funzione pronostico(partite) che restituisca un array di oggetti 
a cui si aggiunge la proprietà probVincita calcolata come vittorieCasa/totalePartite 
arrotondata alla seconda cifra decimale (più vicina).

In caso di totalePartite uguale a zero, la probabilità di vincita è zero.

L'array ritornato deve essere ordinato in maniera decrescente in base alla probabilità 
di vincita della squadra di casa; a parità di probabilità di vincita, 
ordinare alfabeticamente per il nome della squadra di casa.



Tip: L'arrotondamento di una variabile x alla seconda cifra decimale (più vicina) 
si può calcolare con Math.round(100*x)/100


 
function pronostico(partite) {
    var arr_res = []
    var arr_alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "z"];
    var arr_alfabeto_M = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "Z"];


    for (let i = 0; i < partite.length; i++) {
        partite[i].probVincita = partite[i].totalePartite == 0 ? 0 : Math.round(100 * (partite[i].vittorieCasa / partite[i].totalePartite)) / 100

        arr_res.push(partite[i])



        for (let j = 0; j < arr_res.length; j++) {
            let key_scambio = "close"
            if (arr_res[i].probVincita > arr_res[j].probVincita) {
                //scambio 
                let appoggio = arr_res[j]
                arr_res[j] = arr_res[i]
                arr_res[i] = appoggio
                key_scambio = "open"

            } else if ((arr_res[i].probVincita == arr_res[j].probVincita) && (arr_res[i].squadraCasa != arr_res[j].squadraCasa)) { // probabilità uguale e nomi diversi 



                let arr_nome_1 = [...String(arr_res[i].squadraCasa)]
                let arr_nome_2 = [...String(arr_res[j].squadraCasa)]
                let k = 0

                do {
                    var index_1 = arr_alfabeto.indexOf(arr_nome_1[k]) == -1 ? arr_alfabeto_M.indexOf(arr_nome_1[k]) : arr_alfabeto.indexOf(arr_nome_1[k])
                    var index_2 = arr_alfabeto.indexOf(arr_nome_2[k]) == -1 ? arr_alfabeto_M.indexOf(arr_nome_2[k]) : arr_alfabeto.indexOf(arr_nome_2[k])

                    if (index_1 < index_2) {
                        //scambio 
                        let appoggio = arr_res[j]
                        arr_res[j] = arr_res[i]
                        arr_res[i] = appoggio
                        key_scambio = "open"


                    }
                    k = k + 1

                } while ((index_1 == index_2) && (k < arr_nome_1.length)) // se due nomi squadre iniziano con stesse lettere continua finché non trova lettere diverse
            }

            if (key_scambio != "close") j = j - 1
        }
    }

    return arr_res

}
*/

/*
ES 3
Dato un albero k-ario T, definire una funzione ricorsiva 
taglia_nodi_interni che, preso in input un intero positivo m, modifica T in-place, 
rimuovendo tutti i nodi interni (e i rispettivi sottalberi) che hanno meno di m figli.

Notazione
Si codifichi l'albero k-ario T come visto a lezione, 
perciò un albero è rappresentato da un oggetto così formato {val: , figli:[...]}

Si noti inoltre che l'albero vuoto è codificato con il valore null.


var taglia_nodi_interni = (t, m) => {

    function delete_sottoalbero(tree, valore, genitore) {

        if (tree.figli.length < valore) { //&& (tree.figli.figli != [])
            tree.figli = [] // eliminazione dei figli 
            let index = Infinity
            for (let y = 0; y < genitore.figli.length; y++) {
                if (genitore.figli[y].val == tree.val) {
                    index = y
                    console.log("index = ", index)
                }
            }

            genitore.figli.splice(index, 1)

        } else {
            for (let j = 0; j < tree.figli.length; j++) {

                if (tree.figli[j].figli.length > 0) {

                    delete_sottoalbero(tree.figli[j], valore, tree)
                }


            }
        }

        return tree
    }
    if (typeof(t) == "object" && t !== null) {
        var figli_check = "figli" in t; // => true / false 
        var valore_check = "val" in t;



        if (!figli_check || !valore_check || t.val == null) {
            return t
        } else return delete_sottoalbero(t, m, t)
    } else return t


}
*/


/*
ES 4

Si scriva una funzione ricorsiva check_array(arr) che dato un array a = [a0;a1...aN]
di interi positivi ai in Z+ restituisca true o false in base alla 
veridicità della seguente proprietà:



Sia c un array contenente la somma di cifre dell'array arr dalla coppia più esterna 
(c0 = a0+aN) a quella più interna (c k-1 = a k-1 + a k+1), dove k = n/2
è l'indice centrale dell'array approssimato per difetto. 

La funzione check_arr(arr) ritorna true se e solo se c1 è divisibile per c0, 
c2 è divisible per c1, e così via, fino a c k-1 divisible per c k-2.

Nota:
Tutti gli array con n<=3 avendo solo una coppia o nessuna, 
rispettano per definizione la proprietà

var check_array = (arr) => {
    // arr = array di n numeri interi positivi [a0 , ..., an]
    var arr_of_c = []
    var k = Math.floor(arr.length / 2) // => metà array approssimata per difetto 
    var p = 0 // primo elemento 
    var q = arr.length - 1 // ultimo elemento 

    if (arr.length <= 3) return true
    else {
        for (var i = 0; i < k; i++) {
            arr_of_c.push((arr[p] + arr[q])) // aggiungo in arr_of_c la somma di primo ed ultimo elemento di arr 
            p++; // incremento p 
            q--; // decremento q 

            if (arr_of_c.length > 1) { // arr c ha almeno 2 elementi => confronto 
                // i alla prima iterazione è = 1 => arr_of_c[i] = c1 && arr_of_c[i-1] = arr_of_c[0] = c0
                if (arr_of_c[i] % arr_of_c[i - 1] != 0) return false // ho un c(n+1) non dividibile per c(n) => posso restituire false
            }
        }


    }

    return true // => l'array arr soddifa la proprietà


}
*/

/*


ES 5

Si scriva una funzione recludi_punti_fissi(f) 
che prenda in input una funzione f 
(da insiemi a insiemi) 
e restituisca una nuova funzione. 

La nuova funzione prende in input un array 
di insiemi di interi A e un intero n, 
e modifica A in place eliminando gli ultimi 
n punti fissi di f dall'array. 

(Si ricordi che, data una funzione f definita su 
insiemi, un insieme X è punto fisso di f se f(X) = X)

var recludi_punti_fissi = (f) => {

    function check_sottoinsieme(a, b) {
        for (let i in a) {
            if (!(i in b)) {
                return false //"a non è sottoinsieme di b!"
            }
        }
        return true //"a è sottoinsieme di b!"
    }

    //Funzione che controlla se due insiemi sono identici
    function check_uguale(a, b) {
        return check_sottoinsieme(a, b) && check_sottoinsieme(b, a)
    }


    return new_F = (A, n) => {
        var counter_punti_fissi = 0;
        var i = A.length - 1 // => scorro all'indietro A
            //console.log(A)
            //console.log(n)
            //console.log(counter_punti_fissi)
            //console.log(i)


        while (counter_punti_fissi < n && i >= 0) {

            let check_1 = f(A[i])
            let check_2 = A[i]
            console.log(check_1)
            console.log(check_2)
            console.log("-----")

            if (check_uguale(check_1, check_2)) { // => A[i] (insieme) è un punto fisso di f
                console.log("elimino ", A[i])

                A.splice(i, 1) // => elimino A[i] da A a.k.a elimino il punto fisso 
                console.log("new A = ", A)

                counter_punti_fissi++ // => incremento il counter dei punti fissi eliminati 
            }
            i-- // => decremento i 
        }

        return A


    }


}
*/

/*
Si consideri il problema di gestire una concessionaria, le cui automobili sono memorizzate 
in un array di oggetti, i cui campi sono i seguenti:



- Telaio: stringa alfanumerica che identifica l'automobile;

- Anno: numero che indica l'anno di produzione;

- Prezzo: numero che indica il prezzo di acquisto in euro;

- Disponibile: booleano che indica se l'auto è disponibile per la vendita.



Sviluppare le tre seguenti funzioni:

(1) presente(concessionaria,auto): restituisce true se l'array concessionaria contiene 
un'automobile uguale all'auto passata in input;

(2) disponibili(concessionaria): restituisce un nuovo array contenente le auto disponibili 
nell'array concessionaria;

(3) filtra_per_anno(concessionaria, anno, operatore): restituisce un nuovo array contenente 
le automobili il cui anno soddisfa il controllo "operatore anno", dove operatore può essere 
"<", ">", o "==". Ad esempio, filtra_per_anno(concessionaria, 2017, "<") 
restituisce tutte le automobili in concessionaria il cui anno indica che sono precedenti al 2017. 
In caso di operatore non valido, restituire il valore undefined


ES 6

function presente(concessionaria, auto) {

    //Funzione che controlla se due auto sono uguali
    function check_uguale(a, b) {
        //console.log("a e b :")
        //console.log(a)
        //console.log(b)
        //console.log("----")

        if ((a.Telaio == b.Telaio) && (a.Anno == b.Anno) && (a.Prezzo == b.Prezzo) && (a.Disponibile == b.Disponibile)) return true
        else return false

    }




    for (let i in concessionaria) {
        //console.log(concessionaria[i])
        //console.log(auto)
        if (check_uguale(concessionaria[i], auto)) { // controllo che l'auto data da concessionaria[i] sia == all'auto passata come parametro
            return true
        }

    }
    return false // => non ho trovato nemmeno 1 auto in concessionaria == all'auto passata come parametro
}



function disponibili(concessionaria) {
    let res = [];
    for (let i = 0; i < concessionaria.length; i++) {

        if (concessionaria[i].Disponibile) { // => auto disponibile
            res.push(concessionaria[i])
        }

    }
    return res
}

function filtra_per_anno(concessionaria, anno, operatore) {
    let res = [];
    if (operatore != "<" && operatore != ">" && operatore != "==") return undefined
    else {
        for (let i = 0; i < concessionaria.length; i++) {
            if (operatore == "<") {
                if (concessionaria[i].Anno < anno) {
                    res.push(concessionaria[i])
                }
            } else if (operatore == ">") {
                if (concessionaria[i].Anno > anno) {
                    res.push(concessionaria[i])
                }
            } else if (operatore == "==") {
                if (concessionaria[i].Anno == anno) {
                    res.push(concessionaria[i])
                }
            }

        }
        return res
    }
}



 */