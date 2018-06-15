import React, {Component} from 'react';
import {mapStateToProps} from './../../store/basket/selector.js'
import {cartAction} from './../../store/basket/handlers.js'
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import {storeData} from './../../store/basket/reducer.js';
import Home from "./../home/home.js"

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
     // console.log(this.props.article.id);
    return (
      <tr className="table-secondary">
        <td><img className="zoomImage" src={url} alt={this.props.article.title}/></td>
        <td><Link to={`/product/${this.props.article.id}`}>{this.props.article.title}</Link></td>
        <td>{this.props.article.decathlon_id}</td>
        <td>{this.props.article.min_price} €</td>
        <td>
          {this.props.article.quantity}

        </td>
        <td>{(this.props.article.min_price*this.props.article.quantity).toFixed(2)}</td>
      </tr>
    )
  }
}

const ViewOneArticleConnected = connect(null, cartAction)(ViewOneArticle)

class Checkout extends Component {
constructor(props){
  super(props);
  this.state = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zip: 0,
    emailAddress: ""
  };
}

handleInputChange = (event) => {
  const target = event.target;
  const value = target.value;
  const keyToUpdate = target.id;
  storeData(keyToUpdate,value);
  this.setState({ [keyToUpdate]: value} );
  }

  getData(localKey){
    return JSON.parse(localStorage.getItem(localKey))
  }

  totalBasket(){
    let totalBasket = 0;
  this.props.productsInBasket.forEach((article) =>
    totalBasket += article.min_price * article.quantity );
    // console.log(totalBasket);
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
          console.log("ok");
          // dispatch a success
        } else {
          console.log("ko");
          <Redirect to="/"/>
          // dispatch an error
        }
      });
  };

  render() {

    return (
      <div id="page_container" className="col-8 offset-2">
        <div className="titleBasket">Validate my order </div>
        <table className="table table-sm">
          <thead className="tableHeader">
            <tr className="tableRow">
              <td></td>
              <td>Product's name</td>
              <td>Product's id</td>
              <td>Price</td>
              <td>Quantity</td>
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
              <td colspan="4"></td>
              <td className="table-success">Total</td>
              <td className="table-success">{this.totalBasket()}
                 €</td>
            </tr>
            </tfoot>
          </table>
          <div className="titleBasket">Delivery informations</div>
          <div className="row">
            <div className="col-md-6 text-left">
              <label for="name">First Name</label>
              <input className="form-control" type="text" id="firstName"
                value={this.getData("firstName")}
                onChange={this.handleInputChange}/>
            </div>
            <div className="col-md-6 text-left">
              <label for="name">Last Name</label>
                <input className="form-control" type="text" id="lastName"
                  value={this.getData("lastName")}
                  onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 text-left">
              <label for="name">Street</label>
              <input className="form-control" type="text" id="street"
                value={this.getData("street")}
                onChange={this.handleInputChange}/>
            </div>
            <div className="col-md-4 text-left">
              <label for="name">City</label>
              <input className="form-control" type="text" id="city"
                value={this.getData("city")}
                onChange={this.handleInputChange}/>
            </div>
            <div className="col-md-2 text-left">
              <label for="name">Zip</label>
              <input className="form-control" type="number" id="zip"
                value={this.getData("zip")}
                onChange={this.handleInputChange}/>
            </div>
          </div>
          <div className="form-group">

          </div>

          <div>
            {this.props.loggedIn
              ?
               <StripeCheckout
                 token={this.onToken}
                 amount={this.totalBasket()*100}
                 currency="EUR"
                 stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
               />
              :
               <span><p>You must be logged in to checkout</p>
               </span>
             }
          </div>

      </div>
    )
  }}

export default connect(mapStateToProps, cartAction)(Checkout);
