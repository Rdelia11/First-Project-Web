import { createStore } from 'redux';
import BasketReducer from './basket/reducer.js'
const Store = createStore(BasketReducer);

export default Store
