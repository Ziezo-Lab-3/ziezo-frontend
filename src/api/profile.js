const URL = import.meta.env.VITE_BACKEND_URL;
import { parseParams } from "../js/parseParams";

export const getProfileById = async (token, id) => {
    const response = await fetch(`${URL}/profile/${id}`, {
        headers: {
            "x-access-token": token,
        },
    });
    return await response.json();
}

export const getProfileByUserId = async (token, id) => {
    const response = await fetch(`${URL}/profile/user/${id}`, {
        headers: {
            "x-access-token": token,
        },
    });
    return await response.json();
}