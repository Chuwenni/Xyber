import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import MainHomepage from "./pages/HomePage/Mainhomepage"
import Login from "./pages/Authentication/Login";
import ForgotPassword from './pages/Authentication/Password';
import Register from "./pages/Authentication/Register";
import Products from "./layouts/Products";
import Dashboard from "./pages/UserDashBoard/Dashboard";
import EditProfile from "./pages/UserDashBoard/EditingDashboard";
import ShopDashboard from "./pages/ShopPage/shopDashboard";
import { AppContext } from "./Context/appContext";
import CreateShop from "./pages/ShopPage/CreateShop";
import CreateProduct from "./pages/ShopPage/Createproduct";
import ShopProducts from "./pages/ShopPage/ShopProducts";
import Cart from "./pages/ShopPage/Cart"
import Shop from "./pages/ShopPage/Shop"
import AccountSettings from "./pages/ShopPage/AccountSettings";
import ProductView from "./pages/ShopPage/ProductView";
import ShopView from "./pages/ShopPage/ShopView";
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
            <Route index element={<Products />} />
            <Route path="products/:productId" element={<ProductView />} />
            <Route path="shops" element={<Shop />} />
            <Route path="shops/:shopId" element={<ShopView />} />
            <Route path="myCart" element={<Cart/>} />
            <Route path="myShop" element={<ShopDashboard />} />
            <Route path="myShop/create" element={<CreateShop />} />
            <Route path="myShop/createProduct" element={<CreateProduct/>}/>
            <Route path="myShop/products" element={<ShopProducts/>}/>"
            <Route path="profile" element={<Dashboard />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="settings" element={<AccountSettings/>}/>
          </Route>
        </Routes>
      </AppContext>
    </BrowserRouter>
  )
}

export default App
