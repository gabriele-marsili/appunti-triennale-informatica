/*
Un gancio è una sequenza (array) di 3 numeri avente la prima e l'ultima cifra uguali, e la cifra centrale differente. 
Se la cifra centrale dell'array è più piccola rispetto alle altre due, abbiamo un gancio ascendente; altrimenti, un gancio discendente. 
Ad esempio:



[3, 7, 3]: discendente

[1, -1, 1]: ascendente



Si scriva una funzione gancio(a), con a un array di numeri, che restituisca un oggetto avente, nell'ordine, quattro proprietà: 
num, il cui valore è il numero di ganci totali presenti in a; 
asc, il cui valore è il numero di ganci ascendenti presenti in a; 
des, il numero di ganci discendenti presenti in a; 
gan, un array contenente tutte le sequenze che sono ganci, nell'ordine in cui compaiono in a



Esempio:

a: [3, 7, 3, 2, 1, 5, 1, 2, 2, -2, 2]

gancio(a) -> {num: 3, asc: 1, des: 2, gan: [[3, 7, 3], [1, 5, 1], [2, -2, 2]]}
 */

var gancio = (a) => { // a array di numeri 

    
    let quantity = 0;
    let asc_g = 0;
    let desc_g = 0;
    let gan_ar = [];

    for(let i = 0; i < a.length-2; i++) {
        if(a[i] === a[i + 2] && a[i] != a[i+1]){ // ho un gancio con a[i+1] elemento centrale
            quantity += 1 // incremento quantità di ganci trovati 

            if(a[i+1] < a[i]) asc_g += 1 // => ho gancio ascendente 
            else desc_g +=1 // => ho gancio discendente 
            
            gan_ar.push([a[i], a[i+1], a[i+2]]) // aggiungo gancio ad arr 

        }
    }
    

    return {
        num : quantity,
        asc : asc_g,
        des : desc_g,
        gan : gan_ar
    }

}

let a = [3, 7, 3, 2, 1, 5, 1, 2, 2, -2, 2]

console.log(gancio(a)) //-> {num: 3, asc: 1, des: 2, gan: [[3, 7, 3], [1, 5, 1], [2, -2, 2]]}