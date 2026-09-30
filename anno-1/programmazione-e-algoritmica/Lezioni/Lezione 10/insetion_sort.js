/*

•Input: array  A di n numeri interi 
(n oggetti che abbiano una relazione di tipo totale 
- so dire se uno è maggiore, minore o uguale ad un altro)


•Output: array A ordinato => t.c. il primo elemento è minore uguale del successivo 
e così via --> A[1]<=A[2]<=…<=A[n]
*/

const __name__ = "__main__"

arr_A = [6, 2, 6, 8, 4, 3, 6, 9, 2, 40, 0, 13, 5, 25, 42]


/*
CODICE LINGUAGGIO L
For J = 2 to n do { k = A[ j ] ;
    i = j - 1;
    while( i > 0 && A[ i ] > k) do 
        { A [i + 1 ] = A [ j ] ;
          i -- ;
        } 
     A [ i + 1 ] = k ;
     }
*/

// CODICE JS :
var n = arr_A.length

function insetion_sort(arr_A) {
    console.log("arr_A NON ordinato: " + arr_A)

    for (let j = 1; j <= n; j++) { // =>  costo costante  θ (1)  
        let k = arr_A[j]; // =>  costo costante  θ (1)  
        let i = j - 1; // =>  costo costante  θ (1)  
        while (i >= 0 && arr_A[i] > k) { // =>  costo costante  θ (1)  
            arr_A[i + 1] = arr_A[i]; // =>  costo costante  θ (1)  
            i--; // =>  costo costante  θ (1)  
        }
        arr_A[i + 1] = k; // =>  costo costante  θ (1)  
    }
    console.log("\n\narr_A ordinato: " + arr_A);
    return arr_A // =>  costo costante  θ (1)  
}

//T(n) ∈ θ(n^2) 



if (__name__ == "__main__") {
    insetion_sort(arr_A)
}