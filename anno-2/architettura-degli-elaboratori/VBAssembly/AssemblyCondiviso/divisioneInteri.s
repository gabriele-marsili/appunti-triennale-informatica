.data
    x: .word 0
    y: .word 0
MSG:
    .string "Il risultato è %ld \n"
DIVISION_BY_ZERO_MSG:
    .string "Errore: Divisione per zero\n"
FORMAT_INT:
    .string "%d"

.text
.global main
.type main, %function

main:
    PUSH {LR}
    LDR r0, =x
    BL get_input  @ Ottieni l'input per x
    LDR r0, =y
    BL get_input  @ Ottieni l'input per y

    LDR r0, =x
    LDR r0, [r0]  @ Carica il valore di x in r0
    LDR r1, =y
    LDR r1, [r1]  @ Carica il valore di y in r1

    CMP r1, #0
    BEQ DIVISION_BY_ZERO_ERROR  @ Gestisci la divisione per zero

    BL IP
    LDR r0, =MSG
    BL printf
    MOV r0, r3  @ Muovi il risultato della divisione in r0
    BL printf
    MOV r0, #0
    POP {LR}
    MOV PC, LR

DIVISION_BY_ZERO_ERROR:
    LDR r0, =DIVISION_BY_ZERO_MSG
    BL printf
    MOV r0, #1  @ Esci con codice di errore 1
    MOV PC, LR

get_input:
    LDR r1, =FORMAT_INT
    LDR r0, [r0]  @ Carica l'indirizzo della variabile in r0
    BL scanf
    MOV PC, LR

IP:
    MOV r3, #0 @=> ris 
    MOV r4, r0 
LOOP:
    CMP r4, #0
    BEQ FINE 
    ADD r3, r3, #1
    SUB r4, r4, r1
    B LOOP
    
FINE:
    MOV r3, r3
    MOV PC, LR @torno a chiamata BL IP 
