/*Si scriva una funzione JavaScript lindip(A) che,
 dato un argomento A che è una matrice di numeri naturali positivi (garantita almeno 2x2), 
 realizzata come un array di righe, ciascuna delle quali è un array di numeri, 
 restituisca true se e solo se la matrice contiene almeno due righe linearmente dipendenti fra di loro.



Ricordate che due vettori X e Y (nel nostro caso, vettori-riga dentro A) sono linearmente dipendenti 
se esiste un numero k tale che X=kY. */


var lindip = (A) => { // A = marice di num nat. positivi (almeno 2x2)

    function confronta(riga_1, riga_2) {
        console.log(riga_1, riga_2)
        k = riga_1[0] / riga_2[0]

        for (let i = 1; i < riga_1.length; i++) {
            if (riga_1[i] / riga_2[i] != k) return false
        }
        return true
    }


    let i = 0
    while (i < A.length - 1) {
        let r_1 = A[i]
        let r_2 = A[i + 1]

        let j = i + 1
        while (!(confronta(r_1, r_2)) && j < A.length) {
            j++
            if (j < A.length) r_2 = A[j]

        }
        if (confronta(r_1, r_2)) return true // => 2 righe sono lin dip 
        i++

    }
    return false;

}

var B = [
    [2, 4, 6],
    [5, 7, 1],
    [3, 3, 3],
    [1, 3, 3]
]

console.log(!lindip(B))