.text
.global fact 
.type fact, %function

fact: 
    MOV r1, r0       // Inizializza r1 con il valore di input
    MOV r0, #1       // Inizializza r0 con 1

START: 
    CMP r1, #0       // Confronta r1 con 0
    BEQ FINE         // Se r1 è uguale a 0, salta a FINE
    MUL r0, r0, r1   // Moltiplica r0 per r1 e salva il risultato in r0
    SUB r1, r1, #1    // Sottrai 1 da r1
    B START           // Salta a START

FINE: 
    MOV pc, lr       // Ritorna dall'indirizzo nel registro Link (lr)
