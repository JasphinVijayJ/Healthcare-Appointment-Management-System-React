import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/common/InputField/InputField';
import styles from './DoctorMyProfile.module.css'

import { promiseToast } from '../../../utils/promiseToast';


function DoctorMyProfile() {

    const role = localStorage.getItem("role");

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [profile, setProfile] = useState({});
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});


    // Check if anything actually changed
    const isChanged = Object.keys(formData).some(
        key => formData[key] !== profile[key]
    );


    useEffect(() => {
        document.title = "HAMS | My Profile";

        fetchProfile();
    }, []);


    const fetchProfile = async () => {
        try {
            const response = await promiseToast(
                `http://localhost:8080/doctors/my-profile`,
                {
                    credentials: "include",
                },
                {
                    success: false,
                    loading: false,
                    error: (err) => err.message
                }
            );


            setProfile(response);
            setFormData(response);
            console.log(response);

        } catch (error) {
            console.log(error);

            navigate(`/`);
        } finally {
            setLoading(false);
        }
    };


    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const payload = new FormData();

        payload.append('role', role);
        payload.append('image', file);

        setUploadingPhoto(true);

        try {
            const response = await promiseToast(
                `http://localhost:8080/utility/upload-profile-image`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: payload,
                },
                {
                    loading: "Uploading photo...",
                    success: (data) => data.message,
                    error: (err) => err.message
                }
            );


            setProfile(prev => ({
                ...prev,
                imageUrl: response.data
            }));

            setFormData(prev => ({
                ...prev,
                imageUrl: response.data
            }));

            console.log(response);

        }
        finally {
            setUploadingPhoto(false);
        }
    };


    const handleSave = async () => {
        if (!validate()) return;

        setSaving(true);

        try {
            const response = await promiseToast(
                `http://localhost:8080/doctors/update-profile`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(formData),
                },
                {
                    loading: "Updating profile...",
                    success: (data) => data.message,
                    error: (err) => err.message
                }
            );


            setProfile(response);
            setFormData(response);

            setIsEditing(false);

            console.log(response);

        }
        finally {
            setSaving(false);
        }
    };


    const validate = () => {

        const newErrors = {};

        if (!formData.name?.trim())
            newErrors.name = 'Name is required.';

        if (!formData.phone?.trim())
            newErrors.phone = 'Phone is required.';
        else if (!/^\d{10}$/.test(formData.phone.trim()))
            newErrors.phone = 'Phone must be 10 digits.';

        if (!formData.specialty?.trim())
            newErrors.specialty = 'Specialty is required.';

        if (!formData.qualifications?.trim())
            newErrors.qualifications = 'Qualifications are required.';

        if (!formData.languages?.trim())
            newErrors.languages = 'Languages are required.';

        if (formData.experience === "" || formData.experience < 0)
            newErrors.experience = 'Valid experience is required.';

        if (formData.consultationFee === "" || formData.consultationFee < 0)
            newErrors.consultationFee = 'Valid consultation fee is required.';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleCancel = () => {
        setFormData(profile);
        setErrors({});
        setIsEditing(false);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };


    return (
        <section className={styles.mpSection}>
            <div className={styles.mpContainer}>

                {/* ── Top: Avatar + Name + Buttons ── */}
                <section className={styles.mpTop}>
                    <div className={styles.mpAvatarWrapper}>
                        <div className={styles.mpAvatar}>
                            {profile && profile.imageUrl && (
                                <img src={profile.imageUrl} alt='My Profile Image' />
                            )}
                        </div>

                        <button className={styles.mpCameraBtn} title="Change photo" disabled={uploadingPhoto} onClick={() => fileInputRef.current?.click()}>
                            {uploadingPhoto ? '…' : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            )}
                        </button>

                        <input ref={fileInputRef} type="file" accept="image/*"
                            style={{ display: 'none' }} onChange={handlePhotoChange} />
                    </div>

                    <div className={styles.mpIdentity}>
                        <h2>{profile?.name}</h2>
                        <span className={styles.mpBadge}>{profile?.role}</span>
                    </div>

                    {!isEditing ? (
                        <button className={`btn-1 btn-2 ${styles.mpEditBtn}`} onClick={() => { setIsEditing(true); }}>
                            Edit
                        </button>
                    ) : (
                        <div className={styles.mpBtnGroup}>
                            <button className={`btn-1 btn-2 ${styles.mpSaveBtn}`} onClick={handleSave} disabled={saving || !isChanged}>
                                {saving ? 'Saving…' : 'Save'}
                            </button>

                            <button className={`btn-1 btn-2 ${styles.mpCancelBtn}`} onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    )}

                </section>


                <div className={styles.mpDivider} />


                {/* ── Fields ── */}
                <section className={styles.mpFields}>

                    <div className={styles.mpRow}>
                        <span className={styles.mpLabel}>Email</span>
                        <span>{profile?.email}</span>
                    </div>

                    <div className={styles.mpRow}>
                        <span className={styles.mpLabel}>Role</span>
                        <span>{profile?.role}</span>
                    </div>

                    {isEditing
                        ? <>
                            <small className={styles.mpFieldSpacing}></small>

                            <InputField label="Full Name" type="text" name="name"
                                value={formData?.name} placeholder="Your full name"
                                onChange={handleChange} error={errors.name} maxLength={50} />
                        </>
                        : <div className={styles.mpRow}>
                            <span className={styles.mpLabel}>Full Name</span>
                            <span>{profile?.name}</span>
                        </div>
                    }

                    {isEditing
                        ? <InputField label="Phone" type="tel" name="phone"
                            value={formData?.phone} placeholder="10-digit number"
                            onChange={handleChange} error={errors.phone} maxLength={10} />

                        : <div className={styles.mpRow}>
                            <span className={styles.mpLabel}>Phone</span>
                            <span>{profile?.phone}</span>
                        </div>
                    }

                    {isEditing
                        ? <InputField label="Specialty" type="text" name="specialty"
                            value={formData?.specialty} placeholder="Your specialty"
                            onChange={handleChange} error={errors.specialty} maxLength={50} />

                        : <div className={styles.mpRow}>
                            <span className={styles.mpLabel}>Specialty</span>
                            <span>{profile?.specialty}</span>
                        </div>
                    }

                    {isEditing
                        ? <InputField label="Qualifications" type="text" name="qualifications"
                            value={formData?.qualifications} placeholder="Your Qualifications"
                            onChange={handleChange} error={errors.qualifications} maxLength={50} />

                        : <div className={styles.mpRow}>
                            <span className={styles.mpLabel}>Qualifications</span>
                            <span>{profile?.qualifications}</span>
                        </div>
                    }

                    {isEditing
                        ? <InputField label="Experience (Years)" type="number" name="experience"
                            value={formData?.experience} placeholder="Years of experience"
                            onChange={handleChange} error={errors.experience} />

                        : <div className={styles.mpRow}>
                            <span className={styles.mpLabel}>Experience (Years)</span>
                            <span>{profile?.experience} Years</span>
                        </div>
                    }

                    {isEditing
                        ?<InputField label="Consultation Fee" type="number" name="consultationFee"
                                value={formData?.consultationFee} placeholder="Consultation fee"
                                onChange={handleChange} error={errors.consultationFee} />
                        
                        : <div className={styles.mpRow}>
                            <span className={styles.mpLabel}>Consultation fee</span>
                            <span>₹ {profile?.consultationFee}</span>
                        </div>
                    }

                    {isEditing
                        ? <InputField label="Languages" type="text" name="languages"
                                value={formData?.languages} placeholder="Languages spoken"
                                onChange={handleChange} error={errors.languages} maxLength={50} />

                        : <div className={styles.mpRow}>
                            <span className={styles.mpLabel}>Languages</span>
                            <span>{profile?.languages}</span>
                        </div>
                    }

                </section>

            </div>
        </section>
    )
}

export default DoctorMyProfile;