function check_array(arr){
    //let c = []
    //let m = Math.ceil(arr.length/2)
    if(arr.length < 4) return true

    let c0 = arr[0]*arr[arr.length-1]
    let c1 = arr[1]*arr[arr.length-2]
    if(c1 % c0 != 0)return false
    else{
        arr.pop()
        arr.shift()
        return(check_array(arr))
    }


    /*
    for(let i = 0; i <= ; i++){
        c.push(arr[i]* arr[arr.length-1-i])
        if(c.length>1){ // => i = almeno 1
            if(c[i] % c[i-1] != 0) return false
        }
    }
    return 
    */
}


console.log(check_array([1,4,4,1,3,32,8,2,2]), true);