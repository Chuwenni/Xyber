import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import { useApp } from "../../Context/appContext";
import useErrorHandler from "../../hooks/useErrorHandler";
const ShopProducts = () => {

    const { server } = useApp();
    const [products, setProducts] = useState([{}])
    const { handle } = useErrorHandler();
    const getShopProducts = async () => {
        try {
            const response = await axios.get(`${server}/getShopProducts`,{
                withCredentials: true
            })

            setProducts(response.data?.shopProducts)
        } catch (error) {
            handle(error, 'toast')
        }
    }

    useEffect(() => {
        getShopProducts();
    }, [])

    return(
        <div className="products-container">

            {products.map((element) => (
                <ProductCard
                    product={element}
                    key={element?._id || element?.id}
                />
            ))}

        </div>
    )

}

export default ShopProducts