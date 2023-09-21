import authorizationServerUrl from "./authorizationServerUrl";
import reactClientUrl from "./reactClientUrl";



const authorize = () => {
    const codeChallenge = sessionStorage.getItem(process.env.REACT_APP_CODE_CHALL);

    return  authorizationServerUrl() + `/oauth2/authorize?response_type=code&client_id=public-client&scope=openid&redirect_uri=${reactClientUrl()}/redirect&code_challenge=${codeChallenge}&code_challenge_method=S256`
    
}

export default authorize;