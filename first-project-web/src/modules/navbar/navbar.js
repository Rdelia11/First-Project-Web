import React, { Component } from 'react';
import {mapStateToProps} from './../../store/basket/selector.js'
import {connect} from 'react-redux';


class Navbar extends Component{

  howmanyArticleInBasket(){
    let nbArticleInBasket = 0;
    this.props.productsInBasket.forEach(oneProduct => nbArticleInBasket += oneProduct.quantity);
    return nbArticleInBasket;
  }

  render (){
    return(
      <div id="navbar" className="fixed-top">
        <div id="home">
          <a href="/"><i className="fas fa-home"></i></a>
        </div>
        <div id="logo">
          <img src={"https://nameless-cliffs-89719.herokuapp.com/images/logo.png"} width="100" alt="logo decathlon"/>
        </div>
        <div id="container">
          <div id="connectButton">
            {/* <GoogleLogin clientId="975507228152-s6o2o4cnih74js8prhaoru6bhnj152lk.apps.googleusercontent.com" buttonText="Login" onSuccess={responseGoogle} onFailure={responseGoogle}/> */}
            <div className="g-signin2" data-onsuccess="googleConnectCallback" data-theme="dark">
            </div>
          </div>
          <div id="logged">
            <span id="connected">Hello firstName</span>
          </div>
          <div id="cart">
            <a href="/basket"><i className="fas fa-shopping-cart"></i></a>
            <div className="bottom-right">&nbsp;{this.howmanyArticleInBasket()}&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Navbar);
