
import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { store } from "../store"

interface AuthState {
    notice: any
    architectures: [],
    blogs:[],
    services:[],
    employer:[],
    gallary:[],
    projects:[]
}


const initialState:AuthState = {
    architectures: [],
    blogs:[],
    services:[],
    employer:[],
    gallary:[],
    projects:[],
    notice:[]
}


const tempStorageSlice = createSlice({
    name:"cache",
    initialState,
    reducers:{

       cacheProjects(state,action:PayloadAction<any>){

       },
        cacheArchitecture(state,action:PayloadAction<any>){
            console.log("cache callleddd")
            
            state.architectures = action.payload

            
        },
        cacheBlog(state,action:PayloadAction<any>){
            state.blogs = action.payload
        }
    },
    

})

export const {cacheArchitecture,cacheBlog} = tempStorageSlice.actions

export default tempStorageSlice.reducer