// monthly-data-processor.js
const fs = require('fs');
const path = require('path');

// Data file locations
const INPUT_DATA_FILE = path.join(__dirname, 'data.json'); // Your existing rates data
const PROCESSED_DATA_FILE = path.join(__dirname, 'processed-data.json'); // Our processed data

// Our tracking data
let monthData = {};
let chartData = {};
let lastProcessedDates = {};
let lastUpdated = null;

function loadProcessedData() {
    try {
        if (fs.existsSync(PROCESSED_DATA_FILE)) {
            const data = JSON.parse(fs.readFileSync(PROCESSED_DATA_FILE, 'utf8'));
            monthData = data.monthData || {};
            chartData = data.chartData || {};
            lastProcessedDates = data.lastProcessedDates || {};
            lastUpdated = data.lastUpdated;
            console.log(`Loaded processed data for ${Object.keys(monthData).length} currencies`);
        }
    } catch (error) {
        console.error('Error loading processed data:', error);
        monthData = {};
        chartData = {};
        lastProcessedDates = {};
    }
}

function saveProcessedData() {
    const state = {
        monthData,
        chartData,
        lastProcessedDates,
        lastUpdated,
        savedAt: new Date().toISOString()
    };
    
    try {
        fs.writeFileSync(PROCESSED_DATA_FILE, JSON.stringify(state, null, 2));
        console.log(`Saved processed data for ${Object.keys(monthData).length} currencies`);
    } catch (error) {
        console.error('Error saving processed data:', error);
    }
}

function getPreviousMonth(currentMonth, currentYear) {
    let prevMonth = currentMonth - 1;
    let prevYear = currentYear;
    
    if (prevMonth < 0) {
        prevMonth = 11;
        prevYear = currentYear - 1;
    }
    
    return `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}`;
}

function processData() {
    try {
        console.log('Starting data processing...');
        
        // Load the input data (your existing data.json)
        if (!fs.existsSync(INPUT_DATA_FILE)) {
            console.error(`Input file not found: ${INPUT_DATA_FILE}`);
            return { success: false, error: 'Input file not found' };
        }
        
        const inputData = JSON.parse(fs.readFileSync(INPUT_DATA_FILE, 'utf8'));
        console.log(`Loaded input data with timestamp: ${inputData.timestamp}`);
        
        // Load our processed data
        loadProcessedData();
        
        // Extract data from input
        const apiTimestamp = inputData.timestamp ? 
            new Date(inputData.timestamp) : new Date();
        const apiDateStr = apiTimestamp.toISOString().split('T')[0];
        
        const today = new Date();
        const dataDate = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        const rates = inputData.rates || {};
        let newDataAdded = false;
        let skippedDuplicates = 0;
        
        console.log(`Processing ${Object.keys(rates).length} currencies for date: ${apiDateStr}`);
        
        // Process each currency
        Object.keys(rates).forEach(currency => {
            const rate = rates[currency];
            
            // Initialize data structures for this currency if needed
            if (!monthData[currency]) monthData[currency] = [];
            if (!chartData[currency]) chartData[currency] = [];
            if (!lastProcessedDates[currency]) lastProcessedDates[currency] = null;
            
            // Check if we already have data for this date
            const hasEntryForToday = monthData[currency].some(entry => 
                entry && entry.date === apiDateStr
            );
            
            if (hasEntryForToday) {
                console.log(`Skipping ${currency} - already have data for ${apiDateStr}`);
                skippedDuplicates++;
                return;
            }
            
            newDataAdded = true;
            
            if (dataDate === 1) {
                // FIRST DAY OF NEW MONTH
                // Calculate and save previous month's average
                if (monthData[currency] && monthData[currency].length > 0) {
                    const validPrevData = monthData[currency]
                        .filter(v => v != null && v.value != null)
                        .map(v => v.value);
                        
                    if (validPrevData.length > 0) {
                        const prevMonthSum = validPrevData.reduce((a, b) => a + b, 0);
                        const prevMonthAvg = prevMonthSum / validPrevData.length;
                        
                        // Store previous month's average
                        chartData[currency].push({
                            month: getPreviousMonth(currentMonth, currentYear),
                            average: prevMonthAvg,
                            dataPoints: validPrevData.length,
                            calculatedAt: today.toISOString()
                        });
                        
                        // Keep only last 12 months
                        if (chartData[currency].length > 12) {
                            chartData[currency] = chartData[currency].slice(-12);
                        }
                        
                        console.log(`Finalized ${currency} for ${getPreviousMonth(currentMonth, currentYear)}: ${prevMonthAvg.toFixed(6)} (${validPrevData.length} days)`);
                    }
                }
                
                // Start new month with today's rate
                monthData[currency] = [{
                    value: rate,
                    date: apiDateStr,
                    timestamp: apiTimestamp.toISOString()
                }];
                
            } else {
                // NOT FIRST DAY - add to current month's data
                monthData[currency].push({
                    value: rate,
                    date: apiDateStr,
                    timestamp: apiTimestamp.toISOString()
                });
                
                // Update current month's running average
                const validCurrentData = monthData[currency]
                    .filter(v => v != null && v.value != null)
                    .map(v => v.value);
                    
                if (validCurrentData.length > 0) {
                    const currentSum = validCurrentData.reduce((a, b) => a + b, 0);
                    const currentAvg = currentSum / validCurrentData.length;
                    
                    const currentMonthLabel = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
                    
                    // Find or create current month's entry
                    const currentMonthIndex = chartData[currency].findIndex(item => 
                        item.month === currentMonthLabel
                    );
                    
                    const monthEntry = {
                        month: currentMonthLabel,
                        average: currentAvg,
                        dataPoints: validCurrentData.length,
                        lastUpdated: today.toISOString()
                    };
                    
                    if (currentMonthIndex >= 0) {
                        chartData[currency][currentMonthIndex] = monthEntry;
                    } else {
                        chartData[currency].push(monthEntry);
                    }
                }
            }
            
            // Update last processed date
            lastProcessedDates[currency] = apiDateStr;
        });
        
        lastUpdated = apiTimestamp.toISOString();
        
        // Save our processed data
        saveProcessedData();
        
        // Create summary
        const sampleCurrencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'CHF'];
        const summary = sampleCurrencies.map(currency => {
            const currencyData = monthData[currency] || [];
            const latestRate = currencyData.length > 0 ? currencyData[currencyData.length - 1] : null;
            const monthlyAvg = chartData[currency] && chartData[currency].length > 0 
                ? chartData[currency][chartData[currency].length - 1] 
                : null;
                
            return {
                currency,
                todayRate: latestRate ? latestRate.value : null,
                todayDate: latestRate ? latestRate.date : null,
                currentMonthAvg: monthlyAvg ? monthlyAvg.average : null,
                dataPoints: currencyData.length
            };
        });
        
        const result = {
            success: true,
            newDataAdded,
            skippedDuplicates,
            totalCurrencies: Object.keys(rates).length,
            processedCurrencies: Object.keys(monthData).length,
            apiDate: apiDateStr,
            lastUpdated,
            summary
        };
        
        console.log('\n=== PROCESSING COMPLETE ===');
        console.log(`New data added: ${newDataAdded ? 'Yes' : 'No'}`);
        console.log(`Skipped duplicates: ${skippedDuplicates}`);
        console.log(`Total currencies processed: ${Object.keys(monthData).length}`);
        
        console.log('\n=== SAMPLE CURRENCIES ===');
        summary.forEach(item => {
            console.log(`${item.currency}: ${item.todayRate ? item.todayRate.toFixed(6) : 'N/A'} (${item.todayDate || 'N/A'})`);
            if (item.currentMonthAvg) {
                console.log(`  Month avg: ${item.currentMonthAvg.toFixed(6)} (${item.dataPoints} days)`);
            }
        });
        
        return result;
        
    } catch (error) {
        console.error('Error processing data:', error);
        return { success: false, error: error.message };
    }
}

// Export for use in GitHub Actions
module.exports = { processData };

// If run directly, process the data
if (require.main === module) {
    const result = processData();
    process.exit(result.success ? 0 : 1);
}
