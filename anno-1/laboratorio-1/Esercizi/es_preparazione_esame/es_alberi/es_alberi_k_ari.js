// https://replit.com/@731AA2223LABIB/Lezione-16-Alberi-K-ari-GABRIELEMARSILI
var t11 = {
    val: 12344
}

var t22 = {
    val: 723
}

var t1 = {
    val: 31,
    figli: [t11, t22]
}


var t2 = {
    val: 42,
    figli: [t11, t22, t1]
}

var tree = {
    val: 9,
    figli: [t1, t2]
}


//Trovare il massimo fra i valori in un albero (k-ario)
function find_max(albero) {
    let max = albero.val
    if (albero.figli) {
        for (let tree of albero.figli) {
            if (tree.val > max) max = tree.val
            if (tree.figli) {
                max = Math.max(max, find_max(tree))
            }
        }
    }
    return max
}
//console.log(find_max(tree))

//● Dire se un albero contiene un valore cercato o no
function find_val(albero, val) {
    if (albero.val === val) return true

    if (albero.figli) {
        for (let tree of albero.figli) {
            if (find_val(tree, val)) return true
        }
    }

    return false
}
//console.log(find_val(tree, 12344))
//console.log(find_val(tree, 455))

//● Applicare una funzione data a tutti i valori contenuti in un albero, sostituendoin ogni nodo il valore attuale con il 
//risultato della funzione applicata al valore attuale
function applica_f(albero, f) {
    albero.val = f(albero.val)

    if (albero.figli) {
        for (let tree of albero.figli) {
            applica_f(tree, f)
        }
    }

    return albero
}
console.log(applica_f(tree, f = (a) => 2 * a))