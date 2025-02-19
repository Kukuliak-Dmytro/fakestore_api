import InputText from "../components/InputText"
import Button from "../components/Button"
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductType } from "../types/types";
import ProductList from "../components/ProductList";
interface FilterProps{
    // search:string,
    category: string[];
    min_price:number;
    max_price:number;
    min_rating:number;

}
export default function Catalog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<ProductType[]>([]);
    const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
    const [currentFilter, setCurrentFilter] = useState<FilterProps>({
        category: [],
        min_price: 0,
        max_price: 9999,
        min_rating: 0
    });
    useEffect(() => {
        const categoryFilterResult = products.filter((product) => 
            currentFilter.category.length === 0 || currentFilter.category.includes(product.category)
        );
        const priceFilterResult = categoryFilterResult.filter((product) =>
            product.price >= currentFilter.min_price && product.price <= currentFilter.max_price
        );
        const ratingFilterResult = priceFilterResult.filter((product) =>
            product.rating.rate >= currentFilter.min_rating
        );
        setSearchedProducts(ratingFilterResult);
    },[currentFilter])
    useEffect(() => {
        const searchQuery = searchParams.get("search") || "";
        setSearch(searchQuery);
    }, [searchParams]);

    useEffect(() => {
        const requestOptions: RequestInit = { method: "GET", redirect: "follow" };
        fetch("https://fakestoreapi.com/products", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setProducts(result);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setSearchedProducts(products.filter((product) => 
            product.title.toLowerCase().includes(search.toLowerCase()) || 
            product.description.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, products]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
        setSearchParams({ search: newSearch });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ search });
    };

    return (
        <div className="home-page-wrapper w-full h-96 bg-gray-500">
            <form className="hero flex flex-col justify-center items-center h-full gap-4" onSubmit={handleSearchSubmit}>
                <span className='flex items-end gap-4'>
                    <InputText id='search' placeholder='Search...' title='' defaultValue={search} onChange={handleSearchChange} />
                    <Button type='submit'>Search</Button>
                </span>
                <h1 className='text-3xl text-white '>Welcome to FakeStore</h1>
            </form>
            <div className="results-wrapper p-30 flex">
                <div className="filters-wrappers">
                    <div className="filter w-90">
                        <div className="filter-category">
                            <h2>Filter by category</h2>
                            {["electronics", "jewelery", "men's clothing", "women's clothing"].map((category) => (
                                <div key={category}>
                                    <input
                                        type="checkbox"
                                        id={category}
                                        name={category}
                                        value={category}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            if (checked) {
                                                setCurrentFilter((prev) => ({
                                                    ...prev,
                                                    category: [...prev.category, category]
                                                }));
                                            } else {
                                                setCurrentFilter((prev) => ({
                                                    ...prev,
                                                    category: prev.category.filter((c) => c !== category)
                                                }));
                                            }
                                        }}
                                    />
                                    <label htmlFor={category}>{category}</label>
                                </div>
                            ))}
                        </div>
                        <div className="filter-price">
                            <h2>Price</h2>
                            <input type="number" name="" id="" min={0} max={500} onChange={(e)=>setCurrentFilter({...currentFilter, min_price: parseInt(e.target.value, 10)})}/>
                            <input type="number" name="" id="" min={0} max={500} onChange={(e)=>setCurrentFilter({...currentFilter, max_price: parseInt(e.target.value, 10)})}/>
                        </div>
                        <div className="filter-rating">
                            <h2>Rating</h2>
                            <input type="number" name="" id="" min={0} max={5} onChange={(e)=>setCurrentFilter({...currentFilter, min_rating: parseInt(e.target.value, 10)})}/>
                        </div>
                    </div>
                </div>
                <ProductList products={searchedProducts} itemsPerPage={6} />
            </div>
        </div>
    )
}