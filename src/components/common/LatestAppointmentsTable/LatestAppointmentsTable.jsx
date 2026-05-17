import { useEffect, useState } from 'react';
import { formatDateToLong, formatTimeToAMPM } from '../../../utils/dateFormatter';
import { useAppointmentStatus } from '../../../hooks/useAppointmentStatus';
import styles from './LatestAppointmentsTable.module.css'


function LatestAppointmentsTable({ appointments }) {

    const [appointmentList, setAppointmentList] = useState(appointments);

    const { loadingId, updateAppointmentStatus } = useAppointmentStatus();


    // keep in sync with parent
    useEffect(() => {
        setAppointmentList(appointments || []);
    }, [appointments]);


    return (
        <section className={styles.tableCard} >

            {/* Header */}
            <div className={styles.tableHeader}>
                <h2 className={`${styles.tableTitle} gradient-highlight`}>
                    <span className={styles.tableIcon}>📋</span>
                    Latest Appointments
                </h2>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>PATIENT</th>
                            <th>AGE</th>
                            <th>DATE</th>
                            <th>TIME</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentList.map((a, i) => (
                            <tr key={a.appointmentId}>
                                <td className={styles.index}>{i + 1}</td>
                                <td>{a.patientName}</td>
                                <td>{a.patientAge}</td>
                                <td>{formatDateToLong(a.appointmentDate)}</td>
                                <td>{formatTimeToAMPM(a.appointmentTime)}</td>
                                <td>
                                    <span className={`${styles.badge} ${styles[a.status.toLowerCase()]}`}>
                                        {a.status}
                                    </span>
                                </td>
                                <td>
                                    {a.status !== "COMPLETED" && a.status !== "CANCELLED" && a.status !== "REJECTED" && (
                                        <div className={styles.actions}>
                                            <button className={styles.btnComplete}
                                                onClick={() => updateAppointmentStatus(a.appointmentId, "COMPLETED", setAppointmentList)}
                                                disabled={loadingId === a.appointmentId}
                                                title="Mark complete"
                                            >✓</button>

                                            <button className={styles.btnCancel}
                                                onClick={() => updateAppointmentStatus(a.appointmentId, "REJECTED", setAppointmentList)}
                                                disabled={loadingId === a.appointmentId}
                                                title="Reject Appointment"
                                            >✕</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default LatestAppointmentsTable;