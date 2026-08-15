import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../../assets/HomePage.css";
import Products from "../../layouts/Products"
import Menubar from "../../layouts/Menubar";
const MainHomepage = () => {

  return (    
      <>
        <nav className="navbar">
          <h2 className="logo">ShopEase</h2>
          <NavLink className="login-btn" to="/login">Login</NavLink>
        </nav>
        <Products/>
      </>
  )
}

export default MainHomepage 