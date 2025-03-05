import { env } from "../../../../../config/env";
import { Dispatch } from "redux"
import { addBanner, addError } from "../../slices/homeBannerSlice";


export const getHomeBanner =  () =>{
  
   console.log('called mess....')
   return async (dispatch:Dispatch) =>{
       fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/banner/get`,{
        cache:'no-store',
          method:"GET",
          headers:{
            "Content-Type":"application/json",
          
          },
         
        }).then(res=>{
            return res.json()
        }).then(result=>{
           
            if(result.status === 200){
               dispatch(addBanner(result.banner[0]))
               console.log(result)
            }
        }).catch(err=>{
             console.log('error')
           dispatch(addError({error:err.message}))
           console.log(err.message)
        })
    }
}