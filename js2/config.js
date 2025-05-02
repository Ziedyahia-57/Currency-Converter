//! API Configuration
const API_KEY = "e8eab13facc49788d961a68e"; // Replace with your API key
// const API_KEY = "0"; // Replace with your API key
const PROXY_URL = "https://api.allorigins.win/raw?url=";
const base = "USD"; // Default base currency
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`;

//! LocalStorage keys
const CURRENCY_DATA_KEY = "currencyData";
const LAST_UPDATED_KEY = "lastUpdated";

//! DOM element IDs
const DOM = {
    currencyTab: "currency-tab",
    currencyContainer: "currency-container",
    addCurrencyBtn: "add-currency-btn",
    currencyList: "currency-list",
    hideTab: "hide-tab",
    hideDonationTab: "hide-donation-tab",
    donationTab: "donation-tab",
    supportDevBtn: "support-dev-btn",
    lastUpdateElement: "last-update",

    numToTextElement: "num-to-text",
    darkModeBtn: "dark-mode-btn",
    convertCheckbox: "convert-on-select",
    donationContent: "donation-content"
}



export { API_KEY, base, PROXY_URL, API_URL, CURRENCY_DATA_KEY, LAST_UPDATED_KEY, DOM };