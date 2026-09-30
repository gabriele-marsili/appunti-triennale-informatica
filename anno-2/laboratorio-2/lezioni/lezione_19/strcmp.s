@; input:  
@;	r0, r1: array caratteri 0-terminati
@; output: 
@;	r0: valore < > ==0 a seconda che la stringa r0 sia 
@;	lessicograficamente minore maggiore o uguale a r1

.data

.text
.global armcmp
.type armcmp, %function

armcmp:
    cmp r0, #0  @confronto r0 con valore 0 (ovvero NULL)
    moveq r0, #11 @se r0 == 0 (NULL) allora metto valore 11 in r0 
    beq exit         @; r0==NULL (ovvero 0) exit(11)  
    cmp r1, #0     @confronto r1 e 0 (guardo se r1 è NULL)
    moveq r0, #12 @se r1 == 0 (NULL) allora metto valore 12 in r0 
    beq exit         @; r1==NULL exit(12) 
    
    @ loop per confrontare carattere per carattere le due stringhe:  
    mov r2, #0       @; for(i=0 ....) -> r2 sarà indice i, lo "inizializzo" a 0
fori:
    ldrb r3, [r0, r2]   @; r3 = r0[r2] -> Carica il byte dalla memoria puntata da r0 + r2 in r3 (carattere corrente della prima stringa).
    ldrb r12, [r1, r2]  @; r12 = r1[r2] ->  Carica il byte dalla memoria puntata da r1 + r2 in r12 (carattere corrente della seconda stringa).
    cmp r3, r12 @ : Confronta i caratteri correnti delle due stringhe
    subne r0, r3, r12  @Se i caratteri sono diversi, imposta r0 a r3 - r12 e salta alla fine della funzione.
    movne pc, lr       @; return r3-12=r0[r2]-r1[r2] @Restituisce r0 e salta alla fine della funzione
    
    @Se il confronto arriva a questo punto, significa che le stringhe sono uguali finora. Se è stato raggiunto il termine di una delle stringhe:
    cmp r3, #0 @ : Controlla se il carattere corrente della prima stringa è nullo (fine della stringa).
    moveq r0, #0 @ : Se sì, imposta r0 a 0 (le stringhe sono uguali) e salta alla fine della funzione
    moveq pc, lr       @; return 0 ->  Restituisce r0 e salta alla fine della funzione.
    @Infine, incrementa r2 (indice del carattere corrente) e ritorna all'inizio del ciclo (b fori).
    add r2, r2, #1     @; r2++
    b fori

exit:
    bkpt #0            @; chiamata di sistema di interruzione software per terminare il programma

@ L'etichetta exit rappresenta un punto in cui la funzione può terminare prematuramente. La chiamata a bkpt #0 è una chiamata di sistema di interruzione software per terminare il programma, simile a una chiamata exit in C.






