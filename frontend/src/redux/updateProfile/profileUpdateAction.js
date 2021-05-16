import Axios from "axios"
import { USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "./profileUpdateType"

let updateProfilerRequest = () => {
  let action = {
    type: USER_UPDATE_PROFILE_REQUEST,
  }
  return action
}

let updateProfileSuccess = (data) => {
  let action = {
    type: USER_UPDATE_PROFILE_SUCCESS,
    data,
  }
  return action
}

export const updateProfile = (user) => {
  return async function (dispatch, getState) {
    try {
      dispatch(updateProfilerRequest())
      //login user

      let {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      let { data } = await Axios.put(`/api/users/profile`, user, config)
      dispatch(updateProfileSuccess(data))
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      if (message === "Not authorized, token failed") {
      }
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        error: message,
      })
    }
  }
}
