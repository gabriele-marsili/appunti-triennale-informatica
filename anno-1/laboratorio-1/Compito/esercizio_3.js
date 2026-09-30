// arr di arr.length elementi / window_size = number 

function convoluzione(arr, window_size) {

    console.log("\nstart f convoluzione \n\n")

    var new_array = [],
        somma_convoluzionale = 0;


    for (var i = 0; i < arr.length; i++) {
        new_array.push(arr[i]);
    }
    console.log("\nnew_array iniziale = " + new_array);



    for (i = 0; i < arr.length; i++) {
        console.log("\ni = " + i);
        console.log("\nN = " + arr.length);
        console.log("\nwindow_size = " + window_size);


        var j = Math.max(0, (i - window_size));
        console.log("\nJ = " + j);

        var lim_sup_sommatoria = Math.min((arr.length - 1), (i + window_size));
        console.log("\nlim_sup_sommatoria = " + lim_sup_sommatoria);

        for (j; j <= lim_sup_sommatoria; j++) {
            somma_convoluzionale = somma_convoluzionale + arr[j];
            console.log("\nsomma_convoluzionale = " + somma_convoluzionale);

        };

        console.log("\n\nVecchio arr [" + i + "]= " + new_array[i]);

        new_array[i] = somma_convoluzionale;
        console.log("\n\nNuovo arr [" + i + "]= " + new_array[i]);

        somma_convoluzionale = 0;

    };


    console.log("\nnew_array finale = " + new_array);


    return new_array;

};


//convoluzione([1, 2, 3, 4], 1)
/*

assert.deepEqual(convoluzione([1, 2, 3, 4], 1), [
    
    3, 6, 9, 7])



AssertionError [ERR_ASSERTION]: Expected values to be loosely deep-equal: 
expected value [3,6,9,7], 
but got [1,2,3,4]

*/