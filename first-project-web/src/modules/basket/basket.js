import React, {Component} from 'react';

class Basket extends Component {
  constructor(props){
    super(props);
    this.state = {
      productsInBasket : [{
        title: "Corne chasse 14cm",
        decathlon_id: 8282689,
        min_price: 9.99,
        quantity: 2,
        image_path: "828/8282689/zoom_52fc3fd48aac4f30a127e90388958eb6.jpg",
      }]
    }
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <h2>This is the basket !</h2>
        <container className="basket">
          <table className="table">
            <thead className="tableHeader">
              <tr>
                <td>Product's name</td>
                <td>Product's id</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Action</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody className="tableBody">
              <tr>
                <td>{this.state.productsInBasket[0].title}</td>
                <td>{this.state.productsInBasket[0].decathlon_id}</td>
                <td>{this.state.productsInBasket[0].min_price} €</td>
                <td>{this.state.productsInBasket[0].quantity}</td>
                <td><img src="./bin.png" alt="bin" width="15px"></img></td>
                <td>{(this.state.productsInBasket[0].min_price*this.state.productsInBasket[0].quantity)}</td>
              </tr>
            </tbody>
          </table>
        </container>
      </div>
    )
  }}

export default Basket;
