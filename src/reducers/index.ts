import {combineReducers} from 'redux';
import uiReducer from './ui-reducer';
import searchReducer from './search-reducer';

export default combineReducers({
    uiReducer,
    searchReducer,
});
