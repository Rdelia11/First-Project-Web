import React, {Component} from 'react';
import {mapStateToProps} from './../../store/basket/selector.js'
import {cartAction} from './../../store/basket/handlers.js'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class ViewOneArticle extends Component {
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
          <button className="btn-count" onClick={ () => this.props.delqte(this.props.article.decathlon_id)}>-</button>
          {this.props.article.quantity}
          <button className="btn-count" onClick={ () => this.props.addqte(this.props.article.decathlon_id)}>+</button>
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
  render() {
    let total = 0;
    console.log(this.props)
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
              <td>{this.props.productsInBasket.forEach((article) =>
                total += article.min_price * article.quantity )
              }{total.toFixed(2)}
                 €</td>
            </tr>
            </tfoot>
          </table>
      </div>
    )
  }}

export default connect(mapStateToProps, cartAction)(Basket);
