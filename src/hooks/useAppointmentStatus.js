import { useState } from "react";
import { promiseToast } from "../utils/promiseToast";


export const useAppointmentStatus = () => {

    const [loadingId, setLoadingId] = useState(null);


    const updateAppointmentStatus = async (id, status, setAppointments) => {
        if (loadingId === id) return;

        setLoadingId(id);

        try {
            const response = await promiseToast(
                `http://localhost:8080/appointments/update-status?appointmentId=${id}&status=${status}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
                {
                    loading: "Updating appointment...",
                    success: (data) => data.message,
                    error: (err) => err.message
                }
            );


            setAppointments((prev) =>
                prev.map((a) =>
                    a.appointmentId === id ? { ...a, status: response.data } : a));

            console.log(response);

        } catch (error) {
            console.error("Update status error:", error);
        } finally {
            setLoadingId(null);
        }
    };


    return {
        loadingId,
        updateAppointmentStatus
    };
};