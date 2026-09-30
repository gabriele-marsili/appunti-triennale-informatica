//const __name__ = "__main__";

//var c = 0

function media(arr, a, b) {
    let media,
        somma = 0,
        n_elementi = 0;
    //c++
    //console.log("\nstart f media n " + c + "\n\n")
    if (a <= b && b < arr.length) {
        for (let i = a; i <= b; i++) {
            console.log("\n i nel for = " + i + "\n arr[i] = " + arr[i]);
            somma = somma + arr[i];
            console.log("\n sommma" + somma);
            n_elementi++

        }
        console.log("\n  num elementi = " + n_elementi);


        media = somma / n_elementi
    } else {
        media = undefined;
    }


    console.log("\nMedia elementi = " + media + "\n---------------------------")

    return media;


}

media([0, 0, 8, 0.2], 0, -1)

/*
if (__name__ == "__main__") {
    var t_i = Date.now() / 1000; // - > seconds

    //media([1,2,3,4,5,6],2,5)
    //media([10, -3, 3.4, 0.2], 0, 1)
    //media([10, -3, 3.4, 0.2], 0, 1)

    var t_f = Date.now() / 1000;
    console.log("\nTempo impiegato per l'esecuzione del programma = " + parseInt(t_f - t_i) + " secondi");
};
*/