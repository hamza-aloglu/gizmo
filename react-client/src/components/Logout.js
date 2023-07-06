import { useEffect, useState } from "react"

const Logout = () => {

    useEffect(() => {
        sessionStorage.removeItem(process.env.REACT_APP_TOKEN);
        window.location.href = "http://localhost:8080/logout";
    }, []);

    return (
        <h3> Logging out... </h3>
    )
}

export default Logout;