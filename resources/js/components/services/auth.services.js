import axios from "axios";
import authHeader from "./auth-header";
//import { API_BASE_URL } from "../config/config";

console.log(authHeader());

const login = (email, password) => {
    return axios.post("api/login", { email, password }).then(response => {
        //console.log(response.data);
        if (response.data.login) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    login,
    logout
};
