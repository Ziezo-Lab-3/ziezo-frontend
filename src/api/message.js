const URL = import.meta.env.VITE_BACKEND_URL;
import { parseParams } from "../js/parseParams";

/**
 * 
 * @param {string} token
 * @param {{
 *  first: number,
 * last: number,
 * filter: string (JSON.stringify(object))
 * }} id
 * @returns {Promise<{status: string, data: Array, message: string}>}
 */
export const getMessages = async (token, params) => {
    let suffix = "";
    if (params) suffix = parseParams(params);
    const response = await fetch(`${URL}/message?${suffix}`, {
        headers: {
            "x-access-token": token,
        },
    });
    return await response.json();
}

export const postMessage = async (token, message) => {
    const response = await fetch(`${URL}/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
        body: JSON.stringify(message),
    });
    return await response.json();
}