"""
Considerare il servizio CoinGecko, che visualizza i prezzi delle cripto in tempo reale
i grafici sulle cripto
la market cap
i volumi di trading.

scrivere uno scraper che collezioni informazioni sulle criptovalute 
e produca un insieme di grafici sul loro andamento

"""



import pandas as pd 
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
#from datetime import datetime

baseUrl = 'https://www.coingecko.com/it'

def getTopTen():
    """Returns a dataset of the top 10 crypto on CoinGeko with
    •Name, Position, price, 1h, 24h, 7h, volume"""
    
    topTenCryptoList = []
    
    r = requests.get(baseUrl)
    html_contents = r.text
    soup = BeautifulSoup(html_contents, 'html.parser')
    
    main_div = soup.find(class_ = 'tw-mb-8')
    focusDiv = main_div.children[6]
    
    table = focusDiv.find('table')

    tableBody = table.tbody
    coins = tableBody.findAll('tr')
    coins = coins[:10]
    for coin in coins:
        tds = coin.findAll('td')
        position = tds[1].text
        fullName = tds[2].a.img.alt
        coinName = tds[2].div.div.text
        price = tds[4].text.split('&')[0] + " USD"
        
        time_1h = tds[5].text
        if('down' in tds[5].span):
            time_1h = "-"+time_1h
        time_24h = tds[6].text
        if('down' in tds[6].span):
            time_24h = "-"+time_24h
        time_7g = tds[7].text
        if('down' in tds[7].span):
            time_7g = "-"+time_7g
        
        volume = tds[9].text
        
        coinSummary = {
            'Position' : position,
            'Full name' : fullName,
            'Coin name' : coinName,
            'Price' : price,
            'T 1h' : time_1h,
            'T 24h' : time_24h,
            'T 7g' : time_7g,
            'Volume' : volume,            
        }
        topTenCryptoList.append(coinSummary)

    return pd.DataFrame(topTenCryptoList).set_index('Position')


def takeDatasH24(coinName):
    ref = f"https://www.coingecko.com/it/monete/{coinName}"
    url = "https://www.coingecko.com/price_charts/1/usd/24_hours.json"
    
    headers = {
        "accept": "*/*",
        "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
        "if-none-match": "W/\"55ba7456acd16afe5265d4a917c67648\"",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        'referer': ref

    }
    
    response = requests.get(url, headers=headers)
    data = response.json()

    stats_data = data['stats']
    total_volumes_data = data['total_volumes']

    stats_df = pd.DataFrame(stats_data, columns=['time', 'price'])
    stats_df['time'] = pd.to_datetime(stats_df['time'], unit='s')
    stats_df.set_index('time', inplace=True)

    total_volumes_df = pd.DataFrame(total_volumes_data, columns=['time', 'volume'])
    total_volumes_df['time'] = pd.to_datetime(total_volumes_df['time'], unit='s')
    total_volumes_df.set_index('time', inplace=True)

    fig, ax1 = plt.subplots()

    color = 'tab:red'
    ax1.set_xlabel('Time')
    ax1.set_ylabel('Price', color=color)
    ax1.plot(stats_df.index, stats_df['price'], color=color)
    ax1.tick_params(axis='y', labelcolor=color)

    ax2 = ax1.twinx()  
    color = 'tab:blue'
    ax2.set_ylabel('Volume', color=color)
    ax2.plot(total_volumes_df.index, total_volumes_df['volume'], color=color)
    ax2.tick_params(axis='y', labelcolor=color)

    fig.tight_layout()
    plt.show()
    
    
    
   
def main():
    """Crea grafici relativi all'andamento di alcune crypto"""   
    topTenDS = getTopTen()
    try:
        
        print(f"\n\nTop Ten Crypto\n\n{topTenDS}\n\n")
        takeDatasH24()
    
    except Exception as e : 
        print(f"Error : {e}")
    
   
if __name__ == '__main__':
    main()