function partition_untill(arr, depth) {


    if (arr.length == 1 || depth == 0) return ([arr])


    

    else {
        let q = 0
        if (((arr.length) / 2) % 2 != 0) { //=>  ARR lunghezza dispari            
            q = Math.floor(arr.length / 2) // => approssima per difetto
        } else { q = arr.length / 2 }
        console.log(q)


        function return_prima_meta(array, index_q) {
            for (let i = 0; i <= index_q; i++) {
                array.pop()
            }
            console.log("prima meta: ", array)
            return array
        }

        function return_seconda_meta(array, index_q) {
            for (let i = array.length - 1; i > index_q; i--) {
                array.shift()
            }
            console.log("seconda meta: ", array)
            return array
        }




        partition_untill(return_prima_meta(arr, q), depth - 1)
        partition_untill(return_seconda_meta(arr, q), depth - 1)

    }

}

console.log(partition_untill([1, 2, 3, 4, -1, -2, -3, 8, 16], 2))