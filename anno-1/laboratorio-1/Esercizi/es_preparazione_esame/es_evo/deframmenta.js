/*
Scrivere una funzione deframmenta(a), con a array di numeri. La funzione restituisce una copia dell'array 
da cui sono state eliminate le occorrenze dei numeri quando queste non sono ripetute in sequenza 
(ovvero in posizioni contigue dell'array) almeno una volta. 


Esempi:

deframmenta([1,1,2,3,3,3,2,2,4]) -> [1,1,3,3,3,2,2] 

deframmenta([0,0,0,0,0,1,0,1,1]) -> [0,0,0,0,0,1,1]

deframmenta([1,0]) -> []
*/

function deframmenta(a){
    let res = [];
    for(let i = 0; i < a.length; i++){
        if(a[i] == a[i+1] || a[i] == a[i-1]){
            res.push(a[i]);
        }
    }
    return res;
}


console.log(deframmenta([1,1,2,3,3,3,2,2,4])) //-> [1,1,3,3,3,2,2] 

console.log(deframmenta([0,0,0,0,0,1,0,1,1])) //-> [0,0,0,0,0,1,1]

console.log(deframmenta([1,0])) //-> []


/*soluzione in place: 
function filtro(e) {
  return e != 'undefined';
}

function deframmenta(a) {
  let n = a.length;
  let i = 0;
  while (i<n) {
    if (a[i] != a[i+1] && a[i+1] != a[i+2]) {
      a.fill('undefined', i+1, i+2);
      i++;
      continue;
    } else i++;
  }
  a = a.filter(filtro);
  if (a.length == 1) a.shift();
  return a;
}
*/