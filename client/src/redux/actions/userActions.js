import { ActionTypes } from "../contants/actions-types"

export const LoginStart = (userCred) => ({
  type:ActionTypes.LOGIN_START
});

export const LoginSuccess = (user) => ({
  type:ActionTypes.LOGIN_SUCCESS,
  payload: user
})

export const LoginFailured = (error) => ({
  type:ActionTypes.LOGIN_FAILURED,
  payload: error
})

export const LogoutStart = () => ({
  type:ActionTypes.LOGOUT,
  payload: null
});