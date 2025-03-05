import axios from "axios";
import { env } from "../../../../config/env";
import Cookies from "js-cookie";

interface DashboardData {
  orders: any[]; // Adjust the type as needed based on actual response
  totalorders: number;
  totalpendingorders: number;
  totalpaymentorders: number;
  totalwaitingorders: number;
  totalworkingorders: number;
  totalcompleteorders: number;
  totaldeliveryorders: number;
  totalcancelorders: number;
  totalprojectamount: number;
  totalpaidamount: number;
  totalleftamount: number;
}

interface ApiResponse<T> {
  status_code: number;
  status: boolean;
  message: string;
  data: T;
}

// Define request parameters interface for better input type-checking
interface DashboardRequestParams {
  userid: string;
  token: string;
  status?: boolean;
  viewperpage: number;
}

export interface Message {
  role: string;
  message?: string;
  file?: File;
  audio?: Blob;
  time: string;
}

interface MessageData {
  success: boolean;
  messages: Message[];
}

// Define request parameters interface for better input type-checking
interface MessageSendParams {
  sender: string;
  receiver: string;
  message: string;
}

// Create an Axios instance for centralized configuration (optional)
export const apiInstance = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}`, // Adjust to match your backend URL
  headers: {
    "Content-Type": "application/json",
    " Authorization": `${Cookies.get("token") ? `Bearer ${Cookies.get("token")}` : ""}`,
  },
});

// API function to retrieve the user dashboard data
export const fetchUserDashboard = async (
  params: DashboardRequestParams,
): Promise<DashboardData> => {
  try {
    const response = await apiInstance.get<ApiResponse<DashboardData>>(
      // `/api/user/order/dashboard/${userid}`,
      "/api/v1/factory-app/user/order/dashboard");
    // Check for successful status in the response
    if (response.data.status_code === 200 && response.data.status) {
      // console.log("teto");
      // console.log(response.data.data);
      return response.data.data;
      // Return the dashboard data if successful
    } else {
      throw new Error(
        response.data.message || "Failed to retrieve dashboard data",
      );
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
}; // API function to retrieve the user dashboard data

interface BankdData {
  paymentMethods: any[]; // Adjust the type as needed based on actual response
}

// API function to retrieve the user dashboard data
export const fetchPaymentMethod = async (): Promise<BankdData> => {
  try {
    const response = await apiInstance.post<ApiResponse<BankdData>>(
      // `/api/user/order/dashboard/${userid}`,
      "/api/user/payment/retrieve/bank",
    );
    // Check for successful status in the response
    if (response.data.status_code === 200 && response.data.status) {
      // console.log("teto");
      // console.log(response.data.data);
      return response.data.data;
      // Return the dashboard data if successful
    } else {
      throw new Error(
        response.data.message || "Failed to retrieve dashboard data",
      );
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
}; // API function to retrieve the user dashboard data

export const sendUserMessage = async (
  params: MessageSendParams,
): Promise<MessageData> => {
  try {
    const response = await apiInstance.post<ApiResponse<MessageData>>(
      "/api/v1/factory-app/messages/send",
      params,
    );
    // Check for successful status in the response
    if (response.data.status_code === 200 && response.data.status) {
      return response.data.data;
    } else {
      throw new Error(
        response.data.message || "Failed to retrieve dashboard data",
      );
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
};

const emptyMessageData: MessageData = {
  success: false,
  messages: [], // Empty array
};

export const fetchUserMessage = async (): Promise<MessageData> => {
  try {
    const response = await apiInstance.get<ApiResponse<MessageData>>(
      "/api/v1/factory-app/messages/get",
    );
    // Check for successful status in the response
    if (response.data.status_code === 200 && response.data.status) {
      return response.data.data;
    } else {
      throw new Error(
        response.data.message || "Failed to retrieve dashboard data",
      );
    }
  } catch (error: unknown) {
    // Handle and rethrow error for caller function to catch
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.data);
      return emptyMessageData;
    } else {
      console.error("Unexpected Error:", error);
     return emptyMessageData
    }
  }
};

export const fetchAgencies = async (): Promise<any> => {
  try {
    const response = await apiInstance.get<any>(
      "/api/v1/factory-app/agencies/agencies",
    );
    // Check for successful status in the response
    if (response.status == 200) {
      return response?.data?.agencies;
    } else {
      throw new Error(
        response.data.message || "Failed to retrieve dashboard data",
      );
    }
  } catch (error: unknown) {
    // Handle and rethrow error for caller function to catch
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.data);
      throw new Error(error.response.data.message || "API request failed");
    } else {
      console.error("Unexpected Error:", error);
      return [];
    }
  }
};
