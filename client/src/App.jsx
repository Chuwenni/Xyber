import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MainHomepage from "./pages/Mainhomepage"
import Login from "./pages/Login";
import ForgotPassword from './pages/Password';
import Register from "./pages/Register";
import Products from './components/skeleton/Products'
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditingDashboard";
import ShopDashboard from "./pages/shopDashboard";
import { AppContext } from "./Context/appContext";
import CreateShop from "./pages/CreateShop";
function App() {

  return (
    <BrowserRouter>
      <AppContext>
        <Routes>
          <Route path="/" element={<MainHomepage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/password' element={<ForgotPassword />} />
          <Route path="/home" element={<Homepage />}>
            <Route index element={<Products count={20} />} />
            <Route path="shops" />
            <Route path="myCart" />
            <Route path="myShop" element={<ShopDashboard />}/>
            <Route path="myShop/create" element={<CreateShop/>}/>
            <Route path="profile" element={<Dashboard />} />
            <Route path="profile/edit" element={<EditProfile />} />
          </Route>
        </Routes>
      </AppContext>
    </BrowserRouter>
  )
}

export default App
