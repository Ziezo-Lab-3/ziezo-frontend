const URL = import.meta.env.VITE_BACKEND_URL;

export const postKlusje = async (klusje, token) => {
    console.log(klusje);
    const response = await fetch(`${URL}/klusje`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "access-token": token,
        },
        body: JSON.stringify(klusje),
    });
    return await response.json();
}

export const getKlusjes = async (token) => {
    const response = await fetch(`${URL}/klusje`);
    return await response.json();
}

export const getKlusjeById = async (id, token) => {
    const response = await fetch(`${URL}/klusje/${id}`);
    return await response.json();
}