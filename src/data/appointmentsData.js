import D1 from '../assets/Doctors/d-1.jpg'
import D2 from '../assets/Doctors/d-2.jpg'
import D3 from '../assets/Doctors/d-3.jpg'
import D4 from '../assets/Doctors/d-4.jpg'
import D5 from '../assets/Doctors/d-5.jpg'

export const APPOINTMENTS = [
    {
        appointmentId: 1,
        patientId: 1,
        appointmentDate: "2026-01-01",
        appointmentTime: "13:00:00",
        status: "BOOKED",
        doctorId: 2,
        doctorName: "Dr. James Chen",
        doctorSpecialty: "Cardiology",
        doctorFee: 600.0,
        doctorImage: D1
    },
    {
        appointmentId: 2,
        patientId: 1,
        appointmentDate: "2026-01-01",
        appointmentTime: "15:30:00",
        status: "BOOKED",
        doctorId: 2,
        doctorName: "Dr. James Chen",
        doctorSpecialty: "Cardiology",
        doctorFee: 600.0,
        doctorImage: D2
    },
    {
        appointmentId: 3,
        patientId: 2,
        appointmentDate: "2026-01-06",
        appointmentTime: "10:30:00",
        status: "BOOKED",
        doctorId: 2,
        doctorName: "Dr. James Chen",
        doctorSpecialty: "Cardiology",
        doctorFee: 600.0,
        doctorImage: D3
    },
    {
        appointmentId: 4,
        patientId: 2,
        appointmentDate: "2026-01-10",
        appointmentTime: "09:00:00",
        status: "CANCELLED",
        doctorId: 5,
        doctorName: "Dr. Ananya Rao",
        doctorSpecialty: "Dermatology",
        doctorFee: 450.0,
        doctorImage: D4
    },
    {
        appointmentId: 5,
        patientId: 2,
        appointmentDate: "2026-01-15",
        appointmentTime: "18:00:00",
        status: "COMPLETED",
        doctorId: 3,
        doctorName: "Dr. Michael Smith",
        doctorSpecialty: "Orthopedics",
        doctorFee: 700.0,
        doctorImage: D5
    }
];
