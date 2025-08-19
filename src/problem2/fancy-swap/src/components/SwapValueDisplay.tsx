import React from "react";
import type { Token } from "../types";
import { getExchangeRate } from "../data/mockData";

interface SwapValueDisplayProps {
  usdValue: string;
  fromToken: Token;
  toToken: Token;
}

export const SwapValueDisplay: React.FC<SwapValueDisplayProps> = ({
  usdValue,
  fromToken,
  toToken
}) => {
  if (usdValue === "0") return null;

  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <div className="text-center">
        <span className="text-sm text-green-600 dark:text-green-400">
          Swap Value
        </span>
        <div className="text-2xl font-bold text-green-800 dark:text-green-300">
          $
          {parseFloat(usdValue).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          USD
        </div>
        <div className="text-sm text-green-600 dark:text-green-400 mt-1">
          Rate: 1 {fromToken.symbol} ={" "}
          {getExchangeRate(fromToken, toToken).toFixed(6)}{" "}
          {toToken.symbol}
        </div>
      </div>
    </div>
  );
};
