import { useEffect, useState } from 'react';
import './Auth.css'
import InputField from '../../components/common/InputField/InputField';
import { Link, useNavigate } from 'react-router-dom';

const inputFields = [
    { label: "Full Name", name: "name", type: "text", placeholder: "Enter your Name" },
    { label: "Email", name: "email", type: "email", placeholder: "Enter your Email" },
    { label: "Password", name: "password", type: "password", placeholder: "Enter your Password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Enter your Confirm Password" },
];

// Email regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {

    useEffect(() => {
        document.title = "HAMS | Patient Register";
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [canSubmit, setCanSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, submit: "" }));
    };

    // Validate inputs
    useEffect(() => {
        const newErrors = {};

        const name = formData.name.trim();
        const email = formData.email.trim();
        const password = formData.password.trim();
        const confirmPassword = formData.confirmPassword.trim();

        if (touched.name && !name) {
            newErrors.name = "Name is required.";
        };

        if (touched.email) {
            if (!email) newErrors.email = "Email is required.";
            else if (!emailPattern.test(email)) newErrors.email = "Invalid email format.";
        };
        if (touched.password) {
            if (!password)
                newErrors.password = "Password is required.";
            else if (password.length < 8)
                newErrors.password = "Password must be at least 8 characters.";
        };
        if (touched.confirmPassword) {
            if (!confirmPassword)
                newErrors.confirmPassword = "Confirm password is required.";
            else if (password !== confirmPassword)
                newErrors.confirmPassword = "Passwords do not match.";
        };

        setErrors(newErrors);

        // To check how many keys (fields) are inside an object, you should use: Object.keys(object).length
        setCanSubmit(
            Object.keys(newErrors).length === 0 &&
            touched.name &&
            touched.email &&
            touched.password &&
            touched.confirmPassword
        );
    }, [formData, touched]);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canSubmit) return;
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    password: formData.password.trim(),
                    confirmPassword: formData.confirmPassword.trim()
                }),
            });

            const fromBackEnd = await response.json();

            if (!response.ok) {
                // Backend validation failed → show exact error
                setErrors({ submit: fromBackEnd.message });
                console.log(fromBackEnd);
                return;
            }

            console.log(fromBackEnd);
            navigate("/login");
        } catch (error) {
            setErrors({ submit: "Error: Server error. Please try again later." });
            console.error("Error:", error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section className='auth-section'>

            <form className='auth-form' onSubmit={handleSubmit}>
                <h2 className='gradient-highlight'>Create Account</h2>
                <p className='auth-subtitle'>Please sign up to book appointment</p>

                {inputFields.map(({ label, name, type, placeholder }) => (
                    <InputField
                        key={name}
                        label={label}
                        type={type}
                        name={name}
                        value={formData[name]}
                        placeholder={placeholder}
                        onChange={handleChange}
                        error={errors[name]}
                    />
                ))}

                {/* Button and Error (<p>) and Link */}
                <button
                    className="btn-1 btn-2 auth-btn"
                    type="submit"
                    disabled={!canSubmit || loading}
                >
                    {loading ? "Creating account..." : "Create account"}
                </button>

                <small className="error-msg">{errors.submit}</small>

                <p className='auth-redirect'>Already have an account? <Link className='gradient-highlight' to={"/login"}>Login here</Link></p>
            </form>
        </section>
    )
}

export default Register