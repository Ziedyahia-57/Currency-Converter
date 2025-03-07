// const API_KEY = "e8eab13facc49788d961a68e"; // Replace with your API key

const currencyTab = document.getElementById("currency-tab");
const currencyContainer = document.getElementById("currency-container");
const addCurrencyBtn = document.getElementById("add-currency-btn");
const currencyList = document.getElementById("currency-list");
const hideTab = document.getElementById("hide-tab");

const currencyToCountry = {
    AED: "ae", // United Arab Emirates
    AFN: "af", // Afghanistan
    ALL: "al", // Albania
    AMD: "am", // Armenia
    ANG: "cw", // Netherlands Antilles (Curaçao)
    AOA: "ao", // Angola
    ARS: "ar", // Argentina
    AUD: "au", // Australia
    AWG: "aw", // Aruba
    AZN: "az", // Azerbaijan
    BAM: "ba", // Bosnia and Herzegovina
    BBD: "bb", // Barbados
    BDT: "bd", // Bangladesh
    BGN: "bg", // Bulgaria
    BHD: "bh", // Bahrain
    BIF: "bi", // Burundi
    BMD: "bm", // Bermuda
    BND: "bn", // Brunei
    BOB: "bo", // Bolivia
    BRL: "br", // Brazil
    BSD: "bs", // Bahamas
    BTN: "bt", // Bhutan
    BWP: "bw", // Botswana
    BYN: "by", // Belarus
    BZD: "bz", // Belize
    CAD: "ca", // Canada
    CDF: "cd", // Democratic Republic of the Congo
    CHF: "ch", // Switzerland
    CLP: "cl", // Chile
    CNY: "cn", // China
    COP: "co", // Colombia
    CRC: "cr", // Costa Rica
    CUP: "cu", // Cuba
    CVE: "cv", // Cape Verde
    CZK: "cz", // Czech Republic
    DJF: "dj", // Djibouti
    DKK: "dk", // Denmark
    DOP: "do", // Dominican Republic
    DZD: "dz", // Algeria
    EGP: "eg", // Egypt
    ERN: "er", // Eritrea
    ETB: "et", // Ethiopia
    EUR: "eu", // European Union
    FJD: "fj", // Fiji
    FKP: "fk", // Falkland Islands
    FOK: "fo", // Faroe Islands
    GBP: "gb", // United Kingdom
    GEL: "ge", // Georgia
    GGP: "gg", // Guernsey
    GHS: "gh", // Ghana
    GIP: "gi", // Gibraltar
    GMD: "gm", // Gambia
    GNF: "gn", // Guinea
    GTQ: "gt", // Guatemala
    GYD: "gy", // Guyana
    HKD: "hk", // Hong Kong
    HNL: "hn", // Honduras
    HRK: "hr", // Croatia
    HTG: "ht", // Haiti
    HUF: "hu", // Hungary
    IDR: "id", // Indonesia
    ILS: "ps", // Palestine
    IMP: "im", // Isle of Man
    INR: "in", // India
    IQD: "iq", // Iraq
    IRR: "ir", // Iran
    ISK: "is", // Iceland
    JEP: "je", // Jersey
    JMD: "jm", // Jamaica
    JOD: "jo", // Jordan
    JPY: "jp", // Japan
    KES: "ke", // Kenya
    KGS: "kg", // Kyrgyzstan
    KHR: "kh", // Cambodia
    KID: "ki", // Kiribati
    KMF: "km", // Comoros
    KRW: "kr", // South Korea
    KWD: "kw", // Kuwait
    KYD: "ky", // Cayman Islands
    KZT: "kz", // Kazakhstan
    LAK: "la", // Laos
    LBP: "lb", // Lebanon
    LKR: "lk", // Sri Lanka
    LRD: "lr", // Liberia
    LSL: "ls", // Lesotho
    LYD: "ly", // Libya
    MAD: "ma", // Morocco
    MDL: "md", // Moldova
    MGA: "mg", // Madagascar
    MKD: "mk", // North Macedonia
    MMK: "mm", // Myanmar
    MNT: "mn", // Mongolia
    MOP: "mo", // Macau
    MRU: "mr", // Mauritania
    MUR: "mu", // Mauritius
    MVR: "mv", // Maldives
    MWK: "mw", // Malawi
    MXN: "mx", // Mexico
    MYR: "my", // Malaysia
    MZN: "mz", // Mozambique
    NAD: "na", // Namibia
    NGN: "ng", // Nigeria
    NIO: "ni", // Nicaragua
    NOK: "no", // Norway
    NPR: "np", // Nepal
    NZD: "nz", // New Zealand
    OMR: "om", // Oman
    PAB: "pa", // Panama
    PEN: "pe", // Peru
    PGK: "pg", // Papua New Guinea
    PHP: "ph", // Philippines
    PKR: "pk", // Pakistan
    PLN: "pl", // Poland
    PYG: "py", // Paraguay
    QAR: "qa", // Qatar
    RON: "ro", // Romania
    RSD: "rs", // Serbia
    RUB: "ru", // Russia
    RWF: "rw", // Rwanda
    SAR: "sa", // Saudi Arabia
    SBD: "sb", // Solomon Islands
    SCR: "sc", // Seychelles
    SDG: "sd", // Sudan
    SEK: "se", // Sweden
    SGD: "sg", // Singapore
    SHP: "sh", // Saint Helena
    SLE: "sl", // Sierra Leone
    SLL: "sl", // Sierra Leone
    SOS: "so", // Somalia
    SRD: "sr", // Suriname
    SSP: "ss", // South Sudan
    STN: "st", // São Tomé and Príncipe
    SYP: "sy", // Syria
    SZL: "sz", // Eswatini
    THB: "th", // Thailand
    TJS: "tj", // Tajikistan
    TMT: "tm", // Turkmenistan
    TND: "tn", // Tunisia
    TOP: "to", // Tonga
    TRY: "tr", // Turkey
    TTD: "tt", // Trinidad and Tobago
    TVD: "tv", // Tuvalu
    TWD: "tw", // Taiwan
    TZS: "tz", // Tanzania
    UAH: "ua", // Ukraine
    UGX: "ug", // Uganda
    USD: "us", // United States
    UYU: "uy", // Uruguay
    UZS: "uz", // Uzbekistan
    VES: "ve", // Venezuela
    VND: "vn", // Vietnam
    VUV: "vu", // Vanuatu
    WST: "ws", // Samoa
    XAF: "cm", // Central African CFA franc (Cameroon)
    XCD: "ag", // East Caribbean dollar (Antigua and Barbuda)
    XDR: "un", // Special Drawing Rights (United Nations)
    XOF: "bj", // West African CFA franc (Benin)
    XPF: "pf", // CFP franc (French Polynesia)
    YER: "ye", // Yemen
    ZAR: "za", // South Africa
    ZMW: "zm", // Zambia
    ZWL: "zw", // Zimbabwe
};

document.addEventListener("DOMContentLoaded", async () => {
    const lastUpdateElement = document.querySelector(".last-update");
    const CURRENCY_DATA_KEY = "currencyData";
    const LAST_UPDATED_KEY = "lastUpdated";

    let currencies = [];
    let exchangeRates = {};

    // Function to check if the app is truly online //🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
    // async function checkNetworkConnection() {
    //     try {
    //         // Use a lightweight request to check connectivity
    //         const response = await fetch("https://httpbin.org/get", { method: "HEAD", cache: "no-cache" });
    //         return response.ok; // True if the request succeeds
    //     } catch (error) {
    //         console.error("Network check failed:", error);
    //         return false; // False if the request fails
    //     }
    // }



    async function fetchExchangeRates(base = "USD") {
        try {
            //Use a CORS proxy to bypass CORS restrictions
            const proxyUrl = "https://api.allorigins.win/raw?url=";
            const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`;
            const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Check if the API returned an error (e.g., inactive account)
            if (data.result === "error") {
                throw new Error(data["error-type"] || "API error");
            }

            // Return the exchange rates if everything is OK
            return data.conversion_rates;
        } catch (error) {
            console.error("Error fetching exchange rates:", error);

            // If the error is due to an inactive account, log it and throw a specific error
            if (error.message === "inactive-account") {
                console.error("API account is inactive. Falling back to cached data.");
                throw new Error("inactive-account");
            }

            // For other errors, re-throw them
            throw error;
        }
    }

    // Function to save exchange rates and last updated date to localStorage
    function saveExchangeRates(rates) {
        if (rates) {
            localStorage.setItem(CURRENCY_DATA_KEY, JSON.stringify(rates));
            localStorage.setItem(LAST_UPDATED_KEY, new Date().toLocaleString());
            console.log("Exchange rates saved to localStorage.");
        }
    }

    // Function to load exchange rates and last updated date from localStorage
    function loadExchangeRates() {
        const savedRates = localStorage.getItem(CURRENCY_DATA_KEY);
        const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);

        if (savedRates && lastUpdated) {
            exchangeRates = JSON.parse(savedRates);
            console.log("Exchange rates loaded from localStorage:", exchangeRates);
            return { rates: exchangeRates, lastUpdated };
        }
        return null;
    }

    // Function to update the .last-update element
    function updateLastUpdateElement(isOnline, lastUpdated = null) {
        if (isOnline) {
            lastUpdateElement.innerHTML = `<span class="green">● Online</span> - Exchange rates are automatically <br> updated once per day.`;
        } else if (lastUpdated) {
            lastUpdateElement.innerHTML = `<span class="red">● Offline</span> - Exchange rates may be outdated. <br> Last Updated Date: <span class="date">${lastUpdated}</div>`;
        } else {
            lastUpdateElement.innerHTML = `<span class="red">● Offline</span> - No saved exchange rates found.`;
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
            } else {
                // If the API returns no data, fall back to saved rates
                console.log("No data received from API. Loading saved exchange rates...");
                loadData();
            }
        } catch (error) {
            // If the API request fails (e.g., inactive account or network error), load saved rates
            console.error("Failed to fetch exchange rates:", error);

            if (error.message === "inactive-account") {
                console.log("API account is inactive. Loading saved exchange rates...");
            } else {
                console.log("Loading saved exchange rates due to an error...");
            }

            loadData();
        }
    }

    // function loadData() {
    //     const savedData = loadExchangeRates();
    //     if (savedData) {
    //         exchangeRates = savedData.rates;
    //         updateLastUpdateElement(false, savedData.lastUpdated);
    //     } else {
    //         console.error("No saved exchange rates found.");
    //         updateLastUpdateElement(false);
    //     }
    // }

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
        const currencyOrder = Array.from(currencyContainer.children)
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
                currencyContainer.innerHTML = "";
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
            addCurrencyBtn.style.display = "none"; // Hide the button
        } else {
            addCurrencyBtn.style.display = "flex"; // Show the button
        }
    }

    function closeCurrencyTab() {
        currencyTab.classList.remove("show");
        currencyTab.classList.add("hidden");
    }

    function openCurrencyTab() {
        currencyTab.classList.add("show");
        currencyTab.classList.remove("hidden");
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

        currencyContainer.appendChild(currencyDiv);

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
    currencyTab.addEventListener("click", (event) => {
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

    // currencyContainer.addEventListener("focus", (event) => {
    //     if (event.target.tagName === "INPUT") {
    //         event.target.select(); //🔴 Select content on focus
    //     }
    // });

    addCurrencyBtn.addEventListener("click", async () => {
        currencyList.innerHTML = "";

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

                currencyList.appendChild(option);
            }
        });

        openCurrencyTab();
    });

    hideTab.addEventListener("click", () => {
        closeCurrencyTab();
    });

    let draggedItem = null;

    // Drag start event
    currencyContainer.addEventListener("dragstart", (event) => {
        if (event.target.classList.contains("currency-input")) {
            draggedItem = event.target;

            // Visual feedback for the dragged item
            draggedItem.style.background = "var(--drag-background)";
            draggedItem.style.opacity = "0.5";
        }
    });

    // Drag over event
    currencyContainer.addEventListener("dragover", (event) => {
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
    currencyContainer.addEventListener("dragend", (event) => {
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
    currencyContainer.addEventListener("drop", (event) => {
        event.preventDefault();

        // Find the nearest .currency-input element
        const targetItem = event.target.closest(".currency-input");

        if (draggedItem && targetItem && draggedItem !== targetItem) {
            // Reorder the elements
            const container = currencyContainer;
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
        if (!currencyTab.classList.contains("hidden")) {
            if (!currencyList) return;

            const pressedKey = event.key.toUpperCase();
            const currencyItems = Array.from(currencyList.children);

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
                    let nextItem = highlightedCurrency.nextElementSibling;
                    if (nextItem) updateHighlight(nextItem);
                }
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                currentIndex = 0;
                removeHoverHighlight();
                if (!highlightedCurrency) {
                    updateHighlight(currencyItems[currencyItems.length - 1]);
                } else {
                    let prevItem = highlightedCurrency.previousElementSibling;
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

    currencyList.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("currency-option")) {
            removeHighlight();
            event.target.classList.add("currency-active");
            highlightedCurrency = event.target;
        }
    });

    // Numbers to words
    const numToTextElement = document.getElementById("num-to-text");
    if (numToTextElement) {
        currencyContainer.addEventListener("input", (event) => {
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
