import React from "react";

interface PriceWarningProps {
  onRefresh: () => void;
}

export const PriceWarning: React.FC<PriceWarningProps> = ({ onRefresh }) => {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
      <div className="flex items-center">
        <div className="text-yellow-600 dark:text-yellow-400 text-sm">
          ⚠️ Using cached prices.
          <button
            onClick={onRefresh}
            className="underline hover:no-underline ml-1"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};
