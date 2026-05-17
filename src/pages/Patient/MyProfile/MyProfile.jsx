import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupAlert from '../../../components/common/PopupAlert/PopupAlert';
import InputField from '../../../components/common/InputField/InputField';
import './MyProfile.css';

import { toast } from "react-toastify";


function MyProfile() {

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

    const [popup, setPopup] = useState({ show: false, message: "", type: "" });


    // Check if anything actually changed
    const isChanged = Object.keys(formData).some(
        key => formData[key] !== profile[key]
    );


    useEffect(() => {
        document.title = "HAMS | My Profile";
    }, []);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8080/patients/my-profile`,
                    {
                        credentials: "include", // required to send/receive cookies
                    }
                );

                const fromBackEnd = await response.json();

                if (!response.ok) {
                    // Backend validation failed → show exact error
                    setPopup({ show: true, message: fromBackEnd.message, type: "error" });
                    console.log(fromBackEnd);

                    // Auto-hide popup after 3s and navigate
                    setTimeout(() => {
                        setPopup({ show: false, message: "", type: "" });
                        navigate(`/`);
                    }, 3000);
                    return;
                }

                
                setProfile(fromBackEnd);
                setFormData(fromBackEnd);
                console.log(fromBackEnd);
            } catch (error) {
                console.log(error);
                setPopup({ show: true, message: "Error: Server error. Please try again later.", type: "error" });

                // Auto-hide popup after 3s and navigate
                setTimeout(() => {
                    setPopup({ show: false, message: "", type: "" });
                    navigate(`/`);
                }, 3000);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const payload = new FormData();

        payload.append('role', role);
        payload.append('image', file);

        setUploadingPhoto(true);

        try {
            const response = await fetch(`http://localhost:8080/utility/upload-profile-image`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: payload,
                });

            const fromBackEnd = await response.json();

            if (!response.ok) {
                // Backend validation failed → show exact error
                setPopup({ show: true, message: fromBackEnd.message, type: "error" });
                console.log(fromBackEnd);

                // Auto-hide popup after 3s and navigate
                setTimeout(() => {
                    setPopup({ show: false, message: "", type: "" });
                }, 3000);
                return;
            }

            setProfile(prev => ({
                ...prev,
                imageUrl: fromBackEnd.data
            }));

            setFormData(prev => ({
                ...prev,
                imageUrl: fromBackEnd.data
            }));

            console.log(fromBackEnd);

            setPopup({ show: true, message: fromBackEnd.message, type: "success" });

            // Auto-hide popup after 3s and navigate
            setTimeout(() => {
                setPopup({ show: false, message: "", type: "" });
            }, 3000);

        } catch (error) {
            console.log(error);
            setPopup({ show: true, message: "Error: Server error. Please try again later.", type: "error" });

            // Auto-hide popup after 3s and navigate
            setTimeout(() => {
                setPopup({ show: false, message: "", type: "" });
            }, 3000);
        }
        finally {
            setUploadingPhoto(false);
        }
    };


    const handleSave = async () => {
        if (!validate()) return;

        setSaving(true);

        try {
            const response = await fetch(`http://localhost:8080/patients/update-profile`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(formData),
                });

            const fromBackEnd = await response.json();

            if (!response.ok) {
                // Backend validation failed → show exact error
                setPopup({ show: true, message: fromBackEnd.message, type: "error" });
                console.log(fromBackEnd);

                // Auto-hide popup after 3s and navigate
                setTimeout(() => {
                    setPopup({ show: false, message: "", type: "" });
                }, 3000);
                return;
            }

            setProfile(fromBackEnd);
            setFormData(fromBackEnd);
            setIsEditing(false);

            console.log(fromBackEnd);

            setPopup({ show: true, message: fromBackEnd.message, type: "success" });

            // Auto-hide popup after 3s and navigate
            setTimeout(() => {
                setPopup({ show: false, message: "", type: "" });
            }, 3000);

        } catch (error) {
            console.log(error);
            setPopup({ show: true, message: "Error: Server error. Please try again later.", type: "error" });

            // Auto-hide popup after 3s and navigate
            setTimeout(() => {
                setPopup({ show: false, message: "", type: "" });
            }, 3000);
        }
        finally {
            setSaving(false);
        }
    };


    const validate = () => {
        const newErrors = {};

        if (!formData.name?.trim()) newErrors.name = 'Name is required.';
        if (!formData.phone?.trim()) newErrors.phone = 'Phone is required.';
        else if (!/^\d{10}$/.test(formData.phone.trim())) newErrors.phone = 'Phone must be 10 digits.';
        if (!formData.dob) newErrors.dob = 'Date of birth is required.';
        if (!formData.address?.trim()) newErrors.address = 'Address is required.';

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
        <section className="mp-section">
            <div className='mp-container'>

                {/* PopupAlert.jsx */}
                <PopupAlert
                    show={popup.show}
                    message={popup.message}
                    type={popup.type}
                />

                {/* ── Top: Avatar + Name + Buttons ── */}
                <section className="mp-top">
                    <div className='mp-avatar-wrap'>
                        <div className='mp-avatar'>
                            {profile && profile.imageUrl && (
                                <img src={profile.imageUrl} alt='My Profile Image' />
                            )}
                        </div>

                        <button className='mp-camera-btn' title="Change photo" disabled={uploadingPhoto} onClick={() => fileInputRef.current?.click()}>
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

                    <div className='mp-identity'>
                        <h2>{profile?.name}</h2>
                        <span className='mp-badge'>{profile?.role}</span>
                    </div>

                    {!isEditing ? (
                        <button className='btn-1 btn-2 mp-edit-btn' onClick={() => { setIsEditing(true); }}>
                            Edit
                        </button>
                    ) : (
                        <div className='mp-btn-group'>
                            <button className='btn-1 btn-2 mp-save-btn' onClick={handleSave} disabled={saving || !isChanged}>
                                {saving ? 'Saving…' : 'Save'}
                            </button>

                            <button className='btn-1 btn-2 mp-cancel-btn' onClick={handleCancel}>Cancel</button>
                        </div>
                    )}

                </section>


                <div className='mp-divider' />


                {/* ── Fields ── */}
                <section className='mp-fields'>

                    <div className='mp-row'>
                        <span className='mp-label'>Email</span>
                        <span>{profile?.email}</span>
                    </div>

                    <div className='mp-row'>
                        <span className='mp-label'>Role</span>
                        <span>{profile?.role}</span>
                    </div>

                    {isEditing
                        ? <>
                            <small className='mp-field-spacing'></small>

                            <InputField label="Full Name" type="text" name="name"
                                value={formData?.name} placeholder="Your full name"
                                onChange={handleChange} error={errors.name} maxLength={50} />
                        </>
                        : <div className='mp-row'>
                            <span className='mp-label'>Full Name</span>
                            <span>{profile?.name}</span>
                        </div>
                    }

                    {isEditing
                        ? <InputField label="Phone" type="tel" name="phone"
                            value={formData?.phone} placeholder="10-digit number"
                            onChange={handleChange} error={errors.phone} maxLength={10} />

                        : <div className='mp-row'>
                            <span className='mp-label'>Phone</span>
                            <span>{profile?.phone}</span>
                        </div>
                    }

                    {isEditing
                        ? <InputField label="Date of Birth" type="date" name="dob"
                            value={formData?.dob} onChange={handleChange} error={errors.dob} />

                        : <div className='mp-row'>
                            <span className='mp-label'>Date of Birth</span>
                            <span>{profile?.dob}</span>
                        </div>
                    }

                    {isEditing ? (
                        <div className='inputField-group'>
                            <label className='inputField-label'>Gender</label>
                            <select className='inputField-box' name="gender"
                                value={formData?.gender} onChange={handleChange}>
                                {(profile?.allGender ?? []).map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                    ) : (
                        <div className='mp-row'>
                            <span className='mp-label'>Gender</span>
                            <span>{profile?.gender}</span>
                        </div>
                    )}

                    {isEditing ? (
                        <>
                            <small className='mp-field-spacing'></small>

                            <div className='inputField-group'>
                                <label className='inputField-label'>Blood Group</label>
                                <select className='inputField-box' name="bloodGroup"
                                    value={formData?.bloodGroup} onChange={handleChange}>
                                    {(profile?.allBloodGroup ?? []).map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                            </div>
                        </>
                    ) : (
                        <div className='mp-row'>
                            <span className='mp-label'>Blood Group</span>
                            <span>{profile?.bloodGroup}</span>
                        </div>
                    )}

                    {isEditing
                        ? <>
                            <small className='mp-field-spacing'></small>

                            <InputField label="Address" type="text" name="address"
                                value={formData?.address} placeholder="Your address"
                                onChange={handleChange} error={errors.address} maxLength={300} />
                        </>
                        : <div className='mp-row'>
                            <span className='mp-label'>Address</span>
                            <span>{profile?.address}</span>
                        </div>
                    }

                </section>

            </div>
        </section>
    )
}

export default MyProfile;