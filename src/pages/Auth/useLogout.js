import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { promiseToast } from "../../utils/promiseToast";

export const useLogout = () => {
    const navigate = useNavigate();
    const intervalRef = useRef(null);

    // Manual Logout
    const logout = useCallback(async () => {
        // Stop Auto Logout immediately
        if (intervalRef.current) clearInterval(intervalRef.current);

        try {
            await promiseToast(
                "http://localhost:8080/auth/logout",
                {
                    method: "POST",
                    credentials: "include",
                },
                {
                    loading: "Logging out...",
                    success: (data) => data.message,
                    error: (err) => err.message
                }
            );

        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Always clear local data
            localStorage.clear();

            navigate("/login");
        }

    }, [navigate]);


    // Auto Logout (ping backend every 1 minute)
    useEffect(() => {

        // Only start pinging if user is logged in
        if (!localStorage.getItem("email") || !localStorage.getItem("role")) return;

        const checkAutoLogout = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/auth/check",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );


                // Session expired or cookie missing → auto logout
                if (!response.ok) {

                    if (intervalRef.current) clearInterval(intervalRef.current);

                    localStorage.clear();

                    toast.error("Session expired. You have been logged out.");

                    navigate("/login");
                }

            } catch (error) {

                console.error("Auto logout error:", error);

                if (intervalRef.current) clearInterval(intervalRef.current);

                localStorage.clear();

                toast.error("Server unreachable. You have been logged out.");

                navigate("/login");
            }
        };

        // Run immediately on mount
        checkAutoLogout();

        // Check every 1 minute
        intervalRef.current = setInterval(checkAutoLogout, 60000);

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };

    }, [navigate]);

    return { logout }; // return logout function
};