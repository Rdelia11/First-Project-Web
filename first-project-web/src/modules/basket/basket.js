import React, {Component} from 'react';

class Basket extends Component {
  constructor(props){
    super(props);
    this.state = {
      productsInBasket : [
        {
        title: "Corne chasse 14cm",
        decathlon_id: 8282689,
        min_price: 9.99,
        quantity: 2,
        image_path: "828/8282689/zoom_52fc3fd48aac4f30a127e90388958eb6.jpg",
        },
    ]
    }
  }
  render() {
    const url="https://www.decathlon.fr/media/"+this.state.productsInBasket[0].image_path;
    return (

      <div id="page_container" className="col-8 offset-2">
        <div className="titleBasket">My order </div>
        <table className="table">
          <thead className="tableHeader">
            <tr className="tableRow">
              <td></td>
              <td>Product's name</td>
              <td>Product's id</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Action</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody className="tableBody">
            <tr className="tableRow">
              <td><img className="zoomImage" src={url}/></td>
              <td>{this.state.productsInBasket[0].title}</td>
              <td>{this.state.productsInBasket[0].decathlon_id}</td>
              <td>{this.state.productsInBasket[0].min_price} €</td>
              <td>{this.state.productsInBasket[0].quantity}</td>
              <td><img src="./bin.png" alt="bin" width="15px"></img></td>
              <td>{(this.state.productsInBasket[0].min_price*this.state.productsInBasket[0].quantity)} €</td>
            </tr>
          </tbody>
          <tfoot className="tableFoot">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>{(this.state.productsInBasket[0].min_price*this.state.productsInBasket[0].quantity)} €</td>
            </tr>
            </tfoot>
        </table>
    </div>
  )
}}

export default Basket;
