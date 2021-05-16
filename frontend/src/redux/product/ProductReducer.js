import React from "react"
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "./ProductType"
export default function ProductReducer(
  state = {
    product: {
      reviews: [],
    },
  },
  action
) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.data }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.error }
    default:
      return state
  }
}
