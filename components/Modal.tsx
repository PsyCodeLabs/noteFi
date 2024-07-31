import React, { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-700">
        <div className="mb-6">{children}</div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
