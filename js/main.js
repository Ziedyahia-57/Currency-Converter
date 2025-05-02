import { ELEMENTS } from './config.js';
import CurrencyConverter from './core.js';
import CurrencyUI from './ui.js';
import { initializeDonationContent, handleDonationButtonClick } from './donation.js';

document.addEventListener("DOMContentLoaded", async () => {
    const converter = new CurrencyConverter();
    const ui = new CurrencyUI(converter);

    // Initialize donation content
    initializeDonationContent();

    // Set up donation button
    const donationButton = document.getElementById(ELEMENTS.supportDevBtn);
    if (donationButton) {
        donationButton.addEventListener("click", handleDonationButtonClick);
    }

    // Initialize app
    await converter.initializeExchangeRates();
    await ui.initializeApp();
});