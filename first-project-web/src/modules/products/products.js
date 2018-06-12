import React, {Component} from 'react'

  const Product = ({ match }) => (
    <div>
      <h2>This is the product</h2>
      ${match.url};
      
    </div>
  )

export default Product;
