import React, { Component } from 'react';
import './App.css';

import LocalRouter from './modules/router/router.js';

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
        <LocalRouter />
      </div>
    );
  }
}

export default App;
