import React, { useEffect } from 'react';
import authorize from '../authorization/links/authorize';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthService from '../services/AuthService';
import {generateCodeVerifier, generateCodeChall} from '../authorization/pkce';
import './css/spinner.css';

/*
    * User clicks login button and is redirected to this component.
    * Since there is no token in session and no "code" in search params user is redirected to authorize url.
    * User comes back with "code" in search params.
    * Since no token, fetch request is sent. Awaited result. Token is set on session storage and then navigated to home.
*/


const Redirect = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const authCodeString = process.env.REACT_APP_AUTH_CODE;
    const tokenString = process.env.REACT_APP_TOKEN;

    useEffect( () => {

        if(!sessionStorage?.getItem(tokenString) && !searchParams?.get(authCodeString)) {

            const codeVerifier = generateCodeVerifier();
            sessionStorage.setItem(process.env.REACT_APP_CODE_VERIFIER, codeVerifier);
            const codeChall = generateCodeChall(codeVerifier);
            sessionStorage.setItem(process.env.REACT_APP_CODE_CHALL, codeChall);

            console.log("sending request to authorize endpoint in the authorization server...");
            window.location.href = authorize();
        }
        else if(!sessionStorage?.getItem(tokenString)) {
            const authCode = searchParams.get(authCodeString);
            
            // Fetch Token
            AuthService.fetchToken(authCode).then(async (response) => {
                const token = await response.json();
                sessionStorage.setItem(tokenString, token.access_token);
                navigate("/home");
            })
            .catch( (err) => {
                // TODO: snackbar error screen
                console.log("Couldn't fetch the access token (/token endpoint).");
            } );
        }
        else {
            navigate("/home");
        }
    }, [] );

    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <span className="text">Redirecting</span>
        </div>
    )
}

export default Redirect;
