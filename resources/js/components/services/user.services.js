import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "user");
};
const getUserBoard = () => {
    return axios.get(API_URL + "three_month", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "six_month", { headers: authHeader() });
};
const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard
};
