//array 

// usi avanzati

/*
=> dizionari con chiavi numeriche (è possibile inserici qualsiasi cosa: spazi / dati di tipo non omogeneo)
=> possibli array con chiavi non numeriche
=> possibile gestione della lunghezza di array -> a.lenght = a.lenght-1

=> possibili usarli per creare tuple <4,1> --> t = [4,1] t[0] => 4 /  t[1] => 1

q = t; => q = [4,1]



!!! ASSEGNARE SEPARATAMENTE GLI ELEMENTI:
[a,b] = t; => a = 4; b=1



!!! RESTITUIRE PIU' VALORI CON FUNZIONI : 
[a,b] = f(t) ; => valore di ritorno di f viene destrutturato in due variabili a e b



array usabili anche come LISTE 
A = [1,2,3,4]

a.push(10) => 5 --> A = [1,2,3,4,10]  => aggiunge elemento in fondo 
A.pop() => 4 --> A = [1,2,3]  => elimina ultimo elemento 
A.shift() => 1 --> A = [2,3,4] => elimina primo elemento 
A.unshift(10) => 5 --> A = [10,1,2,3,4]

push + pop => lista in / out (ultimo in ingresso è primo ad uscire)
shift + unshift => lista in / out (cresce in testa)

first in first out => push + shift (slide)

•array utilizzabile anche come matrice:

matrice = [
    [1,2,3,4]
    [1,2,3,4]
    [1,2,3,4]
]


*/


// crea matrice 3 x 2 con elementi = 42
/*
matrice = [
    [42,42]
    [42,42]
    [42,42]
]
*/
function initM(r, c, val) {
    let matrice = []
    for (let i = 0; i < r; i++) {
        let a = []
        for (let j = 0; j < c; j++) {
            a.push(val)
        }
        matrice.push(a)
    }
    return matrice
}

console.log(initM(3, 2, 42))




/*

SPRED + ASSEGNAMENTO DESTRUTTURANTE => approccio ricorsivo su array

*/

//REDUCE
var f = (x, y) => x + y;
var A = [1, 2, 3];
var z = 0;

function myReduce(A, f, z) {

    [t, r] = A // mette in t l'elemento sinistro corrente ed in r tutto il resto 

    if (t) { // => controllo che t non sia undefined
        return myReduce(r, f, f(t, z)) // reduce (primo parameto = tutto array - quello che ho tolto)
    } else return z;

}


//console.log(myReduce(A, f, z))

/*
A = [1,2,3]
f(x,y) => x+y
z = 0


myReduce(A,f,z) =>
1. => t = 1    r = [2,3]   entra in if => myReduce([2,3],f,1) dove 1 = f(t,z) dove t=1 e z = 0

2. => t = 2    r = [3]   entra in if => myReduce([3],f,3) dove 3 = f(t,z) dove t=2 e z = 1

3. => t = 3    r = []   entra in if => myReduce([],f,6) dove 6 = f(t,z) dove t=3 e z = 3

4. => return 6 (dove 6 = z)





*/
// REDUCE DESTRA 
function myReduceR(A, f, z) {

    A = [t, ...r]

    if (t) {
        return f(myReduceR(r, f, z))
    } else return z;

}


//ARRAY COME ALBERI:

/*
https://docs.google.com/presentation/d/1KCkoK68nIDpe9bltBBJfintPCKOB2006x_ai08vj3fk/edit#slide=id.g1fb303b21d6372cd_17 
*/


//ARRAY destrutturati :
/*
A = [4,7,1]

[a,b] = A => a = 4, b = 7 (1 non assegnato perché non uso spread)

[a,b,c=3,d=default] = A =>  a = 4, b = 7, c= 1, default = 8

[,,c] = A => c = 1 (skip)

[a,...r] =A  => a =4, r = [7,1] (spread)

[y,x] = [x,y] => scambia i valori x,y (senza variabili intermedie)


CON OGGETTII:

O = {n:"pippo" ,a:35, c:true}

{a,c} = O => a = 35, c = true
{a,b} = O => a = 35, b = undefined
{a,b=2} = O => a = 35, b = 2 (default)

{a,...r} = O => a = 35, r =  {n:"pippo", c:true}

{a:età,n:nome} = O => eta = 35, nome = "Pippo"
{a:età,b:bimbi = 0} = O => eta = 35, bimbi = 0
{x,y} anche con funzioni (slide)

graffe=> ! ambiguità con blocco => uso di tonde attorno a graffe per destrutturazione ({a:età,n:nome}) = O


funzione che prende due parameri x,y ed un terzo parametro che dipende e posso scelierlo => posso avere funzioni con parametri di default
function disegna(x,y,{raggio =0, colore = "nero",bordo=1,etichetta=""})
{
    => codice di disegno; usa x,y, raggio, colore, bordo, etichetta 
}



spread e funzioni:

f(...A)=> chiama funzione f dandole come parametri la lista dei valori in A 

p = {...q,c:3} => metto in p l'oggetto q destrutturato e, se c è definito tra le chiavi di q ne cambio il valore con 3, altrimenti lo aggiungo

p = {c:3,...q} => p è una copia di q con aggiunto c=3 se manca in q, altrimenti il val di c in q 

...altro sulle slide ! 

*/