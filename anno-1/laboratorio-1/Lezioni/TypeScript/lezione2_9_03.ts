"use strict";

//esercizi:



//ES 1
class OperatorError extends Error {};
class MathError extends Error {};

function calcola1(n1:number, n2:number,o1:string): number {

    switch (o1){
        case "+":
            return  n1 + n2;
        case "-":
            return  n1 - n2;
        case "*":
            return n1 * n2;
        case "/":
            if(n2== 0) throw new MathError("Invalid n2 (=> non puoi dividere per 0)");
            return n1 / n2;

        default: throw new OperatorError("operatore non corretto"); // => errore 
    }
}

console.log(calcola1(2,3,"-"))






// ES 2 : UNIONE :

type arrayString = string
function affetta(s:arrayString, n?:number):arrayString {
    if(typeof n == undefined) return s;
    else{
        let copy:string = s.substring(0,n)
        return copy
    }
}

console.log(affetta("Hi Pippo",5)) // => "Hi Pi"


//ES 3 : CALCOLA VARIANTE 2:


type tupla = [number,number,string]
class lengthError extends Error{}

function calcola2(arr:tupla[]):number[]{
    //if(arr.length == 0) throw new lengthError("array non puà esser vuoto");

    var res:number[] = []
    
    for(let i:number=0;i<arr.length;i++){
        res.push(calcola1(arr[i][0],arr[i][1],arr[i][2]));
    }       
    return res   

    /*alternativa:
    var temp: number | undefined 
    for(let el of arr){
        temp = calcola1(...el);
        if(typeof temp === 'number') res.push(temp)
    }
    return res;
    */

}

var try_tupla : tupla[] 
try_tupla = [[2,3,"-"], [4,3,"-"], [80,3,"-"]]
console.log(calcola2(try_tupla))


//ES 4 :

/*Calcola Variante 3: 
scrivere una versione della funzione calcola precedente 
ma che prende tuple in cui l'operatore può essere in qualsiasi posizione nella tupla 
(gli operandi vengono usati nell'ordine in cui compaiono nella tupla)
*/

type n_o_s = number | string

type final_tuple_type = [n_o_s , n_o_s , n_o_s]

function calcola3(arr:final_tuple_type[]):number[]{
    //if(arr.length == 0) throw new lengthError("array non puà esser vuoto");

    let res:number[] = []
    let tmp : number | undefined 
    
    for(let elemento of arr){


        // => estrarre operatore (string)

        if(typeof elemento[0] === 'string' && typeof elemento[1] === 'number' && typeof elemento[2] === 'number'){ 
            tmp = calcola1(elemento[1],elemento[2],elemento[0])
        }

        if(typeof elemento[1] === 'string' && typeof elemento[0] === 'number' && typeof elemento[2] === 'number'){ 
            tmp = calcola1(elemento[0],elemento[2],elemento[1])
        }

        if(typeof elemento[2] === 'string' && typeof elemento[0] === 'number' && typeof elemento[1] === 'number'){ 
            tmp = calcola1(elemento[0],elemento[1],elemento[2])
        }



        if(typeof tmp === "number") res.push(tmp);
        
        
    }       
    return res   

}

let arr1: final_tuple_type[] = [[1,2,"+"],["-",1,2],[1,"*",2],[2,1,"/"]];
console.log(calcola3(arr1));