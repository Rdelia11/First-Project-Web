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
        <button onClick={function(){document.documentElement.scrollTop = 0}} id="topButton" className="topButton"><i class="fas fa-arrow-up"></i></button>
      </div>
    );
  }
}

export default App;
