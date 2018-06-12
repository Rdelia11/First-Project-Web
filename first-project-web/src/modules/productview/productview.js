import React, {Component} from 'react'
import axios from 'axios';

class ProductView extends Component {
  constructor(props){
    super(props);
    this.state = {
      listCategories: []
    }
  }

  componentDidMount(){
    axios.get(`https://decath-product-api.herokuapp.com/products/${this.props.match.params.productId}`)
    .then((response) => this.setState({listCategories: response.data}))
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.listCategories !== this.props.listCategories) {
      this.print1line()
    }
  }
    render() {
      return (
        <div>
            <h2>This is the product view</h2>

          {this.props.match.params.productId}
        </div>
      )
    }

}

export default ProductView;
