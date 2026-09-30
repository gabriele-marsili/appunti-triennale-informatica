#Il programma, una volta eseguito, richiama la funzione scansione_lineare() e poi richiama ricerca_binaria()

#tra una prova e l'altra cambia il valore di K per vedere (e capire) cosa succede ;)

#Ricorda : i vettori partodono dalla posizione numero 0 ! => in questo caso 1 si trova in A[0], ovvero nella posizione 0 del vettore A ... in informatica è bene abituarsi a contare partendo da 0


A = [1,2,3,4,5,6,7,8,9,10,11,12,13,14] # vettore o array (ordinato con numeri naturali da 1 a 14, compresi)

K = 12 # chiave | variabile numerica 

global metà, indicatore # --> global variabile permette di recuperare (e modificare) tale variabile in tutto il programma
metà = int(len(A)/2) # len(A) indica la lunghezza del vettore, che poi viene divisa per 2 => 14/2 = 7 ... int ad inizio serve per trasformare ciò che segue in una variabile di tipo intero (in questo caso 7 e non 7.0)
indicatore = metà + 1 #variabile corrispondente alla variabile metà + 1, in questo caso = a 8 

def scansione_lineare(): # --> def serve per definire una funzione --> def nome_funzione(eventuali argomenti)
    global metà, indicatore
    for i in  range (len(A)): #--> ciclo for : ripete una serie di azioni, in questo caso le ripete per un range = alla lunghezza di A (ovvero len(A) ) 
        
        if A[i] == K: #--> controllo SE il valore nella posizione i del vettore A sia uguale a K 
            print(f"\nK TROVATO nella posizione {i}! - trovato in scansione lineare \n") #--> SE il valore nella posizione i del vettore A è uguale a K stampo a video "K trovato nella posizione i", dove i scritto {i} viene direttamente modificato con il numero dato dal ciclo for
            return i # --> ritorna il valore di i, ovvero la posizione del vettore A in cui i si trova il valore K 
        
        else: # --> se non viene soddisfatta la condizione del precedente if (ovvero A[i] == K) allora il programma entra nell'else (intendetelo come "altrimenti")
            
            print(f"\nk NON trovato nella posizione {i}! - scansione lineare\n") #--> stampa a video che non è stato trovato il valore nella posizione i 
            i = i +1 # --> viene incrementato il valore nella variabile i 
            
def ricerca_binaria():  # --> altra definizione di funzione (priva di argomenti)
    global metà, indicatore
    for i in  range (metà): # --> altro ciclo for, in questo caso il range sarà la metà della lunghezza di A, ovvero metà = len(A)/2 (come dichiarato in precedenza)
        
        if A[metà] == K: # --> controlla SE nella posizione centrale del vettore A si ha il valore racchiuso nella variabile K 
            print("\nK è a metà dell'array\n") # --> stampa a video che K è stato trovato a metà dell'array (ricorda: array = vettore)
            return i # --> ritorna il valore di i, ovvero la posizione del vettore A in cui i si trova il valore K 
        
        elif K < metà: # --> se non viene soddisfatta la condizione del precedente if (ovvero A[metà] == K) allora il programma entra e controlla se viene soddisfatta la condizione di questo elif (ovvero K < metà)
            if K == A[i]: # --> controlla SE K è uguale al valore nella posizione i del vettore A 
                print(f"\nK TROVATO nella posizione {i}! - trovato in ricerca binaria \n")  # --> stampa a video che K è stato trovato nella posizione i
                return i
            else: # --> se non viene validata la condizione del precedente if il programma entra nell'else 
                pass # --> pass indica un'istruzione per cui il programma va avanti
            
        else: # --> K > metà (come prima il programma entra in questo else se non viene soddisfatta la condizione del corrispondente if/elif, ovvero  elif K < metà: in questo caso, la cui condizione è  K < metà )
            
            if K == A[indicatore]: # --> controlla se K è uguale al valore nella posizione "indicatore" (dove indicatore è una variabile contenene un numero, ovvero metà+1...nel nostro caso è 8)
                print(f"\nK TROVATO nella posizione {indicatore}! - trovato in ricerca binaria\n") # --> stampa a video 
                return i
            else: 
                print(f"\nk NON trovato nella posizione {indicatore}! - ricerca binaria\n") #--> stampa a video che non è stato trovato il valore nella posizione indicatore
                indicatore = indicatore + 1 # --> grazie all'else qui sopra, l'indicatore viene incrementato di uno quando non viene soddisfatta la condizione del if corrispondente all'esle, ovvero if K == A[indicatore]: (la cui condizione è K == A[indicatore])
            
        
        
if __name__ == '__main__': # --> questa è una tipica condizione utile che viene posta a fine degli script (programmi)...online trovate il significato
    print(F"len a = {len(A)}\n metà = {metà}")
    scansione_lineare() #--> richiamo della funzione scansione_lineare()
    print(f"\n\n----- Fine scansione lineare ed inizio ricerca binaria -----\n\n")
    ricerca_binaria()  #--> richiamo della funzione ricerca_binaria()