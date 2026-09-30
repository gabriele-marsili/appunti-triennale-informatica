.global _start
.type _start, %function

_start:
    MOV r0, #5
    MOV r1, #7
    BL sum_numbers
    // Adesso, il risultato è in r0
    // Puoi fare qualcosa con il risultato o usarlo in seguito
    BKPT #0
