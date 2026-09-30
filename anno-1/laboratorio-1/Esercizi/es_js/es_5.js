/*

[Dist]
Scrivere una funzione che calcola la distanza tra due punti su un piano cartesiano, 
date le loro coordinate x e y

[Father]
Scrivere una funzione che, dati due punti (di cui si conoscono le coordinate x e y), 
restituisce il punto che è più lontano dall’origine (0,0)

[Parole]
Scrivere un programma che legge da tastiera una lista parole fino a che l’utente n
on scrive “BASTA!”. 
A quel punto il programma deve stampare la lista delle parole inserite (senza ripetizioni).

[Parole ++]
Modificare l’esempio precedente in modo che il programma stampi anche la quantità 
di volte che una parola è stata inserita.


[FusoOrario] Scrivere (e testare) una funzione Javascript che, 
dato un oggetto che rappresenta un orario in termini di hh, mm e ss, 
modifica hh secondo applicando fuso orario (positivo o negativo) fornito in input


[Strcat] Scrivere (e testare) una funzione che, 
dato un array in input, restituisce la concatenazione di tutti i suoi elementi 
(interpretandoli come stringhe)
[Inventario] Scrivere un programma che consenta di registrare l’inventario di un negozio, 
con ciascun elemento inventariato rappresentato in termini di barcode, nome e quantità. 
Il programma deve leggere gli elementi da inventariare fino a che l’utente non inserisce 
“stop” come barcode. A quel punto, il programma deve stampare un resoconto dell’inventario



*/

const __name__ = "__main__";
var coordinate = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
}

var coordinate_2 = {
    x1_2: 0,
    y1_2: 0,
    x2_2: 0,
    y2_2: 0
}

var parole = []
var parole_PLUS = []

var orario = {
    hh: 0,
    mm: 0,
    ss: 0
}

var Inventario_prodotti = []

function decisione() {
    console.log("\n\nBenvenut* utente!\n\n");
    do {

        console.log("Scegli tra le seguenti opzioni, digitando il numero corrispondente alla funzione che vuoi eseguire:\n\n1 => [Dist]\n2 => [Father]\n3 => [Parole]\n4 => [Parole ++]\n5 => [FusoOrario]\n6 => [Strcat] \n7 => [Inventario] \n\n");
        var dec = parseInt(Number(prompt("Digita il numero corrispondente alla tua scelta"))) || "decisione non valida";

        if (dec == "decisione non valida\n\n" || dec < 1 || dec > 7) {
            console.log("\n\nATTENZIONE: decisione non valida!\n\n");
        };


    } while (typeof(dec) != "number" || dec < 1 || dec > 7);

    switch (dec) {
        case 1:
            dist();
            break;
        case 2:
            Father();
            break;
        case 3:
            Parole();
            break;
        case 4:
            Parole_plus();
            break;
        case 5:
            FusoOrario();
            break;
        case 6:
            Strcat();
            break;
        case 7:
            inventario();
            break;
        default:
            console.log("\nErrore!")
    };
};

function dist() {
    console.log("\n\nFunzione dist startata con successo\n\n");
    console.log("\nInserisci le coordinate di due punti su un piano cartesiano \n\n");

    // inserimento 4 numeri => coordinate dei due punti P1 (x1, y1) e P2  (x2, y2)
    for (i = 1; i <= 4; i++) {
        do {

            switch (i) {
                case 1:
                    coordinate.x1 = parseInt(Number(prompt("Inserisci la x del primo punto "))) || "N non valido";
                    break;
                case 2:
                    coordinate.y1 = parseInt(Number(prompt("Inserisci la y del primo punto "))) || "N non valido";
                    break;
                case 3:
                    coordinate.x2 = parseInt(Number(prompt("Inserisci la x del secondo punto "))) || "N non valido";
                    break;
                case 4:
                    coordinate.y2 = parseInt(Number(prompt("Inserisci la y del secondo punto "))) || "N non valido";
                    break;

            }

            //console.log("n = " + n + " type = " + typeof(n));

            if (coordinate.x1 == "N non valido" || coordinate.y1 == "N non valido" || coordinate.x2 == "N non valido" || coordinate.y2 == "N non valido") {
                console.log("\n\nATTENZIONE: numero inserito non valido!\nInseriscilo nuovamene!\n");
            };


        } while (typeof(coordinate.x1) != "number" || typeof(coordinate.y1) != "number" || typeof(coordinate.x2) != "number" || typeof(coordinate.y2) != "number");

    }

    distanza = Math.sqrt(((coordinate.x2 - coordinate.x1) * (coordinate.x2 - coordinate.x1)) + ((coordinate.y2 - coordinate.y1) * (coordinate.y2 - coordinate.y1)))
    console.log("\nDistanza tra i due punti P1(" + coordinate.x1 + "," + coordinate.y1 + ") e P2(" + coordinate.x2 + "," + coordinate.y2 + ") la distanza è = " + distanza);
    console.log("\nFunzione dist terminata con successo\n");
}


function Father() {
    console.log("\n\nFunzione Father startata con successo\n\n");
    console.log("\nInserisci le coordinate di due punti su un piano cartesiano \n\n");

    // inserimento 4 numeri => coordinate dei due punti P1 (x1, y1) e P2  (x2, y2)
    for (i = 1; i <= 4; i++) {

        do {

            switch (i) {
                case 1:
                    coordinate_2.x1_2 = parseInt(Number(prompt("Inserisci la x del primo punto "))) || "N non valido";
                    break;
                case 2:
                    coordinate_2.y1_2 = parseInt(Number(prompt("Inserisci la y del primo punto "))) || "N non valido";
                    break;
                case 3:
                    coordinate_2.x2_2 = parseInt(Number(prompt("Inserisci la x del secondo punto "))) || "N non valido";
                    break;
                case 4:
                    coordinate_2.y2_2 = parseInt(Number(prompt("Inserisci la y del secondo punto "))) || "N non valido";
                    break;

            }

            //console.log("n = " + n + " type = " + typeof(n));

            if (coordinate_2.x1_2 == "N non valido" || coordinate_2.y1_2 == "N non valido" || coordinate_2.x2_2 == "N non valido" || coordinate_2.y2_2 == "N non valido") {
                console.log("\n\nATTENZIONE: numero inserito non valido!\nInseriscilo nuovamene!\n");
            };


        } while (typeof(coordinate_2.x1_2) != "number" || typeof(coordinate_2.y1_2) != "number" || typeof(coordinate_2.x2_2) != "number" || typeof(coordinate_2.y2_2) != "number");

    }

    distanza_P1 = Math.sqrt(((coordinate_2.x1_2) * (coordinate_2.x1_2)) + ((coordinate_2.y1_2) * (coordinate_2.y1_2)))
    distanza_P2 = Math.sqrt(((coordinate_2.x2_2) * (coordinate_2.x2_2)) + ((coordinate_2.y2_2) * (coordinate_2.y2_2)))
    if (distanza_P1 > distanza_P2) {
        console.log("\nTra i due punti P1(" + coordinate_2.x1_2 + "," + coordinate_2.y1_2 + ") e P2(" + coordinate_2.x2_2 + "," + coordinate_2.y2_2 + ") il più distante da O(0,0) - con distanza " + distanza_P1 + " è il P1");
    } else if (distanza_P1 < distanza_P2) {
        console.log("\nTra i due punti P1(" + coordinate_2.x1_2 + "," + coordinate_2.y1_2 + ") e P2(" + coordinate_2.x2_2 + "," + coordinate_2.y2_2 + ") il più distante da O(0,0) - con distanza " + distanza_P2 + " è il P2");
    } else {
        console.log("\nI due punti P1(" + coordinate_2.x1_2 + "," + coordinate_2.y1_2 + ") e P2(" + coordinate_2.x2_2 + "," + coordinate_2.y2_2 + ") hanno eguale distanza da O(0,0)");
    }

    console.log("\nFunzione Father terminata con successo\n");
}

function Parole() {
    console.log("\n\nFunzione Parole startata con successo\n\n");
    console.log("\nInserisci una lista di parole, per terminare scrivi 'BASTA!' \n\n");

    do {
        parola_inserita = prompt("Inserisci una parola ");
        //controllo se parola è in array
        var c = true;
        for (let i = 0; i < parole.length; i++) {
            if (parole[i] == parola_inserita) {
                c = false //se parola è già in array modifico c
            }
        }
        if (c) { // => se c == True aggiungo parola inserita in parole (non vi era ancora)
            parole.push(parola_inserita);
        }


    } while (parola_inserita != "BASTA!")

    console.log("\nLista di parole inserite = " + parole);
    console.log("\nFunzione Parole terminata con successo\n");

}


function Parole_plus() {
    console.log("\n\nFunzione Parole PLUS startata con successo\n\n");
    console.log("\nInserisci una lista di parole, per terminare scrivi 'BASTA!' \n\n");

    do {
        parola_inserita = prompt("Inserisci una parola ");

        //controllo se parola è in array
        var c = true;
        for (let i = 0; i < parole.length; i++) {
            if (parole[i] == parola_inserita) {
                c = false //se parola è già in array modifico c
            }
        }
        if (c) { // => se c == True aggiungo parola inserita in parole (non vi era ancora)
            parole.push(parola_inserita);
        }

        parole_PLUS.push(parola_inserita); // array con ripetizioni


    } while (parola_inserita != "BASTA!")



    console.log("\nLista di parole inserite = " + parole);

    var counter = 0
    for (let k = 0; k < parole.length; k++) {
        parola_da_controllare = parole[k]

        for (let i = 0; i < parole_PLUS.length; i++) {
            if (parole_PLUS[i] == parola_da_controllare) {
                counter++; // => counter relativo a quella parola 
            }

        }

        console.log("\nLa parola '" + parola_da_controllare + "' è stata ripetuta " + counter + " volte");
        counter = 0


    }
    console.log("\nFunzione Parole PLUS terminata con successo\n");

}


function FusoOrario() {
    console.log("\n\nFunzione Fuso Orario startata con successo\n\n");
    console.log("\nInserisci un orario in formato hh.mm.ss\n\n");
    do {

        var hh = parseInt(Number(prompt("Inserisci un numero di ore del tuo orario "))) || "N non valido";

        if (hh == "N non valido" || hh > 23 || hh < 0) {
            console.log("\n\nATTENZIONE: numero inserito non valido!\n");
        };


    } while (typeof(hh) != "number" || hh > 23 || hh < 0);
    orario.hh = hh

    do {

        var mm = parseInt(Number(prompt("Inserisci un numero di minuti del tuo orario "))) || "N non valido";

        if (mm == "N non valido" || mm > 59 || mm < 0) {
            console.log("\n\nATTENZIONE: numero inserito non valido!\n");
        };


    } while (typeof(mm) != "number" || mm > 59 || mm < 0);
    orario.mm = mm

    do {

        var ss = parseInt(Number(prompt("Inserisci un numero di secondi del tuo orario "))) || "N non valido";

        if (ss == "N non valido" || ss > 59 || ss < 0) {
            console.log("\n\nATTENZIONE: numero inserito non valido!\n");
        };


    } while (typeof(ss) != "number" || ss > 59 || ss < 0);
    orario.ss = ss

    do {

        var n_fuso_orario = parseInt(Number(prompt("Inserisci un numero di ore corrispondenti al fuso orario "))) || "N non valido";

        if (n_fuso_orario == "N non valido" || n_fuso_orario > 25 || n_fuso_orario < -25) { // => max fusorario possibile = 25h di differenza
            console.log("\n\nATTENZIONE: numero inserito non valido!\n");
        };


    } while (typeof(n_fuso_orario) != "number" || n_fuso_orario > 25 || n_fuso_orario < -25);

    ora_con_fuso = orario.hh + n_fuso_orario // cambia orario
    if (ora_con_fuso > 24) {
        ora_con_fuso = ora_con_fuso - 24;
    } else if (ora_con_fuso < 0) {
        ora_con_fuso = ora_con_fuso + 24;
    }

    orario.hh = ora_con_fuso

    console.log("\nNuovo orario con fuso applicato = " + orario.hh + ":" + orario.mm + ":" + orario.ss);

    console.log("\nFunzione Fuso Orario terminata con successo\n");

}

function Strcat() {
    console.log("\n\nFunzione Strcat startata con successo\n\n");
    var parola_concatenata
    var array_iniziale = ["ciao", 0, 25, "qualcosa", true, orario]
    console.log("\n\narray iniziale = " + array_iniziale);


    for (i = 0; i < array_iniziale.length; i++) {
        if (typeof(array_iniziale[i]) != "string") {
            array_iniziale[i] = String(array_iniziale[i])
        } // => trasforma in stringhe i valori che non lo sono

        if (i == 0) {
            parola_concatenata = array_iniziale[i]
        } else {
            parola_concatenata = parola_concatenata + array_iniziale[i]
        }



    }

    console.log("\n\nparola concatenata = " + parola_concatenata);

    console.log("\n\nFunzione Strcat terminata con successo\n\n");

}


function inventario() {
    console.log("\n\nFunzione inventario startata con successo\n\n");

    console.log("\n\nInserisci quanti prodotti vuoi (composti da barcode, nome, quantità)\nTermina quando inserisci 'stop' come barcode\n\n");

    var barcode, nome_prodotto, quantità, counter_prodotti = 0
    do {
        counter_prodotti = counter_prodotti + 1;
        nome_prodotto = prompt("Inserisci il nome del prodotto ")
        do {
            quantità = parseInt(Number(prompt("Inserisci un la quantità di tale prodotto "))) || "N non valido";

            if (quantità == "N non valido") {
                console.log("\n\nATTENZIONE: numero inserito non valido!\n");
            };

        } while (typeof(quantità) != "number");

        barcode = prompt("Inserisci il barcode del prodotto ")

        // `prodotto${i}`
        switch (counter_prodotti) {
            case 1:
                var prodotto_1 = {
                    nome_p: nome_prodotto,
                    quantità_p: quantità,
                    barcode_p: barcode
                }
                Inventario_prodotti.push(prodotto_1);
                break;
            case 2:
                var prodotto_2 = {
                    nome_p: nome_prodotto,
                    quantità_p: quantità,
                    barcode_p: barcode
                }
                Inventario_prodotti.push(prodotto_2);
                break;
            case 3:
                var prodotto_3 = {
                    nome_p: nome_prodotto,
                    quantità_p: quantità,
                    barcode_p: barcode
                }
                Inventario_prodotti.push(prodotto_3);
                break;
            case 4:
                var prodotto_4 = {
                    nome_p: nome_prodotto,
                    quantità_p: quantità,
                    barcode_p: barcode
                }
                Inventario_prodotti.push(prodotto_4);
                break;
            case 5:
                var prodotto_5 = {
                    nome_p: nome_prodotto,
                    quantità_p: quantità,
                    barcode_p: barcode
                }
                Inventario_prodotti.push(prodotto_5);
                break;
            default:
                console.log("\nErrore!")
        };




    } while (barcode != "stop" && counter_prodotti <= 5)

    console.log("\n\nINVENTARIO:\n\n")
    for (i = 0; i < Inventario_prodotti.length; i++) {

        switch (i) {
            case 0:
                for (k in prodotto_1) {
                    console.log(prodotto_1[k])
                }
                console.log("\n")
                break;
            case 1:
                for (k in prodotto_2) {
                    console.log(prodotto_2[k])
                }
                console.log("\n")
                break;
            case 2:
                for (k in prodotto_3) {
                    console.log(prodotto_3[k])
                }
                console.log("\n")
                break;
            case 3:
                for (k in prodotto_4) {
                    console.log(prodotto_4[k])
                }
                console.log("\n")
                break;
            case 4:
                for (k in prodotto_5) {
                    console.log(prodotto_5[k])
                }
                console.log("\n")
                break;
            default:
                console.log("\nErrore!")
        };




    }


    /*
    fosr (k in Inventario_prodotti) {
        for (j in prodotto) {
            console.log(prodotto[k])
        }
    }
    */


    console.log("\n\nFunzione inventario terminata con successo\n\n");

}


if (__name__ == "__main__") {
    var t_i = Date.now() / 1000; // - > seconds
    decisione();


    var t_f = Date.now() / 1000;

    console.log("\nTempo impiegato per l'esecuzione del programma = " + parseInt(t_f - t_i) + " secondi")

}