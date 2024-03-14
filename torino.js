const axios = require('axios');
const cheerio = require('cheerio');

// URL of the webhook
const WEBHOOK_URL = "https://discord.com/api/webhooks/1216879707035795466/1DGLFRyRJNvjOZ0nS8KzOjlYl1xyTp4nII60-Jh2U6Mrs6bJKf9fSrpaRIbxvEw0A0An";

async function checkSoldOutChange(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const soldOutElement = $('.product-mark.sold-out');
        const soldOut = soldOutElement.text().toLowerCase().includes('sold out');
        return soldOut;
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        return false;
    }
}

async function sendWebhookMessage(message) {
    try {
        await axios.post(WEBHOOK_URL, { content: message });
    } catch (error) {
        console.error("Error occurred while sending webhook message:", error);
    }
}

async function main() {
    const url = "https://www.montagneparfums.com/fragrance/torino-2021";
    while (true) {
        await sendWebhookMessage("Checking");
        const isSoldOut = await checkSoldOutChange(url);
        if (!isSoldOut) {
            await sendWebhookMessage("@here The product is in stock!");
        }
        await new Promise(resolve => setTimeout(resolve, 300000)); // 300 seconds (5 minutes)
    }
}

main();
