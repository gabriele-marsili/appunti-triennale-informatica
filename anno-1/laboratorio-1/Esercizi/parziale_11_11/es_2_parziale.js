/*

let A = {'a': true, 'b': true, 'c': true}
let B = {'d': true, 'e': true, 'f': true}
assert.deepEqual(
    prodotto(A, B),
    {'ad':true, 'ae':true, 'af':true, 'bd':true, 'be':true, 'bf':true, 'cd':true, 'ce':true, 'cf': true}
)

*/

let A = { 'a': true, 'b': true, 'c': true }
let B = { 'd': true, 'e': true, 'f': true }




//{'ad':true, 'ae':true, 'af':true, 'bd':true, 'be':true, 'bf':true, 'cd':true, 'ce':true, 'cf': true}



function prodotto(A, B) {

    let insieme_risultante = {}

    function add_el(insieme, elemento) {

        insieme[elemento] = true
        return insieme
    }

    function concatena(el_a, el_b) {
        return String(el_a + el_b)
    }


    if (A == insieme_risultante || B == insieme_risultante || A == undefined || B == undefined) {
        return insieme_risultante
    } else {
        for (i in A) {
            for (j in B) {
                console.log("A[i] = ", i)
                console.log("B[j] = ", j)

                //console.log("concat = ", concat(A[i], B[j]))
                add_el(insieme_risultante, concatena(i, j));
            }
        }
        return insieme_risultante
    }



}

console.log("proddotto A e B :\n\n", prodotto(A, B))