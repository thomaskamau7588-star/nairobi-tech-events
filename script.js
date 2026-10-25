// Create event dates based on today's date
function daysFromNow(days, hour) {
    const date = new Date();

    date.setDate(date.getDate() + days);
    date.setHours(hour, 0, 0, 0);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const time = String(hour).padStart(2, "0");

    return `${year}-${month}-${day}T${time}:00`;
}
