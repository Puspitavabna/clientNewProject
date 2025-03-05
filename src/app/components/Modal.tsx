import { ReactNode } from "react";

export default function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  // Prevent click propagation on modal content
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close modal when backdrop is clicked
    >
      <div
        className="bg-[#F2E6C9] rounded-lg p-10 max-w-lg w-full relative"
        onClick={handleModalClick} // Prevent event from reaching the backdrop
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-5xl"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
