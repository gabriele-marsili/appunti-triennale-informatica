import requests

from bs4 import BeautifulSoup as bs
#from selenium import webdriver
#from selenium.webdriver.chrome.options import Options

BASE_LINK = "https://www.walletexplorer.com"


def getWalletAddresses(url):    
    ref = 'https://www.google.com' # https://www.google.it/?hl=it
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
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
    
    addresses = [] 
    
    session = requests.Session()    
    session.headers = headers
    response = session.get(url)    
    #print(f"\nresponse:\n{response}\n{response.text}")
    html_content = response.text
    soup = bs(html_content,'html.parser')
    
    table = soup.find('table') #should be only 1 tale
    print(f"table\n{table}")

    tableBody = table.tbody
    trs = tableBody.findAll('tr')
    for tr in trs:
        td = tr.findAll('td')[0]
        if td is not None :
            href = td.a.href
            address = href.split("/")[-1]
            addresses.push(address)
             
    
    return addresses


def getPools(): 
    
    eligiusBaseLink = BASE_LINK+'wallet/Eligius.st'
    eligiusAddressesLink = eligiusBaseLink+'/addresses'
    
    deepBitBaseLink = BASE_LINK+'wallet/DeepBit.net'
    deepBitAddressesLink = deepBitBaseLink+'/addresses'
    
    bitMinterBaseLink = BASE_LINK+'wallet/BitMinter.com'
    bitMinterAddressesLink = bitMinterBaseLink+'/addresses'
    
    BTCGuildBaseLink = BASE_LINK + 'wallet/BTCGuild.com'
    BTCGuildAddressesLink = BTCGuildBaseLink+ '/addresses'
    
    
    eligius_WalletAddresses = getWalletAddresses(eligiusAddressesLink)
    print(f"eligius_WalletAddresses = {eligius_WalletAddresses}")
    
    deepBit_WalletAddresses = getWalletAddresses(deepBitAddressesLink)
    print(f"deepBit_WalletAddresses = {deepBit_WalletAddresses}")
    
    bitMinte_WalletAddresses = getWalletAddresses(bitMinterAddressesLink)
    print(f"bitMinte_WalletAddresses = {bitMinte_WalletAddresses}")
    
    BTCGuild_WalletAddresses = getWalletAddresses(BTCGuildAddressesLink)
    print(f"BTCGuild_WalletAddresses = {BTCGuild_WalletAddresses}")
    
    
    
    
if __name__ == "__main__":
    pools = getPools()
    print(f"pools = {pools}")
    