function tagliaAlberi(T){
    if(T.val <0){
        delete T.val;
        delete T.sx;
        delete T.dx; // {}
    }

    if(T.sx){
        if(T.sx.val <0){
            delete T.sx
        }
        else{
            tagliaAlberi(T.sx)
        }
    }

    if(T.dx){
        if(T.dx.val <0){
            delete T.dx
        }
        else{
            tagliaAlberi(T.dx)
        }
    }
}


var t = {
    val:20,
    sx:{
        val:19,
        sx:{val:8},
        dx:{
            val:7,
            sx:{val:9}
        }
    },
    dx:{
        val:-3,
        sx:{val:-8},
        dx:{val:7}
    }
}

console.log(tagliaAlberi(t))