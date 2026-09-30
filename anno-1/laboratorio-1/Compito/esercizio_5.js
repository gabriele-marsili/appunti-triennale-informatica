function tunnel(convoy, max_height) {

    if (convoy == [] || convoy == undefined) {
        convoy = [];
        return convoy;
    } else {

        for (let i = 0; i < convoy.length; i++) {

            if (convoy[i].altezza >= max_height) {
                var indice_ultimo_elemento = convoy.length - 1; // => ultimo elemento (=el. non ancora spostato)                
                var appoggio = convoy[indice_ultimo_elemento];

                //cambio:                
                convoy[indice_ultimo_elemento] = convoy[i]; // => sposto nell'ultimo elemento l'elemento con h> h.max                
                convoy[i] = appoggio;

                //elimino ultimo elemento:
                convoy.length = convoy.length - 1;

                i--; // => necessario per controllare tutti gli elementi
            };
        };
        return convoy;
    };

};