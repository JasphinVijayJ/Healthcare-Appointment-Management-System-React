import { useEffect, useState } from 'react';
import styles from './DoctorDashboard.module.css'
import LatestAppointmentsTable from '../../../components/common/LatestAppointmentsTable/LatestAppointmentsTable';

function DoctorDashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [appointments, setAppointments] = useState([]);


  const STATS = [
    { label: 'Total Earnings', value: dashboard ? dashboard.totalEarnings : 0, icon: '💰' },
    { label: 'Appointments', value: dashboard ? dashboard.totalAppointments : 0, icon: '📅' },
    { label: 'Patients', value: dashboard ? dashboard.totalPatients : 0, icon: '👤' },
  ]


  useEffect(() => {
    document.title = "HAMS | Dashboard";

    fetchDashboard();
  }, []);


  const fetchDashboard = async () => {
    try {
      const response = await fetch(`http://localhost:8080/doctors/dashboard`,
        {
          credentials: "include", // required to send/receive cookies
        });

      const fromBackEnd = await response.json();

      if (!response.ok) {
        // Backend validation failed → show exact error
        console.log(fromBackEnd);
        return;
      }

      setDashboard(fromBackEnd);
      setAppointments(fromBackEnd.latestAppointments || []);
      console.log(fromBackEnd);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className={styles.page}>

      {/* Welcome */}
      <div className={styles.welcome}>
        <div>
          <h1 className={styles.title}>Welcome back,
            <span className='gradient-highlight'> {dashboard ? dashboard.doctorName : ''}</span>
            <span> 👋</span>
          </h1>
          <p className={styles.subtitle}>Here's what's happening with your patients today.</p>
        </div>

        <div className={styles.dateBadge}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon}>{s.icon}</div>

            <div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <LatestAppointmentsTable appointments={appointments} />

    </div>
  )
}

export default DoctorDashboard