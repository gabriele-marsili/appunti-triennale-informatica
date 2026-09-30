/*
Si consideri un array i cui elementi possono essere o stringhe, oppure altri array 
dello stesso tipo (ovvero, aventi per elementi o stringhe, oppure altri array dello stesso tipo, e così via). 
Si scriva una funzione lineare(a) che, dato un array 
 come descritto sopra, restituisca un array contenente le sole stringhe, nello stesso ordine
  in cui comparivano nell’array 
.



Esempi:

lineare(["pippo", ["va", "a"], "scuola"]) → ["pippo", "va", "a", "scuola"]

lineare([["che"], "bello", ["questo", "esercizio"], "qui", []]) → ["che", "bello", "questo", "esercizio", "qui"]
*/

function lineare(a){
    let res = []
    for(let el of a){
        if(typeof el === "string") res.push(el)
        else{ 
            res = res.concat(lineare(el))
        }
    }
    return res
}
console.log(lineare(["pippo", ["va", "a"], "scuola"])) //→ ["pippo", "va", "a", "scuola"]

//console.log(lineare([["che"], "bello", ["questo", "esercizio"], "qui", []])) //→ ["che", "bello", "questo", "esercizio", "qui"]
