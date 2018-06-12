import React, {Component} from 'react';
import Store from './../../store/store.js'
import {mapStateToProps} from './../../store/basket/selector.js'
import {cartAction} from './../../store/basket/handlers.js'
import {connect} from 'react-redux';

class ViewOneArticle extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.article.title}</td>
        <td>{this.props.article.decathlon_id}</td>
        <td>{this.props.article.min_price} €</td>
        <td>
          <button>-</button>
          {this.props.article.quantity}
          <button onClick={ () => this.props.addqte(this.props.article.decathlon_id)}>+</button>
        </td>
        <td><img src="./bin.png" alt="bin" width="15px"></img></td>
        <td>{(this.props.article.min_price*this.props.article.quantity)}</td>
      </tr>
    )
  }
}

const ViewOneArticleConnected = connect(null, cartAction)(ViewOneArticle)

class Basket extends Component {
  render() {
    console.log(this.props)
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
              {this.props.productsInBasket.map(onearticle =>
                <ViewOneArticleConnected article={onearticle} />
              )}
            </tbody>
          </table>
        </container>
      </div>
    )
  }}

export default connect(mapStateToProps, cartAction)(Basket);
