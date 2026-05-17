import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../../pages/Auth/useLogout';
import './Navbar.css'


const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Contact', path: '/contact' }
];


function Navbar() {

    const location = useLocation(); // Get current URL path
    const { logout } = useLogout();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');


    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);


    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
    }, []);


    // Handle escape key for both menu and dropdown
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key !== 'Escape') return;

            if (isMenuOpen) closeMenu();
            if (isDropdownOpen) setIsDropdownOpen(false);
        };

        if (isMenuOpen || isDropdownOpen) {
            document.addEventListener('keydown', handleEscape);
            if (isMenuOpen) document.body.style.overflow = 'hidden';    // Prevent background scroll when menu is open
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen, isDropdownOpen, closeMenu]);


    // Handle all click outside events in one effect
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Close mobile menu
            if (isMenuOpen && !e.target.closest('.nav-top') && !e.target.closest('.menu')) {
                closeMenu();
            }

            // Close profile dropdown
            if (isDropdownOpen && !e.target.closest('.profile-menu')) {
                setIsDropdownOpen(false);
            }
        };

        // Only add listener if either menu or dropdown is open
        if (isMenuOpen || isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen, isDropdownOpen, closeMenu]);


    // Check login status
    useEffect(() => {
        const email = localStorage.getItem("email");
        const role  = localStorage.getItem("role");

        setIsLoggedIn(!!email && !!role);
        setUserEmail(email);
    }, [location]);


    return (
        <section className='nav-section'>
            
            <Link to="/" className="logo gradient-highlight">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Website Logo" />
                HealthCare
            </Link>

            <section className='nav-right'>
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
                </nav>

                {!isLoggedIn ? (
                    <Link className='navbar-login-btn' to='/login' onClick={closeMenu}>Login</Link>
                ) : (
                    <div className="profile-menu">
                        <button
                            className="profile-btn"
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                        >
                            <div className="user-avatar">
                                {userEmail ? userEmail.charAt(0).toUpperCase() : '?'}
                            </div>
                        </button>

                        {isDropdownOpen && (
                            <div className="dropdown">
                                <Link to="/my-profile" style={{ color: location.pathname === "/my-profile" ? '#0d6efd' : '' }} onClick={closeMenu}>My Profile</Link>

                                <Link to={`/my-appointments`} style={{ color: location.pathname === "/my-appointments" ? '#0d6efd' : '' }} onClick={closeMenu}>My Appointments</Link>

                                <button className='logout-btn' onClick={() => { logout(); closeMenu(); }}>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </section>
    )
}

export default Navbar