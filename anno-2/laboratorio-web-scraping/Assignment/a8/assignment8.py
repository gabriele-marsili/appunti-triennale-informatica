"""
analizzare la pagina Wikipedia di Game_of_Thrones, utilizzando gli strumenti disponibili sul vostro browser
la pagina contiene un insieme di tabelle che contengono una lista degli episodi, 
riportando per ciascuno: 

•chi ha diretto l'episodio, 
•chi lo ha scritto, 
•la data di rilascio, 
•il numero di richieste di streaming dell'episodio

scaricare la pagina e quindi, mediante, scraping, trovare i dati di tutti gli episodi e stamparli
"""

import pandas as pd 
import requests
from bs4 import BeautifulSoup
url = 'https://en.wikipedia.org/w/index.php' + '?title=List_of_Game_of_Thrones_episodes&oldid=802553687'
r = requests.get(url)
html_contents = r.text
soup = BeautifulSoup(html_contents, 'html.parser')


episodeList = []

tables = soup.find_all(class_='wikitable plainrowheaders wikiepisodetable')
for table in tables:
    episodes = table.find_all(class_='vevent')
    for episode in episodes:                    
            overallNumber = episode.find_all('th')[0].text
            tds = episode.find_all('td')            

            seasonNumber = tds[0].text
            title = tds[1].a.text         
            
            director = tds[2].text
            writer = tds[3].text
            date = tds[4].text
            viewers = tds[5].get_text()
            viewers = viewers.split("[")[0]
            episodeSummary = {
                'No. overall' : overallNumber,
                'No. in season' : seasonNumber,
                'Title' : title,
                'Directed by' : director,
                'Written by' : writer,
                'Date' : date,
                'US Viewers (milions)' : viewers,                        
            }
            episodeList.append(episodeSummary)
        
espisode_dataFrame = pd.DataFrame(episodeList).set_index('No. overall')
print(f"\n\n{espisode_dataFrame}")