import React from "react";
import type { Token } from "../types";
import { TokenDropdown } from "./TokenDropdown";
import { AmountInput } from "./AmountInput";

interface TokenSectionProps {
  label: string;
  token: Token | null;
  tokens: Token[];
  amount?: string;
  onTokenSelect: (token: Token) => void;
  onAmountChange?: (value: string) => void;
  onMaxClick?: () => void;
  readonly?: boolean;
}

export const TokenSection: React.FC<TokenSectionProps> = ({
  label,
  token,
  tokens,
  amount,
  onTokenSelect,
  onAmountChange,
  onMaxClick,
  readonly = false
}) => {
  // Don't render if no token is selected
  if (!token) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          Please select a token
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="space-y-3">
        <TokenDropdown
          tokens={tokens}
          selectedToken={token}
          onTokenSelect={onTokenSelect}
          label={`${label} Token`}
        />
        
        {readonly ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
            <div className="text-right text-lg font-semibold text-gray-900 dark:text-white">
              {amount ? parseFloat(amount).toFixed(6) : "0"}
            </div>
            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
              Balance: {token.balance.toLocaleString()} {token.symbol}
            </div>
          </div>
        ) : (
          <AmountInput
            label="Amount"
            value={amount || ""}
            onChange={onAmountChange || (() => {})}
            onMaxClick={onMaxClick || (() => {})}
            token={token}
            showBalance={true}
          />
        )}
      </div>
    </div>
  );
};
