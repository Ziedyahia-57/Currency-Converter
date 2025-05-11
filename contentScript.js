// ===== CONFIGURATION =====
const POPUP_ID = "currency-converter-popup";
const POPUP_DISTANCE = 40; // px above selection
const POPUP_HEIGHT = 32;

// ===== POPUP CREATION =====
function createPopup() {
  // Remove existing popup if any
  const existing = document.getElementById(POPUP_ID);
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = POPUP_ID;

  // Main popup styles
  popup.style.cssText = `
    position: absolute;
    background: #ffffff;
    height: ${POPUP_HEIGHT}px;
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

  // Create pointer triangle
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

  // Create icon container
  const iconContainer = document.createElement("div");
  iconContainer.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  `;

  // Add icon (with fallback)
  try {
    const iconImg = document.createElement("img");
    iconImg.src = chrome.runtime.getURL("icons/icon32.png");
    iconImg.style.cssText = `
      width: 16px;
      height: 16px;
      object-fit: contain;
    `;
    iconImg.onerror = () => {
      iconImg.remove();
      const fallback = document.createElement("div");
      fallback.style.cssText = `
        width: 16px;
        height: 16px;
        background: #ff3366;
        border-radius: 2px;
      `;
      iconContainer.appendChild(fallback);
    };
    iconContainer.appendChild(iconImg);
  } catch (e) {
    const fallback = document.createElement("div");
    fallback.textContent = "💰";
    iconContainer.appendChild(fallback);
  }

  // Create text element
  const text = document.createElement("span");
  text.id = `${POPUP_ID}-text`;
  text.style.cssText = `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  `;

  popup.appendChild(iconContainer);
  popup.appendChild(text);
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
  popup.style.display = "flex";
}

function showPopupForSelection(popup, selection) {
  try {
    const range = selection.getRangeAt(0);
    lastSelectionRect = range.getBoundingClientRect();

    // Update popup content
    const textElement = document.getElementById(`${POPUP_ID}-text`);
    textElement.textContent = selection.toString().trim().slice(0, 20);

    // Position popup
    updatePopupPosition(popup);
  } catch (error) {
    console.error("Selection error:", error);
  }
}

// ===== SCROLL/RESIZE HANDLING =====
function setupScrollHandler(popup) {
  window.addEventListener("resize", () => {
    if (popup.style.display === "flex") {
      updatePopupPosition(popup);
    }
  });
}

// ===== MAIN EXECUTION =====
(function init() {
  const popup = createPopup();
  setupScrollHandler(popup);

  // Selection handler
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.toString().trim()) {
      showPopupForSelection(popup, selection);
    } else {
      popup.style.display = "none";
      lastSelectionRect = null;
    }
  };

  // Event listeners
  document.addEventListener("selectionchange", handleSelection);
  document.addEventListener("mouseup", handleSelection);

  // Hide popup when clicking elsewhere
  document.addEventListener("mousedown", (e) => {
    if (!popup.contains(e.target)) {
      popup.style.display = "none";
      lastSelectionRect = null;
    }
  });
})();
