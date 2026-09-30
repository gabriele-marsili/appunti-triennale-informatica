.text
.global sum_numbers
.type sum_numbers, %function

sum_numbers:
    ADD r2, r0, r1
    MOV r0, r2
    MOV pc, lr
