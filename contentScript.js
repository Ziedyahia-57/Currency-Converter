// ===== CONFIGURATION =====
const POPUP_ID = "currency-converter-popup";
const POPUP_DISTANCE = 20;
const CURRENCY_SYMBOLS = ["$", "€", "£", "¥", "₹", "₽", "₩", "₪", "₺", "₴"];
const CURRENCY_CODES = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTC",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLF",
  "CLP",
  "CNH",
  "CNY",
  "COP",
  "CRC",
  "CUC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STD",
  "STN",
  "SVC",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XAG",
  "XAU",
  "XCD",
  "XDR",
  "XOF",
  "XPD",
  "XPF",
  "XPT",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];
const DEFAULT_CURRENCIES = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.75,
};

// ===== STATE MANAGEMENT =====
let currentMode = "selection";
let lastSelectionValue = "";
let savedCurrencies = {};
let popupTopPosition = 0;
let isMouseDown = false;

// Initialize currencies from storage
// chrome.storage.sync.get(["currencies"], (result) => {
//   savedCurrencies = result.currencies || DEFAULT_CURRENCIES;
//   console.log("Loaded currencies:", savedCurrencies);
// });

chrome.runtime.sendMessage({ type: "GET_CURRENCY_ORDER" }, (response) => {
  const savedCurrencies = response.currencyOrder || DEFAULT_CURRENCIES;
  console.log("Received currencyOrder:", savedCurrencies);
});

// ===== CURRENCY DETECTION =====
function isCurrencyValue(text) {
  const symbolPattern = new RegExp(
    `^[${CURRENCY_SYMBOLS.join(
      ""
    )}]\\s?\\d+([.,]\\d+)?$|^\\d+([.,]\\d+)?\\s?[${CURRENCY_SYMBOLS.join("")}]$`
  );
  const codePattern = new RegExp(
    `^(${CURRENCY_CODES.join(
      "|"
    )})\\s?\\d+([.,]\\d+)?$|^\\d+([.,]\\d+)?\\s?(${CURRENCY_CODES.join("|")})$`,
    "i"
  );
  return symbolPattern.test(text.trim()) || codePattern.test(text.trim());
}

// ===== POPUP CREATION =====
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
    z-index: 99999999999999;
    display: none;
    flex-direction: column;
    padding: 4px;
    font-family: Arial, sans-serif;
    font-size: 13px;
    color: #333333;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    transform: translateX(-50%);
    cursor: pointer;
    top: ${POPUP_DISTANCE}px;
    pointer-events: auto;`;

  // Pointer triangle (now pointing downward)
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
    display: none;
    flex-direction: column;
    padding: 2px 12px;
    gap: 4px;
    color: #707070;
    font-style: normal;
  `;

  popup.appendChild(currenciesView);

  document.body.appendChild(popup);
  return popup;
}

// ===== VIEW MANAGEMENT =====
function showSelectionView(popup, value) {
  const popupElement = document.getElementById(POPUP_ID);
  popupElement.style.height = "fit-content";
  popupElement.style.pointerEvents = "auto";
  lastSelectionValue = value;
  document.getElementById(`${POPUP_ID}-text`).textContent = value;
  document.getElementById(`${POPUP_ID}-selection`).style.display = "flex";
  document.getElementById(`${POPUP_ID}-currencies`).style.display = "none";
  currentMode = "selection";
}

function showCurrenciesView(popup, baseValue) {
  const popupElement = document.getElementById(POPUP_ID);
  const currenciesContainer = document.getElementById(`${POPUP_ID}-currencies`);

  currenciesContainer.innerHTML =
    '<div style="padding:4px 0;text-align:center">Loading...</div>';

  // Get fresh currency data
  chrome.storage.sync.get(["currencies"], (result) => {
    savedCurrencies = result.currencies || DEFAULT_CURRENCIES;

    const numericValue =
      parseFloat(baseValue.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
    currenciesContainer.innerHTML = "";

    Object.entries(savedCurrencies).forEach(([currency, rate]) => {
      const convertedValue = (numericValue * rate).toFixed(2);
      const item = document.createElement("div");
      item.className = "currency-item"; // Apply the class

      // Add this to your popup's style section
      const style = document.createElement("style");
      style.textContent = `
  .currency-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
  }
  .currency-item:first-child {
    border-top: 1px solid lightgray;
    padding-top: 8px;
    margin-top: 4px;
  }
`;
      document.head.appendChild(style);

      item.innerHTML = `
    <span>${currency} → </span>
    <span>${convertedValue}</span>
  `;
      currenciesContainer.appendChild(item);
    });

    // Calculate expanded height (24px per item + padding)
    const itemHeight = 24;
    const padding = 16;
    const newHeight = Math.min(
      Object.keys(savedCurrencies).length * itemHeight + padding + 40, // 40px for selection row
      300 // Max height
    );

    popupElement.style.height = `${newHeight}px`;
    updatePopupPosition(popupElement);
  });

  document.getElementById(`${POPUP_ID}-selection`).style.display = "flex";
  currenciesContainer.style.display = "flex";
  currentMode = "currencies";
  popupElement.style.pointerEvents = "none";
}

let lastSelectionRect = null;

function updatePopupPosition(popup) {
  if (!lastSelectionRect) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;
  const popupHeight = popup.offsetHeight;

  // Try to position above selection first
  let proposedTop =
    lastSelectionRect.top + scrollY - popupHeight - POPUP_DISTANCE;
  const pointer = popup.querySelector("div");

  // Check if we have enough space above
  if (proposedTop >= scrollY) {
    // Position above selection
    popup.style.top = `${proposedTop}px`;

    // When positioning below selection:
    pointer.style.top = "";
    pointer.style.bottom = "-8px";
    pointer.style.borderTop = "8px solid #ffffff";
    pointer.style.borderBottom = "none";
    pointer.style.filter = "drop-shadow(0 1px 1px rgba(0,0,0,0.1))";
  } else {
    // Not enough space above, position below
    popup.style.top = `${
      lastSelectionRect.top +
      scrollY +
      lastSelectionRect.height +
      POPUP_DISTANCE
    }px`;
    pointer.style.top = "";
    pointer.style.bottom = "-8px";
    pointer.style.borderTop = "8px solid #ffffff";
    pointer.style.borderBottom = "none";
    pointer.style.filter = "drop-shadow(0 1px 1px rgba(0,0,0,0.1))";
  }

  popup.style.left = `${
    lastSelectionRect.left + scrollX + lastSelectionRect.width / 2
  }px`;
}

function handleSelection(popup) {
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
}

// ===== MAIN EXECUTION =====
(function init() {
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
    } else {
      showSelectionView(popup);
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

  // Selection events with small delay to avoid race condition with mouseup
  document.addEventListener("selectionchange", () => {
    setTimeout(() => handleSelection(popup), 50);
  });

  // Mouseup handler with additional checks
  document.addEventListener("mouseup", (e) => {
    if (!popup.contains(e.target)) {
      setTimeout(() => handleSelection(popup), 50);
    }
  });
})();
