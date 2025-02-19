import { ProductType } from "../types/types";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function ProductList({ products, itemsPerPage }: { products: ProductType[], itemsPerPage:number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [productsPerPage, setProductsPerPage] = useState(itemsPerPage);
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const indexOfLastProduct = currentPage * productsPerPage;
    const currentProducts = products.slice(indexOfLastProduct - productsPerPage, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);
    const favorites = useSelector((state: RootState) => state.user.user.wishlistIds);
    const favoritescopy=favorites
    const dispatch = useDispatch();

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", currentPage.toString());
        setSearchParams(newSearchParams);
    }, [currentPage, searchParams, setSearchParams]);
    if (products.length === 0) {
        return <div className="flex justify-center items-center h-96">Loading
        </div>
    }
    return (
        <div className="product-list-wrapper grid ">
            <div className={`flex flex-wrap gap-4 justify-center `}>
                {currentProducts.map((product) => {
                    // if (favoritescopy.includes(product.id)) {
                        return <ProductCard key={product.id} product={product} dispatch={dispatch} isCurrentItemFavorited={false} />;
                    // } else {
                        return <ProductCard key={product.id} product={product} dispatch={dispatch} isCurrentItemFavorited={false} />;
                    // }
                })}
            </div>
            <div className="navigation flex gap-4 mx-auto my-4">
                <Button onClick={() => setSearchParams({ page: (currentPage - 1).toString() })} disabled={currentPage === 1}>Previous</Button>
                <Button onClick={() => setSearchParams({ page: (currentPage + 1).toString() })} disabled={currentPage === totalPages}>Next</Button>
            </div>
        </div>
    )
}