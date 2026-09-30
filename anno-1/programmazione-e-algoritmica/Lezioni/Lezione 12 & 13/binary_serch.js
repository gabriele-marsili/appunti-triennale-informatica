/*
Input: A array di interi ORDINATO  , K intero
Output: i <==> A[i] == K oppure -1 se K ∉ A

Binary-search-IT(A,p,r,k):

{if (k < A[p] || k > A[r] ) then return -1;
While (p<=r) do { 
	q = (r+p)/2;
	If (A[q] == k) then return q;
	If (A[q] > k) then r = q-1;
	If (A[q] < k) then p = q+1;
	}
Return -1;
}
*/

var arr_A = [1, 2, 3, 3, 46, 57, 69, 125];
var arr_B = [1, 2, 3, 3, 46, 57, 69, 125];
var p = 0
var p_2 = 0
var r = (arr_A.length) - 1
var r_2 = (arr_B.length) - 1

k = 69

function Binary_search_IT(arr_A, p, r, k) {
    var t_i = Date.now(); // - > seconds
    if (k < arr_A[p] || k > arr_A[r]) {
        var t_f = Date.now();

        console.log("\nT B.S.  = " + parseInt(t_f - t_i) + " mil.secondi")
        return -1
    };
    do {

        q = parseInt((r + p) / 2);
        console.log("p = ", p, " r = ", r, " q = ", q);
        if (arr_A[q] == k) {
            var t_f = Date.now();

            console.log("\nT B.S.  = " + parseInt(t_f - t_i) + " mil.secondi");
            return q;
        };
        if (arr_A[q] > k) { r = q - 1 };
        if (arr_A[q] < k) { p = q + 1 };

    }

    while (p <= r)
    var t_f = Date.now();

    console.log("\nT B.S.  = " + parseInt(t_f - t_i) + " mil.secondi");
    return -1;
}



/*
Ricorsivo:
Binary-search-REC(A,p,r,k):

{if(p>r) then return -1;
 if (p==r) then {if (A[i]==k) then return p
 else return -1

 q = (p+r)/2;
 if (A[q] == k) then return q;
 if (A[q] > k) then Binary-search-REC(A,p,q-1,k);
 else  Binary-search-REC(A,q+1,p,k);

}
*/

function Binary_search_REC(arr_B, p_2, r_2, k) {
    var t_i = Date.now(); // - > seconds

    if (p_2 > r_2) return -1;
    if (p_2 == r_2) {
        if (arr_B[i] == k) {
            var t_f = Date.now();

            console.log("\nT B.S. ric = " + parseInt(t_f - t_i) + " mil.secondi")
            return p_2;
        } else {
            var t_f = Date.now();

            console.log("\nT B.S. ric = " + parseInt(t_f - t_i) + " mil.secondi")
            return -1
        }
    }
    q = (p_2 + r_2) / 2;
    if (arr_B[q] == k) {
        var t_f = Date.now();

        console.log("\nT B.S. ric = " + parseInt(t_f - t_i) + " mil.secondi")
        return q;
    }
    if (arr_B[q] > k) Binary_search_REC(arr_B, p_2, r_2 - 1, k);
    else Binary_search_REC(arr_B, q + 1, p_2, k);


}

console.log("K in binary search (1) = ", Binary_search_IT(arr_A, p, r, k))
console.log("K in binary search RIC (2) = ", Binary_search_REC(arr_B, p_2, r_2, k))