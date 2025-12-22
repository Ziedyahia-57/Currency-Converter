// monthly-data-processor.js - ULTRA SIMPLE WORKING VERSION
const fs = require('fs');
const path = require('path');

const INPUT_DATA_FILE = path.join(__dirname, 'data.json');
const PROCESSED_DATA_FILE = path.join(__dirname, 'processed-data.json');

// ULTRA-SAFE date function - ALWAYS returns valid date
function getValidDate() {
    const now = Date.now();
    return new Date(now);
}

// ULTRA-SAFE timestamp - NEVER calls toISOString() on potentially invalid dates
function getValidTimestamp() {
    const now = Date.now();
    const date = new Date(now);
    
    // Manually construct ISO string WITHOUT using toISOString()
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}Z`;
}

function getDateString() {
    const now = Date.now();
    const date = new Date(now);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

function loadExistingData() {
    try {
        if (fs.existsSync(PROCESSED_DATA_FILE)) {
            const data = JSON.parse(fs.readFileSync(PROCESSED_DATA_FILE, 'utf8'));
            console.log('✓ Loaded existing data');
            return data.data || {};
        }
    } catch (error) {
        console.log('Starting fresh');
    }
    return {};
}

function saveData(data) {
    try {
        const state = {
            data,
            lastUpdated: getValidTimestamp(),
            version: '3.0-simple'
        };
        fs.writeFileSync(PROCESSED_DATA_FILE, JSON.stringify(state, null, 2));
        console.log('✓ Data saved successfully');
    } catch (error) {
        console.error('Error saving:', error.message);
    }
}

function processData() {
    console.log('🚀 STARTING PROCESSING...');
    
    try {
        // 1. Check input file
        if (!fs.existsSync(INPUT_DATA_FILE)) {
            console.error('❌ Input file not found');
            return { success: false, error: 'No input file' };
        }
        
        // 2. Read input
        const inputData = JSON.parse(fs.readFileSync(INPUT_DATA_FILE, 'utf8'));
        const rates = inputData.rates || {};
        
        console.log(`📊 Processing ${Object.keys(rates).length} currencies`);
        
        // 3. Load existing
        let allData = loadExistingData();
        
        // 4. Get date info (SAFELY)
        const todayDateStr = getDateString();
        const timestamp = getValidTimestamp(); // SAFE - no toISOString()
        
        console.log(`📅 Date: ${todayDateStr}`);
        console.log(`⏰ Timestamp: ${timestamp.substring(0, 19)}...`);
        
        // 5. Process each currency
        let updatedCount = 0;
        let addedCount = 0;
        
        Object.entries(rates).forEach(([currency, rate]) => {
            if (!allData[currency]) {
                allData[currency] = [];
            }
            
            // Check if we already have today's data
            const existingIndex = allData[currency].findIndex(
                entry => entry && entry.date === todayDateStr
            );
            
            const entry = {
                value: rate,
                date: todayDateStr,
                timestamp: timestamp  // SAFE - manually constructed
            };
            
            if (existingIndex >= 0) {
                // Update existing
                allData[currency][existingIndex] = entry;
                updatedCount++;
            } else {
                // Add new
                allData[currency].push(entry);
                addedCount++;
                
                // Keep only last 30 days
                if (allData[currency].length > 30) {
                    allData[currency] = allData[currency].slice(-30);
                }
            }
        });
        
        // 6. Save
        saveData(allData);
        
        console.log('\n✅ PROCESSING COMPLETE!');
        console.log(`✨ Added: ${addedCount} currencies`);
        console.log(`✏️ Updated: ${updatedCount} currencies`);
        console.log(`💾 Total: ${Object.keys(allData).length} currencies in storage`);
        
        return {
            success: true,
            added: addedCount,
            updated: updatedCount,
            total: Object.keys(allData).length,
            date: todayDateStr
        };
        
    } catch (error) {
        console.error('💥 PROCESSING FAILED:', error.message);
        console.error(error.stack);
        return { success: false, error: error.message };
    }
}

// Run if called directly
if (require.main === module) {
    const result = processData();
    process.exit(result.success ? 0 : 1);
}

module.exports = { processData };
