import { useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm'
import './Contact.css'

function Contact() {

    useEffect(() => {
        document.title = "HAMS | Contact Us";
    }, []);

    return (
        <>
            <section className='contact-us'>
                <div className='contact-background-img'></div>

                <div className='contact-intro'>
                    <h1 className='gradient-highlight'>Contact Us</h1>
                </div>
            </section>

            <section className='contact-info-section'>
                <h1 className='gradient-highlight'>Get In Touch</h1>
                <p>Multiple ways to connect with us</p>

                <div className='contact-details'>
                    <div className='contact-item'>
                        <i className="fa-solid fa-location-dot gradient-highlight"></i>
                        <h3>Address</h3>
                        <p>Kamplar, Nagercoil, Kanyakumari, 629157.</p>
                    </div>
                    <div className='contact-item'>
                        <i className="fa-solid fa-envelope gradient-highlight"></i>
                        <h3>Email Us</h3>
                        <a href="mailto:jasphinvijayj@gmail.com">jasphinvijayj@gmail.com</a>
                    </div>
                    <div className='contact-item'>
                        <i className="fa-solid fa-phone gradient-highlight"></i>
                        <h3>Call Us</h3>
                        <a href="tel:+917339372547">+91 7339372547</a>
                    </div>
                    <div className='contact-item'>
                        <i className="fa-solid fa-clock gradient-highlight"></i>
                        <h3>Working Hours</h3>
                        <p>Mon-Fri: 9AM - 6PM</p>
                        <p>Saturday: 10AM - 4PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </section>

            <section className='map-section'>
                <h1 className='gradient-highlight'>Find Us On Map</h1>
                <p>Visit our location</p>

                <div className='map-container'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15800.59134783278!2d77.53557069537216!3d8.0864018710708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04ed3d2a087861%3A0x1e790e896aeffaa0!2sKanniyakumari%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1765558537184!5m2!1sen!2sin"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>

            <ContactForm />
        </>
    )
}

export default Contact