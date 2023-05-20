export const parseParams = (params) => {
    let suffix = "";
    //Get all the keys and values from the filter object, and append them to the url.
    for (const [key, value] of Object.entries(params)) {
        suffix += `${key}=${value}&`;
    }
    //Remove the last & from the url.
    return suffix.slice(0, -1);
};
