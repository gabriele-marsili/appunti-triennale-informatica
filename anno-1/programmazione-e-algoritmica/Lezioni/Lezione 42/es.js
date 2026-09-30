function Make_ABR(arr) {
    var myABR = []; // => ABR = array con radice in prima pos. Figlio dx di A[i] in A[2*i] e figlio sinistro in A[2*i+1]

    if (arr.length == 0) return myABR;
    if (arr.length == 1) return (myABR.push(arr[0])) // => inserisco in cima e ritorno l'ABR


    else {
        let m = Math.round((arr.length - 1) / 2)
        console.log(m)
        myABR.push(arr[m]) // => mediano diviene radice 


        let prima_metà = arr.slice(0, m)
        let seconda_metà = arr.slice(m + 1, arr.length)
        console.log(prima_metà)
        console.log(seconda_metà)

        let a1 = Make_ABR(prima_metà)
        let a2 = Make_ABR(seconda_metà)

        console.log(a1)
        console.log(a2)


        myABR.concat(a1)
        myABR.concat(a2)

        return myABR;
    }


}


var array = [2, 3, 4, 5, 6, 7, 8]
console.log(Make_ABR(array));