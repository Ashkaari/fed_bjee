import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS, LOGOUT_SUCCESS
} from "./types";

const loginFailure = (message) => ({
    type: LOGIN_FAILURE,
    payload: {
        message: message
    }
});

const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

const logOutSuccess = () => ({
    type: LOGOUT_SUCCESS
});



export function login(username, password) {
    return dispatch => {
        if(username === 'admin' && password === '123') {
            dispatch(loginSuccess())
        } else dispatch(loginFailure("Неверные данные для входа"))
    };
}


export function logout() {
    return dispatch => {
        dispatch(logOutSuccess())
    }
}
