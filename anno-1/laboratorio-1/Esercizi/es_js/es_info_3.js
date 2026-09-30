/*

[Fattoriale] Si scriva un programma che dato un intero n calcoli e stampi il suo fattoriale. Si
ricorda che il fattoriale di n è n! = 1*2*....*(n-1)*n


[Asterischi] Si scriva un programma che dato un intero n stampi n asterischi sulla prima
linea, n − 2 asterischi sulla seconda linea, n − 4 sulla terza e così via, fino ad arrivare a
stampare uno o due asterischi sull’ultima linea


[Stampa selettiva] Si scriva un programma che legga da tastiera una serie di interi e stampi
l’elemento letto se rispetta una delle seguenti proprietà: (i) E’ positivo e pari, oppure (ii) è
negativo e preceduto (nell’ordine di inserimento) da un intero con valore maggiore o uguale.
Terminare la l’acquisizione alla lettura di uno zero.


[Media] Si scriva un programma che legga da tastiera 10 interi e stampi la media aritmetica
di tutti i valori diversi da zero e di segno uguale all’ultimo valore della sequenza.

[Minimo] Si scriva un programma che legga da tastiera 10 interi e stampi il valore minimo.



*/

const __name__ = "__main__";

var n, n_fattoriale, n_a, numero, num, valore
var array_num = []
var array_num_media = []
var array_valori = []

function decisione() {
    console.log("\n\nBenvenut* utente!\n\n");
    do {

        console.log("Scegli tra le seguenti opzioni, digitando il numero corrispondente alla funzione che vuoi eseguire:\n\n1 => fattoriale\n2 => asterischi\n3 => stampa selettiva\n4 => media\n5 => minimo\n\n");
        var dec = parseInt(Number(prompt("Digita il numero corrispondente alla tua scelta"))) || "decisione non valida";

        if (dec == "decisione non valida\n\n" || dec < 1 || dec > 6) {
            console.log("\n\nATTENZIONE: decisione non valida!\n\n");
        };


    } while (typeof(dec) != "number" || dec < 1 || dec > 6);

    switch (dec) {
        case 1:
            fattoriale();
            break;
        case 2:
            asterischi();
            break;
        case 3:
            stampa_selettiva();
            break;
        case 4:
            media();
            break;
        case 5:
            minimo();
            break;
        default:
            console.log("\nErrore!")
    };




};



function fattoriale() {
    console.log("\n\nFunzione fattoriale startata con successo\n\n");

    do {

        n = parseInt(Number(prompt("Inserisci un numero "))) || "N non valido";

        //console.log("n = " + n + " type = " + typeof(n));

        if (n == "N non valido") {
            console.log("\n\nATTENZIONE: numero inserito non valido!\n");
        };


    } while (typeof(n) != "number");

    n_fattoriale = n
    for (i = 1; i <= n - 1; i++) {
        n_fattoriale = n_fattoriale * i; // fattoriale 
    }

    console.log("\nIl fattoriale di " + n + " è: " + n_fattoriale + "\n");
    console.log("\nFunzione fattoriale terminata con successo\n");
}

function asterischi() {
    console.log("\n\nFunzione asterischi startata con successo\n\n");

    do {

        var num_asterischi = parseInt(Number(prompt("Inserisci un numero "))) || "N non valido";

        //console.log("n = " + n + " type = " + typeof(n));

        if (num_asterischi == "N non valido") {
            console.log("\n\nATTENZIONE: numero inserito non valido!\n");
        };


    } while (typeof(num_asterischi) != "number");



    var stampa = "*"
    var a_s = []

    for (i = 1; i <= num_asterischi; i++) {
        a_s.push(stampa)
        stampa = stampa + " *"

    }

    var lung_A_s = a_s.length;

    //a_s = ["*","**","***","****","****"]
    //lung_A_s = 5

    for (i = 1; i <= num_asterischi; i++) {
        if (lung_A_s >= 1) {
            console.log(a_s[(lung_A_s - 1)])
            lung_A_s = lung_A_s - 2
        }




    }

    /*
    for (i = 1; i <= num_asterischi; i++) { // se num_asterischi = 0 skippa 
        for (i = 1; i <= (num_asterischi / 2); i++) {
            stampa = stampa + stampa
        }
        console.log(stampa)
        num_asterischi = num_asterischi - 2
    }
    */


    console.log("\n\nFunzione asterischi terminata con successo\n");
}

function stampa_selettiva() {
    console.log("\n\nFunzione stampa selettiva startata con successo\n\n");


    do {
        do {

            numero = prompt("Inserisci un numero ")
            if (numero == "0") {
                numero = 0
            } else {
                numero = Number(numero) || "N non valido";
            }

            //console.log("n = " + n + " type = " + typeof(n));

            if (numero == "N non valido") {
                console.log("\n\nATTENZIONE: numero inserito non valido!\n");
            };


        } while (typeof(numero) != "number");

        array_num.push(numero);



    } while (numero != 0);

    var l_array_num = array_num.length

    var res

    for (var k = 0; k < l_array_num; k++) {



        res = array_num[k]


        if (res % 2 == 0 && res > 0) {


            console.log("\n" + res + " è positivo e pari -> i");
        }

        if (k != 0) {


            if (res < 0 && res <= (array_num[k - 1])) {


                console.log("\n" + res + " è negativo e preceduto da un numero (" + (array_num[k - 1]) + ") >= di " + res + " -> ii")
            }

        }


    }


    console.log("\n\nFunzione stampa selettiva terminata con successo\n\n");


}

function media() {
    console.log("\n\nFunzione media startata con successo\n\n");

    do {

        do {
            num = prompt("Inserisci un numero ")
            if (num == "0") {
                num = 0
            } else {
                num = parseInt(Number(num)) || "N non valido";
            }

            //num = parseInt(Number(prompt("Inserisci un numero "))) || "N non valido";

            //console.log("n = " + n + " type = " + typeof(n));

            if (num == "N non valido") {
                console.log("\n\nATTENZIONE: numero inserito non valido!\n");
            };


        } while (typeof(num) != "number");

        array_num_media.push(num);



    } while ((array_num_media.length) <= 10);

    var array_n_media_definitivo = [];
    for (i = 0; i <= (array_num_media.length - 1); i++) {
        if (array_num_media[i] * (array_num_media[array_num_media.length - 1]) > 0 && array_num_media[i] != 0) {
            array_n_media_definitivo.push(array_num_media[i])
        };
     
    }

    if (array_n_media_definitivo.length == 0){
        console.log("\n\nHai inserito solo zeri! ");
        
        var controllo = "errato"
    } 
    //console.log("\n\narray_n_media_definitivo = " + array_n_media_definitivo);

    var s = 0
    if (controllo!="errato"){
        for (i = 0; i <= (array_n_media_definitivo.length - 1); i++) {
            s = s + array_n_media_definitivo[i]
        }
        var media = s / array_n_media_definitivo.length
    
        console.log("\n\nmedia = " + media);
    }

    console.log("\n\nFunzione media terminata con successo\n\n");


}

function minimo() {
    console.log("\n\nFunzione minimo startata con successo\n\n");

    for (i = 0; i <= 10; i++) {

        do {
            valore = prompt("Inserisci un numero ")
            if (valore == "0") {
                valore = 0
            } else {
                valore = parseInt(Number(valore)) || "N non valido";
            }

            if (valore == "N non valido") {
                console.log("\n\nATTENZIONE: numero inserito non valido!\n");
            };


        } while (typeof(valore) != "number");


        array_valori.push(valore);


    }

    var minimo = array_valori[0]
    for (i = 0; i <= (array_valori.length - 1); i++) {
        if (array_valori[i] <= minimo) {
            minimo = array_valori[i]
        }
    }


    console.log("\n\nminimo = " + minimo);




    console.log("\n\nFunzione minimo terminata con successo\n\n");


}


if (__name__ == "__main__") {
    var t_i = Date.now() / 1000; // - > seconds
    decisione();


    var t_f = Date.now() / 1000;

    console.log("\nTempo impiegato per l'esecuzione del programma = " + parseInt(t_f - t_i) + " secondi")

}