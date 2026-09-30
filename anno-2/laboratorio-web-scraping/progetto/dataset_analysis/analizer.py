import pandas as pd
from concurrent.futures import ThreadPoolExecutor
import time 
from utilities import SETTINGS, LOG_LEVELS

pd.set_option("mode.copy_on_write", True)
SCRIPT_SIZE_MAP = {
    1: 153,  # 'P2PK'
    2: 180,  # 'P2KH'
    3: 291   # 'P2SH'
}

SCRIPT_TYPE_MAP = {
    0 : 'Unknown',
    1: 'P2PK',   
    2: 'P2KH',   
    3: 'P2SH',   
    4 : 'RETURN',
    5 : 'EMPTY',
    6 : 'P2WPKH',
    7 : 'P2WSH',
}


MAX_THREAD_QUANTITY = SETTINGS['MAX_THREAD_QUANTITY']

def processTransactions(inputsDF, outputsDF, transactionDF):
    """Process transactions using inputs, outputs and transaction dataframe:
    •split transactions in months
    •for each month calculate the network congestion and the fees 
    
    @params : inputsDF : inputs dataframe 
    @params : outputsDF : outputs dataframe 
    @params : transactionDF : transactions dataframe 
    @return dataframe of months in which every month has network congestion and fees
    """
    startT = time.time()
    months = transactionDF.groupby(pd.Grouper(freq='ME'))
    if LOG_LEVELS['processing'] or LOG_LEVELS['all infos'] or LOG_LEVELS['debug']:
        print(f"found {len(months)} months")
        print("------------------------")
    
    def process_month(name, month):
        
        if not LOG_LEVELS['reduce spam'] and ( LOG_LEVELS['processing'] or LOG_LEVELS['all infos'] or LOG_LEVELS['debug']):
            print(f"processing month \n{name.strftime('%Y-%m')}")

        month_data = {
            'P2PK': 0,
            'P2KH': 0,
            'P2SH': 0,
            'fees': 0,
            'networkCongestion': 0,
            'month': name.strftime('%Y-%m')
        }

        # Calcola la network congestion relativa al mese 
        month_data['networkCongestion'] = calculate_network_congestion(month, inputsDF, outputsDF)

        # Calcola le fees relativa al mese 
        month_data['fees'] = month['fee'].sum()

        # Calcola il numero di script type per ogni tipo
        month_data.update(calculate_script_type_counts(month, outputsDF))

        if not LOG_LEVELS['reduce spam'] and ( LOG_LEVELS['results'] or LOG_LEVELS['all infos'] or LOG_LEVELS['debug']):    
            print(f"got month data:\n{month_data}\n")

        return month_data

    with ThreadPoolExecutor() as executor:
        results = list(executor.map(lambda x: process_month(*x), months))

    result_df = pd.DataFrame(results)
    result_df = result_df.loc[:, ~result_df.columns.str.match('None')]
    
    if LOG_LEVELS['time']:
        print(f"transactions processed in {time.time()-startT} seconds")
    
    return result_df

def calculate_network_congestion(month, inputsDF, outputsDF):
    """Calculate network congestion for single month:
    
    @params : month : single month dataframe 
    @params : inputsDF : inputs dataframe 
    @params : outputsDF : outputs dataframe 

    @return network congestion related to the month passed by argument
    """
    
    # Calcolo del numero di input per ogni transazione nel mese
    month_inputs = inputsDF[inputsDF['txId'].isin(month['txId'])]
    n_inputs_per_tx = month_inputs.groupby('txId').size()

    # Calcolo del numero di output per ogni transazione nel mese
    month_outputs = outputsDF[outputsDF['txId'].isin(month['txId'])]
    n_outputs_per_tx = month_outputs.groupby('txId').size()

    # Recupera il tipo di script per ogni transazione nel mese
    # (prende il primo poiché i tipi di script relativi agli outputs della stessa transazione dovrebbero esser tutti uguali)
    script_types_per_tx = month_outputs.groupby('txId')['scriptType'].first()

    # Calcolo della dimensione di ogni transazione
    tx_sizes = 40 * n_inputs_per_tx + 9 * n_outputs_per_tx + script_types_per_tx.map(SCRIPT_SIZE_MAP).fillna(153)

    # Somma dele dimensioni delle transazioni per ottenere la network congestion del mese
    return tx_sizes.sum()

def calculate_script_type_counts(month, outputsDF):
    """Calculate script type quantity for each script type in a month:
    
    @params : month : (single) month dataframe 
    @params : outputsDF : outputs dataframe 

    @return dictionary with script type quantity for each script type
    """
    
    # Numero di outputs per ogni script type
    script_type_counts = outputsDF[outputsDF['txId'].isin(month['txId'])].groupby('scriptType').size()
    # Mappa i tipi di script con i relativi nomi
    script_type_counts.index = script_type_counts.index.map(SCRIPT_TYPE_MAP.get)
    # Costruisci il dizionario tipo di script <--> quantità
    script_type_dict = {f'{script_type}': count for script_type, count in script_type_counts.items()}
    return script_type_dict

def calculate_pool_statistics(df):
    """Calculate the number of minted blocks and the total rewards for each pool of a dataframe. 
    
    @params : df : dataframe (of Coinbase transactions associated to a pool) 

    @return dataframe with minted blocks and dataframe with total rewards for each pool
    """
        
    grouped = df.groupby('pool')
    
    # Ottiene il numero di blocchi minati da ciascuna pool
    blocks_mined = grouped['blockId'].nunique().reset_index(name='blocks_mined')
    
    # Ottiene le reward totali ricevute da ciascuna pool
    total_rewards = grouped['amount'].sum().reset_index(name='total_rewards')
    
    return blocks_mined, total_rewards

def calculate_bi_monthly_statistics(df):
    """Calculate the number of minted blocks and the total rewards 
    for every time period of 2 months for each pool of a dataframe. 
    
    @params : df : dataframe (of Coinbase transactions associated to a pool) 

    @return dataframe with minted blocks for every two months and dataframe with total rewards for every two months for each pool
    """
    
    # Aggiungo una colonna al dataframe per ogni due mesi 
    df['bi_month'] = df['timestamp'].apply(lambda x: f"{x.year}-{(x.month-1)//2*2+1:02d}")

    # Raggruppo il dataframe per pool e periodo di due mesi
    grouped_bi_monthly = df.groupby(['pool', 'bi_month'])
    
    # Ottengo il numero di blocchi minati per intervallo di due mesi
    blocks_mined_bi_monthly = grouped_bi_monthly['blockId'].nunique().reset_index(name='blocks_mined')
    
    # Ottengo le reward totali per intervallo di due mesi
    total_rewards_bi_monthly = grouped_bi_monthly['amount'].sum().reset_index(name='total_rewards')
    
    return blocks_mined_bi_monthly, total_rewards_bi_monthly

