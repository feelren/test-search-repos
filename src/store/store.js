import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

let reducers = combineReducers({
	root: reducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
