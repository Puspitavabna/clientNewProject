import { ReactNode } from "react";

export default function ModalNews({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      {/* Render children directly */}
      {children}
    </>
  );
}
