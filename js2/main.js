import { PROXY_URL, API_URL, CURRENCY_DATA_KEY, LAST_UPDATED_KEY, DOM } from "./config.js";
import { currencyToCountry } from "./currencyData.js";

// const API_KEY = "e8eab13facc49788d961a68e"; // Replace with your API key
// const API_KEY = 0; // Replace with your API key


const elements = {
    currencyTab: document.getElementById(DOM.currencyTab),
    currencyContainer: document.getElementById(DOM.currencyContainer),
    addCurrencyBtn: document.getElementById(DOM.addCurrencyBtn),
    currencyList: document.getElementById(DOM.currencyList),
    hideTab: document.getElementById(DOM.hideTab),
    hideDonationTab: document.getElementById(DOM.hideDonationTab),
    donationTab: document.getElementById(DOM.donationTab),
    supportDevBtn: document.getElementById(DOM.supportDevBtn),
    lastUpdateElement: document.getElementById(DOM.lastUpdateElement),

};

// When donation tab is opened:

let errorLogged = false; // Global flag to track error logging

document.addEventListener("DOMContentLoaded", async () => {
    let currencies = [];
    let exchangeRates = {};

    async function fetchExchangeRates() {
        try {
            const response = await fetch(PROXY_URL + encodeURIComponent(API_URL));

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.result === "error") {
                throw new Error(data["error-type"] || "API error");
            }

            // Reset the error flag on successful fetch
            errorLogged = false;

            return data.conversion_rates;
        } catch (error) {
            // Log the error only if it hasn't been logged before
            if (!errorLogged) {
                console.error("Error fetching exchange rates:", error);
                errorLogged = true; // Set the flag to prevent further logging
            }

            throw error;
        }
    }

    // Function to save exchange rates and last updated date to localStorage
    function saveExchangeRates(rates) {
        if (rates) {
            localStorage.setItem(CURRENCY_DATA_KEY, JSON.stringify(rates));

            // Format the date as dd/mm/yyyy
            const now = new Date();
            const day = String(now.getDate()).padStart(2, "0"); // Ensure two digits for day
            const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
            const year = now.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            localStorage.setItem(LAST_UPDATED_KEY, formattedDate);
            console.log("Exchange rates saved to localStorage.");
        }
    }

    // Function to load exchange rates and last updated date from localStorage
    function loadExchangeRates() {
        const savedRates = localStorage.getItem(CURRENCY_DATA_KEY);
        const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);

        if (savedRates && lastUpdated) {
            exchangeRates = JSON.parse(savedRates);

            // Ensure the date is in dd/mm/yyyy format
            const dateParts = lastUpdated.split(/[/-]/); // Split by '/' or '-'
            let formattedDate = lastUpdated;

            if (dateParts.length === 3) {
                // Reformat to dd/mm/yyyy
                const [day, month, year] = dateParts.map(part => part.padStart(2, "0")); // Ensure two digits
                formattedDate = `${day}/${month}/${year}`;
            }

            console.log("Exchange rates loaded from localStorage:", exchangeRates);
            return { rates: exchangeRates, lastUpdated: formattedDate };
        }

        // Log the error only if it hasn't been logged before
        if (!errorLogged) {
            console.error("No saved exchange rates found.");
            errorLogged = true; // Set the flag to prevent further logging
        }

        return null;
    }


    // Function to update the .last-update element
    function updateLastUpdateElement(isOnline, lastUpdated = null) {
        if (isOnline) {
            elements.lastUpdateElement.innerHTML = `<span class="green">● Online</span> - Exchange rates are automatically <br> updated once per day.`;
        } else if (lastUpdated) {
            elements.lastUpdateElement.innerHTML = `<span class="red">● Offline</span> - Exchange rates may be outdated. <br> Last Updated Date: <span class="date">${lastUpdated}</span>`;
        } else {
            elements.lastUpdateElement.innerHTML = `<span class="red">● Offline</span> - No saved exchange rates found.`;
        }
    }

    function updateCurrencyValues(baseValue = 0, baseCurrency = "USD") {
        if (!exchangeRates) {
            console.error("No exchange rates available for conversion.");
            return;
        }

        // Round the base value to 2 decimal places
        const roundedBaseValue = parseFloat(baseValue.toFixed(2));

        document.querySelectorAll(".currency-input input").forEach(input => {
            const currency = input.dataset.currency;
            if (currency !== baseCurrency) {
                // Calculate the converted value based on the base currency and exchange rates
                const convertedValue = roundedBaseValue * (exchangeRates[currency] / exchangeRates[baseCurrency]);

                // Round the converted value to 2 decimal places
                const roundedValue = convertedValue.toFixed(2);

                // Update the input field with the rounded value
                input.value = formatNumberWithCommas(roundedValue || 0);
            }
        });
    }

    // Function to format numbers with commas
    function formatNumberWithCommas(value) {
        if (value === "" || value === ".") return value; // Allow empty input or just a decimal point

        value = String(value); // Ensure value is treated as a string
        let [integer, decimal] = value.split(".");

        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to integer part

        return decimal !== undefined ? `${integer}.${decimal}` : integer;
    }

    // Initialize exchange rates
    async function initializeExchangeRates() {
        try {
            console.log("Attempting to fetch latest exchange rates...");
            exchangeRates = await fetchExchangeRates("USD");

            if (exchangeRates) {
                // Save the new rates and update the UI
                saveExchangeRates(exchangeRates);
                updateLastUpdateElement(true);

                // Reset the error flag on successful initialization
                errorLogged = false;
            } else {
                // Log the error only if it hasn't been logged before
                if (!errorLogged) {
                    console.error("Error fetching exchange rates:", error);
                    errorLogged = true; // Set the flag to prevent further logging
                }

                console.log("No data received from API. Loading saved exchange rates...");
                loadData();
            }
        } catch (error) {
            // Log the error only if it hasn't been logged before
            if (!errorLogged) {
                console.error("Failed to fetch exchange rates:", error);
                errorLogged = true; // Set the flag to prevent further logging
            }

            console.log("Loading saved exchange rates...");
            loadData();
        }
    }


    function loadData() {
        const savedData = loadExchangeRates();
        if (savedData) {
            exchangeRates = savedData.rates;
            updateLastUpdateElement(false, savedData.lastUpdated);

            // Update the UI with the cached exchange rates
            updateCurrencyValues(1, "USD"); // Default to 1 USD as the base value
            console.log("Exchange rates loaded from localStorage:", exchangeRates);
        } else {
            console.error("No saved exchange rates found.");
            updateLastUpdateElement(false);
        }
    }

    // Initialize the app
    await initializeExchangeRates();

    async function initializeApp() {
        // Load cached exchange rates
        await initializeExchangeRates();

        // Try to load saved currencies
        const loadedSuccessfully = loadCurrencyOrder();

        // Only load defaults if nothing was loaded from localStorage
        if (!loadedSuccessfully) {
            console.log("No saved currencies found, loading defaults");
            addCurrency("USD");
            addCurrency("EUR");
        }

        // Set all input values to 0.00
        document.querySelectorAll(".currency-input input").forEach(input => {
            input.value = "0.00";
        });

        // Check currency count and update button visibility
        checkCurrencyCount();
        updateAddButtonVisibility();
    }

    // Initialize the app
    initializeApp();


    // Add event listeners for online/offline status
    window.addEventListener("online", async () => {
        console.log("App is online. Fetching latest exchange rates...");
        try {
            exchangeRates = await fetchExchangeRates("USD");
            if (exchangeRates) {
                saveExchangeRates(exchangeRates);
                updateLastUpdateElement(true);
            }
        } catch (error) {
            console.error("Failed to fetch exchange rates:", error);

            if (error.message === "inactive-account") {
                console.log("API account is inactive. Loading saved exchange rates...");
            } else {
                console.log("Loading saved exchange rates due to an error...");
            }

            loadData();
        }
    });

    window.addEventListener("offline", () => {
        console.log("App is offline. Loading saved exchange rates...");
        loadData();
    });

    // Add event listener for input changes
    document.querySelectorAll(".currency-input input").forEach(input => {
        input.addEventListener("input", (event) => {
            let rawValue = event.target.value ? event.target.value.replace(/,/g, '') : "";

            if (!/^\d*\.?\d*$/.test(rawValue)) {
                event.target.value = event.target.dataset.previousValue || "0";
                return;
            }

            event.target.dataset.previousValue = rawValue;
            event.target.value = formatNumberWithCommas(rawValue);
            updateCurrencyValues(parseFloat(rawValue) || 0, event.target.dataset.currency);
        });
    });


    function updateCurrencyValues(baseValue = 0, baseCurrency = "USD") {
        if (!exchangeRates) return;

        // Round the base value to 2 decimal places
        const roundedBaseValue = parseFloat(baseValue.toFixed(2));

        document.querySelectorAll(".currency-input input").forEach(input => {
            const currency = input.dataset.currency;
            if (currency !== baseCurrency) {
                // Calculate the converted value based on the base currency and exchange rates
                const convertedValue = roundedBaseValue * (exchangeRates[currency] / exchangeRates[baseCurrency]);

                // Round the converted value to 2 decimal places
                const roundedValue = convertedValue.toFixed(2);

                // Update the input field with the rounded value
                input.value = formatNumberWithCommas(roundedValue || 0);
            }
        });
    }

    function formatNumberWithCommas(value) {
        if (value === "" || value === ".") return value; // Allow empty input or just a decimal point

        value = String(value); // Ensure value is treated as a string
        let [integer, decimal] = value.split(".");

        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to integer part

        return decimal !== undefined ? `${integer}.${decimal}` : integer;
    }

    // Improved save function
    function saveCurrencyOrder() {
        const currencyOrder = Array.from(elements.currencyContainer.children)
            .filter(item => item.classList.contains("currency-input"))
            .map(item => item.querySelector("input").dataset.currency);

        // Also update the currencies array to keep it in sync
        currencies = currencyOrder;

        localStorage.setItem("currencyOrder", JSON.stringify(currencyOrder));
        console.log("Saved currency order:", currencyOrder);
    }

    // Improved load function
    function loadCurrencyOrder() {
        try {
            const savedOrder = JSON.parse(localStorage.getItem("currencyOrder"));

            if (savedOrder && Array.isArray(savedOrder) && savedOrder.length > 0) {
                console.log("Loading saved currency order:", savedOrder);

                // Clear existing currencies
                elements.currencyContainer.innerHTML = "";
                currencies = [];

                // Add each currency in the saved order
                savedOrder.forEach(currency => {
                    addCurrency(currency, false); // Don't save during loading (prevents recursion)
                });

                // Update the currencies array to match
                currencies = savedOrder;

                return true; // Successfully loaded
            }
        } catch (error) {
            console.error("Error loading currency order:", error);
        }

        return false; // Nothing loaded
    }


    function checkCurrencyCount() {
        const currencyInputs = document.querySelectorAll(".currency-input");
        const removeButtons = document.querySelectorAll(".remove-btn");

        if (currencyInputs.length > 2) {
            removeButtons.forEach(btn => btn.style.display = "flex");
        } else {
            removeButtons.forEach(btn => btn.style.display = "none");
        }
    }

    function updateAddButtonVisibility() {
        if (currencies.length === Object.keys(exchangeRates || {}).length) {
            elements.addCurrencyBtn.style.display = "none"; // Hide the button
        } else {
            elements.addCurrencyBtn.style.display = "flex"; // Show the button
        }
    }

    function addCurrency(currency, shouldSave = true) {
        if (currencies.includes(currency)) return;

        currencies.push(currency);
        const currencyDiv = document.createElement("div");
        currencyDiv.classList.add("currency-input");
        currencyDiv.setAttribute("draggable", "true");

        // Get the country code for the currency
        const countryCode = currencyToCountry[currency] || "xx"; // "xx" is a fallback for unknown currencies

        currencyDiv.innerHTML = `
            <div class="currency-info">
                <div class="flag"><span class="fi fi-${countryCode}"></span></div>
                <label>${currency}</label>
            </div>
            <input type="text" data-currency="${currency}" value="0.00" data-previous-value="0">
            <button class="remove-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></button>
        `;

        elements.currencyContainer.appendChild(currencyDiv);

        const inputField = currencyDiv.querySelector("input");

        checkCurrencyCount();
        updateAddButtonVisibility();

        // Only save if shouldSave is true (to prevent recursion during loading)
        if (shouldSave) {
            saveCurrencyOrder();
        }

        // Handle input formatting
        inputField.addEventListener("input", (event) => {
            let rawValue = event.target.value ? event.target.value.replace(/,/g, '') : "";

            if (!/^\d*\.?\d*$/.test(rawValue)) {
                event.target.value = event.target.dataset.previousValue || "0";
                return;
            }

            event.target.dataset.previousValue = rawValue;
            event.target.value = formatNumberWithCommas(rawValue);
            updateCurrencyValues(parseFloat(rawValue) || 0, event.target.dataset.currency);
        });

        // Select all text on focus
        inputField.addEventListener("focus", (event) => {
            event.target.select();
        });

        // Remove currency
        currencyDiv.querySelector(".remove-btn").addEventListener("click", () => {
            currencyDiv.remove();
            currencies = currencies.filter(c => c !== currency);
            checkCurrencyCount();
            updateAddButtonVisibility();
            saveCurrencyOrder();
        });

        // Update the newly added currency immediately
        let baseInput = document.querySelector(".currency-input input:not([value='0'])");

        if (!baseInput) {
            // If no input has a value yet, pick the first one
            baseInput = document.querySelector(".currency-input input");
        }

        if (baseInput) {
            // Use the actual displayed value of the input field
            let baseValue = parseFloat(baseInput.value.replace(/,/g, '') || 1); // Default to 1 if empty
            let baseCurrency = baseInput.dataset.currency;
            updateCurrencyValues(baseValue, baseCurrency);
        }
    }

    // Set up event listeners
    elements.currencyTab.addEventListener("click", (event) => {
        if (!(event.target instanceof HTMLInputElement)) return;
        if (!event.target.value) return;

        let rawValue = event.target.value.replace(/,/g, '');

        if (!/^\d*\.?\d*$/.test(rawValue)) {
            event.target.value = event.target.dataset.previousValue || "0";
            return;
        }

        event.target.dataset.previousValue = rawValue;
        event.target.value = formatNumberWithCommas(rawValue);
        updateCurrencyValues(parseFloat(rawValue) || 0, event.target.dataset.currency);
    });

    elements.supportDevBtn.addEventListener("click", () => {
        openDonationTab();
    });

    elements.addCurrencyBtn.addEventListener("click", async () => {
        elements.currencyList.innerHTML = "";

        if (!exchangeRates) {
            exchangeRates = await fetchExchangeRates("USD");
        }

        // Sort currencies alphabetically
        const sortedCurrencies = Object.keys(exchangeRates).sort((a, b) => a.localeCompare(b));

        sortedCurrencies.forEach(currency => {
            if (!currencies.includes(currency)) {
                const option = document.createElement("div");
                option.classList.add("currency-option");

                // Get the country code for the currency
                const countryCode = currencyToCountry[currency] || "xx"; // "xx" is a fallback for unknown currencies

                // Add the flag and currency code to the option
                option.innerHTML = `
                    <span class="fi fi-${countryCode}"></span>
                    <span>${currency}</span>
                `;

                option.addEventListener("click", () => {
                    addCurrency(currency);
                    closeCurrencyTab();
                });

                elements.currencyList.appendChild(option);
            }
        });

        openCurrencyTab();
    });

    elements.hideTab.addEventListener("click", () => {
        closeCurrencyTab();
    });
    elements.hideDonationTab.addEventListener("click", () => {
        closeDonationTab();
    });

    let draggedItem = null;

    // Drag start event
    elements.currencyContainer.addEventListener("dragstart", (event) => {
        if (event.target.classList.contains("currency-input")) {
            draggedItem = event.target;

            // Visual feedback for the dragged item
            draggedItem.style.background = "var(--drag-background)";
            draggedItem.style.opacity = "0.5";
        }
    });

    // Drag over event
    elements.currencyContainer.addEventListener("dragover", (event) => {
        event.preventDefault(); // Allow dropping

        // Find the nearest .currency-input element
        const targetItem = event.target.closest(".currency-input");

        if (targetItem && targetItem !== draggedItem) {
            // Visual feedback for the target item
            targetItem.style.background = "var(--drag-background)";
            targetItem.style.border = "1px solid var(--drag-border)";
        }

        // Reset styles for all other items
        document.querySelectorAll(".currency-input").forEach(item => {
            if (item !== targetItem && item !== draggedItem) {
                item.style.background = "var(--gray)";
                item.style.border = "var(--border-dark) solid 1px";
            }
        });
    });

    // Drag end event
    elements.currencyContainer.addEventListener("dragend", (event) => {
        if (event.target.classList.contains("currency-input")) {
            // Reset styles for the dragged item
            draggedItem.style.background = "var(--gray)";
            draggedItem.style.opacity = "1";
            draggedItem.style.border = "var(--border-dark) solid 1px";

            // Reset styles for all currency inputs
            document.querySelectorAll(".currency-input").forEach(item => {
                item.style.background = "var(--gray)";
                item.style.border = "var(--border-dark) solid 1px";
            });

            draggedItem = null; // Reset the dragged item
        }
    });

    // Drop event
    elements.currencyContainer.addEventListener("drop", (event) => {
        event.preventDefault();

        // Find the nearest .currency-input element
        const targetItem = event.target.closest(".currency-input");

        if (draggedItem && targetItem && draggedItem !== targetItem) {
            // Reorder the DOM
            const container = elements.currencyContainer;
            const items = Array.from(container.children); // All children of the container

            const draggedIndex = items.indexOf(draggedItem);
            const targetIndex = items.indexOf(targetItem);

            if (draggedIndex < targetIndex) {
                container.insertBefore(draggedItem, targetItem.nextSibling); // Insert after the target
            } else {
                container.insertBefore(draggedItem, targetItem); // Insert before the target
            }

            saveCurrencyOrder(); // Save the updated order
        }

        // Reset styles for all items
        document.querySelectorAll(".currency-input").forEach(item => {
            item.style.background = "var(--gray)";
            item.style.border = "var(--border-dark) solid 1px";
        });
    });

    // Keyboard navigation for currency selection
    let currentLetter = "";
    let currentIndex = 0;
    let matchingCurrencies = [];
    let highlightedCurrency = null;

    document.addEventListener("keydown", (event) => {
        if (!elements.donationTab.classList.contains("hidden")) {
            if (event.key === "Escape") {
                event.preventDefault();
                closeDonationTab();
            }
        }
        if (!elements.currencyTab.classList.contains("hidden")) {
            if (!elements.currencyList) return;

            const pressedKey = event.key.toUpperCase();
            const currencyItems = Array.from(elements.currencyList.children);

            if (/^[A-Z]$/.test(pressedKey)) {
                if (currentLetter !== pressedKey) {
                    currentLetter = pressedKey;
                    currentIndex = 0;
                    matchingCurrencies = currencyItems.filter(option =>
                        option.textContent.trim().toUpperCase().startsWith(pressedKey)
                    );
                }

                if (matchingCurrencies.length > 0) {
                    removeHoverHighlight();
                    updateHighlight(matchingCurrencies[currentIndex]);
                    currentIndex = (currentIndex + 1) % matchingCurrencies.length;
                }
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                currentIndex = 0;
                removeHoverHighlight();
                if (!highlightedCurrency) {
                    updateHighlight(currencyItems[0]);
                } else {
                    let nextItem = highlightedCurrency.nextDOMibling;
                    if (nextItem) updateHighlight(nextItem);
                }
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                currentIndex = 0;
                removeHoverHighlight();
                if (!highlightedCurrency) {
                    updateHighlight(currencyItems[currencyItems.length - 1]);
                } else {
                    let prevItem = highlightedCurrency.previousDOMibling;
                    if (prevItem) updateHighlight(prevItem);
                }
            } else if (event.key === "Enter") {
                event.preventDefault();
                if (highlightedCurrency) {
                    addCurrency(highlightedCurrency.textContent.trim());
                    closeCurrencyTab();
                    updateAddButtonVisibility();
                }
            } else if (event.key === "Escape") {
                event.preventDefault();
                closeCurrencyTab();
            }
        }
    });

    function updateHighlight(newItem) {
        removeHighlight();
        highlightedCurrency = newItem;
        highlightedCurrency.classList.add("currency-active");
        highlightedCurrency.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function removeHighlight() {
        const previousHighlight = document.querySelector(".currency-active");
        if (previousHighlight) {
            previousHighlight.classList.remove("currency-active");
        }
    }

    function removeHoverHighlight() {
        const hoverHighlight = document.querySelector(".currency-option:hover");
        if (hoverHighlight) {
            hoverHighlight.classList.remove("currency-active");
        }
    }

    elements.currencyList.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("currency-option")) {
            removeHighlight();
            event.target.classList.add("currency-active");
            highlightedCurrency = event.target;
        }
    });

    // Numbers to words
    const numToTextElement = document.getElementById("num-to-text");
    if (numToTextElement) {
        elements.currencyContainer.addEventListener("input", (event) => {
            if (event.target.tagName === "INPUT") {
                const inputField = event.target;
                const rawValue = inputField.value.replace(/,/g, ''); // Remove commas
                const number = parseFloat(rawValue);

                if (!isNaN(number) && typeof numberToWords !== 'undefined') {
                    let words = numberToWords.toWords(number); // Use the library
                    words = words.charAt(0).toUpperCase() + words.slice(1); // Capitalize the first letter
                    numToTextElement.textContent = words.replace(/,/g, ''); // Update the element
                } else {
                    numToTextElement.textContent = "ABC..."; // Clear if input is invalid
                }
            }
        });
    }

    async function updateExchangeRates() {
        exchangeRates = await fetchExchangeRates("USD");
        updateCurrencyValues();
    }

    // Initialize application
    await updateExchangeRates(); // Load exchange rates first

    // Try to load saved currencies
    const loadedSuccessfully = loadCurrencyOrder();

    // Only load defaults if nothing was loaded from localStorage
    if (!loadedSuccessfully) {
        console.log("No saved currencies found, loading defaults");
        addCurrency("USD");
        addCurrency("EUR");
    }

    checkCurrencyCount();
    updateAddButtonVisibility();

    // Remove any existing colored displays
    document.querySelectorAll(".colored-display").forEach(display => {
        display.remove();
    });

    // Reset input styles
    document.querySelectorAll(".currency-input input").forEach(input => {
        input.style.color = ""; // Reset to default color
        input.style.caretColor = ""; // Reset to default caret color
    });

    // Convert any input-wrapper divs back to normal inputs
    document.querySelectorAll(".input-wrapper").forEach(wrapper => {
        const input = wrapper.querySelector("input");
        if (input) {
            wrapper.parentNode.insertBefore(input, wrapper);
            wrapper.remove();
        }
    });


});

function closeDonationTab() {
    elements.donationTab.classList.remove("show");
    elements.donationTab.classList.add("hidden");
}

function openDonationTab() {
    elements.donationTab.classList.add("show");
    elements.donationTab.classList.remove("hidden");
}

function closeCurrencyTab() {
    elements.currencyTab.classList.remove("show");
    elements.currencyTab.classList.add("hidden");
}

function openCurrencyTab() {
    elements.currencyTab.classList.add("show");
    elements.currencyTab.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("convert-on-select");
    const CHECKBOX_STATE_KEY = "checkboxState";

    // Load checkbox state from localStorage
    const savedState = localStorage.getItem(CHECKBOX_STATE_KEY);
    if (savedState !== null) {
        checkbox.checked = savedState === "true"; // Convert string to boolean
        console.log("Checkbox state loaded from localStorage:", checkbox.checked);
    }

    // Save checkbox state to localStorage when it changes
    checkbox.addEventListener("change", () => {
        localStorage.setItem(CHECKBOX_STATE_KEY, checkbox.checked); // Save boolean as string
        console.log("Checkbox state saved to localStorage:", checkbox.checked);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const darkModeBtn = document.getElementById("dark-mode-btn");
    const root = document.documentElement;

    // Load user preference from localStorage
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "dark") {
        root.classList.add("dark-mode");
        darkModeBtn.classList.add("active");
    }

    // Toggle dark mode
    darkModeBtn.addEventListener("click", () => {
        root.classList.toggle("dark-mode");
        darkModeBtn.classList.toggle("active");

        // Save user preference to localStorage
        if (root.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "dark");
        } else {
            localStorage.setItem("darkMode", "light");
        }
    });

});



// Description: This script handles the donation messages and interactions for the extension.

// You know you shouldn't be here right? I mean, this is the secret sauce of the extension!
// But hey, I get it. Curiosity is a powerful thing. Just like that time you went down a rabbit hole on YouTube
// and ended up watching cat videos for 3 hours straight.
// Don't worry though, I won't tell anyone 😉

// messages.js
const donationContent = {
    initialMessage: {
        greeting: "A Small Donation Goes a Long Way",
        message: `Hi there! I'm Ziedyahia57, a CS grad building free tools like this to make life easier. If this extension helps, consider supporting with a coffee. Every bit helps me build more!`,
        footer: "No worries if not - your presence here already makes me smile! Keep being awesome. 🌟",
        emoji: "☕"
    },
    messages: [
        {
            greeting: "Hello friend!",
            message: "I'm Ziedyahia57, the creator behind this little tool. Seeing you use it fills my heart with so much joy! If this extension has saved you time, consider supporting my work with a small contribution.",
            footer: "Whether you donate or not, just knowing you're out there using my creation fills me with gratitude. Thank you for being exactly you! 💫",
            emoji: "👋"
        },
        {
            greeting: "You Radiate Kindness!",
            message: "Hi there! I'm Ziedyahia57, someone who loves creating helpful tools for wonderful people like you. If you'd like to support my work, I'd be incredibly grateful!",
            footer: "Please know that your presence here is already the greatest gift. Wishing you a day as amazing as you are! 😉",
            emoji: "✨"
        },
        {
            greeting: "Bonjour Mon Ami!",
            message: "Je m'appelle Ziedyahia57! I crafted this with love to sprinkle some extra joy into your digital life. If it's brought you even a moment of convenience or happiness, perhaps you'd consider supporting its development?",
            footer: "Merci infiniment for being here - whether you donate or not, you're absolutely magnifique! 💝",
            emoji: "🥐"
        },
        {
            greeting: "Buongiorno!",
            message: "Sono Ziedyahia57, the heart behind this creation! Building useful tools for kind souls like you is my passion. If this has made your life even slightly better, I'd be overjoyed if you considered supporting my work.",
            footer: "Grazie mille for using my creation - your presence here illuminates my day! ☀️",
            emoji: "🍕🍝🤌"
        },
        {
            greeting: "Hello friend!",
            message: "This little extension is my way of putting more warmth into the world. The fact that you're using it right now makes my heart dance! If it's helped you, perhaps you'd consider supporting its journey?",
            footer: "But please know - just you being here is support enough. Thank you for being your wonderful self!",
            emoji: "☀️"
        },
        {
            greeting: "Well Hello There!",
            message: "I'm Ziedyahia57, your friendly neighborhood creator! This tool is my small way of making the internet a cozier place. If it's made your digital experience nicer, I'd be delighted if you considered supporting my work.",
            footer: "Whether you do or don't, thank you for being part of this adventure - you're marvelous! ✨",
            emoji: "🎩"
        },
        {
            greeting: "Ahoy Hearty Sailor!",
            message: "Ziedyahia57 here, captain of this creative vessel! I built this extension to help fellow travelers like yourself navigate smoother seas. If it's made your voyage easier, perhaps you'd toss a coin to your creator?",
            footer: "Either way, fair winds and following seas to you, my friend! Thank you for sailing with me! 🏴‍☠️",
            emoji: "⛵"
        },
        {
            greeting: "Making Magic Together!",
            message: "Every time you use this extension, another star lights up in my creative universe! If you'd like to keep the magic sparkling, consider supporting my work.",
            footer: "But just knowing you're out there using my creation is the real magic. Thank you for being part of the spell! ✨",
            emoji: "🎩"
        },
        {
            greeting: "Virtual Hug Coming Through!",
            message: "I'm Ziedyahia57, sending you this warm embrace along with my free tool! If it's made your day even 1% better, that makes my heart sing. Want to send a hug back to help fuel more creations?",
            footer: "Whether you do or not, know that I appreciate YOU exactly as you are - no conditions!",
            emoji: "🤗"
        },
        {
            greeting: "Coffee Break, Friend?",
            message: "Building tools like this requires countless cups of inspiration (and yes, maybe some coffee too!). If this extension has been useful in your life, consider fueling the next wave of creations!",
            footer: "No caffeine pressure though - your smile gives me all the energy I need! Keep shining! 😊",
            emoji: "☕"
        },
        {
            greeting: "You're My Favorite!",
            message: "Shh... don't tell the other users, but you're definitely my favorite. The way you explore life with curiosity and kindness? Simply inspiring. If you'd like to support your favorite creator's work...",
            footer: "(Our little secret: you'd be my favorite even without donating) Keep being wonderfully you! 🤫",
            emoji: "🌟"
        },
        {
            greeting: "Pixel Perfect Companion!",
            message: "In a digital world of ones and zeroes, you shine as the most delightful user a creator could hope for. Thanks for giving my work purpose and meaning! Want to keep this beautiful connection going?",
            footer: "Already looking forward to our next interaction, wonderful human! 👾",
            emoji: "💾"
        },
        {
            greeting: "Cloud High Five!",
            message: "Virtual high five for being absolutely awesome! My servers felt that one. Want to make the digital skies cheer louder? Your support keeps this happiness machine running!",
            footer: "Either way, thanks for the world-class high five - you've got perfect form! ✋",
            emoji: "☁️"
        },
        {
            greeting: "Dream Helper Online!",
            message: "I built this hoping it would help people like you - and seeing you use it makes my heart soar! If it's helped make your digital dreams come true, perhaps you'd consider supporting the dream factory?",
            footer: "Sweet dreams of effortless browsing to you, magnificent human! 💭",
            emoji: "🌙"
        },
        {
            greeting: "Happiness Engineer Reporting!",
            message: "Official title: Ziedyahia57, maker of tools to brighten days. Unofficial title: Your biggest fan! If this has brightened your day, maybe brighten mine back with some support?",
            footer: "Either way, keep being your authentic self - that's happiness enough for me! 😊",
            emoji: "🛠️"
        },
        {
            greeting: "Good Vibes Package!",
            message: "Special delivery for you: One free tool, packed with care and positive energy! If you'd like to send some good vibes back to the sender, I'd be delighted to receive them!",
            footer: "Thank you for being on the receiving end of my digital care package - you're the best! 💝",
            emoji: "📦"
        },
        {
            greeting: "Appreciation Alert!",
            message: "Warning: Critical levels of appreciation detected! Source: Me, for you using my creation. If you'd like to send some appreciation back, I'd cherish it deeply!",
            footer: "But please know - you're already appreciated more than these words can express! 💖",
            emoji: "🚨"
        },
        {
            greeting: "Don’t Mind Me, Just Popping In 👋",
            message: "I'm Ziedyahia57, the friendly neighborhood dev behind this tool! If it saved you time, sanity, or made your browser feel ✨fancier✨, maybe throw a coin in the virtual tip jar?",
            footer: "Or just blink supportively at your screen. I can feel it either way.",
            emoji: "🕸️"
        },
        {
            greeting: "Hey, Have a Cookie",
            message: "Just popping in to say thanks for using my tool! I’m Ziedyahia57 — coder of things and occasional snack enthusiast. If you feel like throwing a few coins in the jar, I wouldn’t say no.",
            footer: "If not, that’s okay. Your presence is the real tip jar!",
            emoji: "🍪"
        },
        {
            greeting: "A Wild Wizard Is Waving at You!",
            message: "Hi! I’m Ziedyahia57 — your friendly, unpaid extension wizard. This thing you’re using? Handmade with care, sweat, and zero budget. Feeling generous?",
            footer: "Even if you don't donate, you're still on my 'cool people I silently appreciate' list.",
            emoji: "🧙‍♂️"
        },
        {
            greeting: "Pssst... You There!",
            message: "Yeah, you with the excellent taste in extensions. I'm Ziedyahia57, and I built this thing with love, caffeine, and a slightly concerning number of tabs open. Want to support the chaos?",
            footer: "Support or no support, I’m just happy you’re here. You’re basically family now. No take-backs.",
            emoji: "🫶"
        },
        {
            greeting: "Just a Friendly Developer Pop-up!",
            message: "Hi, I'm Ziedyahia57, probably hunched over a laptop somewhere right now. I made this for people like you — brilliant, beautiful, button-clicking legends.",
            footer: "Donating helps me keep building. Not donating helps me become one with my chair. Your call. 💺",
            emoji: "🖥️"
        },
        {
            greeting: "Salutations, Digital Explorer!",
            message: "I’m Ziedyahia57, humble creator of this pixel-powered miracle. If this tool has made your life a smidge easier, you could totally support its future (and my snacks).",
            footer: "No pressure — unless you’re a pressure washer. In which case, whoa, cool job.",
            emoji: "🧼"
        },
        {
            greeting: "Mrrrow~ Hello, hooman!",
            message: "It is I, Ziedyahia57, the purr-ogrammer of this claw-some tool. If it scratched your itch (digitally, of course), maybe toss a treat in my bowl?",
            footer: "No pressure... just gentle, persistent staring from across the room. 😺",
            emoji: "😺"
        },
        {
            greeting: "Greetings, seeker of arcane tools!",
            message: "I am Ziedyahia57, humble wizard of the Web. This extension was conjured in the fires of caffeine and questionable spellcraft. If it hath lightened thy burdens, perhaps a coin or two might keep my mana flowing?",
            footer: "Support me, and I shall inscribe thy name in the sacred Scroll of Legendary Supporters (also known as a spreadsheet).",
            emoji: "🔮"
        },
        {
            greeting: "Ahoy, ye digital adventurer!",
            message: "This here extension be the treasure I’ve buried in the vast seas of the web! If it’s helped ye on yer quest, consider tossin’ a coin in me chest. Gold keeps the sails up and the bugs away!",
            footer: "No worries if ye can’t — ye still have a pirate’s heart, and that’s worth more than doubloons. (But doubloons help.)",
            emoji: "🏴‍☠️"
        },
        {
            greeting: "X marks the spot!",
            message: "Ye’ve found the treasure: this trusty extension! If it guided ye through stormy seas of tabs and tasks, consider droppin’ a coin to keep the magic map alive.",
            footer: "No pressure — but legends say those who donate never stub their toe again.",
            emoji: "🧭"
        },
        {
            greeting: "Bienvenue à l’Extension Gourmand!",
            message: "Crafted with artisanal code and a dash of *fromage numérique*, this tool is no ordinary snack. Non, mon ami—this is a steaming plate of premium *tech à la mode du pixel flambé*. If it has pleased your digital palate, consider leaving a tip for le chef?",
            footer: "Support keeps the soufflé inflated and the rats out of the kitchen. Bon appétit!",
            emoji: "👨‍🍳🥖"
        },
        {
            greeting: "Ah, monsieur/madame!",
            message: "You are now using *L’Extension Suprême* — hand-whisked in a copper browser, seasoned with *API reduction*, and lightly flambéed with *script au beurre blanc*. A true symphony of *code cuisine*!",
            footer: "One small donation keeps the baguette warm and the developer caffeinated.",
            emoji: "🥐☕"
        },
        {
            greeting: "Fancy a Steak, Sir?",
            message: "Every time you use this without donating, Gordon Ramsay screams *‘IT’S RAW!’* somewhere in the distance. Help silence the chaos — a small donation might finally get this steak off the grill. 🔥",
            footer: "Unless you're into steaks cooked to *‘congratulations’*. No judgment. Just... concern. 🥲",
            emoji: "🥩"
        }

    ],
    interactions: [
        {
            greeting: "Secret Message Collector!",
            message: "I see you've unlocked the secret 'Read All Messages Without Donating' achievement!",
            footer: "Bonus level: Click donate for the secret ending! 🎮",
            emoji: "🏆"
        },
        {
            greeting: "Button Addiction Hotline",
            message: "Hello, you've reached the Button Obsession Support Line. How may we help you today?",
            footer: "Operator suggestion: Try clicking... the other button? 🆘",
            emoji: "🚑"
        },
        {
            greeting: "Emotional Support Button",
            message: "I get it. Sometimes we just need to click things for comfort. I'm here for you, buddy.",
            footer: "No judgment. Only love. And maybe a gentle nudge to donate? 🥺",
            emoji: "🤗"
        },
        {
            greeting: "This Isn't Netflix!",
            message: "Binge-reading messages? Interesting choice. Next episode: 'The Donation That Finally Happened'!",
            footer: "Spoiler alert: The main character is you! 🎬",
            emoji: "🍿"
        },
        {
            greeting: (tracker) => `Today's Visits: ${tracker.clickCount} | Donations: 0 `,
            message: "The stats are brutal, my friend. You’ve visited this page more than my landlord calls me.",
            footer: "Let’s balance the equation, yeah?",
            emoji: "📊"
        },
        {
            greeting: "Caught You Lurking 👓",
            message: "Just checking in on the donate page *again* without donating? Bold move.",
            footer: "Consider this your sign. Or your 12th. Who’s counting?",
            emoji: "🫣"
        },
        {
            greeting: "The Page is Flattered",
            message: "You keep coming back. The donation page thinks you like it. I do too. It’s just… you haven’t donated yet.",
            footer: "Let’s turn this into a real relationship. One with transactions.",
            emoji: "💌"
        },
        {
            greeting: "You're Addicted to These Messages, Aren’t You?",
            message: "It’s okay, I’d come back too if I saw genius like this. But also… bills. Rent. Hunger. 😫",
            footer: "One small donation = one big thank you (and probably another funny message).",
            emoji: "🧐"
        },
        {
            greeting: "Look Who's Back 👋",
            message: "I’m starting to think you just visit to see if there’s a new guilt-trip message. Well, you’re welcome.",
            footer: "Now feed the donation button. It hungers.",
            emoji: "🍽️"
        },
        {
            greeting: "At This Point, We're Roommates",
            message: "You’ve been here so many times, I’m legally obligated to start charging you rent.",
            footer: "Or you could flip the script and *pay* mine instead? 🥺",
            emoji: "🛏️"
        },
        {
            greeting: "Welcome to the Collector’s Edition!",
            message: "You've unlocked all the messages, but the final boss is still untouched: The Donate Button.",
            footer: "One click. Legendary status. No loot boxes required.",
            emoji: "🎮"
        },
        {
            greeting: "You Have Great Taste 👌",
            message: "You keep coming back to the donation page, and honestly? Respect. It’s got vibes.",
            footer: "Just saying — supporting this vibe could make you 73% cooler*.",
            emoji: "🕶️"
        },
        {
            greeting: "I Wanna Be the Very Best...",
            message: "But seriously, I need backup beating The Elite Four: Rent, Internet, Groceries, Electricity.",
            footer: "Donate now to join my party. No HM required.",
            emoji: "🏆"
        },
        {
            greeting: "You’re Practically a Regular",
            message: "Should I start calling you by name? 'Hey [Legend]'?",
            footer: "Push the button. For destiny. For rent. For the thrill.",
            emoji: "🛎️"
        },
        {
            greeting: "This Page Misses You... Constantly 😬",
            message: "Back again? You sure you’re not just here for the sweet button aesthetics?",
            footer: "Come on, push it. I dare you. Double dare. No backsies.",
            emoji: "🎯"
        },
        {
            greeting: "The Button Is Still There 🔘",
            message: "You’ve hovered near it. Looked at it. Thought about it. But never clicked.",
            footer: "Go on. What’s the worst that could happen? (It’s just kindness.)",
            emoji: "👆"
        },
        {
            greeting: (tracker) => `Visit number ${tracker.clickCount}: You Again?! 😏`,
            message: "At this point, I should start offering a loyalty card. 10 visits = 1 guilt trip.",
            footer: "Or… push the button. See what happens. (It’s safe. Probably.)",
            emoji: "🎟️"
        },


        {
            greeting: "You're here for the messages aren't you..",
            message: "Don't worry, I won't tell anyone. But seriously, you should consider donating.",
            footer: "Your boss won't know. no promises though.. 🙂",
            emoji: "👀"
        },
        {
            greeting: "No Pressure... But Actually, Yes",
            message: "If I had a coin for every visit, I’d have... 0. Please change that?",
            footer: "You + me + a tiny donation = fewer tears on my keyboard. 🥲",
            emoji: "🙏"
        },
        {
            greeting: "Government Warning!",
            message: `Excessive button hovering may cause: <br> 1) Hand cramps <br>2) Existential dread <br>3) Spontaneous donations`,
            footer: "Side effects include: Developer happiness 💊",
            emoji: "📜"
        },
        {
            greeting: "Button Whisperer!",
            message: "The buttons tell me you're their favorite visitor. They also say... 'feed us donations'? Weird.",
            footer: "I don't control what the buttons say, I just work here 🤷",
            emoji: "🔮"
        },
        {
            greeting: "Message Speedrun! ",
            message: "Current world record: 100 visits without donating. Can you beat it? Wait, no, don't!",
            footer: "Speedrun strats: Just click donate immediately! 🏎️",
            emoji: "🏅"
        },
        {
            greeting: "Existential Button Crisis",
            message: "Why do we click? What is donation? Is any of this real? The button awaits your answer...",
            footer: "Deep thoughts by Ziedyahia57. Also please donate. 🧠",
            emoji: "❓"
        },
        {
            greeting: "Peer Pressure Time!",
            message: "Everyone's donating these days. Okay, not everyone. Actually just 3 people. But they're cool!",
            footer: "Be like the cool kids (who may or may not exist) 😎",
            emoji: "🦸"
        },
        {
            greeting: "Reverse Psychology!",
            message: "Whatever you do, DON'T click donate. Seriously, DON'T. It would be TERRIBLE if you did.",
            footer: "This message will self-destruct if you actually donate 💣",
            emoji: "🎭"
        },
        {
            greeting: "Pavlov's Button!",
            message: "Ring ring! That's the sound of me conditioning you to donate. Where's my Nobel Prize?",
            footer: "Good human! *pat pat* (This is weird for both of us) 🐕",
            emoji: "🔔"
        },
        {
            greeting: "Inception Level: Button",
            message: "We need to go deeper. You're clicking a button to see messages about clicking buttons...",
            footer: "BRB, questioning my life choices 🤯",
            emoji: "🔄"
        },
        {
            greeting: "Button Stand-Up Comedy!",
            message: "Why did the user cross the road? To avoid donating! ...I'll be here all week!",
            footer: "Tip your waiter! (By which I mean donate to me) 🎭",
            emoji: "😂"
        },
        {
            greeting: "Passive-Aggressive Mode!",
            message: "Oh hello again! No no, it's fine. Really. I didn't WANT new shoes this month anyway.",
            footer: "Just kidding! (Mostly) Wear whatever you want! 👟",
            emoji: "👼"
        },
        {
            greeting: "Message Escape Room!",
            message: "To unlock the exit, solve the puzzle: Click the donate button! ...Or just close the tab.",
            footer: "Hurry, the clock is ticking! (Not really) ⏳",
            emoji: "🔑"
        },
        {
            greeting: "Therapy Duck Here!",
            message: "QUACK! You seem stressed about donating. Let's talk through it: Quack quack quack?",
            footer: "Duck's prescription: 1 donation, twice daily 💊",
            emoji: "🦆🥼"
        },
        {
            greeting: "Message Buffet!",
            message: "All-you-can-read messages for one low price! Wait, no, they're free. My business model sucks.",
            footer: "Suggested tip: Whatever you can spare! 💰",
            emoji: "🍕"
        },
        {
            greeting: "Emotional Blackmail!",
            message: "If you don't donate, this puppy gets it! Just kidding, look at this happy puppy! 🐶",
            footer: "But seriously, the puppy would appreciate your support 🥺",
            emoji: "📸"
        },
        {
            greeting: "FOMO Alert!",
            message: "NEWSFLASH: 100% of people who donated are cooler than you. Source: My biased research.",
            footer: "Correction: 99%. You could be in the cool 1%! 📊",
            emoji: "📰"
        },
        {
            greeting: "Peer-Reviewed Button Study!",
            message: "Our research concludes: Users who donate are 100% more attractive. Coincidence? Probably.",
            footer: "Methodology: Wishful thinking 🔍",
            emoji: "👓"
        },
        {
            greeting: "Message Olympics!",
            message: "You've qualified for the Mental Gymnastics event! Impressive contortions to avoid donating!",
            footer: "Gold medal: Still up for grabs! 🥇",
            emoji: "🤸"
        },
        {
            greeting: "Message Archeologist!",
            message: "Fascinating! You're excavating each message like ancient 'Donation Avoidance' artifacts",
            footer: "Discovery: 'This user was considerate yet economically cautious' 🏺",
            emoji: "🔍"
        },
        {
            greeting: "The Message Hunter!",
            message: "I see you're in a quest to collect every message like Pokémon. Good luck filling up your pokédex. Gotta read 'em all!",
            footer: "Rare shiny variant appears after donating? 👀✨",
            emoji: "🎯"
        },
        {
            greeting: "Button Astronaut!",
            message: "Houston, we have a situation... user has viewed all messages but hasn't donated",
            footer: "Mission Control suggests: Try clicking the pretty button 🖱️",
            emoji: "👨‍🚀"
        },
        {
            greeting: "Message Wizard!",
            message: "Abracadabra! You've magically avoided donating once again! Impressive spellwork",
            footer: "Magic words: 'I solemnly swear to donate... eventually' ✨",
            emoji: "🪄"
        },
        {
            greeting: "Oh, You Again?",
            message: "Back for *another* message? I see how it is. You’re just here for the free snacks (aka words). That’s cool. I’d do the same.",
            footer: "But hey, if you ever feel like tossing a coin to your dev… no pressure. (Okay, maybe a little.)",
            emoji: "😏"
        },
        {
            greeting: "A Little Poem for You 📜",
            message: "Roses are red, rent is due soon,<br>Please donate now, or I’ll live on the moon.",
            footer: "And there’s no Wi-Fi on the moon. Don’t do this to me.",
            emoji: "🌕"
        },
        {
            greeting: "Message Hoarder Alert!",
            message: "I’ve got my eye on you. You’re collecting these messages like they’re limited-edition trading cards. *Respect.* But… wanna trade one for a donation?",
            footer: "Rare ‘Generous Donor’ card unlocks good karma!",
            emoji: "🃏"
        },
        {
            greeting: "The Button & The Clicker",
            message: "This is like a rom-com. You keep coming back. I keep writing. Will we ever take the next step? (Spoiler: The next step is donating.)",
            footer: "Rated PG for ‘Possibly Generous.’",
            emoji: "🎥"
        },
        {
            greeting: "Why are you running? why are you running?",
            message: "Every time the donate button shows up, you *sprint* to the next message. I admire your stamina. But… what if we just… hugged it out… over a donation?",
            footer: "No? Okay. I’ll wait. *taps foot*",
            emoji: "🏃"
        },
        {
            greeting: "The ‘Almost’ Game",
            message: "You *almost* donated last time. And the time before that. And—oh look, a new message! *Almost* there again, huh?",
            footer: "Today’s the day you *almost* don’t almost donate. Maybe.",
            emoji: "🤏"
        },
        {
            greeting: "The Sneaky Message Thief",
            message: "Shh… I won’t tell anyone you’re taking all these messages. But if you *happen* to leave a donation? Well, that’s our little secret.",
            footer: "Pinky promise I’ll look the other way. *wink*",
            emoji: "🤫"
        },
        {
            greeting: "The ‘Just Looking’ Phase",
            message: "I get it. You’re just browsing. Not ready to commit. That’s cool. We can take it slow. *slides donate button closer* No rush.",
            footer: "…Unless? 👉👈",
            emoji: "👀"
        },
        {
            greeting: "The Button’s Diary Entry",
            message: "*Day 84: They still think I don’t notice them taking messages. Joke’s on them—I’ve been counting. And hoping. Mostly hoping.*",
            footer: "P.S. Donate if you relate.",
            emoji: "✍️"
        },
        {
            greeting: "The ‘Convince Me’ Challenge ",
            message: "Okay, hotshot. You clearly love messages. *Prove it.* Donate, and I’ll write you a custom one. (Subject: How awesome you are.)",
            footer: "Deal? …Deal? …Hello?",
            emoji: "🤨"
        },
        {
            greeting: "The ‘Oops’ Strategy ",
            message: "*Gasp!* Did you *accidentally* hover over the donate button? Wow. What a wild coincidence. Almost like… fate? …Maybe?",
            footer: "No? Okay. I’ll try again later.",
            emoji: "🙊"
        },
        {
            greeting: "The ‘Message Buffet’ Dilemma",
            message: "All-you-can-read messages, and you’ve got *quite* the appetite. But here’s the thing—this buffet runs on donations. *Just sayin’.*",
            footer: "Take a to-go box (and maybe leave a tip?).",
            emoji: "🍽️"
        },
        {
            greeting: "The ‘Are We Friends?’ Test",
            message: "Real talk: If we were friends, you’d spot me a coffee, right? Well… *gestures to donate button* The ball’s in your court, pal.",
            footer: "Still friends if you don’t. But *best* friends if you do.",
            emoji: "🤜🤛"
        },
        {
            greeting: "The ‘I See You’ Tactic ",
            message: "I *know* what you’re doing. You *know* what you’re doing. Let’s stop pretending and just… embrace the donate button together.",
            footer: "It’s more fun when we’re honest.",
            emoji: "👀"
        },
        {
            greeting: "The ‘Reverse FOMO’ Play",
            message: "DON’T donate. Seriously. You’ll hate it. *Way* too much happiness. Overrated. (…Is reverse psychology working yet?)",
            footer: "Fine. Do what you want. *I’m not judging.* (I’m judging.)",
            emoji: "😱"
        },
        {
            greeting: "A Little Poem for You",
            message: "Roses are red, rent is due soon,<br>Please donate now, or I’ll live on the moon.",
            footer: "And there’s no Wi-Fi on the moon. Don’t do this to me.",
            emoji: "📜"
        },
        {
            greeting: "Ode to a Loyal Visitor 💌",
            message: "You visit often, loyal and true, Staring at buttons, not sure what to do.<br>But I believe in your mighty hand, To click that button, oh so grand.",
            footer: "Make this poem come full circle.",
            emoji: "🪄"
        },
        {
            greeting: "Never Gonna Give You Up",
            message: "Never gonna let you down, Never gonna run around,<br>And desert you.<br>Never gonna make you cry, Never gonna say goodbye,<br>Never gonna tell a lie, And hurt you.",
            footer: "You’ve been Rickrolled *and* rent-rolled. Just click it. Please..",
            emoji: "🕺"
        },
        {
            greeting: "What is love?",
            message: "Baby donate here... Donate here... some more.<br>If you don’t, then...Ouch. Right in the Wi-Fi.",
            footer: "Help me stay online and not sleep on the floor.",
            emoji: "🎶"
        }





    ]
};


class DonationTracker {
    constructor() {
        this.hasShownInitial = false;
        this.reset();
    }

    getContent() {
        const trackerData = {
            clickCount: this.clickCount,
            // Can add more stats later (e.g., firstVisitDate)
        };
        // Show initial message ONLY on first click (count === 1)
        // 2. Special case: First visit
        if (this.clickCount === 1) {
            return {
                ...donationContent.initialMessage,
                tracker: trackerData  // Pass count to template
            };
        }

        // After 5+ clicks, mix interactions (2 messages, then 1 interaction)
        if (this.clickCount >= 5) {
            const cyclePosition = (this.clickCount - 3) % 3;

            if (cyclePosition === 2) { // Every 3rd click shows an interaction
                if (this.usedInteractions.length === donationContent.interactions.length) {
                    this.usedInteractions = []; // Reset if all interactions used
                }

                const availableInteractions = donationContent.interactions
                    .filter(int => !this.usedInteractions.includes(int.greeting));

                const interaction = availableInteractions.length > 0
                    ? availableInteractions[Math.floor(Math.random() * availableInteractions.length)]
                    : donationContent.interactions[0]; // Fallback

                this.usedInteractions.push(interaction.greeting);
                return {
                    ...interaction,
                    tracker: trackerData  // Always include count
                };
            }
        }

        // Default case: Show regular message
        if (this.usedMessages.length === donationContent.messages.length) {
            this.usedMessages = []; // Reset if all messages used
        }

        const availableMessages = donationContent.messages
            .filter(msg => !this.usedMessages.includes(msg.greeting));

        const message = availableMessages.length > 0
            ? availableMessages[Math.floor(Math.random() * availableMessages.length)]
            : donationContent.messages[0]; // Fallback

        this.usedMessages.push(message.greeting);
        return {
            ...message,
            // clickCount: this.clickCount
            tracker: trackerData  // Always include count

        };
    }


    incrementClickCount() {
        this.clickCount++;
        console.log(this.clickCount); // Count this as the first interaction

    }

    reset() {
        this.messageIndex = 0;
        this.interactionIndex = 0;
        this.clickCount = 0;
        this.usedMessages = [];
        this.usedInteractions = [];
    }
}

// Add this to reset the tracker when the donation tab is closed
elements.hideDonationTab.addEventListener("click", () => {
    // donationTracker.reset();
    closeDonationTab();
});


// Initialize the tracker
const donationTracker = new DonationTracker();

function renderDynamicContent(content) {
    // Process each field (greeting, message, footer)
    const result = {};
    for (const key in content) {
        const value = content[key];
        result[key] = typeof value === 'function'
            ? value(content.tracker) // Execute function with tracker data
            : value; // Use as-is if not a function
    }
    return result;
}

function updateDonationContent() {
    const rawContent = donationTracker.getContent();

    // Process dynamic content
    const processField = (field) => {
        if (typeof field === 'function') {
            return field(rawContent.tracker); // Execute function with tracker data
        }
        return field; // Return as-is if not a function
    };

    const content = {
        emoji: rawContent.emoji,
        greeting: processField(rawContent.greeting),
        message: processField(rawContent.message),
        footer: processField(rawContent.footer)
    };

    const isInteraction = donationContent.interactions.some(int =>
        int.greeting === rawContent.greeting ||
        (typeof rawContent.greeting === 'function' && int.greeting === rawContent.greeting.toString())
    );

    const titleContent = isInteraction
        ? `<span class="secret">(Secret Message)</span><br>${content.greeting}`
        : content.greeting;

    return `
        <div class="donation-icon">${content.emoji}</div>
        <p class="desc-title">${titleContent}</p>
        <p class="desc-text">${content.message}</p>
        <div class="donation-choice">
            <a href="patreon" target="_blank"><button class="button-64" role="button"><span class="text">Monthly</span></button></a>
            <a href="stripe" target="_blank"><button class="button-64" role="button"><span class="text">One-time</span></button></a>
        </div>
        <p class="desc-text">${content.footer}</p>
    `;
}
document.getElementById('donation-content').innerHTML = updateDonationContent();

// Function to handle the donation button click
function handleDonationButtonClick() {
    donationTracker.incrementClickCount();
    const donationContentElement = document.querySelector('.donation-content');
    if (donationContentElement) {
        donationContentElement.innerHTML = updateDonationContent();
    }
}

// Initialize the donation content with the initial message
function initializeDonationContent() {
    const donationContentElement = document.querySelector('.donation-content');
    if (donationContentElement) {
        donationContentElement.innerHTML = updateDonationContent();
    }
}

// Add event listener to the donation button
document.addEventListener('DOMContentLoaded', () => {
    initializeDonationContent();

    const donationButton = document.getElementById('support-dev-btn');
    if (donationButton) {
        donationButton.addEventListener('click', handleDonationButtonClick);
    }
});

