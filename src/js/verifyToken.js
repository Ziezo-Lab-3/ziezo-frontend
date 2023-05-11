import decodeJWT from "./decodeJWT";
/**
 * @description Verify if the token is valid
 * @returns {boolean} true if the token is valid, false if not
 */
const verifyToken = () => {
    const token = localStorage.getItem('token');
    if (token === null) {
        return false;
    }
    const decoded = decodeJWT(token);
    if (decoded === null) {
        return false;
    }
    if (decoded.exp < Date.now() / 1000) {
        return false;
    }
    return true;
}

export default verifyToken;