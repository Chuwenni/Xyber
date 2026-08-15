import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../Context/appContext"
import useErrorHandler from "../../hooks/useErrorHandler";
import axios from "axios"
import ShopCard from "../../layouts/ShopCard";
export default function Shop() {

    const { server } = useApp();
    const { handle } = useErrorHandler();

    const [shops, setShops] = useState([]);

    const fetchShops = async () => {
        try {
            const response = await axios.get(`${server}/getAllShops`, {
                withCredentials: true
            })

            setShops(response.data?.shops)
        } catch (error) {
            handle(error, "toast")
        }
    }

    console.log(shops)

    useEffect(() => {
        fetchShops()
    },[])

    return (
        <div className="shop-page">
            <div className="page-header">
                <h1>Shops</h1>
                <p>Discover shops and explore their products.</p>
            </div>
            {!shops
                ?
                <div>no Shops</div>
                :  
                shops.map((element , index) => (
                    <ShopCard shop={element} key={index}/>
                ))   
            }
        </div>
    )
}
