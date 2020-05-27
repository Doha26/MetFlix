import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware } from 'redux';
import reducers from '~/reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';

const middlewares = [ReduxThunk];
const enhancer: any = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(reducers, {}, enhancer);
export default store;
