import React, { Component } from 'react';
import axios from 'axios';

class Categories extends Component {
  constructor(props){
    super(props);
    this.state = {
      listCategories: []
    }
  }

  componentDidMount(){
    this.getCategories();
  }

  getCategories() {
    axios.get('https://decath-product-api.herokuapp.com/categories')
    .then((response) => this.setState({listCategories: response.data}))
    //                  this.setState({report: response.data})
  }

  render () {
    return (
    <div>
        <h1> Hello Julien</h1>
        {/* {this.state.listCategories[0]} */}
        {console.log(this.state.listCategories[0])}
    </div>
    )
  }
}

export default Categories;
