import authorizationServerUrl from "./authorizationServerUrl";



const register = () => {
    return  authorizationServerUrl() + '/register';
}

export default register;