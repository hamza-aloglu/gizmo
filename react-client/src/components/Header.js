import AuthService from "../services/AuthService"
import '../css/header.css'
import '../css/style.css'
import { Link } from 'react-router-dom';


const Header = ({ backgroundColor }) => {
    const isLoggedIn = AuthService.isLoggedIn();

    return (
        <div className="header-container" style={{ background: backgroundColor }}>
            {isLoggedIn ? (
                <div>
                    <Link className="link-text header-button" to={"/logout"}>logout</Link>
                </div>
            ) : (
                <div>
                    <Link className="link-text header-button" to={"/redirect"}> Login </Link>
                    <Link className="link-text header-button" to={"/register"}> Register </Link>
                </div>
            )}
        </div>
    )
}

export default Header;