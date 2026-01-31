import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Contact', path: '/contact' }
];

function Navbar() {

    const location = useLocation(); // Get current URL path
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeMenu();
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';    // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen, closeMenu]);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (e) => {
            if (!e.target.closest('.nav-top') && !e.target.closest('.menu')) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen, closeMenu]);

    return (
        <section className='nav-section'>
            <Link to="/" className="logo gradient-highlight">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Website Logo" />
                HealthCare
            </Link>

            {/* Hamburger Menu */}
            <div className='menu' onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <nav className={`nav-top ${isMenuOpen ? 'show' : ''}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        style={{ color: location.pathname === link.path ? '#0d6efd' : '' }}
                        onClick={closeMenu}
                    >
                        {link.name}
                    </Link>
                ))}
                <Link className='navbar-login-btn' to='/login' onClick={closeMenu}>Login</Link>
            </nav>
        </section>
    )
}

export default Navbar