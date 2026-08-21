import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../Context/ToastContext";
import { useApp } from "../../Context/appContext"
import axios from 'axios';
import useErrorHandler from "../../hooks/useErrorHandler";

export default function Login() {

    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const { user, fetchUser, server } = useApp();

    const [showPassword, setShowPassword] = useState(false);

    const { showLoading, hideLoading, showModal } = useToast();
    const { handle } = useErrorHandler();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        showLoading("Logging in....")
        try {
            const response = await axios.post(`${server}/login`, form, { withCredentials: true });

            const message = response.data.message;
            const type = response.data.type;
            await fetchUser();
            
            if(showModal(message, "ok", type)){
                navigate('/home', { replace: true })
            }
        } catch (error) {
            handle(error, modal)
        }
        finally{
            hideLoading()
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