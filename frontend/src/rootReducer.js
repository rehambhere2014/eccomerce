import { combineReducers } from "redux"
import ProductsReducer from "./redux/products/ProductsReducer"
import ProductReducer from "./redux/product/ProductReducer"
import CartReducer from "./redux/cart/CartReducer"
import UserLoginReducer from "./redux/user/UserLoginReducer"
import UserRegisterReducer from "./redux/register/UserRegisterReducer"
import ProfileReducer from "./redux/profile/ProfileReducer"
import profileUpdateReducer from "./redux/updateProfile/profileUpdateReducer"
let rootReducer = combineReducers({
  productsList: ProductsReducer,
  productDetails: ProductReducer,
  cart: CartReducer,
  userLogin: UserLoginReducer,
  register: UserRegisterReducer,
  profile: ProfileReducer,
  userUpdateProfile: profileUpdateReducer,
})
export default rootReducer
