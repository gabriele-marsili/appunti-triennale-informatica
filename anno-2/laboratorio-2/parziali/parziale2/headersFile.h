


// definzione struct che rappresenta uno studente 
typedef struct stud {
  char *nome;
  int crediti;
  struct stud *next;
} studente;
  
studente *studente_crea(char *s, int crediti);
void studente_distruggi(studente *a);
void studente_stampa(studente *a, FILE *f);
void lista_studente_stampa(studente *lis, FILE *f);
void lista_studente_distruggi(studente *lis);
studente *lista_studente_inserisci_ordinato(studente *testa, studente *s);
