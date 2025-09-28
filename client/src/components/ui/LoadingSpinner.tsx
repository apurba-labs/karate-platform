// src/components/ui/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = 'Loading...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="loading-spinner-container">
      <div className="d-flex flex-column align-items-center gap-3">
        <div 
          className={`${sizeClasses[size]} border-gray-300 border-t-primary rounded-circle animate-spin`}
          style={{ 
            animation: 'spinner-border 0.75s linear infinite',
            border: '0.25em solid #e9ecef',
            borderRightColor: 'transparent'
          }}
        ></div>
        {text && <p className="text-gray-600 font-weight-normal mb-0">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;