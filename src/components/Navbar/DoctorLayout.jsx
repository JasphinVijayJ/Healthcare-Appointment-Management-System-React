import { Link, Outlet, useLocation } from "react-router-dom";
import { useLogout } from "../../pages/Auth/useLogout";
import styles from './DoctorLayout.module.css'
import { HomeIcon, PlusIcon, CalendarIcon, UsersIcon } from "../../utils/Icons";


const doctorNavLinks = [
  { name: 'Dashboard', path: '/doctor/dashboard', icon: <HomeIcon /> },
  { name: 'Appointments', path: '/doctor/appointments', icon: <CalendarIcon /> },
  { name: 'My Schedule', path: '/doctor/schedule', icon: <PlusIcon /> },
  { name: 'My Profile', path: '/doctor/my-profile', icon: <UsersIcon /> }
];


function DoctorLayout() {

  const location = useLocation(); // Get current URL path
  const { logout } = useLogout();


  return (
    <>
      {/* Top Navbar */}
      <header className={styles.navsection}>
        <Link to="/doctor/dashboard" className={`${styles.logo} gradient-highlight`}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Website Logo" />
          HealthCare
        </Link>

        <button className={styles.logoutBtn} onClick={() => { logout() }}>
          Logout
        </button>
      </header>

      <section className={styles.container}>

        {/* Sidebar */}
        <aside className={styles.sideBar}>
          {doctorNavLinks.map((link) => (
            <div key={link.name} className={styles.navLinkWrapper}>
              <Link
                to={link.path}
                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
              >
                <span className={styles.icon}>{link.icon}</span>
                <span className={styles.label}>{link.name}</span>
              </Link>
            </div>
          ))}
        </aside>

        {/* Page Content */}
        <main className={styles.pageContent}>
          <Outlet />
        </main>

      </section>

    </>
  )
}

export default DoctorLayout