import { useEffect, useState } from 'react';
import InputField from '../../components/common/InputField/InputField'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom';

// Email regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {

    useEffect(() => {
        document.title = "HAMS | Login";
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
    }

    // Validate inputs
    useEffect(() => {
        const newErrors = {};

        const email = formData.email.trim();
        const password = formData.password.trim();

        if (touched.email && !emailPattern.test(email)) {
            newErrors.email = "Invalid email format.";
        };
        if (touched.password) {
            if (!password)
                newErrors.password = "Password is required.";
            else if (password.length < 8)
                newErrors.password = "Password must be at least 8 characters.";
        };

        setErrors(newErrors);

        // To check how many keys (fields) are inside an object, you should use: Object.keys(object).length
        setCanSubmit(
            Object.keys(newErrors).length === 0 &&
            touched.email &&
            touched.password
        );
    }, [formData, touched]);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canSubmit) return;
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password.trim(),
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

            // Save JWT token + role in localStorage
            localStorage.setItem("token", fromBackEnd.token);
            localStorage.setItem("role", fromBackEnd.role);

            if (fromBackEnd.role === "ADMIN") navigate("/admin/dashboard");
            else if (fromBackEnd.role === "DOCTOR") navigate("/doctor/dashboard");
            else navigate("/");

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
                <h2 className='gradient-highlight'>Login</h2>
                <p className='auth-subtitle'>Please log in to book appointment</p>

                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    error={errors.email}
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    error={errors.password}
                />

                {/* Button and Error (<p>) and Link */}
                <button
                    className="btn-1 btn-2 auth-btn"
                    type="submit"
                    disabled={!canSubmit || loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <small className="error-msg">{errors.submit}</small>

                <p className='auth-redirect'>Create an new account? <Link className='gradient-highlight' to={"/register"}>Click here</Link></p>
            </form>
        </section>
    )
}

export default Login