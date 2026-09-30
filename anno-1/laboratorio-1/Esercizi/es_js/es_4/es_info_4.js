/*

Disegnare il grafico sull’intervallo [-50,50] 
per la funzione f(x) = x/2-1


Disegnare il grafico e stimare il minimo della funzione f(x) 
= (x+0.1)2
Sperimentare con la precisione per ottenere il minimo 


Disegnare i grafici sull’intervallo [0,50] per le funzioni 
f(x)=log(x), f(x) = 3x+2, f(x) = x2, f(x)=2x. 
Quale funzione cresce più velocemente?
Per il logaritmo e l’esponenziale usare le funzioni 
Math.log e Math.pow



*/

const __name__ = "__main__";

const c = document.getElementById("canvas")
const ctx = c.getContext('2d');

//di default sono 600 e 600
var width = c.width
var height = c.height

//unità di misura di default
var u = 20;


const button_1 = document.getElementById("button_1")
const button_2 = document.getElementById("button_2")
const button_3 = document.getElementById("button_3")
const button_4 = document.getElementById("button_4")
const button_5 = document.getElementById("button_5")
const button_6 = document.getElementById("button_6")



let val_intervallo_1 = -50,
    val_intervallo_2 = -val_intervallo_1,
    val_intervallo_3 = 0
let delta = 0.1


const canvas = document.getElementById('canvas').getContext('2d')
canvas.translate(300, 200)
canvas.beginPath()
canvas.moveTo(-300, 0)
canvas.lineTo(300, 0)
canvas.moveTo(0, -200)
canvas.lineTo(0, 200)
canvas.closePath()
canvas.stroke()
canvas.scale(6, -6)
canvas.fillStyle = '#880000'
canvas.strokeStyle = '#800000'

const punto = (x, y) => {
    const s = 0.5
    canvas.fillRect(x - s / 2, y - s / 2, s, s)
}

const linea = (x0, y0, x1, y1) => {
    canvas.beginPath()
    canvas.moveTo(x0, y0)
    canvas.lineTo(x1, y1)
    canvas.stroke()
    canvas.closePath()
}

const colore = (c) => {
    canvas.fillStyle = c
    canvas.strokeStyle = c
}


//in base alla scelta dell'utente svolge la funzione corrispondente
button_1.addEventListener("click", function(esegui_1) {
    //disegna_assi();
    grafico_1();
})

button_2.addEventListener("click", function(esegui_2) {
    //disegna_assi();
    grafico_2();
})

button_3.addEventListener("click", function(esegui_3) {
    //disegna_assi();
    grafico_3();
})

button_4.addEventListener("click", function(esegui_4) {
    //disegna_assi();
    grafico_4();
})

button_5.addEventListener("click", function(esegui_5) {
    //disegna_assi();
    grafico_5();
})

button_6.addEventListener("click", function(esegui_6) {
    //disegna_assi();
    grafico_6();
})



function grafico_1() {
    console.log("\nIn grafico 1")
    for (let x = val_intervallo_1; x <= val_intervallo_2; x += delta) {
        punto(x, (x / 2 - 1))
    }
}

function grafico_2() {
    var delta_2 = 0.001
    console.log("\nIn grafico 2")
    let min = Infinity
    for (let x = val_intervallo_1; x <= val_intervallo_2; x += delta_2) {
        let y = (x + 0.1) * (x + 0.1)
        if (y < min) {
            min = y;
        }
        punto(x, y)

    }
    console.log("minimo = " + min);
    if (0.01 < min < 0.1) {
        console.log("il minimo è approssimabile a 0");
    }
}


function grafico_3() {
    var delta_3 = 0.00001
    console.log("\nIn grafico 3 => log(x)")
    for (let x = val_intervallo_3; x <= val_intervallo_2; x += delta_3) {
        punto(x, (Math.log(x)))
    }
}

function grafico_4() {
    console.log("\nIn grafico 4 => 3x+2")
    for (let x = val_intervallo_3; x <= val_intervallo_2; x += delta) {
        punto(x, (3 * x + 2))
    }
}

function grafico_5() {
    var delta_n = 0.00001
    console.log("\nIn grafico 5 => x^2")
    for (let x = val_intervallo_3; x <= val_intervallo_2; x += delta_n) {
        punto(x, (x * x))
    }
}

function grafico_6() {
    var delta_4 = 0.00001
    console.log("\nIn grafico 6 => 2^x")
    for (let x = val_intervallo_3; x <= val_intervallo_2; x += delta_4) {
        punto(x, Math.pow(2, x))
    }
}






// UTILITY FUNCTION

//Cancella il canvas
function cancella_piano() {
    //ctx.clearRect(-c.width / 2, -c.height / 2, c.width, c.height);
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
    //ctx.clearRect(0, 0, c.width, c.height);
    //cambia_dimensioni_canvas()

    // Salva la matrice del canvas
    ctx.save();
    ctx.beginPath(); //--> elimina le linee

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, 1000, 1000);

    ctx.restore();

}

//Disegna nuovamente gli assi cartesiani
function disegna_assi() {
    //prima di disegnare gli assi nuovamente pulisce il canvas precedente
    cancella_piano()

    //punto centrale di origine --> (larghezza/2;altezza/2)
    var Ox = width / 2;
    var Oy = height / 2;

    // asse x
    ctx.moveTo(u, Oy); //punto di partenza
    ctx.lineTo(Ox * 2 - u, Oy); //punto di arrivo
    ctx.moveTo(width - 20, Oy - 4); //punta asse x
    ctx.lineTo(width - 20, Oy + 4);
    ctx.lineTo(width - 12, Oy);
    ctx.lineTo(width - 20, Oy - 4); //fine punta asse x



    // asse y
    ctx.moveTo(Ox, u); //punto di partenza
    ctx.lineTo(Ox, Oy * 2 - u); //punto di arrivo
    ctx.moveTo(Ox - 4, 20); //punta asse y
    ctx.lineTo(Ox + 4, 20);
    ctx.lineTo(Ox, 12);
    ctx.lineTo(Ox - 4, 20); //fine punta asse y

    //segmento unità misura
    ctx.moveTo(Ox + 150, u); //punto di partenza
    ctx.lineTo(Ox + 150 + u, u); //punto di arrivo

    ctx.stroke();
    ctx.fill(); //riempimento frecce
    ctx.fillStyle = "rgb(0,0,0)"

    // scrive x, y, O, u
    ctx.fillText('x', width - u, Oy + 10)
    ctx.fillText('y', Ox + 5, u)
    ctx.fillText('O', Ox + 2, Oy + 10)
    ctx.fillText('u', Ox + 150 + u / 2, 30)

    //ctx.fillText('x MAX ', width - (3 * u), Oy + 10)
    //ctx.fillText('x MIN ', u, Oy + 10)

    //ctx.fillText('y MAX', Ox + 5, 3 * u)
    //ctx.fillText('y MIN', Ox + 5, height - 2 * u)
}




if (__name__ == "__main__") {
    var t_i = Date.now() / 1000; // - > seconds


    var t_f = Date.now() / 1000;

    console.log("\nTempo impiegato per l'esecuzione del programma = " + parseInt(t_f - t_i) + " secondi")

}