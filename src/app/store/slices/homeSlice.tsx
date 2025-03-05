
import { createSlice, PayloadAction} from "@reduxjs/toolkit"

interface NewsState {
    loading:boolean,
    globalOrbit:{} |  null,
    error:any
}


const initialState:NewsState = {
    loading:false,
    globalOrbit: [],
    error:null
}


const homeslice = createSlice({
    name:"home",
    initialState,
    reducers:{

        fetchingHomeData(state){
            state.loading =true
        },

        fetchedGlobalOrbit(state,action:PayloadAction<any>){
            console.log("data in slice::", action.payload)
            state.loading =false
            state.globalOrbit = action.payload
        },

        homeDataFetchingFailed(state,action:PayloadAction<any>){
            state.loading = false
            state.error = action.payload.error
           
        }
    },
    

})

export const {fetchingHomeData,fetchedGlobalOrbit,homeDataFetchingFailed} = homeslice.actions

export default homeslice.reducer