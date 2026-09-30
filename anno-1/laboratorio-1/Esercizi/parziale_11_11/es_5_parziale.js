/*

Si scriva una funzione signed_to_integer(arr) 
che 

dato un array arr contenente un intero codificato tramite complemento 
a 2 

restituisca il corrispondente valore intero in base 10.



La funzione ritorna undefined se l'array contiene un numero 
di bit inferiore a due.



Ad esempio:

signed_to_integer([1, 0, 1, 0, 1, 0]) => -22
signed_to_integer([0, 0, 1, 0, 1, 0]) => 10

*/


function signed_to_integer(arr) {
    let num_come_stringa = ""
    if (arr.length < 2) return undefined
    else {

        function converti_in_stringa(arr) {
            for (let i = 0; i < arr.length; i++) {
                num_come_stringa = num_come_stringa + String(arr[i])
            }
            console.log("num_come_stringa = ", num_come_stringa)
            return num_come_stringa

        }
       
        



    function complemento_2_inverso(num) {

        console.log("c 2 inverso = ", ~(num))
        return ~(num)
    }

    function transf(n, b1, b2) {
     
            let n1 = parseInt(n, b1); // => restituisce n in base b1    
            return n1.toString(b2); // => trasformo n1 (in base b1) nella stringa equivalente in base b2

        

    };


    //  => se positivo
    if (arr[0] == 0) {


        return transf( converti_in_stringa(arr), 2, 10)
    } else { // => se negativo 
       
        
        if (arr[arr.length - 1] == 0) {
            let i = arr.length - 1
            while (arr[i]=!1){
                
                i = i-1
            }
        }
        

        transf(complemento_2_inverso( converti_in_stringa(arr)), 2, 10)
    }






    //return transf(complemento_2_inverso(num_come_stringa), 2, 10)

}
}
console.log("signed_to_integer([1, 0, 1, 0, 1, 0]) = ", signed_to_integer([1, 0, 1, 0, 1, 0]))
console.log("signed_to_integer([0, 0, 1, 0, 1, 0]) = ", signed_to_integer([0, 0, 1, 0, 1, 0]))