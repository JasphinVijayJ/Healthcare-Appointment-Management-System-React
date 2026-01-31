import { useEffect, useState } from 'react';
import { DOCTORS } from '../data/doctorsData';

export const useDoctors = () => {

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:8080/doctors/list");

                if (!response.ok)
                    throw new Error(`Server responded with status ${response.status}`);

                const backendDoctors = await response.json();

                if (Array.isArray(backendDoctors)) {
                    // Backend returned a list of doctors
                    setDoctors(backendDoctors);
                    console.log(backendDoctors);
                } else if (backendDoctors.message) {
                    // Backend returned a message (no doctors)
                    setErrorMessage(backendDoctors.message);
                    console.log(backendDoctors);
                }
            } catch (error) {
                console.error("Failed to fetch doctors details from server:", error);
                setDoctors(DOCTORS);
                setErrorMessage("Unable to load doctors. Showing offline data.");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    return { doctors, loading, errorMessage };
};