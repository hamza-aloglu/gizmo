import crypto from 'crypto-js';

const base64URL = (string) => {
    return string.toString(crypto.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

const generateCodeVerifier = () => {
    return base64URL(crypto.enc.Base64.stringify(crypto.lib.WordArray.random(32)));
}

const generateCodeChall = (codeVerifier) => {
    return base64URL(crypto.SHA256(codeVerifier));
}

export {
    generateCodeVerifier,
    generateCodeChall
}