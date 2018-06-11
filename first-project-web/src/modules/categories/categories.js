import React, { Component } from 'react';
import axios from 'axios';




class Categories extends Component {
  getCategories() {
    axios.get('https://decath-product-api.herokuapp.com/categories')
    .then((response) => response.data.forEach(categorie => this.printCat(categorie.id)))
  }

  printCat(oneCategorie) {
    console.log(oneCategorie);
    return (
    <div>
      <h5>test</h5>
    </div>
    )
  }

  render () {
    return (
    <div>
        <h1> Hello Julien</h1>
    {this.getCategories()}
    </div>
    )
  }
}

export default Categories;
