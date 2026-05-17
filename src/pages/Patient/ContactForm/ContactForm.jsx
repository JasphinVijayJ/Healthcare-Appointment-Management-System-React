import { useEffect, useState } from 'react';
import './ContactForm.css'
import InputField from '../../../components/common/InputField/InputField';

import { promiseToast } from '../../../utils/promiseToast';


const inputFields = [
    { name: "name", type: "text", placeholder: "Your Name", maxLength: 50 },
    { name: "email", type: "email", placeholder: "Your Email", maxLength: 50 },
    { name: "subject", type: "text", placeholder: "Your Subject", maxLength: 100 },
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
            const response = await promiseToast(
                "http://localhost:8080/utility/contact-form",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        subject: formData.subject.trim(),
                        message: formData.message.trim()
                    })
                },
                {
                    loading: "Sending message...",
                    success: (data) => data.message,
                    error: (err) => err.message
                }
            );

            console.log(response);

            setFormData({ name: "", email: "", subject: "", message: "" });
            setTouched({});

        } catch (error) {
            console.error("Contact form error:", error);
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <section className="form-section">

            <form className='contact-form' onSubmit={handleSubmit}>
                <h1 className='gradient-highlight'>Contact Us</h1>

                {inputFields.map(({ name, type, placeholder, maxLength }) => (
                    <InputField
                        key={name}
                        type={type}
                        name={name}
                        value={formData[name]}
                        placeholder={placeholder}
                        onChange={handleChange}
                        error={errors[name]}
                        maxLength={maxLength}
                    />
                ))}

                <div className='input-group'>
                    <textarea id="message" rows="3" name='message' value={formData.message} onChange={handleChange} placeholder="Your Message" maxLength={300}></textarea>
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