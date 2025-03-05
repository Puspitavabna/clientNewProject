"use server";


import { loginSchema } from "./validate";
import { FormState } from "./definition";
import { LoggedInSuccess } from "../../types/auth"
import { env } from "../../../../config/env";



// type SignInSuccess = {
//   redirectUrl: string;
//   token: string;
//   userId: string;
//   email :string;
// };

export async function signIn(
  prevState: any,
  formData: FormData,
): Promise<FormState | LoggedInSuccess> {
  const validateFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //console.log("Form data being sent:", formData);

  if (!validateFields.success) {
    console.log(validateFields.error.flatten().fieldErrors);
    return validateFields.error.flatten().fieldErrors;
  }
  try {
    //const res = await fetch(`${SERVER_URL}/user/login`
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/user/login`, {
      method: "POST",
      body: JSON.stringify(validateFields.data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
   

    const response = await res.json();

    // console.log(response);

    if (res.status !== 200) {
      return {
        message: [response.message || "An unknown error occurred."],
      };
    }

  

    return    {
      data:response.user

    }  
    
  } catch (error:any) {
    console.log(error)
    return {
      message: error.message,
    };
  }


 


}
