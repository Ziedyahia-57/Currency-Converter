import { API_KEY, PROXY_URL, API_URL } from './config.js';

let errorLogged = false;

async function fetchExchangeRates(base = "USD") {
    try {
        const response = await fetch(`${PROXY_URL}https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.result === "error") {
            throw new Error(data["error-type"] || "API error");
        }

        return data.conversion_rates;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        throw error;
    }
}

export { fetchExchangeRates };