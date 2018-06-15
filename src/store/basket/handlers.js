export function cartAction(dispatch) {
  return {
    addqte: (articleid) => dispatch({type : "ADD_QUANTITY", id: articleid}),
    addmoreqte: (article, qte) => dispatch({type : "ADD_MORE_QUANTITY", product: article, quantity: qte}),
    delqte: (articleid) => dispatch({type : "DEL_QUANTITY", id: articleid}),
    rmitem: (articleid) => dispatch({type : "REMOVE_ITEM", id: articleid}),
    rmAll: () => dispatch({type: "REMOVE_ALL"})
  }
}
