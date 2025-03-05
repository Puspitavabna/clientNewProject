import React, { ReactNode } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  size: 'small' | 'large';
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, size, children }) => {
  if (!show) return null;

  // Determine size classes based on the `size` prop
  const sizeClasses = {
   
    small: 'w-1/2 h-fit',    // Medium size (50% width and height)
    large: 'w-3/4 h-full',     // Large size (75% width and height)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div
        className={`bg-white rounded-lg relative overflow-y-auto ${sizeClasses[size]}`}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-900 w-9 h-9 p-2 rounded-full"
          onClick={onClose}
        >
          &#x2715; {/* Close icon (X) */}
        </button>

        {/* Scrollable content */}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
