import {
    combineReducers,
    createStore,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers';
import auction from '../reducers/auction/Auction';

export default function configureStores(history, initialState) {

    const middleware = routerMiddleware(history);

    const store = createStore(
        combineReducers({
            auctionPlayers: auction,
            router: routerReducer
        }),
        applyMiddleware(thunk, middleware),
        initialState
    );

    return store;
}
