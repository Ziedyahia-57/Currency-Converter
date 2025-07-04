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
const formatSelector = document.getElementById("format");
const fiatDecimalSelector = document.getElementById("fiat-round");
const cryptoDecimalSelector = document.getElementById("crypto-round");
const themeSelector = document.getElementById("theme");
const dateSelector = document.getElementById("date");
const timeSelector = document.getElementById("time");
const convertTargetSelector = document.getElementById("target");
const pageConvertSelector = document.getElementById("page-convert");
const restoreBtn = document.getElementById("restore");
const customTheme = document.getElementById("custom-theme");
const customCryptoDecimals = document.getElementById("custom-crypto-decimal");
const customFiatDecimals = document.getElementById("custom-fiat-decimal");
const customFormat = document.getElementById("custom-format");
const customDate = document.getElementById("custom-date");
const customTime = document.getElementById("custom-time");
const customPageConvert = document.getElementById("custom-page-convert");
const customConvertTarget = document.getElementById("custom-convert-target");
const lastUpdateElement = document.querySelector(".last-update");
const darkModeBtn = document.getElementById("dark-mode-btn");
const root = document.documentElement;

const CURRENCY_DATA_KEY = "currencyData";
const LAST_UPDATED_KEY = "lastUpdated";

let currencies = [];
let exchangeRates = {};

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
    chrome.storage.local.set(
      { fiatDecimals: fiatDecimalSelector.value },
      () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          console.log("FIAT Decimal Format saved:", fiatDecimalSelector.value);
          resolve();
        }
      }
    );
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
    chrome.storage.local.set(
      { cryptoDecimals: cryptoDecimalSelector.value },
      () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          console.log(
            "Crypto Decimal Format saved:",
            cryptoDecimalSelector.value
          );
          resolve();
        }
      }
    );
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
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        let preferredTheme = prefersDark ? "dark" : "light";
        console.log("Preferred theme based on system setting:", preferredTheme);
        localStorage.setItem("darkMode", preferredTheme);
        chrome.storage.local.set({ ["darkMode"]: preferredTheme });
        darkModeBtn.classList.add("auto");
        darkModeBtn.title = "Dark Mode - Auto";
      }
      console.log("Loaded theme preference:", savedTheme);
      return savedTheme;
    } else {
      // No saved theme found - use system preference as default
      console.log("No saved theme found. Using system preference.");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
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
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
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
}
function checkAutoTheme() {
  //🟣 Check if user's theme preference is auto

  const savedTheme = themeSelector.value;
  if (savedTheme === "auto") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    let preferredTheme = prefersDark ? "dark" : "light";
    root.classList.toggle("dark-mode", preferredTheme === "dark");
    darkModeBtn.classList.toggle("active", preferredTheme === "dark");

    chrome.storage.local.set({ ["darkMode"]: preferredTheme });
    console.log("Preferred theme based on system setting:", preferredTheme);

    darkModeBtn.classList.add("auto");
    darkModeBtn.title = "Dark Mode - Auto";

    customTheme.classList.add("custom-hidden");
  } else {
    darkModeBtn.classList.remove("auto");
    customTheme.classList.remove("custom-hidden");
    if (darkModeBtn.classList.contains("active")) {
      darkModeBtn.title = "Dark Mode - ON";
    } else {
      darkModeBtn.title = "Dark Mode - OFF";
    }
  }
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
    chrome.storage.local.set(
      { pageConvert: pageConvertSelector.checked },
      () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          console.log("pageConvert saved:", pageConvertSelector.checked);
          resolve();
        }
      }
    );
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
    chrome.storage.local.set(
      { convertTarget: convertTargetSelector.value },
      () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          console.log("convertTarget saved:", convertTargetSelector.value);
          resolve();
        }
      }
    );
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
  updateLastUpdateElement(
    navigator.onLine,
    localStorage.getItem(LAST_UPDATED_KEY)
  );

  // Manually update UI for immediate effect
  customTheme.classList.add("custom-hidden");
  customFormat.classList.add("custom-hidden");
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
  const fiatDecimalsSettings = await chrome.storage.local.get("fiatDecimals");
  const cryptoDecimalsSettings = await chrome.storage.local.get(
    "cryptoDecimals"
  );
  const themeSettings = await chrome.storage.local.get("theme");
  const dateSettings = await chrome.storage.local.get("date");
  const timeSettings = await chrome.storage.local.get("time");
  const convertTargetSettings = await chrome.storage.local.get("convertTarget");
  const pageConvertSettings = await chrome.storage.local.get("pageConvert");

  if (
    formatSettings.numberFormat &&
    formatSettings.numberFormat !== "comma-dot"
  ) {
    console.log("formatSettings: ", formatSettings.numberFormat);
    customFormat.classList.remove("custom-hidden");
  }

  if (
    fiatDecimalsSettings.fiatDecimals &&
    fiatDecimalsSettings.fiatDecimals != 2
  ) {
    console.log("fiatDecimalsSettings: ", fiatDecimalsSettings.fiatDecimals);
    customFiatDecimals.classList.remove("custom-hidden");
  }
  console.log(
    "cryptoDecimalsSettings: ",
    cryptoDecimalsSettings.cryptoDecimals
  );

  if (
    cryptoDecimalsSettings.cryptoDecimals &&
    cryptoDecimalsSettings.cryptoDecimals != 8
  ) {
    console.log(
      "cryptoDecimalsSettings: ",
      cryptoDecimalsSettings.cryptoDecimals
    );
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

  if (
    convertTargetSettings.convertTarget &&
    convertTargetSettings.convertTarget !== "all"
  ) {
    console.log("convertTarget: ", convertTargetSettings.convertTarget);
    customConvertTarget.classList.remove("custom-hidden");
  }

  if (
    pageConvertSettings.pageConvert &&
    pageConvertSettings.pageConvert !== false
  ) {
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
function handleDonationButtonClick() {
  //🟣 Function to handle the donation button click
  donationTracker.incrementClickCount();
  const donationContentElement = document.querySelector(".donation-content");
  if (donationContentElement) {
    donationContentElement.innerHTML = updateDonationContent();
  }
}
function initializeDonationContent() {
  //🟣 Initialize the donation content with the initial message
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
        dateText = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
          date.getDate()
        ).padStart(2, "0")}/${date.getFullYear()}`;
        break;
      case "yyyy/mm/dd":
        dateText = `${date.getFullYear()}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
        break;
      default: // "dd/mm/yyyy"
        dateText = `${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${date.getFullYear()}`;
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
    <span class="${isOnline ? "green" : "red"}">● ${
    isOnline ? "Online" : "Offline"
  }</span>
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
  settingsTab.classList.add("show");
  settingsTab.classList.remove("hidden");
}
settingsBtn.addEventListener("click", () => {
  openSettingsTab();
});
function closeSettingsTab() {
  settingsTab.classList.remove("show");
  settingsTab.classList.add("hidden");
}
hideSettingsTab.addEventListener("click", () => {
  closeSettingsTab();
});

//⚪------------------------------------------------------------*/
//⚪                        CURRENCY TAB                        */
//⚪------------------------------------------------------------*/
function openCurrencyTab() {
  currencyTab.classList.add("show");
  currencyTab.classList.remove("hidden");
}
function closeCurrencyTab() {
  currencyTab.classList.remove("show");
  currencyTab.classList.add("hidden");
  // Reset selection state
  currentLetter = "";
  currentIndex = 0;
  matchingCurrencies = [];
  highlightedCurrency = null;
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
    // Focus on input after transition
    setTimeout(() => {
      taxInput.focus();
      taxInput.select();
    }, 300);
  }
});

// Handle input validation and submission
taxInput.addEventListener("input", async function (e) {
  let value = parseInt(e.target.value);
  if (value < 0) {
    e.target.value = 0;
  } else if (value > 100) {
    e.target.value = 100;
  }
  // Update conversions
  const baseInput = await findBaseInput();
  if (baseInput && baseInput.dataset) {
    updateCurrencyValues(baseInput.dataset.currency);
  }
});

taxInput.addEventListener("blur", function (e) {
  // Small delay to allow for other interactions
  setTimeout(() => {
    const value = taxInput.value;
    if (!value || value == 0) {
      collapseTaxButton();
    }
  }, 300);
});

function collapseTaxButton() {
  const value = taxInput.value;
  taxBtn.classList.remove("expanded");
  isExpanded = false;

  // Don't clear if value is > 0
  if (!value || parseFloat(value) === 0) {
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
    const value = taxInput.value;
    if (!value || value < 1 || value > 100) {
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
// async function addCurrency(currency, shouldSave = true) {
//   if (currencies.includes(currency)) return;

//   // Get decimal places for this currency
//   const decimalPlaces = await getDecimalPlaces(currency);
//   const initialDecimalPart = "0".repeat(decimalPlaces);

//   currencies.push(currency);
//   const currencyDiv = document.createElement("div");
//   currencyDiv.classList.add("currency-input");
//   currencyDiv.setAttribute("draggable", "true");

//   // Get the country code for the currency
//   const countryCode = currencyToCountry[currency] || "??"; // "??" is a fallback for unknown currencies

//   currencyDiv.innerHTML = `
//         <div class="currency-info">
//             <div class="flag"><span class="fi fi-${countryCode}"></span></div>
//             <label>${currency}</label>
//         </div>
//         <input type="text" data-currency="${currency}" value="0.${initialDecimalPart}" data-previous-value="0">
//         <button class="remove-btn" title="Remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></button>
//     `;

//   currencyContainer.appendChild(currencyDiv);

//   const inputField = currencyDiv.querySelector("input");

//   try {
//     // Set initial value with correct decimal places
//     const initialValue = `0.${initialDecimalPart}`;
//     inputField.value = formatNumberWithCommas(initialValue, inputField);
//   } catch (error) {
//     console.error("Error initializing currency input:", error);
//     inputField.value = `0.${initialDecimalPart}`;
//   }

//   // Find the first non-zero input to use as base for conversion
//   let baseInput = document.querySelector(
//     `.currency-input input:not([value="0"]):not([value^="0."])` //⚠️
//   );

//   // If no non-zero input found, use the first input
//   if (!baseInput) {
//     baseInput = document.querySelector(".currency-input input");
//   }

//   // If we have a base input with a value, convert to the new currency
//   if (baseInput && baseInput.value && exchangeRates) {
//     const baseCurrency = baseInput.dataset.currency;
//     const baseValue = parseFloat(baseInput.value.replace(/,/g, "") || 0);

//     let convertedValue;
//     if (baseCurrency === "USD") {
//       convertedValue = baseValue * exchangeRates[currency];
//     } else if (currency === "USD") {
//       convertedValue = baseValue / exchangeRates[baseCurrency];
//     } else {
//       convertedValue =
//         baseValue * (exchangeRates[currency] / exchangeRates[baseCurrency]);
//     }

//     // Format with correct decimal places
//     const formattedValue = convertedValue.toFixed(decimalPlaces);
//     inputField.value = formatNumberWithCommas(formattedValue);
//   }
//   // Input event handler - allows any number of decimals during input
//   inputField.addEventListener("input", (event) => {
//     const rawValue = event.target.value.replace(/,/g, "");

//     // Basic validation - allow numbers and single decimal point
//     if (!/^\d*\.?\d*$/.test(rawValue)) {
//       event.target.value = event.target.dataset.previousValue || "0";
//       return;
//     }

//     event.target.dataset.previousValue = rawValue;
//     formatNumberWithCommas(rawValue, event.target);
//     updateCurrencyValues(event.target.dataset.currency);
//   });

//   inputField.addEventListener("blur", async () => {
//     const currency = inputField.dataset.currency;
//     const decimalPlaces = await getDecimalPlaces(currency);
//     let value = inputField.value.replace(/,/g, "");

//     // Handle empty value
//     if (value === "") {
//       value = "0";
//     }

//     // Add decimal places if needed
//     if (value.indexOf(".") === -1) {
//       value += "." + "0".repeat(decimalPlaces);
//     } else {
//       const parts = value.split(".");
//       // Don't truncate decimals here - just pad if needed
//       if (parts[1].length < decimalPlaces) {
//         parts[1] = parts[1].padEnd(decimalPlaces, "0");
//       }
//       value = parts.join(".");
//     }

//     inputField.value = formatNumberWithCommas(value);
//   });

//   inputField.addEventListener("focus", (event) => {
//     event.target.select();
//   });

//   // Remove currency
//   currencyDiv.querySelector(".remove-btn").addEventListener("click", () => {
//     currencyDiv.remove();
//     currencies = currencies.filter((c) => c !== currency);
//     checkCurrencyCount();
//     updateAddButtonVisibility();
//     saveCurrencyOrder();
//   });

//   checkCurrencyCount();
//   updateAddButtonVisibility();

//   if (shouldSave) {
//     saveCurrencyOrder();
//   }

//   document.querySelectorAll(".currency-input input").forEach((input) => {
//     let previousValue = input.value;
//     console.log("*****previousValue:", previousValue, typeof previousValue);

//     // Handle input events
//     input.addEventListener("input", async (event) => {
//       const rawValue = event.target.value.replace(/,/g, ""); // Remove commas (thousands sep)
//       const currency = event.target.dataset.currency;
//       const decimalPlaces = await getDecimalPlaces(currency);

//       console.log("*****rawValue:", rawValue, typeof rawValue);
//       console.log("*****currency:", currency, typeof currency);

//       // If input is cleared, update immediately
//       if (rawValue === "") {
//         updateCurrencyValues(currency);
//         previousValue = "";
//         return;
//       }

//       // Validate input (only digits and optional single dot)
//       if (!/^\d*\.?\d*$/.test(rawValue)) {
//         event.target.value = previousValue || "0";
//         return;
//       }

//       // Store raw value and format
//       previousValue = rawValue;
//       formatNumberWithCommas(rawValue, event.target); // Assumes formatting uses "," and "."
//       updateCurrencyValues(currency);
//     });

//     // Handle blur event for final formatting
//     input.addEventListener("blur", async () => {
//       const currency = input.dataset.currency;
//       const decimalPlaces = await getDecimalPlaces(currency);
//       let value = input.value.replace(/,/g, ""); // Remove commas

//       if (value === "") {
//         value = "0";
//       }

//       // Ensure proper decimal places
//       if (value.indexOf(".") === -1) {
//         value += "." + "0".repeat(decimalPlaces);
//       } else {
//         const parts = value.split(".");
//         if (parts[1].length < decimalPlaces) {
//           parts[1] = parts[1].padEnd(decimalPlaces, "0");
//         }
//         value = parts.join(".");
//       }

//       input.value = formatNumberWithCommas(value, input); // Format with "," and "."
//       previousValue = value;
//       updateCurrencyValues(currency);
//     });
//   });
// }

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
//⚪+                                                 INPUT FORMAT VALIDATION                                              +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//🟢------------------------------------------------------------*/
//🟢                          NO COMMAS                         */
//🟢------------------------------------------------------------*/
// document.querySelectorAll(".currency-input input").forEach((input) => {
//   // Remove commas on input
//   input.addEventListener("input", (event) => {
//     const rawValue = event.target.value.replace(/,/g, ""); //🟢Removes commas from the input value
//     formatNumberWithCommas(rawValue, event.target);
//     updateCurrencyValues(event.target.dataset.currency); // Pass the changed currency
//   });

//   // Format number with commas on blur
//   input.addEventListener("blur", () => {
//     let value = input.value.replace(/,/g, ""); //🟢Removes commas from the input value
//     if (value.indexOf(".") === -1) {
//       //🟢
//       value += currency === "BTC" ? ".00000000" : ".00"; //🟢
//     } else {
//       const parts = value.split("."); //🟢
//       if (parts[1].length < 2) {
//         parts[1] = parts[1].padEnd(2, "0"); //makes decimal reach 2 digits while keeping the value
//       }
//     }
//     input.value = formatNumberWithCommas(value, input);
//   });
// });

//🟢------------------------------------------------------------*/
//🟢                        DOTS & COMMAS                       */
//🟢------------------------------------------------------------*/
//!!!!!
// function formatNumberWithCommas(value, inputElement) {
//   // Return early if inputElement is not valid
//   if (!inputElement || typeof inputElement.selectionStart !== "number") {
//     // Fallback to simple formatting without cursor control
//     value = value.replace(/[^\d.]/g, ""); //🟢Removes everything except digits (\d) and the decimal point (.).
//     let [integerPart, decimalPart] = value.split(".");
//     integerPart = integerPart.replace(/^0+/, "") || "0";
//     integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ","); //🟢Adds commas as thousand separators

//     if (decimalPart !== undefined) {
//       decimalPart = decimalPart.substring(0); //🟠Changed "substring(0,2)"
//       return `${integerPart}.${decimalPart}`; //🟢Returns the formatted value with commas and decimal point
//     }
//     return integerPart;
//   }

//   // Store cursor position if we have a valid input element
//   const cursorPos = inputElement.selectionStart;
//   const originalValue = inputElement.value;
//   const isAddingDecimal =
//     originalValue.length < value.length && value.charAt(cursorPos) === "."; //🟢Checks if the user is adding a decimal point

//   // Clean the input value
//   let cleanValue = value.replace(/[^\d.]/g, ""); //🟢Removes everything except digits (\d) and the decimal point (.).

//   // Handle decimal part
//   let [integerPart, decimalPart] = cleanValue.split("."); //🟢split the value to decimal and integer
//   integerPart = integerPart.replace(/^0+/, "") || "0";

//   // Add thousand separators
//   integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ","); //🟢Adds commas to thousands

//   // Format decimal part if exists
//   if (decimalPart !== undefined) {
//     decimalPart = decimalPart.substring(0);
//     cleanValue = `${integerPart}.${decimalPart}`; //🟢
//   } else {
//     cleanValue = integerPart;
//   }

//   // Calculate new cursor position
//   let newCursorPos = cursorPos;

//   // Adjust for added comma
//   if (cleanValue.length > originalValue.length) {
//     const addedChars = cleanValue.length - originalValue.length;
//     newCursorPos += addedChars;
//   }
//   // Special handling for decimal point
//   else if (isAddingDecimal) {
//     newCursorPos += 1;
//   }

//   // Update input value
//   inputElement.value = cleanValue;

//   // Restore cursor position
//   setTimeout(() => {
//     inputElement.setSelectionRange(newCursorPos, newCursorPos);
//   }, 0);

//   return cleanValue;
// }
// document.querySelectorAll(".currency-input input").forEach((input) => {
//   // Store previous value for validation
//   let previousValue = input.value;

//   // Handle input events
//   input.addEventListener("input", async (event) => {
//     const rawValue = event.target.value.replace(/,/g, ""); // Remove commas (thousands sep)
//     const currency = event.target.dataset.currency;
//     const decimalPlaces = await getDecimalPlaces(currency);

//     console.log("*****rawValue:", rawValue, typeof rawValue);
//     console.log("*****currency:", currency, typeof currency);

//     // If input is cleared, update immediately
//     if (rawValue === "") {
//       updateCurrencyValues(currency);
//       previousValue = "";
//       return;
//     }

//     // Validate input (only digits and optional single dot)
//     if (!/^\d*\.?\d*$/.test(rawValue)) {
//       event.target.value = previousValue || "0";
//       return;
//     }

//     // Store raw value and format
//     previousValue = rawValue;
//     formatNumberWithCommas(rawValue, event.target); // Assumes formatting uses "," and "."
//     updateCurrencyValues(currency);
//   });

//   // Handle blur event for final formatting
//   input.addEventListener("blur", async () => {
//     const currency = input.dataset.currency;
//     const decimalPlaces = await getDecimalPlaces(currency);
//     let value = input.value.replace(/,/g, ""); // Remove commas

//     if (value === "") {
//       value = "0";
//     }

//     // Ensure proper decimal places
//     if (value.indexOf(".") === -1) {
//       value += "." + "0".repeat(decimalPlaces);
//     } else {
//       const parts = value.split(".");
//       if (parts[1].length < decimalPlaces) {
//         parts[1] = parts[1].padEnd(decimalPlaces, "0");
//       }
//       value = parts.join(".");
//     }

//     input.value = formatNumberWithCommas(value, input); // Format with "," and "."
//     previousValue = value;
//     updateCurrencyValues(currency);
//   });
// });

//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//⚪+                                                   CURRENCY CONVERSION                                                +*/
//⚪++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//🟢------------------------------------------------------------*/
//🟢                    CURRENCY CONVERSION                     */
//🟢------------------------------------------------------------*/
//!!!!!
// async function updateCurrencyValues(changedCurrency) {
//   const changedInput = document.querySelector(
//     `input[data-currency="${changedCurrency}"]`
//   );
//   if (!changedInput) return;

//   const rawValue = changedInput.value.replace(/,/g, "");

//   // If input is empty or cleared, set all other inputs to 0 with proper decimal places
//   if (rawValue === "") {
//     document
//       .querySelectorAll(".currency-input input")
//       .forEach(async (input) => {
//         if (input.dataset.currency === changedCurrency) return;

//         const targetCurrency = input.dataset.currency;
//         const decimalPlaces = await getDecimalPlaces(targetCurrency);
//         const zeroValue = `0.${"0".repeat(decimalPlaces)}`;

//         input.value = formatNumberWithCommas(zeroValue, input);
//       });
//     return;
//   }

//   const value = parseFloat(rawValue) || 0;
//   const baseCurrency = changedCurrency;

//   // Update all other currency inputs
//   document.querySelectorAll(".currency-input input").forEach(async (input) => {
//     if (input.dataset.currency === changedCurrency) return;

//     const targetCurrency = input.dataset.currency;
//     const decimalPlaces = await getDecimalPlaces(targetCurrency);

//     let convertedValue;
//     if (baseCurrency === "USD") {
//       convertedValue = value * exchangeRates[targetCurrency];
//     } else if (targetCurrency === "USD") {
//       convertedValue = value / exchangeRates[baseCurrency];
//     } else {
//       convertedValue =
//         value * (exchangeRates[targetCurrency] / exchangeRates[baseCurrency]);
//     }

//     // Convert to string with proper decimal places
//     let formattedValue = convertedValue.toFixed(decimalPlaces);

//     // If the decimal separator is comma, replace the dot with comma
//     if (separators.decimal === ",") {
//       formattedValue = formattedValue.replace(".", ",");
//     }

//     // Format with thousand separators
//     input.value = await formatNumberWithCommas(formattedValue, input);
//   });
// }

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

//⚪------------------------------------------------------------*/
//⚪                         ??????????                         */
//⚪------------------------------------------------------------*/
document.getElementById("donation-content").innerHTML = updateDonationContent();

currencyTab.addEventListener("click", async (event) => {
  if (!(event.target instanceof HTMLInputElement)) return; // Ignore clicks on non-input elements
  if (!event.target.value) return; // Ignore empty values

  let rawValue = event.target.value.replace(/,/g, ""); // Remove commas from the input value

  if (!/^\d*\.?\d*$/.test(rawValue)) {
    event.target.value = event.target.dataset.previousValue || "0";
    return;
  } // Regex to allow only digits and one decimal point

  event.target.dataset.previousValue = rawValue;
  event.target.value = await formatNumberWithCommas(rawValue);
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

  document.querySelector(
    ".currency-converter-ex .content"
  ).style.height = `${contentHeight}px`;
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

  loadThemePreference();
  loadNumberFormat();
  loadFiatDecimal();
  loadCryptoDecimal();
  loadPageConvert();
  loadConvertTarget();
  loadTimeFormat();
  loadDateFormat();

  loadCheckboxState();
  checkCurrencyCount();
  updateAddButtonVisibility();
  initializeInputStyles(); // Initialize input styles

  // Donation Tab functionality
  donationButton.addEventListener("click", handleDonationButtonClick);

  saveCheckboxState();

  // Initial check
  updateLastUpdateElement(
    navigator.onLine,
    localStorage.getItem(LAST_UPDATED_KEY)
  );

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
      let formattedValue = parseFloat(rawValue)
        .toFixed(decimalPlaces)
        .replace(".", separators.decimal);

      // Apply new formatting
      input.value = await formatNumberWithCommas(formattedValue, input);
      input.dataset.previousValue = rawValue;
    }
    await resetInputsWithNewFormat();
    numToTextElement.textContent = "ABC..."; // Clear if input is invalid
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
    updateLastUpdateElement(
      navigator.onLine,
      localStorage.getItem(LAST_UPDATED_KEY)
    );

    if (dateSelector.value !== "dd/mm/yyyy") {
      customDate.classList.remove("custom-hidden");
    } else {
      customDate.classList.add("custom-hidden");
    }
  });

  timeSelector.addEventListener("change", function () {
    saveTimeFormat();
    updateLastUpdateElement(
      navigator.onLine,
      localStorage.getItem(LAST_UPDATED_KEY)
    );

    if (timeSelector.value !== "ampm") {
      customTime.classList.remove("custom-hidden");
    } else {
      customTime.classList.add("custom-hidden");
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
    savePageConvert();

    if (pageConvertSelector.checked !== false) {
      customPageConvert.classList.remove("custom-hidden");
    } else {
      customPageConvert.classList.add("custom-hidden");
    }
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
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const preferredTheme = prefersDark ? "dark" : "light";

      // Apply the theme
      root.classList.toggle("dark-mode", preferredTheme === "dark");
      darkModeBtn.classList.toggle("active", preferredTheme === "dark");

      // Save the actual theme being used
      localStorage.setItem("darkMode", preferredTheme);
      chrome.storage.local.set({ ["darkMode"]: preferredTheme });

      // Add event listener for future changes (only if online)
      if (navigator.onLine) {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", systemThemeChangeHandler);
      }
    } else {
      // Remove auto class and event listener when switching to manual mode
      darkModeBtn.classList.remove("auto");
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", systemThemeChangeHandler);

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
  loadDarkMode();

  initializeApp(); // Initialize the app
  await updateExchangeRates(); // Load exchange rates first
  // Add this to your DOMContentLoaded event listener
  taxInput.addEventListener("input", () => {
    // Find the first non-zero input to use as base for conversion
    const baseInput = document.querySelector(
      '.currency-input input:not([value="0"]):not([value^="0."]):not([value^="0,"])'
    );
    console.log("baseInput:", baseInput);

    if (baseInput) {
      updateCurrencyValues(baseInput.dataset.currency);
    }
  });
});

async function getDecimalPlaces(currency) {
  // Default values
  let fiatDecimals = 2;
  let cryptoDecimals = 8;

  try {
    const storage = await chrome.storage.local.get([
      "fiatDecimals",
      "cryptoDecimals",
    ]);
    fiatDecimals = storage.fiatDecimals || 2;
    cryptoDecimals = storage.cryptoDecimals || 8;
  } catch (error) {
    console.error("Error getting decimal places from storage:", error);
  }

  return currency === "BTC" ? cryptoDecimals : fiatDecimals;
}

async function updateAllCurrencyDecimals() {
  const inputs = document.querySelectorAll(".currency-input input");
  const taxPercentage = parseFloat(taxInput.value) || 0;
  const taxMultiplier = 1 + taxPercentage / 100;

  // Get the first non-zero input to use as base
  let baseInput = document.querySelector(
    `.currency-input input:not([value="0"]):not([value^="0."]):not([value^="0,"])`
  );

  // If no non-zero input found, use the first input
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
      const currency = input.dataset.currency;
      const decimalPlaces = await getDecimalPlaces(currency);

      // For the base input, just reformat with new decimals
      if (input === baseInput) {
        const formattedValue = baseValue
          .toFixed(decimalPlaces)
          .replace(".", separators.decimal);
        input.value = await formatNumberWithCommas(formattedValue, input);
        continue;
      }

      // For other inputs, recalculate based on base value
      let convertedValue;
      if (baseCurrency === "USD") {
        convertedValue = baseValue * exchangeRates[currency];
      } else if (currency === "USD") {
        convertedValue = baseValue / exchangeRates[baseCurrency];
      } else {
        convertedValue =
          baseValue * (exchangeRates[currency] / exchangeRates[baseCurrency]);
      }

      // Apply tax if percentage > 0
      if (taxPercentage > 0) {
        convertedValue *= taxMultiplier;
      }

      const formattedValue = convertedValue
        .toFixed(decimalPlaces)
        .replace(".", separators.decimal);
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
      cleanValue =
        decimalSplit[0] + separators.decimal + decimalSplit.slice(1).join("");
    }

    // Split into parts
    let [integerPart, decimalPart] = cleanValue.split(separators.decimal);
    integerPart = integerPart.replace(/^0+/, "") || "0";

    // Format integer part with thousand separators
    const formattedInteger = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      separators.thousand
    );

    // Reconstruct full formatted value
    let formattedValue = formattedInteger;
    if (decimalPart !== undefined) {
      formattedValue += separators.decimal + decimalPart;
    }

    if (inputElement) {
      // Calculate new cursor position
      let newCursorPos = calculateNewCursorPosition(
        originalValue,
        formattedValue,
        cursorPos,
        separators
      );

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

function calculateNewCursorPosition(
  originalValue,
  formattedValue,
  cursorPos,
  separators
) {
  // Handle edge cases
  if (cursorPos <= 0) return 0;
  if (cursorPos >= originalValue.length) return formattedValue.length;

  // Check if we just added a decimal separator
  const isAddingDecimal =
    originalValue.length < formattedValue.length &&
    originalValue.slice(0, cursorPos - 1) + separators.decimal ===
      originalValue.slice(0, cursorPos);

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

// Alternative simpler approach - tracks relative position
// function calculateNewCursorPositionSimple(
//   originalValue,
//   formattedValue,
//   cursorPos,
//   separators
// ) {
//   // Get the part of the string before the cursor
//   const beforeCursor = originalValue.slice(0, cursorPos);

//   // Count digits before cursor in original string
//   const digitsBefore = (beforeCursor.match(/\d/g) || []).length;

//   // Find position after the same number of digits in formatted string
//   let digitCount = 0;
//   for (let i = 0; i < formattedValue.length; i++) {
//     if (/\d/.test(formattedValue[i])) {
//       digitCount++;
//       if (digitCount === digitsBefore) {
//         return i + 1;
//       }
//     }
//   }

//   // If we didn't find the position, place at end
//   return formattedValue.length;
// }

// Helper function to find digit position
// function getDigitPosition(str, cursorPos) {
//   let digitCount = 0;
//   for (let i = 0; i < cursorPos; i++) {
//     if (str[i].match(/\d/)) digitCount++;
//   }
//   return digitCount;
// }

// Helper function to find new cursor position
// function findNewCursorPosition(original, formatted, cursorPos, thousandSep) {
//   // Get the text before cursor in original
//   const beforeCursor = original.substring(0, cursorPos);

//   // Count how many digits are before cursor
//   const digitCount = (beforeCursor.match(/\d/g) || []).length;

//   // Find position in formatted string with same number of digits before
//   let newPos = 0;
//   let digitsFound = 0;

//   for (let i = 0; i < formatted.length; i++) {
//     if (digitsFound >= digitCount) break;
//     if (formatted[i].match(/\d/)) digitsFound++;
//     newPos = i + 1;
//   }

//   // Adjust for thousand separators that might be added right before cursor
//   if (newPos > 0 && formatted[newPos - 1] === thousandSep) {
//     newPos--;
//   }

//   return newPos;
// }

async function addCurrency(currency, shouldSave = true) {
  // Prevent duplicate currencies
  if (currencies.includes(currency)) return;

  // Get current formatting preferences
  const decimalPlaces = await getDecimalPlaces(currency);
  const separators = await getNumberFormatSeparators();
  const initialDecimalPart = "0".repeat(decimalPlaces);

  // Find the best input to use as conversion base
  let baseInput = findConversionBaseInput();
  let initialValue = calculateInitialValue(
    baseInput,
    currency,
    decimalPlaces,
    separators
  );

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

  // Helper functions
  function findConversionBaseInput() {
    // Try to find a non-zero input
    const nonZeroInput = document.querySelector(
      `.currency-input input:not([value="0"]):not([value^="0${separators.decimal}"])`
    );
    if (nonZeroInput) return nonZeroInput;

    // Fallback to first input with value
    const firstWithValue = document.querySelector(
      '.currency-input input:not([value=""])'
    );
    if (firstWithValue) return firstWithValue;

    // Final fallback to first input
    return document.querySelector(".currency-input input");
  }

  function calculateInitialValue(
    baseInput,
    targetCurrency,
    decimalPlaces,
    separators
  ) {
    if (!baseInput || !baseInput.value || !exchangeRates) {
      return `0${separators.decimal}${initialDecimalPart}`;
    }

    const baseCurrency = baseInput.dataset.currency;
    const rawValue = baseInput.value
      .replace(new RegExp(`[${separators.thousand}]`, "g"), "")
      .replace(separators.decimal, ".");
    const baseValue = parseFloat(rawValue) || 0;

    // Perform the conversion
    let convertedValue;
    if (baseCurrency === "USD") {
      convertedValue = baseValue * exchangeRates[targetCurrency];
    } else if (targetCurrency === "USD") {
      convertedValue = baseValue / exchangeRates[baseCurrency];
    } else {
      convertedValue =
        baseValue *
        (exchangeRates[targetCurrency] / exchangeRates[baseCurrency]);
    }

    // Format with correct decimal places and separators
    return convertedValue
      .toFixed(decimalPlaces)
      .replace(".", separators.decimal);
  }

  function createCurrencyElement(currency, initialValue, separators) {
    const countryCode = currencyToCountry[currency] || "??";
    const currencyDiv = document.createElement("div");
    currencyDiv.classList.add("currency-input");
    currencyDiv.setAttribute("draggable", "true");

    currencyDiv.innerHTML = `
      <div class="currency-info">
        <div class="flag"><span class="fi fi-${countryCode}"></span></div>
        <label>${currency}</label>
      </div>
      <input type="text" data-currency="${currency}" value="${initialValue}" data-previous-value="${initialValue}">
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
    inputField.value = await formatNumberWithCommas(
      inputField.value,
      inputField
    );

    // In the addCurrency function's input handler:
    inputField.addEventListener("input", async (event) => {
      const input = event.target;
      const separators = await getNumberFormatSeparators();
      const cursorPos = input.selectionStart;

      // Store the previous raw value (without any formatting)
      const previousRawValue = input.dataset.previousValue || "";

      // Get current value and clean it (remove all formatting)
      let rawValue = input.value.replace(
        new RegExp(`[${separators.thousand}]`, "g"),
        ""
      );

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
      const newCursorPos = calculateNewCursorPosition(
        previousRawValue,
        input.value,
        cursorPos,
        separators
      );

      setTimeout(() => {
        input.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);

      updateCurrencyValues(input.dataset.currency);
    });

    // Blur event handler for final formatting
    inputField.addEventListener("blur", async () => {
      const decimalPlaces = await getDecimalPlaces(currency);
      const separators = await getNumberFormatSeparators();
      let value = inputField.value.replace(
        new RegExp(`[${separators.thousand}]`, "g"),
        ""
      );

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

  const changedInput = document.querySelector(
    `input[data-currency="${changedCurrency}"]`
  );

  if (!changedInput) {
    console.warn(`Input element for currency ${changedCurrency} not found`);
    return;
  }

  // Get raw value by removing thousand separators
  let rawValue = changedInput.value
    .replace(new RegExp(`[${separators.thousand}]`, "g"), "")
    .replace(separators.decimal, ".");

  // If input is empty or invalid, set others to 0
  if (rawValue === "" || isNaN(rawValue)) {
    document
      .querySelectorAll(".currency-input input")
      .forEach(async (input) => {
        if (input.dataset.currency === changedCurrency) return;

        const targetCurrency = input.dataset.currency;
        const decimalPlaces = await getDecimalPlaces(targetCurrency);
        const zeroValue = `0${separators.decimal}${"0".repeat(decimalPlaces)}`;

        input.value = await formatNumberWithCommas(zeroValue, input);
      });
    return;
  }

  const baseValue = parseFloat(rawValue) || 0;
  const baseCurrency = changedCurrency;

  // Update all other currency inputs
  document.querySelectorAll(".currency-input input").forEach(async (input) => {
    if (!input.dataset.currency || input.dataset.currency === changedCurrency) {
      return;
    }

    const targetCurrency = input.dataset.currency;
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

    // Apply tax if percentage > 0
    if (taxPercentage > 0) {
      convertedValue *= taxMultiplier;
    }

    // Format the final value
    let formattedValue = convertedValue.toFixed(decimalPlaces);
    if (separators.decimal === ",") {
      formattedValue = formattedValue.replace(".", ",");
    }

    input.value = await formatNumberWithCommas(formattedValue, input);
  });
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
    const firstWithValue = document.querySelector(
      '.currency-input input:not([value=""])'
    );
    if (firstWithValue) return firstWithValue;

    // Final fallback to first input
    return document.querySelector(".currency-input input");
  } catch (error) {
    console.error("Error in findBaseInput:", error);
    return document.querySelector(".currency-input input");
  }
}
