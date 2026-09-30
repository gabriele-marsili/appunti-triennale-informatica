import pandas as pd 
import os 
import os.path

"""
1) concatenare i dati relativi alla settimana in un nuovo DataFrame
2) trovare i clienti che hanno frequentato il ristorante in entrambe le settimane
3) trovare i clienti che hanno frequentato il ristorante in entrambe le settimane e hanno ordinato il solito cibo
4) identificare i clienti che hanno frequentato il ristorante solo nella prima settimana o solo nella seconda settimana
5) Per ogni cliente che appare nel DataFrame week1 identificare le informazioni di quel cliente contenute nel DataFrame customers
"""

# Definizione dei percorsi per i file di dati
DATASET_PATH = os.path.dirname(__file__)
DATASET_PATH_CUSTOMERS = os.path.join(DATASET_PATH, 'customers.csv')
DATASET_PATH_FOOD = os.path.join(DATASET_PATH, 'foods.csv')
DATASET_PATH_W1_SALES = os.path.join(DATASET_PATH, 'week_1_sales.csv')
DATASET_PATH_W2_SALES = os.path.join(DATASET_PATH, 'week_2_sales.csv')
DATASET_PATH_W1_SATISFACTION = os.path.join(DATASET_PATH, 'week_1_satisfaction.csv')

# Caricamento dei dati dai file CSV
customersDS = pd.read_csv(DATASET_PATH_CUSTOMERS)
foodDS = pd.read_csv(DATASET_PATH_FOOD)
W1_salesDS = pd.read_csv(DATASET_PATH_W1_SALES)
W2_salesDS = pd.read_csv(DATASET_PATH_W2_SALES)
W1_satisfactionDS = pd.read_csv(DATASET_PATH_W1_SATISFACTION)

# 1) Concatenare i dati relativi alla settimana in un nuovo DataFrame
week1_data = pd.merge(customersDS, W1_salesDS, left_on='ID', right_on='Customer ID')
week1_data = week1_data.merge(foodDS, on='Food ID')
week1_data = week1_data.merge(W1_satisfactionDS, left_index=True, right_index=True)
week2_data = pd.merge(customersDS, W2_salesDS, left_on='ID', right_on='Customer ID').merge(foodDS, on='Food ID')

# 2) Trovare i clienti che hanno frequentato il ristorante in entrambe le settimane
common_customers = pd.merge(week1_data, week2_data, on='Customer ID', suffixes=('_week1', '_week2'))
common_customer_ids = common_customers['Customer ID'].unique()

# 3) Trovare i clienti che hanno frequentato il ristorante in entrambe le settimane e hanno ordinato lo stesso cibo
same_food_customers = common_customers[common_customers['Food ID_week1'] == common_customers['Food ID_week2']]

# 4) Identificare i clienti che hanno frequentato il ristorante solo nella prima settimana o solo nella seconda settimana
unique_week1_customers = week1_data[~week1_data['Customer ID'].isin(common_customer_ids)]
unique_week2_customers = week2_data[~week2_data['Customer ID'].isin(common_customer_ids)]

# 5) Per ogni cliente che appare nel DataFrame week1 identificare le informazioni di quel cliente contenute nel DataFrame customers
customer_info_week1 = pd.merge(week1_data, customersDS, left_on='Customer ID', right_on='ID', how='left')

# Output dei risultati
print("Dati relativi alla settimana 1:")
print(week1_data)
print("\nDati relativi alla settimana 2:")
print(week2_data)
print("\nClienti comuni:")
print(common_customers)
print("\nClienti che hanno ordinato lo stesso cibo in entrambe le settimane:")
print(same_food_customers)
print("\nClienti unici nella settimana 1:")
print(unique_week1_customers)
print("\nClienti unici nella settimana 2:")
print(unique_week2_customers)
print("\nInformazioni sui clienti della settimana 1:")
print(customer_info_week1)

