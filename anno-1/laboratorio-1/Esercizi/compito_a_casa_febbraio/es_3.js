/*Dato un albero k-ario T, 
definire una funzione ricorsiva taglia_nodi_interni che, 
preso in input un intero positivo m, 
modifica T in-place, 
rimuovendo tutti i nodi interni 
(e i rispettivi sottalberi) che hanno meno di m figli.



Notazione

Si codifichi l'albero k-ario T come visto a lezione, perciò un albero è 
rappresentato da un oggetto così formato 
{val: , figli:[...]}

Si noti inoltre che l'albero vuoto è codificato con il valore null.

*/

var taglia_nodi_interni = (t, m) => {

    function delete_sottoalbero(tree, valore, genitore) {

        if (tree.figli.length < valore) { //&& (tree.figli.figli != [])
            tree.figli = [] // eliminazione dei figli 
            let index = Infinity
            for (let y = 0; y < genitore.figli.length; y++) {
                if (genitore.figli[y].val == tree.val) {
                    index = y
                    console.log("index = ", index)
                }
            }

            genitore.figli.splice(index, 1)

        } else {
            for (let j = 0; j < tree.figli.length; j++) {
                //console.log(tree.figli[j].figli)
                console.log("tree.figli[j].figli.length = ", tree.figli[j].figli.length)
                console.log("tree.figli[j].val " + tree.figli[j].val)

                if (tree.figli[j].figli.length > 0) {
                    console.log("procedo al delete su " + tree.figli[j].val)

                    delete_sottoalbero(tree.figli[j], valore, tree)
                }


            }
        }

        return tree
    }
    if (typeof(t) == "object" && t !== null) {
        var figli_check = "figli" in t; // => true / false 
        var valore_check = "val" in t;



        if (!figli_check || !valore_check || t.val == null) {
            return t
        } else return delete_sottoalbero(t, m, t)
    } else return t


}


//albero.figli[i].figli = null



var T0 = {
    val: 0,
    figli: [{
            val: 1,
            figli: [{
                    val: 5,
                    figli: [
                        { val: 17, figli: [] },
                        { val: 18, figli: [] }
                    ]
                },
                { val: 6, figli: [] },
                { val: 7, figli: [] }
            ]
        },
        {
            val: 2,
            figli: [{
                val: 8,
                figli: [
                    { val: 20, figli: [] },
                    { val: 21, figli: [] },
                    { val: 22, figli: [] }
                ]
            }]
        },
        {
            val: 3,
            figli: [
                { val: 11, figli: [] },
                { val: 12, figli: [] },
                { val: 13, figli: [] }
            ]
        }
    ]
};

console.log(taglia_nodi_interni(T0, 4))

/*
assert.deepEqual(T0, {val: 0, figli:[]});
*/


/*


AssertionError[ERR_ASSERTION]: Expected values to be loosely deep - equal: expected value 
{ "val": 0, "figli": 
    [{ "val": 1, "figli": 
        [{ "val": 6, "figli": [] }, 
        { "val": 7, "figli": [] }] 
    }, 
    { "val": 3, "figli": 
        [{ "val": 11, "figli": [] }, 
        { "val": 12, "figli": [] }, 
        { "val": 13, "figli": [] }
        ] 
    }
    ] 
}, 
            
but got 
{ "val": 0, "figli": 
    [{ "val": 1, "figli": 
        [{ "val": 5, "figli": 
            [{ "val": 17, "figli": [] }, 
            { "val": 18, "figli": [] }
            ] 
        },
        { "val": 6, "figli": [] }, 
        { "val": 7, "figli": [] }
        ] 
    },
    { "val": 2, "figli":    
        [{ "val": 8, "figli": 
            [{ "val": 20, "figli": [] }, 
            { "val": 21, "figli": [] }, 
            { "val": 22, "figli": [] }
            ]
        }] 
    }, 
    { "val": 3, "figli": 
        [{ "val": 11, "figli": [] }, 
        { "val": 12, "figli": [] }, 
        { "val": 13, "figli": [] }
        ] 
    }] 
}

*/


//expected value 
ob = {
        "val": 0,
        "figli": [{
                "val": 1,
                "figli": [{ "val": 6, "figli": [] },
                    { "val": 7, "figli": [] }
                ]
            },
            {
                "val": 3,
                "figli": [{ "val": 11, "figli": [] },
                    { "val": 12, "figli": [] },
                    { "val": 13, "figli": [] }
                ]
            }
        ]
    }
    //but got 
ob_2 = {
    "val": 0,
    "figli": [{
            "val": 1,
            "figli": [{
                    "val": 5,
                    "figli": [{ "val": 17, "figli": [] },
                        { "val": 18, "figli": [] }
                    ]
                },
                { "val": 6, "figli": [] },
                { "val": 7, "figli": [] }
            ]
        },
        {
            "val": 2,
            "figli": [{
                "val": 8,
                "figli": [{ "val": 20, "figli": [] },
                    { "val": 21, "figli": [] },
                    { "val": 22, "figli": [] }
                ]
            }]
        },
        {
            "val": 3,
            "figli": [{ "val": 11, "figli": [] },
                { "val": 12, "figli": [] },
                { "val": 13, "figli": [] }
            ]
        }
    ]
}