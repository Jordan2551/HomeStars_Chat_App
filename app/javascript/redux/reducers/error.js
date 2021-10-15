import { SET_ERRORS, RESET_ERRORS } from "../action_types/error";

const initialState = {
    errors: [],
}

const errorReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            } 

        case RESET_ERRORS: 
            return initialState;

        default: 
            return state;
    }
}

export default errorReducer;