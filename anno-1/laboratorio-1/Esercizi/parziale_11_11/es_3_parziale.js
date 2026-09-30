var persone = [
    { 'nome': 'Leonardo da Vinci', 'annonascita': 1452, 'luogonascita': 'Vinci' },
    { 'nome': 'Pietro del Donzello', 'annonascita': 1452, 'luogonascita': 'Firenze' },
    { 'nome': 'Davide Ghirlandaio', 'annonascita': 1452, 'luogonascita': 'Firenze' },
    { 'nome': 'Leonardo Fibonacci', 'annonascita': 1170, 'luogonascita': 'Pisa' }
]

/*
raggruppa_nascita(persone) => {
  '1170': [
    {
      nome: 'Leonardo Fibonacci',
      annonascita: 1170,
      luogonascita: 'Pisa'
    }
  ],
  '1452': [
    {
      nome: 'Leonardo da Vinci',
      annonascita: 1452,
      luogonascita: 'Vinci'
    },
    {
      nome: 'Pietro del Donzello',
      annonascita: 1452,
      luogonascita: 'Firenze'
    },
    {
      nome: 'Davide Ghirlandaio',
      annonascita: 1452,
      luogonascita: 'Firenze'
    }
  ]
}




*/

// chiavi nome, annonascita, e luogonascita,

//persone è un ARRAY DI OGGETTI

function raggruppa_nascita(persone) {
    let res = {}

    function add_el(insieme, elemento) {
        let arr_di_ogg = []
        for (k in persone) {
            persona = persone[k]
            console.log("persona = ", persona)
            console.log("persona['annonascita'] ", persona["annonascita"], " = ", arr_di_ogg)


            if (elemento == persona["annonascita"]) {
                arr_di_ogg.push(persone[k])
            }
        }
        console.log("arr_di_ogg completo di ", elemento, " = ", arr_di_ogg)

        insieme[elemento] = arr_di_ogg
        return insieme
    }

    // aggiungo in res tutti gli anni di nascita come arr vuoto 
    for (let i = 0; i < persone.length; i++) {
        let ogg = persone[i]
        console.log("anno nascita = ", ogg["annonascita"])
        if (!(ogg["annonascita"] in res)) {
            add_el(res, ogg["annonascita"])
        }
    }
    return res
}

console.log("raggruppa_nascita(persone) = ", raggruppa_nascita(persone))