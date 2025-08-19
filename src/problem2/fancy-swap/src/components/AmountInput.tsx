import React from "react";
import type { Token } from "../types";

interface AmountInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  token: Token;
  showBalance?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  onMaxClick?: () => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  label,
  value,
  onChange,
  token,
  showBalance = false,
  readOnly = false,
  placeholder = "0.0",
  onMaxClick,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow empty string, numbers, and decimal points
    if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {showBalance && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Balance: {token.balance.toLocaleString()} {token.symbol}
            </span>
            {onMaxClick && (
              <button
                type="button"
                onClick={onMaxClick}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              >
                MAX
              </button>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
            readOnly
              ? "bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
              : "bg-white dark:bg-gray-700"
          }`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <img src={token?.icon} alt={token?.name} />
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            {token?.symbol}
          </span>
        </div>
      </div>

      {value && !readOnly && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          ≈ $
          {(parseFloat(value || "0") * token.price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          USD
        </div>
      )}
    </div>
  );
};
