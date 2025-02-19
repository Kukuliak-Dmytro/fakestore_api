import InputText from '../components/InputText';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductType } from '../types/types';
import ProductList from '../components/ProductList';
import Button from '../components/Button';
export default function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductType[]>([])
    const [search, setSearch] = useState('')

    const SearchAndRedirect = (event: any) => {
        event.preventDefault();
        navigate(`/catalog?search=${search}`)
    }
    useEffect(() => {

        const requestOptions:RequestInit = { method: "GET", redirect: "follow" }; 
        fetch("https://fakestoreapi.com/products", requestOptions)
        .then((response) => response.text())
        .then((result) => setProducts(JSON.parse(result)))
        .catch((error) => console.error(error));

    }
    )
    return (
        <div className="home-page-wrapper w-full h-96 bg-gray-500">
            <form className="hero flex flex-col justify-center items-center h-full gap-4" onSubmit={(e) => { SearchAndRedirect(e) }}>
                <span className='flex items-end gap-4'>
                    <InputText id='search' placeholder='Search...' title='' onChange={(event) => { setSearch(event.target.value) }}></InputText>
                   <Button type='submit'>Search</Button>
                </span>
                <h1 className='text-3xl text-white '>Welcome to FakeStore</h1>

            </form>
            <div className="product-list-home p-10 bg-gray-100">
                <ProductList products={products} ></ProductList>
            </div>

        </div>
    )
}