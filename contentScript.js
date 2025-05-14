// ===== CONFIGURATION =====
const POPUP_ID = "currency-converter-popup";
const POPUP_DISTANCE = 20;
const CURRENCY_SYMBOLS = {
  $: "USD",
  "€": "EUR",
  "£": "GBP",
  "¥": "JPY",
  "₹": "INR",
  "₽": "RUB",
  "₩": "KRW",
  "₪": "ILS",
  "₺": "TRY",
  "₴": "UAH",
};

// Inline currencyToCountry mapping (instead of import)
const currencyToCountry = {
  AED: "ae",
  AFN: "af",
  ALL: "al",
  AMD: "am",
  ANG: "an",
  AOA: "ao",
  ARS: "ar",
  AUD: "au",
  AWG: "aw",
  AZN: "az",
  BAM: "ba",
  BBD: "bb",
  BDT: "bd",
  BGN: "bg",
  BHD: "bh",
  BIF: "bi",
  BMD: "bm",
  BND: "bn",
  BOB: "bo",
  BRL: "br",
  BSD: "bs",
  BTC: "bt",
  BTN: "bt",
  BWP: "bw",
  BYN: "by",
  BZD: "bz",
  CAD: "ca",
  CDF: "cd",
  CHF: "ch",
  CLP: "cl",
  CNY: "cn",
  COP: "co",
  CRC: "cr",
  CUC: "cu",
  CUP: "cu",
  CVE: "cv",
  CZK: "cz",
  DJF: "dj",
  DKK: "dk",
  DOP: "do",
  DZD: "dz",
  EGP: "eg",
  ERN: "er",
  ETB: "et",
  EUR: "eu",
  FJD: "fj",
  FKP: "fk",
  GBP: "gb",
  GEL: "ge",
  GGP: "gg",
  GHS: "gh",
  GIP: "gi",
  GMD: "gm",
  GNF: "gn",
  GTQ: "gt",
  GYD: "gy",
  HKD: "hk",
  HNL: "hn",
  HRK: "hr",
  HTG: "ht",
  HUF: "hu",
  IDR: "id",
  ILS: "il",
  IMP: "im",
  INR: "in",
  IQD: "iq",
  IRR: "ir",
  ISK: "is",
  JEP: "je",
  JMD: "jm",
  JOD: "jo",
  JPY: "jp",
  KES: "ke",
  KGS: "kg",
  KHR: "kh",
  KMF: "km",
  KPW: "kp",
  KRW: "kr",
  KWD: "kw",
  KYD: "ky",
  KZT: "kz",
  LAK: "la",
  LBP: "lb",
  LKR: "lk",
  LRD: "lr",
  LSL: "ls",
  LYD: "ly",
  MAD: "ma",
  MDL: "md",
  MGA: "mg",
  MKD: "mk",
  MMK: "mm",
  MNT: "mn",
  MOP: "mo",
  MRU: "mr",
  MUR: "mu",
  MVR: "mv",
  MWK: "mw",
  MXN: "mx",
  MYR: "my",
  MZN: "mz",
  NAD: "na",
  NGN: "ng",
  NIO: "ni",
  NOK: "no",
  NPR: "np",
  NZD: "nz",
  OMR: "om",
  PAB: "pa",
  PEN: "pe",
  PGK: "pg",
  PHP: "ph",
  PKR: "pk",
  PLN: "pl",
  PYG: "py",
  QAR: "qa",
  RON: "ro",
  RSD: "rs",
  RUB: "ru",
  RWF: "rw",
  SAR: "sa",
  SBD: "sb",
  SCR: "sc",
  SDG: "sd",
  SEK: "se",
  SGD: "sg",
  SHP: "sh",
  SLL: "sl",
  SOS: "so",
  SRD: "sr",
  SSP: "ss",
  STD: "st",
  SVC: "sv",
  SYP: "sy",
  SZL: "sz",
  THB: "th",
  TJS: "tj",
  TMT: "tm",
  TND: "tn",
  TOP: "to",
  TRY: "tr",
  TTD: "tt",
  TWD: "tw",
  TZS: "tz",
  UAH: "ua",
  UGX: "ug",
  USD: "us",
  UYU: "uy",
  UZS: "uz",
  VES: "ve",
  VND: "vn",
  VUV: "vu",
  WST: "ws",
  XAF: "cf",
  XAG: "eu",
  XAU: "eu",
  XCD: "eu",
  XOF: "eu",
  XPF: "eu",
  YER: "ye",
  ZAR: "za",
  ZMW: "zm",
  ZWL: "zw",
};

const DEFAULT_CURRENCIES = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110.0,
  AUD: 1.35,
  CAD: 1.25,
  CHF: 0.92,
  CNY: 6.45,
};

// ===== STATE MANAGEMENT =====
let currentMode = "selection";
let lastSelectionValue = "";
let savedCurrencies = DEFAULT_CURRENCIES;
let lastSelectionRect = null;

// Initialize currencies from storage
chrome.storage.local.get(["currencyOrder", "currencyData"], (result) => {
  if (result.currencyOrder && result.currencyData) {
    savedCurrencies = {};
    result.currencyOrder.forEach((currency) => {
      if (result.currencyData[currency]) {
        savedCurrencies[currency] = result.currencyData[currency];
      }
    });
  }
});

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseNumber(text) {
  // Handle European-style numbers (1.234,56)
  if (/\.\d{3},\d{2}$/.test(text)) {
    return parseFloat(text.replace(/\./g, "").replace(",", "."));
  }
  // Handle normal numbers with commas as thousand separators
  return parseFloat(text.replace(/,/g, ""));
}

function getFlagElement(currencyCode) {
  const flagDiv = document.createElement("div");
  flagDiv.className = "flag";

  // Get country code from currency
  const countryCode = (currencyToCountry[currencyCode] || "xx").toLowerCase();

  // Create container for the flag
  const flagContainer = document.createElement("div");
  flagContainer.style.display = "flex";
  flagContainer.style.alignItems = "center";
  flagContainer.style.justifyContent = "center";
  flagContainer.style.width = "16px";
  flagContainer.style.height = "10px";

  try {
    const flagImg = document.createElement("img");
    flagImg.className = "currency-flag-img";
    flagImg.alt = currencyCode;
    flagImg.style.width = "100%";
    flagImg.style.height = "100%";
    flagImg.style.objectFit = "cover";
    flagImg.style.borderRadius = "2px";

    // Try to load the flag
    const flagPath = `flag-icons/flags/4x3/${countryCode}.svg`;
    flagImg.src = chrome.runtime.getURL(flagPath);

    // Fallback if image fails to load
    flagImg.onerror = function () {
      flagContainer.innerHTML = "";
      const fallback = document.createElement("div");
      fallback.className = "currency-flag-fallback";
      fallback.textContent = currencyCode.substring(0, 2);
      fallback.style.width = "24px";
      fallback.style.height = "18px";
      fallback.style.display = "flex";
      fallback.style.alignItems = "center";
      fallback.style.justifyContent = "center";
      fallback.style.fontSize = "10px";
      fallback.style.background = "#f0f0f0";
      fallback.style.borderRadius = "2px";
      flagContainer.appendChild(fallback);
    };

    flagContainer.appendChild(flagImg);
  } catch (e) {
    console.error("Error creating flag element:", e);
    const fallback = document.createElement("div");
    fallback.className = "currency-flag-fallback";
    fallback.textContent = currencyCode.substring(0, 2);
    flagContainer.appendChild(fallback);
  }

  flagDiv.appendChild(flagContainer);
  return flagDiv;
}

function detectCurrency(text) {
  // First remove all whitespace from the text for cleaner processing
  const cleanText = text.replace(/\s+/g, "").trim();

  // First try to find currency indicators
  // Check for symbol prefix
  for (const [symbol, currency] of Object.entries(CURRENCY_SYMBOLS)) {
    if (cleanText.startsWith(symbol)) {
      const amountPart = cleanText.slice(symbol.length);
      if (amountPart && !isNaN(parseNumber(amountPart))) {
        return {
          currency: currency,
          amount: amountPart,
          type: "symbol",
          symbol: symbol,
        };
      }
    }
  }

  // Check for symbol suffix
  for (const [symbol, currency] of Object.entries(CURRENCY_SYMBOLS)) {
    if (cleanText.endsWith(symbol)) {
      const amountPart = cleanText.slice(0, -symbol.length);
      if (amountPart && !isNaN(parseNumber(amountPart))) {
        return {
          currency: currency,
          amount: amountPart,
          type: "symbol",
          symbol: symbol,
        };
      }
    }
  }

  // Check for code prefix (case insensitive)
  for (const code of Object.keys(currencyToCountry)) {
    const regex = new RegExp(`^${code}`, "i");
    if (regex.test(cleanText)) {
      const amountPart = cleanText.slice(code.length);
      if (amountPart && !isNaN(parseNumber(amountPart))) {
        return {
          currency: code.toUpperCase(),
          amount: amountPart,
          type: "code",
        };
      }
    }
  }

  // Check for code suffix (case insensitive)
  for (const code of Object.keys(currencyToCountry)) {
    const regex = new RegExp(`${code}$`, "i");
    if (regex.test(cleanText)) {
      const amountPart = cleanText.slice(0, -code.length);
      if (amountPart && !isNaN(parseNumber(amountPart))) {
        return {
          currency: code.toUpperCase(),
          amount: amountPart,
          type: "code",
        };
      }
    }
  }

  // Default to USD if no currency detected but has valid number
  const numberValue = parseNumber(cleanText);
  if (!isNaN(numberValue) && numberValue > 0) {
    return {
      currency: "USD",
      amount: cleanText,
      type: "unknown",
    };
  }

  // Return invalid if no currency and no valid number
  return {
    currency: "",
    amount: cleanText,
    type: "invalid",
  };
}

function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  if (fromCurrency === toCurrency) return amount;

  // If we have direct rates for both currencies
  if (rates[fromCurrency] && rates[toCurrency]) {
    return amount * (rates[toCurrency] / rates[fromCurrency]);
  }

  // Default to USD as base if no direct rates available
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;

  return amount * (toRate / fromRate);
}

// ===== POPUP MANAGEMENT =====
function createPopup() {
  const existing = document.getElementById(POPUP_ID);
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = POPUP_ID;
  popup.style.cssText = `
    position: absolute;
    background: #ffffff;
    width: fit-content;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 999999999999;
    display: none;
    flex-direction: column;
    padding: 4px;
    font-family: Arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    color: #333333;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    transform: translateX(-50%);
    cursor: pointer;
    top: ${POPUP_DISTANCE}px;
    align-items: center;
    pointer-events: auto;`;

  // Pointer triangle
  const pointer = document.createElement("div");
  pointer.style.cssText = `
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #ffffff;
    filter: drop-shadow(0 -1px 1px rgba(0,0,0,0.1));
  `;
  popup.appendChild(pointer);

  // Selection view
  const selectionView = document.createElement("div");
  selectionView.id = `${POPUP_ID}-selection`;
  selectionView.style.cssText = `
    display: flex;
    align-items: center;
    align-self: center;
    gap: 8px;
    background: #ffffff;
    padding: 4px 8px;
  `;

  selectionView.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;width:16px;height:16px">
      <img src="${chrome.runtime.getURL("icons/icon32.png")}" 
           style="width:16px;height:16px;object-fit:contain"
           onerror="this.replaceWith('<div style=\\'width:16px;height:16px;background:#ff3366;border-radius:2px\\'></div>')">
    </div>
    <span id="${POPUP_ID}-text" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px"></span>
  `;
  popup.appendChild(selectionView);

  // Currencies view
  const currenciesView = document.createElement("div");
  currenciesView.id = `${POPUP_ID}-currencies`;
  currenciesView.style.cssText = `
    width: fit-content; display: flex; flex-direction: column;  gap: 4px; color: rgb(112, 112, 112); font-style: normal; padding: 0px 4px;
  `;
  popup.appendChild(currenciesView);

  // Add style for currency items
  const style = document.createElement("style");
  style.textContent = `
    #${POPUP_ID} {
      height: fit-content !important;
    }
    #${POPUP_ID}-currencies {
      display: flex;
      flex-direction: column;
      align-self: center;
    }
    .currency-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
    gap: 4px;
    margin-right: auto;
    color: #6c6c6c;
}
    .currency-highlight {
      color: rgb(0, 200, 22);
    font-weight: bold;
    border-top: solid #7070702e 1px;
    }
    .currency-error {
      color: #d32f2f;
      padding: 8px 0;
      text-align: center;
    }
    .flag {
      margin-right: 6px;
      border-radius: 2px;

    }
    .fi {
      display: inline-block;
      width: 1em;
      height: 1em;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    .currency-flag-fallback {
        width: 16px;
        height: 12px;
        background: #eee;
        color: #333;
        font-size: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(popup);
  return popup;
}

function showSelectionView(popup, value) {
  const popupElement = document.getElementById(POPUP_ID);
  popupElement.style.pointerEvents = "auto";
  lastSelectionValue = value;
  document.getElementById(`${POPUP_ID}-text`).textContent = value;
  document.getElementById(`${POPUP_ID}-selection`).style.display = "flex";
  document.getElementById(`${POPUP_ID}-currencies`).style.display = "none";
  currentMode = "selection";
}

function showCurrenciesView(popup, baseText) {
  const popupElement = document.getElementById(POPUP_ID);
  const currenciesContainer = document.getElementById(`${POPUP_ID}-currencies`);

  currenciesContainer.innerHTML =
    '<div style="padding:4px 0;text-align:center">Loading...</div>';

  // Detect source currency and amount
  const {
    currency: sourceCurrency,
    amount,
    type,
    symbol,
  } = detectCurrency(baseText);
  const numericAmount = parseNumber(amount);

  // Get fresh currency data
  chrome.storage.local.get(["currencyOrder", "currencyData"], (result) => {
    const orderedCurrencies = {};
    const rates = result.currencyData || DEFAULT_CURRENCIES;

    // Create ordered list of currencies
    if (result.currencyOrder) {
      result.currencyOrder.forEach((curr) => {
        if (rates[curr]) orderedCurrencies[curr] = rates[curr];
      });
    } else {
      Object.assign(orderedCurrencies, rates);
    }

    currenciesContainer.innerHTML = "";

    // Check if source currency is supported
    const isSupported =
      Object.keys(orderedCurrencies).includes(sourceCurrency) ||
      (symbol && CURRENCY_SYMBOLS[symbol] === sourceCurrency);

    if (!isSupported && type !== "unknown") {
      const errorItem = document.createElement("div");
      errorItem.className = "currency-error";
      errorItem.textContent = `⨂${sourceCurrency} not supported`;
      currenciesContainer.appendChild(errorItem);
    }

    // Add source currency as first item
    const sourceItem = document.createElement("div");
    sourceItem.className = `currency-item currency-source ${
      isSupported ? "currency-highlight" : ""
    }`;
    sourceItem.style.paddingTop = "8px";

    // Create flag container
    const sourceFlagContainer = document.createElement("div");
    sourceFlagContainer.style.display = "flex";
    sourceFlagContainer.style.alignItems = "center";
    sourceFlagContainer.style.gap = "6px";

    // Add flag
    sourceFlagContainer.appendChild(getFlagElement(sourceCurrency));

    // Add currency code
    const sourceCodeSpan = document.createElement("span");
    sourceCodeSpan.textContent = `${sourceCurrency} → `;
    sourceFlagContainer.appendChild(sourceCodeSpan);

    sourceItem.appendChild(sourceFlagContainer);

    // Add amount
    const sourceValueSpan = document.createElement("span");
    sourceValueSpan.textContent = formatNumber(numericAmount);
    sourceItem.appendChild(sourceValueSpan);

    currenciesContainer.appendChild(sourceItem);

    // Create currency items in the specified order
    Object.keys(orderedCurrencies).forEach((targetCurrency) => {
      if (targetCurrency === sourceCurrency) return;

      const convertedValue = convertCurrency(
        numericAmount,
        sourceCurrency,
        targetCurrency,
        rates
      );

      const item = document.createElement("div");
      item.className = "currency-item";

      // Create flag container
      const flagContainer = document.createElement("div");
      flagContainer.style.display = "flex";
      flagContainer.style.alignItems = "center";
      flagContainer.style.gap = "6px";

      // Add flag
      flagContainer.appendChild(getFlagElement(targetCurrency));

      // Add currency code
      const codeSpan = document.createElement("span");
      codeSpan.textContent = `${targetCurrency} → `;
      flagContainer.appendChild(codeSpan);

      item.appendChild(flagContainer);

      // Add converted value
      const valueSpan = document.createElement("span");
      valueSpan.textContent = formatNumber(convertedValue);
      item.appendChild(valueSpan);

      currenciesContainer.appendChild(item);
    });

    // Calculate expanded height
    const itemHeight = 24;
    const padding = 16;
    const itemCount =
      Object.keys(orderedCurrencies).length -
      (orderedCurrencies[sourceCurrency] ? 1 : 0);
    const newHeight = Math.min(itemCount * itemHeight + padding + 60, 300);

    popupElement.style.height = `${newHeight}px`;
    updatePopupPosition(popupElement);
  });

  document.getElementById(`${POPUP_ID}-selection`).style.display = "flex";
  currenciesContainer.style.display = "flex";
  currentMode = "currencies";
  popupElement.style.pointerEvents = "none";
}

function updatePopupPosition(popup) {
  if (!lastSelectionRect) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;
  const popupHeight = popup.offsetHeight;
  const viewportHeight = window.innerHeight;
  const pointer = popup.querySelector("div");

  // Calculate positions
  const spaceAbove = lastSelectionRect.top - POPUP_DISTANCE;
  const spaceBelow = viewportHeight - lastSelectionRect.bottom - POPUP_DISTANCE;

  // Determine best position - prefer above if possible
  if (spaceAbove >= popupHeight) {
    // Position above selection (preferred)
    popup.style.top = `${
      lastSelectionRect.top + scrollY - popupHeight - POPUP_DISTANCE
    }px`;
    pointer.style.top = "100%";
    pointer.style.transform = "translateX(-50%)";
    pointer.style.borderLeft = "8px solid transparent";
    pointer.style.borderRight = "8px solid transparent";
    pointer.style.borderTop = "8px solid #ffffff";
    pointer.style.borderBottom = "none";
    pointer.style.filter = "drop-shadow(0 1px 1px rgba(0,0,0,0.1))";
  } else if (spaceBelow >= popupHeight) {
    // Position below selection
    popup.style.top = `${
      lastSelectionRect.bottom + scrollY + POPUP_DISTANCE
    }px`;
    pointer.style.top = "-8px";
    pointer.style.transform = "translateX(-50%)";
    pointer.style.borderLeft = "8px solid transparent";
    pointer.style.borderRight = "8px solid transparent";
    pointer.style.borderBottom = "8px solid #ffffff";
    pointer.style.borderTop = "none";
    pointer.style.filter = "drop-shadow(0 -1px 1px rgba(0,0,0,0.1))";
  } else {
    // Not enough space in either direction - adjust popup height and position below
    const adjustedHeight = Math.min(popupHeight, spaceBelow);
    popup.style.height = `${adjustedHeight}px`;
    popup.style.overflowY = "auto";
    popup.style.top = `${
      lastSelectionRect.bottom + scrollY + POPUP_DISTANCE
    }px`;
    pointer.style.top = "-8px";
    pointer.style.transform = "translateX(-50%)";
    pointer.style.borderLeft = "8px solid transparent";
    pointer.style.borderRight = "8px solid transparent";
    pointer.style.borderBottom = "8px solid #ffffff";
    pointer.style.borderTop = "none";
    pointer.style.filter = "drop-shadow(0 -1px 1px rgba(0,0,0,0.1))";
  }

  // Horizontal positioning (centered above/below selection)
  popup.style.left = `${
    lastSelectionRect.left + scrollX + lastSelectionRect.width / 2
  }px`;
}

// ===== MAIN APPLICATION =====

function initialize() {
  // Check the checkbox state before creating the popup
  chrome.storage.local.get(["checkboxState"], (result) => {
    // Explicitly check for true/false/undefined
    const isEnabled = result.checkboxState === true;

    if (!isEnabled) {
      return; // Exit if extension is disabled
    }

    const popup = createPopup();
    let mouseDownOnPopup = false;

    // Track if mouse down happened on the popup
    popup.addEventListener("mousedown", (e) => {
      mouseDownOnPopup = true;
    });

    // Click handler
    popup.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentMode === "selection" && lastSelectionValue) {
        showCurrenciesView(popup, lastSelectionValue);
      }
    });

    // Hide when clicking outside
    document.addEventListener("click", (e) => {
      if (!popup.contains(e.target) && !mouseDownOnPopup) {
        popup.style.display = "none";
        showSelectionView(popup, lastSelectionValue);
      }
      mouseDownOnPopup = false;
    });

    // Scroll/resize handling
    let debounceTimer;
    const handleScrollResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (popup.style.display === "flex") {
          updatePopupPosition(popup);
        }
      }, 100);
    };

    window.addEventListener("resize", handleScrollResize);

    // Selection change handler
    const handleSelectionChange = () => {
      chrome.storage.local.get(["checkboxState"], (result) => {
        if (result.checkboxState !== true) {
          popup.style.display = "none";
          return;
        }

        setTimeout(() => {
          const selection = window.getSelection();
          const selectedText = selection.toString().trim();

          if (!selection.isCollapsed && isCurrencyValue(selectedText)) {
            try {
              const range = selection.getRangeAt(0);
              lastSelectionRect = range.getBoundingClientRect();

              showSelectionView(popup, selectedText);
              popup.style.display = "flex";
              updatePopupPosition(popup);
            } catch (error) {
              console.error("Selection error:", error);
            }
          } else {
            popup.style.display = "none";
            lastSelectionRect = null;
          }
        }, 50);
      });
    };

    // Mouseup handler
    const handleMouseUp = (e) => {
      chrome.storage.local.get(["checkboxState"], (result) => {
        if (result.checkboxState !== true) {
          popup.style.display = "none";
          return;
        }

        if (!popup.contains(e.target)) {
          setTimeout(() => {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();

            if (!selection.isCollapsed && isCurrencyValue(selectedText)) {
              try {
                const range = selection.getRangeAt(0);
                lastSelectionRect = range.getBoundingClientRect();

                showSelectionView(popup, selectedText);
                popup.style.display = "flex";
                updatePopupPosition(popup);
              } catch (error) {
                console.error("Selection error:", error);
              }
            } else {
              popup.style.display = "none";
              lastSelectionRect = null;
            }
          }, 50);
        }
      });
    };

    function isCurrencyValue(text) {
      // First check if there's a valid number > 0
      const numericPart = detectCurrency(text).amount;
      const numberValue = parseNumber(numericPart);
      if (isNaN(numberValue) || numberValue <= 0) {
        return false;
      }

      // Then check for currency indicators
      const { currency, type } = detectCurrency(text);
      return (
        type !== "unknown" ||
        Object.keys(CURRENCY_SYMBOLS).some((s) => text.includes(s)) ||
        Object.keys(currencyToCountry).some((c) =>
          new RegExp(c, "i").test(text)
        )
      );
    }

    // Add event listeners
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", handleMouseUp);

    // Add storage change listener
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.checkboxState) {
        if (changes.checkboxState.newValue === false) {
          // Extension was disabled - hide popup
          popup.style.display = "none";
        }
      }
    });
  });
}

// Start the application
initialize();
