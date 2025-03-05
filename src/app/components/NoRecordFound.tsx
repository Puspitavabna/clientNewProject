import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface NoRecordsProps {
  className?: string; // Make className optional
}

const NoRecords: React.FC<NoRecordsProps> = ({ className }) => {
  return (
    <div className={`m-auto flex flex-col items-center justify-center ${className || ''}`}>
      <div className="text-4xl text-yellow-500 mb-2">
        <FaExclamationTriangle />
      </div>
      <div className="text-primary">
        No Record Found
      </div>
    </div>
  );
};

export default NoRecords;