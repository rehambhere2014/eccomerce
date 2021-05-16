import React from "react"
import { PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAIL } from "./ProductsType"

export default function ProductsReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return { loading: true }
    case PRODUCTS_LIST_SUCCESS:
      return { loading: false, products: action.data }
    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: action.error }

    default:
      return state
  }
}
