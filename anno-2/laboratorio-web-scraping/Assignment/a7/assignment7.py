""" analizzare i servizi forniti da CoinGecko
scaricare il client fonito da CoinGecko e analizzarne la funzionalità
scrivere uno script Python che implementi le seguenti funzionalità
ricercare gli exchanger tracciati da CoinGecko e scriverli in un file JSON
memorizzare, per ogni exchanger, il volume di mercato relativo a Bitcoin nella data corrente
facoltativo: scaricare un insieme di dati a scelta da CoinGecko e effettuare un'analisi a scelta su tale dati
"""

#import requests
import json
from pycoingecko import CoinGeckoAPI
import os

cg = CoinGeckoAPI()
bitcoin_id = 'bitcoin'
usd_id = 'usd'
jsonFileName = 'exchange_list.json' 
jsonFilePath = os.path.join(os.path.dirname(__file__), jsonFileName)


list_ex = cg.get_exchanges_list()


with open(jsonFilePath, 'w') as file:
    json.dump(list_ex, file, indent=4)
    
btcVolums = [(ex["name"],ex["trade_volume_24h_btc"]) for ex in list_ex]


print(btcVolums)
    
    
