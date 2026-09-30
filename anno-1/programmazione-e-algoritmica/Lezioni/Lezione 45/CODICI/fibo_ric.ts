/*
V1: 
Fib_rec(n) {
	If (n==0) then return 0;
	If (n==1) then return 1;
	Else{
		Return fib_rec(n-1) + fib_rec(n-2);
	}
} 



PD-FIB (n){
	F: array [0…n] // => array di n elementi in cui memorizzo l'ennesimo numero di Fibonacci => in teoria mi bastano gli ultimi due elementi
	For i = 0 to n do F[i] =1 ; // pieno l'array di elementi neutri (1) 
	F[0] = 0; // => dovuto a CB fib.
	F[1] = 1;// => dovuto a CB fib.
	For i = 2 to n do F[i] = F[i-1] + F[i-1];
	return F[n]
}


*/

import * as readline from 'readline';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class TypeUnchangable extends Error{}

rl.question('Please, insert a number ', (answer) => {    
    var n : string | null = answer
    var result : number | undefined =  undefined
        
    if(n!=null) {
        try{
            var number : number = parseInt(n)
            console.log("number in Input : ",number)
            console.log("Fib V1 - not dinamic : ")
            
            let t_i: number = new Date().getMilliseconds()            
            result = Fib_rec(number)
            let t_f: number = new Date().getMilliseconds()
            let time : number = t_f - t_i
            console.log("F-Number = ",result,"\nTime = ",time)

            
            console.log("\nFib V2 -  dinamic : ")
            t_i  =  new Date().getMilliseconds()            
            result = PD_FIB(number)
            t_f = new Date().getMilliseconds()
            time = t_f - t_i
            console.log("F-Number v2 = ",result,"\nTime = ",time)
        }
            
        catch (e:any){
            console.log("Please, restart and insert a new number")
            console.log(e)
            //throw new TypeUnchangable(e);
        }
        return result

    }
    else console.log("You must enter a number!")

    
})

function Fib_rec(num : number) : number { //  T(n-1) + T(n-2) + θ(1)
    // => complessità esponenziale ad eccezione dei CB
    if (num == 0 || num == 1) {             
        return num
    }
    else{
        //let res : number =  
        return (Fib_rec(num-1) + Fib_rec(num-2));
    }  
}

function PD_FIB(num:number) : number { // => T(n) = θ(n)
    let arr : Array<number> = []; // => array di n elementi in cui memorizzo l'ennesimo numero di Fibonacci => in teoria mi bastano gli ultimi due elementi
    for(let i = 0; i <= num; i++) { // pieno l'array di elementi neutri (1)         
        arr.push(1) 
    }
    arr[0] = 0 // => F[0] = 0 come CB
    if (num >= 1) arr[1] = 1 // => F[1] = 1 come CB 

    for(let i = 2; i <= num; i++) {
        arr[i] = arr[i-1] + arr[i-2]; // => sistemo arr 
    }

    return arr[num] // => ritoro l'ultimo valore (corrispondente a num di Fib)
}



// 0,1,1,2,3,5,8,13,21, ... 
// 0,1,2,3,4,5,6, 7, ... 