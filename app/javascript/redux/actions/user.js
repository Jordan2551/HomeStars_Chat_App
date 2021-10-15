import { SET_EMAIL, SET_LOGGED_IN, SET_LOGGED_OUT, SET_PASSWORD } from "../action_types/user";
import history from "../../helpers/history";
import APIWrapper from "../../helpers/apiWrapper";
import { API_PATH } from "../../helpers/consts";
import axios from "axios";

export const login = (setErrors) => {
    return async (dispatch, getState) => {
        const {email, password} = getState().user.user;

        const body = {user: { email, password}};
        const result = await APIWrapper.handleAPIRequest(() => axios.post(`${API_PATH}/users/sign_in`, body), setErrors, false);

        dispatch({
            type: SET_LOGGED_IN,
            payload: {
                id: result.id,
                email: result.email,
            }
        });

        // Redirect to channels path after login
        history.push("/channels");
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        const {email} = getState().user.user;

        const body = {
            user: { email }
        }

        await APIWrapper.handleAPIRequest(() => axios.delete(`${API_PATH}/users/sign_out`, body));
        
        dispatch({
            type: SET_LOGGED_OUT,
        });

        // Redirect to the root path after logout
        history.push("/");
    }
}

export const setEmail = (email) => {
    return {
        type: SET_EMAIL,
        payload: email,
    }
}

export const setPassword = (password) => {
    return {
        type: SET_PASSWORD,
        payload: password,
    }
}