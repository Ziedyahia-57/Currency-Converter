const fs = require('fs');

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
    try {
        // Use eval to parse the object string as it might contain comments or unquoted keys
        // We need to be careful with eval, but for this specific task it's the easiest way to parse JS object literal
        return eval('(' + objStr + ')');
    } catch (e) {
        console.error(`Error parsing ${name}:`, e);
        return null;
    }
}

const file1 = fs.readFileSync('c:/Users/LENOVO/Desktop/Projects/[Project] Currency Converter/Currency Converter/reproduce_detection_new.js', 'utf8');
const file2 = fs.readFileSync('c:/Users/LENOVO/Desktop/Projects/[Project] Currency Converter/Currency Converter/js/contentScript.js', 'utf8');

const reps1 = extractObject(file1, 'CURRENCY_REPRESENTATIONS');
const reps2 = extractObject(file2, 'CURRENCY_REPRESENTATIONS');

const syms1 = extractObject(file1, 'CURRENCY_SYMBOLS');
const syms2 = extractObject(file2, 'CURRENCY_SYMBOLS');

console.log('Comparing CURRENCY_REPRESENTATIONS...');
if (JSON.stringify(reps1) === JSON.stringify(reps2)) {
    console.log('CURRENCY_REPRESENTATIONS are identical.');
} else {
    console.log('CURRENCY_REPRESENTATIONS are DIFFERENT.');
    // Find differences
    for (const key in reps1) {
        if (JSON.stringify(reps1[key]) !== JSON.stringify(reps2[key])) {
            console.log(`Difference in ${key}:`);
            console.log('File 1:', reps1[key]);
            console.log('File 2:', reps2[key]);
        }
    }
}

console.log('\nComparing CURRENCY_SYMBOLS...');
if (JSON.stringify(syms1) === JSON.stringify(syms2)) {
    console.log('CURRENCY_SYMBOLS are identical.');
} else {
    console.log('CURRENCY_SYMBOLS are DIFFERENT.');
    // Find differences
    for (const key in syms1) {
        if (JSON.stringify(syms1[key]) !== JSON.stringify(syms2[key])) {
            console.log(`Difference in ${key}:`);
            console.log('File 1:', syms1[key]);
            console.log('File 2:', syms2[key]);
        }
    }
}
