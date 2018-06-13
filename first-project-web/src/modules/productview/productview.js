import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


class ProductCard extends Component {
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
          <img src={url}/>
        </div>
        <div id="child_blocInfo">
          <h4>{this.props.product.title}</h4>
          <p>{this.props.product.description}</p>
          <hr></hr>
          <span className="price">{this.props.product.min_price} €</span>
          <p>Customer rating : {this.props.product.rating} /5</p>
          <div><img src={urlImg} width="140px"/></div>

          <Link to={"#"} className="btn btn-primary mt-4">Add to basket</Link>
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
