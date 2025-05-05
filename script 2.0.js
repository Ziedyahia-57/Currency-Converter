import { currencyToCountry } from "./js/currencyToCountry.js";
import { donationContent } from "./js/messages.js";

// When donation tab is opened:
const currencyTab = document.getElementById("currency-tab");
const currencyContainer = document.getElementById("currency-container");
const addCurrencyBtn = document.getElementById("add-currency-btn");
const currencyList = document.getElementById("currency-list");
const hideCurrencyTab = document.getElementById("hide-currency-tab");
const hideDonationTab = document.getElementById("hide-donation-tab");
const donationTab = document.getElementById("donation-tab");
const supportDevBtn = document.getElementById("support-dev-btn");
let errorLogged = false; // Global flag to track error logging

const lastUpdateElement = document.querySelector(".last-update");
const CURRENCY_DATA_KEY = "currencyData";
const LAST_UPDATED_KEY = "lastUpdated";

let currencies = [];
let exchangeRates = {};

//🔵+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//🔵++++++++++++++++++++++++++++ ASYNC FUNCTIONS ++++++++++++++++++++++++++++
//🔵+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//⚪✅ fetch exchange rates function (start)
async function fetchExchangeRates() {
  try {
    const url =
      "https://ziedyahia-57.github.io/Currency-Converter/data.json?t=" +
      Date.now();
    const response = await fetch(url);

    if (!response || !response.ok) {
      console.error("(1) ❌ Fetch failed with status:", response?.status);
      throw new Error(`API error! Status: ${response?.status}`);
    }

    const data = await response.json();

    if (!data?.conversion_rates) {
      console.error("(1) ❌ Fetched JSON missing 'conversion_rates'.");
      throw new Error("Invalid API structure.");
    }

    saveExchangeRates(data.conversion_rates);
    console.log("(1) ✅ Exchange rates fetched and saved.");
    return data.conversion_rates;
  } catch (error) {
    console.warn("(1) ❌ Fetch failed. Attempting to load cached data...");
    const cached = JSON.parse(localStorage.getItem(CURRENCY_DATA_KEY));

    if (cached?.data) {
      console.log("(1) ✅ Loaded exchange rates from cache.");
      return cached.data;
    }

    console.error("(1) ❌ No cached data found. Cannot proceed.");
    throw new Error("Failed to fetch exchange rates and no cached data found.");
  }
}
// * @param {string} base - The base currency (e.g., "USD").
// * @returns {Promise<Object.<string, number>>} - A promise that resolves to an object
// * @throws {Error} - Throws an error if the API request fails or if the response is not valid.
//⚪ fetch exchange rates function (end)

//🔴 get exchange rates function (start)
let cachedRates = null;
async function getExchangeRates(base = "USD") {
  if (cachedRates) {
    return cachedRates;
  }
  cachedRates = await fetchExchangeRates(base);
  return cachedRates;
}
// * @param {string} base - The base currency (e.g., "USD").
// * @returns {Promise<Object.<string, number>>} - A promise that resolves to an object
//⚪ get exchange rates function (end)

//⚪initialize exchange rates function (start)
//🟠 [fetchExchangeRates, saveExchangeRates, updateLastUpdateElement, loadData]
const DAYS_BETWEEN_UPDATES = 2; // Update daily (adjust as needed)

async function initializeExchangeRates() {
  console.log("(2)Initializing exchange rates...");

  const savedRates = localStorage.getItem("CURRENCY_DATA_KEY");
  const lastUpdated = localStorage.getItem("lastUpdated");

  let shouldUseCache = false;

  // Check if saved rates exist and are recent enough
  if (savedRates && lastUpdated) {
    const lastUpdateDate = new Date(lastUpdated);
    const daysSinceUpdate =
      (Date.now() - lastUpdateDate.getTime()) / (1000 * 60 * 60 * 24);

    shouldUseCache = daysSinceUpdate < DAYS_BETWEEN_UPDATES;
    console.log(
      "(2)Days since last update:",
      daysSinceUpdate,
      "update every:",
      DAYS_BETWEEN_UPDATES,
      "should use cache:",
      shouldUseCache
    ); // Debugging log

    if (shouldUseCache) {
      console.log(
        "(2)Using cached exchange rates (last updated:",
        lastUpdateDate.toLocaleString(),
        ")"
      );
      updateLastUpdateElement(false); // Indicate cached data
      cachedRates = JSON.parse(savedRates);
      return true; // Skip API fetch
    }
  }

  // If no valid cache, fetch fresh data
  console.log("(2)Fetching latest exchange rates from API...");
  console.log("(2)savedRates:", savedRates, "lastUpdated:", lastUpdated); // Debugging log

  // let fetchedRates;
  try {
    cachedRates = await fetchExchangeRates("USD");
  } catch (error) {
    if (!errorLogged) {
      console.error("(2)Failed to fetch exchange rates:", error);
      errorLogged = true;
    }
  }
  if (cachedRates) {
    saveExchangeRates(cachedRates); // Save fresh data
    updateLastUpdateElement(true); // Indicate fresh API data
    return true; // Successfully fetched fresh data
  } else {
    console.log("(2)Falling back to saved exchange rates...");
    loadData(); // Load cached data if API fails
    return false;
  }
}
//⚪initialize exchange rates function (end)

//⚪initialize app function (start)
//🟠 [initializeExchangeRates, loadCurrencyOrder, addCurrency, checkCurrencyCount, updateAddButtonVisibility, initializeDonationContent]
async function initializeApp() {
  console.log("Initializing app...");

  // Get the actual online status
  const isOnline = navigator.onLine;

  // Update UI with correct online status and last updated time
  updateLastUpdateElement(isOnline);

  // 1. FIRST load the date synchronously
  const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);

  // 2. THEN show UI with the date
  updateLastUpdateElement(navigator.onLine, lastUpdated);

  // Set up real-time listeners
  window.addEventListener("online", () => {
    updateLastUpdateElement(true);
    // Try to fetch new data when coming online
    initializeExchangeRates().then(() => {
      updateCurrencyValues();
    });
  });
  window.addEventListener("offline", () =>
    updateLastUpdateElement(false, localStorage.getItem(LAST_UPDATED_KEY))
  );

  // Load cached exchange rates
  const ratesLoaded = await initializeExchangeRates();
  if (!ratesLoaded) {
    console.warn("Exchange rates not freshly loaded — using fallback data.");
  }

  // Try to load saved currencies
  const loadedSuccessfully = loadCurrencyOrder();

  // Only load defaults if nothing was loaded from localStorage
  if (!loadedSuccessfully) {
    console.log("No saved currencies found, loading defaults");
    addCurrency("USD");
    addCurrency("EUR");
  }

  // Set all input values to 0.00
  document.querySelectorAll(".currency-input input").forEach((input) => {
    input.value = "0.00";
  });

  // Check currency count and update button visibility
  checkCurrencyCount();
  updateAddButtonVisibility();
  initializeDonationContent();
}
//⚪initialize app function (end)

//⚪update exchange rates function (start)
//🟠 [fetchExchangeRates(fetchExchangeRates), updateCurrencyValues]
async function updateExchangeRates() {
  exchangeRates = await fetchExchangeRates("USD");
  updateCurrencyValues();
}
//⚪update exchange rates function (end)

//
//
//
//

//🔵+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//🔵++++++++++++++++++++++++++++ FUNCTIONS ++++++++++++++++++++++++++++
//🔵+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//⚪++++++++++++++++++++++++++++ KEYBOARD / MOUSE CURRENCY SELECTION ++++++++++++++++++++++++++++
let currentLetter = "";
let currentIndex = 0;
let matchingCurrencies = [];
let highlightedCurrency = null;

//>>>>>>>>> Keyboard selection (start)
document.addEventListener("keydown", (event) => {
  if (!donationTab.classList.contains("hidden")) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDonationTab();
    }
  }
  if (!currencyTab.classList.contains("hidden")) {
    if (!currencyList) return;

    const pressedKey = event.key.toUpperCase();
    const currencyItems = Array.from(currencyList.children);

    if (/^[A-Z]$/.test(pressedKey)) {
      if (currentLetter !== pressedKey) {
        currentLetter = pressedKey;
        currentIndex = 0;
        matchingCurrencies = currencyItems.filter((option) =>
          option.textContent.trim().toUpperCase().startsWith(pressedKey)
        );
      }

      if (matchingCurrencies.length > 0) {
        updateHighlight(matchingCurrencies[currentIndex]);
        currentIndex = (currentIndex + 1) % matchingCurrencies.length;
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      currentIndex = 0;
      if (!highlightedCurrency) {
        updateHighlight(currencyItems[0]);
      } else {
        let nextItem = highlightedCurrency.nextElementSibling;
        if (nextItem) updateHighlight(nextItem);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      currentIndex = 0;
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
//>>>>>>>>> Keyboard selection (end)

//>>>>>>>>> Mouse selection (start)
currencyList.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("currency-option")) {
    removeHighlight();
    event.target.classList.add("currency-active");
    highlightedCurrency = event.target;
  }
});
//>>>>>>>>> Mouse selection (end)

//>>>>>>>>> Update highlight function (start)
function updateHighlight(newItem) {
  removeHighlight();
  highlightedCurrency = newItem;
  highlightedCurrency.classList.add("currency-active");
  highlightedCurrency.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}
//>>>>>>>>> Update highlight function (end)

//>>>>>>>>> Remove highlight from previous selection function (end)
function removeHighlight() {
  const previousHighlight = document.querySelector(".currency-active");
  if (previousHighlight) {
    previousHighlight.classList.remove("currency-active");
  }
}
//>>>>>>>>> Remove highlight from previous selection function (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ DRAG AND DROP ++++++++++++++++++++++++++++
let draggedItem = null;

//>>>>>>>>> Drag start event (start)
currencyContainer.addEventListener("dragstart", (event) => {
  if (event.target.classList.contains("currency-input")) {
    draggedItem = event.target;

    // Visual feedback for the dragged item
    draggedItem.style.background = "var(--drag-background)";
    draggedItem.style.opacity = "0.5";
  }
});
//>>>>>>>>> Drag start event (end)

//>>>>>>>>> Drag over event (start)
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
  document.querySelectorAll(".currency-input").forEach((item) => {
    if (item !== targetItem && item !== draggedItem) {
      item.style.background = "var(--gray)";
      item.style.border = "var(--border-dark) solid 1px";
    }
  });
});
//>>>>>>>>> Drag over event (end)

//>>>>>>>>> Drag end event (start)
currencyContainer.addEventListener("dragend", (event) => {
  if (event.target.classList.contains("currency-input")) {
    // Reset styles for the dragged item
    draggedItem.style.background = "var(--gray)";
    draggedItem.style.opacity = "1";
    draggedItem.style.border = "var(--border-dark) solid 1px";

    // Reset styles for all currency inputs
    document.querySelectorAll(".currency-input").forEach((item) => {
      item.style.background = "var(--gray)";
      item.style.border = "var(--border-dark) solid 1px";
    });

    draggedItem = null; // Reset the dragged item
  }
});
//>>>>>>>>> Drag end event (end)

//>>>>>>>>> Drop event (start)
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
  document.querySelectorAll(".currency-input").forEach((item) => {
    item.style.background = "var(--gray)";
    item.style.border = "var(--border-dark) solid 1px";
  });
});
//>>>>>>>>> Drop event (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ INPUT FORMAT VALIDATION ++++++++++++++++++++++++++++
//>>>>>>>>> Input format: no commas on input (start)
document.querySelectorAll(".currency-input input").forEach((input) => {
  input.addEventListener("input", (event) => {
    let rawValue = event.target.value
      ? event.target.value.replace(/,/g, "")
      : ""; // Remove commas

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      event.target.value = event.target.dataset.previousValue || 0;
      return;
    } // Regex to allow only digits and one decimal point

    event.target.dataset.previousValue = rawValue;
    event.target.value = formatNumberWithCommas(rawValue);
    updateCurrencyValues(
      parseFloat(rawValue) || 0,
      event.target.dataset.currency
    ); // Update currency values based on input
  });
});
//>>>>>>>>> Input format: no commas on input (end)

//>>>>>>>>> Input format: dots & commas (start)
function formatNumberWithCommas(value) {
  if (value === ".") return "0."; // Convert single decimal point to "0."

  document.querySelectorAll(".currency-input input").forEach((input) => {
    input.addEventListener("blur", () => {
      if (
        /^0\.?0*$/.test(input.value) ||
        input.value === "" ||
        input.value === "."
      ) {
        input.value = "0.00";
      }
    });
  }); // Ensure the input is not left empty

  value = String(value); // Ensure value is treated as a string
  let [integer, decimal] = value.split(".");

  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to integer part

  return decimal !== undefined ? `${integer}.${decimal}` : integer;
}
//>>>>>>>>> Input format: dots & commas (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ NUMBERS TO WORDS ++++++++++++++++++++++++++++
const numToTextElement = document.getElementById("num-to-text");

//>>>>>>>>> Numbers to words (start)
if (numToTextElement) {
  currencyContainer.addEventListener("input", (event) => {
    if (event.target.tagName === "INPUT") {
      const inputField = event.target;
      const rawValue = inputField.value.replace(/,/g, ""); // Remove commas
      const number = parseFloat(rawValue);

      if (!isNaN(number) && typeof numberToWords !== "undefined") {
        let words = numberToWords.toWords(number); // Use the library
        words = words.charAt(0).toUpperCase() + words.slice(1); // Capitalize the first letter
        numToTextElement.textContent = words.replace(/,/g, ""); // Update the element
      } else {
        numToTextElement.textContent = "ABC..."; // Clear if input is invalid
      }
    }
  });
}
//>>>>>>>>> Numbers to words (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ CURRENCY ORDER FUNCTIONS ++++++++++++++++++++++++++++
//>>>>>>>>> save currency order function (start)
function saveCurrencyOrder() {
  const currencyOrder = Array.from(currencyContainer.children)
    .filter((item) => item.classList.contains("currency-input"))
    .map((item) => item.querySelector("input").dataset.currency);

  // Also update the currencies array to keep it in sync
  currencies = currencyOrder;

  localStorage.setItem("currencyOrder", JSON.stringify(currencyOrder));
  console.log("Saved currency order:", currencyOrder);
}
//>>>>>>>>> save currency order function (end)

//>>>>>>>>> load currency order function (start)
function loadCurrencyOrder() {
  try {
    const savedOrder = JSON.parse(localStorage.getItem("currencyOrder"));

    if (savedOrder && Array.isArray(savedOrder) && savedOrder.length > 0) {
      console.log("Loading saved currency order:", savedOrder);

      // Clear existing currencies
      currencyContainer.innerHTML = "";
      currencies = [];

      // Add each currency in the saved order
      savedOrder.forEach((currency) => {
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
//>>>>>>>>> load currency order function (end)

//>>>>>>>>> check currency count function (start)
function checkCurrencyCount() {
  const currencyInputs = document.querySelectorAll(".currency-input");
  const removeButtons = document.querySelectorAll(".remove-btn");

  if (currencyInputs.length > 2) {
    removeButtons.forEach((btn) => (btn.style.display = "flex"));
  } else {
    removeButtons.forEach((btn) => (btn.style.display = "none"));
  }
}
//>>>>>>>>> check currency count function (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ ADD CURRENCY BUTTON FUNCTIONS ++++++++++++++++++++++++++++
//>>>>>>>>> update add button visibility function (start)
function updateAddButtonVisibility() {
  if (currencies.length === Object.keys(exchangeRates || {}).length) {
    addCurrencyBtn.style.display = "none"; // Hide the button
  } else {
    addCurrencyBtn.style.display = "flex"; // Show the button
  }
}
//>>>>>>>>> update add button visibility function (end)

//>>>>>>>>> add currency function (start)
function addCurrency(currency, shouldSave = true) {
  if (currencies.includes(currency)) return;

  currencies.push(currency);
  const currencyDiv = document.createElement("div");
  currencyDiv.classList.add("currency-input");
  currencyDiv.setAttribute("draggable", "true");

  // Get the country code for the currency
  const countryCode = currencyToCountry[currency] || "??"; // "??" is a fallback for unknown currencies

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
    let rawValue = event.target.value
      ? event.target.value.replace(/,/g, "")
      : "";

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      event.target.value = event.target.dataset.previousValue || "0";
      return;
    }

    event.target.dataset.previousValue = rawValue;
    event.target.value = formatNumberWithCommas(rawValue);
    updateCurrencyValues(
      parseFloat(rawValue) || 0,
      event.target.dataset.currency
    );
  });

  // Select all text on focus
  inputField.addEventListener("focus", (event) => {
    event.target.select();
  });

  // Remove currency
  currencyDiv.querySelector(".remove-btn").addEventListener("click", () => {
    currencyDiv.remove();
    currencies = currencies.filter((c) => c !== currency);
    checkCurrencyCount();
    updateAddButtonVisibility();
    saveCurrencyOrder();
  });

  // Update the newly added currency immediately
  let baseInput = document.querySelector(
    ".currency-input input:not([value='0'])"
  );

  if (!baseInput) {
    // If no input has a value yet, pick the first one
    baseInput = document.querySelector(".currency-input input");
  }

  if (baseInput) {
    // Use the actual displayed value of the input field
    let baseValue = parseFloat(baseInput.value.replace(/,/g, "") || 1); // Default to 1 if empty
    let baseCurrency = baseInput.dataset.currency;
    updateCurrencyValues(baseValue, baseCurrency);
  }
}
//>>>>>>>>> add currency function (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ EXCHANGE RATE / DATE FUNCTIONS ++++++++++++++++++++++++++++
//>>>>>>>>> save exchange rates + last updated date (start)
// Function to save exchange rates and last updated date to localStorage
// function saveExchangeRates(rates) {
//   if (rates) {
//     // Format the date as dd/mm/yyyy
//     const now = new Date();
//     const day = String(now.getDate()).padStart(2, "0"); // Ensure two digits for day
//     const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
//     const year = now.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;

//     localStorage.setItem(CURRENCY_DATA_KEY, JSON.stringify(rates));
//     localStorage.setItem(LAST_UPDATED_KEY, formattedDate);
//     console.log("Saving to localStorage:", CURRENCY_DATA_KEY, rates);
//     console.log("Exchange rates saved to localStorage.");
//   }
// }
function saveExchangeRates(rates) {
  if (rates) {
    const now = new Date().toISOString(); // ISO format avoids parsing issues
    localStorage.setItem(LAST_UPDATED_KEY, now);
    localStorage.setItem(CURRENCY_DATA_KEY, JSON.stringify(rates));
  }
}
//>>>>>>>>> save exchange rates + last updated date (end)

//>>>>>>>>> load exchange rates + last updated date (start)
// Function to load exchange rates and last updated date from localStorage
const savedRates = localStorage.getItem(CURRENCY_DATA_KEY);
const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);
function loadExchangeRates() {
  if (savedRates && lastUpdated) {
    exchangeRates = JSON.parse(savedRates);

    // Ensure the date is in dd/mm/yyyy format
    const dateParts = lastUpdated.split(/[/-]/); // Split by '/' or '-'
    let formattedDate = lastUpdated;

    if (dateParts.length === 3) {
      // Reformat to dd/mm/yyyy
      const [day, month, year] = dateParts.map((part) => part.padStart(2, "0")); // Ensure two digits
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
//>>>>>>>>> load exchange rates + last updated date (end)

//>>>>>>>>> load data function (start)
function loadData() {
  console.log("LoadingData is active");
  const savedData = loadExchangeRates();
  if (savedData) {
    exchangeRates = savedData.rates;
    updateLastUpdateElement(false, savedData.lastUpdated); // Update the "last updated" date

    // Update the UI with the cached exchange rates
    updateCurrencyValues(1, "USD"); // Default to 1 USD as the base value
  } else {
    updateLastUpdateElement(false);
  }
}
//>>>>>>>>> load data function (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ LAST UPDATE STATE FUNCTIONS ++++++++++++++++++++++++++++
//>>>>>>>>> Last update state function (start)
// Function to update the .last-update element
function updateLastUpdateElement(isOnline, lastUpdated) {
  let dateText = "Loading"; // Default state
  let timeText = "..."; // Default state

  if (!lastUpdated) {
    lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);
  }
  if (lastUpdated) {
    try {
      // dateText = new Date(lastUpdated).toLocaleString();
      const date = new Date(lastUpdated);

      // Day (DD), Month (MM), Year (YYYY)
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const year = date.getFullYear();

      // Hours (12-hour format) + AM/PM
      let hours = date.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12 (12 AM)
      const formattedHours = String(hours).padStart(2, "0");

      // Minutes (MM)
      const minutes = String(date.getMinutes()).padStart(2, "0");

      dateText = `${day}/${month}/${year}`;
      timeText = `${formattedHours}:${minutes} ${ampm}`;
    } catch {
      dateText = "Error"; // Fallback if date parsing fails
      timeText = "!"; // Fallback if date parsing fails
    }
  }

  lastUpdateElement.innerHTML = `
    <span class="${isOnline ? "green" : "red"}">● ${
    isOnline ? "Online" : "Offline"
  }</span>
    - ${
      isOnline
        ? "Exchange rates are automatically updated <br>once per month."
        : "Using cached data.<br>"
    }
    Last Updated: <span class="date">${dateText}</span> <span class="date">${timeText}</span>
  `;
}
// function updateLastUpdateElement(isOnline, lastUpdated) {
//   const formattedDate = lastUpdated
//     ? new Date(lastUpdated).toLocaleString()
//     : "Not available";

//   if (isOnline) {
//     lastUpdateElement.innerHTML = `
//       <span class="green">● Online</span> - Exchange rates are automatically
//       <br> once per month. Last Updated: <span class="date">${formattedDate}</span>
//     `;
//   } else {
//     lastUpdateElement.innerHTML = `
//       <span class="red">● Offline</span> - ${
//         lastUpdated
//           ? `Using cached rates. <br> Last Updated: <span class="date">${formattedDate}</span>`
//           : "No saved exchange rates found."
//       }
//     `;
//   }
// }
//>>>>>>>>> Last update state function (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ CURRENCY CONVERSION FUNCTIONS ++++++++++++++++++++++++++++
//>>>>>>>>> convert currency values function (start)
function updateCurrencyValues(baseValue = 0, baseCurrency = "USD") {
  if (!exchangeRates) {
    console.error("No exchange rates available for conversion.");
    return;
  }

  // Round the base value to 2 decimal places
  const roundedBaseValue = parseFloat(baseValue.toFixed(2));

  document.querySelectorAll(".currency-input input").forEach((input) => {
    const currency = input.dataset.currency;
    if (currency !== baseCurrency) {
      // Calculate the converted value based on the base currency and exchange rates
      const convertedValue =
        roundedBaseValue *
        (exchangeRates[currency] / exchangeRates[baseCurrency]);

      // Round the converted value to 2 decimal places
      const roundedValue = convertedValue.toFixed(2);

      // Update the input field with the rounded value
      input.value = formatNumberWithCommas(roundedValue || 0);
    }
  });
}
//>>>>>>>>> convert currency values function (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ OPEN/CLOSE TABS FUNCTIONS ++++++++++++++++++++++++++++
//>>>>>>>>> open donation tab (start)
function openDonationTab() {
  donationTab.classList.add("show");
  donationTab.classList.remove("hidden");
}
//>>>>>>>>> open donation tab (end)

//>>>>>>>>> close donation tab (start)
function closeDonationTab() {
  donationTab.classList.remove("show");
  donationTab.classList.add("hidden");
}
//>>>>>>>>> close donation tab (end)

//>>>>>>>>> open currency tab (start)
function openCurrencyTab() {
  currencyTab.classList.add("show");
  currencyTab.classList.remove("hidden");
}
//>>>>>>>>> open currency tab (end)

//>>>>>>>>> close currency tab (start)
function closeCurrencyTab() {
  currencyTab.classList.remove("show");
  currencyTab.classList.add("hidden");
}
//>>>>>>>>> close currency tab (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ CHECKBOX STATE FUNCTIONS ++++++++++++++++++++++++++++
const checkbox = document.getElementById("convert-on-select");
const CHECKBOX_STATE_KEY = "checkboxState";

//>>>>>>>>> Load checkbox state (start)
// Load checkbox state from localStorage
function loadCheckboxState() {
  const savedState = localStorage.getItem(CHECKBOX_STATE_KEY);
  if (savedState !== null) {
    checkbox.checked = savedState === "true"; // Convert string to boolean
    console.log("Checkbox state loaded from localStorage:", checkbox.checked);
  }
}
//>>>>>>>>> Load checkbox state (end)

//>>>>>>>>> Save checkbox state (start)
// Save checkbox state to localStorage when it changes
function saveCheckboxState() {
  checkbox.addEventListener("change", () => {
    localStorage.setItem(CHECKBOX_STATE_KEY, checkbox.checked); // Save boolean as string
    console.log("Checkbox state saved to localStorage:", checkbox.checked);
  });
}
//>>>>>>>>> Save checkbox state (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ DARK MODE STATE FUNCTIONS ++++++++++++++++++++++++++++
const darkModeBtn = document.getElementById("dark-mode-btn");
const root = document.documentElement;

//>>>>>>>>> Load dark mode state (start)
function loadDarkMode() {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "dark") {
    root.classList.add("dark-mode");
    darkModeBtn.classList.add("active");
  }
}
//>>>>>>>>> Load dark mode state (end)

//>>>>>>>>> save dark mode state (start)
function saveDarkMode() {
  // Save user preference to localStorage
  if (root.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "dark");
  } else {
    localStorage.setItem("darkMode", "light");
  }
}
//>>>>>>>>> save dark mode state (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ ONLINE / OFFLINE FUNCTIONS ++++++++++++++++++++++++++++
//>>>>>>>>> Online event (start)
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
      console.log(
        "Loading saved exchange rates due to an error",
        error.message
      );
    }

    loadData();
  }
});
//>>>>>>>>> Online event (end)

//>>>>>>>>> Offline event (start)
window.addEventListener("offline", () => {
  console.log("App is offline. Loading saved exchange rates...");
  loadData();
});
//>>>>>>>>> Offline event (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ DONATION HANDLER FUNCTIONS ++++++++++++++++++++++++++++
//>>>>>>>>> donation class (start)
class DonationTracker {
  constructor() {
    this.hasShownInitial = false;
    this.reset();
  }

  getContent() {
    // Show initial message ONLY on first click (count === 1)
    const trackerData = {
      clickCount: this.clickCount,
    };
    // Special case: First visit
    if (this.clickCount === 1) {
      return {
        ...donationContent.initialMessage,
        tracker: trackerData, // Pass count to template
      };
    }

    // After 5+ clicks, mix interactions (2 messages, then 1 interaction)
    if (this.clickCount >= 5) {
      const cyclePosition = (this.clickCount - 3) % 3;

      if (cyclePosition === 2) {
        // Every 3rd click shows an interaction
        if (
          this.usedInteractions.length === donationContent.interactions.length
        ) {
          this.usedInteractions = []; // Reset if all interactions used
        }

        const availableInteractions = donationContent.interactions.filter(
          (int) => !this.usedInteractions.includes(int.greeting)
        );

        const interaction =
          availableInteractions.length > 0
            ? availableInteractions[
                Math.floor(Math.random() * availableInteractions.length)
              ]
            : donationContent.interactions[0]; // Fallback

        this.usedInteractions.push(interaction.greeting);
        return {
          ...interaction,
          tracker: trackerData, // Always include count
        };
      }
    }

    // Default case: Show regular message
    if (this.usedMessages.length === donationContent.messages.length) {
      this.usedMessages = []; // Reset if all messages used
    }

    const availableMessages = donationContent.messages.filter(
      (msg) => !this.usedMessages.includes(msg.greeting)
    );

    const message =
      availableMessages.length > 0
        ? availableMessages[
            Math.floor(Math.random() * availableMessages.length)
          ]
        : donationContent.messages[0]; // Fallback

    this.usedMessages.push(message.greeting);
    return {
      ...message,
      // clickCount: this.clickCount
      tracker: trackerData, // Always include count
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
//>>>>>>>>> donation class (end)

//>>>>>>>>> donation content handler (start)
// Initialize the tracker
const donationTracker = new DonationTracker();

function updateDonationContent() {
  const rawContent = donationTracker.getContent();

  // Process dynamic content
  const processField = (field) => {
    if (typeof field === "function") {
      return field(rawContent.tracker); // Execute function with tracker data
    }
    return field; // Return as-is if not a function
  };

  const content = {
    emoji: rawContent.emoji,
    greeting: processField(rawContent.greeting),
    message: processField(rawContent.message),
    footer: processField(rawContent.footer),
  };

  const isInteraction = donationContent.interactions.some(
    (int) =>
      int.greeting === rawContent.greeting ||
      (typeof rawContent.greeting === "function" &&
        int.greeting === rawContent.greeting.toString())
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
//>>>>>>>>> donation content handler (end)

//>>>>>>>>> donation tab visit counter (start)
// Function to handle the donation button click
function handleDonationButtonClick() {
  donationTracker.incrementClickCount();
  const donationContentElement = document.querySelector(".donation-content");
  if (donationContentElement) {
    donationContentElement.innerHTML = updateDonationContent();
  }
}
//>>>>>>>>> donation tab visit counter (end)

//>>>>>>>>> initialize donation tab (start)
// Initialize the donation content with the initial message
function initializeDonationContent() {
  const donationContentElement = document.querySelector(".donation-content");
  if (donationContentElement) {
    donationContentElement.innerHTML = updateDonationContent();
  }
}
//>>>>>>>>> initialize donation tab (end)

//
//
//
//
//🔵++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//🔵++++++++++++++++++++++++++++ EVENTS ++++++++++++++++++++++++++++
//🔵++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
supportDevBtn.addEventListener("click", () => {
  openDonationTab();
});

hideDonationTab.addEventListener("click", () => {
  closeDonationTab();
});

hideCurrencyTab.addEventListener("click", () => {
  closeCurrencyTab();
});

document.getElementById("donation-content").innerHTML = updateDonationContent();

currencyTab.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLInputElement)) return; // Ignore clicks on non-input elements
  if (!event.target.value) return; // Ignore empty values

  let rawValue = event.target.value.replace(/,/g, ""); // Remove commas from the input value

  if (!/^\d*\.?\d*$/.test(rawValue)) {
    event.target.value = event.target.dataset.previousValue || "0";
    return;
  } // Regex to allow only digits and one decimal point

  event.target.dataset.previousValue = rawValue;
  event.target.value = formatNumberWithCommas(rawValue);
  updateCurrencyValues(
    parseFloat(rawValue) || 0,
    event.target.dataset.currency
  ); // Update currency values based on input
});

function initializeInputStyles() {
  // Reset input styles
  document.querySelectorAll(".currency-input input").forEach((input) => {
    input.style.color = ""; // Reset to default color
    input.style.caretColor = ""; // Reset to default caret color
  });
}

//🟣+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//🟣++++++++++++++++++++++++++++ APPLICATION ++++++++++++++++++++++++++++
//🟣+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
document.addEventListener("DOMContentLoaded", async () => {
  // await updateExchangeRates(); // Load exchange rates first
  // // Initial check
  // updateLastUpdateElement(
  //   navigator.onLine,
  //   localStorage.getItem(LAST_UPDATED_KEY)
  // );

  // Initial check with proper online status
  const isOnline = navigator.onLine;
  const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);

  updateLastUpdateElement(isOnline, lastUpdated);

  // Listen for network changes
  window.addEventListener("online", () => {
    updateLastUpdateElement(true, localStorage.getItem(LAST_UPDATED_KEY));
  });

  window.addEventListener("offline", () => {
    updateLastUpdateElement(false, localStorage.getItem(LAST_UPDATED_KEY));
  });

  // Load user preference from localStorage
  loadDarkMode();

  // Toggle dark mode
  darkModeBtn.addEventListener("click", () => {
    root.classList.toggle("dark-mode");
    darkModeBtn.classList.toggle("active");

    saveDarkMode(); // Save user preference to localStorage
  });

  loadCheckboxState();
  initializeApp(); // Initialize the app

  checkCurrencyCount();
  updateAddButtonVisibility();
  initializeInputStyles(); // Initialize input styles
  const donationButton = document.getElementById("support-dev-btn");
  if (donationButton) {
    donationButton.addEventListener("click", handleDonationButtonClick);
  }

  saveCheckboxState();

  // // Convert any input-wrapper divs back to normal inputs
  // document.querySelectorAll(".input-wrapper").forEach((wrapper) => {
  //   const input = wrapper.querySelector("input");
  //   if (input) {
  //     wrapper.parentNode.insertBefore(input, wrapper);
  //     wrapper.remove();
  //   }
  // });
});

addCurrencyBtn.addEventListener("click", async () => {
  currencyList.innerHTML = "";
  openCurrencyTab();

  // Try to get fresh rates if online, otherwise use cached
  if (navigator.onLine) {
    try {
      exchangeRates = await fetchExchangeRates("USD");
    } catch (error) {
      console.log("Using cached rates after online fetch error:", error);
    }
  }

  if (!exchangeRates) {
    exchangeRates = await fetchExchangeRates("USD");
  }

  // Sort currencies alphabetically
  const sortedCurrencies = Object.keys(exchangeRates).sort((a, b) =>
    a.localeCompare(b)
  );
  sortedCurrencies.forEach((currency) => {
    if (!currencies.includes(currency)) {
      const option = document.createElement("div");
      option.classList.add("currency-option");

      // Get the country code for the currency
      const countryCode = currencyToCountry[currency] || "??"; // "??" is a fallback for unknown currencies

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
});
