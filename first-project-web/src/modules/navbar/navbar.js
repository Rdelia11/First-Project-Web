import React, { Component } from 'react';

function Navbar(props){
  return(
    <div id="navbar">
      <div id="home">
        <i className="fas fa-home"></i>
      </div>
      <div id="logo">
        <img src={"https://nameless-cliffs-89719.herokuapp.com/images/logo.png"} width="100" alt="logo decathlon"/>
      </div>
      <div id="container">
        <div id="connectButton">
          <button type="button" className="btn btn-outline-light">Login</button>
        </div>
        <div id="logged">
          <span id="connected">Hello firstName</span>
        </div>
        <div id="cart">
          <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
