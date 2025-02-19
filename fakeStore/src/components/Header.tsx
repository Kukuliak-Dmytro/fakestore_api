import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../state/store"
export default function Header() {
    // const favorites = useSelector((state: RootState) => state.user.user?.wishlistIds?.length || 0);
    // const favorritesCopy=favorites
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <nav className="flex justify-between items-center w-full">
                <ul className="flex gap-4">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/catalog'>Catalog</Link></li>
                    <li>
                        <Link to='/wishlist'>Wishlist</Link>
                        {/* {favorritesCopy > 0 && <span className="bg-red-500 text-xs w-1 h-1 text-white rounded-full p-1">{favorritesCopy}</span>} */}
                        </li>
                </ul>
                <Link to='/login'>Login</Link>
            </nav>
        </header>
    )
}