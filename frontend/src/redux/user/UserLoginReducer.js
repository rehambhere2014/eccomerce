import React from "react"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./UserLoginType"

export default function UserLoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.data }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.error }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
