import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {useToast} from '../../Context/ToastContext'
import useErrorHandler from "../../hooks/useErrorHandler";

export default function Register() {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { showModal, showLoading, hideLoading } = useToast();
    const { handle } = useErrorHandler();
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const server = import.meta.env.VITE_SERVER;

    async function handleSubmit(e) {
        e.preventDefault();

        if(form.password != form.confirmPassword){
            showToast("Passwords Mismatch!", "warning")
            return
        }

        showLoading("Creating your Account....")

        try {
            const response = await axios.post(`${server}/register`, 
                form,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
            const message = response.data.message;
            const type = response.data.type;
                
            if(showModal(message, "ok", type)){
                navigate('/login', {replace: true})
            }
        } catch (error) {
            handle(error, "modal")
        }
        finally{
            hideLoading()
        }
    }

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Create Account</h1>

                <p>Create your account to continue.</p>

                <form onSubmit={handleSubmit}>

                    <input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />

                    <button type="submit" onClick="handleSubmit">Create Account</button>

                </form>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </div>

        </div>
    );
}