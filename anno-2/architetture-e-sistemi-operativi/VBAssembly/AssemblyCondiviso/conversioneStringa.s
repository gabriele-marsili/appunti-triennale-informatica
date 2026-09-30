.text
.global main
.type main, %function

main:
    LDRB r1, [r0]
    CMP r1, #0
    BEQ fine

    CMP r1, #'a'
    BLT next
    CMP r1, #'z'
    BGT next

    SUB r1, r1, #32  @ Converte in maiuscolo
    STRB r1, [r0]

next:
    ADD r0, r0, #1
    B main

fine:
    MOV PC, LR
