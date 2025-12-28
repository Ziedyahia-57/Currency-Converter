const ctx = document.getElementById("chart").getContext("2d");
const testDateInput = document.getElementById("testDate");
const infoText = document.getElementById("infoText");
const valueText = document.getElementById("valueText");

// Set default test date to today and disable the input
const today = new Date();
testDateInput.value = today.toISOString().split("T")[0];
testDateInput.disabled = true; // Disable the input so it can't be changed

// Function to get the effective today based on the 01:47 UTC update time
function getEffectiveToday() {
  const now = new Date();
  const updateTimeToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 1, 47, 0));
  
  if (now < updateTimeToday) {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    return yesterday;
  }
  return now;
}

// Expose to window for access from script.js
window.today = getEffectiveToday();
testDateInput.style.opacity = "0.7"; // Visual cue that it's disabled

// Create gradient contexts for different trends
function createGradient(ctx, color) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 170);
  const colorMap = {
    green: { start: "rgba(16, 185, 129, 0.45)", end: "rgba(16, 185, 129, 0)" },
    red: { start: "rgba(239, 68, 68, 0.45)", end: "rgba(239, 68, 68, 0)" },
    gray: { start: "rgba(156, 163, 175, 0.45)", end: "rgba(156, 163, 175, 0)" },
    orange: { start: "rgba(255, 152, 0, 0.45)", end: "rgba(255, 152, 0, 0)" },
  };

  const colors = colorMap[color] || colorMap.gray;
  gradient.addColorStop(0, colors.start);
  gradient.addColorStop(1, colors.end);
  return gradient;
}

let currentRange = "week";
window.currentRange = currentRange;
let currentData = null;
let historicalData = null; // Store the fetched data

// Fetch historical data from external source
async function fetchHistoricalData() {
  // Try to load from cache first if historicalData is null
  if (!historicalData) {
    try {
      const result = await chrome.storage.local.get("cachedHistoricalData");
      if (result.cachedHistoricalData) {
        historicalData = result.cachedHistoricalData;
        console.log("Historical data loaded from cache");
      }
    } catch (e) {
      console.warn("Failed to load historical data from cache", e);
    }
  }

  if (!navigator.onLine) {
    if (historicalData) {
      console.warn("User is offline. Using cached data.");
      return historicalData;
    }
    console.warn("User is offline and no cached data available.");
    return null;
  }

  try {
    const url = "https://ziedyahia-57.github.io/Currency-Converter/processed-data.json?t=" + Date.now();
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch historical data");

    historicalData = await response.json();
    console.log("Historical data fetched successfully", historicalData);

    // Save to cache
    chrome.storage.local.set({ cachedHistoricalData: historicalData }, () => {
      console.log("Historical data saved to cache");
    });

    return historicalData;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return historicalData; // Return cached data as fallback on error
  }
}
window.fetchHistoricalData = fetchHistoricalData;

// Get selected currencies from dropdowns
function getSelectedCurrencies() {
  const baseEl = document.querySelector("#chart-base-selected span");
  const quoteEl = document.querySelector("#chart-quote-selected span");
  return {
    base: baseEl ? baseEl.textContent.trim() : "JPY",
    quote: quoteEl ? quoteEl.textContent.trim() : "USD",
  };
}

// Format date for display
function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Format month for display
function formatMonth(date) {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Custom number formatting that respects user preferences
function formatChartNumber(value, minDec, maxDec) {
  const separators = window.chartSeparators || { thousand: ",", decimal: "." };
  
  if (value === 0) return "0" + (minDec > 0 ? separators.decimal + "0".repeat(minDec) : "");
  
  // Use toFixed to get the desired precision
  let formatted = value.toFixed(maxDec);
  let [intPart, decPart] = formatted.split(".");
  
  // Re-apply thousand separators
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separators.thousand);
  
  // Trim or pad decimal part to meet minDec
  if (decPart === undefined) decPart = "";
  decPart = decPart.replace(/0+$/, "");
  if (decPart.length < minDec) {
    decPart = decPart.padEnd(minDec, "0");
  }

  return intPart + (decPart ? separators.decimal + decPart : "");
}

// Helper to format scientific notation for BTC
function formatScientific(value, isHTML = false) {
  if (value === 0) return "0.0";
  let exp = Math.floor(Math.log10(value));
  let base = value / Math.pow(10, exp);

  if (isHTML) {
    return (base.toFixed(1)).replace(".", (window.chartSeparators?.decimal || ".")) + `x10<sup>${exp}</sup>`;
  }

  // Unicode superscripts for Canvas
  const superscripts = {
    0: "\u2070",
    1: "\u00B9",
    2: "\u00B2",
    3: "\u00B3",
    4: "\u2074",
    5: "\u2075",
    6: "\u2076",
    7: "\u2077",
    8: "\u2078",
    9: "\u2079",
    "-": "\u207B",
  };
  const expStr = exp
    .toString()
    .split("")
    .map((char) => superscripts[char] || char)
    .join("");
  return `${base.toFixed(1)}x10${expStr}`;
}

// Determine trend color based on last two data points
function getTrendColor(data, isMissing = false) {
  if (isMissing) return "orange";
  if (data.length < 2) return "gray";

  const lastValue = data[data.length - 1];
  const prevValue = data[data.length - 2];
  const difference = lastValue - prevValue;

  // Use a smaller epsilon for BTC (10 decimals) vs others (5 decimals)
  const { quote } = getSelectedCurrencies();
  const epsilon = quote === "BTC" ? 0.0000000001 : 0.00001;

  if (Math.abs(difference) < epsilon) {
    return "gray";
  } else if (difference > 0) {
    return "green";
  } else {
    return "red";
  }
}

// Check if today's data is missing
function isTodayMissing(data) {
  if (!data || data.length === 0) return true;
  return data[data.length - 1] === 0;
}

// Get trend indicator HTML
function getTrendIndicator(data, isMissing = false) {
  const isLastPointMissing = isTodayMissing(data);
  const effectiveMissing = isMissing || isLastPointMissing;

  if (effectiveMissing) {
    return `<span class="trend-indicator trend-orange">No Data</span>`;
  }
  
  if (data.length < 2) return `<span class="trend-indicator trend-neutral">0.00%</span>`;

  const lastValue = data[data.length - 1];
  const prevValue = data[data.length - 2];
  const difference = lastValue - prevValue;
  const percentage = prevValue !== 0 ? (Math.abs(difference / prevValue) * 100).toFixed(2) : "0.00";

  const { quote } = getSelectedCurrencies();
  const epsilon = quote === "BTC" ? 0.00000001 : 0.00001;

  if (Math.abs(difference) < epsilon) {
    return `<span class="trend-indicator trend-neutral">0.00%</span>`;
  } else if (difference > 0) {
    return `<span class="trend-indicator trend-up">▲ ${percentage}%</span>`;
  } else {
    return `<span class="trend-indicator trend-down">▼ ${percentage}%</span>`;
  }
}

// Process data for charts
async function getChartData(range) {
  if (!historicalData) {
    await fetchHistoricalData();
  }

  if (!historicalData) return null;

  const { base, quote } = getSelectedCurrencies();
  const monthData = historicalData.monthData || {};
  const chartData = historicalData.chartData || {};

  let result = {
    labels: [],
    data: [],
    fullLabels: [],
    range: range,
    isMissing: false,
  };

  const baseMonthData = monthData[base] || [];
  const quoteMonthData = monthData[quote] || [];
  const baseYearData = chartData[base] || [];
  const quoteYearData = chartData[quote] || [];

  if (range === "week" || range === "month") {
    const points = range === "week" ? 7 : 30;
    const masterTimeline = [];
    const end = getEffectiveToday();

    // Generate the last N days (sorted old to new)
    for (let i = points - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(d.getDate() - i);
      masterTimeline.push(d.toISOString().split("T")[0]);
    }

    // Convert data arrays to Maps for $O(1)$ lookup
    const baseMap = new Map(baseMonthData.map((p) => [p.date, p.value]));
    const quoteMap = new Map(quoteMonthData.map((p) => [p.date, p.value]));

    if (masterTimeline.length === 0) {
      result.isMissing = true;
      for (let i = 0; i < points; i++) {
        result.data.push(0);
        result.labels.push("");
        result.fullLabels.push("No data available");
      }
    } else {
      masterTimeline.forEach((dateStr) => {
        const bVal = baseMap.get(dateStr) || 0;
        const qVal = quoteMap.get(dateStr) || 0;

        let rate = bVal > 0 ? qVal / bVal : 0;
        // If quote is BTC, use 8 decimals, otherwise 5
        rate = Number(rate.toFixed(quote === "BTC" ? 10 : 5));
        result.data.push(rate);

        const date = new Date(dateStr);
        const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];

        if (range === "week") {
          result.labels.push(dayLetters[date.getDay()]);
        } else {
          result.labels.push(date.getDay() === 1 ? `${formatDate(date).split(",")[0]}` : "");
        }

        result.fullLabels.push(`${formatDate(date)} (${dayLetters[date.getDay()]})`);
      });

      if (result.data.every((v) => v === 0)) result.isMissing = true;
    }

    result.startDate = new Date(masterTimeline[0]);
    result.endDate = new Date(masterTimeline[masterTimeline.length - 1]);
  } else if (range === "year") {
    // Generate exactly 12 months ending at the current month
    const masterMonths = [];
    const now = window.today || new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      masterMonths.push(`${year}-${month}`);
    }

    const baseMap = new Map(baseYearData.map((p) => [p.month, p.average]));
    const quoteMap = new Map(quoteYearData.map((p) => [p.month, p.average]));

    if (masterMonths.length === 0) {
      result.isMissing = true;
      for (let i = 0; i < 12; i++) result.data.push(0);
    } else {
      masterMonths.forEach((monthStr) => {
        const bVal = baseMap.get(monthStr) || 0;
        const qVal = quoteMap.get(monthStr) || 0;

        let rate = bVal > 0 ? qVal / bVal : 0;
        // If quote is BTC, use 8 decimals, otherwise 5
        rate = Number(rate.toFixed(quote === "BTC" ? 10 : 5));
        result.data.push(rate);

        const [year, month] = monthStr.split("-");
        const date = new Date(year, parseInt(month) - 1);
        const monthAbbr = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
        result.labels.push(monthAbbr[date.getMonth()]);
        result.fullLabels.push(`${formatMonth(date)}`);
      });

      if (result.data.every((v) => v === 0)) result.isMissing = true;
    }

    result.startDate = new Date(masterMonths[0] + "-01");
    const lastMonthStr = masterMonths[masterMonths.length - 1];
    const [y, m] = lastMonthStr.split("-");
    result.endDate = new Date(y, parseInt(m), 0);
  }

  // Update UI texts
  const trendIndicator = getTrendIndicator(result.data, result.isMissing);
  const lastValue = result.data.length > 0 ? result.data[result.data.length - 1] : 0;

  if (range === "year") {
    infoText.innerHTML = `${formatMonth(result.startDate)} - ${formatMonth(result.endDate)} (Monthly Avg.)`;
  } else {
    infoText.innerHTML = `${formatDate(result.startDate)} - ${formatDate(result.endDate)}`;
  }

  const displayValue = formatChartNumber(
    lastValue,
    quote === "BTC" ? 10 : 5,
    quote === "BTC" ? 10 : 5
  );

  if (result.isMissing) {
    valueText.innerHTML = `${displayValue} ${trendIndicator}`;
  } else {
    valueText.innerHTML = `${displayValue} ${trendIndicator}`;
  }

  currentData = result;
  return result;
}
window.generateRandomData = getChartData; // Keep window name for compatibility

// Function to update chart x-axis grid display
function updateXAxisGrid(range) {
  const xAxisConfig = chart.options.scales.x;

  if (range === "month") {
    // For month view: show grid lines for all data points
    xAxisConfig.grid = {
      display: false,
      color: "#4f4f4f5b",
      drawTicks: false,
      drawOnChartArea: true,
    };

    // Update ticks callback to show Monday dates only
    xAxisConfig.ticks.callback = function (value, index) {
      if (this.getLabelForValue(value) === "") {
        return null;
      }
      return this.getLabelForValue(value);
    };
  } else {
    // For week and year views: no x-axis grid
    xAxisConfig.grid = {
      display: false,
    };

    xAxisConfig.ticks.callback = function (value, index) {
      return this.getLabelForValue(value);
    };
  }

  // Optimize Y-axis for currency rates
  const yAxisConfig = chart.options.scales.y;
  yAxisConfig.ticks.callback = function (value) {
    const { quote } = getSelectedCurrencies();
    if (quote === "BTC" && value > 0 && value < 0.0001) {
      return formatScientific(value, false);
    }
    
    // Determine consistent decimal places
    const maxDec = quote === "BTC" ? 10 : 5;
    let minDec = 0;
    
    // If the range is small, use more decimals for consistency
    const range = this.max - this.min;
    if (range < 0.1) {
      minDec = maxDec;
    } else {
      // Calculate precision based on step size
      const step = range / (this.ticks.length - 1 || 1);
      minDec = Math.max(0, Math.min(maxDec, Math.ceil(-Math.log10(step))));
    }

    if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
    if (value === 0) return "0.00";
    
    return formatChartNumber(value, minDec, maxDec);
  };
}

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        fill: true,
        backgroundColor: "rgba(156, 163, 175, 0.45)",
        borderColor: "#9ca3af",
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: "#9ca3af",
        spanGaps: true,
      },
    ],
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#021318b7",
        titleColor: "#e5e7eb",
        bodyColor: "#e5e7eb",
        borderColor: function (context) {
          const val = context.chart.data.datasets[0].data[context.dataIndex];
          const isLastPointMissing = isTodayMissing(context.chart.data.datasets[0].data);
          const effectiveMissing = currentData?.isMissing || isLastPointMissing || val === 0;
          
          const trendColor = getTrendColor(context.chart.data.datasets[0].data, effectiveMissing);
          return trendColor === "green" ? "#10b981" : trendColor === "red" ? "#ef4444" : trendColor === "orange" ? "#ff9800" : "#9ca3af";
        },
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: function (context) {
            const val = context[0].parsed.y;
            if (val === 0) return "No Data";
            // Popup should have 5 or 10 decimal digits
            const { quote } = getSelectedCurrencies();
            return formatChartNumber(val, quote === "BTC" ? 10 : 5, quote === "BTC" ? 10 : 5);
          },
          label: function (context) {
            return currentData?.fullLabels[context.dataIndex] || "";
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#94a3b8",
          maxTicksLimit: 12,
          autoSkip: false,
          callback: function (value, index) {
            return this.getLabelForValue(value);
          },
        },
      },
      y: {
        grid: { color: "#4f4f4f71" },
        ticks: {
          color: "#94a3b8",
          maxTicksLimit: 7,
          callback: function (value) {
            const { quote } = getSelectedCurrencies();
            if (quote === "BTC" && value > 0 && value < 0.0001) {
              return formatScientific(value, false);
            }

            // Determine consistent decimal places
            const maxDec = quote === "BTC" ? 10 : 5;
            let minDec = 0;
            
            // If the range is small, use more decimals for consistency
            const range = this.max - this.min;
            if (range < 0.1) {
              minDec = maxDec;
            } else {
              // Calculate precision based on step size
              const step = range / (this.ticks.length - 1 || 1);
              minDec = Math.max(0, Math.min(maxDec, Math.ceil(-Math.log10(step))));
            }

            if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
            if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
            if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";

            if (value === 0) return "0";

            return formatChartNumber(value, minDec, maxDec);
          },
        },
      },
    },
  },
});

// Update chart when time range button is clicked
document.querySelectorAll(".chart-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    document.querySelectorAll(".chart-btn").forEach((b) => b.classList.remove("focused-btn"));
    button.classList.add("focused-btn");

    currentRange = button.dataset.range;
    window.currentRange = currentRange;

    const newData = await getChartData(currentRange);
    updateXAxisGrid(currentRange);
    updateChartWithData(newData);
  });
});

async function updateChartWithData(newData) {
  if (newData instanceof Promise) {
    newData = await newData;
  }

  if (!newData) {
    newData = await getChartData(currentRange);
  }

  if (!newData) return;

  const isLastPointMissing = isTodayMissing(newData.data);
  const effectiveMissing = newData.isMissing || isLastPointMissing;
  const trendColor = getTrendColor(newData.data, effectiveMissing);

  chart.data.labels = newData.labels;
  chart.data.datasets[0].data = newData.data;
  chart.data.datasets[0].backgroundColor = createGradient(ctx, trendColor);
  chart.data.datasets[0].borderColor =
    trendColor === "green" ? "#10b981" : trendColor === "red" ? "#ef4444" : trendColor === "orange" ? "#ff9800" : "#9ca3af";
  chart.data.datasets[0].pointHoverBackgroundColor =
    trendColor === "green" ? "#10b981" : trendColor === "red" ? "#ef4444" : trendColor === "orange" ? "#ff9800" : "#9ca3af";

  chart.data.datasets[0].borderDash = [];
  chart.data.datasets[0].fill = "start";
  chart.data.datasets[0].pointRadius = 0;

  // Handle missing data: Only set fixed range if ALL data is missing
  if (newData.isMissing) {
    // Set a neutral Y-axis range for missing data to ensure the line is visible at bottom
    chart.options.scales.y.min = 0;
    chart.options.scales.y.max = 2;
  } else {
    // Reset Y-axis to auto-scale
    chart.options.scales.y.min = undefined;
    chart.options.scales.y.max = undefined;
  }

  chart.update();
}
window.updateChartWithData = updateChartWithData;

// Timer to show when the chart data will be updated (Daily at 1:47am UTC)
function startChartUpdateTimer() {
  const timerHm = document.getElementById("timer-hm");
  const timerS = document.getElementById("timer-s");

  if (!timerHm || !timerS) return;

  function update() {
    const now = new Date();
    // Target is today at 1:47am UTC
    let target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 1, 47, 0));

    // If we've passed 1:47am UTC today, target is tomorrow at 1:47am UTC
    if (now >= target) {
      target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 1, 47, 0));
    }

    const diff = target - now;

    if (diff <= 0) {
      // Timer hit zero, refresh the chart data
      console.log("Timer hit zero, refreshing chart...");
      historicalData = null; // Force Refetch
      if (typeof window.initChartsTab === "function") {
        isChartInitialized = false; // Allow re-initialization
        window.initChartsTab();
      }
      return; // Exit current interval loop as it will be restarted by initChartsTab
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Format all values to always have 2 digits
    const hStr = hours.toString().padStart(2, "0");
    const mStr = minutes.toString().padStart(2, "0");
    const sStr = seconds.toString().padStart(2, "0");

    // Display in HH:MM format and :SS separately
    timerHm.textContent = `${hStr}:${mStr}`;
    timerS.textContent = `:${sStr}`;
  }

  update();
  setInterval(update, 1000);
}

// Initial fetch and render
let isChartInitialized = false;
window.initChartsTab = async function() {
  if (isChartInitialized) return;
  isChartInitialized = true;

  // Load formatting separators once
  if (typeof window.getNumberFormatSeparators === "function") {
    window.chartSeparators = await window.getNumberFormatSeparators();
  } else {
    window.chartSeparators = { thousand: ",", decimal: "." };
  }

  await fetchHistoricalData();
  const initialData = await getChartData(currentRange);
  updateXAxisGrid(currentRange);
  updateChartWithData(initialData);
  startChartUpdateTimer();

  // Set initial focused button
  const weekBtn = document.querySelector('[data-range="week"]');
  if (weekBtn) weekBtn.classList.add("focused-btn");
};
