import jwt_decode from 'jwt-decode';
import token from '../authorization/links/token';

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

        if(token != null) {
            const isTokenPersist = Date.now() / 1000 < jwt_decode(token).exp;

            if(!isTokenPersist) {
                sessionStorage.removeItem(process.env.REACT_APP_TOKEN);
            }

            return isTokenPersist;
        }
        return false;
    }
}

export default AuthService;