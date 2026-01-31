import { useEffect, useMemo, useState } from 'react'
import { useDoctors } from '../../../hooks/useDoctors';
import DoctorCard from '../../../components/common/DoctorCard/DoctorCard'
import './Doctor.css'

function Doctor() {

    const { doctors, loading, errorMessage } = useDoctors();
    const [visibleDoctors, setVisibleDoctors] = useState(8);
    const [departmentFilter, setDepartmentFilter] = useState('All Department');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        document.title = "HAMS | Doctors";
    }, []);

    // Get unique departments from DOCTORS
    const departments = useMemo(() => {
        const list = ['All Department'];

        doctors.forEach(doctor => {
            if (!list.includes(doctor.specialty))
                list.push(doctor.specialty);
        });
        return list;
    }, [doctors]);

    // Filter doctors based on selected department
    const filteredDoctors = useMemo(() =>
        departmentFilter === 'All Department'
            ? doctors
            : doctors.filter(doctor => doctor.specialty === departmentFilter)
        , [doctors, departmentFilter]);

    const loadMoreDoctors = () => {
        const newVisibleCount = visibleDoctors + 4;

        if (newVisibleCount >= filteredDoctors.length) setVisibleDoctors(filteredDoctors.length);
        else setVisibleDoctors(newVisibleCount);
    };

    const remainingDoctors = filteredDoctors.length - visibleDoctors;

    useEffect(() => {
        if (!dropdownOpen) return;

        const handleClickOutside = (e) => {
            if (!e.target.closest(".dropdown-selected") &&
                !e.target.closest(".dropdown-list")) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [dropdownOpen]);

    return (
        <>
            <section className='our-doctors'>
                <div className='doctors-background-img'></div>

                <div className='doctors-intro'>
                    <h1 className='gradient-highlight'>Our Doctors</h1>
                </div>
            </section>

            {/* Filter Section */}
            <section className='filter-container'>
                <div
                    className={`dropdown-selected ${dropdownOpen ? 'open' : ''}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <span className='gradient-highlight'>{departmentFilter}</span>
                    <i className="fa-solid fa-angle-down gradient-highlight"></i>
                </div>

                {dropdownOpen && (
                    <ul className='dropdown-list'>
                        {departments.map((department, index) => (
                            <li
                                key={index}
                                className={`dropdown-item ${departmentFilter === department ? 'selected' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();   // prevents opening/closing twice
                                    setDepartmentFilter(department);
                                    setVisibleDoctors(8);
                                    setDropdownOpen(false);
                                }}
                            >
                                {department}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {errorMessage && <small className="error-msg error-msg-2">{errorMessage}</small>}

            {loading ? (
                <small className="error-msg error-msg-2" style={{ marginTop: "20px" }}>Loading doctors...</small>
            ) : filteredDoctors.length === 0 ? (
                <p className="no-data">No doctors found.</p>
            ) : (
                <>
                    <div className='our-doctors-grid'>
                        {filteredDoctors.slice(0, visibleDoctors).map((doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>

                    {remainingDoctors > 0 && (
                        <button onClick={loadMoreDoctors} className='btn-1 load-more-btn'>Load More Doctors</button>
                    )}
                </>
            )}
        </>
    )
}

export default Doctor