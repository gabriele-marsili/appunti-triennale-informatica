MSG :
    .string "Il risultato è %d \n"

.text
.global main
.type main, %function

main:
    MOV r2, #0
start:
    CMP r0, r1
    BLO fine
    ADD r2, r2, #1
    SUB r0, r0, r1
    B start
fine:
    MOV r0, r2
    MOV PC, LR
