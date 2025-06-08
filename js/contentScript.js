// ===== CONFIGURATION =====
const POPUP_ID = "currency-converter-popup";
const POPUP_DISTANCE = 20;

const CURRENCY_SYMBOLS = {
  // Single-currency symbols
  $: [
    "USD",
    "CAD",
    "AUD",
    "NZD",
    "SGD",
    "HKD",
    "MXN",
    "BRL",
    "CLP",
    "COP",
    "ZWL",
    "TTD",
    "BSD",
    "BZD",
    "BBD",
    "XCD",
    "SBD", // Solomon Islands
    "LRD", // Liberia
    "SRD", // Suriname
    "GYD", // Guyana
    "KYD", // Cayman Islands
    "FJD", // Fiji
    "JMD", // Jamaica
    "NAD", // Namibia
  ],
  "€": ["EUR"],
  "£": ["GBP", "EGP", "LBP", "SYP", "FKP", "GIP", "SDG", "SSP"],
  "₹": ["INR"],
  "₽": ["RUB"],
  "₩": ["KRW"],
  "₪": ["ILS"],
  "₺": ["TRY"],
  "₴": ["UAH"],
  "﷼": ["SAR", "IRR", "YER", "OMR", "QAR"],
  "ر.س": ["SAR"],
  "ر.ع": ["OMR"],
  "ر.ق": ["QAR"],
  "฿": ["THB"],
  "₫": ["VND"],
  "֏": ["AMD"],
  "₡": ["CRC"],
  "₦": ["NGN"],
  "₱": ["PHP"],
  "৳": ["BDT"],
  "₲": ["PYG"],
  "₮": ["MNT"],
  "₸": ["KZT"],
  "₾": ["GEL"],
  "៛": ["KHR"],
  "₵": ["GHS"],
  "₭": ["LAK"],
  "؋": ["AFN"],
  "₼": ["AZN"],
  ƒ: ["ANG", "AWG"],
  "₨": ["PKR", "NPR", "LKR", "MUR", "SCR"], // Could also include NPR, MUR, etc.
  "₿": ["BTC"],
  zł: ["PLN"],
  "Fr.": ["CHF", "XOF", "XAF", "CDF", "RWF", "BIF", "DJF", "GNF", "KMF", "MGA"],
  "₣": ["CHF", "XOF", "XAF", "CDF", "RWF", "BIF", "DJF", "GNF", "KMF", "MGA"],

  // Multi-currency symbols (now arrays)
  "¥": ["JPY", "CNY"],
  // Add other multi-currency symbols as needed
};

// Inline currencyToCountry mapping (instead of import)
const currencyToCountry = {
  AED: "ae",
  AFN: "af",
  ALL: "al",
  AMD: "am",
  ANG: "nl",
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
  BTC: "bc",
  BTN: "bt",
  BWP: "bw",
  BYN: "by",
  BZD: "bz",
  CAD: "ca",
  CDF: "cd",
  CHF: "ch",
  CLF: "cl",
  CLP: "cl",
  CNH: "cn",
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
  ILS: "ps",
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
  STN: "st",
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
  XAF: "cm",
  XAG: "xg",
  XAU: "xu",
  XCD: "ag",
  XDR: "xr",
  XOF: "bj",
  XPD: "xd",
  XPF: "pf",
  XPT: "xt",
  YER: "ye",
  ZAR: "za",
  ZMW: "zm",
  ZWL: "zw",
};

// ===== STATE MANAGEMENT =====
let currentMode = "selection";
let lastSelectionValue = "";
let savedCurrencies = {};
let lastSelectionRect = null;

// Initialize currencies from storage
chrome.storage.local.get(
  [
    "currencyOrder",
    "currencyData",
    "fiatDecimals",
    "cryptoDecimals",
    "numberFormat",
  ],
  (result) => {
    savedCurrencies = {
      currencyOrder: result.currencyOrder || [],
      currencyData: result.currencyData || {},
      fiatDecimals: result.fiatDecimals ?? 2,
      cryptoDecimals: result.cryptoDecimals ?? 8,
      numberFormat: result.numberFormat ?? "comma-dot",
    };

    if (result.currencyOrder && result.currencyData) {
      result.currencyOrder.forEach((currency) => {
        if (result.currencyData[currency]) {
          savedCurrencies[currency] = result.currencyData[currency];
        }
      });
    }
  }
);

// ===== UTILITY FUNCTIONS =====
function formatNumber(num, currency) {
  const fiatDecimals = savedCurrencies.fiatDecimals ?? 2;
  const cryptoDecimals = savedCurrencies.cryptoDecimals ?? 8;
  const [thousandOpt, decimalOpt] = (
    savedCurrencies.numberFormat ?? "comma-dot"
  ).split("-");

  const isCrypto = ["BTC", "ETH", "XRP"].includes(currency);
  const decimals = isCrypto ? cryptoDecimals : fiatDecimals;

  // Determine separators
  const thousandSep =
    thousandOpt === "comma"
      ? ","
      : thousandOpt === "dot"
      ? "."
      : thousandOpt === "space"
      ? " "
      : "";
  const decimalSep = decimalOpt === "comma" ? "," : ".";

  // Ensure proper rounding
  const factor = Math.pow(10, decimals);
  const roundedNum = Math.round(num * factor) / factor;

  // Format number with fixed decimals (no separators yet)
  let formatted = roundedNum.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: false,
  });

  // Split into integer and decimal parts
  const parts = formatted.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1] || "";

  // Apply thousand separators to integer part
  if (thousandSep) {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
  }

  // Combine parts with decimal separator
  formatted = decimalPart
    ? `${integerPart}${decimalSep}${decimalPart}`
    : integerPart;

  return formatted;
}

function parseNumber(text) {
  return parseNumberWithFormatDetection(text.replace(/\s+/g, ""));
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
      fallback.style.background = "var(--background)";
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
  for (const [symbol, currencies] of Object.entries(CURRENCY_SYMBOLS)) {
    if (cleanText.startsWith(symbol)) {
      const amountPart = cleanText.slice(symbol.length);
      const parsedNumber = parseNumberWithFormatDetection(amountPart);
      if (parsedNumber !== null && parsedNumber > 0) {
        return {
          currency: currencies[0], // Default to first currency in array
          possibleCurrencies: currencies, // All possible currencies for this symbol
          amount: amountPart,
          type: "symbol",
          symbol: symbol,
        };
      }
    }
  }

  // Check for symbol suffix
  for (const [symbol, currencies] of Object.entries(CURRENCY_SYMBOLS)) {
    if (cleanText.endsWith(symbol)) {
      const amountPart = cleanText.slice(0, -symbol.length);
      const parsedNumber = parseNumberWithFormatDetection(amountPart);
      if (parsedNumber !== null && parsedNumber > 0) {
        return {
          currency: currencies[0], // Default to first currency
          possibleCurrencies: currencies, // All possibilities
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
      const parsedNumber = parseNumberWithFormatDetection(amountPart);
      if (parsedNumber !== null && parsedNumber > 0) {
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
      const parsedNumber = parseNumberWithFormatDetection(amountPart);
      if (parsedNumber !== null && parsedNumber > 0) {
        return {
          currency: code.toUpperCase(),
          amount: amountPart,
          type: "code",
        };
      }
    }
  }

  // If no currency symbol/code found but has valid number, try to parse as number
  const parsedNumber = parseNumberWithFormatDetection(cleanText);
  if (parsedNumber !== null && parsedNumber > 0) {
    return {
      currency: "USD", // Default to USD
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

// New helper function to detect number format and parse accordingly
function parseNumberWithFormatDetection(text) {
  if (!text) return null;

  // Remove all whitespace first
  const cleanText = text.replace(/\s+/g, "");

  // Check for common number formats
  // 1. Comma thousand, dot decimal (1,234.56)
  if (/^[+-]?\d{1,3}(,\d{3})*(\.\d+)?$/.test(cleanText)) {
    return parseFloat(cleanText.replace(/,/g, ""));
  }

  // 2. Dot thousand, comma decimal (1.234,56)
  if (/^[+-]?\d{1,3}(\.\d{3})*(,\d+)?$/.test(cleanText)) {
    return parseFloat(cleanText.replace(/\./g, "").replace(/,/, "."));
  }

  // 3. Space thousand, dot decimal (1 234.56)
  if (/^[+-]?\d{1,3}( \d{3})*(\.\d+)?$/.test(cleanText)) {
    return parseFloat(cleanText.replace(/ /g, ""));
  }

  // 4. Space thousand, comma decimal (1 234,56)
  if (/^[+-]?\d{1,3}( \d{3})*(,\d+)?$/.test(cleanText)) {
    return parseFloat(cleanText.replace(/ /g, "").replace(/,/, "."));
  }

  // 5. No thousand, dot decimal (1234.56)
  if (/^[+-]?\d+(\.\d+)?$/.test(cleanText)) {
    return parseFloat(cleanText);
  }

  // 6. No thousand, comma decimal (1234,56)
  if (/^[+-]?\d+(,\d+)?$/.test(cleanText)) {
    return parseFloat(cleanText.replace(/,/, "."));
  }

  // If none of the patterns match
  return null;
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

  chrome.storage.local.get(["darkMode"], (result) => {
    const root = document.documentElement;
    if (result.darkMode === "dark") {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }
  });

  const popup = document.createElement("div");
  popup.id = POPUP_ID;
  popup.style.cssText = `
  top: ${POPUP_DISTANCE}px;`;

  // Check dark mode state

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
    border-bottom: 8px solid var(--background);
    filter: drop-shadow(0 -1px 1px rgba(0,0,0,0.1));
  `;
  popup.appendChild(pointer);

  // Selection view
  const selectionView = document.createElement("div");
  selectionView.id = `${POPUP_ID}-selection`;

  selectionView.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;width:16px;height:16px">
      <img class="icon" src="${chrome.runtime.getURL("icons/icon.png")}" 
           onerror="this.replaceWith('<div style=\\'width:16px;height:16px;background:var(--error);border-radius:2px\\'></div>')">
    </div>
    <span id="${POPUP_ID}-text" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px"></span>
  `;
  popup.appendChild(selectionView);

  // Currencies view
  const currenciesView = document.createElement("div");
  currenciesView.id = `${POPUP_ID}-currencies`;
  popup.appendChild(currenciesView);

  // Add style for currency items
  const style = document.createElement("style");
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

// ===== MODIFIED CODE =====
function showCurrenciesView(popup, baseText) {
  const popupElement = document.getElementById(POPUP_ID);
  const selectionView = document.getElementById(`${POPUP_ID}-selection`);
  const currenciesContainer = document.getElementById(`${POPUP_ID}-currencies`);

  // Clear previous currencies but keep the container structure
  currenciesContainer.innerHTML =
    '<div style="padding:4px 0;text-align:center">Loading...</div>';

  // Detect currency including possible alternatives
  const {
    currency: sourceCurrency,
    amount,
    type,
    symbol,
    possibleCurrencies = [sourceCurrency],
  } = detectCurrency(baseText);
  const numericAmount = parseNumber(amount);

  // Get fresh currency data
  chrome.storage.local.get(["currencyOrder", "currencyData"], (result) => {
    if (!result.currencyData) {
      currenciesContainer.innerHTML =
        '<div class="currency-error">No currency data available</div>';
      return;
    }

    const rates = result.currencyData || DEFAULT_CURRENCIES;
    let orderedCurrencies = {};

    // Create ordered list of currencies from settings
    if (result.currencyOrder) {
      result.currencyOrder.forEach((curr) => {
        if (rates[curr]) orderedCurrencies[curr] = rates[curr];
      });
    } else {
      orderedCurrencies = { ...rates };
    }

    // Store the original ordered currencies for reference
    const originalOrderedCurrencies = { ...orderedCurrencies };

    // Current base currency state
    let currentBaseCurrency = sourceCurrency;
    let currentSymbolIndex = 0;

    function renderConversions(baseCurrency, amount) {
      currenciesContainer.innerHTML = "";

      // Store current state in popup dataset
      const popupElement = document.getElementById(POPUP_ID);
      popupElement.dataset.baseCurrency = baseCurrency;
      popupElement.dataset.baseAmount = amount;
      // Add source currency as first item
      const sourceItem = document.createElement("div");
      sourceItem.className = `currency-item currency-source currency-highlight`;
      sourceItem.style.paddingTop = "8px";

      // Create flag container
      const sourceFlagContainer = document.createElement("div");
      sourceFlagContainer.style.display = "flex";
      sourceFlagContainer.style.alignItems = "center";
      sourceFlagContainer.style.gap = "2px";
      sourceFlagContainer.style.width = "68px";

      // Add flag
      sourceFlagContainer.appendChild(getFlagElement(baseCurrency));

      // Add currency code
      const sourceCodeSpan = document.createElement("span");
      sourceCodeSpan.textContent = baseCurrency;
      sourceCodeSpan.style.marginRight = "4px";
      sourceFlagContainer.appendChild(sourceCodeSpan);

      // Add symbol switcher if multiple currencies available
      if (possibleCurrencies.length > 1) {
        const switcher = document.createElement("div");
        switcher.className = "symbol-switcher";
        switcher.style.display = "flex";
        switcher.style.height = "14px";
        switcher.style.marginLeft = "4px";
        switcher.style.cursor = "pointer";

        const switcherIcon = document.createElement("span");
        switcherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
          <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
        </svg>`;
        switcherIcon.title = `Switch between ${possibleCurrencies.join(", ")}`;

        switcher.appendChild(switcherIcon);
        sourceFlagContainer.appendChild(switcher);

        // Inside the symbol switcher click handler:
        switcher.addEventListener("click", (e) => {
          e.stopPropagation();
          currentSymbolIndex =
            (currentSymbolIndex + 1) % possibleCurrencies.length;
          currentBaseCurrency = possibleCurrencies[currentSymbolIndex];

          // Update the popup dataset with new currency but keep the same amount
          const popupElement = document.getElementById(POPUP_ID);
          const currentAmount = parseFloat(popupElement.dataset.baseAmount);
          renderConversions(currentBaseCurrency, currentAmount);
        });
      }

      sourceItem.appendChild(sourceFlagContainer);

      // Add amount
      const sourceValueSpan = document.createElement("span");
      sourceValueSpan.textContent = formatNumber(amount, baseCurrency);
      sourceItem.appendChild(sourceValueSpan);

      currenciesContainer.appendChild(sourceItem);

      // Create currency items in the specified order
      Object.keys(originalOrderedCurrencies).forEach((targetCurrency) => {
        if (targetCurrency === baseCurrency) return;

        const convertedValue = convertCurrency(
          amount,
          baseCurrency,
          targetCurrency,
          rates
        );

        const item = document.createElement("div");
        item.className = "currency-item";
        item.dataset.currency = targetCurrency;

        // Create flag container
        const flagContainer = document.createElement("div");
        flagContainer.style.display = "flex";
        flagContainer.style.alignItems = "center";
        flagContainer.style.gap = "2px";
        flagContainer.style.width = "68px";

        // Add flag
        flagContainer.appendChild(getFlagElement(targetCurrency));

        // Add currency code
        const codeSpan = document.createElement("span");
        codeSpan.textContent = targetCurrency;
        codeSpan.style.marginRight = "4px";
        flagContainer.appendChild(codeSpan);

        item.appendChild(flagContainer);

        // Add converted value
        const valueSpan = document.createElement("span");
        valueSpan.textContent = formatNumber(convertedValue, targetCurrency);
        item.appendChild(valueSpan);

        currenciesContainer.appendChild(item);
      });

      // Calculate expanded height
      const itemHeight = 24;
      const padding = 16;
      const itemCount = Object.keys(originalOrderedCurrencies).length - 1;
      const newHeight = Math.min(itemCount * itemHeight + padding + 60, 300);

      popupElement.style.height = `${newHeight}px`;
      updatePopupPosition(popupElement);
    }

    // Initial render
    renderConversions(currentBaseCurrency, numericAmount);
  });

  currenciesContainer.style.display = "block";
  currentMode = "currencies";
  popupElement.style.pointerEvents = "auto";
}

function onDecimalPrecisionChange() {
  const newFiatDecimals = parseInt(fiatDecimalsInput.value);
  const newCryptoDecimals = parseInt(cryptoDecimalsInput.value);

  chrome.storage.local.set({
    fiatDecimals: newFiatDecimals,
    cryptoDecimals: newCryptoDecimals,
  });
}

// New helper function
function updateBaseCurrency(newCurrency, amount, rates) {
  const sourceCodeSpan = document.querySelector(
    "#currency-converter-popup .currency-source span"
  );
  const sourceValueSpan = document.querySelector(
    "#currency-converter-popup .currency-source span:last-child"
  );
  const flagContainer = document.querySelector(
    "#currency-converter-popup .currency-source .flag"
  );

  // Update code display
  sourceCodeSpan.textContent = `${newCurrency}    `;

  // Update flag
  flagContainer.innerHTML = "";
  flagContainer.appendChild(getFlagElement(newCurrency));

  // Update all conversions
  document
    .querySelectorAll(
      "#currency-converter-popup .currency-item:not(.currency-source)"
    )
    .forEach((item) => {
      const targetCurrency = item
        .querySelector("span")
        ?.textContent?.trim()
        .split(/\s+/)[0];
      if (targetCurrency && targetCurrency !== newCurrency) {
        const convertedValue = convertCurrency(
          amount,
          newCurrency,
          targetCurrency,
          rates
        );
        const valueSpan = item.querySelector("span:last-child");
        if (valueSpan) {
          valueSpan.textContent = formatNumber(convertedValue, targetCurrency);
        }
      }
    });
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
    pointer.style.borderTop = "8px solid var(--background)";
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
    pointer.style.borderBottom = "8px solid var(--background)";
    pointer.style.borderTop = "none";
    pointer.style.filter = "drop-shadow(0 -1px 1px rgba(0,0,0,0.1))";
  } else {
    // Not enough space in either direction - adjust popup height and position below
    const adjustedHeight = Math.min(popupHeight, spaceBelow);
    popup.style.height = `${adjustedHeight}px`;
    // popup.style.overflowY = "auto";
    popup.style.top = `${
      lastSelectionRect.bottom + scrollY + POPUP_DISTANCE
    }px`;
    pointer.style.top = "-8px";
    pointer.style.transform = "translateX(-50%)";
    pointer.style.borderLeft = "8px solid transparent";
    pointer.style.borderRight = "8px solid transparent";
    pointer.style.borderBottom = "8px solid var(--background)";
    pointer.style.borderTop = "none";
    pointer.style.filter = "drop-shadow(0 -1px 1px rgba(0,0,0,0.1))";
  }

  // Horizontal positioning (centered above/below selection)
  popup.style.left = `${
    lastSelectionRect.left + scrollX + lastSelectionRect.width / 2
  }px`;
}

function refreshDisplayedValues() {
  const popupElement = document.getElementById(POPUP_ID);
  if (!popupElement || !lastSelectionValue) return;

  // Get the current base currency and amount from popup dataset
  const baseCurrency = popupElement.dataset.baseCurrency;
  const baseAmount = parseFloat(popupElement.dataset.baseAmount);

  // Get fresh rates
  chrome.storage.local.get(
    ["currencyData", "fiatDecimals", "cryptoDecimals", "numberFormat"],
    (result) => {
      if (!result.currencyData) return;

      // Update saved currencies with latest settings
      savedCurrencies.fiatDecimals = result.fiatDecimals ?? 2;
      savedCurrencies.cryptoDecimals = result.cryptoDecimals ?? 8;
      savedCurrencies.numberFormat = result.numberFormat ?? "comma-dot";

      // Update all displayed values
      const currencyItems = document.querySelectorAll(
        ".currency-item:not(.currency-source)"
      );
      for (const item of currencyItems) {
        const currencyCode = item.dataset.currency;
        if (!currencyCode) continue;

        // Calculate new value with updated decimals
        const convertedValue = convertCurrency(
          baseAmount,
          baseCurrency,
          currencyCode,
          result.currencyData
        );

        // Find the value span - it should be the last span in the item
        const spans = item.querySelectorAll("span");
        if (spans.length >= 2) {
          const valueSpan = spans[spans.length - 1]; // Last span is the value
          valueSpan.textContent = formatNumber(convertedValue, currencyCode);
        }
      }

      // Also update the source amount display
      const sourceItem = document.querySelector(".currency-source");
      if (sourceItem) {
        const spans = sourceItem.querySelectorAll("span");
        if (spans.length >= 2) {
          const valueSpan = spans[spans.length - 1]; // Last span is the value
          valueSpan.textContent = formatNumber(baseAmount, baseCurrency);
        }
      }
    }
  );
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
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (
        (namespace === "local" && changes.darkMode) ||
        root.classList.contains("dark-mode")
      ) {
        chrome.storage.local.get(["darkMode"], (result) => {
          const root = document.documentElement;
          if (result.darkMode === "dark") {
            root.classList.add("dark-mode");
          } else {
            root.classList.remove("dark-mode");
          }
        });
      }
    });

    let isActive = false;
    let hideTimeout = null;
    let mouseDownOnPopup = false;

    // Track if mouse down happened on the popup
    popup.addEventListener("mousedown", (e) => {
      mouseDownOnPopup = true;
    });

    // Click handler
    popup.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
      if (currentMode === "selection" && lastSelectionValue) {
        showCurrenciesView(popup, lastSelectionValue);
      }
    });

    // Hide when clicking outside - modified version
    document.addEventListener("click", (e) => {
      // Only hide if:
      // 1. The click is outside the popup
      // 2. The click isn't on a selection (we check if selection is empty)
      const selection = window.getSelection();
      const clickedOnPopup = popup.contains(e.target);
      const hasSelection = !selection.isCollapsed;

      if (!clickedOnPopup && !hasSelection) {
        hidePopup();
      }
      mouseDownOnPopup = false;
    });

    function hidePopup() {
      // Only hide if we're not in the middle of interacting with the popup
      if (!mouseDownOnPopup) {
        const popupElement = document.getElementById(POPUP_ID);
        if (popupElement) {
          popupElement.style.display = "none";
          showSelectionView(popupElement, lastSelectionValue);
          isActive = false;
        }
      }
    }

    let isMouseOverPopup = false;

    popup.addEventListener("mouseenter", () => {
      isMouseOverPopup = true;
    });

    popup.addEventListener("mouseleave", () => {
      isMouseOverPopup = false;
    });

    // Then modify the document click handler to also check this:
    document.addEventListener("click", (e) => {
      const selection = window.getSelection();
      const clickedOnPopup = popup.contains(e.target) || isMouseOverPopup;
      const hasSelection = !selection.isCollapsed;

      if (!clickedOnPopup && !hasSelection) {
        hidePopup();
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
      }, 50);
    };

    window.addEventListener("resize", handleScrollResize);

    // Consolidated selection handler
    const handleSelection = () => {
      chrome.storage.local.get(["checkboxState", "currencyData"], (result) => {
        if (result.checkboxState !== true || !result.currencyData) {
          hidePopup();
          return;
        }

        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (!selection.isCollapsed && isCurrencyValue(selectedText)) {
          try {
            const range = selection.getRangeAt(0);
            lastSelectionRect = range.getBoundingClientRect();

            // Clear any pending hide operations
            if (hideTimeout) {
              clearTimeout(hideTimeout);
              hideTimeout = null;
            }

            showSelectionView(popup, selectedText);
            popup.style.display = "flex";
            updatePopupPosition(popup);
            isActive = true;
          } catch (error) {
            console.error("Selection error:", error);
          }
        } else if (isActive) {
          // Only hide if we were previously active
          hideTimeout = setTimeout(hidePopup, 100);
        }
      });
    };

    // Mouseup handler - use the same logic as selection change
    const handleMouseUp = (e) => {
      if (!popup.contains(e.target)) {
        handleSelection();
      }
    };

    // Add event listeners
    function isCurrencyValue(text) {
      // First check if there's a valid number > 0
      const { currency, amount, type } = detectCurrency(text);
      const numberValue = parseNumber(amount);

      // Reject if:
      // 1. No valid number parsed
      // 2. Number is 0 or negative
      // 3. No currency detected (type is "invalid")
      if (isNaN(numberValue) || numberValue <= 0 || type === "invalid") {
        return false;
      }

      // Reject if no currency detected but has number (we want explicit currency)
      if (type === "unknown") {
        return false;
      }

      // Count currency symbols in the text
      let symbolCount = 0;
      for (const symbol of Object.keys(CURRENCY_SYMBOLS)) {
        if (text.includes(symbol)) {
          symbolCount += text.split(symbol).length - 1;
        }
      }

      // Count currency codes in the text (case insensitive)
      let codeCount = 0;
      for (const code of Object.keys(currencyToCountry)) {
        const regex = new RegExp(code, "gi");
        const matches = text.match(regex);
        if (matches) {
          codeCount += matches.length;
        }
      }

      // Reject if multiple currency indicators found
      if (symbolCount + codeCount > 1) {
        return false;
      }

      // Additional checks for valid positioning
      const cleanText = text.replace(/\s+/g, "").trim();

      // Check for valid prefix/suffix patterns
      const validPatterns = [
        // Symbol prefix (€100)
        ...Object.keys(CURRENCY_SYMBOLS).map((s) => `^\\${s}[0-9,.]*$`),
        // Symbol suffix (100€)
        ...Object.keys(CURRENCY_SYMBOLS).map((s) => `^[0-9,.]*\\${s}$`),
        // Code prefix (USD100)
        ...Object.keys(currencyToCountry).map((c) => `^${c}[0-9,.]*$`),
        // Code suffix (100USD)
        ...Object.keys(currencyToCountry).map((c) => `^[0-9,.]*${c}$`),
      ];

      // Test against all valid patterns
      return validPatterns.some((pattern) =>
        new RegExp(pattern, "i").test(cleanText)
      );
    }

    // Add event listeners
    document.addEventListener("selectionchange", handleSelection);
    document.addEventListener("mouseup", handleMouseUp);

    // Add storage change listener
    chrome.storage.onChanged.addListener((changes, namespace) => {
      // Track if we need to refresh the display
      let needsRefresh = false;

      // 1. Handle checkbox state changes
      if (changes.checkboxState) {
        if (changes.checkboxState.newValue === false) {
          hidePopup();
          return; // No need to continue if extension was disabled
        }
      }

      // 2. Handle decimal precision changes
      if (changes.fiatDecimals || changes.cryptoDecimals) {
        if (changes.fiatDecimals) {
          savedCurrencies.fiatDecimals = changes.fiatDecimals.newValue;
        }
        if (changes.cryptoDecimals) {
          savedCurrencies.cryptoDecimals = changes.cryptoDecimals.newValue;
        }

        // If we're in currencies view, update the display
        if (currentMode === "currencies" && lastSelectionValue) {
          refreshDisplayedValues();
        }
      }

      // 3. Handle number format changes
      if (changes.numberFormat) {
        const [oldThousand, oldDecimal] = changes.numberFormat.oldValue?.split(
          "-"
        ) || ["comma", "dot"];
        const [newThousand, newDecimal] =
          changes.numberFormat.newValue.split("-");

        // Refresh if either separator changed
        if (oldThousand !== newThousand || oldDecimal !== newDecimal) {
          savedCurrencies.numberFormat = changes.numberFormat.newValue;
          if (currentMode === "currencies" && lastSelectionValue) {
            showCurrenciesView(
              document.getElementById(POPUP_ID),
              lastSelectionValue
            );
          }
        }
      }

      // 4. Handle currency data updates
      if (changes.currencyData) {
        savedCurrencies.currencyData = changes.currencyData.newValue;
        needsRefresh = true;
      }

      // 5. Handle currency order changes
      if (changes.currencyOrder) {
        savedCurrencies.currencyOrder = changes.currencyOrder.newValue;
        needsRefresh = true;
      }

      // Refresh display if needed and we're in currencies view
      if (needsRefresh && currentMode === "currencies" && lastSelectionValue) {
        refreshDisplayedValues();
        const { currency: baseCurrency, amount } =
          detectCurrency(lastSelectionValue);
        const numericAmount = parseNumber(amount);

        // Use latest rates from storage
        chrome.storage.local.get(["currencyData"], (result) => {
          if (result.currencyData) {
            // For most changes, just refresh values
            if (
              !changes.numberFormat ||
              changes.numberFormat.oldValue?.split("-")[0] ===
                changes.numberFormat.newValue?.split("-")[0]
            ) {
              needsRefresh = true;
            }
            // For thousand separator type changes, rebuild completely
            else {
              showCurrenciesView(
                document.getElementById(POPUP_ID),
                lastSelectionValue
              );
            }
          }
        });
      }

      // 6. Handle dark mode changes
      if (changes.darkMode) {
        const root = document.documentElement;
        if (changes.darkMode.newValue === "dark") {
          root.classList.add("dark-mode");
        } else {
          root.classList.remove("dark-mode");
        }
      }
    });
  });
}

// Start the application
initialize();
