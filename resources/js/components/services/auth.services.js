import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const login = (email, password) => {
    return axios.post(API_URL + "login", { email, password }).then(response => {
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
