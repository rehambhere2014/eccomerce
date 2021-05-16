import React from "react"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "./ProfileType"

export default function ProfileReducer(state = { user: {} }, action) {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.data }
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
