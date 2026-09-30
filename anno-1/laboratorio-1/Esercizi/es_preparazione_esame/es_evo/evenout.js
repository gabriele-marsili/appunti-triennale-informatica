/*
Si scriva una funzione JavaScript evenout(n) che, ricevuto come argomento un intero n≥0, restituisca un altro intero m così definito:

sia b la rappresentazione binaria di n
se b contiene un numero pari di 1, allora viene aggiunto uno 0 a destra di b
se b contiene un numero dispari di 1, allora viene aggiunto un 1 a destra di b
m è il valore decimale corrispondente a b modificato come indicato sopra
Si noti che alla fine, il numero di bit a 1 in m sarà sempre pari.
*/

function evenout(n){

    function count(arr){
        let c = 0;
        for (let i = 0; i < arr.length; i++){
            if(arr[i] === 1){
                c++;
            }
        }
        return c;
    }

    function intoNumber(binary_arr){
        res = 0
        for(let i = 0; i < binary_arr.length; i++){
            res += Math.pow(2,i)*binary_arr[i]
        }
        return res
    }

    let b = [];
    while(n >=2){
        b.push(Math.floor(n%2))
        n = Math.floor(n/2)
    }
    b.push(n)
    console.log("b = ",b)
    console.log("intoNumber(b) = ",intoNumber(b))
    //while(b.length< 7){b.push(0)} // => 8 bits

    if(count(b) % 2 === 0){ // => num pari di 1 in b
        b.unshift(0)
    }else{
        b.unshift(1)
    }
    console.log("b2 = ",b)


    return intoNumber(b)
}


console.log(evenout(11)) // => 23 -->  [1, 1, 1, 0, 1]

/*soluzione:
function evenout(n) {
  var m=n, ones=0
  while (m>0) {
    if (m%2) ones++
    m=Math.floor(m/2)
  }
  return 2*n+ones%2
}
*/