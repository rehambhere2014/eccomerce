import React from "react"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./CartType"

export default function CartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      let item = action.data

      let exists = state.cartItems.find((x) => x.id === item.id)
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => {
            if (x.id === exists.id) {
              return item
            } else {
              return x
            }
          }),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      let newItem = state.cartItems.filter((item) => item.id !== action.id)
      return { ...state, cartItems: newItem }

    default:
      return state
  }
}
