import Axios from "axios"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "./ProfileType"

let profileRequest = () => {
  let action = {
    type: USER_DETAILS_REQUEST,
  }
  return action
}

let profileSuccess = (data) => {
  let action = {
    type: USER_DETAILS_SUCCESS,
    data,
  }
  return action
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(profileRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.get(`/api/users/${id}`, config)

    dispatch(profileSuccess(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === "Not authorized, token failed") {
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      error: message,
    })
  }
}
