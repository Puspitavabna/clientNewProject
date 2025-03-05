
import { createSlice, PayloadAction} from "@reduxjs/toolkit"

interface NewsState {
    loading:boolean,
    news:{} |  null,
    error:any
}


const initialState:NewsState = {
    loading:false,
    news: [],
    error:null
}


const newsslice = createSlice({
    name:"news",
    initialState,
    reducers:{

        fetchingNews(state){
            state.loading =true
            state.news = []
        },

        fetchedNews(state,action:PayloadAction<any>){
            state.loading =false
            state.news = action.payload.news
        },

        fetchedUserFailed(state,action:PayloadAction<any>){
            state.loading = false
            state.error = action.payload.error
           
        }
    },
    

})

export const {fetchedNews,fetchingNews,fetchedUserFailed} = newsslice.actions

export default newsslice.reducer