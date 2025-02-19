import { ProductType } from "../types/types";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
export default function ProductList({ products, columns }: { products: ProductType[], columns: "2" | "3" | "4" }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [productsPerPage, setProductsPerPage] = useState(9);
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const indexOfLastProduct = currentPage * productsPerPage;
    const currentProducts = products.slice(indexOfLastProduct - productsPerPage, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);
    const  favorites = useSelector((state: RootState) => state.user.user.wishlistIds);

    const dispatch=useDispatch()
    useEffect(() => {
        setSearchParams({ page: currentPage.toString() });
    }, [currentPage, setSearchParams]);

    return (
        <div className="product-list-wrapper grid ">
            <div className={`flex flex-wrap gap-4 justify-center`}>
                {currentProducts.map((product) => {
                    if (favorites.includes(product.id)) {
                        return <ProductCard product={product} dispatch={dispatch} isCurrentItemFavorited={true} />;
                    } else {
                        return <ProductCard product={product} dispatch={dispatch} isCurrentItemFavorited={false} />;
                    }
                })}
            </div>
            <div className="navigation flex gap-4 mx-auto my-4">
                <Button onClick={() => setSearchParams({ page: (currentPage - 1).toString() })} disabled={currentPage === 1}>Previous</Button>
                <Button onClick={() => setSearchParams({ page: (currentPage + 1).toString() })} disabled={currentPage === totalPages}>Next</Button>
            </div>
        </div>
    )
}