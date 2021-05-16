import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./UserRegisterType"
import Axios from "axios"
import { USER_LOGIN_SUCCESS } from "../user/UserLoginType"
let registerReguest = () => {
  let action = {
    type: USER_REGISTER_REQUEST,
  }
  return action
}

let registerSuccess = (data) => {
  let action = {
    type: USER_REGISTER_SUCCESS,
    data,
  }
  return action
}

let registerFail = (error) => {
  let action = {
    type: USER_REGISTER_FAIL,
    error: error.response && error.response.data.message ? error.response.data.message : error.message,
  }
  return action
}

export const registerUser = (name, email, password) => {
  return async function (dispatch) {
    try {
      dispatch(registerReguest())
      let config = {
        header: {
          "Content-Type": "application/json",
        },
      }
      let { data } = await Axios.post("/api/users", { name, email, password }, config)
      dispatch(registerSuccess(data))
      dispatch({
        type: USER_LOGIN_SUCCESS,
        data: data,
      })
      localStorage.setItem("user", JSON.stringify(data))
    } catch (error) {
      dispatch(registerFail(error))
    }
  }
}
