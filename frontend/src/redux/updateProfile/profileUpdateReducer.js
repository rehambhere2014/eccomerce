import React from "react"
import { USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "./profileUpdateType"

export default function profileUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.data }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.error }

    default:
      return state
  }
}
