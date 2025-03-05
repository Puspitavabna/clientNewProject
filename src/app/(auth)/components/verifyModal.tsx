"use client"
import { useState, useEffect } from 'react';

const VerificationModal = () => {
  const [code, setCode] = useState(new Array(4).fill(''));
  const [timer, setTimer] = useState(240); // 4 minutes in seconds

  // Handle change for each input field
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    
    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on the next input field
    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  // Timer countdown logic
  useEffect(() => {
    if (timer === 0) return; // Stop when timer reaches 0

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  // Format the timer in MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Check if the code is complete
  const isCodeComplete = code.every((digit) => digit !== '');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-lg font-semibold text-center mb-4"><p> We have sent you a 4 digit verification code...</p>
        </h2>
        <p className="text-sm text-center mb-6">
          We have sent you a 4 digit verification code on <span className="font-semibold">abc@gmail.com</span>
        </p>

        <div className="flex justify-center space-x-2 mb-4">
          {code.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target, index)}
              className="w-10 h-12 text-2xl text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <p className="text-sm text-center mb-4">{formatTime(timer)}</p>

        <div className="text-center">
          <p className="text-sm mb-4">
            Did not receive code? <button className="text-blue-600 font-semibold">Resend Again.</button>
          </p>
          <button
            disabled={!isCodeComplete}
            className={`bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition ${!isCodeComplete && 'opacity-50 cursor-not-allowed'}`}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
