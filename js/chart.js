const ctx = document.getElementById("chart").getContext("2d");
const testDateInput = document.getElementById("testDate");
const infoText = document.getElementById("infoText");
const valueText = document.getElementById("valueText");

// Set default test date to today and disable the input
const today = new Date();
today.setHours(0, 0, 0, 0);
testDateInput.value = today.toISOString().split("T")[0];
testDateInput.disabled = true; // Disable the input so it can't be changed
testDateInput.style.opacity = "0.7"; // Visual cue that it's disabled

// Create gradient contexts for different trends
function createGradient(ctx, color, isUp) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 170);
  if (isUp) {
    gradient.addColorStop(
      0,
      color === "green"
        ? "rgba(16, 185, 129, 0.45)"
        : color === "red"
        ? "rgba(239, 68, 68, 0.45)"
        : "rgba(156, 163, 175, 0.45)"
    );
    gradient.addColorStop(
      1,
      color === "green" ? "rgba(16, 185, 129, 0)" : color === "red" ? "rgba(239, 68, 68, 0)" : "rgba(156, 163, 175, 0)"
    );
  } else {
    gradient.addColorStop(
      0,
      color === "green"
        ? "rgba(16, 185, 129, 0.45)"
        : color === "red"
        ? "rgba(239, 68, 68, 0.45)"
        : "rgba(156, 163, 175, 0.45)"
    );
    gradient.addColorStop(
      1,
      color === "green" ? "rgba(16, 185, 129, 0)" : color === "red" ? "rgba(239, 68, 68, 0)" : "rgba(156, 163, 175, 0)"
    );
  }
  return gradient;
}

let currentRange = "week";
let currentData = null;
let cachedMonthData = null; // Cache the month data for reuse

// Format date for display
function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Format month for display
function formatMonth(date) {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Determine trend color based on last two data points
function getTrendColor(data) {
  if (data.length < 2) return "gray";

  const lastValue = data[data.length - 1];
  const prevValue = data[data.length - 2];
  const difference = lastValue - prevValue;

  // Use a small epsilon for floating point comparison
  const epsilon = 0.001;

  if (Math.abs(difference) < epsilon) {
    return "gray";
  } else if (difference > 0) {
    return "green";
  } else {
    return "red";
  }
}

// Get trend indicator HTML
function getTrendIndicator(data) {
  if (data.length < 2) return "";

  const lastValue = data[data.length - 1];
  const prevValue = data[data.length - 2];
  const difference = lastValue - prevValue;
  const percentage = prevValue !== 0 ? (Math.abs(difference / prevValue) * 100).toFixed(1) : "0.0";

  const epsilon = 0.001;

  if (Math.abs(difference) < epsilon) {
    return `<span class="trend-indicator trend-neutral">0.0%</span>`;
  } else if (difference > 0) {
    return `<span class="trend-indicator trend-up">▲ ${percentage}%</span>`;
  } else {
    return `<span class="trend-indicator trend-down">▼ ${percentage}%</span>`;
  }
}

// Generate month data (30 days) - this will be our base dataset
function generateMonthData(testDate) {
  const endDate = new Date(testDate);
  endDate.setHours(23, 59, 59, 999);

  let labels = [];
  let data = [];
  let fullLabels = [];
  let startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);

  // Use consistent random seed based on testDate for reproducibility
  const seed = testDate.getTime();
  const seededRandom = (index) => {
    const x = Math.sin(seed + index * 1000) * 10000;
    return x - Math.floor(x);
  };

  // Generate 30 days of data
  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    let displayLabel = "";
    if (currentDate.getDay() === 1) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      displayLabel = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}`;
    }

    labels.push(displayLabel);

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    fullLabels.push(
      `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()} (${dayNames[currentDate.getDay()].substring(
        0,
        3
      )})`
    );

    const randomValue = 20 + seededRandom(i) * 80;
    data.push(parseFloat(randomValue.toFixed(2)));
  }

  return {
    labels,
    data,
    fullLabels,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };
}

// Generate year data (12 months)
function generateYearData(testDate) {
  const endDate = new Date(testDate);
  endDate.setHours(23, 59, 59, 999);

  let labels = [];
  let data = [];
  let fullLabels = [];
  let startDate = new Date(endDate);
  startDate.setMonth(endDate.getMonth() - 11);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  // Use consistent random seed based on testDate for reproducibility
  const seed = testDate.getTime();
  const seededRandom = (index) => {
    const x = Math.sin(seed + index * 1000) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < 12; i++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + i);

    const monthAbbr = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    labels.push(monthAbbr[currentDate.getMonth()]);

    const fullMonthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    fullLabels.push(`${fullMonthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`);

    const randomValue = 200 + seededRandom(i) * 800;
    data.push(parseFloat(randomValue.toFixed(2)));
  }

  return {
    labels,
    data,
    fullLabels,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };
}

// Generate data for different ranges
function generateRandomData(range, testDate) {
  const endDate = new Date(testDate);
  endDate.setHours(23, 59, 59, 999);

  let result = null;

  switch (range) {
    case "week": // Last 7 days (taken from last 7 points of 30-day data)
      // Generate or use cached month data
      if (!cachedMonthData || cachedMonthData.endDate.getTime() !== endDate.getTime()) {
        cachedMonthData = generateMonthData(testDate);
      }

      // Take the last 7 data points
      const weekData = cachedMonthData.data.slice(-7);
      const weekLabels = [];
      const weekFullLabels = cachedMonthData.fullLabels.slice(-7);
      const weekStartDate = new Date(cachedMonthData.startDate);
      weekStartDate.setDate(weekStartDate.getDate() + 23); // Start at day 24 (7 days from end)

      // Create day labels for week view
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(weekStartDate);
        currentDate.setDate(weekStartDate.getDate() + i);
        const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];
        weekLabels.push(dayLetters[currentDate.getDay()]);
      }

      result = {
        labels: weekLabels,
        data: weekData,
        fullLabels: weekFullLabels,
        range: "week",
        startDate: new Date(weekStartDate),
        endDate: new Date(endDate),
      };

      const weekTrendIndicator = getTrendIndicator(weekData);
      const lastValue = weekData[weekData.length - 1];
      infoText.innerHTML = `${formatDate(result.startDate)} - ${formatDate(result.endDate)}`;
      valueText.innerHTML = `${lastValue.toFixed(2)} ${weekTrendIndicator}`;
      break;

    case "month": // Last 30 days
      result = generateMonthData(testDate);
      result.range = "month";

      const monthTrendIndicator = getTrendIndicator(result.data);
      const monthLastValue = result.data[result.data.length - 1];
      infoText.innerHTML = `${formatDate(result.startDate)} - ${formatDate(result.endDate)}`;
      valueText.innerHTML = `${monthLastValue.toFixed(2)} ${monthTrendIndicator}`;

      // Cache the month data for week view
      cachedMonthData = result;
      break;

    case "year": // Last 12 months
      result = generateYearData(testDate);
      result.range = "year";

      const yearTrendIndicator = getTrendIndicator(result.data);
      const yearLastValue = result.data[result.data.length - 1];
      infoText.innerHTML = `${formatMonth(result.startDate)} - ${formatMonth(result.endDate)}`;
      valueText.innerHTML = `${yearLastValue.toFixed(2)} ${yearTrendIndicator}`;
      break;
  }

  currentData = result;
  return result;
}

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
}

// Initialize chart with today's data
const initialData = generateRandomData(currentRange, today);
const initialTrendColor = getTrendColor(initialData.data);

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: initialData.labels,
    datasets: [
      {
        data: initialData.data,
        fill: true,
        backgroundColor: createGradient(ctx, initialTrendColor),
        borderColor: initialTrendColor === "green" ? "#10b981" : initialTrendColor === "red" ? "#ef4444" : "#9ca3af",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor:
          initialTrendColor === "green" ? "#10b981" : initialTrendColor === "red" ? "#ef4444" : "#9ca3af",
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
          const trendColor = getTrendColor(context.chart.data.datasets[0].data);
          return trendColor === "green" ? "#10b981" : trendColor === "red" ? "#ef4444" : "#9ca3af";
        },
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: function (context) {
            return context[0].parsed.y.toFixed(2);
          },
          label: function (context) {
            return currentData.fullLabels[context.dataIndex];
          },
          afterLabel: function () {
            return null;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Initially no grid for week view
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
            if (currentRange === "year" && value >= 1000) {
              return (value / 1000).toFixed(0) + "K";
            }
            return value;
          },
        },
      },
    },
  },
});

// Set initial grid display based on current range
updateXAxisGrid(currentRange);

const weekButton = document.querySelector('[data-range="week"]');
if (weekButton) {
  weekButton.classList.add("focused-btn");
}

// Update chart when time range button is clicked
document.querySelectorAll(".chart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("button").forEach((b) => b.classList.remove("focused-btn"));
    button.classList.add("focused-btn");

    currentRange = button.dataset.range;
    // Always use today's date
    const newData = generateRandomData(currentRange, today);

    // Update grid display before updating chart
    updateXAxisGrid(currentRange);
    updateChartWithData(newData);
  });
});

// Remove the date change listener since we always want today
// testDateInput.addEventListener('change', () => {
//   const testDate = new Date(testDateInput.value);
//   const newData = generateRandomData(currentRange, testDate);
//
//   // Update grid display before updating chart
//   updateXAxisGrid(currentRange);
//   updateChartWithData(newData);
// });

function updateChartWithData(newData) {
  const trendColor = getTrendColor(newData.data);

  chart.data.labels = newData.labels;
  chart.data.datasets[0].data = newData.data;
  chart.data.datasets[0].backgroundColor = createGradient(ctx, trendColor);
  chart.data.datasets[0].borderColor =
    trendColor === "green" ? "#10b981" : trendColor === "red" ? "#ef4444" : "#9ca3af";
  chart.data.datasets[0].pointHoverBackgroundColor =
    trendColor === "green" ? "#10b981" : trendColor === "red" ? "#ef4444" : "#9ca3af";

  chart.update();
}

// Remove the test function since we don't want to change the date
// function testDataConsistency() {
//   // This function changes the date, so we remove it
// }

// Remove the test call since we don't want to run it
// testDataConsistency();
