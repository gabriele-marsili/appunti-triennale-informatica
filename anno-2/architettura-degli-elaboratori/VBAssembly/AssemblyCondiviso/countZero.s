.text
.global count
.type count, %function

count : 
    MOV r2, #0  @R2 = ris 
	MOV r3, #0 @R3 = i

LOOP :
    CMP r2, r1    @ i == size
	BEQ  FINE   
	LDR r12, [r0], #4 @ = a fare LDR r12 [r0] e poi ADD r0, r0, #4
	CMP r12, #0 @controllo se ho uno 0
    ADDEQ r2, r1, #1 @ris +1
	ADD r3, r3, #1 @i++
	B LOOP

FINE :
    MOV r0, r2
    MOV PC , LR
