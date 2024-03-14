import requests
from bs4 import BeautifulSoup
import time

# URL of the webhook
WEBHOOK_URL = "https://discord.com/api/webhooks/1216879707035795466/1DGLFRyRJNvjOZ0nS8KzOjlYl1xyTp4nII60-Jh2U6Mrs6bJKf9fSrpaRIbxvEw0A0An"

def check_sold_out_change(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    sold_out_element = soup.find('div', class_='product-mark sold-out')
    sold_out = "sold out" in sold_out_element.get_text().lower()
    return sold_out

def send_webhook_message(message):
    payload = {
        "content": message
    }
    requests.post(WEBHOOK_URL, json=payload)

def main():
    url = "https://www.montagneparfums.com/fragrance/torino-2021"
    while True:
        if not check_sold_out_change(url):
            send_webhook_message("@here The product is in stock!")
        time.sleep(300)
        

if __name__ == "__main__":
    main()
