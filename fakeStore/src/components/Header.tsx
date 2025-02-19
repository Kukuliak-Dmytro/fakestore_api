import { Link } from "react-router-dom"
export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <nav className="flex justify-between items-center w-full">
                <ul className="flex gap-4">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/catalog'>Catalog</Link></li>
                    <li><Link to='/wishlist'>Wishlist</Link></li>
                </ul>
                <Link to='/login'>Login</Link>
            </nav>
        </header>
    )
}