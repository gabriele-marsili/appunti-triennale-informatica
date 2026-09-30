/*
Si definisca la classe Bounded2DSpace che implementi uno spazio cartesiano di due dimensioni. 
La classe è caratterizzata da proprietà pubbliche bounded_x e bounded_y, entrambe array di interi nell'intervallo [-inf, 10].

Il costruttore prende in input due array di interi x e y di dimensione uguale, applica il bound sopra menzionato filtrando da 
entrambi gli array tutti gli indici i appartenete ad [0, x.length-1] t.c. x[i] > 10 || y[i] > 10 
e li assegna rispettivamente a bounded_x e bounded_y.


Dopodiché si definisca la classe ReversePyramidSpace, che estende Bounded2DSpace aggiungendo il metodo generatore generate_pyramid() che, 
per ogni indice  i appartenete ad [0, bounded_x.length-1] 
restituisce un array [bounded_x[i], bounded_y[i], f(bounded_x[i],bounded_y[i])], dove 
f(x,y) = -1 + |x+y| + |y-x|
.*/

class Bounded2DSpace{
    constructor(ar_x, ar_y) {
        this.bounded_x = this.filter(ar_x);
        this.bounded_y = this.filter(ar_y);
    }

    filter(arr){
        for(let el of arr){
            if(el > 10){
                arr.splice(arr.indexOf(el), 1);
            }
        }
        return arr;
    }
}

class ReversePyramidSpace extends Bounded2DSpace{
    constructor(...args){ 
        super(...args);
    }

    f(x,y){
        if(isNaN(x) || isNaN(y) || x === undefined || y === undefined) return undefined;
        return -1 + Math.abs(x + y) + Math.abs(y-x);
    }

    * generate_pyramid() {
        for(let i=0; i< this.bounded_x.length; i++){
            let r = this.f(this.bounded_x[i], this.bounded_y[i])
            console.log(r)
            //if(isNaN(r)) r = undefined
            yield [ this.bounded_x[i] , this.bounded_y[i] , r]
        }
    }
}


/*
Esempio:

let x = [1, 2, 11, 4, 5, 6]
let y = [1, 2, 3, 4, 5, 6]

let pyramid = new PyramidSpace(x, y)
// pyramid.bounded_x --> [1, 2, 4, 5, 6]
// pyramid.bounded_y --> [1, 2, 4, 5, 6]


let it = pyramid.generate_pyramid()
let pyramid_point = it.next()
while (!pyramid_point.done) {
  console.log(pyramid_point.value)
  pyramid_point = it.next
}

// Output:
// [1, 1, 1]
// [2, 2, 3]
// [4, 4, 7]
// ...
*/

let x = [1, 2, 3, 4, 5, 6]
let y = [1, 2, 3, 4, 30, 6]

let pyramid = new ReversePyramidSpace(x, y)
let bounded_x = pyramid.bounded_x
let bounded_y = pyramid.bounded_y
let z = [1,3,5,7, 11]
let it = pyramid.generate_pyramid()
let i = 0
let pyramid_point = it.next()

while (!pyramid_point.done) {
     
    console.log(pyramid_point.value)
    console.log([bounded_x[i], bounded_y[i], z[i]])

    console.log(
          pyramid_point.value == 
          [bounded_x[i], bounded_y[i], z[i]]
     )
     pyramid_point = it.next()
     i += 1
}