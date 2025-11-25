const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Read the file content
const scriptContent = fs.readFileSync(path.join(__dirname, 'js', 'contentScript.js'), 'utf8');

// Mock chrome API and document
const chrome = {
    runtime: { getURL: (path) => path },
    storage: { local: { get: (keys, cb) => cb({}) } }
};
global.chrome = chrome;
global.document = {
    createElement: () => ({ style: {}, appendChild: () => {} })
};

// Load the script
vm.runInThisContext(scriptContent);

// Test cases
const testCases = [
    { text: "100 baht", expected: "valid", currency: "THB" },
    { text: "100 dong", expected: "valid", currency: "VND" },
    { text: "100 ringgit", expected: "valid", currency: "MYR" },
    { text: "100 rupiah", expected: "valid", currency: "IDR" },
    { text: "100 franc", expected: "valid", currency: "CHF" },
    { text: "100 krona", expected: "valid", currency: "SEK" },
    { text: "100 krone", expected: "valid", currency: "NOK" }
];

let failed = 0;

console.log("Running verification tests...");

testCases.forEach((tc, index) => {
    try {
        const result = detectCurrency(tc.text);
        const isValid = result.type === 'valid';
        const expectedValid = tc.expected === 'valid';
        
        let success = (isValid === expectedValid);
        if (success && expectedValid && tc.currency) {
            success = (result.currency === tc.currency);
        }

        const status = success ? 'PASS' : 'FAIL';
        console.log(`Test ${index + 1}: "${tc.text}" -> Expected: ${tc.expected} (${tc.currency}), Got: ${result.type} (${result.currency}) - ${status}`);
        
        if (!success) failed++;
    } catch (e) {
        console.error(`Test ${index + 1}: Error`, e);
        failed++;
    }
});

if (failed === 0) {
    console.log("All tests passed!");
} else {
    console.log(`${failed} tests failed.`);
    process.exit(1);
}
