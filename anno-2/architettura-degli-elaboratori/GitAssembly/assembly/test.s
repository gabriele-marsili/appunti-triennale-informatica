.text
.global mydiv 
.type mydiv, %function

MIDIV : MOV r2, #0
START : CMP r0, r1 
    BLO FINE 
    ADD r2, r2, #1
    SUB r0, r0, #1
    B START 
FINE : MOV r0, r2
    MOV PC, LR 
