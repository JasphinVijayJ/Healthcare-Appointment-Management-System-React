import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const intervalRef = useRef(null);

    // Manual Logout
    const logout = useCallback(async () => {
        // Stop Auto Logout immediately
        if (intervalRef.current) clearInterval(intervalRef.current);

        try {
            const response = await fetch("http://localhost:8080/auth/logout", {
                method: "POST",
                credentials: "include", // sends jwt cookie to backend to clear it
            });

            if (response.ok) {
                const data = await response.json();
                // setPopup({ show: true, message: data.message, type: "success" });

                localStorage.clear(); // clear immediately id, email, role to prevent auto-logout on refresh

                // Auto-hide popup after 2.2s and navigate
                setTimeout(() => {
                    // setPopup({ show: false, message: "", type: "success" });

                    navigate("/login");
                }, 2200);
            } else {
                console.error("Logout failed:", response.status);

                localStorage.clear();
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout error:", error);

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
                const response = await fetch("http://localhost:8080/auth/check", {
                    method: "GET",
                    credentials: "include", // browser sends jwt cookie to backend automatically
                });

                if (!response.ok) {
                    // Cookie expired or missing → auto logout
                    // setPopup({ show: true, message: "Session expired. You have been logged out.", type: "error" });

                    if (intervalRef.current) clearInterval(intervalRef.current);

                    localStorage.clear();

                    // Auto-hide popup after 3s and navigate
                    setTimeout(() => {
                        // setPopup({ show: false, message: "", type: "error" });

                        navigate("/login");
                    }, 3000);
                }

            } catch {
                // Server unreachable → auto logout
                // setPopup({ show: true, message: "Server unreachable. You have been logged out.", type: "error" });

                // Auto-hide popup after 3s and navigate
                setTimeout(() => {
                    // setPopup({ show: false, message: "", type: "error" });

                    if (intervalRef.current) clearInterval(intervalRef.current);

                    localStorage.clear();
                    navigate("/login");
                }, 3000);
            }
        };

        checkAutoLogout(); // run immediately on mount

        intervalRef.current = setInterval(checkAutoLogout, 60000); // check every 1 minute
        return () => clearInterval(intervalRef.current);          // cleanup on unmount
    }, [navigate]);

    return { logout }; // return logout function and popup state
};