const __name__ = "__main__";

var a, b;


function tebella_booleana() {
    console.log("\n\nFunzione tabella booleana startata con successo\n\n");
    for (i = 0; i <= 3; i++) { // 0,1,2,3
        if (i <= 1) {
            a = true;
        } else {
            a = false;
        };

        if (i % 2 == 0) {
            b = true;
        } else {
            b = false;
        };

        let risultato = (a || b);
        console.log(" a (" + a + ") or b (" + b + ") => " + risultato);

    }

    console.log("\n\nFunzione tabella booleana conclusa con successo\n\n")


};

function calcola_temperatura() {
    console.log("\n\nFunzione calcola temperatura startata con successo\n\n");
    do {

        var t_in_C = Number(prompt("Inserisci una temperatura in °C ")) || "T non valida";

        //console.log("t_in_C = " + t_in_C + " type = " + typeof(t_in_C));

        if (t_in_C == "T non valida") {
            console.log("\n\nATTENZIONE: temperatura inserita non valida!\n");
        }


    } while (typeof(t_in_C) != "number");

    let t_in_F = t_in_C * 1.8 + 32;
    console.log("\nLa temperatura in gradi Fahrenheit corrispondente a " + t_in_C + " è: " + t_in_F);
    console.log("\n\nFunzione calcola temperatura conclusa con successo\n\n")

};

function calcola_tempo() {
    console.log("\n\nFunzione calcola tempo startata con successo\n\n");
    do {
        var secondi_iniziali = Number(prompt("Inserisci un numero di secondi ")) || "N non valido";

        if (secondi_iniziali == "N non valido") {
            console.log("\n\nATTENZIONE: numero di secondi inserito non valido!\n");
        }

    } while (typeof(secondi_iniziali) != "number");

    let R_ore = secondi_iniziali % 3600
    let ore = (secondi_iniziali - R_ore) / 3600
    let secondi = R_ore % 60
    let minuti = (R_ore - secondi) / 60


    console.log("\n\nOre = " + ore + " | minuti = " + minuti + " | secondi = " + secondi)





    console.log("\n\nFunzione calcola tempo conclusa con successo\n\n")
};






if (__name__ == "__main__") {
    tebella_booleana();
    calcola_temperatura();
    calcola_tempo();

}



/*
switch(espressione){
    case x:
        //comandi
        break;
    case y:
        //comandi
        break;
    default:
        //comandi eseguiti se non è stato soddisfatto nessun caso
        // può esser inserito anche non in fondo
}
*/