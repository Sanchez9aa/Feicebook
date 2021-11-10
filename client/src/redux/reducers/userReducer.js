import { ActionTypes } from "../contants/actions-types";

const initialState = {
  user: JSON.parse(localStorage.getItem("loginIn")) || null,
  isFetching: false,
  error: false
}

export const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.LOGIN_START:
      return {...state, isFetching:true}
    case ActionTypes.LOGIN_SUCCESS:
      return {...state, isFetching: false, user:payload}
    case ActionTypes.LOGIN_FAILURED:
      return {...state, isFetching: false, error:payload}
    case ActionTypes.LOGOUT:
      return {...state, user:payload}
    default:
      return state;
  }
}

export default userReducer