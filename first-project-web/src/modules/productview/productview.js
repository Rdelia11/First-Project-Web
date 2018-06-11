import React, {Component} from 'react'

class ProductView extends Component {
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
