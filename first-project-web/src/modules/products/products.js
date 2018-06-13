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
    console.log(this.props.match.params.categoryId);
    axios.get(`https://decath-product-api.herokuapp.com/categories/${this.props.match.params.categoryId}/products`)
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
            <a href={`/product/${oneProduct.id}`}><h4 className="card-product-name">{oneProduct.title}</h4></a>
            <a href={`/product/${oneProduct.id}`}><img src={`https://www.decathlon.fr/media/${oneProduct.image_path}`} alt="Product"></img></a>
            <h5 className="card-product-price">{oneProduct.min_price}€</h5>
            <p className="card-product-description">{oneProduct.description}</p>
            <a href="#" className="btn btn-primary">Add to basket</a>
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
