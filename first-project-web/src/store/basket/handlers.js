export function cartAction(dispatch) {
  return {
    addqte: (articleid) => dispatch({type : "ADD_QUANTITY", id: articleid}),
  }
}
