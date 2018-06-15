import { createStore } from 'redux';
import BasketReducer from './basket/reducer.js'
import { applyMiddleware } from "redux";
import logger from "redux-logger";

const Store = createStore(BasketReducer,
  applyMiddleware(logger)
);



export default Store
