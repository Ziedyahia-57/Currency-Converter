const fs = require('fs');
const path = require('path');

// Read the file content
const scriptContent = fs.readFileSync(path.join(__dirname, 'reproduce_detection_new.js'), 'utf8');

// Mock chrome API
const chrome = {
    runtime: {
        getURL: (path) => path
    },
    storage: {
        local: {
            get: (keys, cb) => cb({})
        }
    }
};
global.chrome = chrome;
global.document = {
    createElement: () => ({ style: {}, appendChild: () => {} })
};

// Eval the script to load functions into global scope
// We need to wrap it in a function or just eval it
// Since the script declares consts in global scope, eval might fail if we run it multiple times or strict mode
// But for a one-off script it's fine.
// However, `const` in eval might not be accessible outside if eval is in a function.
// So we'll use vm.runInThisContext
const vm = require('vm');
vm.runInThisContext(scriptContent);

// Now run the tests
const testCases = [
    { text: "$ 100 EUR", expected: "invalid" },
    { text: "€ 100 USD", expected: "invalid" }
];

let failed = 0;

testCases.forEach((tc, index) => {
    try {
        const result = detectCurrency(tc.text);
        const isValid = result.type !== 'invalid';
        const expectedValid = tc.expected === 'valid';
        
        let success = (isValid === expectedValid);
        if (success && expectedValid && tc.currency) {
            success = (result.currency === tc.currency);
        }

        console.log(`Test ${index + 1}: "${tc.text}" -> Expected: ${tc.expected}, Got: ${isValid ? 'valid' : 'invalid'} (${result.currency || ''}) - ${success ? 'PASS' : 'FAIL'}`);
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
