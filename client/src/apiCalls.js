import axios from "axios"

export const loginCall = async (userCred, dispatch, setLogin) => {
  dispatch({type: "LOGIN_START"})
  try{
    const res = await axios.post("auth/login", userCred)
    window.localStorage.setItem("loginIn", JSON.stringify(res.data))
    dispatch({type: "LOGIN_SUCCESS", payload: res.data})
  }catch(err){
    setLogin(err.response.data.message)
    dispatch({type: "LOGIN_FAILURED"})
  }
}