/* https://drive.google.com/file/d/1prky_eMGU2Y2kDYa36hAC8dFib88SJ58/view
classi di sistema e moduli utili:

oggetti prefefiniti (esempi): undefined, NaN, Number, Math ... 

WRAPPER:
per ogni tipo base esiste una classe wrapper con lo stesso nome del tipo (ma con lettera maiiuscola)
=> Number("1.33") === 1.33 => True 
=> String(14) === 14 => False
=> String(14) === "14" => True ...

Number(3.14).toFixed(4) --> 3.1400


DATE:

Date() -> diversi formati (=> ritorna data ed ora correnti fino a millisec)
è possibile utilizzare i simboli di confronto tra date (<,>, = ...)
--> nei formati numerici 0 = Gennaio :
new Date(2023, 3, 19, 14, 25) => 19 Aprile alle 14:25

•(alcuni) Metodi date:

tolSOString() -> converte in stringa 
...


ESPRESSIONI REGOLARI:
= schemi di corrispondenza su stringhe (prendo una str. e controllo se soddifa o meno un'espressione regolare)
*/

let e = new RegExp("[a-z]+"); // oppure e = /[a-z]+/
// => e deve esser una stringa che deve contenere almeno 1 carattere dalla a alla z 
e.test("pippo"); // => True 
e.test("4nd34"); // => True
e.test("123"); // => False
e.exec("4nd34") // => ['ndr', index: 1, input:"4nd34", groups: undefined]
"4nd34".match(e) // => ['ndr', index: 1, input:"4nd34", groups: undefined]


/*
ARRAY CON TIPI MACCHINA:

•Int8Array, Int16Array, Int32Array, Int64Array, Uint8Array, Uint16Array, Uint32Array
•BigInt64Array, BigUnit64Array
•Float32Array, Float64Array


COLLECTION : SET
classe Set -> implementa insiemi di valori qualunque 
-> le chiavi possono essere qualunque valori validi in JS (-> posso creare insiemi di funzioni / insiemi di oggetti)
*/
let S = new Set() // let S = new Set(a)
S.add(e) // aggiunge e ad S
S.delete(e) // elimina e ad S
//...

/*
MAP:
implementa una mappa che associa chiavi 
(non solo stringhe) a valori (di tutti i tipi)
*/
let M = new Map() // o let M = new Map(a)
let v = 0
let k = "boh"
M.set(k,v) // aggiungr k a v ...

/*Map Operationslet :
nameAgeMapping = new Map<string, number>();
//1. Add entries
nameAgeMapping.set("Lokesh", 37);
nameAgeMapping.set("Raj", 35);
nameAgeMapping.set("John", 40);
//2. Get entries
let age = nameAgeMapping.get("John");		// age = 40
//3. Check entry by Key
nameAgeMapping.has("Lokesh");		        // true
nameAgeMapping.has("Brian");		        // false
//4. Size of the Map
let count = nameAgeMapping.size; 	        // count = 3
//5. Delete an entry
let isDeleted = nameAgeMapping.delete("Lokesh");	        // isDeleted = true
//6. Clear whole Map
nameAgeMapping.clear();				//Clear all entries */


// JSON:
/*
= formato di serializzazione per obj -> trasforma obj in stringa e viceversa

string = JSON.stringify(obj) // => da ogg a str
obj = JSON.parse(string) // => da str a ogg


OGGETTI DELL'AMBIENTE: host

ogni ambiente di esecuzione (host) di JS può fornire ulteriori nomi predefiniti nello scope globale (con funzioni adatte allo specifico ambiente)
ES: document / window in Browser

•Node js (ambiente di esecuzione) -> codice js eseguito da macchina virtuale che interpreta il linguaggio 
-> esistono diverse implementazioni 

MODULO FS (FILE SYSTEM):
leggere e scrivere contenuti di un file
leggere i contenuti di una directory
creare / cancellare / copiare / troncare / rinominare file e directory
ottenere ed impostare metadati su file e directory

es:
*/
const fs = require('fs'); // modulo di file system -> modulo di sistema
let path = "/Users/gabrielemarsili/Desktop/PISA/Corsi/Laboratorio I /Lezioni/TypeScript/lezione_28_03.ts"
let dati = fs.readFileSync(path) // => mettono l'intero contenuto in una sola stringa e non da' il controllo al programma finché non ha letto l'intero contenuto del file
// => se il file è molto lungo la lettura del file richiede troppo tempo per esser svolta in modo sincrono
let async_dati = fs.readFile(path) // => mettono l'intero contenuto in una sola stringa e non da' il controllo al programma finché non ha letto l'intero contenuto del file
// => divide il file in "pezzi" (chunk) e li legge uno alla volta (non è possibile avere il l'ordine di lettura del file)

/*
MODULO OS 

=> modulo di sistema operativo (contiene info su macchina che esegue il codice)
-> consente di avere info sulla macchina in cui viene eseguito il file
*/
const os = require('os');
let ogg_sistema = os.cpus()
let architettura = os.arch();
let sistema_operativo = os.platform();


/*
MODULO PROCESS
-> informazioni sui processi che avvengono sulla macchina 

MODULO URL E HTTP:

-> parse url e utilizzo modulo http
-> può restituire contenuti di un file 
-> può calcolare risposta e restituirla 

*/

const http = require('http');
var server = http.createServer(function (req,res){
    console.log(req)
    res.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8'});

    if (req.url.match(/dante/i)){
        res.end(fs.readFileSync('dante.txt','utf-8'))        
    }
    else{
        res.end("Circolare",'utf-8');
    }

})

server.listen(1338);

// client: 

let req_2 = http.get("http://www.unipi.it", 'utf-8', res => {
    var pag = ''
    res.on('data', chunk => {pag += chunk})
    res.on('end', () => {console.log(pag)})
})
req_2.end()