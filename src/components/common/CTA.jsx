import { Link } from "react-router-dom"


// CTA stands for Call To Action.
function CTA() {
    return (
        <section className='have-question'>
            <i className="fa-solid fa-stethoscope gradient-highlight"></i>

            <h2 className='gradient-highlight'>Need Medical Assistance?</h2>
            <p>Our healthcare team is ready to provide quality medical care.
                Book your appointment today for personalized consultation and treatment.</p>

            <Link to='/contact' className='btn-1'>Contact us</Link>
        </section>
    )
}

export default CTA