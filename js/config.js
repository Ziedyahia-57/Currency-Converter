// API configuration
const API_KEY = "e8eab13facc49788d961a68e";
const PROXY_URL = "https://api.allorigins.win/raw?url=";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

// LocalStorage keys
const CURRENCY_DATA_KEY = "currencyData";
const LAST_UPDATED_KEY = "lastUpdated";
const CURRENCY_ORDER_KEY = "currencyOrder";
const CHECKBOX_STATE_KEY = "checkboxState";
const DARK_MODE_KEY = "darkMode";

// DOM element IDs
const ELEMENTS = {
    currencyTab: "currency-tab",
    currencyContainer: "currency-container",
    addCurrencyBtn: "add-currency-btn",
    currencyList: "currency-list",
    hideTab: "hide-tab",
    hideDonationTab: "hide-donation-tab",
    donationTab: "donation-tab",
    supportDevBtn: "support-dev-btn",
    lastUpdateElement: ".last-update",
    numToTextElement: "num-to-text",
    darkModeBtn: "dark-mode-btn",
    convertCheckbox: "convert-on-select",
    donationContent: "donation-content"
};

export {
    API_KEY, PROXY_URL, API_URL, CURRENCY_DATA_KEY, LAST_UPDATED_KEY,
    CURRENCY_ORDER_KEY, CHECKBOX_STATE_KEY, DARK_MODE_KEY, ELEMENTS
};