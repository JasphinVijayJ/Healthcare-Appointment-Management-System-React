
// Convert backend date string (YYYY-MM-DD) to UI label like "TUE 15"
export const formatDateToDayLabel = (dateString) => {

    const date = new Date(dateString);
    // Convert backend string to JS Date object

    const day = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    // Get short weekday like MON, TUE

    const dayOfMonth = date.getDate();
    // Get numeric day of month like 15, 30

    return `${day} ${dayOfMonth}`;
    // Combine as "TUE 15"
};


// Convert backend time string (HH:mm:ss) to "HH:mm"
export const formatTimeToHHMM = (timeString) => {
    // Example input: "10:20:00"

    const [hours, minutes] = timeString.split(":");
    // Split the string by ":" → ["10", "20", "00"]
    // hours = "10", minutes = "20"
    // We ignore the seconds ("00") because we only want "HH:MM"

    return `${hours}:${minutes}`;
    // Combine hours and minutes → "10:20"
};


// Checks whether an appointment date & time is already in the past
export const isPastAppointment = (date, time) => {
    // JavaScript understands date-time only in this format: YYYY-MM-DDTHH:mm
    //
    // Example: date = "2026-01-01" time = "13:00"
    // Result → "2026-01-01T13:00"
    const dateTimeString = date + "T" + time;

    // Convert the string into a JavaScript Date object
    // Result example: Thu Jan 01 2026 13:00:00
    const appointmentDateTime = new Date(dateTimeString);

    // Get the current date & time
    // Example: Fri Jan 02 2026 10:00:00
    const currentDateTime = new Date();

    // Compare appointment time with current time
    if (appointmentDateTime < currentDateTime)
        return true;   // Appointment already expired

    // Otherwise, appointment is in the future
    // returns {boolean} true = past appointment, false = future appointment
    return false;
};


export const getButtonText = (status, isExpired) => {

    if (status === "BOOKED" && isExpired) {
        return "Expired";
    }
    
    switch (status) {
        case "BOOKED":
        return "Cancel Appointment";

        case "CANCELLED":
            return "Cancelled";

        case "COMPLETED":
            return "Completed";

        case "REJECTED":
            return "Rejected";

        default:
            return "Unavailable !!";
    }
};


export const formatTimeToAMPM = (timeString) => {

    // Split backend time string by ":"
    // Example input: "09:00:00"
    // Result: ["09", "00", "00"]
    const [hours, minutes] = timeString.split(":");

    // Create a new Date object (today’s date used internally)
    const date = new Date();

    // Set hours from backend value
    date.setHours(hours);

    // Set minutes from backend value
    date.setMinutes(minutes);

    // Convert Date object into AM/PM format
    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    // Example output: "09:00 AM"
    return formattedTime;
};


export const formatDateToLong = (dateString) => {

    // Convert backend string (YYYY-MM-DD) into JavaScript Date object
    // Example input: "2026-05-10"
    // Result: Sun May 10 2026 00:00:00 GMT...
    const date = new Date(dateString);

    // Convert Date object into readable format
    // weekday: not included
    // day: 2-digit number (10)
    // month: short name (May → May / Jan → Jan)
    // year: full year (2026)
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",   // 👈 KEY CHANGE: gives 3-letter month (Jan, Feb, Mar...)
        year: "numeric",
    });

    // Return final UI string
    // Example output: "10 May 2026"
    return formattedDate;
};