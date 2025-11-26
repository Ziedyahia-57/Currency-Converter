const fs = require('fs');
const vm = require('vm');

// Mock browser environment
const sandbox = {
  chrome: {
    runtime: { getURL: () => '' },
    storage: { local: { get: () => {} } }
  },
  document: {
    createTreeWalker: () => ({ nextNode: () => null }),
    body: {},
    createElement: () => ({ style: {} }),
    getElementById: () => null,
    documentElement: { classList: { add: () => {}, remove: () => {} } },
    querySelector: () => null,
    querySelectorAll: () => []
  },
  window: { 
    location: { href: '' },
    currencyConverterSettings: { filterMode: 'blacklist', whitelist: [], blacklist: [] }
  },
  NodeFilter: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  performance: { now: () => Date.now() }
};

// Read contentScript.js
const contentScript = fs.readFileSync('c:/Users/LENOVO/Desktop/Projects/[Project] Currency Converter/Currency Converter/js/contentScript.js', 'utf8');

// Execute the script in the sandbox
vm.createContext(sandbox);
vm.runInContext(contentScript, sandbox);

// Test cases
const testCases = [
  { input: "100 EUR", expectedValid: true, expectedCurrency: "EUR" },
  { input: "$100", expectedValid: true, expectedCurrency: "USD" },
  { input: "100", expectedValid: false },
  { input: "invalid", expectedValid: false }
];

console.log("Running detectCurrency tests...");
let passed = 0;
let failed = 0;

testCases.forEach(({ input, expectedValid, expectedCurrency }) => {
  try {
    const result = sandbox.detectCurrency(input);
    const isValid = result.type === 'valid';
    
    if (isValid === expectedValid && (!expectedValid || result.currency === expectedCurrency)) {
      passed++;
    } else {
      failed++;
      console.error(`FAILED: "${input}" -> Expected valid=${expectedValid}, currency=${expectedCurrency}. Got valid=${isValid}, currency=${result.currency}`);
    }
  } catch (e) {
    failed++;
    console.error(`ERROR: "${input}" -> Threw exception: ${e.message}`);
  }
});

console.log(`\nPassed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed === 0) {
  console.log("\nAll tests passed!");
} else {
  process.exit(1);
}
