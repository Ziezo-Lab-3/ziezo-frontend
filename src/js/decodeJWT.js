/**
 * Decodes a JWT token and returns the decoded JWT
 * @param {string} token - JWT token
 * @returns {{ exp: number, iat: number, id: string }} decoded JWT
 * @see https://stackoverflow.com/a/38552302/12399621
 */
const decodeJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodedJWT = JSON.parse(window.atob(base64));
    return decodedJWT;
};

export default decodeJWT;