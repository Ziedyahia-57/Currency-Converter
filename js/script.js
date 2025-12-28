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
const hideChartsTab = document.getElementById("hide-charts-tab");
const hideWhitelistTab = document.getElementById("hide-whitelist-tab");
const hideBlacklistTab = document.getElementById("hide-blacklist-tab");
const donationTab = document.getElementById("donation-tab");
const settingsTab = document.getElementById("settings-tab");
const chartsTab = document.getElementById("charts-tab");
const whitelistTab = document.getElementById("whitelist-tab");
const blacklistTab = document.getElementById("blacklist-tab");
const supportDevBtn = document.getElementById("support-dev-btn");
const settingsBtn = document.getElementById("settings-btn");
const chartBtn = document.getElementById("chart-btn");
const editWhitelistBtn = document.getElementById("edit-whitelist-btn");
const editBlacklistBtn = document.getElementById("edit-blacklist-btn");
const whitelistStatus = document.getElementById("whitelist-status");
const blacklistStatus = document.getElementById("blacklist-status");
const donationButton = document.getElementById("support-dev-btn");
const formatSelector = document.getElementById("format");
const filterModeSelector = document.getElementById("filter");
const fiatDecimalSelector = document.getElementById("fiat-round");
const cryptoDecimalSelector = document.getElementById("crypto-round");
const themeSelector = document.getElementById("theme");
const dateSelector = document.getElementById("date");
const timeSelector = document.getElementById("time");
const convertTargetSelector = document.getElementById("target");
const pageConvertSelector = document.getElementById("page-convert");
const pageConvertSlider = document.getElementById("slider-page-convert");
const restoreBtn = document.getElementById("restore");
const customTheme = document.getElementById("custom-theme");
const customCryptoDecimals = document.getElementById("custom-crypto-decimal");
const customFiatDecimals = document.getElementById("custom-fiat-decimal");
const customFormat = document.getElementById("custom-format");
const customFilterMode = document.getElementById("custom-filter-mode");
const customDate = document.getElementById("custom-date");
const customTime = document.getElementById("custom-time");
const customPageConvert = document.getElementById("custom-page-convert");
const customConvertTarget = document.getElementById("custom-convert-target");
const lastUpdateElement = document.querySelector(".last-update");
const darkModeBtn = document.getElementById("dark-mode-btn");
const currencySearch = document.getElementById("currency-search");
const clearCurrencySearch = document.getElementById("clear-currency-search");
const root = document.documentElement;

const CURRENCY_DATA_KEY = "currencyData";
const LAST_UPDATED_KEY = "lastUpdated";

let currencies = [];
let exchangeRates = {};
let lastUserInput = null; // Track the last input the user typed in

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                      USER SETTINGS                                                   +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪------------------------------------------------------------*/
//⚪                        NUMBER FORMAT                       */
//⚪------------------------------------------------------------*/
async function saveNumberFormat() {
  //🟣 Save user's format preference

  return new Promise((resolve, reject) => {
    localStorage.setItem("numberFormat", formatSelector.value);
    chrome.storage.local.set({ numberFormat: formatSelector.value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("Format saved:", formatSelector.value);
        resolve();
      }
    });
  });
}
async function loadNumberFormat() {
  //🟣 Load user's format preference

  const result = await chrome.storage.local.get("numberFormat");
  const savedFormat = result.numberFormat;
  if (savedFormat) {
    formatSelector.value = savedFormat; // This sets the selected option
  }
  console.log(savedFormat);
  return savedFormat;
}

//⚪------------------------------------------------------------*/
//⚪                        FIAT DECIMALS                       */
//⚪------------------------------------------------------------*/
async function saveFiatDecimal() {
  //🟣 Save user's fiat decimal preference

  return new Promise((resolve, reject) => {
    localStorage.setItem("fiatDecimals", fiatDecimalSelector.value);
    chrome.storage.local.set({ fiatDecimals: fiatDecimalSelector.value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("FIAT Decimal Format saved:", fiatDecimalSelector.value);
        resolve();
      }
    });
  });
}
async function loadFiatDecimal() {
  //🟣 Load user's fiat decimal preference

  const result = await chrome.storage.local.get("fiatDecimals");
  const savedFormat = result.fiatDecimals;
  if (savedFormat) {
    fiatDecimalSelector.value = savedFormat; // This sets the selected option
  }
  console.log(savedFormat);
  return savedFormat;
}

//⚪------------------------------------------------------------*/
//⚪                      CRYPTO DECIMALS                       */
//⚪------------------------------------------------------------*/
async function saveCryptoDecimal() {
  //🟣 Save user's crypto decimal preference

  return new Promise((resolve, reject) => {
    localStorage.setItem("cryptoDecimals", cryptoDecimalSelector.value);
    chrome.storage.local.set({ cryptoDecimals: cryptoDecimalSelector.value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("Crypto Decimal Format saved:", cryptoDecimalSelector.value);
        resolve();
      }
    });
  });
}
async function loadCryptoDecimal() {
  //🟣 Load user's crypto decimal preference

  const result = await chrome.storage.local.get("cryptoDecimals");
  const savedFormat = result.cryptoDecimals;
  if (savedFormat) {
    cryptoDecimalSelector.value = savedFormat; // This sets the selected option
  }
  console.log(savedFormat);
  return savedFormat;
}

//⚪------------------------------------------------------------*/
//⚪                      THEME PREFERENCE                      */
//⚪------------------------------------------------------------*/
async function saveThemePreference() {
  //🟣 Save user's theme preference

  const selectedTheme = themeSelector.value;
  return new Promise((resolve, reject) => {
    localStorage.setItem("theme", selectedTheme);
    chrome.storage.local.set({ theme: selectedTheme }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("Theme preference saved:", selectedTheme);
        resolve();
      }
    });
  });
}

async function loadThemePreference() {
  //🟣 Load user's theme preference

  try {
    const result = await chrome.storage.local.get("theme");
    const savedTheme = result.theme;

    if (savedTheme) {
      themeSelector.value = savedTheme; // Set the selected option
      if (savedTheme === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        let preferredTheme = prefersDark ? "dark" : "light";
        console.log("Preferred theme based on system setting:", preferredTheme);
        localStorage.setItem("darkMode", preferredTheme);
        chrome.storage.local.set({ ["darkMode"]: preferredTheme });
        darkModeBtn.classList.add("auto");
        darkModeBtn.title = "Dark Mode - Auto";

        // Set up listener for system theme changes
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", systemThemeChangeHandler);
      }
      console.log("Loaded theme preference:", savedTheme);
      return savedTheme;
    } else {
      // No saved theme found - use system preference as default
      console.log("No saved theme found. Using system preference.");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      let preferredTheme = prefersDark ? "dark" : "light";

      // Set the theme selector to auto and apply system preference
      themeSelector.value = "auto";
      darkModeBtn.classList.add("auto");
      darkModeBtn.title = "Dark Mode - Auto";

      // Apply the theme
      root.classList.toggle("dark-mode", preferredTheme === "dark");
      darkModeBtn.classList.toggle("active", preferredTheme === "dark");

      // Save the preferences
      localStorage.setItem("theme", "auto");
      localStorage.setItem("darkMode", preferredTheme);
      chrome.storage.local.set({
        theme: "auto",
        darkMode: preferredTheme,
      });

      return "auto";
    }
  } catch (error) {
    console.error("Failed to load theme preference:", error);

    // Fallback to system preference on error
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let preferredTheme = prefersDark ? "dark" : "light";

    // Set the theme selector to auto and apply system preference
    themeSelector.value = "auto";
    darkModeBtn.classList.add("auto");
    darkModeBtn.title = "Dark Mode - Auto";

    // Apply the theme
    root.classList.toggle("dark-mode", preferredTheme === "dark");
    darkModeBtn.classList.toggle("active", preferredTheme === "dark");

    // Save the preferences
    localStorage.setItem("theme", "auto");
    localStorage.setItem("darkMode", preferredTheme);
    chrome.storage.local.set({
      theme: "auto",
      darkMode: preferredTheme,
    });

    // Set up listener for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", systemThemeChangeHandler);

    // Set up listener for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", systemThemeChangeHandler);

    return "auto";
  }
}

//⚪------------------------------------------------------------*/
//⚪                        FILTER MODE                         */
//⚪------------------------------------------------------------*/
async function saveFilterMode() {
  //🟣 Save user's filter mode preference

  return new Promise((resolve, reject) => {
    localStorage.setItem("filterMode", filterModeSelector.value);
    chrome.storage.local.set({ filterMode: filterModeSelector.value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("filter mode saved:", filterModeSelector.value);
        resolve();
      }
    });
  });
}
async function loadFilterMode() {
  //🟣 Load user's filter mode preference

  const result = await chrome.storage.local.get("filterMode");
  const savedFormat = result.filterMode;
  if (savedFormat) {
    filterModeSelector.value = savedFormat; // This sets the selected option
  }
  console.log(savedFormat);
  return savedFormat;
}

//⚪------------------------------------------------------------*/
//⚪                        DATE FORMAT                         */
//⚪------------------------------------------------------------*/
async function saveDateFormat() {
  //🟣 Save user's date preference

  return new Promise((resolve, reject) => {
    localStorage.setItem("date", dateSelector.value);
    chrome.storage.local.set({ date: dateSelector.value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("date Format saved:", dateSelector.value);
        resolve();
      }
    });
  });
}
async function loadDateFormat() {
  //🟣 Load user's date preference

  const result = await chrome.storage.local.get("date");
  const savedFormat = result.date;
  if (savedFormat) {
    dateSelector.value = savedFormat; // This sets the selected option
  }
  console.log(savedFormat);
  return savedFormat;
}

//⚪------------------------------------------------------------*/
//⚪                        TIME FORMAT                         */
//⚪------------------------------------------------------------*/
async function saveTimeFormat() {
  //🟣 Save user's time preference

  return new Promise((resolve, reject) => {
    localStorage.setItem("time", timeSelector.value);
    chrome.storage.local.set({ time: timeSelector.value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("time Format saved:", timeSelector.value);
        resolve();
      }
    });
  });
}
async function loadTimeFormat() {
  //🟣 Load user's time preference

  const result = await chrome.storage.local.get("time");
  const savedFormat = result.time;
  if (savedFormat) {
    timeSelector.value = savedFormat; // This sets the selected option
  }
  console.log(savedFormat);
  return savedFormat;
}

//⚪------------------------------------------------------------*/
//⚪                        PAGE CONVERT                        */
//⚪------------------------------------------------------------*/
async function savePageConvert() {
  //🟣 Save user's page convert preference

  return new Promise((resolve, reject) => {
    localStorage.setItem("pageConvert", pageConvertSelector.checked);
    chrome.storage.local.set({ pageConvert: pageConvertSelector.checked }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("pageConvert saved:", pageConvertSelector.checked);
        resolve();
      }
    });
  });
}
async function loadPageConvert() {
  //🟣 Load user's page convert preference

  const result = await chrome.storage.local.get("pageConvert");
  const savedFormat = result.pageConvert;
  if (savedFormat) {
    pageConvertSelector.checked = savedFormat; // This sets the selected option
  }
  console.log(savedFormat);
  return savedFormat;
}

//⚪------------------------------------------------------------*/
//⚪                       CONVERT TARGET                       */
//⚪------------------------------------------------------------*/
async function saveConvertTarget() {
  //🟣 Save user's convert target preference

  return new Promise((resolve, reject) => {
    localStorage.setItem("convertTarget", convertTargetSelector.value);
    chrome.storage.local.set({ convertTarget: convertTargetSelector.value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log("convertTarget saved:", convertTargetSelector.value);
        resolve();
      }
    });
  });
}
async function loadConvertTarget() {
  //🟣 Load user's convert target preference

  const result = await chrome.storage.local.get("convertTarget");
  const savedFormat = result.convertTarget;
  if (savedFormat) {
    convertTargetSelector.value = savedFormat; // This sets the selected option
  }
  console.log(savedFormat);
  return savedFormat;
}

//⚪------------------------------------------------------------*/
//⚪                        RESTORE BUTTON                      */
//⚪------------------------------------------------------------*/
restoreBtn.addEventListener("click", async () => {
  //🟣 Restore settings to default

  // Reset all settings to defaults
  themeSelector.value = "auto";
  formatSelector.value = "comma-dot";
  fiatDecimalSelector.value = "2";
  cryptoDecimalSelector.value = "8";
  filterModeSelector.value = "blacklist";
  dateSelector.value = "dd/mm/yyyy";
  timeSelector.value = "ampm";
  convertTargetSelector.value = "all";
  pageConvertSelector.checked = false;

  // Save all settings
  localStorage.setItem("theme", themeSelector.value);
  chrome.storage.local.set({ ["theme"]: themeSelector.value });

  localStorage.setItem("numberFormat", formatSelector.value);
  chrome.storage.local.set({ ["numberFormat"]: formatSelector.value });

  localStorage.setItem("fiatDecimals", fiatDecimalSelector.value);
  chrome.storage.local.set({ ["fiatDecimals"]: fiatDecimalSelector.value });

  localStorage.setItem("cryptoDecimals", cryptoDecimalSelector.value);
  chrome.storage.local.set({ ["cryptoDecimals"]: cryptoDecimalSelector.value });

  localStorage.setItem("date", dateSelector.value);
  chrome.storage.local.set({ ["date"]: dateSelector.value });

  localStorage.setItem("time", timeSelector.value);
  chrome.storage.local.set({ ["time"]: timeSelector.value });

  localStorage.setItem("convertTarget", convertTargetSelector.value);
  chrome.storage.local.set({ ["convertTarget"]: convertTargetSelector.value });

  localStorage.setItem("filterMode", filterModeSelector.value);
  chrome.storage.local.set({ ["filterMode"]: filterModeSelector.value });

  localStorage.setItem("pageConvert", pageConvertSelector.checked);
  chrome.storage.local.set({ ["pageConvert"]: pageConvertSelector.checked });

  // Reset all currency inputs to 0 with proper decimal places
  const inputs = document.querySelectorAll(".currency-input input");
  const separators = await getNumberFormatSeparators();

  for (const input of inputs) {
    const currency = input.dataset.currency;
    const decimalPlaces = await getDecimalPlaces(currency);
    const zeroValue = `0${separators.decimal}${"0".repeat(decimalPlaces)}`;

    input.value = await formatNumberWithCommas(zeroValue, input);
    input.dataset.previousValue = zeroValue;
  }

  // Update last updated time
  updateLastUpdateElement(navigator.onLine, localStorage.getItem(LAST_UPDATED_KEY));

  // Manually update UI for immediate effect
  customTheme.classList.add("custom-hidden");
  customFormat.classList.add("custom-hidden");
  customFilterMode.classList.add("custom-hidden");
  blacklistStatus.classList.add("selected");
  whitelistStatus.classList.remove("selected");
  customFiatDecimals.classList.add("custom-hidden");
  customCryptoDecimals.classList.add("custom-hidden");
  customDate.classList.add("custom-hidden");
  customTime.classList.add("custom-hidden");
  customPageConvert.classList.add("custom-hidden");
  customConvertTarget.classList.add("custom-hidden");

  // Manually apply the theme change
  darkModeBtn.classList.add("auto");
  darkModeBtn.title = "Dark Mode - Auto";

  // Check system preference and apply immediately
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const preferredTheme = prefersDark ? "dark" : "light";

  root.classList.toggle("dark-mode", preferredTheme === "dark");
  darkModeBtn.classList.toggle("active", preferredTheme === "dark");

  // Save the actual theme being used
  localStorage.setItem("darkMode", preferredTheme);
  chrome.storage.local.set({ ["darkMode"]: preferredTheme });

  numToTextElement.textContent = "ABC..."; // Clear if input is invalid
});

//⚪------------------------------------------------------------*/
//⚪                 CUSTOM SETTINGS INDICATOR                  */
//⚪------------------------------------------------------------*/
async function checkCustomSettings() {
  //🟣 Show "*" indicator for custom settings
  const formatSettings = await chrome.storage.local.get("numberFormat");
  const filterSettings = await chrome.storage.local.get("filterMode");
  const fiatDecimalsSettings = await chrome.storage.local.get("fiatDecimals");
  const cryptoDecimalsSettings = await chrome.storage.local.get("cryptoDecimals");
  const themeSettings = await chrome.storage.local.get("theme");
  const dateSettings = await chrome.storage.local.get("date");
  const timeSettings = await chrome.storage.local.get("time");
  const convertTargetSettings = await chrome.storage.local.get("convertTarget");
  const pageConvertSettings = await chrome.storage.local.get("pageConvert");

  if (formatSettings.numberFormat && formatSettings.numberFormat !== "comma-dot") {
    console.log("formatSettings: ", formatSettings.numberFormat);
    customFormat.classList.remove("custom-hidden");
  }

  if (filterSettings.filterMode && filterSettings.filterMode !== "blacklist") {
    console.log("filterSettings: ", filterSettings.filterMode);
    customFilterMode.classList.remove("custom-hidden");
    blacklistStatus.classList.remove("selected");
    whitelistStatus.classList.add("selected");
  }else{
    blacklistStatus.classList.add("selected");
    whitelistStatus.classList.remove("selected");
  }

  if (fiatDecimalsSettings.fiatDecimals && fiatDecimalsSettings.fiatDecimals != 2) {
    console.log("fiatDecimalsSettings: ", fiatDecimalsSettings.fiatDecimals);
    customFiatDecimals.classList.remove("custom-hidden");
  }
  console.log("cryptoDecimalsSettings: ", cryptoDecimalsSettings.cryptoDecimals);

  if (cryptoDecimalsSettings.cryptoDecimals && cryptoDecimalsSettings.cryptoDecimals != 8) {
    console.log("cryptoDecimalsSettings: ", cryptoDecimalsSettings.cryptoDecimals);
    customCryptoDecimals.classList.remove("custom-hidden");
  }

  if (themeSettings.theme && themeSettings.theme !== "auto") {
    console.log("themeSettings: ", themeSettings.theme);
    customTheme.classList.remove("custom-hidden");
  }

  if (dateSettings.date && dateSettings.date !== "dd/mm/yyyy") {
    console.log("dateSettings: ", dateSettings.date);
    customDate.classList.remove("custom-hidden");
  }

  if (timeSettings.time && timeSettings.time !== "ampm") {
    console.log("timeSettings: ", timeSettings.time);
    customTime.classList.remove("custom-hidden");
  }

  if (convertTargetSettings.convertTarget && convertTargetSettings.convertTarget !== "all") {
    console.log("convertTarget: ", convertTargetSettings.convertTarget);
    customConvertTarget.classList.remove("custom-hidden");
  }

  if (pageConvertSettings.pageConvert && pageConvertSettings.pageConvert !== false) {
    console.log("pageConvert: ", pageConvertSettings.pageConvert);
    customPageConvert.classList.remove("custom-hidden");
  }
}

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                    CONVERT ON SELECT                                                 +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const checkbox = document.getElementById("convert-on-select");
const CHECKBOX_STATE_KEY = "checkboxState";
//⚪------------------------------------------------------------*/
//⚪                          CHECKBOX                          */
//⚪------------------------------------------------------------*/
function saveCheckboxState() {
  //🟣 Save checkbox state to local storage when it changes
  checkbox.addEventListener("change", () => {
    localStorage.setItem(CHECKBOX_STATE_KEY, checkbox.checked); // Save boolean as string
    chrome.storage.local.set({ [CHECKBOX_STATE_KEY]: checkbox.checked });
    console.log("Checkbox state saved to localStorage:", checkbox.checked);
  });
}
function loadCheckboxState() {
  //🟣 Load checkbox state, apply default if there's no save

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

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                 DONATION TAB CONTENT                                                 +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//🟠------------------------------------------------------------*/
//🟠                        DONATION CLASS                      */
//🟠------------------------------------------------------------*/
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
        if (this.usedInteractions.length === donationContent.interactions.length) {
          this.usedInteractions = []; // Reset if all interactions used
        }

        const availableInteractions = donationContent.interactions.filter(
          (int) => !this.usedInteractions.includes(int.greeting)
        );

        const interaction =
          availableInteractions.length > 0
            ? availableInteractions[Math.floor(Math.random() * availableInteractions.length)]
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

    const availableMessages = donationContent.messages.filter((msg) => !this.usedMessages.includes(msg.greeting));

    const message =
      availableMessages.length > 0
        ? availableMessages[Math.floor(Math.random() * availableMessages.length)]
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

//🟠------------------------------------------------------------*/
//🟠                      DONATION HANDLER                      */
//🟠------------------------------------------------------------*/
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
      (typeof rawContent.greeting === "function" && int.greeting === rawContent.greeting.toString())
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
function handleDonationButtonClick() {
  //🟣 Function to handle the donation button click
  donationTracker.incrementClickCount();
  const donationContentElement = document.querySelector(".donation-content");
  if (donationContentElement) {
    donationContentElement.innerHTML = updateDonationContent();
  }
}

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                 DARK MODE FUNCTIONALITY                                              +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪------------------------------------------------------------*/
//⚪                          DARK MODE                         */
//⚪------------------------------------------------------------*/
function saveDarkMode() {
  //🟣 Save user's dark mode preference to local storage

  if (root.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "dark");
    chrome.storage.local.set({ ["darkMode"]: "dark" });
  } else {
    localStorage.setItem("darkMode", "light");
    chrome.storage.local.set({ ["darkMode"]: "light" });
  }
}
async function loadDarkMode() {
  //🟣 Load user's dark mode preference from local storage

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
  // Update title based on current state (after all class changes)
  if (darkModeBtn.classList.contains("auto")) {
    darkModeBtn.title = "Dark Mode - Auto";
  } else if (darkModeBtn.classList.contains("active")) {
    darkModeBtn.title = "Dark Mode - ON";
  } else {
    darkModeBtn.title = "Dark Mode - OFF";
  }
}
darkModeBtn.addEventListener("click", () => {
  //🟣 Toggle dark mode

  root.classList.toggle("dark-mode");
  darkModeBtn.classList.toggle("active");
  darkModeBtn.classList.remove("auto");
  saveDarkMode();

  // Update theme selector to manual
  themeSelector.value = "manual";
  customTheme.classList.remove("custom-hidden");
  chrome.storage.local.set({ ["theme"]: themeSelector.value });
  // Update title based on current state (after all class changes)
  if (darkModeBtn.classList.contains("auto")) {
    darkModeBtn.title = "Dark Mode - Auto";
  } else if (darkModeBtn.classList.contains("active")) {
    darkModeBtn.title = "Dark Mode - ON";
  } else {
    darkModeBtn.title = "Dark Mode - OFF";
  }
});

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                    LAST UPDATE DATE                                                  +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//🟠------------------------------------------------------------*/
//🟠                         DATE FETCH                         */
//🟠------------------------------------------------------------*/
function formatDateTime(dateString) {
  if (!dateString) return { dateText: "--/--/----", timeText: "--:--" };

  try {
    const date = new Date(dateString);
    const dateFormat = localStorage.getItem("date") || "dd/mm/yyyy";
    const timeFormat = localStorage.getItem("time") || "ampm";

    // Format date
    let dateText;
    switch (dateFormat) {
      case "mm/dd/yyyy":
        dateText = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(
          2,
          "0"
        )}/${date.getFullYear()}`;
        break;
      case "yyyy/mm/dd":
        dateText = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(
          date.getDate()
        ).padStart(2, "0")}`;
        break;
      default: // "dd/mm/yyyy"
        dateText = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}/${date.getFullYear()}`;
    }

    // Format time
    let timeText;
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    if (timeFormat === "24h") {
      timeText = `${String(hours).padStart(2, "0")}:${minutes}`;
    } else {
      // "ampm"
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12 (12 AM)
      timeText = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
    }

    return { dateText, timeText };
  } catch (error) {
    console.error("Error formatting date/time:", error);
    return { dateText: "Error", timeText: "!" };
  }
}

function updateLastUpdateElement(isOnline, lastUpdated) {
  if (!lastUpdated) {
    lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);
  }

  const { dateText, timeText } = formatDateTime(lastUpdated);

  lastUpdateElement.innerHTML = `
    <span class="${isOnline ? "green" : "red"}">● ${isOnline ? "Online" : "Offline"}</span>
    - Last Updated: <span class="date">${dateText}</span> at <span class="date">${timeText}</span>
  `;
}

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                     OFFLINE LAUNCH                                                   +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪------------------------------------------------------------*/
//⚪                       OFFLINE MESSAGE                      */
//⚪------------------------------------------------------------*/
function showOfflineMessage() {
  if (currencyContainer && !currencyContainer.querySelector(".first-launch-offline")) {
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
  const offlineMessage = currencyContainer?.querySelector(".first-launch-offline");
  if (offlineMessage) {
    offlineMessage.remove();

    // Reinitialize the app if we're coming back online
    if (navigator.onLine) {
      initializeApp();
    }
  }
}

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                 ONLINE/OFFLINE EVENTS                                                +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//🟠------------------------------------------------------------*/
//🟠                           ONLINE                           */
//🟠------------------------------------------------------------*/
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

  // Retry fetching missing favicons for whitelist
  let whitelistUpdated = false;
  for (let i = 0; i < whitelist.length; i++) {
    if (!whitelist[i].favicon) {
      const favicon = await getFaviconAsBase64(whitelist[i].url);
      if (favicon) {
        whitelist[i].favicon = favicon;
        whitelistUpdated = true;
      }
    }
  }
  if (whitelistUpdated) {
    saveWhitelist();
    renderWhitelist();
  }

  // Retry fetching missing favicons for blacklist
  let blacklistUpdated = false;
  for (let i = 0; i < blacklist.length; i++) {
    if (!blacklist[i].favicon) {
      const favicon = await getFaviconAsBase64(blacklist[i].url);
      if (favicon) {
        blacklist[i].favicon = favicon;
        blacklistUpdated = true;
      }
    }
  }
  if (blacklistUpdated) {
    saveBlacklist();
    renderBlacklist();
  }
});

//🟠------------------------------------------------------------*/
//🟠                           OFFLINE                          */
//🟠------------------------------------------------------------*/
window.addEventListener("offline", () => {
  console.log("App is offline. Loading saved exchange rates...");
  loadData();
  // Only show offline message if we have no cached data
  if (!localStorage.getItem(CURRENCY_DATA_KEY)) {
    showOfflineMessage();
  }
});

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                     OPEN/CLOSE TABS                                                  +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪------------------------------------------------------------*/
//⚪                        SETTINGS TAB                        */
//⚪------------------------------------------------------------*/
function openSettingsTab() {
  settingsTab.style.display = "block";
  void settingsTab.offsetHeight;
  settingsTab.classList.add("show");
  settingsTab.classList.remove("hidden");
}
settingsBtn.addEventListener("click", () => {
  openSettingsTab();
});
function closeSettingsTab() {
  settingsTab.classList.remove("show");
  settingsTab.classList.add("hidden");
  setTimeout(() => { if (settingsTab.classList.contains("hidden")) settingsTab.style.display = "none"; }, 300);
}
hideSettingsTab.addEventListener("click", () => {
  closeSettingsTab();
});

//⚪------------------------------------------------------------*/
//⚪                         CHARTS TAB                         */
//⚪------------------------------------------------------------*/
function openChartsTab() {
  chartsTab.style.display = "block";
  void chartsTab.offsetHeight;
  chartsTab.classList.add("show");
  chartsTab.classList.remove("hidden");
  
  // Initialize chart only when tab is opened
  if (typeof window.initChartsTab === "function") {
    window.initChartsTab();
  }
}
chartBtn.addEventListener("click", () => {
  openChartsTab();
});
function closeChartsTab() {
  chartsTab.classList.remove("show");
  chartsTab.classList.add("hidden");
  setTimeout(() => { if (chartsTab.classList.contains("hidden")) chartsTab.style.display = "none"; }, 300);
}
hideChartsTab.addEventListener("click", () => {
  closeChartsTab();
});

//⚪------------------------------------------------------------*/
//⚪                       WHITELIST TAB                        */
//⚪------------------------------------------------------------*/
const addLinkBtn = document.getElementById("add-whitelist-link-btn");
const addLinkInput = document.getElementById("add-whitelist-link");
const whitelistContent = document.getElementById("whitelist-content");
const WHITELIST_KEY = "whitelistedWebsites";
let whitelist = [];

function openWhitelistTab() {
  whitelistTab.style.display = "block";
  void whitelistTab.offsetHeight;
  whitelistTab.classList.add("show");
  whitelistTab.classList.remove("hidden");
  loadWhitelist(); // Load fresh data when opening tab
}
editWhitelistBtn.addEventListener("click", () => {
  openWhitelistTab();
});
function closeWhitelistTab() {
  whitelistTab.classList.remove("show");
  whitelistTab.classList.add("hidden");
  setTimeout(() => { if (whitelistTab.classList.contains("hidden")) whitelistTab.style.display = "none"; }, 300);
}
hideWhitelistTab.addEventListener("click", () => {
  closeWhitelistTab();
});

//⚪------------------------------------------------------------*/
//⚪                     WHITELIST LOGIC                        */
//⚪------------------------------------------------------------*/

function getDomain(url) {
  try {
    // Handle URLs without protocol
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }
    return new URL(url).hostname;
  } catch (e) {
    return null;
  }
}

async function getFaviconAsBase64(url) {
  const domain = getDomain(url);
  if (!domain) return null;

  // Don't attempt to fetch favicons when offline
  if (!navigator.onLine) {
    console.log('Offline: skipping favicon fetch for:', domain);
    return null;
  }

  console.log('Fetching favicon for:', domain);

  // Strategy 1: Google Favicon Service (Most reliable)
  try {
    const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    const base64 = await fetchImageAsBase64(googleFaviconUrl);
    if (base64) {
      console.log('Success with Google service for:', domain);
      return base64;
    }
  } catch (e) {
    console.warn('Google favicon service failed for:', domain, e);
  }

  // Strategy 2: Direct favicon.ico (HTTPS)
  try {
    const icoUrl = `https://${domain}/favicon.ico`;
    const base64 = await fetchImageAsBase64(icoUrl);
    if (base64) {
      console.log('Success with direct favicon.ico for:', domain);
      return base64;
    }
  } catch (e) {
    console.warn('HTTPS favicon.ico failed for:', domain, e);
  }

  // Strategy 3: Direct favicon.ico (HTTP)
  try {
    const icoUrl = `http://${domain}/favicon.ico`;
    const base64 = await fetchImageAsBase64(icoUrl);
    if (base64) {
      console.log('Success with HTTP favicon.ico for:', domain);
      return base64;
    }
  } catch (e) {
    console.warn('HTTP favicon.ico failed for:', domain, e);
  }

  // Strategy 4: DuckDuckGo Favicon Service
  try {
    const ddgFaviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
    const base64 = await fetchImageAsBase64(ddgFaviconUrl);
    if (base64) {
      console.log('Success with DuckDuckGo for:', domain);
      return base64;
    }
  } catch (e) {
    console.warn('DuckDuckGo favicon service failed for:', domain, e);
  }

  console.log('All favicon strategies failed for:', domain);
  return null;
}

// Helper function to fetch image and convert to base64
async function fetchImageAsBase64(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const blob = await response.blob();
    
    // Verify it's actually an image
    if (!blob.type.startsWith('image/')) {
      console.warn('Response is not an image:', url, blob.type);
      return null;
    }

    // Check if file size is reasonable (not a large file or error page)
    if (blob.size > 100000) { // 100KB limit
      console.warn('Favicon too large:', url, blob.size);
      return null;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('Fetch failed for:', url, error);
    return null;
  }
}



function isValidUrl(string) {
  const res = string.match(/^((http|https):\/\/)?([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/.*)?$/);
  return (res !== null);
}

function validateInput(inputElement, buttonElement) {
  const url = inputElement.value.trim();
  
  if (!url) {
    // Empty input
    inputElement.style.outline = "";
    buttonElement.disabled = true;
    buttonElement.style.cursor = "not-allowed";
    buttonElement.classList.add("disabled-btn");
    return false;
  }

  if (isValidUrl(url)) {
    // Valid URL
    inputElement.style.outline = "1px solid var(--primary-color)";
    buttonElement.disabled = false;
    buttonElement.style.cursor = "pointer";
    buttonElement.classList.remove("disabled-btn");
    return true;
  } else {
    // Invalid URL
    inputElement.style.outline = "1px solid #f8312f";
    buttonElement.disabled = true;
    buttonElement.style.cursor = "not-allowed";
    buttonElement.classList.add("disabled-btn");
    return false;
  }
}

async function saveWhitelist() {
  return new Promise((resolve, reject) => {
    localStorage.setItem(WHITELIST_KEY, JSON.stringify(whitelist));
    chrome.storage.local.set({ [WHITELIST_KEY]: whitelist }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        // console.log("Whitelist saved:", whitelist);
        resolve();
      }
    });
  });
}

async function loadWhitelist() {
  try {
    const result = await chrome.storage.local.get(WHITELIST_KEY);
    let savedWhitelist = result[WHITELIST_KEY];

    if (!savedWhitelist) {
       // Fallback to localStorage
       const localSaved = localStorage.getItem(WHITELIST_KEY);
       savedWhitelist = localSaved ? JSON.parse(localSaved) : [];
    }

    if (Array.isArray(savedWhitelist)) {
      // Migration: Convert strings to objects if needed
      whitelist = await Promise.all(savedWhitelist.map(async (item) => {
        if (typeof item === 'string') {
           const favicon = await getFaviconAsBase64(item);
           return { url: item, favicon: favicon };
        }
        return item;
      }));
      
      // Save if migration happened
      if (savedWhitelist.some(item => typeof item === 'string')) {
        saveWhitelist();
      }

      // Fetch missing favicons if online
      if (navigator.onLine) {
        let updated = false;
        for (let i = 0; i < whitelist.length; i++) {
          if (!whitelist[i].favicon) {
            const favicon = await getFaviconAsBase64(whitelist[i].url);
            if (favicon) {
              whitelist[i].favicon = favicon;
              updated = true;
            }
          }
        }
        if (updated) {
          await saveWhitelist();
        }
      }
    } else {
      whitelist = [];
    }
    renderWhitelist();
  } catch (error) {
    console.error("Error loading whitelist:", error);
    whitelist = [];
    renderWhitelist();
  }
}

function renderWhitelist() {
  // Remove existing links (but keep the add-whitelist-link div)
  const existingLinks = whitelistContent.querySelectorAll(".link");
  existingLinks.forEach((link) => link.remove());

  // Get the add-whitelist-link container to insert before it
  const addLinkContainer = whitelistContent.querySelector(".add-whitelist-link");

  whitelist.forEach((item) => {
    const url = item.url;
    const favicon = item.favicon || './icons/website.png'; // Fallback to default icon
    const displayUrl = url.length > 30 ? url.substring(0, 30) + "..." : url;
    const linkDiv = document.createElement("div");
    linkDiv.classList.add("link");
    linkDiv.innerHTML = `
      <img src="${favicon}" class="favicon" onerror="this.src='./icons/website.png'">
      <p class="added-link" title="${url}">${displayUrl}</p>
      <button class="remove-link-btn" title="Remove Link" data-url="${url}">✕</button>
    `;
    whitelistContent.insertBefore(linkDiv, addLinkContainer);
  });

  // Re-attach event listeners for remove buttons
  const removeButtons = whitelistContent.querySelectorAll(".remove-link-btn");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const urlToRemove = e.target.dataset.url;
      removeLink(urlToRemove);
    });
  });
}

async function addLink(url) {
  if (!url) return;
  
  // Basic validation/cleanup
  url = url.trim();
  if (!url) return;

  if (!isValidUrl(url)) {
    // Should be handled by UI validation, but double check
    return;
  }

  if (!whitelist.some(item => item.url === url)) {
    // Fetch favicon only if online, otherwise add with null favicon
    const favicon = navigator.onLine ? await getFaviconAsBase64(url) : null;
    whitelist.push({ url: url, favicon: favicon });
    await saveWhitelist();
    renderWhitelist();
  }
  addLinkInput.value = ""; // Clear input
  validateInput(addLinkInput, addLinkBtn); // Re-validate to disable button
}

async function removeLink(url) {
  // Remove from the data array
  whitelist = whitelist.filter((item) => item.url !== url);
  await saveWhitelist();
  
  // Remove the specific DOM element without re-rendering everything
  const linkToRemove = whitelistContent.querySelector(`.remove-link-btn[data-url="${url}"]`)?.closest('.link');
  if (linkToRemove) {
    linkToRemove.remove();
  }
}

// Event Listeners for Whitelist
// Event Listeners for Whitelist
addLinkBtn.addEventListener("click", () => {
  addLink(addLinkInput.value);
});

addLinkInput.addEventListener("input", () => {
  validateInput(addLinkInput, addLinkBtn);
});

// Initialize button state
validateInput(addLinkInput, addLinkBtn);

addLinkInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!addLinkBtn.disabled) {
      addLink(addLinkInput.value);
    }
  }
});

//⚪------------------------------------------------------------*/
//⚪                       BLACKLIST TAB                        */
//⚪------------------------------------------------------------*/
const addBlacklistLinkBtn = document.getElementById("add-blacklist-link-btn");
const addBlacklistLinkInput = document.getElementById("add-blacklist-link");
const blacklistContent = document.getElementById("blacklist-content");
const BLACKLIST_KEY = "blacklistedWebsites";
let blacklist = [];

function openBlacklistTab() {
  blacklistTab.style.display = "block";
  void blacklistTab.offsetHeight;
  blacklistTab.classList.add("show");
  blacklistTab.classList.remove("hidden");
  loadBlacklist(); // Load fresh data when opening tab
}
editBlacklistBtn.addEventListener("click", () => {
  openBlacklistTab();
});
function closeBlacklistTab() {
  blacklistTab.classList.remove("show");
  blacklistTab.classList.add("hidden");
  setTimeout(() => { if (blacklistTab.classList.contains("hidden")) blacklistTab.style.display = "none"; }, 300);
}
hideBlacklistTab.addEventListener("click", () => {
  closeBlacklistTab();
});

//⚪------------------------------------------------------------*/
//⚪                     BLACKLIST LOGIC                        */
//⚪------------------------------------------------------------*/

async function saveBlacklist() {
  return new Promise((resolve, reject) => {
    localStorage.setItem(BLACKLIST_KEY, JSON.stringify(blacklist));
    chrome.storage.local.set({ [BLACKLIST_KEY]: blacklist }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        // console.log("Blacklist saved:", blacklist);
        resolve();
      }
    });
  });
}

async function loadBlacklist() {
  try {
    const result = await chrome.storage.local.get(BLACKLIST_KEY);
    let savedBlacklist = result[BLACKLIST_KEY];

    if (!savedBlacklist) {
      // Fallback to localStorage
      const localSaved = localStorage.getItem(BLACKLIST_KEY);
      savedBlacklist = localSaved ? JSON.parse(localSaved) : [];
    }

    if (Array.isArray(savedBlacklist)) {
       // Migration: Convert strings to objects if needed
      blacklist = await Promise.all(savedBlacklist.map(async (item) => {
        if (typeof item === 'string') {
           const favicon = await getFaviconAsBase64(item);
           return { url: item, favicon: favicon };
        }
        return item;
      }));

      // Save if migration happened
      if (savedBlacklist.some(item => typeof item === 'string')) {
        saveBlacklist();
      }

      // Fetch missing favicons if online
      if (navigator.onLine) {
        let updated = false;
        for (let i = 0; i < blacklist.length; i++) {
          if (!blacklist[i].favicon) {
            const favicon = await getFaviconAsBase64(blacklist[i].url);
            if (favicon) {
              blacklist[i].favicon = favicon;
              updated = true;
            }
          }
        }
        if (updated) {
          await saveBlacklist();
        }
      }
    } else {
      blacklist = [];
    }
    renderBlacklist();
  } catch (error) {
    console.error("Error loading blacklist:", error);
    blacklist = [];
    renderBlacklist();
  }
}

function renderBlacklist() {
  // Remove existing links (but keep the add-whitelist-link div)
  const existingLinks = blacklistContent.querySelectorAll(".link");
  existingLinks.forEach((link) => link.remove());

  // Get the add-whitelist-link container to insert before it
  const addLinkContainer = blacklistContent.querySelector(".add-whitelist-link");

  blacklist.forEach((item) => {
    const url = item.url;
    const favicon = item.favicon || './icons/website.png'; // Fallback to default icon
    const displayUrl = url.length > 30 ? url.substring(0, 30) + "..." : url;
    const linkDiv = document.createElement("div");
    linkDiv.classList.add("link");
    linkDiv.innerHTML = `
      <img src="${favicon}" class="favicon" onerror="this.src='./icons/website.png'">
      <p class="added-link" title="${url}">${displayUrl}</p>
      <button class="remove-link-btn" title="Remove Link" data-url="${url}">✕</button>
    `;
    blacklistContent.insertBefore(linkDiv, addLinkContainer);
  });

  // Re-attach event listeners for remove buttons
  const removeButtons = blacklistContent.querySelectorAll(".remove-link-btn");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const urlToRemove = e.target.dataset.url;
      removeBlacklistLink(urlToRemove);
    });
  });
}

async function addBlacklistLink(url) {
  if (!url) return;
  
  // Basic validation/cleanup
  url = url.trim();
  if (!url) return;

  if (!isValidUrl(url)) {
    // Should be handled by UI validation
    return;
  }

  if (!blacklist.some(item => item.url === url)) {
    // Fetch favicon only if online, otherwise add with null favicon
    const favicon = navigator.onLine ? await getFaviconAsBase64(url) : null;
    blacklist.push({ url: url, favicon: favicon });
    await saveBlacklist();
    renderBlacklist();
  }
  addBlacklistLinkInput.value = ""; // Clear input
  validateInput(addBlacklistLinkInput, addBlacklistLinkBtn); // Re-validate
}

async function removeBlacklistLink(url) {
  // Remove from the data array
  blacklist = blacklist.filter((item) => item.url !== url);
  await saveBlacklist();
  
  // Remove the specific DOM element without re-rendering everything
  const linkToRemove = blacklistContent.querySelector(`.remove-link-btn[data-url="${url}"]`)?.closest('.link');
  if (linkToRemove) {
    linkToRemove.remove();
  }
}

// Event Listeners for Blacklist
addBlacklistLinkBtn.addEventListener("click", () => {
  addBlacklistLink(addBlacklistLinkInput.value);
});

addBlacklistLinkInput.addEventListener("input", () => {
  validateInput(addBlacklistLinkInput, addBlacklistLinkBtn);
});

// Initialize button state
validateInput(addBlacklistLinkInput, addBlacklistLinkBtn);

addBlacklistLinkInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!addBlacklistLinkBtn.disabled) {
      addBlacklistLink(addBlacklistLinkInput.value);
    }
  }
});

//⚪------------------------------------------------------------*/
//⚪                        CURRENCY TAB                        */
//⚪------------------------------------------------------------*/
function openCurrencyTab() {
  currencyTab.style.display = "block";
  void currencyTab.offsetHeight;
  currencyTab.classList.add("show");
  currencyTab.classList.remove("hidden");
}
function closeCurrencyTab() {
  currencyTab.classList.remove("show");
  currencyTab.classList.add("hidden");
  setTimeout(() => { if (currencyTab.classList.contains("hidden")) currencyTab.style.display = "none"; }, 300);
  // Reset selection state
  currentLetter = "";
  currentIndex = 0;
  matchingCurrencies = [];
  highlightedCurrency = null;
  // Reset search
  if (currencySearch) currencySearch.value = "";
  if (clearCurrencySearch) clearCurrencySearch.classList.add("hidden");
}
hideCurrencyTab.addEventListener("click", () => {
  closeCurrencyTab();
});

//⚪------------------------------------------------------------*/
//⚪                         TAX BUTTON                         */
//⚪------------------------------------------------------------*/
const taxBtn = document.getElementById("tax-btn");
const taxInput = document.getElementById("tax-input");
let isExpanded = false;

taxBtn.addEventListener("click", function (e) {
  if (!isExpanded) {
    // Expand the button
    taxBtn.classList.add("expanded");
    isExpanded = true;
    // Hide charts button when tax button is expanded
    chartBtn.classList.add("hide");
    setTimeout(() => {
    chartBtn.style.display = "none";
    }, 50);
    // Focus on input after transition
    setTimeout(() => {
      taxInput.focus();
      taxInput.select();
    }, 300);
  }
});

// Handle input validation and submission
// Handle keydown for strict character blocking
taxInput.addEventListener("keydown", function (e) {
  // Handle Arrow Up/Down
  if (e.key === "ArrowUp") {
    e.preventDefault();
    let val = parseFloat(taxInput.value);
    if (isNaN(val)) val = 0;
    
    const step = e.shiftKey ? 10 : 1;
    
    if (val < 100) {
      val += step;
      if (val > 100) val = 100; // Cap at 100
      
      // Fix floating point issues and keep decimals if present, otherwise integer
      val = Math.round(val * 100) / 100;
      taxInput.value = val;
      taxInput.dispatchEvent(new Event("input"));
    }
    return;
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    let val = parseFloat(taxInput.value);
    if (isNaN(val)) val = 0;
    
    const step = e.shiftKey ? 10 : 1;
    
    if (val > -100) {
      val -= step;
      if (val < -100) val = -100; // Cap at -100
      
      val = Math.round(val * 100) / 100;
      taxInput.value = val;
      taxInput.dispatchEvent(new Event("input"));
    }
    return;
  }
  const allowedKeys = ["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
  if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;

  // Prevent +, e, E
  if (["+", "e", "E"].includes(e.key)) {
    e.preventDefault();
    return;
  }

  // Handle minus
  if (e.key === "-") {
    // Allow only at start and if not already present
    // Also allow if selecting everything (replacement)
    const selectionLen = taxInput.selectionEnd - taxInput.selectionStart;
    const isReplacing = selectionLen === taxInput.value.length;
    
    if ((taxInput.selectionStart === 0 && !taxInput.value.includes("-")) || isReplacing) {
      return;
    }
    e.preventDefault();
    return;
  }

  // Handle decimal point
  if (e.key === "." || e.key === ",") {
    if (taxInput.value.includes(".") || taxInput.value.includes(",")) {
      e.preventDefault();
    }
    return;
  }

  // Allow only digits
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
});

// Handle input sanitization and logic
// taxInput.addEventListener("input", async function (e) {
//   let rawValue = e.target.value;
//   let cursorPosition = e.target.selectionStart;

//   // 1. Replace commas with dots
//   rawValue = rawValue.replace(/,/g, ".");

//   // 2. Strict sanitization: remove all invalid chars
//   let sanitized = rawValue.replace(/[^0-9.-]/g, "");

//   // 3. Fix minus checking (remove from anywhere except start)
//   if (sanitized.slice(1).includes("-")) {
//     sanitized = sanitized.charAt(0) + sanitized.slice(1).replace(/-/g, "");
//   }

//   // 4. Fix double dots
//   const parts = sanitized.split(".");
//   if (parts.length > 2) {
//     sanitized = parts[0] + "." + parts.slice(1).join("");
//   }

//   // 5. Leading zero fix (01 -> 1, -01 -> -1), but allow "0." and "-0."
//   if (/^0\d/.test(sanitized)) sanitized = sanitized.replace(/^0/, "");
//   if (/^-0\d/.test(sanitized)) sanitized = sanitized.replace(/^-0/, "-");

//   // 6. Range check
//   if (sanitized !== "" && sanitized !== "-" && sanitized !== ".") {
//     let numeric = parseFloat(sanitized);
//     if (!isNaN(numeric)) {
//       if (numeric < -100) sanitized = "-100";
//       else if (numeric > 100) sanitized = "100";
//     }
//   }

//   // Update value if changed
//   if (e.target.value !== sanitized) {
//     e.target.value = sanitized;
//     // Restore cursor (simple approximation)
//     let newCursor = Math.min(cursorPosition, sanitized.length);
//     e.target.setSelectionRange(newCursor, newCursor);
//   }

//   // Update conversions
//   const baseInput = await findBaseInput();
//   if (baseInput && baseInput.dataset) {
//     updateCurrencyValues(baseInput.dataset.currency);
//   }
// });

taxInput.addEventListener("input", async (e) => {
  // 1. SANITIZATION PHASE
  let rawValue = e.target.value;
  let cursorPosition = e.target.selectionStart;

  // Replace commas with dots
  rawValue = rawValue.replace(/,/g, ".");

  // Strict sanitization: remove all invalid chars
  let sanitized = rawValue.replace(/[^0-9.-]/g, "");

  // Fix minus checking (remove from anywhere except start)
  if (sanitized.slice(1).includes("-")) {
    sanitized = sanitized.charAt(0) + sanitized.slice(1).replace(/-/g, "");
  }

  // Fix double dots
  const parts = sanitized.split(".");
  if (parts.length > 2) {
    sanitized = parts[0] + "." + parts.slice(1).join("");
  }

  // Leading zero fix (01 -> 1, -01 -> -1), but allow "0." and "-0."
  if (/^0\d/.test(sanitized)) sanitized = sanitized.replace(/^0/, "");
  if (/^-0\d/.test(sanitized)) sanitized = sanitized.replace(/^-0/, "-");

  // Range check
  if (sanitized !== "" && sanitized !== "-" && sanitized !== ".") {
    let numeric = parseFloat(sanitized);
    if (!isNaN(numeric)) {
      if (numeric < -100) sanitized = "-100";
      else if (numeric > 100) sanitized = "100";
    }
  }

  // Update value if changed
  if (e.target.value !== sanitized) {
    e.target.value = sanitized;
    // Restore cursor (simple approximation)
    let newCursor = Math.min(cursorPosition, sanitized.length);
    e.target.setSelectionRange(newCursor, newCursor);
  }

  // 2. CONVERSION PHASE
  // Get the current tax percentage (use sanitized value)
  const taxPercentage = parseFloat(sanitized) || 0;
  
  // Find the base input that user manually typed into
  let baseInput = lastUserInput;
  if (!baseInput) {
    // Find the first input with a non-empty value
    const allInputs = document.querySelectorAll(".currency-input input");
    for (const input of allInputs) {
      if (input.value.trim() !== "") {
        baseInput = input;
        break;
      }
    }
  }
  
  if (baseInput) {
    updateCurrencyValues(baseInput.dataset.currency);
  }
});

taxInput.addEventListener("blur", function (e) {
  // Small delay to allow for other interactions
  setTimeout(() => {
    const value = taxInput.value;
    if (!value || value == 0 || value == "-0" || value == "." || value == "-") {
      collapseTaxButton();
    }
  }, 300);
});

function collapseTaxButton() {
  const value = taxInput.value;
  taxBtn.classList.remove("expanded");
  isExpanded = false;
  chartBtn.classList.remove("hide");
  setTimeout(() => {
    chartBtn.style.display = "flex";
  }, 150);

  // Don't clear if value is > 0
  if (!value || parseFloat(value) === 0 || value == "-0" || value == "." || value == "-") {
    taxInput.value = "";
    taxBtn.classList.remove("active");

    // Safely update conversions
    const baseInput = findBaseInput();
    if (baseInput && baseInput.dataset.currency) {
      updateCurrencyValues(baseInput.dataset.currency);
    }
  }
}

// Select all text when input is focused
taxInput.addEventListener("focus", function (e) {
  e.target.select();
});
document.addEventListener("click", function (e) {
  if (isExpanded && !taxBtn.contains(e.target)) {
    const value = parseFloat(taxInput.value);
    if (!value || (value > -1 && value < 1) || value < -100 || value > 100) {
      collapseTaxButton();
    }
  }
});

//⚪------------------------------------------------------------*/
//⚪                        DONATION TAB                        */
//⚪------------------------------------------------------------*/
function openDonationTab() {
  donationTab.classList.add("show");
  donationTab.classList.remove("hidden");
}
supportDevBtn.addEventListener("click", () => {
  openDonationTab();
});
function closeDonationTab() {
  donationTab.classList.remove("show");
  donationTab.classList.add("hidden");
}
hideDonationTab.addEventListener("click", () => {
  closeDonationTab();
});

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                               KEYBOARD/MOUSE NAVIGATION                                              +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
let currentLetter = "";
let currentIndex = 0;
let matchingCurrencies = [];
let highlightedCurrency = null;
//🟠------------------------------------------------------------*/
//🟠                            KEYBOARD                        */
//🟠------------------------------------------------------------*/
document.addEventListener("keydown", (event) => {
  if (!donationTab.classList.contains("hidden")) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDonationTab();
    }
  }
  if (!chartsTab.classList.contains("hidden")) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeChartsTab();
    }
  }
  if (!settingsTab.classList.contains("hidden") && whitelistTab.classList.contains("hidden") && blacklistTab.classList.contains("hidden")) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSettingsTab();
    }
  }
  if (!whitelistTab.classList.contains("hidden")) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeWhitelistTab();
    }
  }
  if (!blacklistTab.classList.contains("hidden")) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeBlacklistTab();
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

//⚪------------------------------------------------------------*/
//⚪                            MOUSE                           */
//⚪------------------------------------------------------------*/
currencyList.addEventListener("mousemove", (event) => {
  const option = event.target.closest(".currency-option");

  if (option && currencyList.contains(option)) {
    if (highlightedCurrency !== option) {
      removeHighlight();
      option.classList.add("currency-active");
      highlightedCurrency = option;
    }
  }
});

//⚪------------------------------------------------------------*/
//⚪                          HIGHLIGHT                         */
//⚪------------------------------------------------------------*/
function updateHighlight(newItem) {
  removeHighlight();
  highlightedCurrency = newItem;
  highlightedCurrency.classList.add("currency-active");
  highlightedCurrency.scrollIntoView({
    behavior: "auto",
    block: "nearest",
  });
}
function removeHighlight() {
  const previousHighlight = document.querySelector(".currency-active");
  if (previousHighlight) {
    previousHighlight.classList.remove("currency-active");
  }
}

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                      DRAG & DROP                                                     +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
let draggedItem = null;
//⚪------------------------------------------------------------*/
//⚪                            DRAG                            */
//⚪------------------------------------------------------------*/
currencyContainer.addEventListener("dragstart", (event) => {
  if (event.target.classList.contains("currency-input")) {
    draggedItem = event.target;

    // Visual feedback for the dragged item
    draggedItem.style.background = "var(--drag-background)";
    draggedItem.style.opacity = "0.5";
  }
});
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

//⚪------------------------------------------------------------*/
//⚪                            DROP                            */
//⚪------------------------------------------------------------*/
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

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                             EXCHANGE RATE / DATE FUNCTIONS                                           +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪------------------------------------------------------------*/
//⚪                        LOAD AND SAVE                       */
//⚪------------------------------------------------------------*/
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

function loadData() {
  //🟠
  console.log("LoadingData is active");
  const savedData = loadExchangeRates();
  if (savedData) {
    exchangeRates = savedData.rates;
    updateLastUpdateElement(false, savedData.lastUpdated); // Update the "last updated" date
  } else {
    updateLastUpdateElement(false);
  }
}

//⚪------------------------------------------------------------*/
//⚪                     FETCH EXCHANGE RATES                   */
//⚪------------------------------------------------------------*/
async function fetchExchangeRates() {
  try {
    const url = "https://ziedyahia-57.github.io/Currency-Converter/data.json?t=" + Date.now();
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

//⚪------------------------------------------------------------*/
//⚪                    UPDATE EXCHANGE RATES                   */
//⚪------------------------------------------------------------*/
async function updateExchangeRates() {
  exchangeRates = await fetchExchangeRates();
  updateCurrencyValues();
}

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                CURRENCY ORDER FUNCTIONS                                              +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//🟠------------------------------------------------------------*/
//🟠                        LOAD AND SAVE                       */
//🟠------------------------------------------------------------*/
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

//🟠------------------------------------------------------------*/
//🟠                       ADD A CURRENCY                       */
//🟠------------------------------------------------------------*/

function checkCurrencyCount() {
  //🟣 add the "x" button if more than 2 currencies exist
  const currencyInputs = document.querySelectorAll(".currency-input");
  const removeButtons = document.querySelectorAll(".remove-btn");

  if (currencyInputs.length > 2) {
    removeButtons.forEach((btn) => (btn.style.display = "flex"));
  } else {
    removeButtons.forEach((btn) => (btn.style.display = "none"));
  }
}
function updateAddButtonVisibility() {
  //🟣 Show or hide the "Add Currency" button based on the number of currencies
  if (currencies.length === Object.keys(exchangeRates || {}).length) {
    addCurrencyBtn.style.display = "none"; // Hide the button
  } else {
    addCurrencyBtn.style.display = "flex"; // Show the button
  }
}

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                               NUMBERS TO WORDS CONVERSION                                            +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const numToTextElement = document.getElementById("num-to-text");
//⚪------------------------------------------------------------*/
//⚪                         CONVERSION                         */
//⚪------------------------------------------------------------*/
// Update the number-to-text conversion event listener
if (numToTextElement) {
  currencyContainer.addEventListener("input", async (event) => {
    if (event.target.tagName === "INPUT") {
      const inputField = event.target;
      const separators = await getNumberFormatSeparators();

      // Remove all formatting to get raw number
      const rawValue = inputField.value
        .replace(new RegExp(`[${separators.thousand}]`, "g"), "")
        .replace(separators.decimal, ".");

      const number = parseFloat(rawValue);

      if (!isNaN(number) && typeof numberToWords !== "undefined") {
        let words = numberToWords.toWords(number);
        words = words.charAt(0).toUpperCase() + words.slice(1);
        numToTextElement.textContent = words;
      } else {
        numToTextElement.textContent = "ABC...";
      }
    }
  });
}

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                               ???????????????????????????                                            +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪------------------------------------------------------------*/
//⚪                         ??????????                         */
//⚪------------------------------------------------------------*/
async function renderCurrencyList(filterText = "") {
  currencyList.innerHTML = "";

  // Try to get fresh rates if online and not already fetched
  if (navigator.onLine && (!exchangeRates || Object.keys(exchangeRates).length === 0)) {
    try {
      exchangeRates = await fetchExchangeRates();
    } catch (error) {
      console.log("Using cached rates after online fetch error:", error);
    }
  }

  if (!exchangeRates) {
    exchangeRates = await fetchExchangeRates();
  }

  const filter = filterText.toUpperCase();
  // Sort currencies alphabetically
  const sortedCurrencies = Object.keys(exchangeRates).sort((a, b) => a.localeCompare(b));
  
  let foundCount = 0;
  sortedCurrencies.forEach((currency) => {
    if (!currencies.includes(currency) && (currency.toUpperCase().includes(filter))) {
      foundCount++;
      const option = document.createElement("div");
      option.classList.add("currency-option");

      // Get the country code for the currency
      const countryCode = currencyToCountry[currency] || "??"; // "??" is a fallback for unknown currencies

      // Add the flag and currency code to the option
      option.innerHTML = `
                    <img class="country-flag" src="icons/flags/${countryCode}.svg">
                    <span>${currency}</span>
                `;

      option.addEventListener("click", () => {
        addCurrency(currency);
        closeCurrencyTab();
        updateAddButtonVisibility();
      });

      currencyList.appendChild(option);
    }
  });

  if (foundCount === 0) {
    const noResults = document.createElement("div");
    noResults.classList.add("not-found");
    noResults.textContent = "Not Found";
    currencyList.appendChild(noResults);
  }
}

addCurrencyBtn.addEventListener("click", async () => {
  if (currencySearch) {
    currencySearch.value = "";
    clearCurrencySearch.classList.add("hidden");
  }
  openCurrencyTab();
  renderCurrencyList();
  if (currencySearch) {
    setTimeout(() => currencySearch.focus(), 350);
  }
});

if (currencySearch) {
  currencySearch.addEventListener("input", (e) => {
    const value = e.target.value;
    clearCurrencySearch.classList.toggle("hidden", value === "");
    renderCurrencyList(value);
  });
}

if (clearCurrencySearch) {
  clearCurrencySearch.addEventListener("click", () => {
    currencySearch.value = "";
    clearCurrencySearch.classList.add("hidden");
    renderCurrencyList();
    currencySearch.focus();
  });
}

//⚪------------------------------------------------------------*/
//⚪                         ??????????                         */
//⚪------------------------------------------------------------*/
document.getElementById("donation-content").innerHTML = updateDonationContent();

currencyTab.addEventListener("click", async (event) => {
  if (!(event.target instanceof HTMLInputElement) || event.target.id === "currency-search") return; // Ignore clicks on non-input elements or search
  if (!event.target.value) return; // Ignore empty values

  let rawValue = event.target.value.replace(/,/g, ""); // Remove commas from the input value

  if (!/^\d*\.?\d*$/.test(rawValue)) {
    event.target.value = event.target.dataset.previousValue || "0";
    return;
  } // Regex to allow only digits and one decimal point

  event.target.dataset.previousValue = rawValue;
  event.target.value = await formatNumberWithCommas(rawValue);
  updateCurrencyValues(parseFloat(rawValue) || 0, event.target.dataset.currency); // Update currency values based on input
});

function initializeInputStyles() {
  // Reset input styles
  document.querySelectorAll(".currency-input input").forEach((input) => {
    input.style.color = ""; // Reset to default color
    input.style.caretColor = ""; // Reset to default caret color
  });
}

//⚪------------------------------------------------------------*/
//⚪                         ??????????                         */
//⚪------------------------------------------------------------*/
function adjustContentHeight() {
  const windowHeight = window.innerHeight;
  let contentHeight;

  // Use the specific mappings you provided
  if (windowHeight <= 411) {
    contentHeight = 340;
  } else if (windowHeight <= 427) {
    contentHeight = 356;
  } else if (windowHeight <= 445) {
    contentHeight = 374;
  } else {
    // For larger windows, maintain the same ratio (windowHeight - 71)
    contentHeight = windowHeight - 71;
  }

  document.querySelector(".currency-converter-ex .content").style.height = `${contentHeight}px`;
}

//🔴++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//🔴+                                                     INITIALIZE APP                                                   +*/
//🔴++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
async function initializeApp() {
  try {
    console.log("Initializing app...");

    // Try to load rates (will throw if both network and cache fail)
    exchangeRates = await fetchExchangeRates();

    // Initialize currency list
    try {
      currencyContainer.innerHTML = "";
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

//🟣++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//🟣+                                                        LOAD APP                                                      +*/
//🟣++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// Define systemThemeChangeHandler outside of DOMContentLoaded to ensure it's available when needed
function systemThemeChangeHandler(e) {
  if (themeSelector.value === "auto") {
    const prefersDark = e.matches;
    const preferredTheme = prefersDark ? "dark" : "light";

    root.classList.toggle("dark-mode", preferredTheme === "dark");
    darkModeBtn.classList.toggle("active", preferredTheme === "dark");

    localStorage.setItem("darkMode", preferredTheme);
    chrome.storage.local.set({ ["darkMode"]: preferredTheme });
    darkModeBtn.title = "Dark Mode - Auto";
  }
  if (themeSelector.value === "manual") {
    darkModeBtn.classList.remove("auto");
    if (darkModeBtn.classList.contains("active")) {
      darkModeBtn.title = "Dark Mode - ON";
    } else {
      darkModeBtn.title = "Dark Mode - OFF";
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  loadDarkMode();
  window.addEventListener("load", adjustContentHeight);
  window.addEventListener("resize", adjustContentHeight);

  checkCustomSettings();

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

  loadThemePreference().then((theme) => {
    // Always set up listener for system theme changes, regardless of current theme
    // This ensures theme changes are detected in real-time when the extension launches
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", systemThemeChangeHandler);

    // If theme is set to auto, apply the system theme immediately
    if (theme === "auto" || themeSelector.value === "auto") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const preferredTheme = prefersDark ? "dark" : "light";
      root.classList.toggle("dark-mode", preferredTheme === "dark");
      darkModeBtn.classList.toggle("active", preferredTheme === "dark");
      localStorage.setItem("darkMode", preferredTheme);
      chrome.storage.local.set({ ["darkMode"]: preferredTheme });
      darkModeBtn.classList.add("auto");
      darkModeBtn.title = "Dark Mode - Auto";
    }
  });
  loadNumberFormat();
  loadFiatDecimal();
  loadCryptoDecimal();
  loadPageConvert();
  loadFilterMode();
  loadConvertTarget();
  loadTimeFormat();
  loadDateFormat();
  loadWhitelist();
  loadBlacklist();

  loadCheckboxState();
  checkCurrencyCount();
  updateAddButtonVisibility();
  initializeInputStyles(); // Initialize input styles

  // Donation Tab functionality
  donationButton.addEventListener("click", handleDonationButtonClick);

  saveCheckboxState();

  // Initial check
  updateLastUpdateElement(navigator.onLine, localStorage.getItem(LAST_UPDATED_KEY));

  // Initialize Chart Dropdowns
  initChartDropdowns();

  formatSelector.addEventListener("change", async function () {
    await saveNumberFormat();

    if (formatSelector.value !== "comma-dot") {
      customFormat.classList.remove("custom-hidden");
    } else {
      customFormat.classList.add("custom-hidden");
    }

    // Reformat all inputs with new separators but preserve values
    const inputs = document.querySelectorAll(".currency-input input");
    for (const input of inputs) {
      const currency = input.dataset.currency;
      const separators = await getNumberFormatSeparators();

      // Get current value without formatting
      let rawValue = input.value
        .replace(new RegExp(`[${separators.thousand}]`, "g"), "")
        .replace(separators.decimal, ".");

      // Ensure proper decimal places
      const decimalPlaces = await getDecimalPlaces(currency);
      let formattedValue = parseFloat(rawValue).toFixed(decimalPlaces).replace(".", separators.decimal);

      // Apply new formatting
      input.value = await formatNumberWithCommas(formattedValue, input);
      input.dataset.previousValue = rawValue;
    }
    await resetInputsWithNewFormat();
    numToTextElement.textContent = "ABC..."; // Clear if input is invalid

    // Update chart separators if they were already initialized
    if (typeof getNumberFormatSeparators === "function") {
      window.chartSeparators = await getNumberFormatSeparators();
      // If charts are initialized, re-render the current data to apply new formatting
      if (typeof window.updateChartWithData === "function" && window.initChartsTab) {
         window.updateChartWithData();
      }
    }
  });

  fiatDecimalSelector.addEventListener("change", async function () {
    await saveFiatDecimal();

    if (fiatDecimalSelector.value != 2) {
      customFiatDecimals.classList.remove("custom-hidden");
    } else {
      customFiatDecimals.classList.add("custom-hidden");
    }

    // Update all fiat currency inputs while preserving values and tax
    await updateAllCurrencyDecimals();
  });

  cryptoDecimalSelector.addEventListener("change", async function () {
    await saveCryptoDecimal();

    if (cryptoDecimalSelector.value != 8) {
      customCryptoDecimals.classList.remove("custom-hidden");
    } else {
      customCryptoDecimals.classList.add("custom-hidden");
    }

    // Update all crypto currency inputs while preserving values and tax
    await updateAllCurrencyDecimals();
  });

  dateSelector.addEventListener("change", function () {
    saveDateFormat();
    updateLastUpdateElement(navigator.onLine, localStorage.getItem(LAST_UPDATED_KEY));

    if (dateSelector.value !== "dd/mm/yyyy") {
      customDate.classList.remove("custom-hidden");
    } else {
      customDate.classList.add("custom-hidden");
    }
  });

  timeSelector.addEventListener("change", function () {
    saveTimeFormat();
    updateLastUpdateElement(navigator.onLine, localStorage.getItem(LAST_UPDATED_KEY));

    if (timeSelector.value !== "ampm") {
      customTime.classList.remove("custom-hidden");
    } else {
      customTime.classList.add("custom-hidden");
    }
  });

  filterModeSelector.addEventListener("change", function () {
    saveFilterMode();

    if (filterModeSelector.value !== "blacklist") {
      customFilterMode.classList.remove("custom-hidden");
      blacklistStatus.classList.remove("selected");
      whitelistStatus.classList.add("selected");
    } else {
      customFilterMode.classList.add("custom-hidden");
      blacklistStatus.classList.add("selected");
      whitelistStatus.classList.remove("selected");
    }
  });

  convertTargetSelector.addEventListener("change", function () {
    saveConvertTarget();

    if (convertTargetSelector.value !== "all") {
      customConvertTarget.classList.remove("custom-hidden");
    } else {
      customConvertTarget.classList.add("custom-hidden");
    }
  });

  pageConvertSelector.addEventListener("change", function () {
    pageConvertSlider.classList.add("currency-converter-ex-disabled");
    // Disable the selector to prevent rapid clicking
    pageConvertSelector.disabled = true;

    savePageConvert();

    if (pageConvertSelector.checked !== false) {
      customPageConvert.classList.remove("custom-hidden");
    } else {
      customPageConvert.classList.add("custom-hidden");
    }

    // Re-enable the selector after 1 second
    setTimeout(() => {
      pageConvertSelector.disabled = false;
      pageConvertSlider.classList.remove("currency-converter-ex-disabled");
    }, 2000);
  });

  themeSelector.addEventListener("change", function () {
    saveThemePreference();

    // Immediately apply the theme change
    const selectedTheme = themeSelector.value;

    if (selectedTheme === "auto") {
      darkModeBtn.title = "Dark Mode - Auto";
      darkModeBtn.classList.add("auto");
      darkModeBtn.title = "Dark Mode - Auto";

      // Detect system preference immediately
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const preferredTheme = prefersDark ? "dark" : "light";

      // Apply the theme
      root.classList.toggle("dark-mode", preferredTheme === "dark");
      darkModeBtn.classList.toggle("active", preferredTheme === "dark");

      // Save the actual theme being used
      localStorage.setItem("darkMode", preferredTheme);
      chrome.storage.local.set({ ["darkMode"]: preferredTheme });

      // Add event listener for future changes
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", systemThemeChangeHandler);
    } else {
      // Remove auto class and event listener when switching to manual mode
      darkModeBtn.classList.remove("auto");
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", systemThemeChangeHandler);

      // For light/dark modes, apply directly
      const isDark = selectedTheme === "dark";
      root.classList.toggle("dark-mode", isDark);
      darkModeBtn.classList.toggle("active", isDark);
      darkModeBtn.title = `Dark Mode - ${isDark ? "ON" : "OFF"}`;

      // Save the theme
      localStorage.setItem("darkMode", selectedTheme);
      chrome.storage.local.set({ ["darkMode"]: selectedTheme });
    }

    // Update custom theme indicator
    if (themeSelector.value !== "auto") {
      customTheme.classList.remove("custom-hidden");
    } else {
      customTheme.classList.add("custom-hidden");
    }
  });

  // systemThemeChangeHandler function is now defined above the DOMContentLoaded event listener
  loadDarkMode();

  initializeApp(); // Initialize the app
  await updateExchangeRates(); // Load exchange rates first
});

async function getDecimalPlaces(currency) {
  // Default values
  let fiatDecimals = 2;
  let cryptoDecimals = 8;

  try {
    const storage = await chrome.storage.local.get(["fiatDecimals", "cryptoDecimals"]);
    fiatDecimals = storage.fiatDecimals || "2";
    cryptoDecimals = storage.cryptoDecimals || 8;
  } catch (error) {
    console.error("Error getting decimal places from storage:", error);
  }

  if (currency === "BTC") {
    return parseInt(cryptoDecimals);
  }

  if (fiatDecimals === "currency-dependant") {
    try {
      // Use Intl.NumberFormat to get standard decimals for the currency
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).resolvedOptions().maximumFractionDigits;
    } catch (e) {
      // Fallback for invalid currencies or errors
      return 2;
    }
  }

  return parseInt(fiatDecimals);
}

async function updateAllCurrencyDecimals() {
  const inputs = document.querySelectorAll(".currency-input input");
  const taxPercentage = parseFloat(taxInput.value) || 0;
  const taxMultiplier = 1 + taxPercentage / 100;

  // Use the last input the user typed in, if available
  let baseInput = lastUserInput;

  // If no last input, get the first non-zero input to use as base
  if (!baseInput) {
    for (const input of inputs) {
      if (input.value.trim() !== "" && parseFloat(input.value.replace(/[^0-9.,]/g, "").replace(",", ".")) !== 0) {
        baseInput = input;
        break;
      }
    }
  }

  // If still no base input found, use the first input
  if (!baseInput && inputs.length > 0) {
    baseInput = inputs[0];
  }

  if (baseInput) {
    const baseCurrency = baseInput.dataset.currency;
    const separators = await getNumberFormatSeparators();

    // Get the raw value (remove thousand separators and standardize decimal)
    let rawValue = baseInput.value
      .replace(new RegExp(`[${separators.thousand}]`, "g"), "")
      .replace(separators.decimal, ".");
    const baseValue = parseFloat(rawValue) || 0;

    // Update all inputs with new decimal places
    for (const input of inputs) {
      const targetCurrency = input.dataset.currency;
      const taxDiff = document.getElementById(`tax-diff-${targetCurrency}`);
      const decimalPlaces = await getDecimalPlaces(targetCurrency);

      // For the last input the user typed in, just reformat with new decimals
      if (input === baseInput) {
        if (taxDiff) taxDiff.textContent = "";
        // Preserve the original value, just adjust decimal places
        const formattedValue = baseValue.toFixed(decimalPlaces).replace(".", separators.decimal);
        input.value = await formatNumberWithCommas(formattedValue, input);
        continue;
      }

      // For all other inputs, recalculate based on the user input value
      let convertedValue;
      if (baseCurrency === "USD") {
        convertedValue = baseValue * (exchangeRates[targetCurrency] || 1);
      } else if (targetCurrency === "USD") {
        convertedValue = baseValue / (exchangeRates[baseCurrency] || 1);
      } else {
        const baseRate = exchangeRates[baseCurrency] || 1;
        const targetRate = exchangeRates[targetCurrency] || 1;
        convertedValue = baseValue * (targetRate / baseRate);
      }

      let diffAmount = 0;
      // Apply tax if percentage != 0
      if (taxPercentage !== 0) {
        const preTaxValue = convertedValue;
        convertedValue *= taxMultiplier;
        diffAmount = convertedValue - preTaxValue;
      }

      // Update tax difference display
      if (taxDiff) {
        if (taxPercentage !== 0 && baseValue !== 0) {
          const sign = diffAmount >= 0 ? "+" : "";
          const formattedDiff = diffAmount.toFixed(decimalPlaces).replace(".", separators.decimal);
          taxDiff.textContent = `${sign}${formattedDiff}`;
        } else {
          taxDiff.textContent = "";
        }
      }

      // Toggle padding class based on tax
      if (taxPercentage !== 0 && baseValue !== 0) {
        input.closest(".currency-input")?.classList.add("has-tax-diff");
      } else {
        input.closest(".currency-input")?.classList.remove("has-tax-diff");
      }

      const formattedValue = convertedValue.toFixed(decimalPlaces).replace(".", separators.decimal);
      input.value = await formatNumberWithCommas(formattedValue, input);
    }
  }
}

//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////

window.getNumberFormatSeparators = getNumberFormatSeparators;
async function getNumberFormatSeparators() {
  try {
    // Get the numberFormat from chrome.storage.local
    const result = await chrome.storage.local.get("numberFormat");
    const numberFormat = result.numberFormat;

    // Define the separator mappings
    const separatorMap = {
      "comma-dot": { thousand: ",", decimal: "." },
      "dot-comma": { thousand: ".", decimal: "," },
      "space-dot": { thousand: " ", decimal: "." },
      "space-comma": { thousand: " ", decimal: "," },
      "none-dot": { thousand: "", decimal: "." },
      "none-comma": { thousand: "", decimal: "," },
    };

    // Get the separators from the map or use defaults (comma and dot)
    const separators = separatorMap[numberFormat] || {
      thousand: ",",
      decimal: ".",
    };

    return separators;
  } catch (error) {
    console.error("Error retrieving numberFormat:", error);
    // Return default separators (comma and dot) in case of error
    return { thousand: ",", decimal: "." };
  }
}

async function formatNumberWithCommas(value, inputElement) {
  try {
    const separators = await getNumberFormatSeparators();

    // Get current cursor position and original value
    const cursorPos = inputElement?.selectionStart ?? 0;
    const originalValue = inputElement?.value || "";

    // Clean the input value
    const decimalChar = separators.decimal === "." ? "\\." : separators.decimal;
    const cleanRegex = new RegExp(`[^\\d${decimalChar}]`, "g");
    let cleanValue = value.replace(cleanRegex, "");

    // Handle multiple decimal points
    const decimalSplit = cleanValue.split(separators.decimal);
    if (decimalSplit.length > 2) {
      cleanValue = decimalSplit[0] + separators.decimal + decimalSplit.slice(1).join("");
    }

    // Split into parts
    let [integerPart, decimalPart] = cleanValue.split(separators.decimal);
    
    // Only add thousand separators if there's an integer part
    if (integerPart === "" && cleanValue.includes(separators.decimal)) {
      integerPart = "0";
    }
    
    // Format integer part with thousand separators
    const formattedInteger = integerPart === "" && decimalPart === undefined ? "" : 
                           (integerPart === "" ? "0" : integerPart.replace(/^0+/, "") || "0").replace(/\B(?=(\d{3})+(?!\d))/g, separators.thousand);

    // Reconstruct full formatted value
    let formattedValue = formattedInteger;
    if (decimalPart !== undefined) {
      formattedValue += separators.decimal + decimalPart;
    }

    if (inputElement) {
      // Calculate new cursor position
      let newCursorPos = calculateNewCursorPosition(originalValue, formattedValue, cursorPos, separators);

      // Update input value
      inputElement.value = formattedValue;

      // Restore cursor position immediately (remove setTimeout)
      setTimeout(() => {
        inputElement.setSelectionRange(newCursorPos, newCursorPos);
      }, 1);
    }

    return formattedValue;
  } catch (error) {
    console.error("Error formatting number:", error);
    return value;
  }
}

function calculateNewCursorPosition(originalValue, formattedValue, cursorPos, separators) {
  // Handle edge cases
  if (cursorPos <= 0) return 0;
  if (cursorPos >= originalValue.length) return formattedValue.length;

  // Check if we just added a decimal separator
  const isAddingDecimal =
    originalValue.length < formattedValue.length &&
    originalValue.slice(0, cursorPos - 1) + separators.decimal === originalValue.slice(0, cursorPos);

  if (isAddingDecimal) {
    const decimalIndex = formattedValue.indexOf(separators.decimal);
    return decimalIndex >= 0 ? decimalIndex + 1 : cursorPos;
  }

  // Count characters before cursor position in original value
  let charCount = 0;
  let digitCount = 0;

  for (let i = 0; i < cursorPos && i < originalValue.length; i++) {
    const char = originalValue[i];
    if (/\d/.test(char)) {
      digitCount++;
    }
    charCount++;
  }

  // Find the equivalent position in formatted value
  let newPos = 0;
  let currentDigitCount = 0;

  for (let i = 0; i < formattedValue.length; i++) {
    const char = formattedValue[i];

    if (/\d/.test(char)) {
      currentDigitCount++;
      if (currentDigitCount >= digitCount) {
        newPos = i + 1;
        break;
      }
    }

    // If we haven't found enough digits and we're at the end
    if (i === formattedValue.length - 1) {
      newPos = formattedValue.length;
    }
  }

  // Ensure position is within bounds
  return Math.min(Math.max(newPos, 0), formattedValue.length);
}

async function addCurrency(currency, shouldSave = true) {
  // Prevent duplicate currencies
  if (currencies.includes(currency)) return;

  // Get current formatting preferences
  const decimalPlaces = await getDecimalPlaces(currency);
  const separators = await getNumberFormatSeparators();
  const initialDecimalPart = "0".repeat(decimalPlaces);

  // Find the best input to use as conversion base
  let baseInput = findConversionBaseInput();
  let initialValue = calculateInitialValue(baseInput, currency, decimalPlaces, separators);

  // Create the new currency element
  const currencyDiv = createCurrencyElement(currency, initialValue, separators);
  currencyContainer.appendChild(currencyDiv);

  // Set up event handlers
  setupCurrencyInputHandlers(currencyDiv, currency);

  // Update app state
  currencies.push(currency);
  checkCurrencyCount();
  updateAddButtonVisibility();

  if (shouldSave) {
    saveCurrencyOrder();
  }

  // Final recalculation to ensure tax and layout logic are applied to the new element
  if (baseInput) {
    updateCurrencyValues(baseInput.dataset.currency);
  }

  // Helper functions
  function findConversionBaseInput() {
    // Priority 1: Use the global lastUserInput as it's the guaranteed "Pure" (pre-tax) source
    if (lastUserInput && document.body.contains(lastUserInput)) {
      const val = lastUserInput.value.trim();
      if (val !== "") return lastUserInput;
    }

    const allInputs = Array.from(document.querySelectorAll(".currency-input input"));
    
    // Priority 2: Fallback to the first non-zero input
    const nonZeroInput = allInputs.find(i => {
      const val = i.value.trim();
      return val !== "" && parseFloat(val.replace(new RegExp(`[${separators.thousand}]`, "g"), "").replace(separators.decimal, ".")) !== 0;
    });
    if (nonZeroInput) return nonZeroInput;

    // Final fallback
    return allInputs[0] || document.querySelector(".currency-input input");
  }

  function calculateInitialValue(baseInput, targetCurrency, decimalPlaces, separators) {
    if (!baseInput || !baseInput.value || !exchangeRates) {
      return `0${separators.decimal}${initialDecimalPart}`;
    }

    const taxPercentage = parseFloat(taxInput.value) || 0;
    const taxMultiplier = 1 + taxPercentage / 100;

    const baseCurrency = baseInput.dataset.currency;
    const rawValue = baseInput.value
      .replace(new RegExp(`[${separators.thousand}]`, "g"), "")
      .replace(separators.decimal, ".");
    const baseValue = parseFloat(rawValue) || 0;

    // Perform the conversion
    let convertedValue;
    if (baseCurrency === "USD") {
      convertedValue = baseValue * (exchangeRates[targetCurrency] || 1);
    } else if (targetCurrency === "USD") {
      convertedValue = baseValue / (exchangeRates[baseCurrency] || 1);
    } else {
      const baseRate = exchangeRates[baseCurrency] || 1;
      const targetRate = exchangeRates[targetCurrency] || 1;
      convertedValue = baseValue * (targetRate / baseRate);
    }

    // Do NOT apply tax here. updateCurrencyValues(baseInput.dataset.currency) is called 
    // at the end of addCurrency, which will consistently apply tax, labels, and padding
    // to all target rows (including this new one).

    // Clear tax difference for now (it will be updated by updateCurrencyValues eventually)
    const taxDiff = document.getElementById(`tax-diff-${targetCurrency}`);
    if (taxDiff) taxDiff.textContent = "";

    // Format with correct decimal places and separators
    return convertedValue.toFixed(decimalPlaces).replace(".", separators.decimal);
  }

  function createCurrencyElement(currency, initialValue, separators) {
    const countryCode = currencyToCountry[currency] || "??";
    const currencyDiv = document.createElement("div");
    currencyDiv.classList.add("currency-input");
    currencyDiv.setAttribute("draggable", "true");

    // <div class="flag"><span class="fi fi-${countryCode}"></span></div>
    currencyDiv.innerHTML = `
      <div class="currency-info">
        <div class="flag"><img class="country-flag" src="icons/flags/${countryCode}.svg"></div>
        <label>${currency}</label>
      </div>
      <input type="text" data-currency="${currency}" value="${initialValue}" data-previous-value="${initialValue}">
      <div class="tax-difference" id="tax-diff-${currency}" title="Tax amount"></div>
      <button class="remove-btn" title="Remove">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
      </button>
    `;

    return currencyDiv;
  }

  async function setupCurrencyInputHandlers(currencyDiv, currency) {
    const inputField = currencyDiv.querySelector("input");
    const removeBtn = currencyDiv.querySelector(".remove-btn");

    // Initial formatting
    inputField.value = await formatNumberWithCommas(inputField.value, inputField);

    inputField.addEventListener("paste", async (event) => {
      event.preventDefault(); // Prevent default paste behavior

      // Track this as the last input the user typed in
      lastUserInput = inputField;

      // Get pasted text
      const pastedText = (event.clipboardData || window.clipboardData).getData("text");

      if (!pastedText) return;

      // Process the pasted value
      const processedValue = await processPastedValue(pastedText, inputField);

      // Set the processed value
      inputField.value = processedValue.formatted;
      inputField.dataset.previousValue = processedValue.raw;

      // Update cursor position
      setTimeout(() => {
        inputField.setSelectionRange(processedValue.cursorPos, processedValue.cursorPos);

        // Manually trigger the input event to update numToText
        const inputEvent = new Event("input", {
          bubbles: true,
          cancelable: true,
        });
        inputField.dispatchEvent(inputEvent);
      }, 1);

      // Trigger conversion
      updateCurrencyValues(inputField.dataset.currency);
    });

    inputField.addEventListener("input", async (event) => {
      const input = event.target;
      // Track this as the last input the user typed in
      lastUserInput = input;
      const separators = await getNumberFormatSeparators();
      const cursorPos = input.selectionStart;

      // Store the previous raw value (without any formatting)
      const previousRawValue = input.dataset.previousValue || "";

      // Get current value and clean it (remove all formatting)
      let rawValue = input.value.replace(new RegExp(`[${separators.thousand}]`, "g"), "");

      // Check if the change is valid
      const isBackspace = event.inputType === "deleteContentBackward";
      const isDelete = event.inputType === "deleteContentForward";

      if (!isBackspace && !isDelete) {
        // Validate characters - only allow digits and one decimal separator
        const decimalRegex = new RegExp(`^[\\d${separators.decimal}]*$`);
        if (!decimalRegex.test(rawValue)) {
          // Invalid character entered - revert to previous value
          input.value = await formatNumberWithCommas(previousRawValue, input);
          setTimeout(() => {
            const newPos = Math.max(0, cursorPos - 1);
            input.setSelectionRange(newPos, newPos);
          }, 0);
          return;
        }

        // Prevent multiple decimal separators
        const decimalCount = rawValue.split(separators.decimal).length - 1;
        if (decimalCount > 1) {
          input.value = await formatNumberWithCommas(previousRawValue, input);
          setTimeout(() => {
            const newPos = Math.max(0, cursorPos - 1);
            input.setSelectionRange(newPos, newPos);
          }, 0);
          return;
        }
      }

      // Save the raw value before formatting
      input.dataset.previousValue = rawValue;

      // Format the number (this will add thousand separators properly)
      await formatNumberWithCommas(rawValue, input);

      // Calculate and set the new cursor position
      const newCursorPos = calculateNewCursorPosition(previousRawValue, input.value, cursorPos, separators);

      setTimeout(() => {
        input.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);

      updateCurrencyValues(input.dataset.currency);
    });

    // Blur event handler for final formatting
    inputField.addEventListener("blur", async () => {
      const decimalPlaces = await getDecimalPlaces(currency);
      const separators = await getNumberFormatSeparators();
      let value = inputField.value.replace(new RegExp(`[${separators.thousand}]`, "g"), "");

      if (value === "") value = "0";

      // Ensure proper decimal places
      if (!value.includes(separators.decimal)) {
        value += separators.decimal + "0".repeat(decimalPlaces);
      } else {
        const parts = value.split(separators.decimal);
        if (parts[1].length < decimalPlaces) {
          parts[1] = parts[1].padEnd(decimalPlaces, "0");
        }
        value = parts.join(separators.decimal);
      }

      inputField.value = await formatNumberWithCommas(value, inputField);
    });

    // Focus event for UX
    inputField.addEventListener("focus", (event) => {
      // Track this as the last input the user clicked on
      lastUserInput = inputField;
      event.target.select();
    });

    // Remove currency handler
    removeBtn.addEventListener("click", () => {
      currencyDiv.remove();
      currencies = currencies.filter((c) => c !== currency);
      checkCurrencyCount();
      updateAddButtonVisibility();
      saveCurrencyOrder();
    });
  }
}

async function updateCurrencyValues(changedCurrency) {
  if (!changedCurrency) {
    console.warn("No currency specified for update");
    return;
  }

  const separators = await getNumberFormatSeparators();

  // Get tax percentage (default to 0 if empty)
  const taxPercentage = parseFloat(taxInput.value) || 0;
  const taxMultiplier = 1 + taxPercentage / 100;

  const changedInput = document.querySelector(`input[data-currency="${changedCurrency}"]`);

  if (!changedInput) {
    console.warn(`Input element for currency ${changedCurrency} not found`);
    return;
  }

  // Get raw value by removing thousand separators
  let rawValue = changedInput.value
    .replace(new RegExp(`[${separators.thousand}]`, "g"), "")
    .replace(separators.decimal, ".");

  // If input is empty or invalid, just clear others or handle as 0 without forcing "0" in the base input
  if (rawValue === "" || isNaN(rawValue)) {
    const inputs = document.querySelectorAll(".currency-input input");
    for (const input of inputs) {
      // Clear tax difference
      const taxDiff = document.getElementById(`tax-diff-${input.dataset.currency}`);
      if (taxDiff) taxDiff.textContent = "";

      if (input.dataset.currency === changedCurrency) continue;

      const targetCurrency = input.dataset.currency;
      const decimalPlaces = await getDecimalPlaces(targetCurrency);
      
      if (rawValue === "") {
        const zeroValue = `0${separators.decimal}${"0".repeat(decimalPlaces)}`;
        input.value = await formatNumberWithCommas(zeroValue, input);
        // Remove padding class when empty
        input.closest(".currency-input")?.classList.remove("has-tax-diff");
      } else {
        const zeroValue = `0${separators.decimal}${"0".repeat(decimalPlaces)}`;
        input.value = await formatNumberWithCommas(zeroValue, input);
      }
    }
    return;
  }

  const baseValue = parseFloat(rawValue) || 0;
  const baseCurrency = changedCurrency;

  // Update all other currency inputs
  const allInputs = document.querySelectorAll(".currency-input input");
  for (const input of allInputs) {
    const targetCurrency = input.dataset.currency;
    const taxDiff = document.getElementById(`tax-diff-${targetCurrency}`);

    if (!targetCurrency || targetCurrency === changedCurrency) {
      if (taxDiff) taxDiff.textContent = "";
      input.closest(".currency-input")?.classList.remove("has-tax-diff");
      continue;
    }

    const decimalPlaces = await getDecimalPlaces(targetCurrency);

    // Calculate converted value
    let convertedValue;
    if (baseCurrency === "USD") {
      convertedValue = baseValue * (exchangeRates[targetCurrency] || 1);
    } else if (targetCurrency === "USD") {
      convertedValue = baseValue / (exchangeRates[baseCurrency] || 1);
    } else {
      const baseRate = exchangeRates[baseCurrency] || 1;
      const targetRate = exchangeRates[targetCurrency] || 1;
      convertedValue = baseValue * (targetRate / baseRate);
    }

    let diffAmount = 0;
    // Apply tax if percentage != 0
    if (taxPercentage !== 0) {
      const preTaxValue = convertedValue;
      convertedValue *= taxMultiplier;
      diffAmount = convertedValue - preTaxValue;
    }

    // Format the final value
    let formattedValue = convertedValue.toFixed(decimalPlaces);
    
    // Update tax difference display
    if (taxDiff) {
      if (taxPercentage !== 0 && baseValue !== 0) {
        const sign = diffAmount >= 0 ? "+" : "";
        const formattedDiff = diffAmount.toFixed(decimalPlaces).replace(".", separators.decimal);
        taxDiff.textContent = `${sign}${formattedDiff}`;
      } else {
        taxDiff.textContent = "";
      }
    }

    // Toggle padding class based on tax
    if (taxPercentage !== 0 && baseValue !== 0) {
      input.closest(".currency-input")?.classList.add("has-tax-diff");
    } else {
      input.closest(".currency-input")?.classList.remove("has-tax-diff");
    }

    input.value = await formatNumberWithCommas(formattedValue, input);
  }
}

async function resetInputsWithNewFormat() {
  const separators = await getNumberFormatSeparators();
  const inputs = document.querySelectorAll(".currency-input input");

  for (const input of inputs) {
    const currency = input.dataset.currency;
    const decimalPlaces = await getDecimalPlaces(currency);
    const decimalPart = "0".repeat(decimalPlaces);
    const zeroValue = `0${separators.decimal}${decimalPart}`;

    // Format and set the value
    input.value = await formatNumberWithCommas(zeroValue, input);
    input.dataset.previousValue = zeroValue;
  }
}

async function findBaseInput() {
  try {
    const separators = await getNumberFormatSeparators();

    // Try to find a non-zero input first
    const nonZeroInput = document.querySelector(
      `.currency-input input:not([value="0"]):not([value^="0${separators.decimal}"])`
    );
    if (nonZeroInput) return nonZeroInput;

    // Fallback to first input with any value
    const firstWithValue = document.querySelector('.currency-input input:not([value=""])');
    if (firstWithValue) return firstWithValue;

    // Final fallback to first input
    return document.querySelector(".currency-input input");
  } catch (error) {
    console.error("Error in findBaseInput:", error);
    return document.querySelector(".currency-input input");
  }
}

/*Paste formatting*/
async function processPastedValue(pastedText, inputField) {
  const separators = await getNumberFormatSeparators();
  const decimalPlaces = await getDecimalPlaces(inputField.dataset.currency);

  // Remove all thousand separators (both comma and dot initially)
  let cleanedValue = pastedText.replace(/[,.]/g, (match) => {
    // Decimal separator replacement will be handled separately
    return match;
  });

  // Now find the rightmost separator that could be a decimal
  const lastCommaPos = cleanedValue.lastIndexOf(",");
  const lastDotPos = cleanedValue.lastIndexOf(".");

  // Determine which separator to treat as decimal
  let decimalSeparatorPos = -1;

  // Check if there's only one separator and exactly three digits after it
  const separatorsCount = (cleanedValue.match(/[,.]/g) || []).length;
  const digitsAfterLastSeparator = cleanedValue
    .substring(Math.max(lastCommaPos, lastDotPos) + 1)
    .replace(/[^0-9]/g, "").length;

  if (separatorsCount === 1 && digitsAfterLastSeparator === 3) {
    // Single separator with exactly three digits after it - treat as thousand separator
    decimalSeparatorPos = -1;
  } else if (lastCommaPos > lastDotPos) {
    decimalSeparatorPos = lastCommaPos;
  } else if (lastDotPos > lastCommaPos) {
    decimalSeparatorPos = lastDotPos;
  }

  // Process the number
  if (decimalSeparatorPos >= 0) {
    // Decimal separator found - split the number
    const beforeDecimal = cleanedValue.substring(0, decimalSeparatorPos).replace(/[^0-9]/g, ""); // Remove any remaining non-digits
    const afterDecimal = cleanedValue.substring(decimalSeparatorPos + 1).replace(/[^0-9]/g, ""); // Remove any remaining non-digits

    // Reconstruct with proper decimal separator
    cleanedValue = beforeDecimal + separators.decimal + afterDecimal;
  } else {
    // No decimal separator found - just clean all non-digits
    cleanedValue = cleanedValue.replace(/[^0-9]/g, "");
  }

  // Ensure proper decimal places
  const parts = cleanedValue.split(separators.decimal);
  if (parts.length > 1) {
    // parts[1] = parts[1].slice(0, decimalPlaces); //REVISION REQUIRED: remove decimal limit for pasted values
    cleanedValue = parts[0] + separators.decimal + parts[1];
  }

  // Format with thousand separators
  const formattedValue = await formatNumberWithCommas(cleanedValue, inputField);

  // Calculate cursor position
  const cursorPos = formattedValue.length;

  return {
    raw: cleanedValue,
    formatted: formattedValue,
    cursorPos: cursorPos,
  };
}

//⚪------------------------------------------------------------*/
//⚪                    CHART CURRENCY DROPDOWNS                */
//⚪------------------------------------------------------------*/
function initChartDropdowns() {
  const baseDropdown = document.getElementById("chart-base-dropdown");
  const quoteDropdown = document.getElementById("chart-quote-dropdown");
  const baseSelected = document.getElementById("chart-base-selected");
  const quoteSelected = document.getElementById("chart-quote-selected");
  const baseList = document.getElementById("chart-base-list");
  const quoteList = document.getElementById("chart-quote-list");
  const baseSearch = baseDropdown.querySelector(".dropdown-search");
  const quoteSearch = quoteDropdown.querySelector(".dropdown-search");

  let currentBase = localStorage.getItem("chartBase") || "JPY";
  let currentQuote = localStorage.getItem("chartQuote") || "USD";

  // Initial UI sync
  function syncSelectedUI(dropdown, currency) {
    const isBase = dropdown.id === "chart-base-dropdown";
    const selectedEl = isBase ? baseSelected : quoteSelected;
    const countryCode = currencyToCountry[currency] || "??";
    
    selectedEl.innerHTML = `
      <div class="selected-inner">
        <img src="icons/flags/${countryCode}.svg" class="selected-flag" onerror="this.src='./icons/website.png'">
        <span>${currency}</span>
      </div>
    `;
  }
  
  syncSelectedUI(baseDropdown, currentBase);
  syncSelectedUI(quoteDropdown, currentQuote);

  function toggleDropdown(dropdown) {
    const content = dropdown.querySelector(".dropdown-content");
    
    // Close all other dropdowns first
    document.querySelectorAll(".custom-dropdown").forEach(d => {
      if (d !== dropdown) {
        d.classList.remove("open");
        const c = d.querySelector(".dropdown-content");
        if (!c.classList.contains("hidden")) {
          c.classList.add("hidden");
          setTimeout(() => { if (c.classList.contains("hidden")) c.style.display = "none"; }, 200);
        }
      }
    });

    if (content.classList.contains("hidden")) {
      content.style.display = "block"; // Start showing
      void content.offsetHeight; // Force reflow to ensure animation plays
      content.classList.remove("hidden");
      dropdown.classList.add("open");
      
      const searchInput = dropdown.querySelector(".dropdown-search");
      searchInput.value = ""; 
      dropdown.querySelector(".clear-search").classList.add("hidden");
      searchInput.focus();
      populateDropdown(dropdown);
    } else {
      content.classList.add("hidden");
      dropdown.classList.remove("open");
      setTimeout(() => { if (content.classList.contains("hidden")) content.style.display = "none"; }, 200);
    }
  }

  let highlightedIndex = -1;

  window.populateDropdown = function populateDropdown(dropdown) {
  const list = dropdown.id === "chart-base-dropdown" ? baseList : quoteList;
  const searchVal = dropdown.querySelector(".dropdown-search").value.toLowerCase();
  const otherCurrency = dropdown.id === "chart-base-dropdown" ? currentQuote : currentBase;
  const selectedCurrency = dropdown.id === "chart-base-dropdown" ? currentBase : currentQuote;
  
  list.innerHTML = "";
  highlightedIndex = -1; // Reset highlighting on search

  // Check if exchangeRates is available
  if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
    const loading = document.createElement("div");
    loading.classList.add("dropdown-item");
    loading.textContent = "Loading...";
    list.appendChild(loading);
    return;
  }
  
  const sortedCurrencies = Object.keys(exchangeRates).sort();
  
  let foundCount = 0;
  sortedCurrencies.forEach(currency => {
    // Mutual exclusion: don't show the currency selected in the other dropdown
    if (currency === otherCurrency) return;
    
    if (currency.toLowerCase().includes(searchVal)) {
      foundCount++;
      const item = document.createElement("div");
      item.classList.add("dropdown-item");
      if (currency === selectedCurrency) {
        item.classList.add("selected");
      }
      
      const countryCode = currencyToCountry[currency] || "??";
      item.innerHTML = `
        <img src="icons/flags/${countryCode}.svg" onerror="this.src='./icons/website.png'">
        <span>${currency}</span>
      `;
      
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        selectCurrency(dropdown, currency);
      });
      
      list.appendChild(item);
    }
  });

  if (foundCount === 0) {
    const noResults = document.createElement("div");
    noResults.classList.add("dropdown-item");
    noResults.classList.add("not-found");
    noResults.textContent = "Not Found";
    list.appendChild(noResults);
  }

  // Only highlight if we have results AND there's a search term
  if (searchVal && foundCount > 0) {
    highlightItem(list, 0);
  } else {
    highlightedIndex = -1; // Make sure highlightedIndex is reset when no valid items
  }
}

  function highlightItem(list, index) {
    const items = list.querySelectorAll(".dropdown-item");
    items.forEach(item => item.classList.remove("highlighted"));
    
    if (index >= 0 && index < items.length) {
      highlightedIndex = index;
      const item = items[index];
      item.classList.add("highlighted");
      item.scrollIntoView({ block: "nearest" });
    } else {
      highlightedIndex = -1;
    }
  }

  function selectCurrency(dropdown, currency) {
    const isBase = dropdown.id === "chart-base-dropdown";
    const selectedEl = isBase ? baseSelected : quoteSelected;
    const countryCode = currencyToCountry[currency] || "??";

    if (isBase) {
      currentBase = currency;
      localStorage.setItem("chartBase", currency);
    } else {
      currentQuote = currency;
      localStorage.setItem("chartQuote", currency);
    }
    
    // Save to chrome storage for consistency
    chrome.storage.local.set({ 
      chartBase: currentBase, 
      chartQuote: currentQuote 
    });

    selectedEl.innerHTML = `
      <div class="selected-inner">
        <img src="icons/flags/${countryCode}.svg" class="selected-flag" onerror="this.src='./icons/website.png'">
        <span>${currency}</span>
      </div>
    `;

    const content = dropdown.querySelector(".dropdown-content");
    content.classList.add("hidden");
    dropdown.classList.remove("open");
    setTimeout(() => { if (content.classList.contains("hidden")) content.style.display = "none"; }, 200);

    // Trigger chart update
    if (typeof window.updateChartWithData === 'function') {
      const range = window.currentRange || "week";
      const date = window.today || new Date();
      const newData = window.generateRandomData(range, date);
      window.updateChartWithData(newData);
    }
  }

  baseDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.closest(".dropdown-selected")) {
      toggleDropdown(baseDropdown);
    }
  });

  quoteDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.closest(".dropdown-selected")) {
      toggleDropdown(quoteDropdown);
    }
  });

  // Prevent dropdown collapse when clicking anywhere inside the content
  baseDropdown.querySelector(".dropdown-content").addEventListener("click", (e) => e.stopPropagation());
  quoteDropdown.querySelector(".dropdown-content").addEventListener("click", (e) => e.stopPropagation());

  baseSearch.addEventListener("input", (e) => {
    e.stopPropagation();
    const clearBtn = baseDropdown.querySelector(".clear-search");
    clearBtn.classList.toggle("hidden", !e.target.value);
    populateDropdown(baseDropdown);
  });

  quoteSearch.addEventListener("input", (e) => {
    e.stopPropagation();
    const clearBtn = quoteDropdown.querySelector(".clear-search");
    clearBtn.classList.toggle("hidden", !e.target.value);
    populateDropdown(quoteDropdown);
  });

  function handleKeydown(e, dropdown) {
    const list = dropdown.id === "chart-base-dropdown" ? baseList : quoteList;
    const items = list.querySelectorAll(".dropdown-item");
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      highlightItem(list, (highlightedIndex + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlightItem(list, (highlightedIndex - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        const currency = items[highlightedIndex].querySelector("span").textContent;
        selectCurrency(dropdown, currency);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation(); // Stop propagation to prevent closing charts tab on first Esc
      const content = dropdown.querySelector(".dropdown-content");
      content.classList.add("hidden");
      dropdown.classList.remove("open");
      setTimeout(() => { if (content.classList.contains("hidden")) content.style.display = "none"; }, 200);
    }
  }

  baseSearch.addEventListener("keydown", (e) => handleKeydown(e, baseDropdown));
  quoteSearch.addEventListener("keydown", (e) => handleKeydown(e, quoteDropdown));

  baseDropdown.querySelector(".clear-search").addEventListener("click", (e) => {
    e.stopPropagation();
    baseSearch.value = "";
    baseSearch.dispatchEvent(new Event("input"));
    baseSearch.focus();
  });

  quoteDropdown.querySelector(".clear-search").addEventListener("click", (e) => {
    e.stopPropagation();
    quoteSearch.value = "";
    quoteSearch.dispatchEvent(new Event("input"));
    quoteSearch.focus();
  });

  document.getElementById("swap-charts-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    const tempBase = currentBase;
    const tempQuote = currentQuote;
    
    // Use selectCurrency to handle all the updates, storage, and chart refreshes
    selectCurrency(baseDropdown, tempQuote);
    selectCurrency(quoteDropdown, tempBase);
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".custom-dropdown").forEach(d => {
      d.classList.remove("open");
      const c = d.querySelector(".dropdown-content");
      if (!c.classList.contains("hidden")) {
        c.classList.add("hidden");
        setTimeout(() => { if (c.classList.contains("hidden")) c.style.display = "none"; }, 200);
      }
    });
  });

  // Tiered Escape key logic
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openDropdown = document.querySelector(".custom-dropdown.open");
      if (openDropdown) {
        // This handles cases where focus might not be on the search input
        const c = openDropdown.querySelector(".dropdown-content");
        if (!c.classList.contains("hidden")) {
          c.classList.add("hidden");
          openDropdown.classList.remove("open");
          setTimeout(() => { if (c.classList.contains("hidden")) c.style.display = "none"; }, 200);
        }
      } else if (chartsTab && !chartsTab.classList.contains("hidden")) {
        // If charts tab is open and no dropdown is open, close charts tab
        closeChartsTab();
      }
    }
  });
}
