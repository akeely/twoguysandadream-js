import {
    createStore,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStores(initialState) {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk),
        initialState
    );

    return store;
}
