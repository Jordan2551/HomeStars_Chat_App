import { SET_LOGGED_IN, SET_LOGGED_OUT, SET_EMAIL, SET_PASSWORD } from "../action_types/user";

const initialState = {
    user: {
        id: null,
        email: '',
        password: '',
        isLoggedIn: false,
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_LOGGED_IN:
            return {
                ...state,
                user: {
                    password: initialState.user.password,
                    isLoggedIn: true,
                    ...action.payload,
                },
            }

        case SET_LOGGED_OUT:
            return initialState

        case SET_EMAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload
                },
            }

        case SET_PASSWORD:
            return {
                ...state,
                user: {
                    ...state.user,
                    password: action.payload,
                },
            }


        default: 
            return state
    }
}

export default userReducer;