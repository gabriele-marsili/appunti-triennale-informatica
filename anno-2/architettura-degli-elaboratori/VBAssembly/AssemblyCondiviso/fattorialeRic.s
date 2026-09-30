.text
.global main
.type main, %function

main:
    cmp r0, #0
    bne else 
    mov r0, #1 @=>caso base
    mov pc, lr 



else: 
    push {lr, r0}
    sub r0, r0, #1
    bl main
    pop {r1, lr}
    mul r0, r0, r1 
    mov pc, lr

