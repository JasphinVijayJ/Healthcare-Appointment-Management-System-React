import { Link } from "react-router-dom"

import './Footer.css'

const companyLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/doctors", label: "Doctors" },
    { path: "/contact", label: "Contact" }
];

const contactInfo = [
    {
        icon: "fa-regular fa-envelope",
        content: <a href="mailto:jasphinvijayj@gmail.com">jasphinvijayj@gmail.com</a>
    },
    {
        icon: "fa-solid fa-phone",
        content: <a href="tel:+917339372547">+91 7339372547</a>
    },
    {
        icon: "fa-solid fa-location-dot",
        content: "Kamplar, Nagercoil, Kanyakumari, 629157."
    },
    {
        icon: "fa-solid fa-location-crosshairs",
        content: <a href="https://maps.google.com/?q=8.2508870,77.2132320" target="_blank">View on Google map</a>
    }
];

const socialLinks = [
    {
        href: "https://www.instagram.com/vijay_3_10_2002?igsh=MWNtY2VuZG1pcXNhdA==",
        icon: "fa-brands fa-instagram",
        label: "Instagram"
    },
    {
        href: "https://github.com/JasphinVijayJ",
        icon: "fa-brands fa-github",
        label: "GitHub"
    },
    {
        href: "https://www.linkedin.com/in/jasphin-vijay",
        icon: "fa-brands fa-square-linkedin",
        label: "LinkedIn"
    },
    {
        href: "https://jasphinvijayj.github.io/Portfolio/",
        icon: "fa-solid fa-folder-open",
        label: "Portfolio"
    }
];

function Footer() {
    return (
        <>
            <section className="footer-section">
                <div className="footer-intro">
                    <Link to="/" className="logo gradient-highlight">
                        <img src="/logo.png" alt="Website Logo" />
                        HealthCare
                    </Link>

                    <p>Great doctor if you need your family member to get effective immediate
                        assistance, emergency treatment or a simple consultation.</p>
                </div>

                <div className='footer-company'>
                    <h3 className="gradient-highlight">Company</h3>

                    <nav className="nav-bottom">
                        {companyLinks.map(({ path, label }) => (
                            <Link key={path} to={path} >{label}</Link>
                        ))}
                    </nav>
                </div>

                <div>
                    <h3 className="gradient-highlight">Contact us</h3>

                    <div className='footer-contact-info'>
                        {contactInfo.map((item, index) => (
                            <p key={index} className='footer-contact-item'>
                                <i className={item.icon}></i>
                                {item.content}
                            </p>
                        ))}
                    </div>

                    <div className='social-media-icons'>
                        {socialLinks.map(({ href, icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target='_blank'>
                                <i className={icon}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <div className="footer-copyright">
                <hr />
                <p>&copy; {new Date().getFullYear()} Healthcare. Design & Develop by <span className='gradient-highlight'>Jasphin Vijay</span></p>
            </div>
        </>
    )
}

export default Footer