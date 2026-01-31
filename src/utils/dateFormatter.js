
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

export const getCancelButtonText = (status, isExpired) => {

    switch (status) {
        case "CANCELLED":
            return "Appointment Cancelled";

        case "COMPLETED":
            return "Completed";

        default:
            return isExpired ? "Expired" : "Cancel Appointment";
    }
};