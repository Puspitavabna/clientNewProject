import OTPForm, { OTPModalProps } from "./otp-form";
import { cookies } from "next/headers";

const Verification = ({ email, onClose, mode }: OTPModalProps) => {
  return (
    <>
      <main>
        <OTPForm email={email} onClose={onClose} mode={mode} />
      </main>
    </>
  );
};

export default Verification;
