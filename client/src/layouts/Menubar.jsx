import { NavLink } from "react-router-dom";
import "../assets/MenuBar.css";
import { useApp } from "../Context/appContext";
import { useState, useRef, useEffect } from "react";

export default function Menubar() {

    const { user } = useApp();

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logout = () => {
        // logout code here
        console.log("Logout");
    };

    return (
        <nav className="navbar">

            <h2 className="logo">ShopEase</h2>

            <div className="nav-links">
                <NavLink to="/home" end>Home</NavLink>
                <NavLink to="/home/shops">Shops</NavLink>
                <NavLink to="/home/myCart">My Cart</NavLink>
                <NavLink to="/home/myShop">My Shop</NavLink>
            </div>

            {user.isLogin ? (

                <div className="profile-container" ref={menuRef}>

                    <div
                        className="profile"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <img src={user.profile.image} alt="profile" />
                    </div>

                    <div className={`profile-dropdown ${showMenu ? "show" : ""}`}>

                        <NavLink
                            to="/home/profile"
                            onClick={() => setShowMenu(false)}
                        >
                            👤 My Profile
                        </NavLink>

                        <NavLink
                            to="/home/settings"
                            onClick={() => setShowMenu(false)}
                        >
                            ⚙ Account Settings
                        </NavLink>

                        <NavLink
                            to="/home/orders"
                            onClick={() => setShowMenu(false)}
                        >
                            📦 My Orders
                        </NavLink>

                        <NavLink
                            to="/home/wishlist"
                            onClick={() => setShowMenu(false)}
                        >
                            ❤️ Wishlist
                        </NavLink>

                        <button onClick={logout}>
                            🚪 Sign Out
                        </button>

                    </div>

                </div>

            ) : (

                <NavLink className="login-btn" to="/login">
                    Login
                </NavLink>

            )}

        </nav>
    );
}