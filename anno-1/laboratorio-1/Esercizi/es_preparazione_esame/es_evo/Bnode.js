/*
Si scriva in JavaScript una classe BNode che implementi un nodo di un albero binario, con le seguenti caratteristiche:

ogni nodo ha un campo valore di nome val, di tipo qualunque, un campo label (una etichetta di tipo stringa), e due figli memorizzati 
in un array children
il costruttore ha come argomenti il valore e l'etichetta, che per default è vuota
ogni nodo ha un metodo add() che prende come argomento un numero qualunque di altri BNode, i cui elementi diventano figli del nodo, in 
ordine da sx a dx. Il tentativo di aggiungere più di due figli deve lanciare una eccezione di tipo BadTreeError (che dovrete definire nel
vostro codice)

ogni nodo ha un generatore visit() che restituisce, in pre-order (ovvero anticipata: visitando prima il genitore, poi i figli nell'ordine 
in cui sono stati aggiunti) tutti i valori dei nodi del sottoalbero radicato nel nodo, uno alla volta
*/

class BadTreeError extends Error{}
class BNode {
    constructor(val,label = "") {
        this.val = val;
        this.label = label;
        this.children = [];
    }

    add(...args){
        if (this.children.length + args.length > 2) {
            throw new BadTreeError("Too many arguments") 
        }
        else{
            for(let node of args){
                this.children.push(node);
            }
        }
    }


    *visit(){
        yield this.val
        for(let node of this.children){
            for(let res of node.visit()){
                yield res
            }
        }

    }
}