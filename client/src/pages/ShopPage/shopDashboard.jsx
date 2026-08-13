import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import ShopSection from "../../layouts/shopDashboard";
import { useApp } from "../../Context/appContext";
import { useToast } from "../../Context/ToastContext";
export default function ShopDashboard() {
    
    const { user, server } = useApp();
    const { showModal} = useToast();
    const [shop, setShop] = useState({})
    const fetchShop = async () => {
        try{
            const response = await axios.get(`${server}/getMyShop`, {
                withCredentials: true
            })
            setShop(response.data.shopInfo)

        }catch(error){
            console.log(error.response)
            if(error.response){
                setShop(null)
                switch(error.response.status){
                    case 403:
                        showModal(error.response.data.message, "ok", error.response.data.type)
                        break
                    case 401:
                        showModal(error.response.data.message, "ok", error.reponse.data.type)
                        break   
                }
            }
        }
    }

    useEffect(() => {
        fetchShop()
    }, [])
    
    console.log(shop)
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