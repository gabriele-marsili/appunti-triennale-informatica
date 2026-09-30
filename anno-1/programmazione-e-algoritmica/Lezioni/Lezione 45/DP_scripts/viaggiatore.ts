/*ESERCIZIO 4
Un viaggiatore ha una valigia di capacità C e un insieme di n souvenir il cui volume è
memorizzato in un array V [1,n].

Qual è il minimo numero di souvenir che riempiono la valigia esattamente?

Ad esempio, 
sia V=[2,2,4,3,1] e C=7, la risposta deve essere "2", in quanto esiste la
combinazione 4+3 formata da due souvenir di capacità totale C, che è migliore (nel
senso di numero di souvenir usati) della combinazione 1+2+4 e della combinazione 3+2+2 formate 
da tre souvenir.

Progettare un algoritmo basato su Programmazione Dinamica che risolve il problema
suddetto, avendo ricevuto in input V [1,n] e C.

*/

function fai_valigia(V:number[], C:number) : number{
    if(V.indexOf(C)!= -1) return 1 // => mi basta un elemento 


    let matrix : number[][][] = []
    let visitati : number[] = []

    function somma_arr(A:number[]):number{
        let s : number = 0;
        for(let i = 0; i < A.length;i++){
            s = s + A[i]
        }
        console.log("somma arr = ",s)
        return s;
    }

    function trova_somma(indice_colonna:number,indice_limite_j:number,visit:number[]):number[]{
        let res : number[] = []
        let a_re_def:number[] = []
       
        for(let i=0;i<indice_limite_j;i++){
            console.log("indice_colonna = ",indice_colonna)
            console.log("i = ",i)
            console.log(matrix[indice_colonna-1][i])

            let val : number = somma_arr(matrix[indice_colonna-1][i])
            console.log("val = ",val)
            
            for(let j = i+1; j<indice_limite_j;j++){
                if(val+somma_arr(matrix[indice_colonna-1][j]) == indice_limite_j){
                    let a_res:number[] = []
                    a_res = a_res.concat(matrix[indice_colonna-1][i],matrix[indice_colonna-1][j])
                    
                    if(!controllo_quantità(a_res,visit)) a_res = []
                    
                    if( a_re_def.length == 0 || a_res.length < a_re_def.length){
                        a_re_def = []
                        a_res.forEach(element => {
                            a_re_def.push(element)
                        });
                    } 
                }
            }
        }
        if(a_re_def.length > 0) {
            console.log("a_re_def = " + a_re_def)
            return a_re_def
        }    
        else{
            for(let i=0;i<indice_limite_j;i++){
                res = res.concat(matrix[indice_colonna-1][i])
            
                if(!controllo_quantità(res,visit)) res = []
                
            }
    
            return res
        }
        
        
    }

    function controllo_quantità(arr:number[],arr_magazzino):boolean{
        for(let m = 0;m<arr.length;m++){
            let element : number = arr[m]
            let q_disponibile = arr_magazzino.filter(value => value == element).length
            let q_richiesta = arr.filter(value => value == element).length
            if(q_richiesta > q_disponibile){
                return false
             
            }

        }
        return true
    }

    for (let i = 1; i <= V.length; i++){ // => righe 
        matrix.push([])
        console.log("i = ",i)
        console.log("matrix = ",matrix)
        visitati.push(V[i-1])
        
        for(let j = 1; j <= C; j++){ // => colonne
            console.log("j = ",j)
            console.log(`V['${i-1}'] = `,V[i-1])
            if(i>1)  matrix[i-1].push(matrix[i-2][j-1])
          
            if(V[i-1] == j) matrix[i-1][j-1] = [j]
            else{ // => ho bisogno di (almeno 2) elementi la cui somma = j
                console.log("cerco almeno 2 elementi")
                console.log("matrice -->  ",matrix)
              
                
                let res : number[] = []
                let sum : number = 0;
                //let k: number = 1
                //let key: boolean = true
                if(i>1) res = trova_somma(i,j,visitati)
                console.log("res = ",res)

                sum = somma_arr(res)
                /*
                while(sum != j && k<j){                                                             
                    console.log("matrix[i-1][k-1] -->  ",matrix[i-1][k-1])
                  
                    sum = sum + somma_arr(matrix[i-1][k-1])
                    console.log("sum -->  ",sum)
                  
                    let currentArr = matrix[i-1][k-1]
                    console.log("currentArr -->  ",currentArr)
                  
                    res = res.concat(currentArr)
                    console.log("res -->  ",res)

                    key = controllo_quantità(res,visitati)
                                      
                    k = k+1 
                    console.log("k -->  ",k)
                }
                */

                console.log("sum = ",sum)
              
                if(sum == j && (matrix[i-1][j-1].length == 0 || res.length<= matrix[i-1][j-1].length)) matrix[i-1][j-1] = res
                else {
                    let val : number = j-sum
                    let element : number = V[i-1]
                    let array = visitati.filter(value => value == element);
                    console.log("array = ", array)

                    if(val == V[i-1] && val == sum && visitati.includes(val) && j/element <= array.length){
                        matrix[i-1][j-1] = [sum,V[i-1]]
                    }
                    else if (i == 1) matrix[i-1][j-1] = []
                }
                console.log(`matrix['${i-1}']['${j-1}'] = `,matrix[i-1][j-1])                
            }
        }
        
    }

    console.log(matrix[V.length-1][C-1])
    return matrix[V.length-1][C-1].length
}


var Varr : number[] = [2,2,4,3,1]
var C_n : number = 7

console.log(fai_valigia(Varr,C_n))