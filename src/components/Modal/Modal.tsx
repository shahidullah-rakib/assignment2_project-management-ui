// src/components/Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Stop propagation to prevent the modal from closing when clicking inside the modal content
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={onClose} // Closes modal when clicking outside content
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-md relative"
        onClick={handleContentClick} // Prevents modal from closing when clicking inside
      >
        <button
          onClick={onClose}
          className="text-gray-500 absolute top-4 right-4"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
