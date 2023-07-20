import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import '../../css/spinner.css';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem(process.env.REACT_APP_TOKEN);
        navigate("/home");
    }, []);

    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <span className="text">Logging out</span>
        </div>
    )
}

export default Logout;