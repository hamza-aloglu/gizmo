import React, { useEffect, useState } from 'react';
import resourceUrl from '../authorization/links/resourceUrl';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Home = () => {
    const [resource, setResource] = useState("default backend resource");

    useEffect(() => {
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN)}`);
        const url = resourceUrl();

        fetch(url, {
            method: "GET",
            mode: "cors",
            headers
        }).then(async (result) => {
            console.log(result);
            const backendResource = await result.text();
            setResource(backendResource);
        });

    }, []);

    return (
        <div>

            <div className='Header'>
                Header...
            </div>

            <div>
                <h1> {resource} </h1>
                {AuthService.isLoggedIn() ? <Link to={"/logout"}> Logout </Link> : <Link to={"/redirect"}> Login </Link>}
            </div>

        </div>
    )
}

export default Home;
