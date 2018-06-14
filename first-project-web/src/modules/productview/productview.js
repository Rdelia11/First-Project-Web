import React, {Component} from 'react'
import axios from 'axios';
import {mapStateToProps} from './../../store/basket/selector.js'
import {cartAction} from './../../store/basket/handlers.js'
import {connect} from 'react-redux';
import StarRatings from 'react-star-ratings';

class ProductCard extends Component {
  constructor() {
    super()
    this.state = {
      counter:1,
      disabledbtn:true,
      rating:2.3,
    }
  }

  addone() {
    this.setState({counter:this.state.counter + 1, disabledbtn:false});
  }

  oneless() {
    if(this.state.counter==2) {
      this.setState({counter:this.state.counter - 1, disabledbtn:true});
    } else {
      this.setState({counter:this.state.counter - 1});
    }

  }

  render() {
    const url="https://www.decathlon.fr/media/"+this.props.product.image_path;

    let urlImg;

      if(this.props.product.rating>=4.5){
      urlImg="/pictures/ic_star5@2x.png";
    }else if(this.props.product.rating>=3.5){
      urlImg="/pictures/ic_star4@2x.png";
    }else if(this.props.product.rating>=2.5){
      urlImg="/pictures/ic_star3@2x.png";
    }else if(this.props.product.rating>=1.5){
      urlImg="/pictures/ic_star2@2x.png";
    }else if (this.props.product.rating>0){
      urlImg="/pictures/ic_star1@2x.png";
    }else{
      urlImg="";
    }

    return (
      <div>
        <h1>Product detail</h1>
        <div id="container_ProductCard">
          <div id="child_image">
            <img src={url} alt={this.props.product.title}/>
          </div>
          <div id="child_blocInfo">
            <h4>{this.props.product.title}</h4>
            <p>{this.props.product.description}</p>
            <hr></hr>
            <span className="price">{this.props.product.min_price} €</span>
            <p>Customer rating : {this.props.product.rating} /5</p>
            {/* <div><img src={urlImg} width="140px" alt={this.props.product.title}/></div> */}
            <StarRatings
               rating={this.props.product.rating}
               starRatedColor="orange"
               starDimension="25px"
               starSpacing="3px"
               numberOfStars={5}
               name='rating'
             />
            <div>
              <button className="btn-count" disabled={this.state.disabledbtn} onClick={() => this.oneless()}>-</button>
              {this.state.counter}
              <button className="btn-count" onClick={() => this.addone()}>+</button>
            </div>
            <button className="btn btn-primary mt-4" onClick={() => this.props.addmoreqte(this.props.product,this.state.counter)}>Add {this.state.counter} to basket</button>
          </div>
        </div>
      </div>
    )
  }
}

const ProductCardConnected = connect(mapStateToProps, cartAction)(ProductCard);

class ProductView extends Component {
  constructor(props){
    super(props);
    this.state = {
      productView: []
    }
  }

  componentDidMount(){
    axios.get(`https://decath-product-api.herokuapp.com/products/${this.props.match.params.productId}`)
    .then((response) => this.setState({productView: response.data}))
  }



  render() {
    console.log(this.state.productView);
    return (
    <div id="page_container" className="col-10 offset-1">
      <ProductCardConnected product={this.state.productView} />
    </div>
    )
  }
}


export default ProductView;
