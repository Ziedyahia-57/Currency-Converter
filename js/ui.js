import { ELEMENTS, CURRENCY_ORDER_KEY } from './config.js';
import { currencyToCountry } from './currency-data.js';
import { saveCurrencyOrder, loadCurrencyOrder } from './storage.js';
import { formatNumberWithCommas } from './utils.js';

class CurrencyUI {
    constructor(converter) {
        this.converter = converter;
        this.currencies = [];
        this.draggedItem = null;
        this.highlightedCurrency = null;
        this.currentLetter = '';
        this.currentIndex = 0;
        this.matchingCurrencies = [];

        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.elements = {};
        for (const [key, value] of Object.entries(ELEMENTS)) {
            this.elements[key] = typeof value === 'string' && value.startsWith('.')
                ? document.querySelector(value)
                : document.getElementById(value);
        }
    }

    setupEventListeners() {
        // Currency tab interactions
        this.elements.addCurrencyBtn.addEventListener('click', () => this.handleAddCurrencyClick());
        this.elements.hideTab.addEventListener('click', () => this.closeCurrencyTab());
        this.elements.hideDonationTab.addEventListener('click', () => this.closeDonationTab());
        this.elements.supportDevBtn.addEventListener('click', () => this.openDonationTab());

        // Drag and drop functionality
        this.elements.currencyContainer.addEventListener('dragstart', (e) => this.handleDragStart(e));
        this.elements.currencyContainer.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.elements.currencyContainer.addEventListener('dragend', (e) => this.handleDragEnd(e));
        this.elements.currencyContainer.addEventListener('drop', (e) => this.handleDrop(e));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Input handling
        this.elements.currencyContainer.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT') this.handleInputChange(e);
        });

        // Number to words functionality
        if (this.elements.numToTextElement) {
            this.elements.currencyContainer.addEventListener('input', (e) => {
                if (e.target.tagName === 'INPUT') this.updateNumberToText(e.target);
            });
        }

        // Online/offline status
        window.addEventListener('online', () => this.handleOnlineStatus());
        window.addEventListener('offline', () => this.handleOfflineStatus());
    }

    async initializeApp() {
        // Load saved currencies or defaults
        const savedOrder = loadCurrencyOrder(CURRENCY_ORDER_KEY);
        if (savedOrder && savedOrder.length > 0) {
            this.currencies = savedOrder;
            this.elements.currencyContainer.innerHTML = '';
            savedOrder.forEach(currency => this.addCurrency(currency, false));
        } else {
            this.addCurrency('USD');
            this.addCurrency('EUR');
        }

        // Initialize input values
        document.querySelectorAll('.currency-input input').forEach(input => {
            input.value = '0.00';
        });

        this.checkCurrencyCount();
        this.updateAddButtonVisibility();
    }

    async handleAddCurrencyClick() {
        this.elements.currencyList.innerHTML = '';

        if (!this.converter.exchangeRates) {
            await this.converter.initializeExchangeRates();
        }

        Object.keys(this.converter.exchangeRates)
            .sort((a, b) => a.localeCompare(b))
            .forEach(currency => {
                if (!this.currencies.includes(currency)) {
                    this.createCurrencyOption(currency);
                }
            });

        this.openCurrencyTab();
    }

    createCurrencyOption(currency) {
        const option = document.createElement('div');
        option.classList.add('currency-option');
        const countryCode = currencyToCountry[currency] || 'xx';

        option.innerHTML = `
            <span class="fi fi-${countryCode}"></span>
            <span>${currency}</span>
        `;

        option.addEventListener('click', () => {
            this.addCurrency(currency);
            this.closeCurrencyTab();
        });

        this.elements.currencyList.appendChild(option);
    }

    addCurrency(currency, shouldSave = true) {
        if (this.currencies.includes(currency)) return;

        this.currencies.push(currency);
        const currencyDiv = document.createElement('div');
        currencyDiv.classList.add('currency-input');
        currencyDiv.setAttribute('draggable', 'true');

        const countryCode = currencyToCountry[currency] || 'xx';

        currencyDiv.innerHTML = `
            <div class="currency-info">
                <div class="flag"><span class="fi fi-${countryCode}"></span></div>
                <label>${currency}</label>
            </div>
            <input type="text" data-currency="${currency}" value="0.00" data-previous-value="0">
            <button class="remove-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </button>
        `;

        this.elements.currencyContainer.appendChild(currencyDiv);

        const inputField = currencyDiv.querySelector('input');
        const removeBtn = currencyDiv.querySelector('.remove-btn');

        // Input handling
        inputField.addEventListener('input', (e) => this.handleInputChange(e));
        inputField.addEventListener('focus', (e) => e.target.select());

        // Remove currency
        removeBtn.addEventListener('click', () => {
            currencyDiv.remove();
            this.currencies = this.currencies.filter(c => c !== currency);
            this.checkCurrencyCount();
            this.updateAddButtonVisibility();
            saveCurrencyOrder(this.currencies);
        });

        this.checkCurrencyCount();
        this.updateAddButtonVisibility();

        if (shouldSave) {
            saveCurrencyOrder(this.currencies, CURRENCY_ORDER_KEY);
        }

        // Update values if there's a base currency with value
        const baseInput = document.querySelector('.currency-input input:not([value="0"])') ||
            document.querySelector('.currency-input input');
        if (baseInput) {
            const baseValue = parseFloat(baseInput.value.replace(/,/g, '') || 1);
            const baseCurrency = baseInput.dataset.currency;
            this.converter.updateCurrencyValues(baseValue, baseCurrency);
        }
    }

    handleInputChange(event) {
        let rawValue = event.target.value ? event.target.value.replace(/,/g, '') : '';

        if (!/^\d*\.?\d*$/.test(rawValue)) {
            event.target.value = event.target.dataset.previousValue || '0';
            return;
        }

        event.target.dataset.previousValue = rawValue;
        event.target.value = formatNumberWithCommas(rawValue);

        const baseValue = parseFloat(rawValue) || 0;
        const baseCurrency = event.target.dataset.currency;
        this.converter.updateCurrencyValues(baseValue, baseCurrency);
    }

    updateNumberToText(inputField) {
        const rawValue = inputField.value.replace(/,/g, '');
        const number = parseFloat(rawValue);

        if (!isNaN(number) && typeof numberToWords !== 'undefined') {
            let words = numberToWords.toWords(number);
            words = words.charAt(0).toUpperCase() + words.slice(1);
            this.elements.numToTextElement.textContent = words.replace(/,/g, '');
        } else {
            this.elements.numToTextElement.textContent = 'ABC...';
        }
    }

    checkCurrencyCount() {
        const currencyInputs = document.querySelectorAll('.currency-input');
        const removeButtons = document.querySelectorAll('.remove-btn');

        if (currencyInputs.length > 2) {
            removeButtons.forEach(btn => btn.style.display = 'flex');
        } else {
            removeButtons.forEach(btn => btn.style.display = 'none');
        }
    }

    updateAddButtonVisibility() {
        if (this.currencies.length === Object.keys(this.converter.exchangeRates || {}).length) {
            this.elements.addCurrencyBtn.style.display = 'none';
        } else {
            this.elements.addCurrencyBtn.style.display = 'flex';
        }
    }

    // Tab management
    openCurrencyTab() {
        this.elements.currencyTab.classList.add('show');
        this.elements.currencyTab.classList.remove('hidden');
    }

    closeCurrencyTab() {
        this.elements.currencyTab.classList.remove('show');
        this.elements.currencyTab.classList.add('hidden');
    }

    openDonationTab() {
        this.elements.donationTab.classList.add('show');
        this.elements.donationTab.classList.remove('hidden');
    }

    closeDonationTab() {
        this.elements.donationTab.classList.remove('show');
        this.elements.donationTab.classList.add('hidden');
    }

    // Drag and drop functionality
    handleDragStart(event) {
        if (event.target.classList.contains('currency-input')) {
            this.draggedItem = event.target;
            this.draggedItem.style.background = 'var(--drag-background)';
            this.draggedItem.style.opacity = '0.5';
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        const targetItem = event.target.closest('.currency-input');

        if (targetItem && targetItem !== this.draggedItem) {
            targetItem.style.background = 'var(--drag-background)';
            targetItem.style.border = '1px solid var(--drag-border)';
        }

        document.querySelectorAll('.currency-input').forEach(item => {
            if (item !== targetItem && item !== this.draggedItem) {
                item.style.background = 'var(--gray)';
                item.style.border = 'var(--border-dark) solid 1px';
            }
        });
    }

    handleDragEnd(event) {
        if (event.target.classList.contains('currency-input')) {
            this.draggedItem.style.background = 'var(--gray)';
            this.draggedItem.style.opacity = '1';
            this.draggedItem.style.border = 'var(--border-dark) solid 1px';

            document.querySelectorAll('.currency-input').forEach(item => {
                item.style.background = 'var(--gray)';
                item.style.border = 'var(--border-dark) solid 1px';
            });

            this.draggedItem = null;
        }
    }

    handleDrop(event) {
        event.preventDefault();
        const targetItem = event.target.closest('.currency-input');

        if (this.draggedItem && targetItem && this.draggedItem !== targetItem) {
            const container = this.elements.currencyContainer;
            const items = Array.from(container.children);
            const draggedIndex = items.indexOf(this.draggedItem);
            const targetIndex = items.indexOf(targetItem);

            if (draggedIndex < targetIndex) {
                container.insertBefore(this.draggedItem, targetItem.nextSibling);
            } else {
                container.insertBefore(this.draggedItem, targetItem);
            }

            this.currencies = Array.from(container.children)
                .filter(item => item.classList.contains('currency-input'))
                .map(item => item.querySelector('input').dataset.currency);

            saveCurrencyOrder(this.currencies, CURRENCY_ORDER_KEY);
        }

        document.querySelectorAll('.currency-input').forEach(item => {
            item.style.background = 'var(--gray)';
            item.style.border = 'var(--border-dark) solid 1px';
        });
    }

    // Keyboard navigation
    handleKeyDown(event) {
        if (!this.elements.donationTab.classList.contains('hidden')) {
            if (event.key === 'Escape') {
                event.preventDefault();
                this.closeDonationTab();
            }
        }

        if (!this.elements.currencyTab.classList.contains('hidden')) {
            const pressedKey = event.key.toUpperCase();
            const currencyItems = Array.from(this.elements.currencyList.children);

            if (/^[A-Z]$/.test(pressedKey)) {
                if (this.currentLetter !== pressedKey) {
                    this.currentLetter = pressedKey;
                    this.currentIndex = 0;
                    this.matchingCurrencies = currencyItems.filter(option =>
                        option.textContent.trim().toUpperCase().startsWith(pressedKey)
                    );
                }

                if (this.matchingCurrencies.length > 0) {
                    this.removeHoverHighlight();
                    this.updateHighlight(this.matchingCurrencies[this.currentIndex]);
                    this.currentIndex = (this.currentIndex + 1) % this.matchingCurrencies.length;
                }
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                this.currentIndex = 0;
                this.removeHoverHighlight();
                if (!this.highlightedCurrency) {
                    this.updateHighlight(currencyItems[0]);
                } else {
                    let nextItem = this.highlightedCurrency.nextElementSibling;
                    if (nextItem) this.updateHighlight(nextItem);
                }
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                this.currentIndex = 0;
                this.removeHoverHighlight();
                if (!this.highlightedCurrency) {
                    this.updateHighlight(currencyItems[currencyItems.length - 1]);
                } else {
                    let prevItem = this.highlightedCurrency.previousElementSibling;
                    if (prevItem) this.updateHighlight(prevItem);
                }
            } else if (event.key === 'Enter') {
                event.preventDefault();
                if (this.highlightedCurrency) {
                    this.addCurrency(this.highlightedCurrency.textContent.trim());
                    this.closeCurrencyTab();
                    this.updateAddButtonVisibility();
                }
            } else if (event.key === 'Escape') {
                event.preventDefault();
                this.closeCurrencyTab();
            }
        }
    }

    updateHighlight(newItem) {
        this.removeHighlight();
        this.highlightedCurrency = newItem;
        this.highlightedCurrency.classList.add('currency-active');
        this.highlightedCurrency.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    removeHighlight() {
        const previousHighlight = document.querySelector('.currency-active');
        if (previousHighlight) {
            previousHighlight.classList.remove('currency-active');
        }
    }

    removeHoverHighlight() {
        const hoverHighlight = document.querySelector('.currency-option:hover');
        if (hoverHighlight) {
            hoverHighlight.classList.remove('currency-active');
        }
    }

    // Online/offline handlers
    async handleOnlineStatus() {
        console.log('App is online. Fetching latest exchange rates...');
        try {
            this.converter.exchangeRates = await this.converter.fetchExchangeRates('USD');
            if (this.converter.exchangeRates) {
                saveExchangeRates(this.converter.exchangeRates);
                updateLastUpdateElement(this.elements.lastUpdateElement, true);
            }
        } catch (error) {
            console.error('Failed to fetch exchange rates:', error);
            this.handleOfflineStatus();
        }
    }

    handleOfflineStatus() {
        console.log('App is offline. Loading saved exchange rates...');
        const savedData = loadExchangeRates();
        if (savedData) {
            this.converter.exchangeRates = savedData.rates;
            updateLastUpdateElement(this.elements.lastUpdateElement, false, savedData.lastUpdated);
        }
    }

    setupRemoveButton(button, currency) {
        button.addEventListener('click', () => {
            button.parentElement.remove();
            this.currencies = this.currencies.filter(c => c !== currency);
            this.checkCurrencyCount();
            this.updateAddButtonVisibility();
            // Save updated order using CURRENCY_ORDER_KEY
            saveCurrencyOrder(this.currencies, CURRENCY_ORDER_KEY);
        });
    }
}

export default CurrencyUI;