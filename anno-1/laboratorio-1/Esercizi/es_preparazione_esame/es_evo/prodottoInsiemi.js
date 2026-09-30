function prodotto (a,b )  {
    let res = {}
    for(let a_el in a){
        for(let b_el in b){
            let p = ""
            if(a_el != undefined && b_el != undefined){
                p = a_el.concat(b_el)
            }
            else p = "{}"
            if(!(p in res))res[p] = true
        }
    }
    return res;
}