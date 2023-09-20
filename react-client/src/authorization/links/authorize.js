import authorizationServerUrl from "./authorizationServerUrl";



const authorize = () => {
    const codeChallenge = sessionStorage.getItem(process.env.REACT_APP_CODE_CHALL);

    return  authorizationServerUrl() + `/oauth2/authorize?response_type=code&client_id=public-client&scope=openid&redirect_uri=http://127.0.0.1:3000/redirect&code_challenge=${codeChallenge}&code_challenge_method=S256`
    
}

export default authorize;