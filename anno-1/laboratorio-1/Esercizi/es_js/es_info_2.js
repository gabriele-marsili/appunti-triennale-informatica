/*

1. [Pari] Scrivere un programma che legga da tastiera un numero e stabilisca se quel numero è pari o 
dispari, stampando in uscita rispettivamente 1 o 0

2. [Max] Scrivere un programma che legga da tastiera tre numeri e mostri a video il loro massimo

3. [Calcolatore] Scrivere un programma che legga da tastiera due numeri ed un operatore (tra +, -, * e /) 
e mostri a video il risultato dell’operazione tra i due numeri

4. [Sommatoria] Si scriva un programma che, dato un intero positivo n, calcola e stampa la somma dei numeri 
dispari da 1 a n (con n compreso)

5. [Accumulatore] Si scriva un programma che legge numeri fino a che la loro somma non supera 101. Il programma deve 
poi stampare la somma ottenuta

6. [Primo] Si scriva un programma che legge un intero n e valuta se è primo, ovvero che non esista un numero d tra 2 e n-1 tale che n 
sia divisibile per d. Si stampi 1 se il numero è primo, 0 altrimenti. Si stampi inoltre il tempo di esecuzione del programma

7. [MultiPrimo] Si modifichi il programma di sopra in modo che legga 10 numeri n e calcoli per ciascuno se si tratta di un numero primo

*/

const __name__ = "__main__";

var n, a, b, c, Max, x, y, operatore, risultato, num, somma = 0,
    num_dei_101, somma_dei_101 = 0,
    num_p, num_p_10, array_num_p = [],
    dec;
var operatori_ammessi = ["+", "-", "*", "/"];

function decisione() {
    console.log("\n\nBenvenut* utente!\n\n");
    do {

        console.log("Scegli tra le seguenti opzioni, digitando il numero corrispondente alla funzione che vuoi eseguire:\n\n1 => pari or dispari\n2 => get Max\n3 => esegui operazione\n4 => alcola somma\n5 => calcola somma fino a 101\n6 => controlla se un numero è primo\n7 => controlla se (10) numeri sono primi\n\n");
        dec = parseInt(Number(prompt("Digita il numero corrispondente alla tua scelta"))) || "decisione non valida";

        if (dec == "decisione non valida\n\n" || dec < 1 || dec > 7) {
            console.log("\n\nATTENZIONE: decisione non valida!\n\n");
        };


    } while (typeof(dec) != "number" || dec < 1 || dec > 7);

    switch (dec) {
        case 1:
            pari_or_dispari();
            break;
        case 2:
            get_Max();
            break;
        case 3:
            esegui_operazione();
            break;
        case 4:
            calcola_somma();
            break;
        case 5:
            carica_101();
            break;
        case 6:
            n_primo();
            break;
        case 7:
            controlla_se_primo_10_n();
            break;
        default:
            console.log("\nErrore!")
    };




};

function pari_or_dispari() {
    console.log("\n\nFunzione pari or dispari startata con successo\n\n");

    do {

        n = Number(prompt("Inserisci un numero ")) || "N non valido";

        //console.log("n = " + n + " type = " + typeof(n));

        if (n == "N non valido") {
            console.log("\n\nATTENZIONE: numero inserito non valido!\n");
        };


    } while (typeof(n) != "number");

    var responso = Boolean(n % 2);
    //console.log("responso = " + responso)
    if (!responso) {
        console.log("\n" + n + " è un numero pari --> " + (+responso));
    } else {
        console.log("\n" + n + " è un numero dispari --> " + (+responso));

    };

    console.log("\n\nFunzione pari or dispari conclusa con successo\n\n");
};

function get_Max() {
    console.log("\n\nFunzione calcola il massimo startata con successo\n\n");


    do {

        a = Number(prompt("Inserisci un numero ")) || "N non valido";
        b = Number(prompt("Inserisci un secondo numero ")) || "N non valido";
        c = Number(prompt("Inserisci un terzo numero ")) || "N non valido";

        /*
        console.log("a = " + a + " type = " + typeof(a));
        console.log("b = " + b + " type = " + typeof(b));
        console.log("c = " + c + " type = " + typeof(c));
        */

        if (a == "N non valido" || b == "N non valido" || b == "N non valido") {
            console.log("\n\nATTENZIONE: un numero inserito non è valido!\nDovrai inserirli nuovamente\n\n");
        };


    } while (typeof(a) != "number" || typeof(b) != "number" || typeof(c) != "number");

    if (a > b) {
        Max = a
    } else {
        Max = b
    };
    if (c > Max) {
        Max = c
    };

    console.log("\nIl massimo è: " + Max);


    console.log("\n\nFunzione calcola il massimo conclusa con successo\n\n");

};

function esegui_operazione() {

    console.log("\n\nFunzione esegui operazione startata con successo\n\nInserisci due numeri ed un operatore (+, -, * o /)");

    do {

        x = Number(prompt("Inserisci un numero ")) || "N non valido";
        operatore = String(prompt("Inserisci L'OPERATORE ")) || "Operatore non valido";
        y = Number(prompt("Inserisci l'altro numero ")) || "N non valido";

        var res = operatori_ammessi.includes(operatore);


        //console.log("res = " + res);


        if (x == "N non valido" || res == false || y == "N non valido") {
            console.log("\n\nATTENZIONE: un numero e/o l'operatore inserito non è valido!\nDovrai inserirli nuovamente\n\n");
        };


    } while (typeof(x) != "number" || res == false || typeof(y) != "number");



    switch (operatore) {
        case "+":
            risultato = x + y;
            break;
        case "-":
            risultato = x - y;
            break;
        case "*":
            risultato = x * y;
            break;
        case "/":
            risultato = x / y;
            break;
        default:
            console.log("\nErrore!")
    };

    console.log("\n" + x + " " + operatore + " " + y + " = " + risultato);

    console.log("\n\nFunzione esegui operazione conclusa con successo\n\n");
};

function calcola_somma() {
    console.log("\n\nFunzione calcola somma fino ad n (compreso) startata con successo!");
    do {



        num = parseInt(Number(prompt("Inserisci un numero intero positivo"))) || "N non valido";


        if (num == "N non valido" || num < 0) {
            console.log("\n\nATTENZIONE: numero inserito non valido!\nDovrai inserirlo nuovamente\n\n");
        };


    } while (typeof(num) != "number" || num < 0);

    for (i = 1; i <= num; i++) {
        if (i % 2 != 0) {
            somma = somma + i
        }
    };

    console.log("\nSomma dei numeri dispari da 1 a n (compreso) = " + somma)


    console.log("\n\nFunzione calcola somma fino ad n (compreso) conclusa con successo\n\n");
};


function carica_101() {
    console.log("\n\nFunzione calcola somma fino a che non è >= di 101 startata con successo!");
    do {

        num_dei_101 = parseInt(Number(prompt("Inserisci un numero"))) || "N non valido";


        if (num_dei_101 == "N non valido") {
            console.log("\n\nATTENZIONE: numero inserito non valido!\nDovrai inserirlo nuovamente\n\n");
        } else {
            somma_dei_101 = somma_dei_101 + num_dei_101
        };



    } while (typeof(num_dei_101) != "number" || somma_dei_101 <= 101);


    console.log("\nSomma ottenuta = " + somma_dei_101);
    console.log("\n\nFunzione calcola somma fino a che non è >= di 101 conclusa con successo\n\n");


};

function n_primo() {

    console.log("\n\nFunzione controlla se n è primo startata con successo!");
    do {

        num_p = parseInt(Number(prompt("Inserisci un numero"))) || "N non valido";


        if (num_p == "N non valido") {
            console.log("\n\nATTENZIONE: numero inserito non valido!\nDovrai inserirlo nuovamente\n\n");
        }

    } while (typeof(num_p) != "number");

    for (i = 2; i <= num_p - 1; i++) {
        var cond = num_p % i == 0

        if (cond) { // --> true => 0
            console.log("\n\n" + num_p + " NON è un numero primo! --> " + (+(!cond)));
            console.log("\n\nFunzione controlla se n è primo conclusa con successo\n\n");
            break;

        }
    }
    if ((+(!cond)) != 0) {
        console.log("\n\n" + num_p + " è un numero primo! --> " + (+!cond));
        console.log("\n\nFunzione controlla se n è primo conclusa con successo\n\n");
    }

};


function controlla_se_primo_10_n() {

    console.log("\n\nFunzione che controlla se (10) numeri sono primi startata con successo!");
    do {

        num_p_10 = parseInt(Number(prompt("Inserisci un numero"))) || "N non valido";


        if (num_p_10 == "N non valido") {
            console.log("\n\nATTENZIONE: numero inserito non valido!\nDovrai inserirlo nuovamente\n\n");
        } else {
            array_num_p.push(num_p_10);
        };

    } while (typeof(num_p_10) != "number" || array_num_p.length < 10);

    for (j = 0; j <= array_num_p.length; j++) {

        for (i = 2; i <= array_num_p[j] - 1; i++) {
            var cond = array_num_p[j] % i == 0

            if (cond) { // --> true => 0
                console.log("\n\n" + array_num_p[j] + " NON è un numero primo! --> " + (+(!cond)));

                break;

            }
        }
        if ((+(!cond)) != 0) {
            console.log("\n\n" + array_num_p[j] + " è un numero primo! --> " + (+!cond));

        }

    }
    console.log("\n\nFunzione che controlla se (10) numeri sono primi terminata con successo!");


};


if (__name__ == "__main__") {
    var t_i = Date.now() / 1000; // - > seconds
    decisione();
    //pari_or_dispari();
    //get_Max();
    //esegui_operazione();
    //calcola_somma();
    //carica_101();
    //n_primo();
    //controlla_se_primo_10_n()
    var t_f = Date.now() / 1000;

    console.log("\nTempo impiegato per l'esecuzione del programma = " + parseInt(t_f - t_i) + " secondi")

}