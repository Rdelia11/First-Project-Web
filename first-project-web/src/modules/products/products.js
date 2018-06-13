import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

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
          <div className="card">

          <div className="card-section">
            <h4 className="card-product-name">{oneProduct.title}</h4>

            <Link to={`/product/${oneProduct.id}`}><img src={`https://www.decathlon.fr/media/${oneProduct.image_path}`} alt="Product"></img></Link>


            <div className="price pt-4">{oneProduct.min_price}€</div>
            <p className="card-product-description">{oneProduct.description}</p>


            <Link to={`/product/${oneProduct.id}`} className="btn btn-outline-primary">See product page</Link>
            <Link to={"#"} className="btn btn-primary ml-2">Add to basket</Link>

          </div>
          </div>
        </div>
        </div>
      )
    })
  }

  hundleChange = (e) => {
    let searchResult = [];
    console.log(e.target.value.length);
      this.state.listProducts.filter(item => {
        if (item.title.toUpperCase().includes(e.target.value.toUpperCase())) {
          return searchResult.push(item);
        }
      })
    this.setState({FilterView : searchResult})
  }

  render () {
    return (
      <div id="page_container">

        <h1 className="body">Sports products</h1>
        <form>
          <input className="SearchBar" type="text" placeholder="Search a product..." onChange={(e)=> this.hundleChange(e)} >
          </input>
        </form>
        {this.print1line()}
      </div>
    )
  }
}



export default Products;
