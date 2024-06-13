import axios from "axios";

const BASE_URL = "https://cdn.tsetmc.com/api";

export const httpServiceTime = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
export const httpService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "text/plain",
    },
});