// ===== CONFIGURATION =====
const POPUP_ID = "currency-converter-popup";
const POPUP_DISTANCE = 20;

const CURRENCY_REPRESENTATIONS = {
  // Major currencies
  USD: [
    "USD",
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
  EUR: ["EUR", "Euro", "Euros"],
  GBP: ["GBP", "British Pound", "British Pounds", "Sterling", "Pound Sterling"],
  JPY: ["JPY", "Japanese Yen", "Yen"],
  CNY: ["CNY", "元", "Chinese Yuan", "Yuan", "Renminbi", "RMB"],

  AUD: ["AUD", "A$", "$A", "AU$", "$AU", "Australian Dollar", "Australian Dollars"],
  CAD: ["CAD", "CA$", "$CA", "CA Dollar", "CA Dollars", "Canadian Dollar", "Canadian Dollars"],
  CHF: ["CHF", "Fr.", "SFr.", "Swiss Franc", "Swiss Francs"],
  HKD: ["HKD", "HK$", "$HK", "HK Dollar", "HK Dollars", "Hong Kong Dollar", "Hong Kong Dollars"],
  NZD: ["NZD", "NZ$", "$NZ", "NZ Dollar", "NZ Dollars", "New Zealand Dollar", "New Zealand Dollars"],

  SEK: ["SEK", "Swedish Krona", "Swedish Kronor"],
  NOK: ["NOK", "Norwegian Krone", "Norwegian Kroner"],
  DKK: ["DKK", "Danish Krone", "Danish Kroner"],

  SGD: ["SGD", "S$", "$S", "Singapore Dollar", "Singapore Dollars"],
  MXN: ["MXN", "Mex$", "$Mex", "Mexican Peso", "Mexican Pesos"],
  BRL: ["BRL", "R$", "$R", "Brazilian Real", "Brazilian Reais", "Real", "Reais"],
  INR: ["INR", "Indian Rupee", "Indian Rupees", "Rupee", "Rupees"],
  RUB: ["RUB", "Russian Ruble", "Russian Rubles"],
  TRY: ["TRY", "TL", "Turkish Lira", "Turkish Liras", "Türk Lirası", "Türk Lirası", "Lira"],
  ZAR: [
    "ZAR",
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
  SAR: ["SAR", "Saudi Riyal", "Saudi Riyals"],
  AED: [
    "AED",
    "DH",
    "UAE Dirham",
    "UAE Dirhams",
    "United Arab Emirates Dirham",
    "United Arab Emirates Dirhams",
    "Emirati Dirham",
    "Emirati Dirhams",
  ],
  QAR: ["QAR", "Qatari Riyal", "Qatari Riyals"],

  // Asian currencies
  KRW: ["KRW", "South Korean Won", "S. Korean Won", "S.Korean Won", "Won"],
  THB: ["THB", "Thai Baht", "Baht"],
  VND: ["VND", "Vietnamese Dong", "Dong"],
  MYR: ["MYR", "RM", "Malaysian Ringgit", "Ringgit"],
  IDR: ["IDR", "Rp", "Indonesian Rupiah", "Rupiah"],
  PHP: ["PHP", "Philippine Peso", "Philippine Pesos"],
  TWD: ["TWD", "NT$", "$NT", "NT Dollar", "NT Dollars", "New Taiwan Dollar", "New Taiwan Dollars"],

  // Cryptocurrencies
  BTC: ["BTC", "Bitcoin"],

  // African currencies
  EGP: ["EGP", "E£", "LE", "Egyptian Pound", "Egyptian Pounds"],
  NGN: ["NGN", "N", "Nigerian Naira", "Nigerian Nairas"],
  KES: ["KES", "KSh", "Kenyan Shilling", "Kenyan Shillings"],

  PLN: ["PLN", "Polish Złoty", "Polish Złote"],
  CZK: ["CZK", "Kč", "Czech Koruna", "Czech Koruny"],
  HUF: ["HUF", "Ft", "Hungarian Forint", "Hungarian Forints"],

  ARS: ["ARS", "ARS$", "$ARS", "$AR", "AR$", "Argentine Peso", "Argentine Pesos"],
  CLP: ["CLP", "CLP$", "$CLP", "Chilean Peso", "Chilean Pesos"],
  COP: ["COP", "COL$", "$COL", "Colombian Peso", "Colombian Pesos"],
  PEN: ["PEN", "S/", "Peruvian Sol", "Peruvian Soles"],

  DZD: ["DZD", "Algerian Dinar", "Algerian Dinars"],
  MAD: ["MAD", "Moroccan Dirham", "Moroccan Dirhams"],
  TND: ["TND", "Tunisian Dinar", "Tunisian Dinars", "DT"],
  ZMW: ["ZMW", "ZK", "Zambian Kwacha", "Zambian Kwachas"],
  RWF: ["RWF", "FRw", "Rwandan Franc", "Rwandan Francs"],
  UGX: ["UGX", "USh", "Ugandan Shilling", "Ugandan Shillings"],
  SDG: ["SDG", "SD£", "Sudanese Pound", "Sudanese Pounds"],
  BWP: ["BWP", "Botswana Pula", "Botswana Pulas"],
  MGA: ["MGA", "Ar", "Malagasy Ariary", "Malagasy Ariaries"],
  MUR: ["MUR", "Mauritian Rupee", "Mauritian Rupees"],
  SCR: ["SCR", "Seychellois Rupee", "Seychellois Rupees"],
  GHS: ["GHS", "GH₵", "Ghanaian Cedi", "Ghanaian Cedis"],
  XOF: [
    "XOF",
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
  XAF: [
    "XAF",
    "Central African CFA Franc",
    "Central African CFA Francs",
    "Central African Franc",
    "Central African Francs",
  ],
  LSL: ["LSL", "Lesotho Loti", "Lesotho Maloti"],
  SZL: ["SZL", "Swazi Lilangeni", "Swazi Emalangeni"],

  MWK: ["MWK", "MK", "Malawian Kwacha", "Malawian Kwachas"],
  NAD: ["NAD", "N$", "$N", "Namibian Dollar", "Namibian Dollars"],
  SSP: [
    "SSP",
    "SS£",
    "South Sudanese Pound",
    "South Sudanese Pounds",
    "S. Sudanese Pound",
    "S. Sudanese Pounds",
    "S.Sudanese Pound",
    "S.Sudanese Pounds",
  ],
  TZS: ["TZS", "TSh", "Tanzanian Shilling", "Tanzanian Shillings"],
  BIF: ["BIF", "FBu", "Burundian Franc", "Burundian Francs"],
  BGN: ["BGN", "BGN", "Bulgarian Lev", "Bulgarian Leva"],

  BHD: ["BHD", "BD", "Bahraini Dinar", "Bahraini Dinars"],
  KWD: ["KWD", "KD", "Kuwaiti Dinar", "Kuwaiti Dinars"],
  OMR: ["OMR", "Omani Rial", "Omani Rials"],
  JOD: ["JOD", "Jordanian Dinar", "Jordanian Dinars"],
  IQD: ["IQD", "Iraqi Dinar", "Iraqi Dinars"],
  IRR: ["IRR", "Iranian Rial", "Iranian Rials"],
  YER: ["YER", "Yemeni Rial", "Yemeni Rials"],
  AFN: ["AFN", "Afghan Afghani", "Afghan Afghanis"],
  PKR: ["PKR", "Pakistani Rupee", "Pakistani Rupees"],
  LKR: ["LKR", "Sri Lankan Rupee", "Sri Lankan Rupees"],

  NPR: ["NPR", "Nepalese Rupee", "Nepalese Rupees"],
  UZS: ["UZS", "so'm", "Uzbekistani Som", "Uzbekistani Soms"],
  TMT: ["TMT", "Turkmenistani Manat", "Turkmenistani Manats"],
  TJS: ["TJS", "ЅМ", "Tajikistani Somoni", "Tajikistani Somonis"],
  KGS: ["KGS", "сом", "Kyrgyzstani Som", "Kyrgyzstani Soms"],
  AZN: ["AZN", "Azerbaijani Manat", "Azerbaijani Manats"],
  GEL: ["GEL", "Georgian Lari", "Georgian Laris"],
  AMD: ["AMD", "Armenian Dram", "Armenian Drams"],
  MMK: ["MMK", "Burmese Kyat"],
  KHR: ["KHR", "Cambodian Riel", "Cambodian Riels"],
  LAK: ["LAK", "Lao Kip", "Lao Kips"],
  MOP: ["MOP", "MOP$", "$MOP", "Macanese Pataca", "Macanese Patacas"],
  BND: ["BND", "Brunei Dollar", "Brunei Dollars"],
  PGK: ["PGK", "Papua New Guinean Kina", "Papua New Guinean Kinas"],

  VUV: ["VUV", "Vt", "Vanuatu Vatu"],
  WST: ["WST", "WS$", "$WS", "Samoan Tala"],
  FJD: ["FJD", "FJ$", "$FJ", "Fijian Dollar", "Fijian Dollars"],
  TOP: ["TOP", "T$", "$T", "Tongan Paʻanga", "Tongan Paanga"],
  SBD: ["SBD", "SI$", "$SI", "Solomon Islands Dollar", "Solomon Islands Dollars"],
  XPF: ["XPF", "CFP Franc", "CFP Francs"],

  RON: ["RON", "lei", "Romanian Leu", "Romanian Lei"],
  RSD: ["RSD", "дин.", "Serbian Dinar", "Serbian Dinars"],
  MKD: ["MKD", "ден", "Macedonian Denar", "Macedonian Denars"],
  ISK: ["ISK", "Icelandic Króna", "Icelandic Krónur"],
  UAH: ["UAH", "Ukrainian Hryvnia", "Ukrainian Hryvnias"],
  BYN: ["BYN", "Br", "Belarusian Ruble", "Belarusian Rubles"],
  MDL: ["MDL", "Moldovan Leu", "Moldovan Lei"],
  BAM: [
    "BAM",
    "KM",
    "Bosnia and Herzegovina Convertible Mark",
    "Bosnia & Herzegovina Convertible Mark",
    "Bosnia-Herzegovina Convertible Mark",
    "Bosnia-Herzegovina Convertible Marka",
    "Convertible Marks",
  ],
  HRK: ["HRK", "kn", "Croatian Kuna", "Croatian Kunas"],

  // Caribbean and Latin America
  DOP: ["DOP", "RD$", "$RD", "Dominican Peso", "Dominican Pesos"],
  GTQ: ["GTQ", "Q", "Guatemalan Quetzal", "Guatemalan Quetzales"],
  HNL: ["HNL", "L.", "Honduran Lempira", "Honduran Lempiras"],
  NIO: ["NIO", "Nicaraguan Córdoba"],
  BZD: ["BZD", "BZ$", "$BZ", "Belize Dollar", "Belize Dollars"],
  BSD: ["BSD", "BSD$", "$BSD", "Bahamian Dollar", "Bahamian Dollars"],
  TTD: [
    "TTD",
    "TT$",
    "$TT",
    "Trinidad and Tobago Dollar",
    "Trinidad & Tobago Dollar",
    "Trinidad & Tobago Dollars",
    "Trinidad and Tobago Dollars",
  ],
  UYU: ["UYU", "$U", "U$", "Uruguayan Peso", "Uruguayan Pesos"],
  PYG: ["PYG", "Gs.", "Paraguayan Guaraní"],
  BOB: ["BOB", "Bolivian Boliviano", "Bolivian Bolivianos"],
  VEF: ["VEF", "Bs.F", "Venezuelan Bolívar (old)", "Old Venezuelan Bolívar"],
  VES: ["VES", "Bs.S", "Venezuelan Bolívar", "Venezuelan Bolívars"],

  // Special Drawing Rights and metals
  XDR: ["XDR", "SDR", "Special Drawing Rights"],
  XAG: ["XAG", "Silver"],
  XAU: ["XAU", "Gold"],
  XPT: ["XPT", "Platinum"],
  XPD: ["XPD", "Palladium"],

  ZWL: ["ZWL", "Z$", "$Z", "Zimbabwean Dollar", "Zimbabwean Dollars"],
  BBD: ["BBD", "Bds$", "$Bds", "Barbadian Dollar", "Barbadian Dollars"],
  XCD: [
    "XCD",
    "EC$",
    "$EC",
    "East Caribbean Dollar",
    "East Caribbean Dollars",
    "E. Caribbean Dollar",
    "E. Caribbean Dollars",
    "E.Caribbean Dollar",
    "E.Caribbean Dollars",
  ],
  XCG: ["XCG", "Caribbean guilder", "Caribbean guilders", "CG"],
  LRD: ["LRD", "L$", "$L", "Liberian Dollar", "Liberian Dollars"],
  SRD: ["SRD", "SR$", "$SR", "Surinamese Dollar", "Surinamese Dollars"],
  GYD: ["GYD", "G$", "$G", "Guyanese Dollar", "Guyanese Dollars"],
  KYD: ["KYD", "KY$", "$KY", "Cayman Islands Dollar", "Cayman Islands Dollars"],
  JMD: ["JMD", "J$", "$J", "Jamaican Dollar", "Jamaican Dollars"],
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
  Pound: ["GBP", "EGP", "LBP", "SYP", "FKP", "GIP", "SDG", "SSP"],
  Pounds: ["GBP", "EGP", "LBP", "SYP", "FKP", "GIP", "SDG", "SSP"],
  krone: ["NOK", "DKK"], // Norway, Denmark
  kroner: ["NOK", "DKK"], // plural
  krona: ["SEK"], // Sweden
  kronor: ["SEK"], // plural
  króna: ["ISK"], // Iceland
  krónur: ["ISK"], // plural
  ruble: ["RUB", "BYN"],
  rubles: ["RUB", "BYN"],
  peso: ["MXN", "PHP", "ARS", "CLP", "COP", "DOP", "UYU"],
  pesos: ["MXN", "PHP", "ARS", "CLP", "COP", "DOP", "UYU"],
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
  دراهم: ["AED", "MAD"],
  درهم: ["AED", "MAD"],
  Dirham: ["AED", "MAD"],
  Dirhams: ["AED", "MAD"],
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
  Franc: ["CHF", "XPF", "XOF", "XAF", "CDF", "RWF", "BIF", "DJF", "GNF", "KMF", "MGA"],
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
  XCG: "sx",
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

// Create reverse mapping for country code to currency
const countryToCurrency = {};
Object.entries(currencyToCountry).forEach(([currency, country]) => {
  if (!countryToCurrency[country]) {
    countryToCurrency[country] = [];
  }
  countryToCurrency[country].push(currency);
});

// Helper function to check if a symbol is ambiguous (represents multiple currencies)
function isAmbiguousSymbol(symbol) {
  return CURRENCY_SYMBOLS[symbol] && CURRENCY_SYMBOLS[symbol].length > 1;
}

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
  const fiatDecimalsValue = savedCurrencies.fiatDecimals ?? 2;
  const cryptoDecimals = savedCurrencies.cryptoDecimals ?? 8;
  const [thousandOpt, decimalOpt] = (savedCurrencies.numberFormat ?? "comma-dot").split("-");

  const isCrypto = ["BTC", "ETH", "XRP"].includes(currency);
  let decimals;

  if (isCrypto) {
    decimals = parseInt(cryptoDecimals);
  } else if (fiatDecimalsValue === "currency-dependant") {
    try {
      decimals = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).resolvedOptions().maximumFractionDigits;
    } catch (e) {
      decimals = 2; // Default fallback
    }
  } else {
    decimals = parseInt(fiatDecimalsValue);
  }

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

function parseNumber(text, skipCurrencyDetection = false) {
  if (!text) return null;
  const numberMatch = text.match(/[\d ,.]+/);
  if (!numberMatch) return null;
  const originalText = numberMatch[0];

  // Check if the number starts or ends with a separator (comma or dot)
  if (/^[,\.]|[,\.]$/.test(originalText)) {
    return null;
  }

  // Check if there are two separators next to each other
  if (/[,\.]{2,}/.test(originalText)) {
    return null;
  }

  // Check for spaces between separators and digits (invalid)
  if (/[,\.]\s+|\s+[,\.]/.test(originalText)) {
    return null;
  }

  const cleanText = originalText.replace(/\s+/g, "");

  // Count the number of commas and dots
  const commaCount = (cleanText.match(/,/g) || []).length;
  const dotCount = (cleanText.match(/\./g) || []).length;

  // Helper function to validate thousand separator format
  function isValidThousandSeparatorFormat(text, separator) {
    const parts = text.split(separator);

    // First part can be 1-3 digits
    if (!/^\d{1,3}$/.test(parts[0])) {
      return false;
    }

    // All subsequent parts must be exactly 3 digits
    for (let i = 1; i < parts.length; i++) {
      if (!/^\d{3}$/.test(parts[i])) {
        return false;
      }
    }

    return true;
  }

  // Define currencies that use 3 decimal places with ALL their representations
  const threeDecimalCurrencies = {
    TND: ["TND", "د.ت", "د.ت.", "DT", "Tunisian Dinar", "Tunisian Dinars", "Dinar", "Dinars", "دينار", "دينارات"],
    KWD: ["KWD", "د.ك", "د.ك.", "KD", "Kuwaiti Dinar", "Kuwaiti Dinars", "دينار", "دينارات"],
    BHD: ["BHD", "د.ب", "د.ب.", "BD", "Bahraini Dinar", "Bahraini Dinars", "دينار", "دينارات"],
    OMR: ["OMR", "ر.ع", "ر.ع.", "Omani Rial", "Omani Rials", "Rial", "Riyal", "Riyals", "ريال", "ريالات"],
    JOD: ["JOD", "د.ا", "د.ا.", "JD", "Jordanian Dinar", "Jordanian Dinars", "دينار", "دينارات"],
    IQD: ["IQD", "د.ع", "د.ع.", "IQD", "Iraqi Dinar", "Iraqi Dinars", "دينار", "دينارات"],
    LYD: ["LYD", "LD", "Libyan Dinar", "Libyan Dinars", "دينار", "دينارات"],
  };

  // Helper function to check if detected currency is a 3-decimal currency
  function isThreeDecimalCurrency(currencyCode) {
    if (!currencyCode) return false;

    // Check if the currency code itself is in our list
    if (threeDecimalCurrencies[currencyCode]) {
      return true;
    }

    // Check all representations to see if any match the detected currency
    for (const [code, representations] of Object.entries(threeDecimalCurrencies)) {
      if (representations.includes(currencyCode)) {
        return true;
      }
    }

    return false;
  }

  // Only detect currency if we need it for 3-decimal logic AND we're not already in a currency detection
  let detectedCurrency = null;
  if (!skipCurrencyDetection) {
    // We only need currency detection for the specific case of 3 digits after a single separator
    const needsCurrencyDetection =
      (commaCount === 1 && cleanText.split(",")[1]?.length === 3) ||
      (dotCount === 1 && cleanText.split(".")[1]?.length === 3);

    if (needsCurrencyDetection) {
      detectedCurrency = detectCurrency(text);
    }
  }

  // Handle European format: dot as thousand separator, comma as decimal (1.234.567,89)
  if (dotCount >= 1 && commaCount === 1) {
    const lastCommaIndex = cleanText.lastIndexOf(",");
    const lastDotIndex = cleanText.lastIndexOf(".");

    // Comma should be the last separator for European format
    if (lastCommaIndex > lastDotIndex) {
      const integerWithSeparators = cleanText.substring(0, lastCommaIndex);
      const decimalPart = cleanText.substring(lastCommaIndex + 1);

      // Check if the integer part has proper thousand separators
      if (isValidThousandSeparatorFormat(integerWithSeparators, ".")) {
        const integerPart = integerWithSeparators.replace(/\./g, "");
        return parseFloat(integerPart + "." + decimalPart);
      }
    }
  }

  // Handle American format: comma as thousand separator, dot as decimal (1,234,567.89)
  if (commaCount >= 1 && dotCount === 1) {
    const lastCommaIndex = cleanText.lastIndexOf(",");
    const lastDotIndex = cleanText.lastIndexOf(".");

    // Dot should be the last separator for American format
    if (lastDotIndex > lastCommaIndex) {
      const integerWithSeparators = cleanText.substring(0, lastDotIndex);
      const decimalPart = cleanText.substring(lastDotIndex + 1);

      // Check if the integer part has proper thousand separators
      if (isValidThousandSeparatorFormat(integerWithSeparators, ",")) {
        const integerPart = integerWithSeparators.replace(/,/g, "");
        return parseFloat(integerPart + "." + decimalPart);
      }
    }
  }

  // Handle cases with only commas (no dots) - could be thousand separators or decimal
  if (commaCount > 0 && dotCount === 0) {
    // If there's only one comma, we need to determine if it's a decimal or thousand separator
    if (commaCount === 1) {
      const parts = cleanText.split(",");

      // Check if we have 3 digits after the comma
      if (parts.length === 2 && parts[1].length === 3) {
        // Check if the detected currency is one that uses 3 decimal places
        if (detectedCurrency && isThreeDecimalCurrency(detectedCurrency.currency)) {
          // This is a decimal separator for currencies with 3 decimal places
          return parseFloat(parts[0] + "." + parts[1]);
        } else {
          // This is likely a thousand separator (e.g., 1,234)
          // Validate it's a proper thousand separator format
          if (isValidThousandSeparatorFormat(cleanText, ",")) {
            return parseFloat(cleanText.replace(/,/g, ""));
          }
        }
      }
      // Heuristic: if the part after comma is 2 digits, it's likely a decimal (e.g., 1,23)
      else if (parts.length === 2 && parts[1].length === 2) {
        return parseFloat(parts[0] + "." + parts[1]); // Decimal separator
      }
      // Otherwise, check if it's a valid thousand separator format
      else if (isValidThousandSeparatorFormat(cleanText, ",")) {
        return parseFloat(cleanText.replace(/,/g, ""));
      }
    } else {
      // Multiple commas - must be thousand separators
      if (isValidThousandSeparatorFormat(cleanText, ",")) {
        return parseFloat(cleanText.replace(/,/g, ""));
      }
    }
  }

  // Handle cases with only dots (no commas) - could be thousand separators or decimal
  if (dotCount > 0 && commaCount === 0) {
    // If there's only one dot, check if it's likely decimal or thousand
    if (dotCount === 1) {
      const parts = cleanText.split(".");

      // Check if we have 3 digits after the dot
      if (parts.length === 2 && parts[1].length === 3) {
        // Check if the detected currency is one that uses 3 decimal places
        if (detectedCurrency && isThreeDecimalCurrency(detectedCurrency.currency)) {
          // This is a decimal separator for currencies with 3 decimal places
          return parseFloat(cleanText); // Dot is already decimal separator
        } else {
          // This is likely a thousand separator (e.g., 1.234)
          // Validate it's a proper thousand separator format
          if (isValidThousandSeparatorFormat(cleanText, ".")) {
            return parseFloat(cleanText.replace(/\./g, ""));
          }
        }
      }
      // If part after dot has 2 digits, likely decimal (American)
      else if (parts.length === 2 && parts[1].length === 2) {
        return parseFloat(cleanText);
      }
      // Otherwise, check if it's a valid thousand separator format
      else if (isValidThousandSeparatorFormat(cleanText, ".")) {
        return parseFloat(cleanText.replace(/\./g, ""));
      }
    } else {
      // Multiple dots - must be thousand separators (European)
      if (isValidThousandSeparatorFormat(cleanText, ".")) {
        return parseFloat(cleanText.replace(/\./g, ""));
      }
    }
  }

  // If there are both commas and dots but don't match the European/American patterns above
  if (commaCount > 0 && dotCount > 0) {
    return null; // Ambiguous format (like 1.234.56 or 1,234,56)
  }

  // No separators, just a plain number
  if (commaCount === 0 && dotCount === 0) {
    return parseFloat(cleanText);
  }

  return null; // If we get here, the format is invalid
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
    const flagPath = `icons/flags/${countryCode}.svg`;
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

// function detectCurrency(text) {
//   const trimmedText = text.trim();
//   if (!trimmedText) return { currency: "", amount: "", type: "invalid" };

//   // 1. Extract Number
//   // We need to find the number part. There might be multiple numbers if the text is invalid,
//   // but we are looking for a single valid number.
//   // The regex matches a number with optional thousand separators and decimal part.
//   // It allows for space, comma, dot as separators.
//   const numberMatches = trimmedText.match(/\d[\d,. ]*/g);

//   if (!numberMatches || numberMatches.length === 0) {
//     return { currency: "", amount: "", type: "invalid" };
//   }

//   // If multiple number-like sequences are found, we need to be careful.
//   // The user requirement says "NUM" is a single entity in the pattern.
//   // If we have "100 200", it's likely invalid or two prices.
//   // For now, let's assume we focus on the longest valid number or the first one?
//   // The previous logic rejected if > 1 match. Let's stick to that for strictness,
//   // BUT "1,000.00" matches as one. "1 000" matches as one.
//   // "100 USD 200" would match as two.
//   if (numberMatches.length > 1) {
//     return { currency: "", amount: "", type: "invalid" };
//   }

//   const amountPart = numberMatches[0].trim();
//   const parsedNumber = parseNumberWithFormatDetection(amountPart);

//   if (parsedNumber === null || isNaN(parsedNumber)) {
//     return { currency: "", amount: "", type: "invalid" };
//   }

//   // 2. Split String
//   const numberIndex = trimmedText.indexOf(amountPart);
//   if (numberIndex === -1) return { currency: "", amount: "", type: "invalid" }; // Should not happen

//   const leftPart = trimmedText.substring(0, numberIndex).trim();
//   const rightPart = trimmedText.substring(numberIndex + amountPart.length).trim();

//   // 3. Tokenize Parts
//   const leftTokens = tokenize(leftPart);
//   const rightTokens = tokenize(rightPart);

//   if (leftTokens === null || rightTokens === null) {
//     // Tokenization failed (contains invalid characters)
//     return { currency: "", amount: "", type: "invalid" };
//   }

//   // 4. Validate Pattern
//   // We have 16 valid patterns.
//   // We can represent the pattern as a sequence of token types.
//   // Left tokens + [NUM] + Right tokens.

//   const patternSignature = [...leftTokens.map((t) => t.type), "NUM", ...rightTokens.map((t) => t.type)].join(" ");

//   const validPatterns = [
//     "symbol NUM",
//     "NUM symbol",
//     "rep NUM",
//     "NUM rep",
//     "NUM symbol rep",
//     "NUM rep symbol",
//     "NUM symbol cc",
//     "NUM cc symbol",
//     "symbol rep NUM",
//     "rep symbol NUM",
//     "symbol cc NUM",
//     "cc symbol NUM",
//     "symbol NUM rep",
//     "rep NUM symbol",
//     "symbol NUM cc",
//     "cc NUM symbol",
//   ];

//   if (!validPatterns.includes(patternSignature)) {
//     return { currency: "", amount: "", type: "invalid" };
//   }

//   // 5. Consistency Check with special handling for symbol-code conflicts
//   const allTokens = [...leftTokens, ...rightTokens];
//   let possibleCurrencies = null; // Start with null (meaning all) or handle first item

//   // Check for symbol-code conflicts first
//   const symbolToken = allTokens.find((t) => t.type === "symbol");
//   const codeToken = allTokens.find((t) => t.type === "cc" || t.type === "rep");

//   if (symbolToken && codeToken) {
//     // Check for specific symbol-code conflicts
//     const symbol = symbolToken.value;
//     const code = codeToken.currency;

//     // Check if symbol and code are mismatched
//     // Only flag as invalid for the most specific symbol-code pairs
//     // $ can be used with many currencies, so only reject if code is not in the list
//     if (symbol === '$' && !['USD', 'CAD', 'AUD', 'NZD', 'SGD', 'HKD', 'MXN', 'BRL', 'CLP', 'COP', 'ZWL', 'TTD', 'BSD', 'BZD', 'BBD', 'XCD', 'SBD', 'LRD', 'SRD', 'GYD', 'KYD', 'FJD', 'JMD', 'NAD'].includes(code)) {
//       return { currency: "", amount: "", type: "invalid" }; // Mismatched symbol and code
//     }

//     // For € and £, they are more specific
//     if ((symbol === '€' && code !== 'EUR') ||
//         (symbol === '£' && !['GBP', 'EGP', 'LBP', 'SYP', 'FKP', 'GIP', 'SDG', 'SSP'].includes(code))) {
//       return { currency: "", amount: "", type: "invalid" }; // Mismatched symbol and code
//     }
//   }

//   for (const token of allTokens) {
//     let tokenCurrencies = [];

//     if (token.type === "symbol") {
//       tokenCurrencies = token.currencies;
//     } else if (token.type === "rep") {
//       // Rep maps to a specific currency code
//       tokenCurrencies = [token.currency];
//     } else if (token.type === "cc") {
//       tokenCurrencies = [token.currency];
//     }

//     if (possibleCurrencies === null) {
//       possibleCurrencies = new Set(tokenCurrencies);
//     } else {
//       // Intersect
//       const newSet = new Set();
//       for (const c of tokenCurrencies) {
//         if (possibleCurrencies.has(c)) {
//           newSet.add(c);
//         }
//       }
//       possibleCurrencies = newSet;
//     }

//     if (possibleCurrencies.size === 0) {
//       return { currency: "", amount: "", type: "invalid" }; // Inconsistent
//     }
//   }

//   // If we have valid possible currencies, pick the first one (or best one)
//   const resultArray = Array.from(possibleCurrencies);

//   // If we have a specific currency (from rep or cc), it will be the only one (or few).
//   // If we only have symbol, we might have many.
//   // The original logic returned the first one from the symbol list.
//   // We should preserve the order from CURRENCY_SYMBOLS if possible, or just take the first.
//   // Since we intersected, the order might be lost if we used Set.
//   // But usually intersection with a single-item set results in that item.
//   // If we have only symbol, we want to respect the priority in CURRENCY_SYMBOLS.

//   // Let's re-evaluate the priority if we have multiple candidates.
//   // If we have "symbol", we have a list.
//   // If we have "rep" or "cc", we have a single one.
//   // So if size > 1, it must be from symbol only.
//   // In that case, we can look up the symbol again to get the ordered list?
//   // Or just trust the Set iteration order (which is insertion order usually).
//   // But let's be safe.

//   let selectedCurrency = resultArray[0];

//   // If we have a symbol token, let's try to use its priority list to pick the best match from our possible set
//   if (symbolToken && resultArray.length > 1) {
//     // Special case for $ symbol with CAD
//     if (symbolToken.value === '$' && possibleCurrencies.has('CAD')) {
//       selectedCurrency = 'CAD';
//     } else {
//       for (const c of symbolToken.currencies) {
//         if (possibleCurrencies.has(c)) {
//           selectedCurrency = c;
//           break;
//         }
//       }
//     }
//   }

//   return {
//     currency: selectedCurrency,
//     amount: amountPart,
//     type: "valid", // Or specific type if needed, but "valid" is enough for internal logic
//     possibleCurrencies: resultArray,
//   };
// }
function detectCurrency(text) {
  try {
    const trimmedText = text.trim();
    if (!trimmedText) return { currency: "", amount: "", type: "invalid" };

    const numberMatches = trimmedText.match(/\d[\d,. ]*/g);

    if (!numberMatches || numberMatches.length === 0) {
      return { currency: "", amount: "", type: "invalid" };
    }

    if (numberMatches.length > 1) {
      return { currency: "", amount: "", type: "invalid" };
    }

    const amountPart = numberMatches[0].trim();

    // Pass true to skipCurrencyDetection to prevent infinite recursion
    const parsedNumber = parseNumber(amountPart, true);

    if (parsedNumber === null || isNaN(parsedNumber)) {
      return { currency: "", amount: "", type: "invalid" };
    }

    // 2. Split String
    const numberIndex = trimmedText.indexOf(amountPart);
    if (numberIndex === -1) return { currency: "", amount: "", type: "invalid" }; // Should not happen

    const leftPart = trimmedText.substring(0, numberIndex).trim();
    const rightPart = trimmedText.substring(numberIndex + amountPart.length).trim();

    // 3. Tokenize Parts
    const leftTokens = tokenize(leftPart);
    const rightTokens = tokenize(rightPart);

    if (leftTokens === null || rightTokens === null) {
      // Tokenization failed (contains invalid characters)
      return { currency: "", amount: "", type: "invalid" };
    }

    const patternSignature = [...leftTokens.map((t) => t.type), "NUM", ...rightTokens.map((t) => t.type)].join(" ");

    const validPatterns = [
      "symbol NUM",
      "NUM symbol",
      "rep NUM",
      "NUM rep",
      "NUM symbol rep",
      "NUM rep symbol",
      "NUM symbol cc",
      "NUM cc symbol",
      "symbol rep NUM",
      "rep symbol NUM",
      "symbol cc NUM",
      "cc symbol NUM",
      "symbol NUM rep",
      "rep NUM symbol",
      "symbol NUM cc",
      "cc NUM symbol",
      // Country code patterns (only valid with symbols)
      "symbol NUM country",
      "NUM symbol country",
      "symbol country NUM",
      "country symbol NUM",
      "country NUM symbol",
      "NUM country symbol",
    ];

    if (!validPatterns.includes(patternSignature)) {
      return { currency: "", amount: "", type: "invalid" };
    }

    const allTokens = [...leftTokens, ...rightTokens];
    let possibleCurrencies = null;

    // Check for country code validation
    const countryToken = allTokens.find((t) => t.type === "country");
    const symbolToken = allTokens.find((t) => t.type === "symbol");
    const codeToken = allTokens.find((t) => t.type === "cc" || t.type === "rep");

    // Country codes can ONLY be used with symbols (not standalone)
    if (countryToken && !symbolToken) {
      // Country code without symbol is invalid
      return { currency: "", amount: "", type: "invalid" };
    }

    // Check for symbol-code conflicts
    if (symbolToken && codeToken) {
      // Check for specific symbol-code conflicts
      const symbol = symbolToken.value;
      const code = codeToken.currency;

      // Check if symbol and code are mismatched
      // Only flag as invalid for the most specific symbol-code pairs
      // $ can be used with many currencies, so only reject if code is not in the list
      if (
        symbol === "$" &&
        ![
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
          "SBD",
          "LRD",
          "SRD",
          "GYD",
          "KYD",
          "FJD",
          "JMD",
          "NAD",
        ].includes(code)
      ) {
        return { currency: "", amount: "", type: "invalid" }; // Mismatched symbol and code
      }

      // For € and £, they are more specific
      if (
        (symbol === "€" && code !== "EUR") ||
        (symbol === "£" && !["GBP", "EGP", "LBP", "SYP", "FKP", "GIP", "SDG", "SSP"].includes(code))
      ) {
        return { currency: "", amount: "", type: "invalid" }; // Mismatched symbol and code
      }
    }

    for (const token of allTokens) {
      let tokenCurrencies = [];
      if (token.type === "symbol") {
        tokenCurrencies = token.currencies;
      } else if (token.type === "rep") {
        tokenCurrencies = [token.currency];
      } else if (token.type === "cc") {
        tokenCurrencies = [token.currency];
      } else if (token.type === "country") {
        tokenCurrencies = token.currencies;
      }

      if (possibleCurrencies === null) {
        possibleCurrencies = new Set(tokenCurrencies);
      } else {
        const newSet = new Set();
        for (const c of tokenCurrencies) {
          if (possibleCurrencies.has(c)) {
            newSet.add(c);
          }
        }
        possibleCurrencies = newSet;
      }

      if (possibleCurrencies.size === 0) {
        return { currency: "", amount: "", type: "invalid" };
      }
    }

    const resultArray = Array.from(possibleCurrencies);
    let selectedCurrency = resultArray[0];

    if (symbolToken && resultArray.length > 1) {
      // FIXED: Prefer USD for $ symbol when available, otherwise use first match
      if (symbolToken.value === "$" && possibleCurrencies.has("USD")) {
        selectedCurrency = "USD";
      } else {
        // For other cases, use the first currency from the symbol's currency list that matches
        for (const c of symbolToken.currencies) {
          if (possibleCurrencies.has(c)) {
            selectedCurrency = c;
            break;
          }
        }
      }
    }

    return {
      currency: selectedCurrency,
      amount: amountPart,
      type: "valid",
      possibleCurrencies: resultArray,
    };
  } catch (error) {
    console.error("Error in detectCurrency:", error);
    return { currency: "", amount: "", type: "invalid" };
  }
}

function tokenize(text) {
  if (!text) return [];

  // Convert to uppercase for case-insensitive matching
  const upperText = text.toUpperCase();
  const tokens = [];
  let remaining = upperText;

  // Helper to check word boundary
  const isBoundaryValid = (match, remainingText) => {
    const lastChar = match.charAt(match.length - 1);
    // If the match ends in a letter/digit
    if (/[A-Z0-9]/.test(lastChar)) {
      // And the next character is also a letter/digit
      if (match.length < remainingText.length && /[A-Z0-9]/.test(remainingText.charAt(match.length))) {
        return false;
      }
    }
    return true;
  };

  while (remaining.length > 0) {
    // Try to match tokens at the beginning
    let matchFound = false;
    let longestMatch = null;
    let longestMatchType = null;
    let longestMatchData = null;

    // 1. Check Reps
    for (const [code, reps] of Object.entries(CURRENCY_REPRESENTATIONS)) {
      for (const rep of reps) {
        if (remaining.startsWith(rep.toUpperCase())) {
          // Check boundary
          if (!isBoundaryValid(rep.toUpperCase(), remaining)) continue;

          // Check if it's a longer match
          if (!longestMatch || rep.length > longestMatch.length) {
            longestMatch = rep;
            longestMatchType = "rep";
            longestMatchData = { currency: code };
          }
        }
      }
    }

    // 2. Check Symbols
    for (const [symbol, currencies] of Object.entries(CURRENCY_SYMBOLS)) {
      if (remaining.startsWith(symbol.toUpperCase())) {
        // Check boundary
        if (!isBoundaryValid(symbol.toUpperCase(), remaining)) continue;

        if (!longestMatch || symbol.length > longestMatch.length) {
          longestMatch = symbol;
          longestMatchType = "symbol";
          longestMatchData = { currencies: currencies };
        }
      }
    }

    // 3. Check Country Codes (2-letter) and Currency Codes (3-letter)
    // First check for 2-letter country codes
    if (remaining.length >= 2) {
      const potentialCountry = remaining.substring(0, 2).toLowerCase();
      if (countryToCurrency[potentialCountry]) {
        // This is a 2-letter country code
        if (isBoundaryValid(remaining.substring(0, 2), remaining)) {
          if (!longestMatch || 2 > longestMatch.length) {
            longestMatch = remaining.substring(0, 2);
            longestMatchType = "country";
            longestMatchData = { countryCode: potentialCountry, currencies: countryToCurrency[potentialCountry] };
          }
        }
      }
    }

    // Then check for 3-letter currency codes
    if (remaining.length >= 3) {
      const potentialCC = remaining.substring(0, 3).toUpperCase();
      if (currencyToCountry[potentialCC]) {
        if (isBoundaryValid(remaining.substring(0, 3), remaining)) {
          if (!longestMatch || 3 > longestMatch.length) {
            longestMatch = remaining.substring(0, 3);
            longestMatchType = "cc";
            longestMatchData = { currency: potentialCC };
          }
        }
      }
    }

    if (longestMatch) {
      tokens.push({
        type: longestMatchType,
        value: longestMatch,
        ...longestMatchData,
      });
      remaining = remaining.substring(longestMatch.length).trim(); // Consume and trim whitespace
      matchFound = true;
    } else {
      // No match found at start of string.
      // If it's whitespace, we should have trimmed it.
      // If it's garbage, then the pattern is invalid.
      return null;
    }
  }
  return tokens;
}

function parseThousandSeparatorCase(text) {
  const match = text.match(/^\d+[,.]\s*\d{3}/);
  if (match) {
    const matchedText = match[0];
    const separator = matchedText.includes(",") ? "," : ".";
    const fullMatch = text.match(/^\d+[,.]\s*\d{3}[,.]\s*\d+/);
    if (fullMatch) {
      const fullText = fullMatch[0];
      if (separator === ",") {
        return parseFloat(fullText.replace(/,/g, ""));
      } else {
        return parseFloat(fullText.replace(/\./g, "").replace(",", "."));
      }
    }
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

  // Check if the number starts or ends with a separator (comma or dot)
  if (/^[,\.]|[,\.]$/.test(originalText)) {
    return null;
  }

  // Check if there are two separators next to each other
  if (/[,\.]{2,}/.test(originalText)) {
    return null;
  }

  const cleanText = originalText.replace(/\s+/g, ""); // Remove all whitespace first

  // Special case for thousand separators like "1.000 $" or "1,000$"
  const thousandResult = parseThousandSeparatorCase(originalText);
  if (thousandResult !== null) {
    return thousandResult;
  }

  // Count the number of commas and dots
  const commaCount = (cleanText.match(/,/g) || []).length;
  const dotCount = (cleanText.match(/\./g) || []).length;

  // If there are both commas and dots, determine which is the decimal separator
  // The decimal separator should appear only once and should be at the end
  if (commaCount > 0 && dotCount > 0) {
    // Find the last occurrence of each separator
    const lastCommaIndex = cleanText.lastIndexOf(",");
    const lastDotIndex = cleanText.lastIndexOf(".");

    // The one that appears last is the decimal separator
    const decimalSep = lastCommaIndex > lastDotIndex ? "," : ".";
    const thousandSep = decimalSep === "," ? "." : ",";

    // Check if decimal separator appears only once
    if ((decimalSep === "," && commaCount !== 1) || (decimalSep === "." && dotCount !== 1)) {
      return null;
    }

    // Check if thousand separators are placed correctly (every 3 digits)
    const parts = cleanText.split(decimalSep);
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Check if thousand separators are correctly placed in the integer part
    if (thousandSep === ",") {
      if (!/^\d{1,3}(,\d{3})*$/.test(integerPart)) {
        return null;
      }
    } else {
      if (!/^\d{1,3}(\.\d{3})*$/.test(integerPart)) {
        return null;
      }
    }

    // Parse the number
    return parseFloat(integerPart.replace(new RegExp(thousandSep, "g"), "") + "." + decimalPart);
  }

  // If only commas or only dots
  if (commaCount > 0) {
    // If there's only one comma, it could be a decimal separator
    if (commaCount === 1) {
      // Check if it's at the end (decimal) or in the middle (thousand)
      const parts = cleanText.split(",");
      if (parts.length === 2 && parts[1].length <= 2) {
        // Likely a decimal separator
        return parseFloat(cleanText.replace(",", "."));
      } else {
        // Likely thousand separators
        if (!/^\d{1,3}(,\d{3})*$/.test(cleanText)) {
          return null;
        }
        return parseFloat(cleanText.replace(/,/g, ""));
      }
    } else {
      // Multiple commas, must be thousand separators
      if (!/^\d{1,3}(,\d{3})*$/.test(cleanText)) {
        return null;
      }
      return parseFloat(cleanText.replace(/,/g, ""));
    }
  }

  if (dotCount > 0) {
    // If there's only one dot, it could be a decimal separator
    if (dotCount === 1) {
      // Check if it's at the end (decimal) or in the middle (thousand)
      const parts = cleanText.split(".");
      if (parts.length === 2 && parts[1].length <= 2) {
        // Likely a decimal separator
        return parseFloat(cleanText);
      } else {
        // Likely thousand separators
        if (!/^\d{1,3}(\.\d{3})*$/.test(cleanText)) {
          return null;
        }
        return parseFloat(cleanText.replace(/\./g, ""));
      }
    } else {
      // Multiple dots, must be thousand separators
      if (!/^\d{1,3}(\.\d{3})*$/.test(cleanText)) {
        return null;
      }
      return parseFloat(cleanText.replace(/\./g, ""));
    }
  }

  // No separators, just a plain number
  return parseFloat(cleanText);
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
 * Helper function to check if page should be converted
 */
function shouldConvertPage(url) {
  const settings = window.currencyConverterSettings || { filterMode: "blacklist", whitelist: [], blacklist: [] };
  const { filterMode, whitelist, blacklist } = settings;

  if (filterMode === "whitelist") {
    return whitelist && whitelist.some((site) => url.includes(site));
  } else {
    // Blacklist mode (default)
    if (blacklist && blacklist.some((site) => url.includes(site))) {
      return false;
    }
    return true;
  }
}

// class PriceDetector {
//   constructor() {
//     this.processedElements = new Set();
//     this.currencyCache = new Map();
//     this.isProcessing = false;
//     this.pendingDetection = false;
//     this.MAX_ELEMENTS = 1000;
//     this.detectionTimeout = null;

//     // Initialize regexes
//     this.generateRegexes();
//   }

//   /**
//    * Generate regexes from currency data
//    */
//   generateRegexes() {
//     const currencyTerms = new Set();
//     const symbolTerms = new Set();

//     // Process CURRENCY_REPRESENTATIONS (all are currency terms)
//     Object.values(CURRENCY_REPRESENTATIONS).forEach(reps => {
//       reps.forEach(rep => currencyTerms.add(rep));
//     });

//     // Process CURRENCY_SYMBOLS
//     Object.keys(CURRENCY_SYMBOLS).forEach(key => {
//       // If it contains letters and is at least 2 chars long, treat as currency word
//       if (/[a-zA-Z]/.test(key) && key.length >= 2) {
//         currencyTerms.add(key);
//       } else {
//         // Otherwise treat as symbol
//         symbolTerms.add(key);
//       }
//     });

//     // Helper to escape and join terms
//     const createRegex = (terms) => {
//       const escaped = Array.from(terms)
//         .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
//         .sort((a, b) => b.length - a.length);
//       return new RegExp(escaped.join('|'));
//     };

//     // Word boundary for currency terms
//     const escapedCurrencyTerms = Array.from(currencyTerms)
//         .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
//         .sort((a, b) => b.length - a.length);

//     // Use lookarounds instead of \b to handle non-ASCII characters correctly (e.g. zł)
//     this.currencyRegex = new RegExp(`(?<!\\w)(${escapedCurrencyTerms.join('|')})(?!\\w)`, 'i');
//     this.symbolRegex = createRegex(symbolTerms);
//   }

//   /**
//    * Main function to detect and mark prices with performance optimizations
//    */
//   async detectAndMarkPrices() {

//     this.isProcessing = true;
//     const startTime = performance.now();

//     try {
//       // Use a more efficient tree walker with better filtering
//       const walker = this.createOptimizedTreeWalker();
//       const priceElements = [];
//       let node;
//       let elementCount = 0;

//       while ((node = walker.nextNode()) && elementCount < this.MAX_ELEMENTS) {
//         const text = node.textContent.trim();
//         if (!text || this.processedElements.has(node)) continue;

//         const { currency, amount } = this.detectCurrency(text);
//         if (currency && amount) {
//           priceElements.push({ node, text, currency, amount });
//           elementCount++;
//         }
//       }

//       // Process in batches to avoid blocking
//       await this.processInBatches(priceElements, 25);

//       const duration = performance.now() - startTime;
//       if (duration > 100) {
//         console.warn(`Price detection took ${duration.toFixed(1)}ms - ${priceElements.length} elements`);
//       }
//     } finally {
//       this.isProcessing = false;

//       // Handle any pending detection requests
//       if (this.pendingDetection) {
//         this.pendingDetection = false;
//         setTimeout(() => this.detectAndMarkPrices(), 50);
//       }
//     }
//   }

//   /**
//    * Create optimized tree walker with better filtering
//    */
//   createOptimizedTreeWalker() {
//     return document.createTreeWalker(
//       document.body,
//       NodeFilter.SHOW_TEXT,
//       {
//         acceptNode: (node) => {
//           // Skip if already processed
//           if (this.processedElements.has(node)) {
//             return NodeFilter.FILTER_REJECT;
//           }

//           // Skip hidden elements and certain tags
//           const parent = node.parentElement;
//           if (
//             !parent ||
//             parent.offsetParent === null ||
//             parent.closest('script, style, noscript, template, [id*="detected-price"]') ||
//             parent.id == "currency-converter-popup-text" ||
//             parent.querySelector("#currency-converter-popup-text")
//           ) {
//             return NodeFilter.FILTER_REJECT;
//           }

//           // Quick text content check
//           const text = node.textContent.trim();
//           if (!text || text.length > 50) {
//             // Skip very long text nodes
//             return NodeFilter.FILTER_REJECT;
//           }

//           // Preliminary currency check
//           return this.isLikelyCurrency(text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
//         },
//       },
//       false
//     );
//   }

//   /**
//    * Fast preliminary currency check
//    */
//   isLikelyCurrency(text) {
//     // We can use the global detectCurrency to check validity
//     // But for performance, we might want a quick check first.

//     // Check for digits first (must have a number)
//     if (!/\d/.test(text)) return false;

//     // Check for symbols
//     if (this.symbolRegex.test(text)) return true;

//     // Check for currency words/codes
//     return this.currencyRegex.test(text);
//   }

//   /**
//    * Cached currency detection
//    */
//   detectCurrency(text) {
//     const cacheKey = text.trim();
//     if (this.currencyCache.has(cacheKey)) {
//       return this.currencyCache.get(cacheKey);
//     }

//     // Use the global detectCurrency function which has the new logic
//     const result = detectCurrency(text);

//     this.currencyCache.set(cacheKey, result);
//     return result;
//   }

//   /**
//    * Process elements in batches with yielding
//    */
//   async processInBatches(elements, batchSize = 25) {
//     for (let i = 0; i < elements.length; i += batchSize) {
//       const batch = elements.slice(i, i + batchSize);

//       // Process current batch
//       batch.forEach((price, batchIndex) => {
//         const globalIndex = i + batchIndex;
//         markPriceElement(price.node, price.text, price.currency, price.amount, globalIndex);
//         this.processedElements.add(price.node);
//       });

//       // Yield to main thread between batches
//       if (i + batchSize < elements.length) {
//         await new Promise((resolve) => setTimeout(resolve, 0));
//       }
//     }
//   }

//   /**
//    * Debounced detection for multiple rapid calls
//    */
//   debouncedDetect() {
//     if (this.detectionTimeout) {
//       clearTimeout(this.detectionTimeout);
//     }
//     this.detectionTimeout = setTimeout(() => {
//       this.detectAndMarkPrices();
//     }, 150);
//   }

//   /**
//    * Clear cache and reset state
//    */
//   reset() {
//     this.currencyCache.clear();
//     this.processedElements.clear();
//     this.isProcessing = false;
//     this.pendingDetection = false;
//   }
// }

// Initialize the detector

class PriceDetector {
  constructor() {
    this.processedElements = new Set();
    this.currencyCache = new Map();
    this.isProcessing = false;
    this.pendingDetection = false;
    this.MAX_ELEMENTS = 1000;
    this.detectionTimeout = null;

    // Initialize regexes
    this.generateRegexes();
  }

  /**
   * Generate regexes from currency data
   */
  generateRegexes() {
    const currencyTerms = new Set();
    const symbolTerms = new Set();

    // Process CURRENCY_REPRESENTATIONS (all are currency terms)
    Object.values(CURRENCY_REPRESENTATIONS).forEach((reps) => {
      reps.forEach((rep) => currencyTerms.add(rep));
    });

    // Process CURRENCY_SYMBOLS
    Object.keys(CURRENCY_SYMBOLS).forEach((key) => {
      // If it contains letters and is at least 2 chars long, treat as currency word
      if (/[a-zA-Z]/.test(key) && key.length >= 2) {
        currencyTerms.add(key);
      } else {
        // Otherwise treat as symbol
        symbolTerms.add(key);
      }
    });

    // Helper to escape and join terms
    const createRegex = (terms) => {
      const escaped = Array.from(terms)
        .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .sort((a, b) => b.length - a.length);
      return new RegExp(escaped.join("|"));
    };

    // Word boundary for currency terms
    const escapedCurrencyTerms = Array.from(currencyTerms)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .sort((a, b) => b.length - a.length);

    // Use lookarounds instead of \b to handle non-ASCII characters correctly (e.g. zł)
    this.currencyRegex = new RegExp(`(?<![a-zA-Z])(${escapedCurrencyTerms.join("|")})(?![a-zA-Z])`, "i");
    this.symbolRegex = createRegex(symbolTerms);
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

        const detected = this.detectCurrency(text);
        if (detected.currency && detected.amount) {
          priceElements.push({
            node,
            text,
            currency: detected.currency,
            amount: detected.amount,
            possibleCurrencies: detected.possibleCurrencies || [],
          });
          elementCount++;
        }
      }

      // Process in batches to avoid blocking
      await this.processInBatches(priceElements, 25);

      const duration = performance.now() - startTime;
      if (duration > 100) {
        console.warn(`Price detection took ${duration.toFixed(1)}ms - ${priceElements.length} elements`);
      }
    } catch (error) {
      console.error("Error in detectAndMarkPrices:", error);
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
    // Check for digits first (must have a number)
    if (!/\d/.test(text)) return false;

    // Check for symbols
    if (this.symbolRegex.test(text)) return true;

    // Check for currency words/codes
    return this.currencyRegex.test(text);
  }

  /**
   * Cached currency detection
   */
  detectCurrency(text) {
    const cacheKey = text.trim();
    if (this.currencyCache.has(cacheKey)) {
      return this.currencyCache.get(cacheKey);
    }

    // Use the global detectCurrency function which has the new logic
    const result = detectCurrency(text);

    // Ensure we always have a valid object structure
    const safeResult = result || {
      currency: "",
      amount: "",
      type: "invalid",
      possibleCurrencies: [],
    };

    this.currencyCache.set(cacheKey, safeResult);
    return safeResult;
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
        markPriceElement(price.node, price.text, price.currency, price.amount, globalIndex, price.possibleCurrencies);
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
    if (this.detectionTimeout) {
      clearTimeout(this.detectionTimeout);
      this.detectionTimeout = null;
    }
  }

  /**
   * Force immediate detection (use sparingly)
   */
  detectImmediate() {
    if (this.detectionTimeout) {
      clearTimeout(this.detectionTimeout);
    }
    return this.detectAndMarkPrices();
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
  return priceDetector.detectImmediate();
}

function markPriceElement(textNode, originalText, currency, amount, index, possibleCurrencies = []) {
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
        createPriceWrapper(textNode, originalText, parent, currency, possibleCurrencies);
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
        createPriceWrapper(textNode, originalText, parent, currency, possibleCurrencies);
        return;
      }

      // Convert the amount to the first currency in the list
      const convertedValue = convertCurrency(numericAmount, currency, targetCurrency, rates);
      const formattedValue = formatNumber(convertedValue, targetCurrency);

      // Create the new text with converted value and currency name
      const newText = `${formattedValue} ${targetCurrency}`;

      // Create and apply the wrapper
      createPriceWrapper(textNode, newText, parent, currency, possibleCurrencies);
    }
  );
}

// Helper function to create the price wrapper
function createPriceWrapper(textNode, text, parent, originalCurrency, possibleCurrencies = []) {
  // Determine if we have multiple currencies ONCE at the beginning
  const hasMultipleCurrencies = possibleCurrencies && possibleCurrencies.length > 1;

  // Create a wrapper span
  const wrapper = document.createElement("span");
  wrapper.id = `detected-price`;

  // Use the SAME condition for everything
  if (hasMultipleCurrencies) {
    wrapper.classList.add("multi-currency-detected");
  }

  // Store the original text for restoration when in-page convert is turned off
  wrapper.dataset.originalText = textNode.textContent;

  // Store possible currencies for debugging
  if (hasMultipleCurrencies) {
    wrapper.dataset.possibleCurrencies = possibleCurrencies.join(",");
  }

  // Add title attribute to show original price on hover with currency info
  let titleText = `💲Original price: ${textNode.textContent} (${originalCurrency})`;
  if (hasMultipleCurrencies) {
    titleText = `\n⚠️ Multi-currency Symbol: ${textNode.textContent} (~${originalCurrency})`;
  }
  wrapper.title = titleText;

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
          // Preserve filtered styles and add our flex styles
          wrapper.setAttribute(
            "style",
            `${filteredStyle}; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap;`
          );
        }
        return; // skip rest
      }

      // SPECIAL HANDLING FOR CLASS ATTRIBUTE - MERGE INSTEAD OF REPLACE
      if (name === "class") {
        // Add parent classes to existing classes instead of replacing
        const parentClasses = attr.value.split(" ").filter((c) => c.trim());
        parentClasses.forEach((className) => {
          wrapper.classList.add(className);
        });
        return; // skip rest
      }

      if (!isExcludedName && name !== "color") {
        wrapper.setAttribute(attr.name, attr.value);
      }
    });
  }

  // Create and append the options container
  const optionsSpan = document.createElement("span");
  optionsSpan.id = "options-span";
  optionsSpan.style.display = "flex";
  optionsSpan.style.alignItems = "center";
  optionsSpan.style.flexShrink = "0"; // Prevent container from shrinking

  //!!! currency highlight icon
  // const icon = document.createElement("img");
  // icon.id = "options-icon";
  // icon.src = chrome.runtime.getURL("icons/white_icon.svg");
  // icon.alt = "Currency converter options";
  // icon.title = "Change Source Currency";
  // icon.style.display = "block";
  // icon.style.width = "16px";
  // icon.style.height = "16px";
  // icon.style.flexShrink = "0"; // Prevent icon from shrinking

  // optionsSpan.appendChild(icon);
  // wrapper.appendChild(optionsSpan);

  // Add the converted price text
  const textSpan = document.createElement("span");
  textSpan.textContent = text;
  textSpan.style.display = "inline";
  textSpan.style.fontSize = "clamp(10px, 30px)";
  textSpan.style.flexShrink = "0"; // Prevent text from shrinking

  wrapper.appendChild(textSpan);

  // Replace the text node with our wrapper
  parent.replaceChild(wrapper, textNode);
}

// Enhanced currency detection for in-page prices
function isCurrencyValue(text) {
  const result = detectCurrency(text);
  return result.type !== "invalid";
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
  chrome.storage.local.get(["pageConvert", "filterMode", "whitelistedWebsites", "blacklistedWebsites"], (result) => {
    // Clean up any existing price elements first
    uninitializePriceDetection();
    console.log("pageConvert:", result.pageConvert);

    // Initialize settings
    window.currencyConverterSettings = {
      filterMode: result.filterMode || "blacklist",
      whitelist: (result.whitelistedWebsites || []).map((item) => (typeof item === "string" ? item : item.url)),
      blacklist: (result.blacklistedWebsites || []).map((item) => (typeof item === "string" ? item : item.url)),
    };

    if (result.pageConvert) {
      // Check if we should convert this page before setting up observers
      if (!shouldConvertPage(window.location.href)) {
        console.log("Page conversion blocked by filter settings");
        return;
      }

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

      // 9. Handle filter settings changes
      if (changes.filterMode || changes.whitelistedWebsites || changes.blacklistedWebsites) {
        chrome.storage.local.get(["pageConvert"], (result) => {
          if (result.pageConvert) {
            initializePriceDetection();
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
