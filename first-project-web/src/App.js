import React, { Component } from 'react';
import './App.css';

import LocalRouter from './modules/router/router.js';
import Navbar from './modules/navbar/navbar';

import Categories from './modules/categories/categories'


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      signedIn:this.props.status
    }
  }

  render() {
    
    return (
      <div className="App">
        <Navbar/>
        <LocalRouter />
      </div>
    );
  }
}



export default App;
