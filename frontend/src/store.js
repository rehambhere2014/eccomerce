import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./rootReducer"
import { composeWithDevTools } from "redux-devtools-extension"
let itemLocalstorge = localStorage.getItem("addItem") ? JSON.parse(localStorage.getItem("addItem")) : []
let userLoginLocalstorge = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

let initialState = {
  cart: { cartItems: itemLocalstorge, shippingAddress: shippingAddressFromStorage },
  userLogin: { userInfo: userLoginLocalstorge },
}

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
export default store
