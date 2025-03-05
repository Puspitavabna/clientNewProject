
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FooterState {
    loading: boolean,
    paymentIcon: {} | null,
    officeAddress: [] | null
    error: any
}


const initialState: FooterState = {
    loading: false,
    paymentIcon: [],
    officeAddress: [],
    error: null
}


const footerslice = createSlice({
    name: "footer",
    initialState,
    reducers: {

        fetchingPaymentIcon(state) {
            state.loading = true
            state.paymentIcon = []
        },

        fetchedPaymentIcon(state, action: PayloadAction<any>) {
            state.loading = false
            state.paymentIcon = action.payload.data
        },

        paymentIconfetchingFailed(state, action: PayloadAction<any>) {
            state.loading = false
            state.error = action.payload.error

        },

        fetchingOfficeAddress(state) {
            state.loading = true
            state.officeAddress = []
        },

        fetchedOfficeAddress(state, action: PayloadAction<any>) {
            state.loading = false
            state.paymentIcon = action.payload.data
        },

        officeAddressfetchingFailed(state, action: PayloadAction<any>) {
            state.loading = false
            state.error = action.payload.error

        },

        addingSubsciption(state) {
            state.loading = true
            state.officeAddress = []
        },

        addingSubsciptionSuccess(state, action: PayloadAction<any>) {
            state.loading = false
            state.paymentIcon = action.payload.data
        },

        addingSubsciptionFailed(state, action: PayloadAction<any>) {
            state.loading = false
            state.error = action.payload.error
        }
    },


})

export const {
    fetchingPaymentIcon,
    fetchedPaymentIcon,
    paymentIconfetchingFailed,
    fetchingOfficeAddress,
    fetchedOfficeAddress,
    officeAddressfetchingFailed
} = footerslice.actions

export default footerslice.reducer