const __name__ = "__main__";


function replace(arr, target, replacement) {


    var new_array = [];

    for (var i = 0; i < arr.length; i++) {
        new_array.push(arr[i]);
    }
    //console.log("\nnew_array iniziale = " + new_array)



    for (i = 0; i < new_array.length; i++) {
        if (new_array[i] === target) { // => se elemento iesimo di new array è uguale al targer allora...
            new_array[i] = replacement; //=> allora lo cambio con il valore interno a replacement passato come argomento
        };

    };



    return new_array;

}




if (__name__ == "__main__") {
    var t_i = Date.now() / 1000; // - > seconds

    replace([9, 1, 3, 4], 2, 3)
        // => 9 2 3 4


    //replace([], 1, 2)

    var t_f = Date.now() / 1000;
    console.log("\nTempo impiegato per l'esecuzione del programma = " + parseInt(t_f - t_i) + " secondi")
}