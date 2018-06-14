export function mapStateToProps(state) {
  return {
    productsInBasket: state.productsInBasket,
    loggedIn:state.loggedIn,
    name:state.name,
    urlPic:state.urlPic
   }
}
