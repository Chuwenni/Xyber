import {Routes, Route, Outlet} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Menubar from "../../layouts/Menubar";
const Homepage = () => {
  return (    
      <>
          <Menubar/>
          <Outlet/>
      </>
  )
}

export default Homepage