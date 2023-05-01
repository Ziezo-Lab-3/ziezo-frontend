const URL = import.meta.env.VITE_BACKEND_URL;

/**
 * 
 * @param { { name: string, description: string, category: string, price: number, image: string, address: string } } klusje 
 * @param { string } token 
 * @returns { { _id: string, name: string, description: string, price: number, image: string, createdAt: string, updatedAt: string, __v: number } }
 */
export const postKlusje = async (klusje, token) => {
    const response = await fetch(`${URL}/klusje`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "access-token": token,
        },
        body: JSON.stringify(klusje),
    });
    return await response.json();
};

/**
 * 
 * @param { string } token 
 * @param { { first: number, last: number, filter: string} } params 
 * @returns { { status: string, message: string, data: [{ _id: string, name: string, description: string, price: number, image: string, createdAt: string, updatedAt: string, __v: number }]}}
 */
export const getKlusjes = async (token, params) => {
    let suffix = "";
    if (params) {
        //Get all the keys and values from the filter object, and append them to the url.
        for (const [key, value] of Object.entries(params)) {
            suffix += `${key}=${value}&`;
        }
        //Remove the last & from the url.
        suffix = suffix.slice(0, -1);
    }
    const response = await fetch(`${URL}/klusje?${suffix}`);
    return await response.json();
};
