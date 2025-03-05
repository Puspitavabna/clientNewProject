import React, { ReactNode } from 'react';

interface NextModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const NextModal: React.FC<NextModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[100%] max-w-3xl p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default NextModal;
