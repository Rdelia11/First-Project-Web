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
    axios.get('https://decath-product-api.herokuapp.com/categories')
    .then((response) => this.setState({listCategories: response.data}))
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.listCategories !== this.props.listCategories) {
      this.print1line()
    }
  }

  print1line(){
    return this.state.listCategories.map((oneCategory, index) => {
      return(
        <tr>
          <td key={index}>{oneCategory.label}</td>
          <td>{oneCategory.id}</td>
        </tr>
      )
    })
  }

  render () {
    return (
    <div>
      <h1> Hello Julien</h1>
      <table>
        <thead>
          <tr>
            <td>Category name</td>
            <td>Category UUID</td>
          </tr>
        </thead>
        <tbody>
          {this.print1line()}
        </tbody>
      </table>
    </div>
    )
  }
}

export default Categories;
