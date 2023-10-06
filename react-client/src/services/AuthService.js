import jwt_decode from 'jwt-decode';
import token from '../authorization/links/token';
import register from '../authorization/links/register';

const AuthService = {
    fetchToken: async (authCode) => {
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        const url = token(authCode);
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers
        });
    },

    isLoggedIn: () => {
        const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN);

        if (token != null) {
            const isTokenPersist = Date.now() / 1000 < jwt_decode(token).exp;

            if (!isTokenPersist) {
                sessionStorage.removeItem(process.env.REACT_APP_TOKEN);
            }

            return isTokenPersist;
        }
        return false;
    },

    registerUser: async (username, password) => {
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        const url = register();
        const body = {
            "username": username,
            "password": password,
        };

        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify(body),
        });
    },

    generateUsername: () => {
        const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN);
        return jwt_decode(token).sub;
    },
}

export default AuthService;