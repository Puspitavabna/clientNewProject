import axios from "axios";
import { env } from "../../../../config/env";
import Cookies from "js-cookie";

const token = Cookies.get("token");

interface DashboardData {
    payments: any[];  // Adjust the type as needed based on actual response
    totalpayment: number;
    totalpayamount: number,
    totalpendingpayment: number,
    totalacceptedpayment: number,
    totalspampayment: number,
}

interface ApiResponse<T> {
    status_code: number;
    status: boolean;
    message: string;
    data: T;
}

// Define request parameters interface for better input type-checking
interface DashboardRequestParams {
    userid: string,
    token: string,
    status?: boolean;
    viewperpage: number;
}

// Create an Axios instance for centralized configuration (optional)
const apiInstance = axios.create({
    baseURL: `${env.NEXT_PUBLIC_API_URL}`, // Adjust to match your backend URL 
    headers: {
        "Content-Type": "application/json",
        "Authorization" : token ? `Bearer ${token}` : ""
    },
});


// API function to retrieve the user dashboard data
export const fetchUserDashboard = async (): Promise<DashboardData> => {
    try {
        const response = await apiInstance.get<ApiResponse<DashboardData>>(
            "/api/v1/factory-app/payment/dashboard"
        );
        console.log(response.data);
        // Check for successful status in the response
        if (response.data.status_code === 200 && response.data.status) {
            // console.log("teto");
            // console.log(response.data.data);
            return response.data.data;
            // Return the dashboard data if successful
        } else {
            throw new Error(response.data.message || "Failed to retrieve dashboard data");
        }
    } catch (error: unknown) {
        // Handle and rethrow error for caller function to catch
        if (axios.isAxiosError(error) && error.response) {
            console.error("API Error:", error.response.data);
            throw new Error(error.response.data.message || "API request failed");
        } else {
            console.error("Unexpected Error:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};// API function to retrieve the user dashboard data

