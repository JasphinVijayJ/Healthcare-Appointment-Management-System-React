import { Link } from 'react-router-dom'
import { useEffect } from 'react';

import CTA from '../../../components/common/CTA';
import './Home.css'

const SPECIALTIES = [
  {
    icon: "fa-solid fa-scissors",
    title: "General Surgery",
    description: "Comprehensive surgical procedures and operations",
    linkText: "Find Surgeons"
  },
  {
    icon: "fa-solid fa-heart-pulse",
    title: "Cardiology",
    description: "Heart and cardiovascular system care with advanced treatments",
    linkText: "Find Cardiologists"
  },
  {
    icon: "fa-solid fa-brain",
    title: "Neurology",
    description: "Brain and nervous system disorders diagnosis and care",
    linkText: "Find Neurologists"
  },
  {
    icon: "fa-solid fa-tooth",
    title: "Dental Care",
    description: "Complete oral health services and dental treatments",
    linkText: "Find Dentists"
  }
];

const BENEFITS = [
  {
    icon: "fa-regular fa-hourglass-half",
    title: "Convenient & Fast",
    description: "See a doctor within minutes—no waiting rooms."
  },
  {
    icon: "fa-solid fa-user-doctor",
    title: "Certified Doctors",
    description: "Licensed professionals in multiple specialties."
  },
  {
    icon: "fa-solid fa-file-shield",
    title: "Private & Secure",
    description: "End-to-end encrypted, HIPAA-compliant platform."
  },
  {
    icon: "fa-solid fa-hand-holding-dollar",
    title: "Affordable Pricing",
    description: "Transparent pricing, with or without insurance."
  }
];

function Home() {

  useEffect(() => {
    document.title = "HAMS | Home";
  }, []);

  return (
    <>
      <section className='home'>
        <div className='home-background-img'></div>

        <div className='intro'>
          <h1 className='gradient-highlight'>Meet The Best Doctor</h1>
          <p>Great doctor if you need your family member to get effective
            immediate assistance, emergency treatment or a simple consultation.</p>

          <Link to='/doctors' className='btn-1'>Make Appointment</Link>
        </div>
      </section>

      <section className='benefits-section'>
        <h2 className='gradient-highlight'>Why Choose Our Healthcare Services?</h2>

        <div className='benefits'>
          {BENEFITS.map((benefit, index) => (
            <div key={index} className='benefit-card'>
              <i className={`${benefit.icon} gradient-highlight`}></i>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='specialties-showcase'>
        <h2 className='gradient-highlight'>Our Medical Departments</h2>
        <p>Explore healthcare services across various medical fields.</p>

        <div className='specialties-grid'>
          {SPECIALTIES.map((specialty, index) => (
            <div key={index} className='specialty-card'>
              <i className={`${specialty.icon} gradient-highlight`}></i>
              <h3>{specialty.title}</h3>
              <p>{specialty.description}</p>

              <Link to='/doctors' className='btn-1 hover-btn'>{specialty.linkText}</Link>
            </div>
          ))}
        </div>

        <Link to='/doctors' className='btn-1'>View All Departments</Link>
      </section>

      <section className='how-we-works'>
        <h2 className='gradient-highlight'>How We Work</h2>
        <p>Our streamlined process makes healthcare accessible and convenient.</p>

        <div className='steps-container'>
          <div className='steps-card'>
            <i className="fa-solid fa-magnifying-glass gradient-highlight"></i>
            <h3>Search Doctor</h3>
            <p>Find a doctor based on specialization, experience, and availability.</p>
          </div>
          <div className='steps-card'>
            <i className="fa-solid fa-house-medical-circle-check gradient-highlight"></i>
            <h3>Check Profile</h3>
            <p>Explore detailed doctor profiles to make confident healthcare decisions.</p>
          </div>
          <div className='steps-card'>
            <i className="fa-regular fa-calendar-days gradient-highlight"></i>
            <h3>Schedule Appointment</h3>
            <p>Choose your preferred doctor, select a time slot, and confirm easily.</p>
          </div>
          <div className='steps-card'>
            <i className="fa-solid fa-hospital-user gradient-highlight"></i>
            <h3>Get Your Solution</h3>
            <p>Share your concerns with certified doctors and receive the right guidance.</p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}

export default Home