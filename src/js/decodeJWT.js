const decodeJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodedJWT = JSON.parse(window.atob(base64));
    return decodedJWT;
};

export default decodeJWT;