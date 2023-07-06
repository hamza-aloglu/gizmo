const AUTH_CODE = "code";

const token = (authCode) => {
    const codeVerifier = sessionStorage.getItem(process.env.REACT_APP_CODE_VERIFIER);

    return `http://localhost:8080/oauth2/token?code=${authCode}&client_id=public-client&redirect_uri=http://127.0.0.1:3000/redirect&grant_type=authorization_code&scope=openid&code_verifier=${codeVerifier}`

}

export default token;
