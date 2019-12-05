// ^import_reducer
import { combineReducers } from 'redux';
import { homeReducer } from './home/home';
// $import_reducer

const rootReducer = combineReducers({
    // ^define_reducer
    homeReducer// $define_reducer
});

export default rootReducer;