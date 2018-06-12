import React, {Component} from 'react'
import axios from 'axios';


class ProductCard extends Component {
  render() {
    const url="https://www.decathlon.fr/media/"+this.props.product.image_path;
    return (
      <div>
      <h1>Product detail</h1>
      <div id="container_ProductCard">
        <div id="child_image">
          <img src={url}/>
        </div>
        <div id="child_blocInfo">
          <h4>{this.props.product.title}</h4>
          <p>{this.props.product.description}</p>
          <hr></hr>
          <span id="price">{this.props.product.min_price} €</span>
          <p>Customer rating : {this.props.product.rating} /5</p>
          <a href="#" className="btn btn-primary">Add to cart &gt;</a>
        </div>
      </div>
    </div>
    )
  }
}


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
      <ProductCard product={this.state.productView} />
    </div>
    )
  }
}

export default ProductView;
