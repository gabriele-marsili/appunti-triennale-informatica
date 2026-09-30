/**
 * Si scriva una classe PuntoCartesiano che rappresenti un punto geometrico in coordinate
cartesiane (x, y). Oltre a un costruttore, serviranno i metodi seguenti:
• p.dist(q) restituisce la distanza euclidea fra i punti p e q
• p.translate(q) sposta il punto p, traslandolo di q
• p.zero()- sposta il punto p alle coordinate (0,0)

 */


class PuntoCartesiano {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dist(q) {
        return Math.sqrt(Math.pow(Math.abs(this.x - q.x), 2) + Math.pow(Math.abs(this.y - q.y), 2))
    }

    translate(q) {
        this.x += q.x
        this.y += q.y
    }

    zero() {
        this.x = 0;
        this.y = 0;
    }

    print() {
        console.log(this.x, this.y)
    }

}