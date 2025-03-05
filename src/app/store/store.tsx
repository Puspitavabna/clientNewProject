
import {applyMiddleware,combineReducers,StoreCreator } from "redux"
import { configureStore} from "@reduxjs/toolkit"
import authReducer from './slices/authSlice'
import newsReducer from './slices/newsSlice'
import temStorageReducer from './slices/temporalStorageSlice'
import homeBannerReducer from './slices/homeBannerSlice'
import dataReducer from './slices/dataSlice'
import homeReducer from './slices/homeSlice'
import footerSlice from './slices/footerSlice'
import storage from 'redux-persist/lib/storage'
import {thunk} from 'redux-thunk'

import {persistCombineReducers,persistReducer, persistStore} from 'redux-persist'

const persistConfig = {
    key:'root',
    storage,
}

const rootReducer = combineReducers({
    auth:authReducer,
    cache:temStorageReducer,
    homeBanner:homeBannerReducer,
    data:dataReducer,
    news: newsReducer,
    homeData: homeReducer,
    footer: footerSlice
    
})

const persistedReducer  = persistReducer(persistConfig,rootReducer)

const store   = configureStore({
   reducer:persistedReducer,
   middleware:(getDefualtMiddleware)=>getDefualtMiddleware({
    serializableCheck:false
   }).concat(thunk)
})
const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>;

export  {store,persistor}
