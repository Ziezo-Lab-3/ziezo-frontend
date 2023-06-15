const URL = import.meta.env.VITE_BACKEND_URL;
import { parseParams } from "../js/parseParams";

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
            "x-access-token": token,
        },
        body: JSON.stringify(klusje),
    });
    return await response.json();
};

export const getKlusjeById = async (token, id) => {
    const response = await fetch(`${URL}/klusje/${id}`, {
      headers: {
        "x-access-token": token,
      },
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
    if (params) suffix = parseParams(params);
    const response = await fetch(`${URL}/klusje?${suffix}`, {
        headers: {
            "x-access-token": token,
        },
    });
    return await response.json();
};

/**
 * 
 * @param { string } token 
 * @param { { first: number, last: number, filter: string} } params 
 * @returns { { status: string, message: string, data: { count: number } } }
 */
export const getKlusjesCount = async (token, params) => {
    let suffix = "";
    if (params) suffix = parseParams(params);
    const response = await fetch(`${URL}/klusje/count?${suffix}`, {
        headers: {
            "x-access-token": token,
        },
    });
    return await response.json();
}

export const addKlusjeCandidate = async (token, klusjeId, userId) => {
    const response = await fetch(`${URL}/klusje/${klusjeId}/candidates/${userId}`, {
        method: "POST",
        headers: {
            "x-access-token": token,
        },
    });
    return await response.json();
}

export const putKlusje = async (token, klusjeId, klusje) => {
    const response = await fetch(`${URL}/klusje/${klusjeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
        body: JSON.stringify(klusje),
    });
    return await response.json();
}