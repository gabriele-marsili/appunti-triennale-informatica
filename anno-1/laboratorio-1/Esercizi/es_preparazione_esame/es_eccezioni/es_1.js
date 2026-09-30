const { throws } = require("assert")

/*
Scriviamo una funzione calc(a) che, dato come argomento un array a, 
in cui il primo elemento è un operatore aritmetico (+, -, *, /) rappresentato come carattere, 
restituisca il risultato ottenuto applicando l’operatore fra tutti i rimanente elementi dell’array. 
 */
class WrongOperator extends Error {}
class OperandError extends Error {}
var calc = (a) => {    
    let [op,...resto] = a // destrutturazione per isolare operatore e il resto dell'array
    
    // controllo operandi 
    for(let operand of resto) {
        if(!Number(operand)) throw new OperandError("The operand must be a number")
    }

    switch (op) {
        case "+":
            return resto.reduce((y,z) => (y + z), 0)            
        case "-":
            [x1,...resto] = resto
            return resto.reduce((y,z) => (y - z), x1)            

        
        case "*":
            return resto.reduce((y,z) => (y * z), 0)            


        case "/":
            [x1,...resto] = resto
            return resto.reduce((y,z) => (y / z), x1)            

        default:
            throw new WrongOperator("Wrong operator")
    }
}

//Scriviamo una funzione calcAll(e) che, dato come argomento un array e di espressioni, invoca calc su ciascuna espressione
function calcAll(e) {
    try{
        e.map(calc)
    }
        
    catch (error){
        console.log(error.message);
        if(error instanceof TypeError) throw new Error("Wrong type input")
        else if (error instanceof ReferenceError) throw new Error("There's an unreferenced variable")
    }   

    finally{
        console.log("done");
    }
}

