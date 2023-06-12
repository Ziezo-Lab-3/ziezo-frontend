const URL = import.meta.env.VITE_BACKEND_URL;

export const getPersonalInfo = async (token) => {
    const response = await fetch(`${URL}/user/token`, {
        headers: {
            "x-access-token": token,
        },
    });
    return await response.json();
}

export const getUserByID = async (id) => {
    const response = await fetch(`${URL}/user/${id}`);
    return await response.json();
}