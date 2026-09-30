/*
var c = 0
var previous_tree_sn_val = 0

var map_tree = (tree, sx_fun, dx_fun) => {


    if (c == 0) {
        c = 1
        try {
            previous_tree_sn = tree.sx.val
        } catch (e) {
            previous_tree_sn = null
        }
        // prendo come riferimento la parte sinistra dell'albero
        return result_tree = {
            val: sx_fun != undefined ? sx_fun(tree.val) : tree.val,
            sx: tree.sx != null ? map_tree(tree.sx, sx_fun, dx_fun) : null,
            dx: tree.dx != null ? map_tree(tree.dx, sx_fun, dx_fun) : null
        }

    } else {

        console.log("dx_fun = " + dx_fun)
        console.log("sx_fun = " + sx_fun + "\n\n")
        valore_fittizio = 0


        if (dx_fun == undefined || sx_fun == undefined) {
            valore_fittizio = tree.val
        } else {
            if (tree.val == previous_tree_sn_val) { //il sottoalbero che ho corrisponde al precedente sottoalbero sinitro 
                valore_fittizio = sx_fun(tree.val)
            } else {
                valore_fittizio = dx_fun(tree.val)
            }
        }
        try {
            previous_tree_sn = tree.sx.val
        } catch (e) {
            previous_tree_sn = null
        }

        return result_tree = {
            val: valore_fittizio,
            sx: tree.sx == null ? null : map_tree(tree.sx, sx_fun, dx_fun),
            dx: tree.dx == null ? null : map_tree(tree.dx, sx_fun, dx_fun)

        }


    }
}

 */
/*
var pronostico = (partite) => {
    var arr_finale = [];
    var arr_alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "z"];


    for (var i = 0; i < partite.length; i++) {
        console.log("i = ", i)
        partite[i].probVincita = partite[i].totalePartite == 0 ? 0 : Math.round(100 * (partite[i].vittorieCasa / partite[i].totalePartite)) / 100

        //console.log("partite[i] =  ", partite[i])

        if (arr_finale.length == 0) arr_finale.push(partite[i])
            //else if (arr_finale.length == 1) { // => 1 solo confronto 
            //    partite[i].probVincita > arr_finale[0].probVincita ? arr_finale.unshift(partite[i]) : arr_finale.push(partite[i])
            //}
        else { // => isertion sort 
            for (j = 1; j < arr_finale.length; j++) {
                var key = arr_finale[j].probVincita;
                let m = j - 1
                while (m >= 0 && arr_finale[m].probVincita > key) {
                    arr_finale[m + 1] = arr_finale[m]; // scambio 
                    m = m - 1
                }

                if ((arr_finale[m].probVincita == arr_finale[j].probVincita) && (arr_finale[m].squadraCasa != arr_finale[j].squadraCasa)) { // probabilità uguale e nomi diversi 

                    let arr_nome_1 = [...arr_finale[m].squadraCasa]
                    let arr_nome_2 = [...arr_finale[j].squadraCasa]
                    let k = 0
                    do {
                        console.log("in do - while\n k = ", k)
                        if (arr_alfabeto.indexOf(arr_nome_1[k]) < arr_alfabeto.indexOf(arr_nome_2[k])) {
                            arr_finale[m + 1] = arr_finale[m]; // scambio 
                            m = m - 1
                        }
                        k = k + 1

                    } while ((arr_alfabeto.indexOf(arr_nome_1[k]) == arr_alfabeto.indexOf(arr_nome_2[k])) && (k < arr_nome_1.length)) // se due nomi squadre iniziano con stesse lettere continua finché non trova lettere diverse


                }

                arr_finale[m + 1] = key;
            }
        }
    }
    return arr_finale;

    // => usare algoritmo ordinamento efficiente per ordinare array come voglio :
    // • 1 oggetto => ordinato 
    // • 2 oggetti => singolo confronto 
    // • 3 oggetti => algoritmo ordinamento  = INSERTION SORT ! (lezione 10) / selection sort  / merge sort (lezione 16) / quick sort / heap sort ...
}

 */



function pronostico(partite) {
    var arr_finale = [];
    var arr_alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "z"];

    function sort_A(arr) {

        for (let j = 1; j < arr.length; j++) {
            var key = arr[j];
            var m = j - 1

            if (arr[m].probVincita == key.probVincita && arr[m].squadraCasa != arr[j].squadraCasa) { // => nomi diversi 

                let arr_nome_1 = [...arr[m].squadraCasa]
                let arr_nome_2 = [...arr[j].squadraCasa]
                let k = 0
                do {
                    //console.log("in do - while\n k = ", k)
                    if (arr_alfabeto.indexOf(arr_nome_1[k]) < arr_alfabeto.indexOf(arr_nome_2[k])) {
                        arr[m + 1] = arr[m]; // scambio 
                        m = m - 1

                    }
                    k = k + 1

                } while ((arr_alfabeto.indexOf(arr_nome_1[k]) == arr_alfabeto.indexOf(arr_nome_2[k])) && (k < arr_nome_1.length)) // se due nomi squadre iniziano con stesse lettere continua finché non trova lettere diverse


            }
            while (m >= 0 && (arr[m].probVincita < key.probVincita)) {
                console.log("w 1 ")
                if (arr[m].probVincita < key.probVincita) {
                    arr[m + 1] = arr[m]; // scambio 
                    m = m - 1
                }
            }
            arr[m + 1] = key;
        }


        return arr
    }

    for (var i = 0; i < partite.length; i++) {
        //console.log("i = ", i)
        partite[i].probVincita = partite[i].totalePartite == 0 ? 0 : Math.round(100 * (partite[i].vittorieCasa / partite[i].totalePartite)) / 100

        //console.log("partite[i] =  ", partite[i])
        // inserimento in arr finale: (totale)

        arr_finale.push(partite[i])
            //if (arr_finale.length == 0) arr_finale.push(partite[i])
    }

    return sort_A(arr_finale)
        // => usare algoritmo ordinamento efficiente per ordinare array come voglio :
        // • 1 oggetto => ordinato 
        // • 2 oggetti => singolo confronto 
        // • 3 oggetti => algoritmo ordinamento  = INSERTION SORT ! (lezione 10) / selection sort  / merge sort (lezione 16) / quick sort / heap sort ...
}


// Test Case 1
var partite = [{
        "squadraCasa": "Monteriggioni",
        "squadraOspite": "Poggibonsi",
        "vittorieCasa": 2,
        "totalePartite": 15
    },
    {
        "squadraCasa": "Monteriggioni",
        "squadraOspite": "Massa",
        "vittorieCasa": 7,
        "totalePartite": 8
    },
    {
        "squadraCasa": "Massa",
        "squadraOspite": "Carrara",
        "vittorieCasa": 9,
        "totalePartite": 10
    },
    {
        "squadraCasa": "Poggibonsi",
        "squadraOspite": "Monteriggioni",
        "vittorieCasa": 12,
        "totalePartite": 13
    },
    {
        "squadraCasa": "Try",
        "squadraOspite": "Monteriggioni",
        "vittorieCasa": 12,
        "totalePartite": 13
    },
    {
        "squadraCasa": "PippoTeam",
        "squadraOspite": "Monteriggioni",
        "vittorieCasa": 12,
        "totalePartite": 13
    }
]
console.log(pronostico(partite)[0])
console.log(pronostico(partite)[1])
console.log(pronostico(partite)[2])
console.log(pronostico(partite)[3])
console.log(pronostico(partite)[4])
console.log(pronostico(partite)[5])