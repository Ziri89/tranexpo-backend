// Login Actions
import AuthService from "../services/auth-services";
export const login = (email, password) => dispatch => {
    return AuthService.login(email, password).then(
        data => {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { user: data }
            });

            return Promise.resolve();
        },
        error => {
            const message =
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
        type: LOGOUT
    });
};

// Message actions
export const setMessage = message => ({
    type: "SET_MESSAGE",
    payload: message
});

export const clearMessage = () => ({
    type: "CLEAR_MESSAGE"
});
