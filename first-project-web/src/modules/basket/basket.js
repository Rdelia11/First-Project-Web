import React, {Component} from 'react';
import {mapStateToProps} from './../../store/basket/selector.js'
import {cartAction} from './../../store/basket/handlers.js'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";


class ViewOneArticle extends Component {
  constructor() {
    super()

    this.state = {
      disabledbtn : true,
    }
  }

  componentDidMount(){

    if(this.props.article.quantity==1){
      this.setState({disabledbtn : true})
    } else {
      this.setState({disabledbtn : false})
    }
  }


  render() {
     const url="https://www.decathlon.fr/media/"+this.props.article.image_path;
     console.log(this.props.article.id);
    return (
      <tr>
        <td><img className="zoomImage" src={url} alt={this.props.article.title}/></td>
        <td><Link to={`/product/${this.props.article.id}`}>{this.props.article.title}</Link></td>
        <td>{this.props.article.decathlon_id}</td>
        <td>{this.props.article.min_price} €</td>
        <td>
          <button
            className="btn-count"
            disabled={this.state.disabledbtn}
            id="minusbtn"
            onClick={ () => {


              if (this.props.article.quantity <= 2){
                this.setState({disabledbtn : true})
              }
              this.props.delqte(this.props.article.decathlon_id)
            }
          }
            >-</button>
          {this.props.article.quantity}

          <button
            className="btn-count"
            onClick={ () => {

              if (this.props.article.quantity >= 1){
                this.setState({disabledbtn : false})
              }
              this.props.addqte(this.props.article.decathlon_id)
            }
            }>+</button>
        </td>
        <td><img src="./bin.png" alt="bin" width="15px" id="imgbin" onClick={ () => this.props.rmitem(this.props.article.decathlon_id)}></img>
        </td>
        <td>{(this.props.article.min_price*this.props.article.quantity).toFixed(2)}</td>
      </tr>
    )
  }
}

const ViewOneArticleConnected = connect(null, cartAction)(ViewOneArticle)

class Basket extends Component {

  totalBasket(){
    let totalBasket = 0;
  this.props.productsInBasket.forEach((article) =>
    totalBasket += article.min_price * article.quantity );
    console.log(totalBasket);
  return totalBasket.toFixed(2)
  }

  onToken = token => {
    fetch("/charge", {
      method: "POST",
      body: JSON.stringify({
        stripeData: token,
        products: this.props.productsInBasket,
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "succeeded") {
          console.log(data);
          // dispatch a success
        } else {

          console.warn(data);
          // dispatch an error
        }
      });
  };

  render() {

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
            {this.props.productsInBasket.map(onearticle =>
              <ViewOneArticleConnected article={onearticle} />
            )}
          </tbody>
          <tfoot className="tableFoot">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>{this.totalBasket()}
                 €</td>
            </tr>
            </tfoot>
          </table>
          <div className="App-intro">
           <Link to="/checkout">Order Article</Link>
          </div>

      </div>
    )
  }}

export default connect(mapStateToProps, cartAction)(Basket);
