// src/types/auth.d.ts
interface userData {
  token?: string;
  _id?: strind;
  email?: string;
  name?: string;
  currency?: string;
  enable_2fa?: boolean;
  userUID: string;
}
export interface LoggedInSuccess {
  data: userData;
}

export interface SignUpSuccess {
  title: string;
  status: number;
  successful: boolean;
  message: string;
  error?: string;
  email: string;
}

export interface SignUpSuccessOtp {
  email: string;
}

export interface ForgetPasswordSuccess {
  email: string;
  successfull?: boolean;
}
