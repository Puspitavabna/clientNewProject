import React, { ReactNode } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 ">
      <div className="bg-white h-[auto] w-[auto] rounded-lg relative overflow-y-auto ">
        {/* Close Button */}
        <button
          className="absolute top-0 right-0 text-white bg-red-600 hover:bg-red-900 w-9 h-9 p-2 rounded-full mt-4 mr-2"
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

export default Modal;
