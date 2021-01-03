// Login Actions
import AuthService from "../services/auth.services";
let message;
export const login = (email, password) => dispatch => {
    return AuthService.login(email, password).then(
        data => {
            message = data.message;
            if (data.success) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { user: data }
                });
                dispatch({
                    type: "SET_MESSAGE",
                    payload: message
                });
                //console.log(data.success);
                return Promise.resolve();
            } else {
                dispatch({
                    type: "LOGIN_FAIL"
                });
                dispatch({
                    type: "SET_MESSAGE",
                    payload: message
                });
                //console.log(data.message);
            }
        },
        error => {
            message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: "LOGIN_FAIL"
            });

            dispatch({
                type: "SET_MESSAGE",
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const logout = () => dispatch => {
    AuthService.logout();

    dispatch({
        type: "LOGOUT"
    });
};
