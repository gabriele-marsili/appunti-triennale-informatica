/*definisco in questo file header le definizioni di variabili, struct, funzioni ... 
che poi verranno riprese in qualsiasi file in cui importo (includo) questo file
*/


// definzione struct che rappresenta una stringa
typedef struct stringola {
  char *str;
  struct stringola *next;
} stringola; // lista di str
  
stringola *stringola_crea(char *s); // ripresa listastringhe.c
void stringola_distruggi(stringola *a); // ripresa listastringhe.c
void stringola_stampa(stringola *a, FILE *f); // ripresa listastringhe.c
void lista_stringola_stampa(stringola *lis, FILE *f); // ripresa listastringhe.c
void lista_stringola_distruggi(stringola *lis); // ripresa listastringhe.c
stringola *lista_stringola_inserisci_lex(stringola *lis, stringola *c); // ripresa listastringhe.c