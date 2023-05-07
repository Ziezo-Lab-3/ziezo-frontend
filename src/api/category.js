const URL = import.meta.env.VITE_BACKEND_URL;
export const getCategories = async (token) => {
    try {
        const response = await fetch(`${URL}/category`, {
            headers: {
                "x-access-token": token,
            },
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};