import React from "react";
import type { Token } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TokenDropdownProps {
  selectedToken: Token;
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
  label: string;
  disabled?: boolean;
}

export const TokenDropdown: React.FC<TokenDropdownProps> = ({
  selectedToken,
  tokens,
  onTokenSelect,
  label,
  disabled = false,
}) => {
  const handleValueChange = (value: string) => {
    const token = tokens.find((t) => t.symbol === value);
    if (token) {
      onTokenSelect(token);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <Select
        value={selectedToken.symbol}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          className="w-full h-16 p-3 bg-white dark:bg-gray-700 border !border-gray-300 dark:!border-gray-600 hover:!border-gray-400 dark:hover:!border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 "
          size={null}
        >
          <SelectValue>
            <div className="flex items-center justify-between">
              <img
                src={selectedToken.icon}
                alt={selectedToken.name}
                className="w-6 h-6 rounded-full flex-shrink-0"
              />
              <div className="text-left">
                <div className="font-medium text-gray-900 dark:text-white">
                  {selectedToken.symbol}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedToken.name}
                </div>
              </div>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-xl">
          {tokens.map((token) => (
            <SelectItem
              key={token.symbol}
              value={token.symbol}
              className="hover:bg-gray-50 dark:hover:bg-gray-600 focus:bg-blue-50 dark:focus:bg-blue-900/50 transition-colors cursor-pointer p-3"
            >
              <div className="flex items-center space-x-3 w-full">
                <img
                  src={token.icon}
                  alt={token.name}
                  className="w-6 h-6 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {token.symbol}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {token.name}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
