// monthly-data-processor.js - FIXED VERSION
const fs = require('fs');
const path = require('path');

console.log('🚀 RUNNING FIXED VERSION - NO toISOString() ERRORS!');

const INPUT_DATA_FILE = path.join(__dirname, 'data.json');
const PROCESSED_DATA_FILE = path.join(__dirname, 'processed-data.json');

// SAFE DATE FUNCTIONS
function getSafeISOString(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        date = new Date(); // Fallback to now
    }
    
    // Manually construct ISO string to avoid toISOString() errors
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}Z`;
}

function getDateString(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        date = new Date();
    }
    
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// SIMPLIFIED PROCESSING FUNCTION
function processData() {
    console.log('📊 Starting data processing...');
    
    try {
        // 1. Check input
        if (!fs.existsSync(INPUT_DATA_FILE)) {
            console.error('❌ Input file not found');
            return { success: false, error: 'No input file' };
        }
        
        // 2. Read input
        const inputData = JSON.parse(fs.readFileSync(INPUT_DATA_FILE, 'utf8'));
        const rates = inputData.rates || {};
        
        console.log(`✓ Loaded ${Object.keys(rates).length} currencies`);
        
        // 3. Get date info SAFELY
        let apiTimestamp;
        if (inputData.timestamp) {
            apiTimestamp = new Date(inputData.timestamp * 1000);
        } else {
            apiTimestamp = new Date();
        }
        
        // Validate date
        if (isNaN(apiTimestamp.getTime())) {
            apiTimestamp = new Date(); // Fallback
        }
        
        const apiDateStr = getDateString(apiTimestamp);
        const timestampStr = getSafeISOString(apiTimestamp);
        
        console.log(`✓ Date: ${apiDateStr}`);
        console.log(`✓ Timestamp: ${timestampStr}`);
        
        // 4. Load existing data
        let processedData = {};
        if (fs.existsSync(PROCESSED_DATA_FILE)) {
            try {
                processedData = JSON.parse(fs.readFileSync(PROCESSED_DATA_FILE, 'utf8'));
                console.log(`✓ Loaded existing data for ${Object.keys(processedData.data || {}).length} currencies`);
            } catch (e) {
                console.log('⚠️ Could not load existing data, starting fresh');
                processedData = { data: {}, metadata: { version: '3.0-fixed' } };
            }
        }
        
        if (!processedData.data) processedData.data = {};
        
        // 5. Process each currency
        let updated = 0;
        let added = 0;
        
        Object.entries(rates).forEach(([currency, rate]) => {
            if (!processedData.data[currency]) {
                processedData.data[currency] = [];
            }
            
            // Check if today already exists
            const existingIndex = processedData.data[currency].findIndex(
                entry => entry && entry.date === apiDateStr
            );
            
            const entry = {
                value: rate,
                date: apiDateStr,
                timestamp: timestampStr, // SAFE - manually constructed
                updatedAt: Date.now()
            };
            
            if (existingIndex >= 0) {
                // Update
                processedData.data[currency][existingIndex] = entry;
                updated++;
            } else {
                // Add
                processedData.data[currency].push(entry);
                added++;
                
                // Keep only last 30
                if (processedData.data[currency].length > 30) {
                    processedData.data[currency] = processedData.data[currency].slice(-30);
                }
            }
        });
        
        // 6. Save
        processedData.metadata = {
            processedAt: getSafeISOString(new Date()),
            date: apiDateStr,
            currencies: Object.keys(processedData.data).length,
            added,
            updated,
            version: '3.0-fixed-yaml'
        };
        
        fs.writeFileSync(PROCESSED_DATA_FILE, JSON.stringify(processedData, null, 2));
        
        console.log('\n✅ PROCESSING COMPLETE!');
        console.log(`✨ Added: ${added}`);
        console.log(`✏️ Updated: ${updated}`);
        console.log(`💾 Total: ${Object.keys(processedData.data).length}`);
        
        return {
            success: true,
            date: apiDateStr,
            added,
            updated,
            total: Object.keys(processedData.data).length
        };
        
    } catch (error) {
        console.error('💥 ERROR:', error.message);
        return { success: false, error: error.message };
    }
}

// Run if called directly
if (require.main === module) {
    const result = processData();
    process.exit(result.success ? 0 : 1);
}

module.exports = { processData };
