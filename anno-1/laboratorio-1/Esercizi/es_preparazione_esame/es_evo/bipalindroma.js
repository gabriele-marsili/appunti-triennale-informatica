/*
Una sequenza è detta palindroma se, invertendo l'ordine degli elementi, si ottiene nuovamente la sequenza originale. 
Una sequenza è detta bipalindroma se è costituita da due sottosequenze, anche di lunghezze diverse, ciascuna delle quali è palindroma. 
Si noti che la sequenza vuota è palindroma, e dunque tutte le sequenze palindrome sono bipalindrome in quanto composte dall'intera sequenza, 
seguita dalla sequenza vuota.

Per esempio, "ABBA" è una stringa palindroma; "" è una stringa palindroma, dunque "ABBA"+"" è una stringa bipalindroma.

D'altra parte, "ABABBABB" è bipalindroma, in quanto costituita da "ABA" e "BBABB", che sono entrambe palindrome, ma non è essa stessa 
palindroma, perché "ABABBABB"≠"BBABBABA".


Si scriva una funzione JavaScript bipalindroma(s) che ricevuta una stringa s, restituisca true se la stringa è bipalindroma, 
false altrimenti.


*/

function bipalindroma(s){
    function palindroma(s){
        s = s.split("")
        let i = 0
        let j = s.length -1
        while(i <= j ){ // => check if palindroma 
            if (s[i].toUpperCase() != s[j].toUpperCase()) return false
            //console.log(s[i].toUpperCase(), " e ",s[j].toUpperCase() , " passed")
            i++;
            j--
        } 
        if(i <= j)console.log( "last checked:\n",s[i].toUpperCase(), "\n",s[j].toUpperCase())
        else console.log( "last checked 2:\n",s[i-1].toUpperCase(), "\n",s[j+1].toUpperCase())

        console.log(i,j)
       // if(Math.abs(i - j) <= 1 ) return true
        //else if(Math.abs(i - j) > 1 && )
        return true
    }

    if(palindroma(s)) return true
    else{//=> check sottosequenze:
        ar_s = s.split("")
        let c_s = ""
        for(let i =0;i<ar_s.length;i++){
            c_s += ar_s[i]
            let r_s = ""
            for(let j = i+1;j<ar_s.length;j++){
                r_s += ar_s[j]
            }
            console.log("check:\n",c_s,"\n",r_s)
            if(palindroma(c_s) && palindroma(r_s))return true 
        }
        return false

    }
   

}

//console.log(bipalindroma("ABABBABB"))
//console.log(bipalindroma("ABBA"))
console.log(bipalindroma("BabcAc"))