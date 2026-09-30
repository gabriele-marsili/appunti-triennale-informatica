function map_senior(db) {

    console.log("\nstart f map _ senior \n\n");
    //console.log("\ndb iniziale = " + db);




    for (let i = 0; i < db.length; i++) {
        var esito_controllo_maggiorenne = false
            //console.log("\ndb[" + i + "] 1  :\n " + db[i].nome + "\n" + db[i].eta);

        if (db[i].eta >= 18) {
            esito_controllo_maggiorenne = true
        }
        db[i].maggiorenne = esito_controllo_maggiorenne;
        //console.log("\ndb[" + i + "] 2  :\n " + db[i].nome + "\n" + db[i].eta + "\n" + db[i].maggiorenne + "\n\n--------");




    };





    return db;

};