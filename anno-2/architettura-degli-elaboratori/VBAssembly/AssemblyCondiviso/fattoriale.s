.text
.global main
.type main, %function

main:
    MOV r1, r0
    MOV r0, #1
    B LOOP
    
LOOP:
    CMP r1, #0
    BEQ FINE  
    MUL r0, r0, r1
    SUB r1, r1, #1
    B LOOP

FINE:
    MOV pc, lr


