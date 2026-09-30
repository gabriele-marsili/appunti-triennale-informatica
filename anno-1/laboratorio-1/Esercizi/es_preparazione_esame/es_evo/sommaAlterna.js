function sommAlterna(a){
    if(a.length<2) return 0
    let sum = 0;
    let i = 0;
    while(i<a.length-1){
        //console.log(i)
        sum += a[i]-a[i+1];
        i+=2;
    }
    return sum;
}

console.log(sommAlterna([1,2,3,4])) // -2

console.log(sommAlterna([1, -1, 1, -1])) // 4

console.log(sommAlterna([])) // 0