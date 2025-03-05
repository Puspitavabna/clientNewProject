import React, { ReactNode } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalView: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white h-[60vh] w-[50vw] rounded-lg relative">
        {/* Close Button */}
        {/* <button
          className="absolute -top-1 -right-1 z-50 text-white bg-red-600 hover:bg-red-900 w-9 h-9 p-2 rounded-full"
          onClick={onClose}
        >
          &#x2715; 
        </button> */}
        <button
          className="absolute top-1 right-2 z-50 text-[#231F20] border-2 border-[#231F20] bg-white w-9 h-9 p-2 rounded-lg"
          onClick={onClose}
        >
          &#x2715; {/* Close icon (X) */}
        </button>

        {/* Scrollable content */}
        <div className="px-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalView;
