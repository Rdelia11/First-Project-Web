import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {mapStateToProps} from './../../store/basket/selector.js'
import {cartAction} from './../../store/basket/handlers.js'
import {connect} from 'react-redux';

class ShowPrice extends Component {
  render() {
    if(this.props.crossed) {
      return (
        <div>
          <div className="price_crossed">
            {this.props.min} €
          </div>
          <div>
            <span className="striketext">{this.props.crossed}€</span>
            <span className="reduction">-{this.props.reduc}%</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="price">
          {this.props.min} €
        </div>
      )
    }

  }
}

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      listProducts:[],
      FilterView: []
    }
  }

  componentDidMount(){
    // console.log(this.props.match.params.categoryId);
    axios.get(`https://decath-product-api.herokuapp.com/categories/${this.props.match.params.categoryId}/products`)
    .then((response) => this.setState({listProducts: response.data, FilterView: response.data}))
  }
  showreduc(product) {
    if (product.percent_reduction !== 0) {

      return ( <ShowPrice min={product.min_price} crossed={product.crossed_price} reduc={product.percent_reduction}/> )
    } else {
      return ( <ShowPrice min={product.min_price} /> )
    }
  }

  print1line(){
    return this.state.FilterView.map((oneProduct, index) => {
      // console.log(oneProduct);
      return(


        <div key={index}>
          <div className="card">
          <div className="card-section">
            <h4 className="card-product-name">{oneProduct.title}</h4>
            <div>
              <div className="price_contain">{this.showreduc(oneProduct)}</div>
              <Link to={`/product/${oneProduct.id}`}>
              <img class="imgcat" src={`https://www.decathlon.fr/media/${oneProduct.image_path}`} alt="Product"></img>
              </Link>
            </div>

<<<<<<< HEAD
            <Link to={`/product/${oneProduct.id}`}><img src={`https://www.decathlon.fr/media/${oneProduct.image_path}`} alt="Product"></img></Link>


            <p className=""> -{oneProduct.percent_reduction}%</p>
            <div className="price pt-4">{oneProduct.min_price}€</div>
=======
>>>>>>> 7081cb7bafdbed8f03b32410614e82d6aa1bb6c6
            <p className="card-product-description">{oneProduct.description}</p>


            <div><Link to={`/product/${oneProduct.id}`} className="btn btn-outline-primary">See product</Link>
            <button className="btn btn-primary ml-2" onClick={() => this.props.addmoreqte(oneProduct,1)}>
              <i className="fas fa-cart-plus"></i> Add
            </button>
            {/* <button className="btn btn-primary ml-2" onClick={() => this.props.addmoreqte(oneProduct,1)}>Add to basket</button> */}
          </div>
          </div>
          </div>

        </div>
      )
    })
  }

  handleChange = (e) => {
    let searchResult = [];

    // console.log(e.target.value.length);
    if (e.target.value.length === 0) {
      return searchResult = this.state.listProducts;
    } else {
      this.state.listProducts.filter(item => this.keepOnlyUpperCaseItem(item.title, e.target.value))
      .forEach(item => searchResult.push(item));
    }
    this.setState({FilterView : searchResult});
  }

  keepOnlyUpperCaseItem = (titleProduct, inputValue) => {
    return titleProduct.toUpperCase().includes(inputValue.toUpperCase())
    ? titleProduct
    : null

  }

  render () {
    return (
      <div id="page_container_products">
        <h1 className="pb-3">Sports products</h1>
        <form>
          <input className="SearchBar" autoFocus type="text" placeholder="Search a product..." onChange={(e)=> this.handleChange(e)} >
          </input>
        </form>
        <div id="page_container" className="col-8 offset-2 products_container">
        {this.print1line()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, cartAction)(Products);
