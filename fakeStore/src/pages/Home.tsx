import InputText from "../components/InputText";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductType } from "../types/types";
import ProductList from "../components/ProductList";

interface FilterProps {
    search: string;
    category: string[];
    min_price: number;
    max_price: number;
    min_rating: number;
}

export default function Home() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
    const [currentFilter, setCurrentFilter] = useState<FilterProps>({
        search: "",
        category: [],
        min_price: 0,
        max_price: 9999,
        min_rating: 0,
    });

    const filterProducts = () => {
        const searchFilterResult = products.filter(
            (product) =>
                product.title.toLowerCase().includes(currentFilter.search.toLowerCase()) ||
                product.description.toLowerCase().includes(currentFilter.search.toLowerCase())
        );

        const categoryFilterResult = searchFilterResult.filter(
            (product) => currentFilter.category.length === 0 || currentFilter.category.includes(product.category)
        );

        const priceFilterResult = categoryFilterResult.filter(
            (product) => product.price >= currentFilter.min_price && product.price <= currentFilter.max_price
        );

        const ratingFilterResult = priceFilterResult.filter(
            (product) => product.rating.rate >= currentFilter.min_rating
        );

        setSearchedProducts(ratingFilterResult);
    };

    useEffect(() => {
        filterProducts();
    }, [currentFilter, products]);
    
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        filterProducts();
    };

    useEffect(() => {
        const requestOptions: RequestInit = { method: "GET", redirect: "follow" };
        fetch("https://fakestoreapi.com/products", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setProducts(result);
                setSearchedProducts(result); // Show all products by default
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="home-page-wrapper w-full h-96 bg-gray-500">
            <form className="hero flex flex-col justify-center items-center h-full gap-4" onSubmit={handleSearch}>
                <span className="flex items-end gap-4">
                    <InputText
                        id="search"
                        placeholder="Search..."
                        title=""
                        defaultValue={currentFilter.search}
                        onChange={(e) => setCurrentFilter({ ...currentFilter, search: e.target.value })}
                    />
                    <Button type="submit">Search</Button>
                </span>
                <h1 className="text-3xl text-white">Welcome to FakeStore</h1>
            </form>
            <div className="results-wrapper p-30 flex">
                <div className="filters-wrapper p-4 bg-white rounded shadow-md mr-4">
                    <div className="filter w-90">
                        <div className="filter-category mb-4">
                            <h2 className="text-xl font-semibold mb-2">Filter by category</h2>
                            {["electronics", "jewelery", "men's clothing", "women's clothing"].map((category) => (
                                <div key={category} className="mb-2">
                                    <input
                                        type="checkbox"
                                        id={category}
                                        name={category}
                                        value={category}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setCurrentFilter((prev) => ({
                                                ...prev,
                                                category: checked
                                                    ? [...prev.category, category]
                                                    : prev.category.filter((c) => c !== category),
                                            }));
                                        }}
                                    />
                                    <label htmlFor={category} className="ml-2">{category}</label>
                                </div>
                            ))}
                        </div>
                        <div className="filter-price mb-4">
                            <h2 className="text-xl font-semibold mb-2">Price</h2>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min={1}
                                    max={500}
                                    defaultValue={0}
                                    className="border p-1 rounded"
                                    onChange={(e) => setCurrentFilter({ ...currentFilter, min_price: parseInt(e.target.value, 10) })}
                                />
                                <input
                                    type="number"
                                    min={0}
                                    max={500}
                                    defaultValue={500}
                                    className="border p-1 rounded"
                                    onChange={(e) => setCurrentFilter({ ...currentFilter, max_price: parseInt(e.target.value, 10) })}
                                />
                            </div>
                        </div>
                        <div className="filter-rating">
                            <h2 className="text-xl font-semibold mb-2">Rating</h2>
                            <input
                                type="number"
                                min={0}
                                max={5}
                                defaultValue={0}
                                className="border p-1 rounded"
                                onChange={(e) => setCurrentFilter({ ...currentFilter, min_rating: parseInt(e.target.value, 10) })}
                            />
                        </div>
                    </div>
                </div>
                <ProductList products={searchedProducts} itemsPerPage={6} />
            </div>
        </div>
                        
    );
}
