//https://replit.com/@cikay72/AlberiBinari?authuser=0#script.js

//albero : 
var tree = {
    val: 1,
    dx: {
        val: 9,
        dx: { val: 12 },
        sx: { val: 21 }
    },
    sx: {
        val: 42,
        dx: { val: 8, dx: { val: 9 }, sx: { val: 22 } },
        sx: { val: 8, dx: { val: 13 }, sx: { val: 9 } },
    }
}

//Trovare il massimo fra i valori in un albero
var find_max = (albero) => {
    let max = albero.val
    let max_sx = -Infinity
    let max_dx = -Infinity
    if (albero.sx) max_sx = find_max(albero.sx)
    if (albero.dx) max_dx = find_max(albero.dx)

    max = max_sx > max ? max_sx : max
    max = max_dx > max ? max_dx : max

    return max

}

//console.log(find_max(tree))

// ● Trovare la somma dei valori in un albero
var sum_a = (albero) => {
        let sum = albero.val;

        if (albero.sx) sum += sum_a(albero.sx);
        if (albero.dx) sum += sum_a(albero.dx);

        return sum;
    }
    //console.log(sum_a(tree))

//● Dire se un albero contiene un valore cercato o no
function search_in_tree(albero, val) {
    if (albero.val === val) return true;
    else {
        if (albero.sx) {
            if (search_in_tree(albero.sx, val)) return true;
        }
        if (albero.dx) {
            if (search_in_tree(albero.dx, val)) return true;
        }
        return false;
    }
}

//console.log(search_in_tree(tree, 42))
//console.log(search_in_tree(tree, 423))

// ● Contare quanti sono i nodi di un albero che hanno un valore dato
function counter(albero, val) {
    let c = 0;

    if (albero.val === val) { c++ }

    if (albero.sx) { c += counter(albero.sx, val) }

    if (albero.dx) { c += counter(albero.dx, val) }
    return c
}

//console.log(counter(tree, 9))

//● Contare quanti sono i nodi di un albero
function counter_node(albero) {
    let c = 1;

    if (albero.sx) { c += counter_node(albero.sx) }

    if (albero.dx) { c += counter_node(albero.dx) }

    return c
}

//console.log(counter_node(tree))

var tree_2 = {
    val: 42,
    dx: { val: 12 },
    sx: { val: 99 }
}

//● Scambiare fra di loro i rami destro e sinistro della radice
var change = (albero) => {
        let temp = albero.sx;
        albero.sx = albero.dx
        albero.dx = temp;


        return albero;
    }
    //console.log(change(tree_2));


//● Tagliare da un albero tutti i rami che iniziano da un nodo convalore dato

var pota = (albero, val) => {
    if (albero.val === val) {
        delete albero.val;
        delete albero.sx;
        delete albero.dx;
    }

    if (albero.sx) {
        if (albero.sx.val === val) {
            delete albero.sx
        } else pota(albero.sx, val);

    }
    if (albero.dx) {
        if (albero.dx.val === val) {
            delete albero.dx
        } else pota(albero.dx, val);

    }

    return albero
}

//console.log(pota(tree, 9));


/* 7. [MOSTRO DI FINE LIVELLO] Left-View: stampare per ogni livello il nodo piu' a sx

Esempio:
    1
 2    3
u u  u  6

Stampa: 1, 2, 6   u = undefined
*/

let albe = { val: 1, sx: { val: 2 }, dx: { val: 3, dx: { val: 6 } } };

function left_view(albero) {
    console.log(albero.val);
    let arr_livelli_stampati = [0]

    function left_view_level(albero, arr_liv_stampati, livello) {
        let val = false;
        for (let i = 0; i < arr_liv_stampati.length; i++) {
            if (arr_liv_stampati[i] === livello) {
                val = true;
                break
            }
        }
        if (!val) { // livello non ancora stampato
            console.log(albero.val) // stampo 
            arr_liv_stampati.push(livello) // aggiungo livello            
        }

        if (albero.sx) {
            arr_liv_stampati = left_view_level(albero.sx, arr_liv_stampati, livello + 1)
        }

        if (albero.dx) {
            arr_liv_stampati = left_view_level(albero.dx, arr_liv_stampati, livello + 1)
        }

        return arr_liv_stampati
    }

    if (albero.sx) {
        arr_livelli_stampati = left_view_level(albero.sx, arr_livelli_stampati, 1)
    }

    if (albero.dx) {
        arr_livelli_stampati = left_view_level(albero.dx, arr_livelli_stampati, 1)
    }

}

left_view(albe)