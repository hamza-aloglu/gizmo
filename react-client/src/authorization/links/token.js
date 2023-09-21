import authorizationServerUrl from "./authorizationServerUrl";
import reactClientUrl from "./reactClientUrl";

const AUTH_CODE = "code";

const token = (authCode) => {
    const codeVerifier = sessionStorage.getItem(process.env.REACT_APP_CODE_VERIFIER);

    return authorizationServerUrl() + `/oauth2/token?code=${authCode}&client_id=public-client&redirect_uri=${reactClientUrl()}/redirect&grant_type=authorization_code&scope=openid&code_verifier=${codeVerifier}`

}

export default token;
