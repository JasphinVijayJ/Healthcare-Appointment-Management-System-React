import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDoctors } from '../../../hooks/useDoctors'
import aboutImage from '../../../assets/about-us-image.png'
import DoctorCard from '../../../components/common/DoctorCard/DoctorCard'
import CTA from '../../../components/common/CTA'
import './About.css'

function About() {

    const { doctors, loading, errorMessage } = useDoctors();

    useEffect(() => {
        document.title = "HAMS | About Us";
    }, []);

    return (
        <>
            <section className='about-us'>
                <div className='about-background-img'></div>

                <div className='about-intro'>
                    <h1 className='gradient-highlight'>About Us</h1>
                </div>
            </section>

            <section className='about-section'>
                <div className='about-image'>
                    <img src={aboutImage} alt="about-section-image" />
                </div>

                <div className='about-content'>
                    <h2 className='gradient-highlight'>Quality Healthcare Services by Our Specialists</h2>

                    <p>Whether it's an emergency treatment, a routine checkup, or a
                        detailed consultation, our doctors ensure you get the best care.
                    </p>
                    <p>
                        We provide comprehensive medical services with trained professionals
                        dedicated to your health, supported by advanced medical technology and
                        personalized treatment plans.
                    </p>

                    <Link to='/doctors' className='btn-1'>Meet Our Doctors</Link>
                </div>
            </section>

            <section className='company-values'>
                <div className='value-box'>
                    <h3 className='gradient-highlight'>Who We Are?</h3>
                    <p>We are experienced healthcare professionals delivering personalized,
                        compassionate medical care using modern facilities and technology.
                    </p>
                </div>
                <div className='value-box'>
                    <h3 className='gradient-highlight'>Our Mission</h3>
                    <p>To provide accessible, high-quality healthcare that improves patient outcomes
                        and promotes community well-being.
                    </p>
                </div>
                <div className='value-box'>
                    <h3 className='gradient-highlight'>Our Vision</h3>
                    <p>To be the leading healthcare provider recognized for excellence, innovation,
                        and patient-centered services.
                    </p>
                </div>
            </section>

            <section className='doctors-section'>
                <h1 className='gradient-highlight'>Our expert doctors</h1>

                {errorMessage && <small className="error-msg error-msg-2">{errorMessage}</small>}

                {loading ? (
                    <small className="error-msg error-msg-2">Loading doctors...</small>
                ) : doctors.length === 0 ? (
                    <p className="no-data">No doctors found.</p>
                ) : (
                    <>
                        <div className="doctors-grid">
                            {doctors.slice(0, 4).map((doctor) => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))}
                        </div>

                        {doctors.length > 0 && <Link to='/doctors' className='btn-1'>View All Doctors</Link>}
                    </>
                )}


            </section>

            <CTA />
        </>
    )
}

export default About