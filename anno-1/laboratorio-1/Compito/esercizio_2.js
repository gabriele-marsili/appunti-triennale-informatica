function replace_first(arr, target, replacement, max_rep) {


    var new_array = [],
        counter_max_rep = 0;


    for (var i = 0; i < arr.length; i++) {
        new_array.push(arr[i]);
    }
    console.log("\nnew_array iniziale = " + new_array)



    for (i = 0; i < new_array.length; i++) {
        if (new_array[i] === target) { // => se elemento iesimo di new array è uguale al targer allora...
            if (counter_max_rep < max_rep) { // => case max_rep != -1 
                new_array[i] = replacement; //=>...allora lo cambio con il valore interno a replacement passato come argomento
                counter_max_rep++
                console.log("\counter_max_rep = " + counter_max_rep + "\nmax_rep = " + max_rep)
            } else if (max_rep == -1) {
                new_array[i] = replacement; //=> allora lo cambio con il valore interno a replacement passato come argomento
            }


        };

    };


    console.log("\nnew_array finale = " + new_array)


    return new_array;

}

/*

replace_first([9, 2, 3, 4, 7, 7, 1], 7, 2, -1),
arr = [9, 2, 3, 4, 7, 7, 1]
  [9, 2, 3, 4, 2, 2, 1]

  AssertionError [ERR_ASSERTION]: 
  Expected values to be loosely deep-equal: 
  expected value [9,2,3,4,2,2,1], 
  but got [9,2,3,4,7,7,1]

*/