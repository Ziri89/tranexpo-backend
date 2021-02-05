import axios from "axios";
import { API_BASE_URL } from "../config/config";

const login = (email, password) => {
    return axios
        .post(API_BASE_URL + "/login", { email, password })
        .then(response => {
            // console.log(response.data);
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
