import React, { Component } from 'react';
import './App.css';

import LocalRouter from './modules/router/router.js';
import Navbar from './modules/navbar/navbar';

import Categories from './modules/categories/categories'


class App extends Component {
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
