import { combineReducers } from "redux";
import session from './session';

const allReducers = combineReducers({
    sessionReducer: session
});

export default allReducers;



