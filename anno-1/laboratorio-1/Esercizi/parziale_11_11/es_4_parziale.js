/*
es

corsi = [{'corso':'lab I','semestre':2,'numStudenti': 217}, 
         {'corso':'algoritmi', 'semestre':1,'numStudenti': 136},
         {'corso':'analisi','semestre':1,'numStudenti':150}]

modificaCorsi(corsi) => 
[{'corso':'lab I','semestre':1,'numStudenti': 217}, 
{'corso':'algoritmi','semestre':2,'numStudenti': 136},
{'corso':'analisi','semestre':2,'numStudenti':150}]


*/
var corsi = [{ 'corso': 'lab I', 'semestre': 2, 'numStudenti': 217 },
    { 'corso': 'algoritmi', 'semestre': 1, 'numStudenti': 136 },
    { 'corso': 'analisi', 'semestre': 1, 'numStudenti': 150 }
]

function modificaCorsi(corsi) {

    if (corsi == [] || corsi.length == 0) return undefined;

    else {
        for (let i = 0; i < corsi.length; i++) {
            let ogg = corsi[i]
            if (ogg["numStudenti"] <= 150) {
                ogg["semestre"] = 2
            } else {
                ogg["semestre"] = 1
            }

        }

        return corsi
    }


}

console.log("modifica corsi : \n\n", modificaCorsi(corsi))