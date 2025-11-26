const terms = ["zł", "euro"];
const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

const regexBoundary = new RegExp(`\\b(${escaped.join('|')})\\b`, 'i');
console.log("Boundary \\b:");
console.log("'100 zł':", regexBoundary.test("100 zł"));
console.log("'100 euro':", regexBoundary.test("100 euro"));

const regexLookaround = new RegExp(`(?<!\\w)(${escaped.join('|')})(?!\\w)`, 'i');
console.log("\nLookaround (?<!\\w)(?!\\w):");
console.log("'100 zł':", regexLookaround.test("100 zł"));
console.log("'100 euro':", regexLookaround.test("100 euro"));
console.log("'neuro':", regexLookaround.test("neuro"));
console.log("'eurozone':", regexLookaround.test("eurozone"));
