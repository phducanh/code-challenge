import React from 'react';
import { Loader2, ArrowUpDown } from 'lucide-react';

interface SwapButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  errorMessage?: string;
}

export const SwapButton: React.FC<SwapButtonProps> = ({
  onClick,
  disabled,
  loading,
  errorMessage
}) => {
  const getButtonText = () => {
    if (loading) return 'Swapping...';
    if (errorMessage) return errorMessage;
    return 'Swap';
  };

  const getButtonIcon = () => {
    if (loading) return <Loader2 className="w-5 h-5 animate-spin" />;
    return <ArrowUpDown className="w-5 h-5" />;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
        disabled || loading
          ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
      }`}
    >
      {getButtonIcon()}
      <span>{getButtonText()}</span>
    </button>
  );
};
