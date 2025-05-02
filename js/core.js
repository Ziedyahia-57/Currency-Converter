import { fetchExchangeRates } from './api.js';
import { saveExchangeRates, loadExchangeRates } from './storage.js';
import { updateLastUpdateElement, formatNumberWithCommas } from './utils.js';

class CurrencyConverter {
    constructor() {
        this.exchangeRates = {};
        // this.currencies = [];
    }

    async initializeExchangeRates() {
        try {
            this.exchangeRates = await fetchExchangeRates("USD");
            if (this.exchangeRates) {
                saveExchangeRates(this.exchangeRates);
                updateLastUpdateElement(document.querySelector('.last-update'), true);
                return { success: true, online: true };
            }
        } catch (error) {
            console.error("Failed to fetch exchange rates:", error);
            const savedData = loadExchangeRates();
            if (savedData) {
                this.exchangeRates = savedData.rates;
                updateLastUpdateElement(document.querySelector('.last-update'), false, savedData.lastUpdated);
                return { success: true, online: false, lastUpdated: savedData.lastUpdated };
            }
            return { success: false };
        }
    }

    updateCurrencyValues(baseValue = 0, baseCurrency = "USD") {
        if (!this.exchangeRates) return;

        const roundedBaseValue = parseFloat(baseValue.toFixed(2));

        document.querySelectorAll(".currency-input input").forEach(input => {
            const currency = input.dataset.currency;
            if (currency !== baseCurrency) {
                const convertedValue = roundedBaseValue * (this.exchangeRates[currency] / this.exchangeRates[baseCurrency]);
                input.value = formatNumberWithCommas(convertedValue.toFixed(2));
            }
        });
    }
}

export default CurrencyConverter;