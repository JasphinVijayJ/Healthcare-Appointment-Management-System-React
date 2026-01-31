import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APPOINTMENTS } from "../../../data/appointmentsData";
import { formatTimeToHHMM, getCancelButtonText, isPastAppointment } from "../../../utils/dateFormatter";
import "./MyAppointments.css"

function MyAppointments() {

    const { patientId } = useParams();   // Get patient ID from URL
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "HAMS | My Appointments";
    }, []);

    useEffect(() => {
        const fetchMyAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/appointments/patient/${patientId}`);

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
                console.log(error);
                setAppointments(APPOINTMENTS.filter(a => a.patientId === parseInt(patientId)));
                setError("Unable to load appointments. Showing offline data.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyAppointments();
    }, [patientId]);

    const handleCancelAppointment = async (appointmentId) => {
        // prevent double click
        if (cancelLoading[appointmentId]) return;

        try {
            setCancelLoading(prev => ({ ...prev, [appointmentId]: true }));
            const response = await fetch(`http://localhost:8080/appointments/${appointmentId}/cancel?patientId=${patientId}`, { method: "PUT" });

            const fromBackEnd = await response.json();

            if (!response.ok) {
                // Backend validation failed → show exact error
                setError(fromBackEnd.message);
                console.log(fromBackEnd);
                return;
            }

            setAppointments(prev => prev.map(a =>
                a.appointmentId === appointmentId
                    ? { ...a, status: "CANCELLED" }
                    : a
            ));

        } catch (error) {
            console.error(error);
            setError("Error: Server error. Please try again later.");
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
                                className={`btn-1 btn-2 cancel-btn 
                                    ${app.status === "CANCELLED" ? "cancelled" : ""} 
                                    ${app.status === "COMPLETED" ? "completed" : ""}
                                `}
                                onClick={() => handleCancelAppointment(app.appointmentId)}
                                disabled={
                                    cancelLoading[app.appointmentId] ||
                                    app.status === "CANCELLED" ||
                                    app.status === "COMPLETED" ||
                                    isExpired
                                }
                            >
                                {cancelLoading[app.appointmentId]
                                    ? "Cancelling..."
                                    : getCancelButtonText(app.status, isExpired)}
                            </button>
                        </div>
                    );
                })
            )}
        </section>
    )
}
export default MyAppointments