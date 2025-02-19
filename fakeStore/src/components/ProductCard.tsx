import { ProductType } from "../types/types";
import Button from "./Button";
export default function ProductCard({ product }: { product: ProductType }) {
    {console.log(product.image)}
    return (
        <div key={product.id} className='bg-white p-6 w-1/4  flex flex-col  items-center rounded-md justify-between'>
            <img className=' h-48 ' src={product.image} alt={product.title} />
            <h1 className='text-lg font-bold'>{product.title}</h1>
            <p className='text-sm'>{product.description}</p>
            <span className="text-left w-full font-bold">
                <p> {product.category}</p>
            </span>
            <span className="flex justify-between w-full">
                <p>
                    {product.rating.rate}/5
                </p>
            <p>
                {product.rating.count} reviews
            </p>
            </span>
            <span className="flex justify-between w-full items-center">
                <p className='text-sm font-bold'>${product.price}</p>
                <Button >Add to wishlist</Button>
            </span>
        </div>
    )
}
