.data
    x: .word 1, 2, 3, 4, 5, 6, 7, 8
    y: .word 8, 7, 6, 5, 4, 3, 2, 1
    n: .word 8
MSG:
    .string "Il risultato è %d \n"

.text
.global main
.type main, %function

main:
    LDR r0, =x
    LDR r1, =y
    LDR r2, =n
    LDR r2, [r2]
    PUSH {LR}
    BL IP
    MOV r1, r0
    LDR r0, =MSG
    BL printf
    MOV r0, #0
    POP {LR}
    MOV PC, LR

IP:
    PUSH {r4, r5}
    MOV r3, #0

LOOP:
    CMP r2, #0
    BEQ FINE
    LDR r4, [r0], #4
    LDR r5, [r1], #4
    MUL r4, r4, r5
    ADD r3, r3, r4
    SUB r2, r2, #1
    B LOOP

FINE:
    POP {r4, r5}
    MOV r0, r3
    MOV PC, LR


