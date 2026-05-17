import { useEffect, useState } from 'react';
import InputField from '../../components/common/InputField/InputField'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom';

import { promiseToast } from '../../utils/promiseToast';


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
            const response = await promiseToast(
                "http://localhost:8080/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        email: formData.email.trim(),
                        password: formData.password.trim(),
                    }),
                },
                {
                    loading: "Logging in...",
                    success: (data) => data.message,
                    error: (err) => err.message
                }
            );

            console.log(response);

            // Save JWT email + role in localStorage
            localStorage.setItem("email", response.email);
            localStorage.setItem("role", response.role);


            if (response.role === "ADMIN") navigate("/admin/dashboard");
            else if (response.role === "DOCTOR") navigate("/doctor/dashboard");
            else navigate("/");

        } catch (error) {
            console.error("Login error:", error);
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
                    maxLength={50}
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    error={errors.password}
                    maxLength={20}
                />

                {/* Button and Error (<p>) and Link */}
                <button
                    className="btn-1 btn-2 auth-btn"
                    type="submit"
                    disabled={!canSubmit || loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className='auth-redirect'>Create an new account? <Link className='gradient-highlight' to={"/register"}>Click here</Link></p>
            </form>
        </section>
    )
}

export default Login