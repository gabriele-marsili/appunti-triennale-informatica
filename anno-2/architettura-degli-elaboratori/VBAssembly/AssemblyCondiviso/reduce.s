.data 
ARRAY: .word 0,1,2,3,4,5,6,7,8,9 @creo array di 10 elementi (da 0 a 9)
MSG : .string "Il risultato è %d\n"

.text
.global main
.type main, %function

main: 
    LDR r0, =ARRAY @ carico in r0 l'indirizzo dell'etichetta array, che è dove l'assemblatore ha inserito le parole del vettore ->in r0 avrò l'indirizzo della parola 0
    MOV r1, #10 @r1 = size 
    MOV r2, #0 @r2 = ris 
    MOV r3, #0 @r3 = indice

LOOP : 
    CMP r3, r1
    BEQ FINE
    LDR r12, [r0, r3, LSL #2]
    ADD r2, r2, r12 
    ADD r3, r3, #1 @i++
    B LOOP

FINE:    
    LDR r0, =MSG
    PUSH {LR}
    MOV r1, r2 
    BL printf
    MOV r0, r1
    POP {LR}
    MOV PC, LR 
