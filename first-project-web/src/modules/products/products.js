import React, {Component} from 'react'
import axios from 'axios';

const Product = ({ match }) => (
  <div>
    <h2>This is the product</h2>
    ${match.url};
  </div>
)

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      listProducts:[],
      FilterView: []
    }
  }

  componentDidMount(){
    axios.get('https://decath-product-api.herokuapp.com/categories/9f8d8840-e22c-496f-b865-f5014710e234/products')
    .then((response) => this.setState({listProducts: response.data, FilterView: response.data}))
  }

  print1line(){
    return this.state.FilterView.map((oneProduct, index) => {console.log(oneProduct);
      return(
        <div id="page_container" className="col-8 offset-2">
        <div key={index}>
          <div className="card-body">
          </div>
          <div className="card-section">
            <a href="#"><h4 className="card-product-name">{oneProduct.title}</h4></a>
            <img src={`https://www.decathlon.fr/media/${oneProduct.image_path}`} alt="Product"></img>
            <h5 className="card-product-price">{oneProduct.min_price}€</h5>
            <p className="card-product-description">{oneProduct.description}</p>
            <a href="#" className="btn btn-outline-primary">Add to basket</a>
          </div>
        </div>
        </div>
      )
    })
  }

  hundleChange = (e) => {
    let searchResult = [];
    console.log(e.target.value.length);
    if (e.target.value.length === 0) {
      return searchResult = this.state.listProducts;
    } else {
      this.state.listProducts.filter(item => {
        if (item.title.includes(e.target.value)) {
          return searchResult.push(item);
        }
      })
    }
    //console.log(e.target.value)
    this.setState({FilterView : searchResult})

  }
  render () {
    return (
      <div id="page_container">
        <form>
          <input className="SearchBar" type="text" placeholder="Product" onChange={(e)=> this.hundleChange(e)} >
          </input>
        </form>
        <h1 className="body">Sports products</h1>
        {this.print1line()}
      </div>
    )
  }
}



export default Products;
