// components/PlaceholderModal.tsx
import React from 'react';

// ... (interface and imports - same as before)

const PlaceholderModal: React.FC<PlaceholderModalProps> = ({ title, desc, onClose }) => {
  const descriptionStyle = { // Inline style for description
    color: 'rgba(0, 0, 0, 0.8)', // 80% black
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-poppins">
      <div className="fixed inset-0 bg-black/20" onClick={onClose}></div>
      <div className="bg-[#E6EDFC] rounded-lg p-8 w-[90%] max-w-4xl relative mx-auto">
        <div className="flex flex-col items-center">
          <div className="border-t-2 border-primary mb-4 w-[86px]"></div>
          <h2 className="text-black font-semibold text-4xl text-center">
            {title}
          </h2>
          <p className="text-base mt-8 text-center" style={descriptionStyle}> {/* Apply inline style */}
            {desc}
          </p>
        </div>
        <button onClick={onClose} className="border border-black text-black rounded-md px-2 py-1 absolute top-4 right-4 z-10" aria-label="Close">
          X
        </button>
      </div>
    </div>
  );
};

export default PlaceholderModal;

// ... (example usage - same as before)