import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useMemo, useState } from 'react';

import DoctorAbout from "./DoctorAbout";
import SlotSelector from '../../../components/common/SlotSelector/SlotSelector';
import { demoDays, demoTimeSlots, DOCTORS } from "../../../utils/doctorsData";
import { formatDateToDayLabel, formatTimeToHHMM } from "../../../utils/dateFormatter";
import './DoctorProfile.css'

import { promiseToast } from "../../../utils/promiseToast";


function DoctorProfile() {

    const { doctorId } = useParams();   // Get doctor ID from URL
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [availableDays, setAvailableDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        document.title = "HAMS | Doctor Profile";
    }, []);


    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`http://localhost:8080/doctors/${doctorId}`);

                const fromBackEnd = await response.json();

                if (!response.ok) {
                    // Backend validation failed → show exact error
                    setError(fromBackEnd.message);
                    console.log(fromBackEnd);
                    return;
                }

                setDoctor(fromBackEnd);
                console.log(fromBackEnd);
            } catch (error) {
                console.error(error);
                setDoctor(DOCTORS.find(doc => doc.id === parseInt(doctorId)));
                setError("Unable to load doctors. Showing offline data.");
            }
        };
        fetchDoctor();
    }, [doctorId]);


    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await fetch(`http://localhost:8080/doctors/${doctorId}/availability`);

                const fromBackEnd = await response.json();

                if (!response.ok) {
                    // Backend validation failed → show exact error
                    console.log(fromBackEnd);
                    return;
                }

                console.log(fromBackEnd);
                const formattedDays = fromBackEnd.map(dayObj => ({
                    day: formatDateToDayLabel(dayObj.date), // "TUE 30" for UI
                    rawDate: dayObj.date,                   // "2025-12-30" for backend
                    timeSlots: dayObj.timeSlots,
                    slotDuration: dayObj.slotDuration
                }));

                setAvailableDays(formattedDays);

                // Auto-select first day
                if (formattedDays.length > 0) setSelectedDay(formattedDays[0].day);
            } catch (error) {
                console.error(error);
                // Fallback to demo data
                setAvailableDays(demoDays.map(day => ({
                    day,
                    slotDuration: 30,
                    timeSlots: demoTimeSlots
                })))
                setSelectedDay(demoDays[0]);
                // setBookingError("Unable to load doctor availability. Showing offline data.");
            }
        }
        fetchAvailability();
    }, [doctorId]);


    // Reset selected time whenever a new day is selected
    useEffect(() => setSelectedTime(''), [selectedDay]);


    // Display next 6 days for booking
    const days = useMemo(() => availableDays.map(d => d.day), [availableDays]);


    // Time slots
    const selectedDayObject = useMemo(() =>
        availableDays.find(d => d.day === selectedDay),
        [availableDays, selectedDay]);


    const timeSlots = useMemo(() =>
        selectedDayObject ? selectedDayObject.timeSlots.map(t => formatTimeToHHMM(t)) : [],
        [selectedDayObject]);


    const handleBookAppointment = async () => {
        if (loading) return;   // prevent double click

        try {
            setLoading(true);

            await promiseToast(
                "http://localhost:8080/appointments/book",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        doctorId: doctor.id,
                        appointmentDate: selectedDayObject.rawDate,
                        appointmentTime: selectedTime
                    }),
                },
                {
                    loading: "Booking appointment...",
                    success: (data) => data.message,
                    error: (err) => err.message
                }
            );


            setTimeout(() => {
                navigate("/my-appointments");
            }, 1500);

        } catch (error) {
            console.error("Booking error:", error);
        }
        finally {
            setLoading(false);
        }
    };


    // Disable booking if no selection
    const disableBooking = loading || !selectedDay || !selectedTime;


    // Prevent render before API response
    if (!doctor)
        return <small className="error-msg error-msg-2" style={{ marginTop: "120px" }}>
            {error || "Loading doctor information..."}
        </small>;


    return (
        <section className="doctor-profile-section">
            <div className="doctor-header">
                <img src={doctor.imageUrl} alt={doctor.name} />

                <div className='doctor-basic-info'>
                    <h1>{doctor.name}</h1>
                    <p><span className='gradient-highlight'>{doctor.qualifications}</span> - {doctor.specialty}</p>

                    <div className='doctor-experience'>
                        <i className="fa-solid fa-briefcase gradient-highlight"></i>
                        <span>{doctor.experience} years Experience</span>
                    </div>
                </div>
            </div>

            <small className="error-msg error-msg-2">{error}</small>

            <section className='profile-content'>
                {/* Left Column */}
                <DoctorAbout
                    name={doctor.name}
                    languages={doctor.languages}
                    consultationFee={doctor.consultationFee}
                    selectedDayObject={selectedDayObject}
                />

                {/* Right Column */}
                <section className='right-column'>
                    <div className='booking-section'>
                        <h2>Booking slots</h2>

                        {/* Days Selection */}
                        <SlotSelector
                            title="Select Day"
                            items={days}
                            selectedItem={selectedDay}
                            onSelect={setSelectedDay}
                        />

                        {/* Time Slots */}
                        <SlotSelector
                            title="Select Time"
                            items={timeSlots}
                            selectedItem={selectedTime}
                            onSelect={setSelectedTime}
                        />

                        {/* Book Button */}
                        <button
                            className='btn-1 btn-2 book-appointment-btn'
                            onClick={handleBookAppointment}
                            disabled={disableBooking}
                        >
                            {loading ? "Booking..." : "Book an appointment"}
                        </button>

                        <div className='booking-note'>
                            <i className="fa-solid fa-info-circle gradient-highlight"></i>
                            <span>Appointment confirmation will be sent via email.</span>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default DoctorProfile