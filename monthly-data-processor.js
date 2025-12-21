function safeToISOString(date) {
    try {
        if (!date || isNaN(date.getTime())) {
            console.log('Warning: Invalid date, using current date');
            return new Date().toISOString();
        }
        return date.toISOString();
    } catch (error) {
        console.log(`Error converting date to ISO string: ${error.message}`);
        return new Date().toISOString();
    }
}

function safeToDateString(date) {
    try {
        if (!date || isNaN(date.getTime())) {
            console.log('Warning: Invalid date, using current date');
            return new Date().toISOString().split('T')[0];
        }
        return date.toISOString().split('T')[0];
    } catch (error) {
        console.log(`Error converting date to string: ${error.message}`);
        return new Date().toISOString().split('T')[0];
    }
}
