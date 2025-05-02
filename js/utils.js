function formatNumberWithCommas(value) {
    if (value === "" || value === ".") return value;

    value = String(value);
    let [integer, decimal] = value.split(".");
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return decimal !== undefined ? `${integer}.${decimal}` : integer;
}

function updateLastUpdateElement(element, isOnline, lastUpdated = null) {
    if (!element) return;

    if (isOnline) {
        element.innerHTML = `<span class="green">● Online</span> - Exchange rates are automatically <br> updated once per day.`;
    } else if (lastUpdated) {
        element.innerHTML = `<span class="red">● Offline</span> - Exchange rates may be outdated. <br> Last Updated Date: <span class="date">${lastUpdated}</span>`;
    } else {
        element.innerHTML = `<span class="red">● Offline</span> - No saved exchange rates found.`;
    }
}

export { formatNumberWithCommas, updateLastUpdateElement };