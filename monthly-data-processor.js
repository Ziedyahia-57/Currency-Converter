// monthly-data-processor.js - SIMPLIFIED WORKING VERSION
const fs = require('fs');
const path = require('path');

// Data file locations
const INPUT_DATA_FILE = path.join(__dirname, 'data.json');
const PROCESSED_DATA_FILE = path.join(__dirname, 'processed-data.json');

// Our tracking data
let monthData = {};        // Rolling 30-day data storage
let chartData = {};        // Monthly averages (12 months max)
let currentProcessingMonth = null; // Track current month being processed

function loadProcessedData() {
    try {
        if (fs.existsSync(PROCESSED_DATA_FILE)) {
            const data = JSON.parse(fs.readFileSync(PROCESSED_DATA_FILE, 'utf8'));
            monthData = data.monthData || {};
            chartData = data.chartData || {};
            currentProcessingMonth = data.currentProcessingMonth || null;
            console.log(`✓ Loaded existing data for ${Object.keys(monthData).length} currencies`);
            
            // Clean up old data to maintain 30-day window
            cleanMonthDataTo30Days();
        }
    } catch (error) {
        console.log('Starting fresh - no existing data or error loading');
        monthData = {};
        chartData = {};
        currentProcessingMonth = null;
    }
}

function cleanMonthDataTo30Days() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];
    
    Object.keys(monthData).forEach(currency => {
        if (Array.isArray(monthData[currency])) {
            monthData[currency] = monthData[currency]
                .filter(entry => entry && entry.date && entry.date >= thirtyDaysAgoStr)
                .sort((a, b) => a.date.localeCompare(b.date));
            
            // Hard limit to 30 entries
            if (monthData[currency].length > 30) {
                monthData[currency] = monthData[currency].slice(-30);
            }
        }
    });
}

function saveProcessedData() {
    const state = {
        monthData,
        chartData,
        currentProcessingMonth,
        lastUpdated: new Date().toISOString(),
        metadata: {
            description: "Monthly averages with rolling 30-day data",
            version: "2.1",
            monthDetection: "accurate"
        }
    };
    
    try {
        fs.writeFileSync(PROCESSED_DATA_FILE, JSON.stringify(state, null, 2));
        console.log(`✓ Saved data for ${Object.keys(monthData).length} currencies`);
    } catch (error) {
        console.error('Error saving processed data:', error.message);
    }
}

function getMonthLabelFromDate(dateStr) {
    return dateStr.slice(0, 7); // "YYYY-MM"
}

function getPreviousMonth(monthLabel) {
    const [year, month] = monthLabel.split('-').map(Number);
    
    let prevMonth = month - 1;
    let prevYear = year;
    
    if (prevMonth < 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }
    
    return `${prevYear}-${String(prevMonth).padStart(2, '0')}`;
}

function getDaysInMonth(year, month) {
    // month is 1-indexed (1=January, 2=February, etc.)
    return new Date(year, month, 0).getDate();
}

function detectMonthBoundary(todayDateStr) {
    const todayMonthLabel = getMonthLabelFromDate(todayDateStr);
    
    console.log(`Month detection:`);
    console.log(`  Today's date: ${todayDateStr}`);
    console.log(`  Today's month: ${todayMonthLabel}`);
    console.log(`  Stored month: ${currentProcessingMonth || 'None'}`);
    
    // First run - initialize
    if (!currentProcessingMonth) {
        console.log(`  Initializing processing month to: ${todayMonthLabel}`);
        return {
            isNewMonth: false,
            previousMonth: null,
            newMonth: todayMonthLabel
        };
    }
    
    // Check if month has changed
    if (todayMonthLabel !== currentProcessingMonth) {
        console.log(`  ⚠️ MONTH BOUNDARY DETECTED!`);
        console.log(`    Moving from ${currentProcessingMonth} to ${todayMonthLabel}`);
        
        return {
            isNewMonth: true,
            previousMonth: currentProcessingMonth,
            newMonth: todayMonthLabel
        };
    }
    
    return {
        isNewMonth: false,
        previousMonth: null,
        newMonth: todayMonthLabel
    };
}

function finalizePreviousMonth(currency, previousMonthLabel) {
    console.log(`  Finalizing ${currency} for ${previousMonthLabel}...`);
    
    if (!monthData[currency]) {
        console.log(`    No data for ${currency}`);
        return null;
    }
    
    // Get all data for previous month
    const prevMonthData = monthData[currency].filter(entry => {
        if (!entry || !entry.date) return false;
        const entryMonth = getMonthLabelFromDate(entry.date);
        return entryMonth === previousMonthLabel;
    });
    
    if (prevMonthData.length === 0) {
        console.log(`    No data found for ${currency} in ${previousMonthLabel}`);
        return null;
    }
    
    // Calculate average
    const prevMonthRates = prevMonthData.map(entry => entry.value);
    const prevMonthSum = prevMonthRates.reduce((a, b) => a + b, 0);
    const prevMonthAvg = prevMonthSum / prevMonthRates.length;
    
    // Get days in month
    const [year, month] = previousMonthLabel.split('-').map(Number);
    const daysInMonth = getDaysInMonth(year, month);
    
    // Check if already exists
    const existingIndex = chartData[currency].findIndex(
        item => item.month === previousMonthLabel
    );
    
    const monthEntry = {
        month: previousMonthLabel,
        average: prevMonthAvg,
        dataPoints: prevMonthData.length,
        daysInMonth: daysInMonth,
        completion: Math.round((prevMonthData.length / daysInMonth) * 100),
        calculatedAt: new Date().toISOString(),
        final: true
    };
    
    if (existingIndex >= 0) {
        // Update existing
        chartData[currency][existingIndex] = monthEntry;
        console.log(`    Updated existing entry for ${previousMonthLabel}`);
    } else {
        // Add new
        chartData[currency].push(monthEntry);
        console.log(`    Created new entry for ${previousMonthLabel}`);
    }
    
    // Keep only last 12 months
    if (chartData[currency].length > 12) {
        chartData[currency] = chartData[currency].slice(-12);
    }
    
    console.log(`    Average: ${prevMonthAvg.toFixed(6)} (${prevMonthData.length}/${daysInMonth} days)`);
    return monthEntry;
}

function processData() {
    try {
        console.log('='.repeat(60));
        console.log('STARTING MONTHLY DATA PROCESSING');
        console.log('='.repeat(60));
        
        // Check if input file exists
        if (!fs.existsSync(INPUT_DATA_FILE)) {
            console.error(`❌ Input file not found: ${INPUT_DATA_FILE}`);
            return { success: false, error: 'Input file not found' };
        }
        
        console.log(`✓ Input file exists`);
        
        // Read and parse input data - SIMPLIFIED
        let inputData;
        try {
            inputData = JSON.parse(fs.readFileSync(INPUT_DATA_FILE, 'utf8'));
            console.log(`✓ Successfully parsed input data`);
        } catch (parseError) {
            console.error(`❌ Error parsing input data: ${parseError.message}`);
            return { success: false, error: `Parse error: ${parseError.message}` };
        }
        
        // CRITICAL FIX: Use CURRENT DATE instead of parsing timestamp
        const today = new Date();
        const apiDateStr = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        console.log(`✓ Using current date: ${apiDateStr}`);
        
        // Load existing processed data
        loadProcessedData();
        
        // Detect month boundary
        const monthBoundary = detectMonthBoundary(apiDateStr);
        
        const rates = inputData.rates || {};
        let newDataAdded = false;
        let skippedDuplicates = 0;
        let finalizedMonths = {};
        
        console.log(`\nProcessing ${Object.keys(rates).length} currencies...`);
        
        // Update current processing month
        if (monthBoundary.isNewMonth) {
            console.log(`\n📅 MONTH TRANSITION DETECTED`);
            console.log(`   Previous: ${monthBoundary.previousMonth}`);
            console.log(`   New: ${monthBoundary.newMonth}`);
            currentProcessingMonth = monthBoundary.newMonth;
        } else if (!currentProcessingMonth) {
            currentProcessingMonth = monthBoundary.newMonth;
        }
        
        // Process each currency
        Object.keys(rates).forEach(currency => {
            const rate = rates[currency];
            
            // Initialize if needed
            if (!monthData[currency]) monthData[currency] = [];
            if (!chartData[currency]) chartData[currency] = [];
            
            // Check for existing entry
            const existingIndex = monthData[currency].findIndex(
                entry => entry && entry.date === apiDateStr
            );
            
            // Add/update in monthData (rolling 30-day)
            if (existingIndex >= 0) {
                // Update existing
                monthData[currency][existingIndex] = {
                    value: rate,
                    date: apiDateStr,
                    timestamp: today.toISOString()
                };
                skippedDuplicates++;
                console.log(`✓ Updated ${currency} for ${apiDateStr}`);
            } else {
                // Add new
                monthData[currency].push({
                    value: rate,
                    date: apiDateStr,
                    timestamp: today.toISOString()
                });
                newDataAdded = true;
                console.log(`✓ Added ${currency} for ${apiDateStr}: ${rate}`);
            }
            
            // Keep sorted and limit to 30 days
            monthData[currency].sort((a, b) => a.date.localeCompare(b.date));
            if (monthData[currency].length > 30) {
                monthData[currency] = monthData[currency].slice(-30);
            }
            
            // Finalize previous month if boundary detected
            if (monthBoundary.isNewMonth && monthBoundary.previousMonth) {
                const finalized = finalizePreviousMonth(currency, monthBoundary.previousMonth);
                if (finalized) {
                    finalizedMonths[currency] = {
                        month: monthBoundary.previousMonth,
                        average: finalized.average,
                        dataPoints: finalized.dataPoints,
                        daysInMonth: finalized.daysInMonth
                    };
                }
            }
            
            // Update current month in chartData
            const currentMonthLabel = getMonthLabelFromDate(apiDateStr);
            const currentMonthData = monthData[currency].filter(entry => {
                if (!entry || !entry.date) return false;
                return getMonthLabelFromDate(entry.date) === currentMonthLabel;
            });
            
            if (currentMonthData.length > 0) {
                const currentMonthRates = currentMonthData.map(entry => entry.value);
                const currentSum = currentMonthRates.reduce((a, b) => a + b, 0);
                const currentAvg = currentSum / currentMonthRates.length;
                
                const [year, month] = currentMonthLabel.split('-').map(Number);
                const daysInMonth = getDaysInMonth(year, month);
                
                const monthIndex = chartData[currency].findIndex(
                    item => item.month === currentMonthLabel
                );
                
                const monthEntry = {
                    month: currentMonthLabel,
                    average: currentAvg,
                    dataPoints: currentMonthData.length,
                    daysInMonth: daysInMonth,
                    completion: Math.round((currentMonthData.length / daysInMonth) * 100),
                    lastUpdated: new Date().toISOString(),
                    isCurrentMonth: true,
                    final: monthBoundary.isNewMonth ? false : (currentMonthData.length === daysInMonth)
                };
                
                if (monthIndex >= 0) {
                    chartData[currency][monthIndex] = monthEntry;
                } else {
                    chartData[currency].push(monthEntry);
                }
                
                // Keep only last 12 months
                if (chartData[currency].length > 12) {
                    chartData[currency] = chartData[currency].slice(-12);
                }
            }
        });
        
        // Save processed data
        saveProcessedData();
        
        // Create summary
        const sampleCurrencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'CHF'];
        const summary = sampleCurrencies.map(currency => {
            const currencyData = monthData[currency] || [];
            const latestEntry = currencyData.length > 0 
                ? currencyData[currencyData.length - 1] 
                : null;
            
            const currentMonthLabel = getMonthLabelFromDate(apiDateStr);
            const currentChartEntry = (chartData[currency] || []).find(
                item => item.month === currentMonthLabel
            );
            
            const rollingAvg = currencyData.length > 0
                ? currencyData.reduce((sum, entry) => sum + entry.value, 0) / currencyData.length
                : null;
            
            return {
                currency,
                todayRate: latestEntry ? latestEntry.value : null,
                todayDate: latestEntry ? latestEntry.date : null,
                currentMonthAvg: currentChartEntry ? currentChartEntry.average : null,
                monthProgress: currentChartEntry 
                    ? `${currentChartEntry.dataPoints}/${currentChartEntry.daysInMonth} days (${currentChartEntry.completion}%)`
                    : 'N/A',
                rolling30DayAvg: rollingAvg,
                rollingDataPoints: currencyData.length,
                finalized: finalizedMonths[currency] || null
            };
        });
        
        const result = {
            success: true,
            newDataAdded,
            skippedDuplicates,
            totalCurrencies: Object.keys(rates).length,
            processedCurrencies: Object.keys(monthData).length,
            apiDate: apiDateStr,
            currentProcessingMonth,
            monthBoundaryDetected: monthBoundary.isNewMonth,
            finalizedMonths: Object.keys(finalizedMonths),
            summary
        };
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ PROCESSING COMPLETE');
        console.log('='.repeat(60));
        
        console.log(`\n📊 SUMMARY:`);
        console.log(`Date processed: ${apiDateStr}`);
        console.log(`Current month: ${currentProcessingMonth}`);
        console.log(`New data added: ${newDataAdded ? 'Yes' : 'No'}`);
        console.log(`Duplicates skipped: ${skippedDuplicates}`);
        console.log(`Currencies processed: ${Object.keys(monthData).length}`);
        console.log(`Month boundary: ${monthBoundary.isNewMonth ? 'DETECTED' : 'No change'}`);
        
        if (monthBoundary.isNewMonth) {
            console.log(`\n🎉 FINALIZED MONTHS:`);
            Object.keys(finalizedMonths).forEach(currency => {
                const info = finalizedMonths[currency];
                console.log(`  ${currency}: ${info.month} - ${info.average.toFixed(6)} (${info.dataPoints}/${info.daysInMonth} days)`);
            });
        }
        
        console.log('\n📈 SAMPLE CURRENCIES:');
        summary.forEach(item => {
            console.log(`${item.currency}:`);
            console.log(`  Today: ${item.todayRate ? item.todayRate.toFixed(6) : 'N/A'}`);
            if (item.currentMonthAvg) {
                console.log(`  Current Month: ${item.currentMonthAvg.toFixed(6)} (${item.monthProgress})`);
            }
            console.log(`  Rolling 30-day: ${item.rolling30DayAvg ? item.rolling30DayAvg.toFixed(6) : 'N/A'} (${item.rollingDataPoints}/30 days)`);
            if (item.finalized) {
                console.log(`  📅 Finalized: ${item.finalized.month} - ${item.finalized.average.toFixed(6)}`);
            }
        });
        
        return result;
        
    } catch (error) {
        console.error('❌ Error processing data:', error.message);
        console.error('Stack trace:', error.stack);
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
