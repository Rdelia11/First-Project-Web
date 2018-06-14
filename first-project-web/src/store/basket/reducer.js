const initialState = localStorage.getItem("cart")
  ? {productsInBasket : JSON.parse(localStorage.getItem("cart"))}
  : {productsInBasket : []};

// const initialState = {
//   productsInBasket : []
// }

function storeData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true; // All went well
  } catch (error) {
    console.warn("something wrong happened", error);
    return false; // An error occured
  }
}

function addOneItem(products, id) {
  let newState = products.map(
    (oneProduct) =>
      oneProduct.decathlon_id === id
      ? {...oneProduct, quantity:oneProduct.quantity +1}
      : oneProduct
  );

  storeData("cart", newState);
  return newState;
}

function addMoreQte(products, article, qte) {

  let findItem = false;
  let tabState=products.map(
    function (oneProduct) {
      if (oneProduct.decathlon_id === article.decathlon_id) {
        findItem=true;
        return {...oneProduct, quantity:oneProduct.quantity + qte}
      } else {
        return oneProduct
      }
    }
  );
  if (!findItem) {
    tabState.push({
      id: article.id,
      title: article.title,
      decathlon_id: article.decathlon_id,
      min_price: article.min_price,
      quantity: qte,
      image_path: article.image_path
    });
  }
  console.log(tabState);
  storeData("cart", tabState);
  return tabState;
}

function deleteOneItem(products, id) {
  let newState = products.map(
    (oneProduct) =>
      oneProduct.decathlon_id === id
      ? {...oneProduct, quantity:oneProduct.quantity -1}
      : oneProduct
    );

    storeData("cart", newState);
    return newState;
}

function RemoveItem(products, id) {
  let newState = products.filter(
    function(oneProduct){ return oneProduct.decathlon_id !== id });

    storeData("cart", newState);
    return newState;
}

const BasketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_QUANTITY':
      return {
        ...state,
        productsInBasket: addOneItem(state.productsInBasket,action.id)
      };

      case 'ADD_MORE_QUANTITY':
        return {
          ...state,
          productsInBasket: addMoreQte(state.productsInBasket,action.product, action.quantity)
        };

    case 'DEL_QUANTITY':
      return {
        ...state,
        productsInBasket: deleteOneItem(state.productsInBasket,action.id)
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        productsInBasket: RemoveItem(state.productsInBasket,action.id)
      };

    default:
      return state
  }
}

export default BasketReducer;
