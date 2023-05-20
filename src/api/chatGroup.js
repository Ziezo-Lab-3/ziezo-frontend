const URL = import.meta.env.VITE_BACKEND_URL;
export const getChatGroups = async (token) => {
    try {
        const response = await fetch(`${URL}/chatgroup`, {
            headers: {
                "x-access-token": token,
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const postChatGroup = async (token, data) => {
    try {
        const response = await fetch(`${URL}/chatgroup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}