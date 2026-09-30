function get_probability(user, estratti) {
    let azzeccati = 0
    for (let i = 0; i < estratti.length; i++) {
        if (user.indexOf(estratti[i]) != -1) azzeccati++
    }

    return azzeccati / 4 * 100
}

function vincitore(estratti) {
    var gabri = ["bruco", "pantera", "chiocciola", "istrice"];
    var checca = ["montone", "pantera", "chiocciola", "torre"];
    var fede = ["bruco", "lupa", "chiocciola", "istrice"];

    let rate_gabri = get_probability(gabri, estratti)
    let rate_checca = get_probability(checca, estratti)
    let rate_fede = get_probability(fede, estratti)

    let winner = "c'è un pareggio"
    let rate_winner = 0
    if (rate_gabri > rate_checca) {
        winner = "gabri"
        rate_winner = rate_gabri
    } else if (rate_checca > rate_gabri) {
        winner = "checca"
        rate_winner = rate_checca
    } else rate_winner = rate_gabri

    if (rate_fede > rate_winner) {
        winner = "fede"
        rate_winner = rate_fede
    }

    let res = {
        "gabri": rate_gabri + " %",
        "checca": rate_checca + " %",
        "fede": rate_fede + " %"
    }

    console.log("Il vincitore è : ", winner, " con una percentuale di 'azzeccati' = a ", rate_winner, " %\n")
    console.log("Risultati:\n ", res)

}

let usciti = ["drago", "lupa", "montone", "bruco"]
vincitore(usciti)