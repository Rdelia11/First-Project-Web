import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navbar from './../navbar/navbar';
import Home from './../home/home.js'
import Basket from './../basket/basket.js'
import Products from './../products/products.js'
import ProductView from './../productview/productview.js'
import Checkout from './../checkout/checkout.js'
import ProductAR from './../productAR/productar.js'

class LocalRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/products/:categoryId" component={Products}/>
          <Route path="/product/:productId" component={ProductView}/>
          <Route exact path="/basket" component={Basket}/>
          <Route exact path="/checkout" component={Checkout}/>
          <Route path="/productar" component={ProductAR}/>
        </div>
      </Router>
    )
  }
}

export default LocalRouter
