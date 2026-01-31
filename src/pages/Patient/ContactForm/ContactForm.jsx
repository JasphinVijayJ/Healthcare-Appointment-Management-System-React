import { useEffect, useState } from 'react';
import './ContactForm.css'
import PopupAlert from '../../../components/common/PopupAlert/PopupAlert';
import InputField from '../../../components/common/InputField/InputField';

const inputFields = [
    { name: "name", type: "text", placeholder: "Your Name" },
    { name: "email", type: "email", placeholder: "Your Email" },
    { name: "subject", type: "text", placeholder: "Your Subject" },
];

// Email regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [canSubmit, setCanSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [popupBox, setPopupBox] = useState({ show: false, message: "", type: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    // Validate inputs
    useEffect(() => {
        const newErrors = {};

        const name = formData.name.trim();
        const email = formData.email.trim();
        const subject = formData.subject.trim();
        const message = formData.message.trim();

        if (touched.name && !name) {
            newErrors.name = "Name is required.";
        };

        if (touched.email) {
            if (!email) newErrors.email = "Email is required.";
            else if (!emailPattern.test(email)) newErrors.email = "Invalid email format.";
        };
        if (touched.subject && !subject) {
            newErrors.subject = "Subject is required.";
        };
        if (touched.message && !message) {
            newErrors.message = "Message is required.";
        };

        setErrors(newErrors);

        // To check how many keys (fields) are inside an object, you should use: Object.keys(object).length
        setCanSubmit(
            Object.keys(newErrors).length === 0 &&
            touched.name &&
            touched.email &&
            touched.subject &&
            touched.message
        );
    }, [formData, touched]);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canSubmit) return;
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/contact-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    subject: formData.subject.trim(),
                    message: formData.message.trim()
                })
            });

            const fromBackEnd = await response.json();

            if (!response.ok) {
                // Backend validation failed → show exact error
                setPopupBox({ show: true, message: fromBackEnd.message || "Server error", type: "error" });
                console.log(fromBackEnd);
                return;
            }

            setPopupBox({ show: true, message: fromBackEnd.message, type: "success" });
            console.log(fromBackEnd);

            setFormData({ name: "", email: "", subject: "", message: "" });
            setTouched({});
        } catch (error) {
            setPopupBox({ show: true, message: "Error: Server error. Please try again later.", type: "error" });
            console.error("Error:", error);
        }
        finally {
            setLoading(false);
        }
    };

    // Auto-hide popup after 3 seconds
    useEffect(() => {
        if (popupBox.show) {
            const timer = setTimeout(() => {
                setPopupBox(prev => ({ ...prev, show: false }));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [popupBox.show]);

    return (
        <section className="form-section">

            <form className='contact-form' onSubmit={handleSubmit}>
                <h1 className='gradient-highlight'>Contact Us</h1>

                {/* Popup Alert Component */}
                <PopupAlert show={popupBox.show} message={popupBox.message} type={popupBox.type} />

                {inputFields.map(({ name, type, placeholder }) => (
                    <InputField
                        key={name}
                        type={type}
                        name={name}
                        value={formData[name]}
                        placeholder={placeholder}
                        onChange={handleChange}
                        error={errors[name]}
                    />
                ))}

                <div className='input-group'>
                    <textarea id="message" rows="3" name='message' value={formData.message} onChange={handleChange} placeholder="Your Message"></textarea>
                    <small className='error-msg'>{errors.message}</small>
                </div>

                <button type="submit" className="btn-1 btn-2" disabled={!canSubmit || loading}> {/* Prevents multiple clicks */}
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </section>
    )
}

export default ContactForm