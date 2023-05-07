const URL = import.meta.env.VITE_BACKEND_URL;
export const getCategories = async (token) => {
    try {
        const response = await fetch(`${URL}/category`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};