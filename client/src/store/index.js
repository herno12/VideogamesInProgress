import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import Rootreducer from "../reducer/index";

const store = createStore(Rootreducer,composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
