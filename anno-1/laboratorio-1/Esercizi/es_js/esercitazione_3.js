const __name__ = "__main__";



function prodotto_scalare(x, y) {
    var prodotto_scalare = 0;
    var l_1 = x.length;
    var l_2 = y.length


    if (l_1 != l_2) return undefined;
    else {
        for (let i = 0; i < x.length; i++) {
            let prodotto = x[i] * y[i]
            prodotto_scalare = prodotto_scalare + prodotto;
        }
    }

    console.log("\nProdotto scalare = " + prodotto_scalare)


}




if (__name__ == "__main__") {
    var t_i = Date.now() / 1000; // - > seconds

    //prodotto_scalare([0, 4, 2], [1, 2, 3])

    var t_f = Date.now() / 1000;
    console.log("\nTempo impiegato per l'esecuzione del programma = " + parseInt(t_f - t_i) + " secondi")
}