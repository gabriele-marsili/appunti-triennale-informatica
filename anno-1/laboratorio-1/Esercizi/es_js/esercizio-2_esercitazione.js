const __name__ = "__main__";




function contamaggioredi(arr, threshold) {
    var c = 0;


    for (i = 0; i < arr.length; i++) {
        if ((arr[i]) > threshold) {
            c++
        };

    };

    return c;

}




if (__name__ == "__main__") {
    var t_i = Date.now() / 1000; // - > seconds

    contamaggioredi([-1, -20, 99, 2, 3, 4], 10)

    var t_f = Date.now() / 1000;
    console.log("\nTempo impiegato per l'esecuzione del programma = " + parseInt(t_f - t_i) + " secondi")
}