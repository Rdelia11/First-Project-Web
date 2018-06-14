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
    console.log(this.props.match.params.categoryId);
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
    return this.state.FilterView.map((oneProduct, index) => {console.log(oneProduct);
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

            <p className="card-product-description">{oneProduct.description}</p>


            <div><Link to={`/product/${oneProduct.id}`} className="btn btn-outline-primary">See product</Link>
            <button
              className="btn btn-primary ml-2"
              onClick={() => this.props.addmoreqte(oneProduct,1)}
              ><i className="fas fa-cart-plus"> Add</i></button>
            {/* <button className="btn btn-primary ml-2" onClick={() => this.props.addmoreqte(oneProduct,1)}>Add to basket</button> */}
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
        <div id="page_container" className="col-8 offset-2 products_container">
        {this.print1line()}
        </div>
      </div>
    )
  }
}



export default connect(mapStateToProps, cartAction)(Products);
