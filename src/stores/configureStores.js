import {
    combineReducers,
    createStore,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers';

export default function configureStores(history, initialState) {

    const middleware = routerMiddleware(history);

    const store = createStore(
        combineReducers({
            root: rootReducer,
            router: routerReducer
        }),
        applyMiddleware(thunk, middleware),
        initialState
    );

    return store;
}
