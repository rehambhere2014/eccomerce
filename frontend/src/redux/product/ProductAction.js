import Axios from "axios"
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "./ProductType"

let productRequest = () => {
  let action = {
    type: PRODUCT_DETAILS_REQUEST,
  }
  return action
}

let productSuccess = (data) => {
  let action = {
    type: PRODUCT_DETAILS_SUCCESS,
    data: data,
  }
  return action
}

let productError = (error) => {
  let action = {
    type: PRODUCT_DETAILS_FAIL,
    error: error.response && error.response.data.message ? error.response.data.message : error.response.message,
  }
  return action
}

export const fetchProduct = (id) => {
  return async function (dispatch) {
    try {
      dispatch(productRequest())
      let { data } = await Axios.get(`/api/products/${id}`)
      dispatch(productSuccess(data))
    } catch (error) {
      dispatch(productError(error))
    }
  }
}
