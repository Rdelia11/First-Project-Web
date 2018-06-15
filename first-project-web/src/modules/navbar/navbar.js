import React, { Component } from 'react';
import {mapStateToProps} from './../../store/basket/selector.js'
import {connect} from 'react-redux';
import {
  Link
} from 'react-router-dom';
import store from './../../store/store.js';
/* global gapi */

class Navbar extends Component{
  constructor(props){
    super(props);
  }

  howmanyArticleInBasket(){
    let nbArticleInBasket = 0;
    this.props.productsInBasket.forEach(oneProduct => nbArticleInBasket += oneProduct.quantity);
    return nbArticleInBasket;
  }

    signOut=()=>{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      //console.log('User signed out.');
        store.dispatch({type:"LOGOUT",loggedIn:false,name:"",urlPic:""});
        window.location.reload();
    });
  }

  render (){
    return(
      <div id="navbar" className="fixed-top">
        <div id="home">
          <Link to="/"><i className="fas fa-home"></i></Link>
        </div>
        {/* <div id="logo">
          <img src={"https://nameless-cliffs-89719.herokuapp.com/images/logo.png"} width="100" alt="logo decathlon"/>
        </div> */}
        <div id="container">



          <div id="connectButton">
            {this.props.loggedIn===false
              ? <GoogleButton />
              : (
                  <div>
                    <span id="logout">🏄🏼‍ {this.props.name.split(" ")[0]} | <a href="#" onClick={this.signOut}> Logout</a> </span>
                    <img src={this.props.urlPic} width="40px" className="urlPic"/>
                  </div>
                )

          }
          </div>




          <div id="cart">
            <Link to="/basket"><i className="fas fa-shopping-cart"></i>
            <div className="bottom-right">&nbsp;{this.howmanyArticleInBasket()}&nbsp;</div></Link>
          </div>
        </div>
      </div>
    );
  }
}

export function GoogleButton(props){
  return(
    <div className="g-signin2" data-onsuccess="googleConnectCallback" data-theme="dark"></div>
  )
}

export default connect(mapStateToProps, null)(Navbar);
