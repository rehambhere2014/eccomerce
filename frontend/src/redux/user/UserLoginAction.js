import Axios from "axios"
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./UserLoginType"

let userloginRequest = () => {
  let action = {
    type: USER_LOGIN_REQUEST,
  }
  return action
}

let userLoginSuccess = (data) => {
  let action = {
    type: USER_LOGIN_SUCCESS,
    data,
  }
  return action
}
let logout = () => {
  let action = {
    type: USER_LOGOUT,
  }
  return action
}
export const logoutUser = () => {
  return async function (dispatch) {
    localStorage.removeItem("user")
    dispatch(logout())
  }
}
export const loginUser = (email, password) => {
  return async function (dispatch, getState) {
    dispatch(userloginRequest)
    let config = {
      header: {
        "Content-Type": "application/json",
      },
    }
    let { data } = await Axios.post("/api/users/login", { email, password }, config)
    dispatch(userLoginSuccess(data))

    localStorage.setItem("user", JSON.stringify(data))
  }
}
