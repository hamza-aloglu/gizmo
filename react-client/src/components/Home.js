import React, { useEffect, useState } from 'react';
import resourceUrl from '../authorization/links/resourceUrl';
import Header from './Header';

const Home = () => {
    const [resource, setResource] = useState("default backend resource");

    useEffect(() => {
        // example resource server request. Will be overwritten.
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
            <Header />

            <h1> {resource} </h1>
        </div>
    )
}

export default Home;
