import React, {Component} from 'react'
import axios from 'axios';

class ProductCard extends Component {
  render() {
    return (
      <div>
        {this.props.product.title}
        {this.props.product.description}
        {this.props.product.image_path}
        {this.props.product.min_price}
        {this.props.product.rating}
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

  componentDidUpdate(prevProps, prevState){
    if (prevProps.productView !== this.props.productView) {
      this.print1line()
    }
  }


  render () {
    console.log(this.state.productView);
    return (
    <div id="page_container" className="col-10 offset-1">
      <ProductCard product={this.state.productView} />
    </div>
    )
  }

}

export default ProductView;
