const { ifError } = require("assert")
const { maxHeaderSize } = require("http")

/*

Inpt: array A [1…n]
Output: valore massimo in A


*/
const A = [1, 5.2, 4.7, 5, 3, 6, -81267, 25, 42]
var p = 0;
var r = A.length - 1

function rec_max(A, p, r) {
    console.log("A = " + A + " p =" + p + " r =" + r)
    if (r - p <= 1) return max(A[p], A[r]);
    else {
        var MaxL = rec_max(A, p, (parseInt((p + r) / 2)));
        var MaxR = rec_max(A, parseInt((p + r) / 2 + 1), r);
        console.log("max L = " + MaxL + "max R = " + MaxR)
        return max(MaxL, MaxR);
    }
}

function max(a, b) {
    if (a > b) return a;
    else return b;
}


console.log("max in A = " + rec_max(A, p, r))

/*

{If r-p <= 1 then{
	Return max {A[p],A[r]}
	};
Else{
	MaxL = Rec-Max(A,p, (p+r)/2);
	MarR = Rec-Max(A, (p+r)/2 +1 ,r );
	Return max {MaxL,MaxL}
	}
}

*/