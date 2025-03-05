// type IWithdrawReceipt = {
//   back_url: string;
// };

const WithdrawReceipt = () => {
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
        <div className="relative rounded-xl bg-white px-5 pb-7 pt-5">
          <div className="mb-8 flex items-center justify-between text-sm">
            <div></div>{" "}
          </div>
          <div className="flex justify-center gap-7">
            <h3 className="text-2xl font-semibold text-blue-600">
              Withdrawal Invoice
            </h3>
            <div className="font-semibold">
              <p>Payment Date: 30 Aug 2014</p>
              <p>Payment Id: 75sg24fg6454ag</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6">
          <p className="text-left font-semibold">Dear, Mr Jack</p>
          <p className="mb-4 font-semibold">
            Your withdrawal amount is 500 USD.{" "}
            <span className="text-[#5296D6]">
              Your withdrawal status is pending
            </span>
          </p>

          <div className="grid grid-cols-7 gap-5">
            <div className="col-span-5 flex-1">
              <table className="w-full text-left">
                <tbody className="text-left">
                  <tr>
                    <td>Account Holder Name</td>
                    <td>:</td>
                    <td>Mr. Jack</td>
                  </tr>
                  <tr className="text-left">
                    <td>Withdrawal Account</td>
                    <td>:</td>
                    <td>Paypal</td>
                  </tr>
                  <tr>
                    <td>Account Number</td>
                    <td>:</td>
                    <td>1694996199</td>
                  </tr>
                  <tr>
                    <td>Routing Number</td>
                    <td>:</td>
                    <td>g46dgd64g</td>
                  </tr>
                  <tr>
                    <td>IBAN or SWIFT/BIC Code</td>
                    <td>:</td>
                    <td>HJ45</td>
                  </tr>
                  <tr>
                    <td>Any additional information</td>
                    <td>:</td>
                    <td>My Project Problem</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawReceipt;
