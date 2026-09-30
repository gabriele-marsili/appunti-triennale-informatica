@32 bit 
@16 registri : r0 - r15
@ #10 = immdiato decimale | #0xA = immediato esadecimale 

@Registri temporanei: (possono esser SOVRASCRITTI in una funzione, NON devono mantenere il valore iniziale)
@r0, r1, r2, r12 
@-> una funzione (subrutine) può sovrascrivere liberamente valori in questi registri 

@Registri preservati: (devono mantenere il valore che hanno prima della chiamata di funzione)
@r4 - r11, r13, r14, r15
@-> se usati in una funzione devono poi riavere i valori che hanno ad inizio chiamata (=> uso dello stack)
@-> se usati in una funzione (subrutine) in tale funzione devo ridarli il valore iniziale prima di restituire il controllo al chiamante

@Registri speciali:
@R13 -> stack pointer (identificato come SP => se uso SP o R13 è lo stesso)
@R14 -> link register (LR)
@R15 -> program counter (PC)

@FLAG: (calcolati dalla ALU che prende due input da 32 bit e da' output a 32 bit)
@N = 1 se risultato è negativo 
@Z = 1 se risultato è zero 
@C = 1 se c'è un carry 
@V = 1 se c'è overflow

@-------------------- ISTRUZIONI : --------------------------------

@Aritmetiche (dst, src1, src2)
ADD r0, r1, r2   @  R[0] <- R[1] + R[2]   (nota che il primo registro contiene il risultato)
ADD r0,r1,#5     @  R[0] <- R[1] + 5
SUB r0, r1, r2   @  R[0] <- R[1] - R[2]   
MOV r0, r1       @  R[0]  <--R[1]   metto (copio) il valore di r1 in r0 (in r1 il valore rimane, non lo tolgo)
MOV r0, #7       @  R[0] <-- 7   -> inserisco in r0 il valore 7

@Logiche  (dst, src1, src2)
AND r0,r1, r2    @ prende il contenuto di r1 (32 bit) , prende quello di r2 (32 bit) e fa l'and bit a bit, scrive res in r0 (se entrambi 1 mette 1, altrimenti mette 0 in r0 nel bit della posizione i esima con i = 0…31 )
ORR r0, r1, r2   @ come l'and, solo che fa l'or logico bit a bit (1 se almeno uno bit i-esimo tra r1 e r2 è 1)
EOR r0, r1, r2   @ or esclusivo 
MVN r0, r1, r2   @ copia in r0 il complemento ad 1 di r1 (bit invertiti, da 0 a 1 e viceversa) (utile per complemento a 2)

@Shift (dst, src1, src2) (shift logico : entrano sempre 0) (shift aritmetico : entrano come più significat. 0 se il bit che rimane è 0 / 1 altrimeti)
LSL r0, r1, #2   @ -> shif logico a sinistra di due posizioni = moltiplicare per 4 
LSR r0, r1, #2   @ -> divido r1 per 4 e scrivo ris in r0, a patto che r1 sia num >0 o senza segno 
ASR r0, r1, #2   @ -> shift aritmetico a sinistra 

@Moltiplicazione (dst, src1, src2) (tra 2 num a 32 bit => carry)
MUL r0, r1, r2   @ ->  r1 x r2 e metto bit meno significativi in r0 (va bene se ho numeri piccoli)
@UMULL dst1, dst2, src1, src2
UMULL r0, r3, r1, r2 @ -> faccio r1 x r2, metto 32 bit meno significativi in r0, i 32 più significativi in r3

@Set flag
CMP r1, r2 @ -> compare r1 con r2
CMP r1, #1 @ -> compare r1 con immediato 

@Di salto (incondizionato) (B = branch | label = nome etichetta )
B Label 
BAL label @uguale a quella sopra 

@Di salto (condizionato) 
BEQ label @ -> salto se con l'ulrima CMP prima ho Z=1 (=> registri uguali / registro = immediato poiché la CMP fa la differenza)
BNE label @ -> salto se NON uguali (not equal)
BCS label @ -> salto se c'è carry setted 
BHS label @ -> salto se unsigned higher or same 
BCC label @ -> salto se non c'è carry (carry clear)
BLO label @ -> salto se r1 < r2 | r1 < #immediato (unsigned lower)
BMI label @ -> salto se minus / negative 
BPL label @ -> salto se plus / >0 
BVS label @ -> salto se ho overflow
BVC label @ -> salto se NON ho overflow
BHI label @ -> salto se unsigned higher 
BLS label @ -> salto se unsigned lower or same
BGE label @ -> salto se signed greater or equal
BLT label @ -> salto se signed less than 
BGT label @ -> salto se signed greater 
BLE label @ -> salto se signed less than or equal

@NOTA BENE: le istruzioni condizionate possono esser utilizzate con qualsiasi tipo di istruzione 
@Esempi istruzioni condizionate:
ADDEQ r1, r1, #1 @ => incremento r1 di 1 solo se con l'ulrima CMP prima ho Z=1 (=> registri uguali / registro = immediato poiché la CMP fa la differenza)
ADDHI r1, r2, #10 @ => r[1] = r[2] + 10 sse ho unsigned higher 

@istruzioni che SETTANO I FLAG: (-> inserisco S alla fine dell'istruzione)
ADDS r0, r1, r2 @-> fa r1 + r2, scrive in r0 e setta i flags N,Z,C,V
SUBS r0, r1, r2 @ -> fa r1 - r2, scrive in 0 e setta i flags N,Z,C,V
LSRS r0, r1, r2 @ -> fa shift, scrive in 0 e setta i flags

@Accesso alla MEMORIA : (store & load) (se non ho offset posso non metterlo)
@store : leggo registro -> scrivo in memoria ( srg, [ind] )
STR r0, [r1] @-> scrivo in indirizzo di memoria contenuto in r1 il valore di r0
STR r0, [r1, offset] @indirizzo in cui scrivo è dato da val di r1 + offset (offset = registro o immediato)
STRB r0, [r1, offset] @scrivo solo 1 byte 
STR r0, [r1], #4 @ = a : SRT r0, [r1] e ADD r1, r1, #4 -> scrive su r1 e poi incrementa r1 di 4 (post-index)
STR r0, [r1, r2]! @= a : ADD r1, r1, r2 e poi STR r0, [r1] -> incrementa r1 di r2 e poi scrive in r1 (pre-index)

@load : leggo memoria -> scrivo su registro 
LDR r0, [r1] @-> leggo il valore che è nella memoria all'indirizzo r1 e lo metto in r0
LDR r0, [r1, offset] @indirizzo da cui leggo è dato da val di r1 + offset (offset = registro o immediato)
LDRB r0, [r1, offset] @leggo solo 1 byte 
LDR r0, [r1], #4 @ = a : LDR r0, [r1] e ADD r1, r1, #4 -> legge da r1 e poi incrementa r1 di 4 (post-index)
LDR r0, [r1, r2]! @= a : ADD r1, r1, r2 e poi LDR r0, [r1] -> incrementa r1 di r2 e poi legge da r1 (pre-index)

@load LITERAL (carica un indirizzo in un registro) (registro ,= LABEL)
LDR r2, =label @ => carica nel registro r2 L'INDIRIZZO (non il valore) dell'etichetta (LDR r1, [r0] per riprendere il valore corrispondente all'indirizzo caricato )

@istruzioni di memoria multiple  (xx opzionali) 
@primo x : F = full oppure E = empty  
@secondo x : D = descending oppure A = ascending 
@1. FA - Full Ascending:
@	• In un stack FA, l'indirizzo del nuovo dato nello stack è maggiore di quello del dato attualmente in cima allo stack. Di solito, il puntatore dello stack è incrementato durante l'aggiunta di dati.
@2. FD - Full Descending:
@	• In un stack FD, l'indirizzo del nuovo dato nello stack è inferiore a quello del dato attualmente in cima allo stack. Di solito, il puntatore dello stack è decrementato durante l'aggiunta di dati.
@3. EA - Empty Ascending:
@	• In un stack EA, il puntatore dello stack è posizionato all'indirizzo successivo al dato in cima allo stack. L'indirizzo dello stack diminuisce durante l'aggiunta di dati.
@4. ED - Empty Descending:
@   • In un stack ED, il puntatore dello stack è posizionato all'indirizzo precedente al dato in cima allo stack. L'indirizzo dello stack aumenta durante l'aggiunta di dati.
LDMFD SP!, {r1,r2,r3} @ = leggi la memoria a partire dallo stack pointer leggi 12 byte (4 byte per 3 reg) e scrivi su r1, r2, r3 = ad una POP {r1,r2,r3}
STMFD SP!, {r1,r4} @ = ad una PUSH {r1,r4}

@Gestione dello stack :
PUSH {r5,r6} @-> scrivo in memoria i valori di r5 ed r6
POP {r5,r6} @-> metto in r5 ed r6 i valori che avevo salvato nella memoria 

@-------------------- COSTRUTTI : --------------------------------

@if-then (se la condizione non è rispettata non eseguo il corpo dell'if e salto alla fine)
CMP <cond>
B! cond FINEIF_label 
    <body>
FINEIF_label : ...

@if-then-else (se la condizione non è rispettata eseguo l'else, altrimenti eseguo il corpo dell'if)
CMP <cond>
B! cond ELSE 
    <body if>
    B ENDIF
ELSE : 
    <body else>

ENDID : ...

@while-loop: (Se la condizione non è rispettata salto alla fine, altrimenti  eseguo il corpo e torno all'inizio del loop)
LOOP:
    CMP <cond>
    B! cond FINE 
    B LOOP 
FINE : ...

@for-loop (anche 0 iterazioni) (Se condizione non è rispettata salto alla fine, altrimenti eseguo il corpo e rifaccio l loop)
LOOP : 
    CMP <cond>
    B! cond FINE
    <for body>
    B LOOP
FINE : ...

@for-loop (almeno 1 iterazione) (Eseguo prima il corpo e poi controllo la condizione, se non è rispettata vado alla fine, altrimenti eseguo nuovamente il loop )
LOOP : 
    <body>
    CMP <cond>
    B cond LOOP
...

@-------------------- DIRETTIVE / CONVENZIONI / ALTRE REGOLE : --------------------------------

@i primi 4 parametri vanno nei registri da 0 a 3, gli altri parametri van nello stack 
@.data -> indica dei dati globali  (=> dichiarazioni variabili globali)
@.string -> indica una stringa 
@.word -> indica 
@.text indica che ciò che segue è testo (eseguibile)
@.global main -> indica il nome di un'etichetta globale
@.type main, %funtion -> indica il tipo dell'etichetta
@.bss -> variabili non inizializzate (per cui posso ad esempio riservare dello spazio)
@.rodata -> Dati di sola lettura
@.align -> Allineamento dei dati (.align 4  @ Allineamento a 4 byte (2^2))