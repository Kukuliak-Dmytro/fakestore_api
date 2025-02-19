import { useSelector } from "react-redux"
import ProductList from "../components/ProductList"
import { ProductType } from "../types/types"
import { useEffect, useState } from "react"
import { RootState } from "../state/store"
export default function WishList() {
    const [products, setProducts] = useState<ProductType[]>([])
    const favorites=useSelector((state:RootState)=>state.user.user.wishlistIds)
    useEffect(() => {
        const requestOptions:RequestInit = { method: "GET", redirect: "follow" }; 
        fetch("https://fakestoreapi.com/products", requestOptions)
        .then((response) => response.json())
        .then((result) => setProducts(result.filter((product:ProductType)=>favorites.includes(product.id))))
        .catch((error) => console.error(error));
    }, [])

    return (
        <div>
            <div className="wish-list-hero w-full h-48 bg-gray-500 flex justify-center items-center">
                <h1 className="text-white text-3xl">WishList</h1>
            </div>
            <ProductList products={products} itemsPerPage={9}></ProductList>
        </div>
    )
}