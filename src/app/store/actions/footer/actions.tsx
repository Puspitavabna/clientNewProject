import { env } from "../../../../../config/env";
import { Dispatch } from "redux"
import { apiInstance } from "@/src/app/dashboard/orders/action";
import { fetchedOfficeAddress, fetchedPaymentIcon, fetchingOfficeAddress, fetchingPaymentIcon, officeAddressfetchingFailed, paymentIconfetchingFailed } from "../../slices/footerSlice";


export const getPaymentIcons = () => {

    return async (dispatch: Dispatch) => {
        dispatch(fetchingPaymentIcon())
        apiInstance.get(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/payment-icons`)
            .then(res => {
                dispatch(fetchedPaymentIcon(res?.data))
            }).catch(err => {
                dispatch(paymentIconfetchingFailed(err))
                console.log(err)
            })
    }
}

export const getOfficeAddress = () => {

    return async (dispatch: Dispatch) => {
        dispatch(fetchingOfficeAddress())
        apiInstance.get(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/office-address/get`)
            .then(res => {
                dispatch(fetchedOfficeAddress(res?.data))
            }).catch(err => {
                dispatch(officeAddressfetchingFailed(err))
                console.log(err)
            })
    }
}

export const subscribeNewsLetter = (email: string) => {

    return async (dispatch: Dispatch) => {
        dispatch(fetchingOfficeAddress())
        apiInstance.post(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/subscribe`,
            { "email": email }
        )
            .then(res => {
                dispatch(fetchedOfficeAddress(res?.data))
            }).catch(err => {
                dispatch(officeAddressfetchingFailed(err))
                console.log(err)
            })
    }
} 