/*
-- SCOOPING --
=> visibilità variabili 
=> https://docs.google.com/presentation/u/0/d/14ykNkORd7tjEMMs4NhXnAZjUDcIXLDqOIOhRE4JktuY/edit?usp=drive_web
=> https://docs.google.com/presentation/d/1eNpsQsg-5rUlEQj3f3XfLp5ZDCGmt21UWN8UMk4MBnI/edit#slide=id.p

scope di visibilità, annidamento, shoadowing, hoisting, differenze var / let 

*/

var u // => u = undifeined poiché dichiarata e non inizializzata

/*
function nome (p1...pn){
    corpo 
}
= a 
var nome => (p1..p2){
    corpo
}



// visibilità varia in base la luogo in cui variabile viene dichiarata e in base al costrutto utilizzato (let/var)



// scope GLOBALE = dichiarazioni nella parte "esterna" del codice => es. console.log("questo è scope globale")
=> ne esiste solo 1

=> le dichiarazioni dello scope globale sono visibili in tutto il codice 

se viene utilizzata una variabile NON dichiarata essa assume lo scope globale (=> rende programma illeggbile !) 
=> le dichiarazioni globali vanno utilizzate solo nello stretto necessario 


// scope FUNZIONE => crea uno "scatolotto" con dichiarazioni (tra cui parametri formali) visibili sicuramente nella funzione stessa
=> parametri formali NON visibili al di fuori della funzione (da dentro si vede fuori, ma NON vale il viceversa !)
=> le dichiarazioni fatte con il var hanno scope di FUNZIONE 
=> contiene almeno 1 scope di blocco 

// scope di BLOCCO => let e const dichiarano le variabili con scope di blocco (es. let i = 0 nel for !)
=> lo scope di funzione contiene almeno uno scope di blocco (il blocco della funzione stessa)


ANNIDAMENTO E SHADOWING 
=> gli scopi sono contenuti uno nell'altro 

var a  = 0
{B1
    {B2
        let a = 1 
        {B3
            b = 57 - a  => 56 poiché legge il valore a dichiarato in di B2 (non vede la dichiarazione global)
        }
    }
}




*/
var a = false
if (a = true) { // = >scope di blocco 
    console.log("h w ")
} else {
    console.log("NOT h w ")
}