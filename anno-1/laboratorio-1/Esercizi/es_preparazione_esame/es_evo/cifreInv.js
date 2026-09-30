/*
Si scriva una funzione ricorsiva cifreInv(n) che, dato come argomento un intero positivo n, restituisca un array che in posizione 
 contiene la cifra 
-esima di 
, dalla meno significativa alla più significativa.
*/

function cifreInv(n) {
    let res = []
    let s = String(n).split("")
    res.push(Number(s[s.length-1]))
    s.splice(s.length-1, 1)
    let new_S = ''
    for(let el of s){
      new_S += el
    }
    if (new_S.length != 0) {
      res = res.concat(cifreInv(Number(new_S)))
    } else return res
  
    return res
  }
  
  
  