"use client";

import { useFormState } from "react-dom";
import TextInput from "../components/text-input";
import SubmitButton from "../components/submit-button";
import { createNewPassword } from "./action";
import { FormState } from "./definition";

const initialState: FormState = {
  currentpassword: [],
  newpassword: [],
  message: [],
};

export default function CreateNewPassword() {
  const [state, formAction] = useFormState(createNewPassword, initialState);

  return (
    <form action={formAction} className="w-full">
      {state.message && state.message?.length > 0 && (
        <p aria-live="polite" className="mb-4 text-center text-sm text-red-500">
          {state.message[0]}
        </p>
      )}

      <div className="flex flex-col gap-y-6 mb-3">
        <div>
        {/* <h3>New Password</h3> */}
        <TextInput
          label="New Password"
          name="newpassword"
          type="password"
          id="recPassword"
          icon="./icons/password-check.svg"
          placeholder=" "
          errors={state}
        />
        </div>

        <div>
          {/* <h3>Confirm Password</h3> */}
        <TextInput
          label="Confirm Password"
          id="recCPassword"
          name="confirmpassword"
          type="password"
          icon="./icons/password-check.svg"
          placeholder=" "
          errors={state}
        />
        </div>
      </div>
      <p className="text-xs text-center">
      Password should be at least 8 character long. <br />
      You can use password &quot;\@#%8=&quot;to increase account security
      </p>

      <div className="mt-6 flex justify-end">
        <SubmitButton pendingText="Updating..." text="Continue" />
      </div>
    </form>
  );
}
