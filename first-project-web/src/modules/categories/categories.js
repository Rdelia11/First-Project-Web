import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import { Link } from 'react-router-dom';

class Categories extends Component {
  constructor(props){
    super(props);
    this.state = {
      listCategories: [],
      sort: 'ASC',
      FilterView: []
    }
  }

  sortBy (column){
    let sortedCategory = this.state.listCategories;
    if(this.state.sort === 'ASC'){
      sortedCategory = _.sortBy(this.state.listCategories, column);
      this.setState({sort : 'DESC'});
    }else{
      sortedCategory = _.sortBy(this.state.listCategories, column).reverse();
      this.setState({sort : 'ASC'});
    }
      this.setState({listCategories : sortedCategory})
  }


  componentDidMount(){
    axios.get('https://decath-product-api.herokuapp.com/categories')
    .then((response) => this.setState({listCategories: response.data, FilterView: response.data}))
  }

  // componentDidUpdate(prevProps, prevState){
  //   if (prevProps.listCategories !== this.props.listCategories) {
  //     this.print1line()
  //   }
  // }

  print1line(){
    return this.state.FilterView.map((oneCategory, index) => {
      return(
        <tr>
          <td key={index}>
            <Link to={`/products/${oneCategory.id}`}>{oneCategory.label}</Link>
          </td>
        </tr>
      )
    })
  }

  hundleChange = (e) => {
    let searchResult = [];
    console.log(e.target.value.length);
    if (e.target.value.length === 0) {
      return searchResult = this.state.listCategories;
    } else {
      this.state.listCategories.filter(item => {
        if (item.label.toUpperCase().includes(e.target.value.toUpperCase())) {
          return searchResult.push(item);
        }
      })
    }
    //console.log(e.target.value)
    this.setState({FilterView : searchResult})

  }

  render () {
    return (
    <div id="page_container" className="col-10 offset-1">
      <h1 className="pb-3">Pick a category</h1>
      <form>
        <input className="SearchBar" type="text" placeholder="Search a category..." onChange={(e)=> this.hundleChange(e)} >
        </input>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" onClick={this.sortBy.bind(this, "label")}>Category name</th>
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
