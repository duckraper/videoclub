import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../app/services/Auth.service";
import { auth_state, loginState } from "../../app/slices/Auth.slice";

const AdminInv = () => {
  const [login, { isSuccess, isError, isLoading }] = useLoginMutation();
  const { user } = useSelector(auth_state);
  
  const dispatch = useDispatch();
  const { authenticated } = useSelector(auth_state);
  console.log(authenticated)
  console.log(sessionStorage.getItem("access"))
  return (
    <div>AdminInv</div>
  )
}

export default AdminInv