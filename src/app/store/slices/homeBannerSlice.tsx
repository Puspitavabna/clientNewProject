
import { createSlice, PayloadAction} from "@reduxjs/toolkit"


interface BannerProps  {
    header?:string,
    subHeaderOne?:string,
    subHeaderTwo?:string,
    subHeaderThree?:string,
    description?:string,
    image?:string
    error?:string,
    _id?:string,
    __v?:string
}



const initialState = {
   
    banner:{
        header:undefined,
        subHeaderOne:undefined,
        subHeaderTwo:undefined,
        subHeaderThree:undefined,
        description:undefined,
        image:undefined,
        _id:undefined,
        __v:undefined
    },
    error:undefined,

}


const homeBannerSlice = createSlice({
    name:"homeBanner",
    initialState,
    reducers:{

       addBanner(state,action:PayloadAction<any>){
         console.log(action.payload.header)
           
          state.banner = action.payload
          console.log(state.banner.header)
           
       },
       addError(state,action:PayloadAction<any>){
        state.error = action.payload
    }
        
    },
    

})

export const {addBanner,addError} = homeBannerSlice.actions

export default homeBannerSlice.reducer