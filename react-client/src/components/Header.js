import AuthService from "../services/AuthService"
import './css/header.css'
import { Link } from 'react-router-dom';


const Header = () => {
    const isLoggedIn = AuthService.isLoggedIn();

    return (
        <div className="header-container">
            <h1 className="header-title">My App</h1>
            {isLoggedIn ? (
                <button className="header-button">
                <Link to={"/logout"}> Logout </Link> 
                </button>
            ) : (
                <div>
                    <button className="header-button">
                        <Link to={"/redirect"}> Login </Link>
                    </button>
                    <button className="header-button">
                        <Link to={"/register"}> Register </Link>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Header;