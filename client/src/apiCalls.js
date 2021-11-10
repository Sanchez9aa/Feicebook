import axios from "axios"

export const loginCall = async (userCred, dispatch) => {
  dispatch({type: "LOGIN_START"})
  try{
    const res = await axios.post("auth/login", userCred)
    window.localStorage.setItem("loginIn", JSON.stringify(res.data))
    dispatch({type: "LOGIN_SUCCESS", payload: res.data})
  }catch(err){
    console.log(err)
    dispatch({type: "LOGIN_FAILURED", payload:err})
  }
}