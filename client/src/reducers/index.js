import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import categoryReducer from './categoryReducer';
import authorReducer from './authorReducer';


export default combineReducers({
    auth: authReducer,
    errors:errorReducer,
    category:categoryReducer,
    author:authorReducer,
});
