import Image from "next/image";

// type IPaymentReceipt = {
//   back_url: string;
// };

const PaymentReceipt1 = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-black md:min-h-[60vh]">
      <div className="absolute">
        {/* <div className="mb-4 flex items-center justify-end relative left-4 -bottom-9 z-50">
        <Link href={back_url || '/'}>
            
              <button className="rounded-full bg-red-600 px-3 py-1 text-[14px] text-white transition-all hover:bg-red-900 hover:shadow-md">
                x
              </button>
            
          </Link>
        </div> */}
        <div className="relative rounded bg-white px-4 pb-7 pt-5">
          <div className="mb-8 flex items-center justify-between text-sm">
            <div></div>{" "}
          </div>
          <div className="grid grid-cols-2">
            <h3 className="text-2xl font-semibold text-blue-600">
              Deposit Reciption
            </h3>
            <div className="font-semibold">
              <p>Payment Date: 30 Aug 2014</p>
              <p>Payment Id: 75sg24fg6454ag</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6">
          <p className="font-semibold">Dear, Mr Jack</p>
          <p className="mb-4 font-semibold">
            You have paid 500 USD to sbi bank.{" "}
            <span className="text-[#5296D6]">
              Your payment status is pending
            </span>
          </p>

          <div className="grid grid-cols-7 gap-5">
            <div className="col-span-5 flex-1">
              <table className="w-full text-left">
                <tbody className="text-left">
                  <tr className="text-left">
                    <td>Payment method</td>
                    <td>:</td>
                    <td>SBI Bank</td>
                  </tr>
                  <tr>
                    <td>Account Holder Name</td>
                    <td>:</td>
                    <td>Mr. Jack</td>
                  </tr>
                  <tr>
                    <td>Account Name</td>
                    <td>:</td>
                    <td>Indian Bank</td>
                  </tr>
                  <tr>
                    <td>Account Number</td>
                    <td>:</td>
                    <td>1694996199</td>
                  </tr>
                  <tr>
                    <td>Transaction ID</td>
                    <td>:</td>
                    <td>646JOJDOJ6</td>
                  </tr>
                  <tr>
                    <td>Transaction Receipt</td>
                    <td>:</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>Any Additional information</td>
                    <td>:</td>
                    <td>Hello Sir!</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <Image
                src="/images/image 12130.png"
                width={80}
                height={60}
                alt="spam"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt1;
