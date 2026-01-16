import type { FC } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'amber' | 'gray' | 'white';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorClasses = {
  amber: 'text-amber-500',
  gray: 'text-gray-400',
  white: 'text-white',
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'amber',
  className = '',
}) => {
  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export const LoadingOverlay: FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" />
        {message && <p className="text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export const LoadingPage: FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <LoadingSpinner size="xl" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export const LoadingButton: FC<{
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}> = ({
  isLoading,
  children,
  loadingText,
  className = '',
  disabled,
  type = 'button',
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`inline-flex items-center justify-center gap-2 ${className} ${
        isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color="white" />
          {loadingText || 'Loading...'}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingSpinner;
