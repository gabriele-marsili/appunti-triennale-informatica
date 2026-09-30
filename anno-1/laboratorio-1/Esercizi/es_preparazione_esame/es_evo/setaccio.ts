/*
Si scriva in TypeScript una funzione setaccio(a,f) che, 
preso un array omogeneo a di un qualche tipo, e una funzione f che dato un valore 
del tipo degli elementi di a restituisca un valore di tipo "cbool", 
restituisca un oggetto con due proprietà:
una di nome "yes" il cui valore è un array degli elementi di a che soddisfano f, 
e una di nome "no" il cui valore è un array degli elementi di a che non soddisfano f, ciascuno 
nello stesso ordine in cui gli elementi comparivano in a.

Il tipo cbool include (solo) i valori true e 1 che vengono interpretati come "soddisfatto", e false e 
0 che vengono interpretati come "non soddisfatto". NOTA: dovrete dichiarare il tipo cbool nel vostro codice 
(con esattamente questo nome).

Abbiate cura di annotare il più precisamente possibile i tipi di tutte le dichiarazioni.
*/

type cbool = 1 | false | true | 0;
function setaccio<T>(a:T[], f:(val : T) => cbool ) : object{
    let si : T[] = []
    let no : T[] = []
    for(let el of a){
        if(f(el)){
            si.push(el)
        }
        else{
            no.push(el)
        }
    }
    return {
        yes: si,
        no: no
    }
}


/*alternaviva valida:

interface I_obj<T>{
    "yes" : T[],
    "no" : T[],
}
type cbool = boolean | 1 | 0
type Ftype<T> = (v:T) => cbool
function setaccio<T> (a : T[],f : Ftype<T> ) : I_obj<T>{
    let res : I_obj<T> = {
        "yes" : [],
        "no" : [],
    }
    for(let el of a){
        if(f(el)){
            res["yes"].push(el)
        }
        else{
            res["no"].push(el)
        }
    }

    return res
}           
*/