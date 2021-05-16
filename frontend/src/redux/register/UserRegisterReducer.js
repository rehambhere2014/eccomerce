import React from "react"
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "./UserRegisterType"

export default function UserRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.data }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.error }
    default:
      return state
  }
}
