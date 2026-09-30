/*
Si scriva una funzione mulidx(a) che, dato un array a con elementi qualunque, restituisca un nuovo array b, 
contenente (nello stesso ordine) soltanto gli elementi numerici di a che sono un multiplo del proprio indice, 
e gli elementi stringa di a la cui lunghezza è un multiplo del proprio indice. */
 


function mulidx(a) {
    let b = [];
    for (let el of a){
        if(typeof el === "string"){
            console.log(el.length);
            console.log(el.length % a.indexOf(el));
            if(el.length % a.indexOf(el) === 0 || !String(el/a.indexOf(el)).includes(".") ) b.push(el);
        }   

        if(typeof el === "number"){
            if(el % a.indexOf(el) === 0) b.push(el);
        }
    }
    return b;
}


console.log(mulidx(["",4,[true],"Grande Giove",7,10])) // ,['', 4, 'Grande Giove', 10] 

