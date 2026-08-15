import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import ShopSection from "../../layouts/shopDashboard";
import { useApp } from "../../Context/appContext";
import { useToast } from "../../Context/ToastContext";
import useErrorHandler from "../../hooks/useErrorHandler";
export default function ShopDashboard() {
    
    const { server } = useApp();
    const { showModal } = useToast();
    const [shop, setShop] = useState({})
    const { handle } = useErrorHandler();
    const fetchShop = async () => {
        try{
            const response = await axios.get(`${server}/getMyShop`, {
                withCredentials: true
            })
            setShop(response.data.shopInfo)

            showModal(response.data?.message, "ok", response.data?.type)
        }catch(error){
            handle(error, "modal")
        }
    }

    useEffect(() => {
        fetchShop()
    }, [])
    
    return (
        <>
            {!shop ?
                <div className="no-shop">
                    <h2>You don't have a shop yet</h2>
                    <p>Create your shop and start selling your products.</p>

                    <Link
                        to="/home/myShop/create"
                        className="create-shop-link"
                    >
                        Create Shop
                    </Link>
                </div>
                :
                <ShopSection shop={shop} />
            }
        </>
    );
}