import pandas as pd
import os
import matplotlib.pyplot as plt


# Definizione dei percorsi per i file di dati
CURRENT_PATH = os.path.dirname(__file__)
DATASET_PATH_TRANSACTIONS = os.path.join(CURRENT_PATH, 'Dataset/Bitcoin/transactions.csv')
DATASET_PATH_INPUTS = os.path.join(CURRENT_PATH, 'Dataset/Bitcoin/inputs.csv')
DATASET_PATH_OUTPUTS = os.path.join(CURRENT_PATH, 'Dataset/Bitcoin/outputs.csv')
DATASET_PATH_DATES = os.path.join(CURRENT_PATH, 'Dataset/Bitcoin/dates.csv')

# Caricamento dei dati
transactions = pd.read_csv(DATASET_PATH_TRANSACTIONS, names=['tx_id', 'blk_id'])
inputs = pd.read_csv(DATASET_PATH_INPUTS, names=['in_id', 'tx_id', 'sig_id', 'output_id'])
outputs = pd.read_csv(DATASET_PATH_OUTPUTS, names=['output_id', 'tx_id', 'pk_id', 'value'])
dates = pd.read_csv(DATASET_PATH_DATES, parse_dates=['time'])

# Controllo di validità
"""
Input/output che fanno riferimento ad un tx_id non contenuto in nessun blocco
Input che fanno riferimento ad un output_id non esistente
Transazioni con pk_id/sign_id negativi
Output con campo “amount” negativo
Transazioni in double spending
Reward per il miner minore di 50 BTC
Si cercano di spendere dei bitcoin appartenenti ad un indirizzo diverso dal proprio
la chiave pubblica non è consistente con la firma
nel nostro caso, l'identificatore nell'output non corrisponde con quello nell'input
"""
validity_check = inputs.merge(transactions, on='tx_id').merge(outputs, on='output_id')
validity_check = validity_check[(validity_check['sig_id'] == validity_check['pk_id']) & (validity_check['sig_id'].isin([0, -1]))]

InputOutput = pd.merge(outputs, inputs, on="output_id")
Invalid_pk_sig = InputOutput.loc[InputOutput ['sig_id'] != InputOutput ['pk_id']]
print("Transazioni inconsistenti trovate =", len(Invalid_pk_sig.index))



# Conta il numero di transazioni in ciascun blocco
transactions_per_block = transactions.groupby('blk_id').size()

# Conta il numero di input per ciascun blocco
inputs_per_block = inputs.groupby('tx_id').size().reset_index(name='input_count')
validity_check = transactions.merge(inputs_per_block, on='tx_id')

# Verifica se tutte le transazioni in un blocco sono valide
invalid_blocks = validity_check.groupby('blk_id')['input_count'].transform(lambda x: len(x) != x.iloc[0])

# Rimozione di blocchi o transazioni invalide
invalid_blocks = invalid_blocks[invalid_blocks].index
transactions = transactions[~transactions['blk_id'].isin(invalid_blocks)]

# Calcolo delle statistiche richieste
# 1) Distribuzione dei blocchi: numero di transazioni per ogni blocco
block_transaction_count = transactions.groupby('blk_id').size()


# 3) Quantità di UXTO esistenti al momento del mining dell'ultimo blocco del dataset
last_block_uxto_count = outputs[outputs['tx_id'].isin(transactions[transactions['blk_id'] == transactions['blk_id'].max()]['tx_id'])]['value'].count()

print("Calcolo valore totale in UXTO")
# ricerca gli Output non spesi
# ovvero gli Output che non hanno una corrispondenza in Inputs
# essi rappresentano gli UTXO (Unspent Transaction Outputs)
temp = (~outputs['output_id'].isin(inputs['output_id']))
UTXO = outputs.loc[temp]


# 4) UXTO associato al valore più alto
uxto_highest_value = outputs.loc[outputs['value'].idxmax()]
MaxUTXO = UTXO.value.max()
print("Massimo UTXO =", MaxUTXO )
SumUTXO = UTXO.value.sum()
print("Somma totale UTXO =", SumUTXO )

MaxUTXO_tx = UTXO.loc[UTXO['value'] == MaxUTXO] #cerco la riga  con valore massimo
MaxUTXO_tx = pd.merge(MaxUTXO_tx, transactions, on=['tx_id'])

# 2) Distribuzione delle fee spese in ogni transazione nell'intero periodo
transaction_fees = outputs.groupby('tx_id')['value'].sum()

Out=outputs.drop(['pk_id'], axis="columns")
OutTrans = Out.groupby('tx_id')['value'].sum().reset_index()  
OutTrans

#valore in input di ogni transazione
Inp = inputs.drop(['sig_id'] , axis=1)
Out = outputs.drop(['tx_id', 'pk_id'], axis=1)
InpValues = pd.merge(Inp, Out, on='output_id')
InpValues.rename(columns={'in_id':'in_id', 'tx_id':'tx_id' , 'output_id':'utxo_id' , 'value':'value_to_be_spent'}, inplace=True)
InpTrans = InpValues.groupby('tx_id')['value_to_be_spent'].sum().reset_index()


#fees:
#raggruppo per indice della transazione 
#unisco i Dataframe per avere, per ogni transazione, il valore speso e il valore uscente

Tx = pd.merge(InpTrans, OutTrans, on='tx_id') 

#aggiungo la colonna delle fees

Tx['fees'] = Tx['value_to_be_spent'] - Tx['value'] 

TxGreter0 = Tx.loc[Tx['fees'] > 0].sort_values('fees')
TxLessEq0 = Tx.loc[Tx['fees'] == 0]
TxLessLess0 = Tx.loc[Tx['fees'] < 0].sort_values('fees')

#TxGreter0 , TxLessEq0, TxLessLess0
#plotting della distribuzione delle fees con valore maggiore di 0
Tx_Correct=Tx.loc[Tx['fees']>=0]
print(Tx_Correct)
X = list(Tx_Correct['tx_id'])
plt.plot(X,Tx_Correct['fees'])
plt.xlabel('Id transazioni che includono le fees', fontsize=13)
plt.ylabel('Valore fees', fontsize=13)
plt.yscale('log')
plt.show()



# 5) Trova tutte le transazioni generate tra due date
start_date = '2024-01-01'
end_date = '2024-02-01'
transactions_between_dates = transactions[transactions['blk_id'].isin(dates[(dates['time'] >= start_date) & (dates['time'] <= end_date)]['block_id'])]

# Distribuzione temporale delle transazioni nel dataset
transactions_by_month = dates.groupby(pd.to_datetime(dates['time']).dt.to_period('M')).size()

# Output delle statistiche
print("Distribuzione dei blocchi:")
print(block_transaction_count)
print("\nDistribuzione delle fee spese in ogni transazione nell'intero periodo:")
print(transaction_fees)
print("\nQuantità di UXTO esistenti al momento del mining dell'ultimo blocco del dataset:", last_block_uxto_count)
print("\nUXTO associato al valore più alto:")
print(uxto_highest_value)
print("\nTransazioni generate tra", start_date, "e", end_date, ":")
print(transactions_between_dates)
print("\nDistribuzione delle transazioni per mese:")
print(transactions_by_month)


# Grafico della distribuzione dei blocchi: numero di transazioni per ogni blocco
block_transaction_count.plot(kind='bar', figsize=(10, 6))
plt.title('Distribuzione dei blocchi: numero di transazioni per ogni blocco')
plt.xlabel('ID del blocco')
plt.ylabel('Numero di transazioni')
plt.show()

# Grafico a torta della distribuzione delle fee spese in ogni transazione nell'intero periodo
transaction_fees.plot(kind='pie', figsize=(8, 8), autopct='%1.1f%%')
plt.title('Distribuzione delle fee spese in ogni transazione nell\'intero periodo')
plt.ylabel('')
plt.show()

# Grafico a barre della distribuzione delle transazioni per mese
transactions_by_month.plot(kind='bar', figsize=(10, 6))
plt.title('Distribuzione delle transazioni per mese')
plt.xlabel('Mese')
plt.ylabel('Numero di transazioni')
plt.show()