import React from "react";
import { ArrowUpDown } from "lucide-react";

interface SwapDirectionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const SwapDirectionButton: React.FC<SwapDirectionButtonProps> = ({
  onClick,
  disabled = false
}) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="p-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        <ArrowUpDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </button>
    </div>
  );
};
