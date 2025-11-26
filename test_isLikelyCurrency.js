const fs = require('fs');

// Mock browser environment
global.chrome = {
  runtime: {
    getURL: () => ''
  },
  storage: {
    local: {
      get: () => {}
    }
  }
};
global.document = {
  createTreeWalker: () => {},
  body: {},
  createElement: () => ({ style: {} }),
  getElementById: () => null,
  documentElement: { classList: { add: () => {}, remove: () => {} } }
};
global.window = {
  location: { href: '' }
};
global.NodeFilter = {
  SHOW_TEXT: 4,
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 2
};

// Read contentScript.js
const contentScript = fs.readFileSync('c:/Users/LENOVO/Desktop/Projects/[Project] Currency Converter/Currency Converter/js/contentScript.js', 'utf8');

// Extract necessary parts to run the test
// We need CURRENCY_REPRESENTATIONS, CURRENCY_SYMBOLS, and the PriceDetector class logic
// Since we can't easily import the class without the DOM, we'll extract the relevant data and logic

function extractObject(content, name) {
    const start = content.indexOf(`const ${name} = {`);
    if (start === -1) return null;
    
    let end = start;
    let braceCount = 0;
    let started = false;
    
    for (let i = start; i < content.length; i++) {
        if (content[i] === '{') {
            braceCount++;
            started = true;
        } else if (content[i] === '}') {
            braceCount--;
        }
        
        if (started && braceCount === 0) {
            end = i + 1;
            break;
        }
    }
    
    const objStr = content.substring(start, end).replace(`const ${name} = `, '');
    return eval('(' + objStr + ')');
}

const CURRENCY_REPRESENTATIONS = extractObject(contentScript, 'CURRENCY_REPRESENTATIONS');
const CURRENCY_SYMBOLS = extractObject(contentScript, 'CURRENCY_SYMBOLS');

class PriceDetector {
  constructor() {
    this.generateRegexes();
  }

  generateRegexes() {
    const currencyTerms = new Set();
    const symbolTerms = new Set();
    
    // Process CURRENCY_REPRESENTATIONS (all are currency terms)
    Object.values(CURRENCY_REPRESENTATIONS).forEach(reps => {
      reps.forEach(rep => currencyTerms.add(rep));
    });

    // Process CURRENCY_SYMBOLS
    Object.keys(CURRENCY_SYMBOLS).forEach(key => {
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
        .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .sort((a, b) => b.length - a.length);
      return new RegExp(escaped.join('|'));
    };

    // Word boundary for currency terms
    const escapedCurrencyTerms = Array.from(currencyTerms)
        .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .sort((a, b) => b.length - a.length);
    
    this.currencyRegex = new RegExp(`(?<!\\w)(${escapedCurrencyTerms.join('|')})(?!\\w)`, 'i');
    this.symbolRegex = createRegex(symbolTerms);
  }

  isLikelyCurrency(text) {
    // Check for digits first (must have a number)
    if (!/\d/.test(text)) return false;

    // Check for symbols
    if (this.symbolRegex.test(text)) return true;
    
    // Check for currency words/codes
    return this.currencyRegex.test(text);
  }
}

const detector = new PriceDetector();

const testCases = [
  { input: "100 EUR", expected: true },
  { input: "100 eur", expected: true },
  { input: "100 Euro", expected: true },
  { input: "100 euro", expected: true },
  { input: "100 USD", expected: true },
  { input: "100 usd", expected: true },
  { input: "$100", expected: true },
  { input: "100 pounds", expected: true },
  { input: "100 Pounds", expected: true },
  { input: "100 random", expected: false },
  { input: "just text", expected: false }, // No digits
  { input: "100", expected: false }, // Digits but no currency
  { input: "100 yen", expected: true },
  { input: "100 won", expected: true },
  { input: "100 kr", expected: true },
  { input: "100 zł", expected: true },
];

console.log("Running tests...");
let passed = 0;
let failed = 0;

testCases.forEach(({ input, expected }) => {
  const result = detector.isLikelyCurrency(input);
  if (result === expected) {
    passed++;
  } else {
    failed++;
    console.error(`FAILED: "${input}" -> Expected ${expected}, got ${result}`);
  }
});

console.log(`\nPassed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed === 0) {
  console.log("\nAll tests passed!");
} else {
  process.exit(1);
}
