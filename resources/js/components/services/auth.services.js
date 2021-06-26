import axios from "axios";
//import { API_BASE_URL } from "../config/config";

const login = (email, password) => {
    return axios.post("api/login", { email, password }).then(response => {
        //console.log(response.data);
        if (response.data.login) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = id => {
    return axios.post("api/logout", { id }).then(res => {
        if (res.data.logout) {
            localStorage.removeItem("user");
        }
    });
};

export default {
    login,
    logout
};
