import { env } from "../../../../../config/env";
import { Dispatch } from "redux"
import {authenticateUser, authenticateUserFailed}  from "../../slices/authSlice"

export const registerUser =  (data:any) =>{
  
   console.log('called mess')
   return async (dispatch:Dispatch) =>{
       fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/signup`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({data})
        }).then(res=>{
            return res.json()
        }).then(result=>{

            if(result.status === 200){
               dispatch(authenticateUser({user:result.mess}))
            }
        }).catch(err=>{
            
           dispatch(authenticateUserFailed({error:err.message}))
        })
    }
}