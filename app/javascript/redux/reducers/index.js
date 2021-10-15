import userReducer from './user';
import {combineReducers} from 'redux';
import errorReducer from '../actions/error';

const rootReducer = combineReducers({
    user: userReducer,
    error: errorReducer,
});

export default rootReducer;
