
function maxSumSubArray(arr,k){
    let res = []
    let max_sum = 0

    if(arr.length === k){
        return [arr]
    }


    for(let i = 0; i < arr.length-(k-1); i++){
        let current_arr = []
        let current_sum = 0 
        let m = i       
        for(let j = 0; j < k; j++){
            current_arr.push(arr[m])
            current_sum += arr[m]
            m++
        }
        if( current_sum>=max_sum){
            max_sum = current_sum
        }
        res.push(current_arr)
    }
    

    for(let i = 0; i<res.length;i++){
        let el = res[i]
        let sum = 0;
        console.log("el= ",el)

        for(let element of el){
            sum += element
        }
        console.log("sum= ",sum)
        console.log("max_sum= ",max_sum)
        if(sum < max_sum){
            res.splice(i, 1)
            i--
        }
    }
    if(res.length === 1){
        return res[0]
    }
    else{
        return res
    }
}

let arr = [3, 4, 5, 3, 1, 2, 9];
for(let el of maxSumSubArray(arr,3)){
    console.log(el)
}
// l = 7
// volte = 5
// k = 3
// finché i+(k-1) c'è