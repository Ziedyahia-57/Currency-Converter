// Constants
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
  EGP: ["EGP", "E£", "Egyptian Pound", "Egyptian Pounds"],
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
  BWP: ["BWP", "P", "Botswana Pula", "Botswana Pulas"],
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
  TMT: ["TMT", "m", "Turkmenistani Manat", "Turkmenistani Manats"],
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
  peso:["MXN", "PHP", "ARS", "CLP", "COP", "DOP","UYU"],
  pesos:["MXN", "PHP", "ARS", "CLP", "COP", "DOP","UYU"],
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

function parseNumber(text) {
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

  const cleanText = originalText.replace(/\s+/g, "");

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

function tokenize(text) {
  if (!text) return [];

  // Convert to uppercase for case-insensitive matching
  const upperText = text.toUpperCase();
  const tokens = [];
  let remaining = upperText;

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
        if (!longestMatch || symbol.length > longestMatch.length) {
          longestMatch = symbol;
          longestMatchType = "symbol";
          longestMatchData = { currencies: currencies };
        }
      }
    }

    // 3. Check CC (Currency Codes)
    // CC is always 3 letters.
    if (remaining.length >= 3) {
      const potentialCC = remaining.substring(0, 3).toUpperCase();
      if (currencyToCountry[potentialCC]) {
        // Check if it's a valid word boundary? User didn't specify, but "USD" in "US Dollar" is tricky.
        // "US Dollar" is a REP. "USD" is a CC.
        // If we have "US Dollar", the REP check should catch it (length 9).
        // "USD" (length 3).
        // So longest match wins. "US Dollar" wins over "USD" (if "USD" was a prefix, which it isn't).
        // But what if "US" is a prefix?
        // "US$" is a REP. "U" is not.

        if (!longestMatch || 3 > longestMatch.length) {
          longestMatch = remaining.substring(0, 3); // Use original case for consumption, but type is CC
          longestMatchType = "cc";
          longestMatchData = { currency: potentialCC };
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

// function detectCurrency(text) {
//   const trimmedText = text.trim();
//   if (!trimmedText) return { currency: "", amount: "", type: "invalid" };

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
//   const parsedNumber = parseNumber(amountPart);

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

//   const allTokens = [...leftTokens, ...rightTokens];
//   let possibleCurrencies = null;

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
//       tokenCurrencies = [token.currency];
//     } else if (token.type === "cc") {
//       tokenCurrencies = [token.currency];
//     }

//     if (possibleCurrencies === null) {
//       possibleCurrencies = new Set(tokenCurrencies);
//     } else {
//       const newSet = new Set();
//       for (const c of tokenCurrencies) {
//         if (possibleCurrencies.has(c)) {
//           newSet.add(c);
//         }
//       }
//       possibleCurrencies = newSet;
//     }

//     if (possibleCurrencies.size === 0) {
//       return { currency: "", amount: "", type: "invalid" };
//     }
//   }

//   const resultArray = Array.from(possibleCurrencies);
//   let selectedCurrency = resultArray[0];

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
//     type: "valid",
//     possibleCurrencies: resultArray,
//   };
// }
function detectCurrency(text) {
  const trimmedText = text.trim();
  if (!trimmedText) return { currency: "", amount: "", type: "invalid" };

  const numberMatches = trimmedText.match(/\d[\d,. ]*/g);

  if (!numberMatches || numberMatches.length === 0) {
    return { currency: "", amount: "", type: "invalid" };
  }

  // If multiple number-like sequences are found, we need to be careful.
  // The user requirement says "NUM" is a single entity in the pattern.
  // If we have "100 200", it's likely invalid or two prices.
  // For now, let's assume we focus on the longest valid number or the first one?
  // The previous logic rejected if > 1 match. Let's stick to that for strictness,
  // BUT "1,000.00" matches as one. "1 000" matches as one.
  // "100 USD 200" would match as two.
  if (numberMatches.length > 1) {
    return { currency: "", amount: "", type: "invalid" };
  }

  const amountPart = numberMatches[0].trim();
  const parsedNumber = parseNumber(amountPart);

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
  ];

  if (!validPatterns.includes(patternSignature)) {
    return { currency: "", amount: "", type: "invalid" };
  }

  const allTokens = [...leftTokens, ...rightTokens];
  let possibleCurrencies = null;

  // Check for symbol-code conflicts first
  const symbolToken = allTokens.find((t) => t.type === "symbol");
  const codeToken = allTokens.find((t) => t.type === "cc" || t.type === "rep");

  if (symbolToken && codeToken) {
    // Check for specific symbol-code conflicts
    const symbol = symbolToken.value;
    const code = codeToken.currency;

    // Check if symbol and code are mismatched
    // Only flag as invalid for the most specific symbol-code pairs
    // $ can be used with many currencies, so only reject if code is not in the list
    if (symbol === '$' && !['USD', 'CAD', 'AUD', 'NZD', 'SGD', 'HKD', 'MXN', 'BRL', 'CLP', 'COP', 'ZWL', 'TTD', 'BSD', 'BZD', 'BBD', 'XCD', 'SBD', 'LRD', 'SRD', 'GYD', 'KYD', 'FJD', 'JMD', 'NAD'].includes(code)) {
      return { currency: "", amount: "", type: "invalid" }; // Mismatched symbol and code
    }

    // For € and £, they are more specific
    if ((symbol === '€' && code !== 'EUR') ||
        (symbol === '£' && !['GBP', 'EGP', 'LBP', 'SYP', 'FKP', 'GIP', 'SDG', 'SSP'].includes(code))) {
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
    if (symbolToken.value === '$' && possibleCurrencies.has('USD')) {
      selectedCurrency = 'USD';
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
}