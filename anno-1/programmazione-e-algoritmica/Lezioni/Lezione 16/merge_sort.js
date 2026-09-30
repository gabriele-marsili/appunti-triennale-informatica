/*
Mergesort(A.p,r)

If (p<r) then { q = |(p+r)/2|;
		  Mergesort (A,p,r);
		  Mergesort (A,q+1,r);
		  Mergesort(A,p,q,r);
}



merge:



N1 = q-p+1;
N2 = r-q;
<crea array L [1…n1+1] e R[1…n2+1]>;
For i = 1 to n1 do L[i] = A[p+i-1];
For i = 1 to n2 do R[i] = A[q+i];
L[n1+1] = +inf.;
R[n2+1] = +inf.;
i,j = 1;
For k = p to r do{
	If L[i] <= R[i] then {A[n] = L[c];
		i++;
		}
	Else{
		A[n] = R[j];
		J++
}


*/
var A = [3, 5, 1, 5, 6, 7, 2, -123, 43, 42, 25, 1, 25, -45]
var p = 0;
var r = A.length - 1;


function Merge(A, p, q, r) {
    var n1 = parseInt(q - p + 1);
    var n2 = parseInt(r - q);
    var L = [n1 + 1];
    var R = [n2 + 2];
    // crea array:

    console.log("L = " + L)

    console.log("R = " + R)

    for (i = 0; i <= n1; i++) { L[i] = A[p + i - 1] };
    for (i = 0; i <= n2; i++) { R[i] = A[q + i] };
    console.log("2) => L = " + L + "\nR = " + R);

    L[n1 + 1] = +Infinity
    R[n2 + 1] = +Infinity;
    i = 1, j = 1;
    for (k = p; k <= r; k++) {
        if (L[i] <= R[j]) {
            A[k] = L[i];
            i++;
        } else {
            A[k] = R[j];
            j++
        }
    }
    console.log("A =" + A)

    //return A;
}


function Mergesort(A, p, r) {
    if (p < r) {
        q = Math.abs(parseInt((p + r) / 2));
        Mergesort(A, p, q);
        Mergesort(A, q + 1, r);
        Merge(A, p, q, r);

    }
    return A;
}


console.log("arr A ordinato = " + Mergesort(A, p, r))