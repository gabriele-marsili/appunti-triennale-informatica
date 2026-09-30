// convoy => array veicoli con [{tipo:"tir",altezza:5.67}]

function tunnel(convoy, max_height) {

    //var counter = 0;
    if (convoy == [] || convoy == undefined) {
        convoy = [];
        return convoy;
    } else {
        console.log("\nArray iniziale : ", convoy);
        for (let i = 0; i < convoy.length; i++) {

            if (convoy[i].altezza >= max_height) {
                console.log("\nconvoy[i].altezza = ", convoy[i].altezza);

                var indice_ultimo_elemento = convoy.length - 1; // => ultimo elemento (=el. non ancora spostato)
                console.log("\nindice_ultimo_elemento : ", indice_ultimo_elemento);

                var appoggio = convoy[indice_ultimo_elemento];
                console.log("\nappoggio : ", appoggio);


                //cambio:
                console.log("\ncambio ", convoy[indice_ultimo_elemento], " con ", convoy[i]);
                convoy[indice_ultimo_elemento] = convoy[i] // => sposto nell'ultimo elemento l'elemento con h> h.max

                console.log("\ncambio ", convoy[i], " con ", appoggio);
                convoy[i] = appoggio

                //elimino ultimo elemento:
                convoy.length = convoy.length - 1

                i--


            };

            //console.log("\nconvoy[" + i + "] :\n" + convoy[i].tipo + "\n" + convoy[i].altezza + "\n\n--------");

        };

        //console.log("\narray con elementi da eliminare in fondo :\n ", convoy);
        //console.log("\nquantità elementi da eliminare : ", counter);


        //convoy.length = convoy.length - counter; // => tronco array dal fondo, togliendo gli elementi con h > h max 
        console.log("\naltezza v array finale :\n ");
        for (i = 0; i < convoy.length; i++) {
            console.log("\nh n " + i + " : " + convoy[i].altezza)
        }

        return convoy;
    };

};