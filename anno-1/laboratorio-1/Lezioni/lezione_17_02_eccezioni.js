// bug, errori ed eccezioni


// 'use strict' => controllo strtetto applicato o a tutto il file o ad una singola funzione

// uso try, catch e finally

// nella gestione dell'errore è necessario creare una GERARCHIA degli errori (=> gerarchia di classi)
// => faccio ciò estendendo la classe Error
class Calc_Error extends Error {

}

class Operator_Error extends Calc_Error {

}

class Operand_Error extends Calc_Error {

}


var arr_op = ["+", "-", "*", "/"]

function calc1(a) { // array del genere: a = ["+",4,5,21]
    [op, ...x] = a // assegnamento destrutturante per estrarre operatore 

    for (el of x) {
        if (typeof(el) != "number") throw new Operand_Error(el + " operando non numerico")
    }


    /*
    if (!(arr_op.includes(op))) {
        return "operatore inserito non corretto";
    } else if (x.length < 2 || op.length != 1) {
        return "inserisci un solo operatore ed almeno 2 numeri";
    }

    
    */

    switch (op) {
        case "+":
            res = x.reduce((a, b) => a + b, 0);
            break

        case "-":
            res = x.reduce((a, b) => a - b);
            break

        case "*":
            res = x.reduce((a, b) => a * b, 1);
            break

        case "/":
            res = x.reduce((a, b) => a / b) // passa in automatico il primo elemento dell'array
                // if res == infinity -> return eccezione apposita 
            break

        default: // => creo un errore (=> ho un operatore che non so gestire / sconosicuto)
            throw new Operator_Error("Operatore non corretto\nOperatori consentiti:\n " + arr_op)
    }

    return res


}


function calc_All(a1) {
    try {
        //comandi 
        return a1.map(calc1) // in a1, per ogni suo elemento, ci sarà il risultato della chiamata di clalc per tale elemento
    } catch (error) { // => interruziozne dell'esecuzione del codice 
        //comandi getione errore 
        // => error = oggetto di tipo error => ha svariati sottotipi pre-definiti (EvalError, RangeError, ReferenceError, SyntaxError... )
        // errore ha costruttore 
        // ha campo message


        // lanciare un errore:
        //throw new Error("Operatore non corretto\nOperatori consentiti:\n " + arr_op)

        // nella gestione dell'errore è necessario creare una GERARCHIA degli errori

        // controllo tipo erroe
        if (error instanceof Calc_Error) {
            console.log("Errore di calcolo")
            if (error instanceof Operator_Error) {
                console.log("Errore di operatore")
            }

            if (error instanceof Operand_Error) {
                console.log("Errore di operando : inserisci solo operandi numerici!")
            }

        }

        /* 
        if (error == "TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))") {
            console.log("Errore!\nHai inserito un valore non definito, rimuovilo e riprova\n\nErrore:\n" + error.message)
        } else {
            console.log("Error: " + error.message)
        }
        */
    } finally { // => viene eseguita al termine di try-catch in caso in cui voglio eseguire un pezzo di codice della funzione anche in caso di errore
        //comandi finali (opzionali)
    }

}

e = [
    ["+", 1, 2, 3],
    ["-", 1, 2, 3],
    undefined
]
console.log(calc1(["%", 1, 2, 3]))

console.log(calc_All(e))