import { Link } from "react-router-dom"
import './DoctorCard.css'

function DoctorCard({ doctor }) {
    return (
        <div className='doctor-card'>
            <img src={doctor.imageUrl} alt={doctor.name} className='doctor-image' loading="lazy" />

            <div className='doctor-info'>
                <h3>{doctor.name}</h3>
                <p className='gradient-highlight'>{doctor.specialty}</p>

                <div className='doctor-qualifications'>
                    <i className="fa-solid fa-graduation-cap gradient-highlight"></i>
                    <span>{doctor.qualifications}</span>
                </div>

                <div className='doctor-qualifications'>
                    <i className="fa-solid fa-briefcase gradient-highlight"></i>
                    <span>{doctor.experience} years Experience</span>
                </div>
            </div>

            <Link to={`/doctor-profile/${doctor.id}`} className='btn-1 btn-doctor-card'>View Profile</Link>
        </div>
    )
}

export default DoctorCard