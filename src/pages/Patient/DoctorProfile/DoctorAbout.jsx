import React from "react"

const DoctorAbout = React.memo(function DoctorAbout({ name, languages, consultationFee, selectedDayObject }) {
    return (
        <section className='left-column'>
            <div className='doctor-about-section'>
                <h2>About</h2>

                <p>
                    {name} is dedicated to providing comprehensive medical care with a focus on
                    preventive medicine, early diagnosis, and effective treatment strategies. With years of
                    experience in the field, the doctor ensures patient-centered care and personalized
                    treatment plans.
                </p>

                <div className='quick-info-section'>
                    <div className='info-item'>
                        <i className="fa-solid fa-clock gradient-highlight"></i>
                        <span>Slot Duration: {selectedDayObject ? selectedDayObject.slotDuration : "00"} minutes</span>
                    </div>
                    <div className='info-item'>
                        <i className="fa-solid fa-star gradient-highlight"></i>
                        <span>Rating: 4.9/5</span>
                    </div>
                    <div className='info-item'>
                        <i className="fa-solid fa-language gradient-highlight"></i>
                        <span>{languages}</span>
                    </div>
                </div>
            </div>

            <div className='appointment-fee-section'>
                <h2>Appointment fee</h2>
                <p className='gradient-highlight'>₹{consultationFee}</p>
            </div>
        </section>
    )
})

export default DoctorAbout