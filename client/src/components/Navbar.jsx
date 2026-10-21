import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await handleLogout();
        navigate("/login");
    }

    return (
        <>
            <nav>
                <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <button className="bg-red-700 text-white cursor-pointer px-4 py-2 rounded-md" onClick={handleLogoutClick}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar