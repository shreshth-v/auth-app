import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

const apiClientImageUpload = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export { apiClient, apiClientImageUpload };