import {
    CURRENCY_DATA_KEY,
    LAST_UPDATED_KEY,
    CURRENCY_ORDER_KEY,
    CHECKBOX_STATE_KEY,
    DARK_MODE_KEY
} from './config.js';

/**
 * Saves exchange rates and last updated timestamp to localStorage
 * @param {Object} rates - Exchange rates data
 */
function saveExchangeRates(rates) {
    if (rates) {
        localStorage.setItem(CURRENCY_DATA_KEY, JSON.stringify(rates));

        const now = new Date();
        const formattedDate = [
            String(now.getDate()).padStart(2, "0"),
            String(now.getMonth() + 1).padStart(2, "0"),
            now.getFullYear()
        ].join('/');

        localStorage.setItem(LAST_UPDATED_KEY, formattedDate);
    }
}

/**
 * Loads exchange rates and last updated timestamp from localStorage
 * @returns {Object|null} Object with rates and lastUpdated, or null if not found
 */
function loadExchangeRates() {
    const savedRates = localStorage.getItem(CURRENCY_DATA_KEY);
    const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);

    if (savedRates && lastUpdated) {
        try {
            return {
                rates: JSON.parse(savedRates),
                lastUpdated: formatStoredDate(lastUpdated)
            };
        } catch (error) {
            console.error("Error parsing saved exchange rates:", error);
            return null;
        }
    }
    return null;
}

/**
 * Formats stored date string to ensure consistent dd/mm/yyyy format
 * @param {string} dateStr - Date string from storage
 * @returns {string} Formatted date string
 */
function formatStoredDate(dateStr) {
    const dateParts = dateStr.split(/[/-]/);
    if (dateParts.length === 3) {
        return dateParts.map(part => part.padStart(2, "0")).join('/');
    }
    return dateStr; // Return as-is if format is unexpected
}

/**
 * Saves the current currency order to localStorage
 * @param {Array} currencies - Array of currency codes
 */
function saveCurrencyOrder(currencies) {
    if (Array.isArray(currencies)) {
        localStorage.setItem(CURRENCY_ORDER_KEY, JSON.stringify(currencies));
    }
}

/**
 * Loads saved currency order from localStorage
 * @returns {Array|null} Array of currency codes or null if not found/invalid
 */
function loadCurrencyOrder() {
    try {
        const savedOrder = localStorage.getItem(CURRENCY_ORDER_KEY);
        if (savedOrder) {
            const parsed = JSON.parse(savedOrder);
            return Array.isArray(parsed) ? parsed : null;
        }
    } catch (error) {
        console.error("Error loading currency order:", error);
    }
    return null;
}

/**
 * Saves the checkbox state to localStorage
 * @param {boolean} isChecked - Checkbox state
 */
function saveCheckboxState(isChecked) {
    localStorage.setItem(CHECKBOX_STATE_KEY, isChecked.toString());
}

/**
 * Loads checkbox state from localStorage
 * @returns {boolean} Checkbox state (default: false)
 */
function loadCheckboxState() {
    const savedState = localStorage.getItem(CHECKBOX_STATE_KEY);
    return savedState === "true";
}

/**
 * Saves dark mode preference to localStorage
 * @param {boolean} isDarkMode - Dark mode state
 */
function saveDarkModePreference(isDarkMode) {
    localStorage.setItem(DARK_MODE_KEY, isDarkMode ? "dark" : "light");
}

/**
 * Loads dark mode preference from localStorage
 * @returns {string|null} 'dark', 'light', or null if not set
 */
function loadDarkModePreference() {
    return localStorage.getItem(DARK_MODE_KEY);
}

/**
 * Clears all extension-related data from localStorage
 */
function clearAllStorage() {
    localStorage.removeItem(CURRENCY_DATA_KEY);
    localStorage.removeItem(LAST_UPDATED_KEY);
    localStorage.removeItem(CURRENCY_ORDER_KEY);
    localStorage.removeItem(CHECKBOX_STATE_KEY);
    localStorage.removeItem(DARK_MODE_KEY);
}

export {
    saveExchangeRates,
    loadExchangeRates,
    saveCurrencyOrder,
    loadCurrencyOrder,
    saveCheckboxState,
    loadCheckboxState,
    saveDarkModePreference,
    loadDarkModePreference,
    clearAllStorage
};