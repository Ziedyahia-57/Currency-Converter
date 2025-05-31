import { currencyToCountry } from "./currencyToCountry.js";
import { donationContent } from "./messages.js";

// When donation tab is opened:
const currencyTab = document.getElementById("currency-tab");
const currencyContainer = document.getElementById("currency-container");
const addCurrencyBtn = document.getElementById("add-currency-btn");
const currencyList = document.getElementById("currency-list");
const hideCurrencyTab = document.getElementById("hide-currency-tab");
const hideDonationTab = document.getElementById("hide-donation-tab");
const hideSettingsTab = document.getElementById("hide-settings-tab");
const donationTab = document.getElementById("donation-tab");
const settingsTab = document.getElementById("settings-tab");
const supportDevBtn = document.getElementById("support-dev-btn");
const settingsBtn = document.getElementById("settings-btn");
const donationButton = document.getElementById("support-dev-btn");

let errorLogged = false; // Global flag to track error logging

const lastUpdateElement = document.querySelector(".last-update");
const CURRENCY_DATA_KEY = "currencyData";
const LAST_UPDATED_KEY = "lastUpdated";

let currencies = [];
let exchangeRates = {};

function showOfflineMessage() {
  const currencyContainer = document.getElementById("currency-container");
  if (
    currencyContainer &&
    !currencyContainer.querySelector(".first-launch-offline")
  ) {
    currencyContainer.innerHTML = `
      <div class="first-launch-offline">
        <p class="emoji">¯\\_(ツ)_/¯</p>
        <div class="msg-title">Oops! You appear to be offline!</div> 
        <p>Connect to the internet to save currency rates to use offline.</p>
      </div>
    `;
  }
}

function removeOfflineMessage() {
  const currencyContainer = document.getElementById("currency-container");
  const offlineMessage = currencyContainer?.querySelector(
    ".first-launch-offline"
  );
  if (offlineMessage) {
    offlineMessage.remove();

    // Reinitialize the app if we're coming back online
    if (navigator.onLine) {
      initializeApp();
    }
  }
}

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
      throw new Error(`API error! Status: ${response?.status}`);
    }

    const data = await response.json();
    if (!data?.rates) {
      throw new Error("Invalid API structure.");
    }

    // Save and return the rates
    saveExchangeRates(data.rates);
    removeOfflineMessage(); // Remove offline message on successful fetch
    return data.rates;
  } catch (error) {
    console.warn("Fetch failed, trying cache:", error.message);

    // Try to load from cache
    try {
      const cached = JSON.parse(localStorage.getItem(CURRENCY_DATA_KEY));
      if (cached) {
        console.log("Using cached rates");
        removeOfflineMessage(); // Remove offline message if cache is valid
        return cached;
      }
      throw new Error("No cached data available");
    } catch (cacheError) {
      console.error("Cache load failed:", cacheError.message);
      // Only show offline message if we have no cached data
      if (!localStorage.getItem(CURRENCY_DATA_KEY)) {
        showOfflineMessage();
      }
      throw new Error("Failed to fetch and no valid cache available");
    }
  }
}
// * @param {string} base - The base currency (e.g., "USD").
// * @returns {Promise<Object.<string, number>>} - A promise that resolves to an object
// * @throws {Error} - Throws an error if the API request fails or if the response is not valid.
//⚪ fetch exchange rates function (end)

//⚪initialize app function (start)
//🟠 [initializeExchangeRates, loadCurrencyOrder, addCurrency, checkCurrencyCount, updateAddButtonVisibility, initializeDonationContent]
async function initializeApp() {
  try {
    console.log("Initializing app...");

    // Try to load rates (will throw if both network and cache fail)
    exchangeRates = await fetchExchangeRates();

    // Initialize currency list
    try {
      const loadedSuccessfully = loadCurrencyOrder();
      if (!loadedSuccessfully) {
        addCurrency("USD", false);
        addCurrency("EUR", true);
      }
    } catch (currencyError) {
      console.error("Currency init failed:", currencyError);
      // If we have rates but no saved currencies, initialize defaults
      if (exchangeRates) {
        addCurrency("USD", false);
        addCurrency("EUR", true);
      }
    }

    // Update UI
    updateLastUpdateElement(navigator.onLine);
    updateAddButtonVisibility();
    checkCurrencyCount();
  } catch (mainError) {
    console.error("App initialization failed:", mainError);
    // Only show offline message if we have no cached data
    if (!localStorage.getItem(CURRENCY_DATA_KEY)) {
      showOfflineMessage();
    }
  }
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
  if (!settingsTab.classList.contains("hidden")) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSettingsTab();
    }
  }
  if (!currencyTab.classList.contains("hidden")) {
    if (!currencyList) return;

    const pressedKey = event.key.toUpperCase();
    const currencyItems = Array.from(currencyList.children);

    if (/^[A-Z]$/.test(pressedKey)) {
      // Reset selection if it's a different letter or same letter pressed again
      if (currentLetter !== pressedKey || matchingCurrencies.length === 0) {
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
    // targetItem.style.border = "1px solid var(--drag-border)";
  }

  // Reset styles for all other items
  document.querySelectorAll(".currency-input").forEach((item) => {
    if (item !== targetItem && item !== draggedItem) {
      item.style.background = "var(--gray)";
      // item.style.border = "var(--border-dark) solid 1px";
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
    // draggedItem.style.border = "var(--border-dark) solid 1px";

    // Reset styles for all currency inputs
    document.querySelectorAll(".currency-input").forEach((item) => {
      item.style.background = "var(--gray)";
      // item.style.border = "var(--border-dark) solid 1px";
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
    // item.style.border = "var(--border-dark) solid 1px";
  });
});
//>>>>>>>>> Drop event (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ INPUT FORMAT VALIDATION ++++++++++++++++++++++++++++
// //>>>>>>>>> Input format: no commas on input (start)
//🔵 document.querySelectorAll(".currency-input input").forEach((input) => {
//   input.addEventListener("input", (event) => {
//     const input = event.target;
//     const rawValue = input.value.replace(/,/g, "");

//     if (!/^\d*\.?\d*$/.test(rawValue)) {
//       input.value = input.dataset.previousValue || "0";
//       return;
//     }

//     input.dataset.previousValue = rawValue;
//     formatNumberWithCommas(rawValue, input);
//     updateCurrencyValues(parseFloat(rawValue) || 0, input.dataset.currency);
//   });

//   // Add blur handler to force decimals
//   input.addEventListener("blur", () => {
//     let value = input.value.replace(/,/g, "");
//     if (value.indexOf(".") === -1) {
//       value += ".00";
//     } else {
//       const parts = value.split(".");
//       if (parts[1].length < 2) {
//         parts[1] = parts[1].padEnd(2, "0");
//         value = parts.join(".");
//       }
//     }
//     input.value = formatNumberWithCommas(value, input);
//   });
// });

// Replace your current input event listeners with this:
document.querySelectorAll(".currency-input input").forEach((input) => {
  input.addEventListener("input", (event) => {
    const rawValue = event.target.value.replace(/,/g, "");
    formatNumberWithCommas(rawValue, event.target);
    updateCurrencyValues(event.target.dataset.currency); // Pass the changed currency
  });

  input.addEventListener("blur", () => {
    let value = input.value.replace(/,/g, "");
    if (value.indexOf(".") === -1) {
      value += currency === "BTC" ? ".00000000" : ".00";
    } else {
      const parts = value.split(".");
      if (parts[1].length < 2) {
        parts[1] = parts[1].padEnd(2, "0");
      }
    }
    input.value = formatNumberWithCommas(value, input);
  });
});
// //>>>>>>>>> Input format: no commas on input (end)

// //>>>>>>>>> Input format: dots & commas (start)
function formatNumberWithCommas(value, inputElement) {
  // Return early if inputElement is not valid
  if (!inputElement || typeof inputElement.selectionStart !== "number") {
    // Fallback to simple formatting without cursor control
    value = value.replace(/[^\d.]/g, "");
    let [integerPart, decimalPart] = value.split(".");
    integerPart = integerPart.replace(/^0+/, "") || "0";
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (decimalPart !== undefined) {
      decimalPart = decimalPart.substring(0); //🟠Changed "substring(0,2)"
      return `${integerPart}.${decimalPart}`;
    }
    return integerPart;
  }

  // Store cursor position if we have a valid input element
  const cursorPos = inputElement.selectionStart;
  const originalValue = inputElement.value;
  const isAddingDecimal =
    originalValue.length < value.length && value.charAt(cursorPos) === ".";

  // Clean the input value
  let cleanValue = value.replace(/[^\d.]/g, "");

  // Handle decimal part
  let [integerPart, decimalPart] = cleanValue.split(".");
  integerPart = integerPart.replace(/^0+/, "") || "0";

  // Add thousand separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Format decimal part if exists
  if (decimalPart !== undefined) {
    decimalPart = decimalPart.substring(0);
    cleanValue = `${integerPart}.${decimalPart}`;
  } else {
    cleanValue = integerPart;
  }

  // Calculate new cursor position
  let newCursorPos = cursorPos;

  // Adjust for added comma
  if (cleanValue.length > originalValue.length) {
    const addedChars = cleanValue.length - originalValue.length;
    newCursorPos += addedChars;
  }
  // Special handling for decimal point
  else if (isAddingDecimal) {
    newCursorPos += 1;
  }

  // Update input value
  inputElement.value = cleanValue;

  // Restore cursor position
  setTimeout(() => {
    inputElement.setSelectionRange(newCursorPos, newCursorPos);
  }, 0);

  return cleanValue;
}

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
  chrome.storage.local.set({ currencyOrder }, () => {
    chrome.storage.local.get("currencyOrder", (result) => {
      console.log("Saved currencyOrder:", result.currencyOrder);
    });
  });
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
        <input type="text" data-currency="${currency}" value="${
    currency === "BTC" ? "0.00000000" : "0.00"
  }" data-previous-value="0">
        <button class="remove-btn" title="Remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></button>
    `;

  currencyContainer.appendChild(currencyDiv);

  const inputField = currencyDiv.querySelector("input");

  // Initialize with proper value
  // try {
  //   inputField.value = formatNumberWithCommas("0.00", inputField);
  // } catch (error) {
  //   console.error("Error initializing currency input:", error);
  //   inputField.value = "0.00";
  // }
  try {
    // Set initial value based on currency type
    const initialValue = currency === "BTC" ? "0.00000000" : "0.00";
    inputField.value = formatNumberWithCommas(initialValue, inputField);
  } catch (error) {
    console.error("Error initializing currency input:", error);
    // Fallback value should also respect currency type
    inputField.value = currency === "BTC" ? "0.00000000" : "0.00";
  }

  //🔵 Set up event listeners
  // 🔵inputField.addEventListener("input", (event) => {
  //   const rawValue = event.target.value.replace(/,/g, "");
  //   formatNumberWithCommas(rawValue, event.target);
  //   updateCurrencyValues(
  //     parseFloat(rawValue) || 0,
  //     event.target.dataset.currency
  //   );
  // });

  // inputField.addEventListener("blur", () => {
  //   let value = inputField.value.replace(/,/g, "");
  //   if (value.indexOf(".") === -1) {
  //     value += ".00";
  //   }
  //   inputField.value = formatNumberWithCommas(value, inputField);
  // });

  inputField.addEventListener("input", (event) => {
    const rawValue = event.target.value.replace(/,/g, "");
    formatNumberWithCommas(rawValue, event.target);
    updateCurrencyValues(event.target.dataset.currency);
  });

  inputField.addEventListener("blur", () => {
    let value = inputField.value.replace(/,/g, "");
    if (value.indexOf(".") === -1) {
      value += currency === "BTC" ? ".00000000" : ".00";
    }
    inputField.value = formatNumberWithCommas(value, inputField);
  });

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
function saveExchangeRates(rates) {
  if (rates) {
    const now = new Date().toISOString(); // ISO format avoids parsing issues
    localStorage.setItem(LAST_UPDATED_KEY, now);
    localStorage.setItem(CURRENCY_DATA_KEY, JSON.stringify(rates));
    chrome.storage.local.set({
      [LAST_UPDATED_KEY]: now,
      [CURRENCY_DATA_KEY]: rates,
    });
  }
}
//>>>>>>>>> save exchange rates + last updated date (end)

//>>>>>>>>> load exchange rates + last updated date (start)
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
  let dateText = `--/--/----`; // Default state
  let timeText = "--:--"; // Default state

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
    - Last Updated: <span class="date">${dateText}</span> at <span class="date">${timeText}</span>
  `;
}
//>>>>>>>>> Last update state function (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ CURRENCY CONVERSION FUNCTIONS ++++++++++++++++++++++++++++
//>>>>>>>>> convert currency values function (start)
// 🔵function updateCurrencyValues(baseValue = 0, baseCurrency = "USD") {
//   if (!exchangeRates) {
//     console.error("No exchange rates available for conversion.");
//     return;
//   }

//   // Don't round the base value here - keep full precision for calculations
//   const fullPrecisionBaseValue = parseFloat(baseValue);

//   document.querySelectorAll(".currency-input input").forEach((input) => {
//     const currency = input.dataset.currency;
//     if (currency !== baseCurrency) {
//       // Calculate the converted value with full precision
//       const convertedValue =
//         fullPrecisionBaseValue *
//         (exchangeRates[currency] / exchangeRates[baseCurrency]);

//       // Special rounding for BTC (8 decimals) vs others (2 decimals)
//       const roundedValue =
//         currency === "BTC"
//           ? convertedValue.toFixed(8)
//           : convertedValue.toFixed(2);

//       // Update the input field with the rounded value
//       input.value = formatNumberWithCommas(roundedValue || 0);
//     }
//   });
// }

function updateCurrencyValues(changedCurrency) {
  if (!exchangeRates) {
    console.error("No exchange rates available for conversion.");
    return;
  }

  // Get all currency inputs
  const currencyInputs = Array.from(
    document.querySelectorAll(".currency-input input")
  );

  // Find the changed input
  const changedInput = currencyInputs.find(
    (input) => input.dataset.currency === changedCurrency
  );
  if (!changedInput) return;

  // Get the raw value (without commas) from the changed input
  const rawValue = changedInput.value.replace(/,/g, "");
  const numericValue = parseFloat(rawValue) || 0;

  // Update all other currencies based on the changed input
  currencyInputs.forEach((input) => {
    if (input.dataset.currency !== changedCurrency) {
      // Calculate the converted value
      let convertedValue;

      if (changedCurrency === "USD") {
        // If USD was changed, directly use its rate
        convertedValue = numericValue * exchangeRates[input.dataset.currency];
      } else if (input.dataset.currency === "USD") {
        // If converting to USD, divide by the rate
        convertedValue = numericValue / exchangeRates[changedCurrency];
      } else {
        // For other currency pairs
        convertedValue =
          numericValue *
          (exchangeRates[input.dataset.currency] /
            exchangeRates[changedCurrency]);
      }

      // Format based on currency type (BTC gets 8 decimals, others get 2)
      const roundedValue =
        input.dataset.currency === "BTC"
          ? convertedValue.toFixed(8)
          : convertedValue.toFixed(2);

      // Update the input field
      input.value = formatNumberWithCommas(roundedValue);
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
  // Reset selection state
  currentLetter = "";
  currentIndex = 0;
  matchingCurrencies = [];
  highlightedCurrency = null;
}
//>>>>>>>>> close currency tab (end)

//>>>>>>>>> open settings tab (start)
function openSettingsTab() {
  settingsTab.classList.add("show");
  settingsTab.classList.remove("hidden");
}
//>>>>>>>>> open settings tab (end)

//>>>>>>>>> close settings tab (start)
function closeSettingsTab() {
  settingsTab.classList.remove("show");
  settingsTab.classList.add("hidden");
}
//>>>>>>>>> close settings tab (end)

//
//
//
//
//⚪++++++++++++++++++++++++++++ CHECKBOX STATE FUNCTIONS ++++++++++++++++++++++++++++
const checkbox = document.getElementById("convert-on-select");
const CHECKBOX_STATE_KEY = "checkboxState";

//>>>>>>>>> Load checkbox state (start)
function loadCheckboxState() {
  try {
    const savedState = localStorage.getItem(CHECKBOX_STATE_KEY);
    checkbox.checked = savedState === "true"; // Convert string to boolean
    if (savedState === null) {
      // Set default state if no preference is saved
      checkbox.checked = false;
      localStorage.setItem(CHECKBOX_STATE_KEY, "false");
    }
  } catch (error) {
    console.error("Error loading checkbox state:", error);
    // Fallback to unchecked if there's an error
    checkbox.checked = false;
  }
}
//>>>>>>>>> Load checkbox state (end)

//>>>>>>>>> Save checkbox state (start)
// Save checkbox state to localStorage when it changes
function saveCheckboxState() {
  checkbox.addEventListener("change", () => {
    localStorage.setItem(CHECKBOX_STATE_KEY, checkbox.checked); // Save boolean as string
    chrome.storage.local.set({ [CHECKBOX_STATE_KEY]: checkbox.checked });
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

// //>>>>>>>>> Load dark mode state (start)
function loadDarkMode() {
  try {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "dark") {
      root.classList.add("dark-mode");
      darkModeBtn.classList.add("active");
    } else {
      // Default to light mode if no preference is saved
      root.classList.remove("dark-mode");
      darkModeBtn.classList.remove("active");
      localStorage.setItem("darkMode", "light");
    }
  } catch (error) {
    console.error("Error loading dark mode:", error);
    // Fallback to light mode if there's an error
    root.classList.remove("dark-mode");
    darkModeBtn.classList.remove("active");
  }
}
// //>>>>>>>>> Load dark mode state (end)

// //>>>>>>>>> save dark mode state (start)
function saveDarkMode() {
  // Save user preference to localStorage
  if (root.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "dark");
    chrome.storage.local.set({ ["darkMode"]: "dark" });
  } else {
    localStorage.setItem("darkMode", "light");
    chrome.storage.local.set({ ["darkMode"]: "light" });
  }
}
// //>>>>>>>>> save dark mode state (end)

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
      updateCurrencyValues(); // Update displayed values with fresh rates
    }
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    loadData(); // Try to load cached data
  }
});
//>>>>>>>>> Online event (end)

//>>>>>>>>> Offline event (start)
window.addEventListener("offline", () => {
  console.log("App is offline. Loading saved exchange rates...");
  loadData();
  // Only show offline message if we have no cached data
  if (!localStorage.getItem(CURRENCY_DATA_KEY)) {
    showOfflineMessage();
  }
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
settingsBtn.addEventListener("click", () => {
  openSettingsTab();
});

supportDevBtn.addEventListener("click", () => {
  openDonationTab();
});

hideDonationTab.addEventListener("click", () => {
  closeDonationTab();
});

hideSettingsTab.addEventListener("click", () => {
  closeSettingsTab();
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
// document.addEventListener("DOMContentLoaded", async () => {
//   // Initial check with proper online status
//   const isOnline = navigator.onLine;
//   const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);

//   updateLastUpdateElement(isOnline, lastUpdated);

//   // Listen for network changes
//   window.addEventListener("online", () => {
//     updateLastUpdateElement(true, localStorage.getItem(LAST_UPDATED_KEY));
//   });

//   window.addEventListener("offline", () => {
//     updateLastUpdateElement(false, localStorage.getItem(LAST_UPDATED_KEY));
//   });

//   // Load user preference from localStorage
//   loadDarkMode();

//   // Toggle dark mode
//   darkModeBtn.addEventListener("click", () => {
//     root.classList.toggle("dark-mode");
//     darkModeBtn.classList.toggle("active");

//     saveDarkMode(); // Save user preference to localStorage
//   });

//   loadCheckboxState();
//   initializeApp(); // Initialize the app

//   checkCurrencyCount();
//   updateAddButtonVisibility();
//   initializeInputStyles(); // Initialize input styles

//   //Donation Tab functionality

//   donationButton.addEventListener("click", handleDonationButtonClick);

//   saveCheckboxState();
//   await updateExchangeRates(); // Load exchange rates first
//   // Initial check
//   updateLastUpdateElement(
//     navigator.onLine,
//     localStorage.getItem(LAST_UPDATED_KEY)
//   );
// });

document.addEventListener("DOMContentLoaded", async () => {
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

  // Load user preference from localStorage and chrome.storage
  loadDarkMode();

  // Toggle dark mode
  darkModeBtn.addEventListener("click", () => {
    root.classList.toggle("dark-mode");
    darkModeBtn.classList.toggle("active");
    saveDarkMode(); // Save user preference to both localStorage and chrome.storage
  });

  loadCheckboxState();
  initializeApp(); // Initialize the app

  checkCurrencyCount();
  updateAddButtonVisibility();
  initializeInputStyles(); // Initialize input styles

  // Donation Tab functionality
  donationButton.addEventListener("click", handleDonationButtonClick);

  saveCheckboxState();
  await updateExchangeRates(); // Load exchange rates first
  // Initial check
  updateLastUpdateElement(
    navigator.onLine,
    localStorage.getItem(LAST_UPDATED_KEY)
  );
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
