import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
// import requestsMiddleWare from '../middleware/requestsMiddleWare';
// import storeAccessMiddleWare from '../middleware/storeAccessMiddleWare';


const createStoreWithMiddleware = applyMiddleware()(createStore)

export default function configureStore() {
    return createStoreWithMiddleware(rootReducer);
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    //     applyMiddleware(requestsMiddleWare, storeAccessMiddleWare)
    // );
}