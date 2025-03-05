import { env } from "../../../../../config/env";
import { Dispatch } from "redux"
import {
    fetchingHomeData,
    fetchedGlobalOrbit,
    homeDataFetchingFailed
} from "../../slices/homeSlice";


export const getGlobalObject = () => {

    return async (dispatch: Dispatch) => {
        dispatch(fetchingHomeData())
        fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/global-orbit/get`, {
            cache: 'no-store',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        }).then(res => {
            return res.json()
        }).then(result => {
            dispatch(fetchedGlobalOrbit(result?.data))

        }).catch(err => {
            console.log('error')
            dispatch(homeDataFetchingFailed({ error: err.message }))
            console.log(err.message)
        })
    }
}