import { env } from "../../../../../config/env";
import { Dispatch } from "redux"
import { fetchedData, fetchingData, fetchingFailed } from "../../slices/dataSlice";

export const getAll = (endPint: string, attr: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchingData())
        fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/${endPint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.json()
        }).then(result => {
            if (result.status === 200 || result.status_code === 200) {
                dispatch(fetchedData({ data: result?.[attr] }))
            }
        }).catch(err => {
            dispatch(fetchingFailed({ error: err.message }))
        })
    }
}
