import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../../assets/HomePage.css";
import Products from '../../components/skeleton/Products'
import Menubar from "../../layouts/Menubar";
import { useApp } from "../../Context/appContext";
const MainHomepage = () => {

  const {user} = useApp()

  console.log(user)

  return (    
      <>
        <nav className="navbar">
          <h2 className="logo">ShopEase</h2>
          <NavLink className="login-btn" to="/login">Login</NavLink>
        </nav>
        <Products count={24}/>
      </>
  )
}

export default MainHomepage 