import { useEffect, useState } from "react";
import { promiseToast } from "../../../utils/promiseToast";
import { formatTimeToHHMM, getButtonText, isPastAppointment } from "../../../utils/dateFormatter";
import "./MyAppointments.css"

function MyAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState({});
    const [error, setError] = useState("");


    useEffect(() => {
        document.title = "HAMS | My Appointments";

        fetchMyAppointments();
    }, []);


    const fetchMyAppointments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/appointments/my-appointments`,
                {
                    credentials: "include", // required to send/receive cookies
                }
            );

            const fromBackEnd = await response.json();

            if (!response.ok) {
                // Backend validation failed → show exact error
                setError(fromBackEnd.message);
                console.log(fromBackEnd);
                return;
            }

            setAppointments(fromBackEnd);
            console.log(fromBackEnd);
        } catch (error) {
            console.error("Fetch appointments error:", error);
            setError("Error: Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };


    const handleCancelAppointment = async (appointmentId) => {
        // prevent double click
        if (cancelLoading[appointmentId]) return;

        try {
            setCancelLoading(prev => ({ ...prev, [appointmentId]: true }));

            const response = await promiseToast(
                `http://localhost:8080/appointments/${appointmentId}/cancel`,
                {
                    method: "PUT",
                    credentials: "include",
                },
                {
                    loading: "Cancelling appointment...",
                    success: (data) => data.message,
                    error: (err) => err.message
                }
            );


            console.log(response);

            setAppointments(prev => prev.map(a =>
                a.appointmentId === appointmentId
                    ? { ...a, status: "CANCELLED" }
                    : a
            ));

        } catch (error) {
            console.error("Cancel error:", error);
        }
        finally {
            setCancelLoading(prev => ({ ...prev, [appointmentId]: false }));
        }
    };


    return (
        <section className="my-appointments">
            <h2 className="gradient-highlight">My Appointments</h2>

            {error && <small className="error-msg error-msg-2">{error}</small>}

            {loading ? (
                <small className="error-msg error-msg-2" style={{ marginTop: "20px" }}>Loading appointments...</small>
            ) : appointments.length === 0 ? (
                <p className="no-appointments">No appointments found.</p>
            ) : (
                appointments.map((app) => {

                    const isExpired = isPastAppointment(
                        app.appointmentDate,
                        app.appointmentTime
                    );
                    return (
                        <div className="appointments-container" key={app.appointmentId}>
                            <div className="appointment-card">
                                <img src={app.doctorImage} alt={app.doctorName} />

                                <div className="appointment-details">
                                    <h3 className="gradient-highlight">{app.doctorName}</h3>
                                    <p><span>Specialty:</span> {app.doctorSpecialty}</p>
                                    <p><span>Date & Time:</span> {app.appointmentDate} | {formatTimeToHHMM(app.appointmentTime)}</p>
                                    <p><span>Status:</span> {app.status}</p>
                                    <p><span>Consultation Fee:</span> ₹{app.doctorFee}</p>
                                </div>
                            </div>

                            <button
                                className={`btn-1 btn-2 cancel-btn ${app.status.toLowerCase()} ${(app.status === "BOOKED" && isExpired) ? "expired" : ""}`}
                                onClick={() => handleCancelAppointment(app.appointmentId)}
                                disabled={
                                    cancelLoading[app.appointmentId] ||
                                    app.status !== "BOOKED" ||
                                    isExpired
                                }
                            >
                                {cancelLoading[app.appointmentId]
                                    ? "Cancelling..."
                                    : getButtonText(app.status, isExpired)}
                            </button>
                        </div>
                    );
                })
            )}
        </section>
    )
}
export default MyAppointments