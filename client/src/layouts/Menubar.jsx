import { NavLink, useNavigate, Link } from "react-router-dom";
import "../assets/HomePage.css";
import logo from "../assets/xyber.png"
import { useApp } from "../Context/appContext";
import { useState, useRef, useEffect } from "react";
import { useToast } from "../Context/ToastContext";
import useErrorHandler from "../hooks/useErrorHandler";
import axios from "axios";

export default function Menubar() {

    const { user, server } = useApp();
    const { showModal } = useToast();
    const { handle } = useErrorHandler();
    const navigate = useNavigate()
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

    const logout = async () => {
        try {
            const response = await axios.delete(`${server}/logout`, {
                withCredentials: true
            })

            const confirm = await showModal(response.data?.message, "ok", response.data?.type)

            if (confirm) {
                navigate("/", { replace: true })
            }
        } catch (error) {
            handle(error, "toast")
        }
    };

    return (
        <nav className="navbar">

            <Link className="logo" to="/home"><img src={logo} alt="Logo" /></Link>

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
                        <img src={user.profile} alt="profile" />
                    </div>

                    <div className={`profile-dropdown ${showMenu ? "show" : ""}`}>

                        <NavLink
                            to="/home/profile"
                            onClick={() => setShowMenu(false)}
                        >
                            My Profile
                        </NavLink>

                        <NavLink
                            to="/home/settings"
                            onClick={() => setShowMenu(false)}
                        >
                            Account Settings
                        </NavLink>

                        <NavLink
                            to="/home/orders"
                            onClick={() => setShowMenu(false)}
                        >
                            My Orders
                        </NavLink>

                        <NavLink
                            to="/home/wishlist"
                            onClick={() => setShowMenu(false)}
                        >
                            Wishlist
                        </NavLink>

                        <button onClick={logout}>
                            Sign Out
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