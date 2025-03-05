
import { createSlice, PayloadAction} from "@reduxjs/toolkit"

interface NewsState {
    loading:boolean,
    data:{} |  null,
    error:any
}


const initialState:NewsState = {
    loading:false,
    data: [],
    error:null
}


const dataslice = createSlice({
    name:"data",
    initialState,
    reducers:{

        fetchingData(state){
            state.loading =true
            state.data = []
        },

        fetchedData(state,action:PayloadAction<any>){
            state.loading =false
            state.data = action.payload.data
        },

        fetchingFailed(state,action:PayloadAction<any>){
            state.loading = false
            state.error = action.payload.error
           
        }
    },
    

})

export const {fetchedData,fetchingData,fetchingFailed} = dataslice.actions

export default dataslice.reducer