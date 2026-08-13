import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../Context/ToastContext";
import { useApp } from "../../Context/appContext"
import axios from 'axios';

export default function Login() {

    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const { user, fetchUser } = useApp();

    const [showPassword, setShowPassword] = useState(false);

    const { showToast, durations } = useToast();

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    const server = import.meta.env.VITE_SERVER;

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${server}/login`, form, { withCredentials: true });

            const message = response.data.message;
            const type = response.data.type;

            if (response.data.type != "success") {
                showToast(message, type);
            } else {
                await fetchUser();
                showToast(message, type);
                setTimeout(() => {
                    navigate('/home', { replace: true });
                }, durations.success);
            }
        } catch (error) {
            showToast(error.message, "error");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Welcome Back</h1>
                <p>Sign in to continue shopping.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />


                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="auth-options">
                        <label>
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handleChange}
                            />
                            Remember me
                        </label>

                        <Link to="/password">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit">
                        Login
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}