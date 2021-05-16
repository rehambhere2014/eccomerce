import Axios from "axios"
import { PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from "./ProductsType"

let productRequest = () => {
  let action = {
    type: PRODUCTS_LIST_REQUEST,
  }
  return action
}

let productSuccess = (data) => {
  let action = {
    type: PRODUCTS_LIST_SUCCESS,
    data: data,
  }
  return action
}

let productError = (error) => {
  let action = {
    type: PRODUCTS_LIST_FAIL,
    error: error.response && error.response.data.message ? error.response.data.message : error.response.message,
  }
  return action
}

export const fetchProducts = () => {
  return async function (dispatch) {
    try {
      dispatch(productRequest())
      let { data } = await Axios.get("/api/products")
      dispatch(productSuccess(data.products))
    } catch (error) {
      dispatch(productError(error))
    }
  }
}
