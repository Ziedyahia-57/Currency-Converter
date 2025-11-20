// ===== CONFIGURATION =====
const POPUP_ID = "currency-converter-popup";
const POPUP_DISTANCE = 20;

const CURRENCY_REPRESENTATIONS = {
  // Major currencies
  USD: [
    "US$",
    "$US",
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

  AUD: ["A$", "$A", "AU$", "$AU", "Australian Dollar", "Australian Dollars"],
  CAD: ["CA$", "$CA", "CA Dollar", "CA Dollars", "Canadian Dollar", "Canadian Dollars"],
  CHF: ["Fr.", "SFr.", "Swiss Franc", "Swiss Francs"],
  HKD: ["HK$", "$HK", "HK Dollar", "HK Dollars", "Hong Kong Dollar", "Hong Kong Dollars"],
  NZD: ["NZ$", "$NZ", "NZ Dollar", "NZ Dollars", "New Zealand Dollar", "New Zealand Dollars"],

  SEK: ["Swedish Krona", "Swedish Kronor"],
  NOK: ["Norwegian Krone", "Norwegian Kroner"],
  DKK: ["Danish Krone", "Danish Kroner"],

  SGD: ["S$", "$S", "Singapore Dollar", "Singapore Dollars"],
  MXN: ["Mex$", "$Mex", "Mexican Peso", "Mexican Pesos"],
  BRL: ["R$", "$R", "Brazilian Real", "Brazilian Reais", "Real", "Reais"],
  INR: ["Indian Rupee", "Indian Rupees", "Rupee", "Rupees"],
  RUB: ["Russian Ruble", "Russian Rubles"],
  TRY: ["TL", "Turkish Lira"],
  ZAR: [
    "R",
    "South African Rand",
    "South African Rands",
    "S. African Rand",
    "S. African Rands",
    "S.African Rand",
    "S.African Rands",
    "Rand",
    "Rands",
  ],

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
  KRW: ["South Korean Won", "S. Korean Won", "S.Korean Won", "Won"],
  THB: ["Thai Baht"],
  VND: ["Vietnamese Dong"],
  MYR: ["RM", "Malaysian Ringgit"],
  IDR: ["Rp", "Indonesian Rupiah"],
  PHP: ["Philippine Peso", "Philippine Pesos"],
  TWD: ["NT$", "$NT", "NT Dollar", "NT Dollars", "New Taiwan Dollar", "New Taiwan Dollars"],

  // Cryptocurrencies
  BTC: ["Bitcoin"],

  // African currencies
  EGP: ["E£", "Egyptian Pound", "Egyptian Pounds"],
  NGN: ["N", "Nigerian Naira", "Nigerian Nairas"],
  KES: ["KSh", "Kenyan Shilling", "Kenyan Shillings"],

  PLN: ["Polish Złoty", "Polish Złote"],
  CZK: ["Kč", "Czech Koruna", "Czech Koruny"],
  HUF: ["Ft", "Hungarian Forint", "Hungarian Forints"],

  ARS: ["ARS$", "$ARS", "$AR", "AR$", "Argentine Peso", "Argentine Pesos"],
  CLP: ["CLP$", "$CLP", "Chilean Peso", "Chilean Pesos"],
  COP: ["COL$", "$COL", "Colombian Peso", "Colombian Pesos"],
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
  XOF: [
    "West African CFA Franc",
    "West African CFA Francs",
    "W. African CFA Franc",
    "W. African CFA Francs",
    "W.African CFA Franc",
    "W.African CFA Francs",
    "West African Franc",
    "West African Francs",
    "W. African Franc",
    "W. African Francs",
    "W.African Franc",
    "W.African Francs",
  ],
  XAF: ["Central African CFA Franc", "Central African CFA Francs", "Central African Franc", "Central African Francs"],
  LSL: ["Lesotho Loti", "Lesotho Maloti"],
  SZL: ["Swazi Lilangeni", "Swazi Emalangeni"],

  MWK: ["MK", "Malawian Kwacha", "Malawian Kwachas"],
  NAD: ["N$", "$N", "Namibian Dollar", "Namibian Dollars"],
  SSP: [
    "SS£",
    "South Sudanese Pound",
    "South Sudanese Pounds",
    "S. Sudanese Pound",
    "S. Sudanese Pounds",
    "S.Sudanese Pound",
    "S.Sudanese Pounds",
  ],
  TZS: ["TSh", "Tanzanian Shilling", "Tanzanian Shillings"],
  BIF: ["FBu", "Burundian Franc", "Burundian Francs"],
  BGN: ["BGN", "Bulgarian Lev", "Bulgarian Leva"],

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
  MOP: ["MOP$", "$MOP", "Macanese Pataca", "Macanese Patacas"],
  BND: ["Brunei Dollar", "Brunei Dollars"],
  PGK: ["Papua New Guinean Kina", "Papua New Guinean Kinas"],

  VUV: ["Vt", "Vanuatu Vatu"],
  WST: ["WS$", "$WS", "Samoan Tala"],
  FJD: ["FJ$", "$FJ", "Fijian Dollar", "Fijian Dollars"],
  TOP: ["T$", "$T", "Tongan Paʻanga", "Tongan Paanga"],
  SBD: ["SI$", "$SI", "Solomon Islands Dollar", "Solomon Islands Dollars"],
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
  DOP: ["RD$", "$RD", "Dominican Peso", "Dominican Pesos"],
  GTQ: ["Q", "Guatemalan Quetzal", "Guatemalan Quetzales"],
  HNL: ["L.", "Honduran Lempira", "Honduran Lempiras"],
  NIO: ["Nicaraguan Córdoba"],
  BZD: ["BZ$", "$BZ", "Belize Dollar", "Belize Dollars"],
  BSD: ["BSD$", "$BSD", "Bahamian Dollar", "Bahamian Dollars"],
  TTD: [
    "TT$",
    "$TT",
    "Trinidad and Tobago Dollar",
    "Trinidad & Tobago Dollar",
    "Trinidad & Tobago Dollars",
    "Trinidad and Tobago Dollars",
  ],
  UYU: ["$U", "U$", "Uruguayan Peso", "Uruguayan Pesos"],
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

  ZWL: ["Z$", "$Z", "Zimbabwean Dollar", "Zimbabwean Dollars"],
  BBD: ["Bds$", "$Bds", "Barbadian Dollar", "Barbadian Dollars"],
  XCD: [
    "EC$",
    "$EC",
    "East Caribbean Dollar",
    "East Caribbean Dollars",
    "E. Caribbean Dollar",
    "E. Caribbean Dollars",
    "E.Caribbean Dollar",
    "E.Caribbean Dollars",
  ],
  LRD: ["L$", "$L", "Liberian Dollar", "Liberian Dollars"],
  SRD: ["SR$", "$SR", "Surinamese Dollar", "Surinamese Dollars"],
  GYD: ["G$", "$G", "Guyanese Dollar", "Guyanese Dollars"],
  KYD: ["KY$", "$KY", "Cayman Islands Dollar", "Cayman Islands Dollars"],
  JMD: ["J$", "$J", "Jamaican Dollar", "Jamaican Dollars"],
};
const CURRENCY_SYMBOLS = {
  // Single-currency symbols
  $: [
    "USD",
    "CAD",
    "AUD", // continue from here
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
  Dollar: [
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
  دولار: [
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
  ريالات: ["SAR", "IRR", "YER", "OMR", "QAR"],
  ريال: ["SAR", "IRR", "YER", "OMR", "QAR"],
  Riyal: ["SAR", "IRR", "YER", "OMR", "QAR"],
  Riyals: ["SAR", "IRR", "YER", "OMR", "QAR"],
  "ر.س": ["SAR"],
  "ر.س.": ["SAR"],
  "ر.ع": ["OMR"],
  "ر.ع.": ["OMR"],
  "ر.ق": ["QAR"],
  "ر.ق.": ["QAR"],
  "د.إ": ["AED"],
  "د.إ.": ["AED"],
  دراهم: ["MAD", "AED"],
  درهم: ["MAD", "AED"],
  Dirham: ["MAD", "AED"],
  Dirhams: ["MAD", "AED"],
  "د.ا": ["AED", "JOD"],
  "د.ا.": ["AED", "JOD"],
  "د.ج": ["DZD"],
  "د.ج.": ["DZD"],
  "د.م": ["MAD"],
  "د.م.": ["MAD"],
  "د.ت": ["TND"],
  "د.ت.": ["TND"],
  "د.ب": ["BHD"],
  "د.ب.": ["BHD"],
  "د.ك": ["KWD"],
  "د.ك.": ["KWD"],
  دينارات: ["TND", "DZD", "BHD", "KWD", "JOD"],
  دنانير: ["TND", "DZD", "BHD", "KWD", "JOD"],
  دينار: ["TND", "DZD", "BHD", "KWD", "JOD"],
  Dinar: ["TND", "DZD", "BHD", "KWD", "JOD"],
  Dinars: ["TND", "DZD", "BHD", "KWD", "JOD"],
  "د.ع": ["IQD"],
  "د.ع.": ["IQD"],
  "ج.م": ["EGP"],
  "ج.م.": ["EGP"],
  "ل.س": ["SYP"],
  "ل.س.": ["SYP"],
  CFA: ["XOF", "XAF"],
  $C: ["CAD", "NIO"],
  C$: ["CAD", "NIO"],
  SR: ["SAR", "SCR"],
  som: ["KGS", "UZS"],
  L: ["LSL", "SZL", "MDL", "HNL"],
  E: ["SZL"],
  M: ["LSL"],
  K: ["PGK", "MMK"],
  Rs: ["NPR", "MUR", "INR"],
  "Rs.": ["NPR", "MUR", "INR"],
  B$: ["BSD", "BND"],
  $B: ["BSD", "BND"],
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
  BYR: "by",
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
  LTL: "lt",
  LVL: "lv",
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
  SLE: "sl",
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
  ZMK: "zm",
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
  // Use parseNumberWithFormatDetection directly for consistent parsing
  return parseNumberWithFormatDetection(text);
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

function parseThousandSeparatorCase(text) {
  // Special handling for cases like "1.000 $" or "1,000$"
  // where a comma or dot is used as a thousand separator
  const match = text.match(/^\d+[,.]\s*\d{3}/);
  if (match) {
    const matchedText = match[0];
    const separator = matchedText.includes(",") ? "," : ".";

    // Check if there's also a decimal part after the thousand separator
    // This handles cases like "usd1.000,5" or "$1,000.5"
    const fullMatch = text.match(/^\d+[,.]\s*\d{3}[,.]\s*\d+/);
    if (fullMatch) {
      const fullText = fullMatch[0];
      // If we have both separators, determine which is which
      if (separator === ",") {
        // Format: 1,000.5 (comma as thousand, dot as decimal)
        return parseFloat(fullText.replace(/,/g, ""));
      } else {
        // Format: 1.000,5 (dot as thousand, comma as decimal)
        return parseFloat(fullText.replace(/\./g, "").replace(",", "."));
      }
    }

    // No decimal part, just thousand separator
    return parseFloat(matchedText.replace(new RegExp("\\" + separator, "g"), ""));
  }
  return null;
}

function parseNumberWithFormatDetection(text) {
  if (!text) return null;

  // Step 1: Extract the numeric part (allowing spaces, commas, or dots as separators)
  const numberMatch = text.match(/[\d ,.]+/);
  if (!numberMatch) return null;

  // Keep the original text for special cases like "1.000 $" or "1,000$"
  const originalText = numberMatch[0];
  const cleanText = originalText.replace(/\s+/g, ""); // Remove all whitespace first

  // Special case for thousand separators like "1.000 $" or "1,000$"
  const thousandResult = parseThousandSeparatorCase(originalText);
  if (thousandResult !== null) {
    return thousandResult;
  }

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
          codeSpan.style.lineHeight = "18px";

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
          codeSpan.style.lineHeight = "18px";
          flagContainer.appendChild(codeSpan);

          item.appendChild(flagContainer);

          const valueSpan = document.createElement("span");
          valueSpan.textContent = formatNumber(convertedValue, targetCurrency);
          valueSpan.className = "currency-converter-ex-price";
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
// ===== IN-PAGE CONVERT =====
// Function to immediately update existing price elements when settings change
function updateExistingPriceElements() {
  // Get all detected price elements
  const elements = document.querySelectorAll('.detected-price, [id*="detected-price"]');

  // Get current settings
  chrome.storage.local.get(
    ["currencyOrder", "currencyData", "fiatDecimals", "cryptoDecimals", "numberFormat"],
    (result) => {
      if (!result.currencyOrder || result.currencyOrder.length === 0 || !result.currencyData) {
        return; // No currencies configured, nothing to update
      }

      // Update saved currencies with latest settings
      savedCurrencies.fiatDecimals = result.fiatDecimals ?? 2;
      savedCurrencies.cryptoDecimals = result.cryptoDecimals ?? 8;
      savedCurrencies.numberFormat = result.numberFormat ?? "comma-dot";

      const targetCurrency = result.currencyOrder[0];
      const rates = result.currencyData;

      // Update each price element
      elements.forEach((element) => {
        const originalText = element.dataset.originalText;
        if (!originalText) return; // Skip if no original text stored

        // Detect currency from original text
        const { currency, amount } = detectCurrency(originalText);
        if (!currency || !amount) return; // Skip if invalid

        // Convert amount to first currency in list
        const numericAmount = parseNumber(amount);
        const convertedValue = convertCurrency(numericAmount, currency, targetCurrency, rates);
        const formattedValue = formatNumber(convertedValue, targetCurrency);

        // Update element text with converted value
        element.textContent = `${formattedValue} ${targetCurrency}`;
      });
    }
  );
}

// function detectAndMarkPrices() {
//   // Get all text nodes on the page
//   const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false); // Walk through all text nodes in the document

//   const priceElements = [];
//   let node;

//   while ((node = walker.nextNode())) {
//     const text = node.textContent.trim();
//     if (!text) continue;

//     // Skip if this node is already inside a marked price element
//     if (node.parentElement.closest('[id*="detected-price"]')) {
//       continue;
//     }

//     // Use the same detection logic as the popup
//     if (isCurrencyValue(text)) {
//       const { currency, amount } = detectCurrency(text);
//       if (currency && amount) {
//         priceElements.push({
//           node: node,
//           text: text,
//           currency: currency,
//           amount: amount,
//         });
//       }
//     }
//   }

//   // Process found prices and mark them
//   priceElements.forEach((price, index) => {
//     markPriceElement(price.node, price.text, price.currency, price.amount, index);
//   });
// }

/**
 * Optimized price detection and marking with performance improvements
 */
class PriceDetector {
  constructor() {
    this.currencyCache = new Map();
    this.isProcessing = false;
    this.pendingDetection = false;
    this.processedElements = new Set();
    this.MAX_ELEMENTS = 500;
  }

  /**
   * Main function to detect and mark prices with performance optimizations
   */
  async detectAndMarkPrices() {
    if (this.isProcessing) {
      this.pendingDetection = true;
      return;
    }

    this.isProcessing = true;
    const startTime = performance.now();

    try {
      // Use a more efficient tree walker with better filtering
      const walker = this.createOptimizedTreeWalker();
      const priceElements = [];
      let node;
      let elementCount = 0;

      while ((node = walker.nextNode()) && elementCount < this.MAX_ELEMENTS) {
        const text = node.textContent.trim();
        if (!text || this.processedElements.has(node)) continue;

        const { currency, amount } = this.detectCurrency(text);
        if (currency && amount) {
          priceElements.push({ node, text, currency, amount });
          elementCount++;
        }
      }

      // Process in batches to avoid blocking
      await this.processInBatches(priceElements, 25);

      const duration = performance.now() - startTime;
      if (duration > 100) {
        console.warn(`Price detection took ${duration.toFixed(1)}ms - ${priceElements.length} elements`);
      }
    } finally {
      this.isProcessing = false;

      // Handle any pending detection requests
      if (this.pendingDetection) {
        this.pendingDetection = false;
        setTimeout(() => this.detectAndMarkPrices(), 50);
      }
    }
  }

  /**
   * Create optimized tree walker with better filtering
   */
  createOptimizedTreeWalker() {
    return document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip if already processed
          if (this.processedElements.has(node)) {
            return NodeFilter.FILTER_REJECT;
          }

          // Skip hidden elements and certain tags
          const parent = node.parentElement;
          if (
            !parent ||
            parent.offsetParent === null ||
            parent.closest('script, style, noscript, template, [id*="detected-price"]') ||
            parent.id == "currency-converter-popup-text" ||
            parent.querySelector("#currency-converter-popup-text")
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          // Quick text content check
          const text = node.textContent.trim();
          if (!text || text.length > 50) {
            // Skip very long text nodes
            return NodeFilter.FILTER_REJECT;
          }

          // Preliminary currency check
          return this.isLikelyCurrency(text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
      },
      false
    );
  }

  /**
   * Fast preliminary currency check
   */
  isLikelyCurrency(text) {
    // Quick regex check for common currency patterns
    return /[$€£¥₹₽₩₺₴₸֏؋৳៛₠₡₢₣₤₥₦₧₨₩₪₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿]|\d[.,]\d{2}\b|\b(USD|EUR|GBP|JPY|CNY|INR)\b/i.test(text);
  }

  /**
   * Cached currency detection
   */
  detectCurrency(text) {
    const cacheKey = text.trim();
    if (this.currencyCache.has(cacheKey)) {
      return this.currencyCache.get(cacheKey);
    }

    // Your existing detection logic here
    const result = isCurrencyValue(text) ? detectCurrency(text) : { currency: null, amount: null };

    this.currencyCache.set(cacheKey, result);
    return result;
  }

  /**
   * Process elements in batches with yielding
   */
  async processInBatches(elements, batchSize = 25) {
    for (let i = 0; i < elements.length; i += batchSize) {
      const batch = elements.slice(i, i + batchSize);

      // Process current batch
      batch.forEach((price, batchIndex) => {
        const globalIndex = i + batchIndex;
        markPriceElement(price.node, price.text, price.currency, price.amount, globalIndex);
        this.processedElements.add(price.node);
      });

      // Yield to main thread between batches
      if (i + batchSize < elements.length) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
  }

  /**
   * Debounced detection for multiple rapid calls
   */
  debouncedDetect() {
    if (this.detectionTimeout) {
      clearTimeout(this.detectionTimeout);
    }
    this.detectionTimeout = setTimeout(() => {
      this.detectAndMarkPrices();
    }, 150);
  }

  /**
   * Clear cache and reset state
   */
  reset() {
    this.currencyCache.clear();
    this.processedElements.clear();
    this.isProcessing = false;
    this.pendingDetection = false;
  }
}

// Initialize the detector
const priceDetector = new PriceDetector();

// Export the optimized function
function detectAndMarkPrices() {
  return priceDetector.debouncedDetect();
}

// For immediate detection (use sparingly)
function detectAndMarkPricesImmediate() {
  return priceDetector.detectAndMarkPrices();
}

function markPriceElement(textNode, originalText, currency, amount, index) {
  const parent = textNode.parentNode;

  // Skip if already processed
  if (parent.id && parent.id.includes("detected-price")) {
    return;
  }

  // Skip if element has id="currency-converter-popup-selection" or is a parent of it
  if (
    parent.id === "currency-converter-popup-selection" ||
    parent.querySelector("#currency-converter-popup-selection")
  ) {
    return;
  }

  // Get the first currency in the list along with formatting preferences
  chrome.storage.local.get(
    ["currencyOrder", "currencyData", "fiatDecimals", "cryptoDecimals", "numberFormat"],
    (result) => {
      if (!result.currencyOrder || result.currencyOrder.length === 0 || !result.currencyData) {
        // If no currencies are configured, just mark the price without conversion
        createPriceWrapper(textNode, originalText, parent);
        return;
      }

      // Update saved currencies with latest settings
      savedCurrencies.fiatDecimals = result.fiatDecimals ?? 2;
      savedCurrencies.cryptoDecimals = result.cryptoDecimals ?? 8;
      savedCurrencies.numberFormat = result.numberFormat ?? "comma-dot";

      const targetCurrency = result.currencyOrder[0];
      const rates = result.currencyData;
      const numericAmount = parseNumber(amount);

      // Check if this is the main currency (first in the order)
      // If it is, just highlight it without converting
      if (currency === targetCurrency) {
        // Create and apply the wrapper with original text (no conversion)
        createPriceWrapper(textNode, originalText, parent);
        return;
      }

      // Convert the amount to the first currency in the list
      const convertedValue = convertCurrency(numericAmount, currency, targetCurrency, rates);
      const formattedValue = formatNumber(convertedValue, targetCurrency);

      // Create the new text with converted value and currency name
      const newText = `${formattedValue} ${targetCurrency}`;

      // Create and apply the wrapper
      createPriceWrapper(textNode, newText, parent);
    }
  );
}

// Helper function to create the price wrapper
function createPriceWrapper(textNode, text, parent) {
  // Create a wrapper span
  const wrapper = document.createElement("span");
  wrapper.id = `detected-price`;
  wrapper.className = "detected-price";

  // Store the original text for restoration when in-page convert is turned off
  wrapper.dataset.originalText = textNode.textContent;

  // Add title attribute to show original price on hover
  wrapper.title = `💲Original price: ${textNode.textContent}`;
  wrapper.style.cursor = `help`;

  // Copy all attributes from parent if it's a simple element
  if (parent.nodeType === Node.ELEMENT_NODE && parent.childNodes.length === 1) {
    Array.from(parent.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();

      // Skip any attribute name that starts with margin, padding, or background
      const isExcludedName = name.startsWith("margin") || name.startsWith("padding") || name.startsWith("background");

      // Special handling for 'style' attribute
      if (name === "style") {
        // Filter out forbidden CSS properties from inline styles
        const filteredStyle = attr.value
          .split(";")
          .map((s) => s.trim())
          .filter(
            (s) => s && !/^margin/i.test(s) && !/^padding/i.test(s) && !/^background/i.test(s) && !/^color/i.test(s)
          )
          .join("; ");

        if (filteredStyle) {
          wrapper.setAttribute("style", filteredStyle);
        }
        return; // skip rest
      }

      if (!isExcludedName && name !== "color") {
        wrapper.setAttribute(attr.name, attr.value);
      }
    });
  }

  wrapper.textContent = text;

  // Replace the text node with our wrapper
  parent.replaceChild(wrapper, textNode);
}

// Enhanced currency detection for in-page prices
function isCurrencyValue(text) {
  const trimmedText = text.trim();
  if (!trimmedText) return false;

  console.log("1.original text: ", trimmedText);

  // Build comprehensive lists of all currency symbols and representations
  const allCurrencySymbols = new Set();
  const allCurrencyRepresentationsSet = new Set();

  // Get all currency symbols from CURRENCY_SYMBOLS keys
  for (const symbol of Object.keys(CURRENCY_SYMBOLS)) {
    allCurrencySymbols.add(symbol);
    allCurrencySymbols.add(symbol.toUpperCase());
  }

  // Get all currency representations from CURRENCY_REPRESENTATIONS
  for (const representations of Object.values(CURRENCY_REPRESENTATIONS)) {
    for (const representation of representations) {
      allCurrencyRepresentationsSet.add(representation);
      allCurrencyRepresentationsSet.add(representation.toUpperCase());
    }
  }

  // Get all currency codes from CURRENCY_SYMBOLS values
  for (const currencyCodes of Object.values(CURRENCY_SYMBOLS)) {
    for (const currencyCode of currencyCodes) {
      allCurrencyRepresentationsSet.add(currencyCode);
      allCurrencyRepresentationsSet.add(currencyCode.toUpperCase());
    }
  }

  // Convert to arrays for easier processing
  const allCurrencySymbolsArray = Array.from(allCurrencySymbols);
  const allCurrencyRepresentationsArray = Array.from(allCurrencyRepresentationsSet);

  // VALIDATION 1: Check for adjacent separators or separator-currency issues
  const invalidPatterns = [
    /[.,]{2,}/, // Multiple separators in a row: "..", ",,", ".,", ",."
    /[.,]\s*[.,]/, // Separators with only whitespace between: ". ,", ", ."
    /[.,]$/, // Separator at the end: "1234.$", "1234.,"
    /^[.,]/, // Separator at the beginning: ".1234", ",1234"
    /[.,]\s*[$€£¥₹₩₽₺]/, // Separator followed by currency symbol: "1234.,$"
    /[$€£¥₹₩₽₺]\s*[.,]/, // Currency symbol followed by separator: "$.1234"
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmedText)) {
      console.log("2.invalid pattern detected:", pattern);
      return false;
    }
  }

  // VALIDATION 2: Check for separator next to currency representations
  for (const representation of allCurrencyRepresentationsArray) {
    const escapedRep = representation.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const repWithSeparatorPatterns = [
      new RegExp(`[.,]\\s*${escapedRep}`), // Separator before currency: "1234.,USD"
      new RegExp(`${escapedRep}\\s*[.,]`), // Currency before separator: "USD.1234"
    ];

    for (const pattern of repWithSeparatorPatterns) {
      if (pattern.test(trimmedText)) {
        console.log("3.invalid currency-separator pattern:", pattern);
        return false;
      }
    }
  }

  // Extract currency symbol/representation and number parts
  let currencyPart = "";
  let numberPart = trimmedText;
  let currencyPosition = ""; // 'prefix', 'suffix', or ''

  // First, check for prefix currency symbols
  for (const symbol of allCurrencySymbolsArray) {
    if (trimmedText.startsWith(symbol)) {
      currencyPart = symbol;
      numberPart = trimmedText.slice(symbol.length).trim();
      currencyPosition = "prefix";
      break;
    }
  }

  // If no prefix symbol found, check for prefix currency representations
  if (!currencyPart) {
    // Sort by length (longest first) to avoid partial matches
    const sortedRepresentations = [...allCurrencyRepresentationsArray].sort((a, b) => b.length - a.length);

    for (const representation of sortedRepresentations) {
      const upperRepresentation = representation.toUpperCase();
      const upperText = trimmedText.toUpperCase();

      if (upperText.startsWith(upperRepresentation)) {
        // Check if there's a number after the currency representation
        const remainingText = trimmedText.slice(representation.length).trim();
        const numberMatch = remainingText.match(/^[\d.,\s]/);

        if (numberMatch) {
          currencyPart = representation;
          numberPart = remainingText;
          currencyPosition = "prefix";
          break;
        }
      }
    }
  }

  // If no prefix currency found, try to separate number from suffix currency
  if (!currencyPart) {
    // Match numbers with or without thousand separators
    const numberWithSeparatorsMatch = numberPart.match(/^[\d.,\s]+/);
    if (numberWithSeparatorsMatch) {
      const potentialNumber = numberWithSeparatorsMatch[0];
      const remainingText = numberPart.slice(potentialNumber.length).trim();

      if (remainingText) {
        // Check if remaining text is a valid currency
        const upperRemaining = remainingText.toUpperCase();
        let isValidSuffixCurrency = false;

        // Check against all currency representations and symbols
        if (allCurrencyRepresentationsSet.has(upperRemaining) || allCurrencySymbols.has(upperRemaining)) {
          numberPart = potentialNumber;
          currencyPart = remainingText;
          currencyPosition = "suffix";
        }
      }
    }
  }

  console.log("4.number part: ", numberPart);
  console.log("5.currency part: ", currencyPart);
  console.log("6.currency position: ", currencyPosition);

  // VALIDATION 3: Check number part for invalid separator patterns
  const numberWithSeparators = numberPart.trim();

  // Check for adjacent separators in number part
  if (/[.,]{2,}/.test(numberWithSeparators) || /[.,]\s*[.,]/.test(numberWithSeparators)) {
    console.log("7.adjacent separators in number part");
    return false;
  }

  // Check for separator at start/end of number part
  if (/^[.,]/.test(numberWithSeparators) || /[.,]$/.test(numberWithSeparators)) {
    console.log("8.separator at start/end of number part");
    return false;
  }

  // Basic validation - must contain at least one digit
  if (!/\d/.test(numberWithSeparators)) {
    console.log("9.no digits found in number part");
    return false;
  }

  // Check for invalid characters in number part
  if (/[^\d.,\s]/.test(numberWithSeparators)) {
    console.log("10.invalid characters in number part");
    return false;
  }

  // SEPARATE DECIMAL AND DIGIT GROUPS (thousand separators are optional)
  const lastCommaPos = numberWithSeparators.lastIndexOf(",");
  const lastDotPos = numberWithSeparators.lastIndexOf(".");
  const decimalSeparatorPos = Math.max(lastCommaPos, lastDotPos);

  let thousandDigitGroups = [];
  let decimalDigitGroups = [];

  if (decimalSeparatorPos > -1) {
    // We have a decimal part
    const decimalSeparator = numberWithSeparators[decimalSeparatorPos];

    // Split into integer and decimal parts
    const integerPart = numberWithSeparators.substring(0, decimalSeparatorPos);
    const decimalPart = numberWithSeparators.substring(decimalSeparatorPos + 1);

    console.log("11.integer part: ", integerPart);
    console.log("12.decimal part: ", decimalPart);

    // Extract digit groups from integer part (thousand separators are optional)
    thousandDigitGroups = integerPart.split(/[.,\s]/).filter((group) => {
      return group.length > 0 && /^\d+$/.test(group);
    });

    // Extract decimal digit groups
    decimalDigitGroups = decimalPart.split(/[^\d]/).filter((group) => {
      return group.length > 0 && /^\d+$/.test(group);
    });

    console.log("13.thousand digit groups: ", thousandDigitGroups);
    console.log("14.decimal digit groups: ", decimalDigitGroups);

    // Validate decimal part (should be 1-3 digits typically)
    if (decimalDigitGroups.length > 1 || (decimalDigitGroups[0] && decimalDigitGroups[0].length > 3)) {
      console.log("15.invalid decimal format");
      return false;
    }

    // Validate thousand groups if separators are present
    if (thousandDigitGroups.length > 1) {
      for (let i = 0; i < thousandDigitGroups.length; i++) {
        const group = thousandDigitGroups[i];

        // First group can be 1-3 digits, subsequent groups should be exactly 3 digits
        if (i === 0) {
          if (group.length < 1 || group.length > 3) {
            console.log("16.invalid first thousand group size:", group.length);
            return false;
          }
        } else {
          if (group.length !== 3) {
            console.log("17.invalid thousand group size (not 3):", group.length);
            return false;
          }
        }
      }
    }
  } else {
    // No decimal part, extract digit groups (thousand separators are optional)
    thousandDigitGroups = numberWithSeparators.split(/[.,\s]/).filter((group) => {
      return group.length > 0 && /^\d+$/.test(group);
    });

    console.log("11.thousand digit groups (no decimal): ", thousandDigitGroups);

    // Validate thousand groups if separators are present
    if (thousandDigitGroups.length > 1) {
      for (let i = 0; i < thousandDigitGroups.length; i++) {
        const group = thousandDigitGroups[i];

        if (i === 0) {
          if (group.length < 1 || group.length > 3) {
            console.log("12.invalid first thousand group size:", group.length);
            return false;
          }
        } else {
          if (group.length !== 3) {
            console.log("13.invalid thousand group size (not 3):", group.length);
            return false;
          }
        }
      }
    }
  }

  // VALIDATION 4: Final check for separator-currency adjacency
  if (currencyPart) {
    const fullText = trimmedText.toUpperCase();
    const upperCurrency = currencyPart.toUpperCase();

    // Check if currency is adjacent to separators in the full text
    const currencyAdjacencyPatterns = [
      new RegExp(`[.,]\\s*${upperCurrency.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
      new RegExp(`${upperCurrency.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*[.,]`),
    ];

    for (const pattern of currencyAdjacencyPatterns) {
      if (pattern.test(fullText)) {
        console.log("18.currency adjacent to separator in full text");
        return false;
      }
    }
  }

  // VALIDATE AT LEAST ONE DIGIT GROUP EXISTS
  if (thousandDigitGroups.length === 0 && decimalDigitGroups.length === 0) {
    console.log("19.no valid digit groups found");
    return false;
  }

  // BUILD CLEAN NUMBER FOR PARSING
  let cleanNumber = "";

  // Reconstruct integer part (join all thousand groups)
  if (thousandDigitGroups.length > 0) {
    cleanNumber = thousandDigitGroups.join("");
  } else if (decimalDigitGroups.length > 0) {
    // Handle case like ".50" - assume 0 before decimal
    cleanNumber = "0";
  }

  // Add decimal part if exists
  if (decimalDigitGroups.length > 0) {
    cleanNumber += "." + decimalDigitGroups[0];
  }

  console.log("20.clean number: ", cleanNumber);

  // Validate it's a proper number
  const price = parseFloat(cleanNumber);
  if (isNaN(price)) {
    console.log("21.invalid number");
    return false;
  }

  console.log("21.parsed price: ", price);

  // FINAL CURRENCY VALIDATION
  const upperCurrency = currencyPart.toUpperCase().trim();
  console.log("22.currency part upper: ", upperCurrency);

  if (!upperCurrency) {
    console.log("23.no currency part found");
    return false;
  }

  // Check if the currency part matches any known representation
  let isCurrency = allCurrencyRepresentationsSet.has(upperCurrency) || allCurrencySymbols.has(upperCurrency);

  console.log("24.final result: ", isCurrency);
  return isCurrency;
}

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

// Initialize price detection when the page loads and when changes occur
function initializePriceDetection() {
  // Check storage for the setting
  chrome.storage.local.get(["pageConvert"], (result) => {
    // Clean up any existing price elements first
    uninitializePriceDetection();
    console.log("pageConvert:", result.pageConvert);

    if (result.pageConvert) {
      // Initial detection
      setTimeout(detectAndMarkPrices, 500);

      // Observe DOM changes for dynamic content
      const observer = new MutationObserver((mutations) => {
        let shouldDetect = false;

        mutations.forEach((mutation) => {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            shouldDetect = true;
          }
        });

        if (shouldDetect) {
          setTimeout(detectAndMarkPrices, 500);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Re-detect when user interacts with the page
      const handlePageInteraction = () => {
        // Check if page conversion is still enabled before detecting
        chrome.storage.local.get(["pageConvert"], (result) => {
          if (result.pageConvert) {
            setTimeout(detectAndMarkPrices, 1000);
          }
        });
      };

      document.addEventListener("click", handlePageInteraction);
      window.addEventListener("scroll", handlePageInteraction);

      // Store the observer and handlers for later removal
      window.currencyConverterMutationObserver = observer;
      window.currencyConverterPageInteractionHandler = handlePageInteraction;
    }
  });
}

function uninitializePriceDetection() {
  // Remove all detected price elements
  const elements = document.querySelectorAll('.detected-price, [id*="detected-price"]');
  elements.forEach((element) => {
    const parent = element.parentElement;
    if (parent) {
      // Check if we have stored the original text
      const originalText = element.dataset.originalText;

      // Replace the detected price element with original text if available, otherwise current text
      const textNode = document.createTextNode(originalText || element.textContent);
      parent.replaceChild(textNode, element);

      // Normalize the parent to merge adjacent text nodes
      parent.normalize();
    }
  });

  // Disconnect any existing mutation observer
  if (window.currencyConverterMutationObserver) {
    window.currencyConverterMutationObserver.disconnect();
    window.currencyConverterMutationObserver = null;
  }

  // Remove the event listeners for page interactions
  if (window.currencyConverterPageInteractionHandler) {
    document.removeEventListener("click", window.currencyConverterPageInteractionHandler);
    window.removeEventListener("scroll", window.currencyConverterPageInteractionHandler);
    window.currencyConverterPageInteractionHandler = null;
  }

  // Remove the event listener for detected prices
  document.removeEventListener("click", handleDetectedPriceClick);
}

// Handler function for detected price clicks
function handleDetectedPriceClick(e) {
  if (e.target.classList.contains("detected-price")) {
    const priceText = e.target.textContent.trim();
    if (priceText) {
      // Show the conversion popup for this price
      lastSelectionValue = priceText;
      lastSelectionRect = e.target.getBoundingClientRect();

      const popup = document.getElementById(POPUP_ID);
      showSelectionView(popup, priceText);
      popup.style.display = "flex";
      updatePopupPosition(popup);
      isActive = true;

      e.stopPropagation();
    }
  }
}

// ===== MAIN APPLICATION =====
function initialize() {
  // Check the checkbox state before creating the popup
  chrome.storage.local.get(["checkboxState", "pageConvert"], (result) => {
    // Explicitly check for true/false/undefined
    const isEnabled = result.checkboxState === true;

    if (!isEnabled) {
      return; // Exit if extension is disabled
    }

    // Initialize price detection if enabled
    if (result.pageConvert) {
      initializePriceDetection();
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

    // Click handler for popup
    popup.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
      if (currentMode === "selection" && lastSelectionValue) {
        showCurrenciesView(popup, lastSelectionValue);
      }
    });

    // Click handler for detected prices
    document.addEventListener("click", handleDetectedPriceClick);

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

    // Hide when clicking outside
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

      console.log("1.original text: ", trimmedText);

      // Build comprehensive lists of all currency symbols and representations
      const allCurrencySymbols = new Set();
      const allCurrencyRepresentationsSet = new Set();

      // Get all currency symbols from CURRENCY_SYMBOLS keys
      for (const symbol of Object.keys(CURRENCY_SYMBOLS)) {
        allCurrencySymbols.add(symbol);
        allCurrencySymbols.add(symbol.toUpperCase());
      }

      // Get all currency representations from CURRENCY_REPRESENTATIONS
      for (const representations of Object.values(CURRENCY_REPRESENTATIONS)) {
        for (const representation of representations) {
          allCurrencyRepresentationsSet.add(representation);
          allCurrencyRepresentationsSet.add(representation.toUpperCase());
        }
      }

      // Get all currency codes from CURRENCY_SYMBOLS values
      for (const currencyCodes of Object.values(CURRENCY_SYMBOLS)) {
        for (const currencyCode of currencyCodes) {
          allCurrencyRepresentationsSet.add(currencyCode);
          allCurrencyRepresentationsSet.add(currencyCode.toUpperCase());
        }
      }

      // Convert to arrays for easier processing
      const allCurrencySymbolsArray = Array.from(allCurrencySymbols);
      const allCurrencyRepresentationsArray = Array.from(allCurrencyRepresentationsSet);

      // VALIDATION 1: Check for adjacent separators or separator-currency issues
      const invalidPatterns = [
        /[.,]{2,}/, // Multiple separators in a row: "..", ",,", ".,", ",."
        /[.,]\s*[.,]/, // Separators with only whitespace between: ". ,", ", ."
        /[.,]$/, // Separator at the end: "1234.$", "1234.,"
        /^[.,]/, // Separator at the beginning: ".1234", ",1234"
        /[.,]\s*[$€£¥₹₩₽₺]/, // Separator followed by currency symbol: "1234.,$"
        /[$€£¥₹₩₽₺]\s*[.,]/, // Currency symbol followed by separator: "$.1234"
      ];

      for (const pattern of invalidPatterns) {
        if (pattern.test(trimmedText)) {
          console.log("2.invalid pattern detected:", pattern);
          return false;
        }
      }

      // VALIDATION 2: Check for separator next to currency representations
      for (const representation of allCurrencyRepresentationsArray) {
        const escapedRep = representation.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const repWithSeparatorPatterns = [
          new RegExp(`[.,]\\s*${escapedRep}`), // Separator before currency: "1234.,USD"
          new RegExp(`${escapedRep}\\s*[.,]`), // Currency before separator: "USD.1234"
        ];

        for (const pattern of repWithSeparatorPatterns) {
          if (pattern.test(trimmedText)) {
            console.log("3.invalid currency-separator pattern:", pattern);
            return false;
          }
        }
      }

      // Extract currency symbol/representation and number parts
      let currencyPart = "";
      let numberPart = trimmedText;
      let currencyPosition = ""; // 'prefix', 'suffix', or ''

      // First, check for prefix currency symbols
      for (const symbol of allCurrencySymbolsArray) {
        if (trimmedText.startsWith(symbol)) {
          currencyPart = symbol;
          numberPart = trimmedText.slice(symbol.length).trim();
          currencyPosition = "prefix";
          break;
        }
      }

      // If no prefix symbol found, check for prefix currency representations
      if (!currencyPart) {
        // Sort by length (longest first) to avoid partial matches
        const sortedRepresentations = [...allCurrencyRepresentationsArray].sort((a, b) => b.length - a.length);

        for (const representation of sortedRepresentations) {
          const upperRepresentation = representation.toUpperCase();
          const upperText = trimmedText.toUpperCase();

          if (upperText.startsWith(upperRepresentation)) {
            // Check if there's a number after the currency representation
            const remainingText = trimmedText.slice(representation.length).trim();
            const numberMatch = remainingText.match(/^[\d.,\s]/);

            if (numberMatch) {
              currencyPart = representation;
              numberPart = remainingText;
              currencyPosition = "prefix";
              break;
            }
          }
        }
      }

      // If no prefix currency found, try to separate number from suffix currency
      if (!currencyPart) {
        // Match numbers with or without thousand separators
        const numberWithSeparatorsMatch = numberPart.match(/^[\d.,\s]+/);
        if (numberWithSeparatorsMatch) {
          const potentialNumber = numberWithSeparatorsMatch[0];
          const remainingText = numberPart.slice(potentialNumber.length).trim();

          if (remainingText) {
            // Check if remaining text is a valid currency
            const upperRemaining = remainingText.toUpperCase();
            let isValidSuffixCurrency = false;

            // Check against all currency representations and symbols
            if (allCurrencyRepresentationsSet.has(upperRemaining) || allCurrencySymbols.has(upperRemaining)) {
              numberPart = potentialNumber;
              currencyPart = remainingText;
              currencyPosition = "suffix";
            }
          }
        }
      }

      console.log("4.number part: ", numberPart);
      console.log("5.currency part: ", currencyPart);
      console.log("6.currency position: ", currencyPosition);

      // VALIDATION 3: Check number part for invalid separator patterns
      const numberWithSeparators = numberPart.trim();

      // Check for adjacent separators in number part
      if (/[.,]{2,}/.test(numberWithSeparators) || /[.,]\s*[.,]/.test(numberWithSeparators)) {
        console.log("7.adjacent separators in number part");
        return false;
      }

      // Check for separator at start/end of number part
      if (/^[.,]/.test(numberWithSeparators) || /[.,]$/.test(numberWithSeparators)) {
        console.log("8.separator at start/end of number part");
        return false;
      }

      // Basic validation - must contain at least one digit
      if (!/\d/.test(numberWithSeparators)) {
        console.log("9.no digits found in number part");
        return false;
      }

      // Check for invalid characters in number part
      if (/[^\d.,\s]/.test(numberWithSeparators)) {
        console.log("10.invalid characters in number part");
        return false;
      }

      // SEPARATE DECIMAL AND DIGIT GROUPS (thousand separators are optional)
      const lastCommaPos = numberWithSeparators.lastIndexOf(",");
      const lastDotPos = numberWithSeparators.lastIndexOf(".");
      const decimalSeparatorPos = Math.max(lastCommaPos, lastDotPos);

      let thousandDigitGroups = [];
      let decimalDigitGroups = [];

      if (decimalSeparatorPos > -1) {
        // We have a decimal part
        const decimalSeparator = numberWithSeparators[decimalSeparatorPos];

        // Split into integer and decimal parts
        const integerPart = numberWithSeparators.substring(0, decimalSeparatorPos);
        const decimalPart = numberWithSeparators.substring(decimalSeparatorPos + 1);

        console.log("11.integer part: ", integerPart);
        console.log("12.decimal part: ", decimalPart);

        // Extract digit groups from integer part (thousand separators are optional)
        thousandDigitGroups = integerPart.split(/[.,\s]/).filter((group) => {
          return group.length > 0 && /^\d+$/.test(group);
        });

        // Extract decimal digit groups
        decimalDigitGroups = decimalPart.split(/[^\d]/).filter((group) => {
          return group.length > 0 && /^\d+$/.test(group);
        });

        console.log("13.thousand digit groups: ", thousandDigitGroups);
        console.log("14.decimal digit groups: ", decimalDigitGroups);

        // Validate decimal part (should be 1-3 digits typically)
        if (decimalDigitGroups.length > 1 || (decimalDigitGroups[0] && decimalDigitGroups[0].length > 3)) {
          console.log("15.invalid decimal format");
          return false;
        }

        // Validate thousand groups if separators are present
        if (thousandDigitGroups.length > 1) {
          for (let i = 0; i < thousandDigitGroups.length; i++) {
            const group = thousandDigitGroups[i];

            // First group can be 1-3 digits, subsequent groups should be exactly 3 digits
            if (i === 0) {
              if (group.length < 1 || group.length > 3) {
                console.log("16.invalid first thousand group size:", group.length);
                return false;
              }
            } else {
              if (group.length !== 3) {
                console.log("17.invalid thousand group size (not 3):", group.length);
                return false;
              }
            }
          }
        }
      } else {
        // No decimal part, extract digit groups (thousand separators are optional)
        thousandDigitGroups = numberWithSeparators.split(/[.,\s]/).filter((group) => {
          return group.length > 0 && /^\d+$/.test(group);
        });

        console.log("11.thousand digit groups (no decimal): ", thousandDigitGroups);

        // Validate thousand groups if separators are present
        if (thousandDigitGroups.length > 1) {
          for (let i = 0; i < thousandDigitGroups.length; i++) {
            const group = thousandDigitGroups[i];

            if (i === 0) {
              if (group.length < 1 || group.length > 3) {
                console.log("12.invalid first thousand group size:", group.length);
                return false;
              }
            } else {
              if (group.length !== 3) {
                console.log("13.invalid thousand group size (not 3):", group.length);
                return false;
              }
            }
          }
        }
      }

      // VALIDATION 4: Final check for separator-currency adjacency
      if (currencyPart) {
        const fullText = trimmedText.toUpperCase();
        const upperCurrency = currencyPart.toUpperCase();

        // Check if currency is adjacent to separators in the full text
        const currencyAdjacencyPatterns = [
          new RegExp(`[.,]\\s*${upperCurrency.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
          new RegExp(`${upperCurrency.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*[.,]`),
        ];

        for (const pattern of currencyAdjacencyPatterns) {
          if (pattern.test(fullText)) {
            console.log("18.currency adjacent to separator in full text");
            return false;
          }
        }
      }

      // VALIDATE AT LEAST ONE DIGIT GROUP EXISTS
      if (thousandDigitGroups.length === 0 && decimalDigitGroups.length === 0) {
        console.log("19.no valid digit groups found");
        return false;
      }

      // BUILD CLEAN NUMBER FOR PARSING
      let cleanNumber = "";

      // Reconstruct integer part (join all thousand groups)
      if (thousandDigitGroups.length > 0) {
        cleanNumber = thousandDigitGroups.join("");
      } else if (decimalDigitGroups.length > 0) {
        // Handle case like ".50" - assume 0 before decimal
        cleanNumber = "0";
      }

      // Add decimal part if exists
      if (decimalDigitGroups.length > 0) {
        cleanNumber += "." + decimalDigitGroups[0];
      }

      console.log("20.clean number: ", cleanNumber);

      // Validate it's a proper number
      const price = parseFloat(cleanNumber);
      if (isNaN(price)) {
        console.log("21.invalid number");
        return false;
      }

      console.log("21.parsed price: ", price);

      // FINAL CURRENCY VALIDATION
      const upperCurrency = currencyPart.toUpperCase().trim();
      console.log("22.currency part upper: ", upperCurrency);

      if (!upperCurrency) {
        console.log("23.no currency part found");
        return false;
      }

      // Check if the currency part matches any known representation
      let isCurrency = allCurrencyRepresentationsSet.has(upperCurrency) || allCurrencySymbols.has(upperCurrency);

      console.log("24.final result: ", isCurrency);
      return isCurrency;
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

      // 2. Handle pageConvert changes
      if (changes.pageConvert) {
        if (changes.pageConvert.newValue) {
          initializePriceDetection();
        } else {
          uninitializePriceDetection();
        }
      }

      // 3. Handle decimal precision changes
      if (changes.fiatDecimals || changes.cryptoDecimals) {
        if (changes.fiatDecimals) {
          savedCurrencies.fiatDecimals = changes.fiatDecimals.newValue;
        }
        if (changes.cryptoDecimals) {
          savedCurrencies.cryptoDecimals = changes.cryptoDecimals.newValue;
        }
        needsRefresh = true;

        // Refresh in-page converted prices if page conversion is enabled
        chrome.storage.local.get(["pageConvert"], (result) => {
          if (result.pageConvert) {
            // Immediately update existing price elements with new decimal settings
            updateExistingPriceElements();
          }
        });
      }

      // 4. Handle number format changes
      if (changes.numberFormat) {
        savedCurrencies.numberFormat = changes.numberFormat.newValue;
        needsRefresh = true;

        // Refresh in-page converted prices if page conversion is enabled
        chrome.storage.local.get(["pageConvert"], (result) => {
          if (result.pageConvert) {
            // Immediately update existing price elements with new format settings
            updateExistingPriceElements();
          }
        });
      }

      // 5. Handle currency data updates
      if (changes.currencyData) {
        savedCurrencies.currencyData = changes.currencyData.newValue;
        needsRefresh = true;
      }

      // 6. Handle currency order changes
      if (changes.currencyOrder) {
        savedCurrencies.currencyOrder = changes.currencyOrder.newValue;
        needsRefresh = true;

        // Refresh in-page converted prices if page conversion is enabled
        chrome.storage.local.get(["pageConvert"], (result) => {
          if (result.pageConvert) {
            // Immediately update existing price elements with new currency order
            updateExistingPriceElements();
            // Force re-detection of prices with new currency order
            setTimeout(detectAndMarkPrices, 100);
          }
        });
      }

      // 7. Handle convertTarget changes
      if (changes.convertTarget) {
        convertTarget = changes.convertTarget.newValue;
        needsRefresh = true;
      }

      // 8. Handle dark mode changes
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
