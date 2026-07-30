import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import MainHomepage from "./pages/Mainhomepage"
import Login from "./pages/Login";
import ForgotPassword from './pages/Password';
import Register from "./pages/Register";
import Products from './components/skeleton/Products'
import Dashboard from "./layouts/Dashboard";
import { AppContext } from "./Context/appContext";
import EditProfile from "./layouts/EditingDashboard";
function App() {

  return (   
    <BrowserRouter>
      <AppContext>
        <Routes>
        <Route path="/" element={<MainHomepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/password' element={<ForgotPassword/>}/>
        <Route path="/home" element={<Homepage/>}>
          <Route index element={<Products count={20}/>}/>
          <Route path="shops"/>
          <Route path="myCart"/>
          <Route path="myShop"/>
          <Route path="profile" element={<Dashboard/>}/>
          <Route path="profile/edit" element={<EditProfile/>}/>
        </Route>
      </Routes>
      </AppContext>
    </BrowserRouter>
  )
}

export default App
