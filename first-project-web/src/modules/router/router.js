import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import Home from './../home/home.js'
import Basket from './../basket/basket.js'
import Products from './../products/products.js'
import ProductView from './../productview/productview.js'

class LocalRouter extends Component {
  render() {
    return (
      <Router>
        <div>

          <Route exact path="/" component={Home}/>
          <Route exact path="/products/:categoryId" component={Products}/>
          <Route path="/product/:productId" component={ProductView}/>
          <Route exact path="/basket" component={Basket}/>
        </div>
      </Router>
    )
  }
}

export default LocalRouter
