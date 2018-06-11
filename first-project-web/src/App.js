import React, { Component } from 'react';
import './App.css';
import LocalRouter from './modules/router/router.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <LocalRouter />
      </div>
    );
  }
}

export default App;
