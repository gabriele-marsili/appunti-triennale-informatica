/*
Esercizio 1.

Definire una funzione filter_replace(f,g), che prende in input una funzione f ed un predicato g, 
ovvero una funzione g che restituisce un valore booleano quando viene invocata. 
filter_replace(f,g) deve restituire una funzione che, preso in input un array A, 
prima filtra A creando un nuovo array B che contiene tutti i valori di A per cui g è vero, 
poi applica la funzione f su ogni elemento di B, memorizza il risultato in un nuovo array C e restituisce C.

ATTENZIONE: L'array A non dev'essere modificato; 
l'array C deve preservare l'ordine degli elementi in A; non si possono usare le funzioni map e filter di libreria.

Esempio:

filter_replace(x=>x+1, x=>x%2==0)([1, 2, 3]) = [3]
*/

function filter_replace(f, g) {
    function filtra(A) { // A => array
        let B = [];
        let C = [];
        for (let i = 0; i < A.length; i++) {
            if (g(A[i])) B.push(A[i]); // => se A[i] == True lo inserisco in B (in fondo, così mantengo l'oridine)
        }

        for (let i = 0; i < B.length; i++) {
            C.push(f(B[i]));
        }
        return C
    }

    return filtra


}


/*
Esercizio 2.

Sia data una coppia di insiemi A e B i cui elementi dell'insieme sono stringhe. 
Si scriva la funzione prodotto(A, B) che implementi il prodotto cartesiano B x A e restituisca l'insieme 
risultante dall'applicazione del prodotto. 

Si noti che l'insieme vuoto si rappresenta con {}. 
Se uno dei valori di input è undefined, questo verrà trattato come un insieme vuoto.

Nota: per la rappresentazione degli elementi degli insiemi si utilizzi la notazione chiave: true.
*/

function prodotto(A, B) {
    if (A === undefined || B == undefined) return {}

    res = {}
    for (var B_key in B) {
        for (let A_key in A) {
            res[B_key + A_key] = true
        }
    }

    return res
}
/*
A = {
    "string": true,
    ...
}
*/

/*
Esercizio 3.

Si scriva una funzione raggruppa_nascita(persone) che dato un array di oggetti con chiavi 
nome, 
annonascita, e 
luogonascita,

restituisca un oggetto che ha come chiavi i diversi luoghi di nascita 
e come valori degli array che raggruppino i rispettivi oggetti.

NOTA: L'ordine degli oggetti negli array deve coincidere con l'ordine nell'array persone.
*/

function raggruppa_nascita(persone) {
    let res = {}
    for (p of persone) {
        if (p.luogonascita in res) { // => luogo nascita già presente in res
            res[p.luogonascita].push(p) // => aggiungo p a res in base a luogo nascita
        } else {
            res[p.luogonascita] = [p] // => creo chiave luogo nascita con valore [p]
        }
    }
    return res
}



/*
Esercizio 4.

Scrivere una funzione modificaCorsi che 
- preso in input un array di oggetti contenenti le informazioni dei corsi universitari 
(rappresentate con le proprietà:
     corso, semestre e numStudenti
     )
 - restituisca l'array con gli oggetti modificati come segue:

se numStudenti è <= 150, settare semestre a 2;
se numStudenti è > 150, settare semestre a 1;
se l'array è vuoto, restituire undefined

NB: assumere che negli oggetti siano sempre presenti le chiavi numStudenti e semestre.

Esempio:

corsi = [{'corso':'lab I','semestre':2,'numStudenti': 217}, 
         {'corso':'algoritmi', 'semestre':1,'numStudenti': 136},
         {'corso':'analisi','semestre':1,'numStudenti':150}]

modificaCorsi(corsi) => 
[{'corso':'lab I','semestre':1,'numStudenti': 217}, 
{'corso':'algoritmi','semestre':2,'numStudenti': 136},
{'corso':'analisi','semestre':2,'numStudenti':150}]
*/

function modificaCorsi(arr_corsi) {
    if (arr_corsi.length == 0) return undefined
    else {
        for (corso of arr_corsi) {
            if (corso.numStudenti <= 150) corso.semestre = 2
            else corso.semestre = 1
        }
    }
    return arr_corsi
}



/*
Esercizio 5.

Si scriva una funzione signed_to_integer(arr) 
che dato un array arr contenente un intero codificato tramite complemento a 
2 restituisca il corrispondente valore intero in base 10.

La funzione ritorna undefined se l'array contiene un numero di bit inferiore a due.

Ad esempio:

signed_to_integer([1, 0, 1, 0,   1, 0]) => -22
                    => 0 1 0 1 1 0 =>  -(2+4+16) = -22
signed_to_integer([0, 0, 1, 0, 1, 0]) => 10
                   2 +  2^3 = 10

*/

function signed_to_integer(arr) {
    if (arr.length < 2) return undefined;

    function calc(arr) {
        res = 0
        for (let i = arr.length - 1; i >= 0; i--) {
            res = res + Math.pow(2, arr.length - 1 - i) * arr[i]
        }
        return res
    }
    console.log("arrr -> ", arr)


    if (arr[0] == 0) return calc(arr)

    console.log("arrr -> ", arr)


    if (arr[0] == 1) {
        console.log(arr)
            //converti : 
        let key = true
        for (let i = arr.length - 1; i >= 0; i--) {
            console.log(i)
            if (!key) {
                console.log("cambio arr ", i, " -> ", arr[i])
                if (arr[i] == 0) arr[i] = 1
                else arr[i] = 0

            }

            if (arr[i] == 1 && key) key = false; // scorrendo da dx ho trovato il primo 1 



        }
        console.log(arr) // 0 1 0 1 1 0 
        return -calc(arr)
    }


}
//es_arr = [0, 0, 1, 0, 1, 0]
var es_arr_2 = [1, 0, 1, 0, 1, 0]
console.log(signed_to_integer(es_arr_2))