class PercorsiMultipli extends Error{}
function maxPathSum(T){
    if(T === undefined) return [];
    if(T.left === undefined && T.right === undefined) return [T.val]
           
    let res = [T.val] // mancava questo 
    let left_Path_sum = 0
    let left_Path = [];
    let right_Path_sum = 0
    let right_Path = [];


    if(T.right){
        if(maxPathSum(T.right) != []){
            //console.log(" maxPathSum(T.right) = ", maxPathSum(T.right))
            right_Path_sum += maxPathSum(T.right)[0] 
            //console.log("right_Path_sum = ",right_Path_sum)

            right_Path.push(...maxPathSum(T.right)) // mancava l'operatore ... 
            //console.log("right_Path = ",right_Path)
        }
    }
    if(T.left){
        if(maxPathSum(T.left) != []){
            left_Path_sum += maxPathSum(T.left)[0]
            left_Path.push(...maxPathSum(T.left)) // mancava l'operatore ... (spread)
        }
        
    }

    if(right_Path_sum === left_Path_sum){
        throw new PercorsiMultipli("PercorsiMultipli")
    }
    else{
        if(right_Path_sum > left_Path_sum){
            return res.concat(right_Path) // mancava il concat con res 
        }
        else{
            return res.concat(left_Path) // mancava il concat con res 
        }
    }

}


var tree = {
    val: 8,
    left: {
      val: 3,
      left: { val: 1 },
      right: { val: 6, 
             left: { val: 4 },
             right: { val: 7 }}
    },
    right: {
      val: 10,
      right: {
        val: 14,
        left: { val: 13}
      }
    }
};
var target = [8, 10, 14, 13]
var result = maxPathSum(tree)
console.log(result)

var tree2 = {
    val : 3,
    left : {val : 20},
    right : {val : 20}
}
console.log(maxPathSum(tree2))