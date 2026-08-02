import { useApp } from "../Context/appContext";
import { Link } from "react-router-dom";
export default function Dashboard() {

    const { user, fetchUser } = useApp();

    fetchUser()

    return (
        <div className="dashboard-page">

            <section className="dashboard-header">

                <div>
                    <h1>Welcome Back {user.username}</h1>
                    <p>Manage your account and keep track of your orders.</p>
                </div>

            </section>

            <section className="dashboard-stats">

                <div className="dashboard-card">
                    <h3>Orders</h3>
                    <span>12</span>
                </div>

                <div className="dashboard-card">
                    <h3>Wishlist</h3>
                    <span>8</span>
                </div>

                <div className="dashboard-card">
                    <h3>Cart</h3>
                    <span>4</span>
                </div>

            </section>

            <section className="dashboard-grid">

                <div className="dashboard-panel">

                    <h2>Recent Orders</h2>

                    <div className="order-item">
                        <strong>#2048</strong>
                        <span>Delivered</span>
                    </div>

                    <div className="order-item">
                        <strong>#2049</strong>
                        <span>Processing</span>
                    </div>

                    <div className="order-item">
                        <strong>#2050</strong>
                        <span>Pending</span>
                    </div>

                </div>

                <div className="dashboard-panel">

                    <h2>Profile</h2>

                    <p><strong>Name</strong></p>
                    <p>{user.username}</p>

                    <p><strong>Email</strong></p>
                    <p>{user.email}</p>

                    <Link to="/home/profile/edit" className="dashboard-link">Edit Profile</Link>

                </div>

            </section>

        </div>
    );
}