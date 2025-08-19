import React from "react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Failed to load token prices",
  onRetry
}) => {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <div className="text-center py-8">
        <div className="text-red-500 dark:text-red-400 mb-4">
          {message}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};
