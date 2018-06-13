export function cartAction(dispatch) {
  return {
    addqte: (articleid) => dispatch({type : "ADD_QUANTITY", id: articleid}),
    delqte: (articleid) => dispatch({type : "DEL_QUANTITY", id: articleid}),
    rmitem: (articleid) => dispatch({type : "REMOVE_ITEM", id: articleid}),
  }
}
