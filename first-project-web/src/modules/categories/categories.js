import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
          <td key={index}>
            <Link to={`/products/${oneCategory.id}`}>{oneCategory.label}</Link>
          </td>
        </tr>
      )
    })
  }

  render () {
    return (
    <div id="page_container" className="col-10 offset-1">
      <h1 className="pb-3">Pick a category</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Category name</th>
            {/* <th>Category UUID</th> */}
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
