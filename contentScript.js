// ===== CONFIGURATION =====
const POPUP_ID = "currency-converter-popup";
const POPUP_DISTANCE = 40;
const CURRENCY_SYMBOLS = ["$", "€", "£", "¥", "₹", "₽", "₩", "₪", "₺", "₴"];
const CURRENCY_CODES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "INR",
  "RUB",
  "KRW",
  "ILS",
  "TRY",
  "UAH",
  "AUD",
  "CAD",
  "CNY",
];

// ===== CURRENCY DETECTION =====
function isCurrencyValue(text) {
  // Regex patterns
  const symbolFirstPattern = new RegExp(
    `^[${CURRENCY_SYMBOLS.join("")}]\\s?\\d+([.,]\\d+)?$`
  );
  const symbolLastPattern = new RegExp(
    `^\\d+([.,]\\d+)?\\s?[${CURRENCY_SYMBOLS.join("")}]$`
  );
  const codePattern = new RegExp(
    `^(${CURRENCY_CODES.join(
      "|"
    )})\\s?\\d+([.,]\\d+)?$|^\\d+([.,]\\d+)?\\s?(${CURRENCY_CODES.join("|")})$`,
    "i"
  );

  const trimmed = text.trim();
  return (
    symbolFirstPattern.test(trimmed) ||
    symbolLastPattern.test(trimmed) ||
    codePattern.test(trimmed)
  );
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
    height: 32px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 2147483647;
    pointer-events: none;
    display: none;
    align-items: center;
    padding: 0 12px;
    gap: 8px;
    font-family: Arial, sans-serif;
    font-size: 13px;
    color: #333333;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    transform: translateX(-50%);
  `;

  // Pointer triangle
  const pointer = document.createElement("div");
  pointer.style.cssText = `
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #ffffff;
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
  `;
  popup.appendChild(pointer);

  // Icon and text
  popup.innerHTML += `
    <div style="display:flex;align-items:center;justify-content:center;width:16px;height:16px">
      <img src="${chrome.runtime.getURL("icons/icon32.png")}" 
           style="width:16px;height:16px;object-fit:contain"
           onerror="this.replaceWith('<div style=\\'width:16px;height:16px;background:#ff3366;border-radius:2px\\'></div>')">
    </div>
    <span id="${POPUP_ID}-text" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px"></span>
  `;

  document.body.appendChild(popup);
  return popup;
}

// ===== SELECTION HANDLING =====
let lastSelectionRect = null;

function updatePopupPosition(popup) {
  if (!lastSelectionRect) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;

  popup.style.left = `${
    lastSelectionRect.left + scrollX + lastSelectionRect.width / 2
  }px`;
  popup.style.top = `${lastSelectionRect.top + scrollY - POPUP_DISTANCE}px`;
}

function handleSelection(popup) {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (!selection.isCollapsed && isCurrencyValue(selectedText)) {
    try {
      const range = selection.getRangeAt(0);
      lastSelectionRect = range.getBoundingClientRect();

      document.getElementById(`${POPUP_ID}-text`).textContent = selectedText;
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

  // Debounced scroll/resize handler
  let debounceTimer;
  const handleScrollResize = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (popup.style.display === "flex") {
        updatePopupPosition(popup);
      }
    }, 100);
  };

  window.addEventListener("scroll", handleScrollResize, { passive: true });
  window.addEventListener("resize", handleScrollResize);

  // Selection events
  document.addEventListener("selectionchange", () => handleSelection(popup));
  document.addEventListener("mouseup", () => handleSelection(popup));

  // Hide on click outside
  document.addEventListener("mousedown", (e) => {
    if (!document.getElementById(POPUP_ID).contains(e.target)) {
      popup.style.display = "none";
    }
  });
})();
