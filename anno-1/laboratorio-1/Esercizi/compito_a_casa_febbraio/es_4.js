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


/*
assert.equal(check_array([1,4,8,5,3,31,4,2,2]), true)

AssertionError [ERR_ASSERTION]: 
false == true 
expected value true, 

but got false
*/