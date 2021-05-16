import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./CartType"
import Axios from "axios"
let addItem = (id, name, image, price, countInStock, qty) => {
  let action = {
    type: CART_ADD_ITEM,
    data: {
      id,
      name,
      image,
      price,
      countInStock,
      qty,
    },
  }
  return action
}

export const addToCart = (id, qty) => {
  return async function (dispatch, getState) {
    let { data } = await Axios.get(`/api/products/${id}`)
    dispatch(addItem(data._id, data.name, data.image, data.price, data.countInStock, qty))
    localStorage.setItem("addItem", JSON.stringify(getState().cart.cartItems))
  }
}

let removeItem = (id) => {
  let action = {
    type: CART_REMOVE_ITEM,
    id,
  }
  return action
}

export const removeToCart = (id) => {
  return async function (dispatch) {
    localStorage.removeItem("addItem")
    dispatch(removeItem(id))
  }
}
