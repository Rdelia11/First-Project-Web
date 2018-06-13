const initialState = {
  productsInBasket : [{
    title: "Corne chasse 14cm",
    decathlon_id: 8282689,
    min_price: 9.99,
    quantity: 2,
    image_path: "828/8282689/zoom_52fc3fd48aac4f30a127e90388958eb6.jpg",
  },
  {
    title: "Corne chasse 16cm",
    decathlon_id: 8282688,
    min_price: 9.99,
    quantity: 2,
    image_path: "828/8282689/zoom_52fc3fd48aac4f30a127e90388958eb6.jpg",
  }
]
}

function addOneItem(products, id) {
  return products.map(
    (oneProduct) =>
      oneProduct.decathlon_id === id
      ? {...oneProduct, quantity:oneProduct.quantity +1}
      : oneProduct
  )
}

const BasketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_QUANTITY':
      return {
        ...state,
        productsInBasket: addOneItem(state.productsInBasket,action.id)
      };

    case 'REMOVEITEM':
      return {
        state
      };

    default:
      return state
  }
}

export default BasketReducer;
