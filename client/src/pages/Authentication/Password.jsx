import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        console.log(email);
    }

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Forgot Password</h1>

                <p>
                    Enter your email and we'll send you a password reset link.
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button onClick="handleSubmit" type="submit">Send Reset Link</button>

                </form>

                <p>
                    <Link to="/login">Back to Login</Link>
                </p>

            </div>

        </div>
    );
}