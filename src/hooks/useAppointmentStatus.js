import { useState } from "react";

export const useAppointmentStatus = () => {
    const [loadingId, setLoadingId] = useState(null);

    const updateAppointmentStatus = async (id, status, setAppointments) => {
        if (loadingId === id) return;

        setLoadingId(id);

        try {
            const response = await fetch(`http://localhost:8080/appointments/update-status?appointmentId=${id}&status=${status}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const fromBackEnd = await response.json();

            if (!response.ok) {
                // Backend validation failed → show exact error
                console.log(fromBackEnd);
                return;
            }


            setAppointments((prev) =>
                prev.map((a) =>
                    a.appointmentId === id ? { ...a, status: fromBackEnd.data } : a));

            console.log(fromBackEnd);

        } catch (error) {
            console.error("Network Error:", error);
        } finally {
            setLoadingId(null);
        }
    };

    return {
        loadingId,
        updateAppointmentStatus
    };
};