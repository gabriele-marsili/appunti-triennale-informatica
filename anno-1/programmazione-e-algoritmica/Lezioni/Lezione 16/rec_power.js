/*

Input: Un numero a, un intero n > 0
Output: a^n

If(n=1) then return a

Else{
	
	X = rec-power( a, [n/2] );
	
	If (n%2 == 0) then return x*x;
	
	Else return a*x*x;
	
}

*/

var a = 5
var n = 3

function rec_power(a, n) {
    if (n == 1) return a;
    else {
        var x = rec_power(a, parseInt(n / 2));
        if (n % 2 == 0) return x * x;
        else return x * x * a;
    }
}

console.log(a + "^" + n + "=" + rec_power(a, n))