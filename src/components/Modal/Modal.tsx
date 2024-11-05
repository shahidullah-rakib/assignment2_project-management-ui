import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  customClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  customClass = 'max-w-md',
}) => {
  if (!isOpen) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="py-10 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded shadow-lg w-full ${customClass} relative h-full overflow-hidden`}
        onClick={handleContentClick}
      >
        <button
          onClick={onClose}
          className="text-gray-500 absolute top-4 right-4 font-bold"
        >
          {/* &times; */}X
        </button>
        <div className="h-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
