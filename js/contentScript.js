// ===== CONFIGURATION =====
const POPUP_ID = "currency-converter-popup";
const POPUP_DISTANCE = 20;

const CURRENCY_REPRESENTATIONS = {
  // Major currencies
  USD: [
    "US$",
    "U.S. Dollar",
    "U.S. Dollars",
    "US Dollar",
    "US Dollars",
    "American Dollar",
    "American Dollars",
    "United States Dollar",
    "United States Dollars",
  ],
  EUR: ["Euro", "Euros"],
  GBP: ["British Pound", "British Pounds", "Sterling", "Pound Sterling"],
  JPY: ["Japanese Yen", "Yen"],
  CNY: ["元", "Chinese Yuan", "Yuan", "Renminbi", "RMB"],

  AUD: ["A$", "AU$", "Australian Dollar", "Australian Dollars"],
  CAD: ["C$", "CA$", "CA Dollar", "CA Dollars", "Canadian Dollar", "Canadian Dollars"],
  CHF: ["Fr.", "SFr.", "Swiss Franc", "Swiss Francs"],
  HKD: ["HK$", "HK Dollar", "HK Dollars", "Hong Kong Dollar", "Hong Kong Dollars"],
  NZD: ["NZ$", "NZ Dollar", "NZ Dollars", "New Zealand Dollar", "New Zealand Dollars"],

  SEK: ["Swedish Krona", "Swedish Kronor"],
  NOK: ["Norwegian Krone", "Norwegian Kroner"],
  DKK: ["Danish Krone", "Danish Kroner"],

  SGD: ["S$", "Singapore Dollar", "Singapore Dollars"],
  MXN: ["Mex$", "Mexican Peso", "Mexican Pesos"],
  BRL: ["R$", "Brazilian Real", "Brazilian Reais"],
  INR: ["Indian Rupee", "Indian Rupees"],
  RUB: ["Russian Ruble", "Russian Rubles"],
  TRY: ["TL", "Turkish Lira"],
  ZAR: ["R", "South African Rand", "South African Rands"],

  // Middle Eastern currencies
  SAR: ["Saudi Riyal", "Saudi Riyals"],
  AED: [
    "DH",
    "UAE Dirham",
    "UAE Dirhams",
    "United Arab Emirates Dirham",
    "United Arab Emirates Dirhams",
    "Emirati Dirham",
    "Emirati Dirhams",
  ],
  QAR: ["Qatari Riyal", "Qatari Riyals"],

  // Asian currencies
  KRW: ["South Korean Won"],
  THB: ["Thai Baht"],
  VND: ["Vietnamese Dong"],
  MYR: ["RM", "Malaysian Ringgit"],
  IDR: ["Rp", "Indonesian Rupiah"],
  PHP: ["Philippine Peso", "Philippine Pesos"],
  TWD: ["NT$", "NT Dollar", "NT Dollars", "New Taiwan Dollar", "New Taiwan Dollars"],

  // Cryptocurrencies
  BTC: ["Bitcoin"],

  // African currencies
  EGP: ["E£", "Egyptian Pound", "Egyptian Pounds"],
  NGN: ["N", "Nigerian Naira", "Nigerian Nairas"],
  KES: ["KSh", "Kenyan Shilling", "Kenyan Shillings"],

  PLN: ["Polish Złoty", "Polish Złote"],
  CZK: ["Kč", "Czech Koruna", "Czech Koruny"],
  HUF: ["Ft", "Hungarian Forint", "Hungarian Forints"],

  ARS: ["ARS$", "AR$", "Argentine Peso", "Argentine Pesos"],
  CLP: ["CLP$", "Chilean Peso", "Chilean Pesos"],
  COP: ["COL$", "Colombian Peso", "Colombian Pesos"],
  PEN: ["S/", "Peruvian Sol", "Peruvian Soles"],

  DZD: ["Algerian Dinar", "Algerian Dinars"],
  MAD: ["Moroccan Dirham", "Moroccan Dirhams"],
  TND: ["Tunisian Dinar", "Tunisian Dinars", "DT"],
  ZMW: ["ZK", "Zambian Kwacha", "Zambian Kwachas"],
  RWF: ["FRw", "Rwandan Franc", "Rwandan Francs"],
  UGX: ["USh", "Ugandan Shilling", "Ugandan Shillings"],
  SDG: ["SD£", "Sudanese Pound", "Sudanese Pounds"],
  BWP: ["P", "Botswana Pula", "Botswana Pulas"],
  MGA: ["Ar", "Malagasy Ariary", "Malagasy Ariaries"],
  MUR: ["Mauritian Rupee", "Mauritian Rupees"],
  SCR: ["Seychellois Rupee", "Seychellois Rupees"],
  GHS: ["GH₵", "Ghanaian Cedi", "Ghanaian Cedis"],
  XOF: ["West African CFA Franc", "West African CFA Francs", "West African Franc", "West African Francs"],
  XAF: ["Central African CFA Franc", "Central African CFA Francs", "Central African Franc", "Central African Francs"],
  LSL: ["Lesotho Loti", "Lesotho Maloti"],
  SZL: ["Swazi Lilangeni", "Swazi Emalangeni"],

  MWK: ["MK", "Malawian Kwacha", "Malawian Kwachas"],
  NAD: ["N$", "Namibian Dollar", "Namibian Dollars"],
  SSP: ["SS£", "South Sudanese Pound", "South Sudanese Pounds"],

  BHD: ["BD", "Bahraini Dinar", "Bahraini Dinars"],
  KWD: ["KD", "Kuwaiti Dinar", "Kuwaiti Dinars"],
  OMR: ["Omani Rial", "Omani Rials"],
  JOD: ["Jordanian Dinar", "Jordanian Dinars"],
  IQD: ["Iraqi Dinar", "Iraqi Dinars"],
  IRR: ["Iranian Rial", "Iranian Rials"],
  YER: ["Yemeni Rial", "Yemeni Rials"],
  AFN: ["Afghan Afghani", "Afghan Afghanis"],
  PKR: ["Pakistani Rupee", "Pakistani Rupees"],
  LKR: ["Sri Lankan Rupee", "Sri Lankan Rupees"],

  NPR: ["Nepalese Rupee", "Nepalese Rupees"],
  UZS: ["so'm", "Uzbekistani Som", "Uzbekistani Soms"],
  TMT: ["m", "Turkmenistani Manat", "Turkmenistani Manats"],
  TJS: ["ЅМ", "Tajikistani Somoni", "Tajikistani Somonis"],
  KGS: ["сом", "Kyrgyzstani Som", "Kyrgyzstani Soms"],
  AZN: ["Azerbaijani Manat", "Azerbaijani Manats"],
  GEL: ["Georgian Lari", "Georgian Laris"],
  AMD: ["Armenian Dram", "Armenian Drams"],
  MMK: ["Burmese Kyat"],
  KHR: ["Cambodian Riel", "Cambodian Riels"],
  LAK: ["Lao Kip", "Lao Kips"],
  MOP: ["MOP$", "Macanese Pataca", "Macanese Patacas"],
  BND: ["Brunei Dollar", "Brunei Dollars"],
  PGK: ["Papua New Guinean Kina", "Papua New Guinean Kinas"],

  VUV: ["Vt", "Vanuatu Vatu"],
  WST: ["WS$", "Samoan Tala"],
  FJD: ["FJ$", "Fijian Dollar", "Fijian Dollars"],
  TOP: ["T$", "Tongan Paʻanga"],
  SBD: ["SI$", "Solomon Islands Dollar", "Solomon Islands Dollars"],
  XPF: ["CFP Franc", "CFP Francs"],

  RON: ["lei", "Romanian Leu", "Romanian Lei"],
  RSD: ["дин.", "Serbian Dinar", "Serbian Dinars"],
  MKD: ["ден", "Macedonian Denar", "Macedonian Denars"],
  ISK: ["Icelandic Króna", "Icelandic Krónur"],
  UAH: ["Ukrainian Hryvnia", "Ukrainian Hryvnias"],
  BYN: ["Br", "Belarusian Ruble", "Belarusian Rubles"],
  MDL: ["Moldovan Leu", "Moldovan Lei"],
  BAM: [
    "KM",
    "Bosnia and Herzegovina Convertible Mark",
    "Bosnia & Herzegovina Convertible Mark",
    "Bosnia-Herzegovina Convertible Mark",
    "Bosnia-Herzegovina Convertible Marka",
    "Convertible Marks",
  ],
  HRK: ["kn", "Croatian Kuna", "Croatian Kunas"],

  // Caribbean and Latin America
  DOP: ["RD$", "Dominican Peso", "Dominican Pesos"],
  GTQ: ["Q", "Guatemalan Quetzal", "Guatemalan Quetzales"],
  HNL: ["L.", "Honduran Lempira", "Honduran Lempiras"],
  NIO: ["C$", "Nicaraguan Córdoba"],
  BZD: ["BZ$", "Belize Dollar", "Belize Dollars"],
  BSD: ["BSD$", "Bahamian Dollar", "Bahamian Dollars"],
  TTD: [
    "TT$",
    "Trinidad and Tobago Dollar",
    "Trinidad & Tobago Dollar",
    "Trinidad & Tobago Dollars",
    "Trinidad and Tobago Dollars",
  ],
  UYU: ["$U", "Uruguayan Peso", "Uruguayan Pesos"],
  PYG: ["Gs.", "Paraguayan Guaraní"],
  BOB: ["Bolivian Boliviano", "Bolivian Bolivianos"],
  VEF: ["Bs.F", "Venezuelan Bolívar (old)"],
  VES: ["Bs.S", "Venezuelan Bolívar", "Venezuelan Bolívars"],

  // Special Drawing Rights and metals
  XDR: ["SDR", "Special Drawing Rights"],
  XAG: ["Silver"],
  XAU: ["Gold"],
  XPT: ["Platinum"],
  XPD: ["Palladium"],
};
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
  Dollars: [
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
  "د.إ": ["AED"],
  "د.ا": ["JOD"],
  "د.ج": ["DZD"],
  "د.م.": ["MAD"],
  "د.ت": ["TND"],
  "د.ب": ["BHD"],
  "د.ك": ["KWD"],
  "ع.د": ["IQD"],
  "ج.م": ["EGP"],
  CFA: ["XOF", "XAF"],
  SR: ["SAR", "SCR"],
  som: ["KGS", "UZS"],
  L: ["LSL", "SZL", "MDL", "HNL"],
  E: ["SZL"],
  M: ["LSL"],
  K: ["PGK", "MMK"],
  Rs: ["NPR", "MUR", "INR"],
  "Rs.": ["NPR", "MUR", "INR"],
  B$: ["BSD", "BND"],
  Bs: ["BOB", "VEF", "VES"],
  "Bs.": ["BOB", "VEF", "VES"],
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
  kr: ["SEK", "NOK", "DKK", "ISK"],
  ƒ: ["ANG", "AWG"],
  "₨": ["PKR", "NPR", "LKR", "MUR", "SCR"],
  "₿": ["BTC"],
  zł: ["PLN"],
  Fr: ["CHF", "XPF", "XOF", "XAF", "CDF", "RWF", "BIF", "DJF", "GNF", "KMF", "MGA"],
  "Fr.": ["CHF", "XPF", "XOF", "XAF", "CDF", "RWF", "BIF", "DJF", "GNF", "KMF", "MGA"],
  "₣": ["CHF", "XPF", "XOF", "XAF", "CDF", "RWF", "BIF", "DJF", "GNF", "KMF", "MGA"],
  "¥": ["JPY", "CNY"],
  "￥": ["JPY", "CNY"],
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
let convertTarget = "all"; // Default to showing all currencies

// Initialize currencies from storage
chrome.storage.local.get(
  ["currencyOrder", "currencyData", "fiatDecimals", "cryptoDecimals", "numberFormat", "convertTarget"],
  (result) => {
    savedCurrencies = {
      currencyOrder: result.currencyOrder || [],
      currencyData: result.currencyData || {},
      fiatDecimals: result.fiatDecimals ?? 2,
      cryptoDecimals: result.cryptoDecimals ?? 8,
      numberFormat: result.numberFormat ?? "comma-dot",
    };
    convertTarget = result.convertTarget || "all";

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
  const [thousandOpt, decimalOpt] = (savedCurrencies.numberFormat ?? "comma-dot").split("-");

  const isCrypto = ["BTC", "ETH", "XRP"].includes(currency);
  const decimals = isCrypto ? cryptoDecimals : fiatDecimals;

  // Determine separators
  const thousandSep = thousandOpt === "comma" ? "," : thousandOpt === "dot" ? "." : thousandOpt === "space" ? " " : "";
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
  formatted = decimalPart ? `${integerPart}${decimalSep}${decimalPart}` : integerPart;

  return formatted;
}

function parseNumber(text) {
  return parseNumberWithFormatDetection(text.replace(/\s+/g, ""));
}

function getFlagElement(currencyCode) {
  const flagDiv = document.createElement("div");
  flagDiv.className = "currency-converter-ex-flag";

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
    flagImg.className = "currency-converter-ex-flag-img";
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
      fallback.className = "currency-converter-ex-flag-fallback";
      fallback.textContent = currencyCode.substring(0, 2);
      fallback.style.width = "24px";
      fallback.style.height = "18px";
      fallback.style.display = "flex";
      fallback.style.alignItems = "center";
      fallback.style.justifyContent = "center";
      fallback.style.fontSize = "10px";
      fallback.style.background = "var(--currency-converter-ex-background)";
      fallback.style.borderRadius = "2px";
      flagContainer.appendChild(fallback);
    };

    flagContainer.appendChild(flagImg);
  } catch (e) {
    console.error("Error creating flag element:", e);
    const fallback = document.createElement("div");
    fallback.className = "currency-converter-ex-flag-fallback";
    fallback.textContent = currencyCode.substring(0, 2);
    flagContainer.appendChild(fallback);
  }

  flagDiv.appendChild(flagContainer);
  return flagDiv;
}

function detectCurrency(text) {
  const trimmedText = text.trim();
  if (!trimmedText) return { currency: "", amount: "", type: "invalid" };

  // First check for valid number(s) in the text
  const numberMatches = trimmedText.match(/\d[\d,. ]*/g);
  if (!numberMatches || numberMatches.length === 0) {
    return { currency: "", amount: "", type: "invalid" }; // No numbers found
  }
  if (numberMatches.length > 1) {
    return { currency: "", amount: "", type: "invalid" }; // Multiple numbers found
  }

  const amountPart = numberMatches[0];
  const parsedNumber = parseNumberWithFormatDetection(amountPart);
  if (parsedNumber === null || parsedNumber <= 0) {
    return { currency: "", amount: "", type: "invalid" }; // Invalid number
  }

  // Remove the number part to help with currency detection
  const textWithoutNumber = trimmedText.replace(amountPart, "").trim();

  // 1. Check for symbol prefixes/suffixes (strict matching)
  for (const [symbol, currencies] of Object.entries(CURRENCY_SYMBOLS)) {
    const escapedSymbol = symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Check for symbol immediately before or after number (no other characters)
    const prefixPattern = new RegExp(`^${escapedSymbol}\\s*${amountPart}$`);
    const suffixPattern = new RegExp(`^${amountPart}\\s*${escapedSymbol}$`);

    if (prefixPattern.test(trimmedText) || suffixPattern.test(trimmedText)) {
      return {
        currency: currencies[0],
        possibleCurrencies: currencies,
        amount: amountPart,
        type: "symbol",
        symbol: symbol,
      };
    }
  }

  // 2. Check for currency codes (3 letters, case insensitive)
  const currencyCodeMatch = textWithoutNumber.match(/^[A-Z]{3}$/i);
  if (currencyCodeMatch) {
    const code = currencyCodeMatch[0].toUpperCase();
    if (currencyToCountry[code]) {
      return {
        currency: code,
        amount: amountPart,
        type: "code",
      };
    }
  }

  // 3. Check for word representations (exact matches in remaining text)
  for (const [currencyCode, representations] of Object.entries(CURRENCY_REPRESENTATIONS)) {
    for (const representation of representations) {
      // Check if remaining text exactly matches a representation (case insensitive)
      const repRegex = new RegExp(`^${representation.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
      if (repRegex.test(textWithoutNumber)) {
        return {
          currency: currencyCode,
          amount: amountPart,
          type: "word",
          representation: representation,
        };
      }
    }
  }

  // If we get here and textWithoutNumber is empty, it was just a number
  if (!textWithoutNumber) {
    return {
      currency: "USD", // Default to USD if only number is selected
      amount: amountPart,
      type: "unknown",
    };
  }

  // No valid currency found
  return { currency: "", amount: "", type: "invalid" };
}

function parseNumberWithFormatDetection(text) {
  if (!text) return null;

  // Step 1: Extract the numeric part (allowing spaces, commas, or dots as separators)
  const numberMatch = text.match(/[\d ,.]+/);
  if (!numberMatch) return null;

  const cleanText = numberMatch[0].replace(/\s+/g, ""); // Remove all whitespace first

  // Step 2: Handle different formats
  // Case 1: Space as thousand, dot as decimal → "1 000.50" → 1000.50
  if (/^\d{1,3}( \d{3})*(\.\d+)?$/.test(numberMatch[0])) {
    return parseFloat(cleanText.replace(/ /g, ""));
  }

  // Case 2: Space as thousand, comma as decimal → "1 000,50" → 1000.50
  if (/^\d{1,3}( \d{3})*(,\d+)?$/.test(numberMatch[0])) {
    return parseFloat(cleanText.replace(/ /g, "").replace(",", "."));
  }

  // Case 3: Comma as thousand, dot as decimal → "1,000.50" → 1000.50
  if (/^\d{1,3}(,\d{3})*(\.\d+)?$/.test(cleanText)) {
    return parseFloat(cleanText.replace(/,/g, ""));
  }

  // Case 4: Dot as thousand, comma as decimal → "1.000,50" → 1000.50
  if (/^\d{1,3}(\.\d{3})*(,\d+)?$/.test(cleanText)) {
    return parseFloat(cleanText.replace(/\./g, "").replace(",", "."));
  }

  // Case 5: No thousand separator, just decimal → "1000.50" or "1000,50"
  if (/^\d+([.,]\d+)?$/.test(cleanText)) {
    return parseFloat(cleanText.replace(",", "."));
  }

  // Default: Try to parse as-is (removing all non-numeric chars except [.,])
  return parseFloat(cleanText.replace(",", "."));
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
      root.classList.add("currency-converter-ex-dark-mode");
    } else {
      root.classList.remove("currency-converter-ex-dark-mode");
    }
  });

  const popup = document.createElement("div");
  popup.id = POPUP_ID;
  popup.style.cssText = `
  top: ${POPUP_DISTANCE}px;`;

  // Check dark mode state

  // Pointer triangle
  const pointer = document.createElement("div");
  pointer.className = "currency-converter-ex-pointer";
  pointer.style.cssText = `
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--currency-converter-ex-background);
    filter: drop-shadow(0 -1px 1px rgba(0,0,0,0.1));
  `;
  popup.appendChild(pointer);

  // Selection view
  const selectionView = document.createElement("div");
  selectionView.id = `${POPUP_ID}-selection`;
  selectionView.className = "currency-converter-ex-selection";

  selectionView.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;width:fit-content;gap: 8px;height:16px">
      <img class="currency-converter-ex-icon" src="${chrome.runtime.getURL("icons/icon.png")}" 
           style='width:16px;height:16px;border-radius:2px'>
    <span id="${POPUP_ID}-text" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px"></span>
  `;
  popup.appendChild(selectionView);

  // Currencies view
  const currenciesView = document.createElement("div");
  currenciesView.id = `${POPUP_ID}-currencies`;
  currenciesView.className = "currency-converter-ex-currencies";
  popup.appendChild(currenciesView);

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
  const selectionView = document.getElementById(`${POPUP_ID}-selection`);
  const currenciesContainer = document.getElementById(`${POPUP_ID}-currencies`);

  // Clear previous currencies but keep the container structure
  currenciesContainer.innerHTML = '<div style="padding:4px 0;text-align:center">Loading...</div>';

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
  chrome.storage.local.get(["currencyOrder", "currencyData", "convertTarget"], (result) => {
    if (!result.currencyData) {
      currenciesContainer.innerHTML =
        '<div class="currency-converter-ex-currency-error">No currency data available</div>';
      return;
    }

    const rates = result.currencyData || DEFAULT_CURRENCIES;
    let orderedCurrencies = {};
    convertTarget = result.convertTarget || "all";

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
      popupElement.dataset.baseCurrency = baseCurrency;
      popupElement.dataset.baseAmount = amount;

      // Add source currency as first item
      const sourceItem = document.createElement("div");
      sourceItem.className = `currency-converter-ex-currency-item currency-converter-ex-currency-source currency-converter-ex-currency-highlight`;
      sourceItem.style.paddingTop = "8px";

      // Create flag container
      // (Only base currency)
      const sourceFlagContainer = document.createElement("div");
      sourceFlagContainer.style.display = "flex";
      sourceFlagContainer.style.alignItems = "center";
      sourceFlagContainer.style.gap = "2px";

      // Add flag
      sourceFlagContainer.appendChild(getFlagElement(baseCurrency));

      // Add currency code
      const sourceCodeSpan = document.createElement("span");
      sourceCodeSpan.textContent = baseCurrency;
      sourceFlagContainer.appendChild(sourceCodeSpan);
      sourceItem.appendChild(sourceFlagContainer);

      // Add symbol switcher if multiple currencies available
      if (possibleCurrencies.length > 1) {
        const switcher = document.createElement("div");
        switcher.className = "currency-converter-ex-symbol-switcher";
        switcher.style.display = "flex";
        switcher.style.height = "14px";
        switcher.style.cursor = "pointer";

        const switcherIcon = document.createElement("span");
        switcherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
            <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
          </svg>`;
        switcherIcon.title = `Switch between ${possibleCurrencies.join(", ")}`;

        switcher.appendChild(switcherIcon);
        sourceItem.appendChild(switcher);
        switcher.addEventListener("click", (e) => {
          e.stopPropagation();
          currentSymbolIndex = (currentSymbolIndex + 1) % possibleCurrencies.length;
          currentBaseCurrency = possibleCurrencies[currentSymbolIndex];
          const currentAmount = parseFloat(popupElement.dataset.baseAmount);
          renderConversions(currentBaseCurrency, currentAmount);
        });
      }

      // Add amount
      const sourceValueSpan = document.createElement("span");
      sourceValueSpan.textContent = formatNumber(amount, baseCurrency);
      sourceItem.appendChild(sourceValueSpan);

      currenciesContainer.appendChild(sourceItem);

      // Handle conversion based on convertTarget setting
      if (convertTarget === "one" && result.currencyOrder?.length > 0) {
        // Only show the first currency in the list
        // (Only one currency)
        const targetCurrency = result.currencyOrder[0];
        if (targetCurrency !== baseCurrency) {
          const convertedValue = convertCurrency(amount, baseCurrency, targetCurrency, rates);

          const item = document.createElement("div");
          item.className = "currency-converter-ex-currency-item";
          item.dataset.currency = targetCurrency;

          const flagContainer = document.createElement("div");
          flagContainer.style.display = "flex";
          flagContainer.style.alignItems = "center";
          flagContainer.style.gap = "2px";
          flagContainer.style.width = "100%";
          flagContainer.style.minWidth = "70px";

          flagContainer.appendChild(getFlagElement(targetCurrency));

          const codeSpan = document.createElement("span");
          codeSpan.textContent = targetCurrency;
          codeSpan.style.marginRight = "4px";
          flagContainer.appendChild(codeSpan);

          item.appendChild(flagContainer);

          const valueSpan = document.createElement("span");
          valueSpan.textContent = formatNumber(convertedValue, targetCurrency);
          item.appendChild(valueSpan);

          currenciesContainer.appendChild(item);
        }
      } else {
        // Show all currencies in the specified order
        // (All currencies except base currency)
        Object.keys(originalOrderedCurrencies).forEach((targetCurrency) => {
          if (targetCurrency === baseCurrency) return;

          const convertedValue = convertCurrency(amount, baseCurrency, targetCurrency, rates);

          const item = document.createElement("div");
          item.className = "currency-converter-ex-currency-item";
          item.dataset.currency = targetCurrency;

          const flagContainer = document.createElement("div");
          flagContainer.style.display = "flex";
          flagContainer.style.alignItems = "center";
          flagContainer.style.gap = "2px";
          flagContainer.style.width = "100%";
          flagContainer.style.minWidth = "70px";

          flagContainer.appendChild(getFlagElement(targetCurrency));

          const codeSpan = document.createElement("span");
          codeSpan.textContent = targetCurrency;
          codeSpan.style.marginRight = "4px";
          flagContainer.appendChild(codeSpan);

          item.appendChild(flagContainer);

          const valueSpan = document.createElement("span");
          valueSpan.textContent = formatNumber(convertedValue, targetCurrency);
          item.appendChild(valueSpan);

          currenciesContainer.appendChild(item);
        });
      }

      // Calculate expanded height based on number of items
      const itemHeight = 24;
      const padding = 16;
      const itemCount =
        convertTarget === "one"
          ? result.currencyOrder[0] === baseCurrency
            ? 0
            : 1
          : Object.keys(originalOrderedCurrencies).length - 1;
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
    "#currency-converter-popup .currency-converter-ex-currency-source span"
  );
  const sourceValueSpan = document.querySelector(
    "#currency-converter-popup .currency-converter-ex-currency-source span:last-child"
  );
  const flagContainer = document.querySelector(
    "#currency-converter-popup .currency-converter-ex-currency-source .currency-converter-ex-flag"
  );

  // Update code display
  sourceCodeSpan.textContent = `${newCurrency}    `;

  // Update flag
  flagContainer.innerHTML = "";
  flagContainer.appendChild(getFlagElement(newCurrency));

  // Update all conversions
  document
    .querySelectorAll(
      "#currency-converter-popup .currency-converter-ex-currency-item:not(.currency-converter-ex-currency-source)"
    )
    .forEach((item) => {
      const targetCurrency = item.querySelector("span")?.textContent?.trim().split(/\s+/)[0];
      if (targetCurrency && targetCurrency !== newCurrency) {
        const convertedValue = convertCurrency(amount, newCurrency, targetCurrency, rates);
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
    popup.style.top = `${lastSelectionRect.top + scrollY - popupHeight - POPUP_DISTANCE}px`;
    pointer.style.top = "100%";
    pointer.style.transform = "translateX(-50%)";
    pointer.style.borderLeft = "8px solid transparent";
    pointer.style.borderRight = "8px solid transparent";
    pointer.style.borderTop = "8px solid var(--currency-converter-ex-background)";
    pointer.style.borderBottom = "none";
    pointer.style.filter = "drop-shadow(0 1px 1px rgba(0,0,0,0.1))";
  } else if (spaceBelow >= popupHeight) {
    // Position below selection
    popup.style.top = `${lastSelectionRect.bottom + scrollY + POPUP_DISTANCE}px`;
    pointer.style.top = "-8px";
    pointer.style.transform = "translateX(-50%)";
    pointer.style.borderLeft = "8px solid transparent";
    pointer.style.borderRight = "8px solid transparent";
    pointer.style.borderBottom = "8px solid var(--currency-converter-ex-background)";
    pointer.style.borderTop = "none";
    pointer.style.filter = "drop-shadow(0 -1px 1px rgba(0,0,0,0.1))";
  } else {
    // Not enough space in either direction - adjust popup height and position below
    const adjustedHeight = Math.min(popupHeight, spaceBelow);
    popup.style.height = `${adjustedHeight}px`;
    // popup.style.overflowY = "auto";
    popup.style.top = `${lastSelectionRect.bottom + scrollY + POPUP_DISTANCE}px`;
    pointer.style.top = "-8px";
    pointer.style.transform = "translateX(-50%)";
    pointer.style.borderLeft = "8px solid transparent";
    pointer.style.borderRight = "8px solid transparent";
    pointer.style.borderBottom = "8px solid var(--currency-converter-ex-background)";
    pointer.style.borderTop = "none";
    pointer.style.filter = "drop-shadow(0 -1px 1px rgba(0,0,0,0.1))";
  }

  // Horizontal positioning (centered above/below selection)
  popup.style.left = `${lastSelectionRect.left + scrollX + lastSelectionRect.width / 2}px`;
}

function refreshDisplayedValues() {
  const popupElement = document.getElementById(POPUP_ID);
  if (!popupElement || !lastSelectionValue) return;

  // Get the current base currency and amount from popup dataset
  const baseCurrency = popupElement.dataset.baseCurrency;
  const baseAmount = parseFloat(popupElement.dataset.baseAmount);

  // Get fresh rates
  chrome.storage.local.get(["currencyData", "fiatDecimals", "cryptoDecimals", "numberFormat"], (result) => {
    if (!result.currencyData) return;

    // Update saved currencies with latest settings
    savedCurrencies.fiatDecimals = result.fiatDecimals ?? 2;
    savedCurrencies.cryptoDecimals = result.cryptoDecimals ?? 8;
    savedCurrencies.numberFormat = result.numberFormat ?? "comma-dot";

    // Update all displayed values
    const currencyItems = document.querySelectorAll(
      ".currency-converter-ex-currency-item:not(.currency-converter-ex-currency-source)"
    );
    for (const item of currencyItems) {
      const currencyCode = item.dataset.currency;
      if (!currencyCode) continue;

      // Calculate new value with updated decimals
      const convertedValue = convertCurrency(baseAmount, baseCurrency, currencyCode, result.currencyData);

      // Find the value span - it should be the last span in the item
      const spans = item.querySelectorAll("span");
      if (spans.length >= 2) {
        const valueSpan = spans[spans.length - 1]; // Last span is the value
        valueSpan.textContent = formatNumber(convertedValue, currencyCode);
      }
    }

    // Also update the source amount display
    const sourceItem = document.querySelector(".currency-converter-ex-currency-source");
    if (sourceItem) {
      const spans = sourceItem.querySelectorAll("span");
      if (spans.length >= 2) {
        const valueSpan = spans[spans.length - 1]; // Last span is the value
        valueSpan.textContent = formatNumber(baseAmount, baseCurrency);
      }
    }
  });
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
        document.documentElement.classList.contains("currency-converter-ex-dark-mode")
      ) {
        chrome.storage.local.get(["darkMode"], (result) => {
          const root = document.documentElement;
          if (result.darkMode === "dark") {
            root.classList.add("currency-converter-ex-dark-mode");
          } else {
            root.classList.remove("currency-converter-ex-dark-mode");
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
      if (!popup.contains(e.target) && popup.style.display === "flex") {
        hidePopup();
      }
    });

    function hidePopup() {
      const popupElement = document.getElementById(POPUP_ID);
      if (popupElement) {
        popupElement.style.display = "none";
        showSelectionView(popupElement, lastSelectionValue);
        isActive = false;
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

    function isCurrencyValue(text) {
      const trimmedText = text.trim();
      if (!trimmedText) return false;

      // 1. First extract what looks like the number part (allowing various formats)
      const numberMatch = trimmedText.match(/[+-]?[\d ,.]+/);
      if (!numberMatch) return false;

      const numberPart = numberMatch[0];
      const numberStartIndex = trimmedText.indexOf(numberPart);
      const numberEndIndex = numberStartIndex + numberPart.length;

      const prefix = trimmedText.slice(0, numberStartIndex).trim();
      const suffix = trimmedText.slice(numberEndIndex).trim();

      // 2. Parse the number to ensure it's valid
      const parsedNumber = parseNumberWithFormatDetection(numberPart);
      if (parsedNumber === null || parsedNumber <= 0) return false;

      // 3. Check for valid currency indicators (strict matching)
      const checkCurrencyIndicator = (text) => {
        if (!text) return null;

        // Check for currency symbols (exact match)
        for (const [symbol, currencies] of Object.entries(CURRENCY_SYMBOLS)) {
          // Match symbol exactly (including multi-character symbols like "NT$")
          if (text === symbol) return currencies[0];
        }

        // Check for currency codes (case insensitive)
        const upperText = text.toUpperCase();
        if (CURRENCY_REPRESENTATIONS[upperText]) {
          return upperText;
        }

        // Check for word representations (case insensitive exact match)
        for (const [currencyCode, representations] of Object.entries(CURRENCY_REPRESENTATIONS)) {
          for (const rep of representations) {
            if (text.toLowerCase() === rep.toLowerCase()) {
              return currencyCode;
            }
          }
        }

        return null;
      };

      const prefixCurrency = checkCurrencyIndicator(prefix);
      const suffixCurrency = checkCurrencyIndicator(suffix);

      // 4. Strict validation rules
      // Must have exactly one currency indicator (either prefix OR suffix)
      if ((prefixCurrency && suffixCurrency) || (!prefixCurrency && !suffixCurrency)) {
        return false;
      }

      // 5. The ENTIRE text must consist of just:
      //    [currency][number], [number][currency], or similar with optional spaces
      // Allow for no space between currency and number (like "$100" or "100$")
      const validPattern = prefixCurrency
        ? `(${escapeRegExp(prefix)}\\s*${escapeRegExp(numberPart)}|${escapeRegExp(prefix)}${escapeRegExp(numberPart)})`
        : `(${escapeRegExp(numberPart)}\\s*${escapeRegExp(suffix)}|${escapeRegExp(numberPart)}${escapeRegExp(suffix)})`;

      const patternRegex = new RegExp(`^${validPattern}$`, "i");
      if (!patternRegex.test(trimmedText)) {
        return false;
      }

      return true;
    }

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // Helper function to check if text contains a valid currency indicator
    // function checkCurrencyIndicator(text) {
    //   if (!text) return false;

    //   // Check for currency codes (3 letters)
    //   if (text.length === 3) {
    //     const code = text.toUpperCase();
    //     if (currencyToCountry[code]) {
    //       return true;
    //     }
    //   }

    //   // Check for currency symbols
    //   for (const symbol of Object.keys(CURRENCY_SYMBOLS)) {
    //     if (text.includes(symbol)) {
    //       return true;
    //     }
    //   }

    //   // Check for word representations (case insensitive)
    //   const lowerText = text.toLowerCase();
    //   for (const representations of Object.values(CURRENCY_REPRESENTATIONS)) {
    //     for (const rep of representations) {
    //       if (lowerText.includes(rep.toLowerCase())) {
    //         return true;
    //       }
    //     }
    //   }

    //   return false;
    // }

    function checkCurrencyIndicator(text) {
      if (!text) return null;

      // Check for currency symbols (exact match, case-sensitive for symbols)
      for (const [symbol, currencies] of Object.entries(CURRENCY_SYMBOLS)) {
        // Match symbol exactly (including multi-character symbols)
        if (text === symbol) return currencies[0];
      }

      // Check for currency codes (3 letters, case insensitive)
      if (text.length === 3) {
        const code = text.toUpperCase();
        if (currencyToCountry[code]) {
          return code;
        }
      }

      // Check for word representations (case insensitive exact match)
      const lowerText = text.toLowerCase();
      for (const [currencyCode, representations] of Object.entries(CURRENCY_REPRESENTATIONS)) {
        for (const rep of representations) {
          if (lowerText === rep.toLowerCase()) {
            return currencyCode;
          }
        }
      }

      return null;
    }

    // Helper function to check if number is wrapped in currency symbol (like $100 or 100$)
    function isNumberWrappedInCurrencySymbol(text) {
      // Check for symbol prefix (e.g. $100)
      for (const symbol of Object.keys(CURRENCY_SYMBOLS)) {
        const prefixPattern = new RegExp(`^${escapeRegExp(symbol)}\\s*\\d`);
        if (prefixPattern.test(text)) {
          return true;
        }
      }

      // Check for symbol suffix (e.g. 100$)
      for (const symbol of Object.keys(CURRENCY_SYMBOLS)) {
        const suffixPattern = new RegExp(`\\d\\s*${escapeRegExp(symbol)}$`);
        if (suffixPattern.test(text)) {
          return true;
        }
      }

      return false;
    }

    // Helper to escape regex special characters
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

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
        needsRefresh = true;
      }

      // 3. Handle number format changes
      if (changes.numberFormat) {
        savedCurrencies.numberFormat = changes.numberFormat.newValue;
        needsRefresh = true;
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

      // 6. Handle convertTarget changes
      if (changes.convertTarget) {
        convertTarget = changes.convertTarget.newValue;
        needsRefresh = true;
      }

      // 7. Handle dark mode changes
      if (changes.darkMode) {
        chrome.storage.local.get(["darkMode"], (result) => {
          const root = document.documentElement;
          if (result.darkMode === "dark") {
            root.classList.add("currency-converter-ex-dark-mode");
          } else {
            root.classList.remove("currency-converter-ex-dark-mode");
          }
        });
      }

      // Refresh display if needed and we're in currencies view
      if (needsRefresh && currentMode === "currencies" && lastSelectionValue) {
        // For convertTarget changes or number format changes, rebuild completely
        if (changes.convertTarget || changes.numberFormat) {
          showCurrenciesView(document.getElementById(POPUP_ID), lastSelectionValue);
        } else {
          // For other changes, just refresh values
          refreshDisplayedValues();
        }
      }
    });
  });
}

// Start the application
initialize();
