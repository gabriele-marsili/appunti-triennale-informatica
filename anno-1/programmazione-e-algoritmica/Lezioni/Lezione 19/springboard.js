/*
A = [1...n] e gode della seguente proprietà:

esiste i'  1<= i' <= n t.c. per ogni i : 1<= i < i' vale che A[i+1] = A[1] &&
&& per ogni j : i ' <= j < n, A[j+1] = A[j]•2

restituzione di i ' 

*/


var arr_A = [10, 10, 10, 10, 10, 7, 14, 28, 56, 104]
    //codice:
var r = arr_A.length - 1 // (in js -1 | altrimenti no) => teta(1)
var p = 0 // (in js 0 | altrimenti 1) => teta(1)
function find_springboard(arr_A, p, r) {
    if (r <= 2) return -1; // => caso limite => teta(1)
    else {
        q = parseInt((p + r) / 2); // => teta(1)
        if (arr_A[q] != arr_A[q - 1] && arr_A[q - 1] == arr_A[q - 2]) { // => teta(1)
        } else {
            if (arr_A[q + 1] == 2 * arr_A[q]) find_springboard(arr_A, p, q) // => T(n/2) 
            else find_springboard(arr_A, q + 1, r) // => T(n/2) 
        }
        return q // => teta(1)
    }
}
console.log("\nspringboard = " + find_springboard(arr_A, p, r) + " A[sp] = " + arr_A[find_springboard(arr_A, p, r)]) // => 14
    // T(n) = teta(log(n))