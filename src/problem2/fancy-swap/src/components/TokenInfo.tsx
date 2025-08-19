import React from "react";
import type { Token } from "../types";

interface TokenInfoProps {
  fromToken: Token;
  toToken: Token;
}

export const TokenInfo: React.FC<TokenInfoProps> = ({ fromToken, toToken }) => {
  return (
    <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-medium">{fromToken.symbol}</div>
          <div>${fromToken.price.toLocaleString()} USD</div>
        </div>
        <div>
          <div className="font-medium">{toToken.symbol}</div>
          <div>${toToken.price.toLocaleString()} USD</div>
        </div>
      </div>
    </div>
  );
};
