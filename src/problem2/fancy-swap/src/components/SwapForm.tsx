import React from "react";
import { createTokensWithPrices } from "../data/mockData";
import { useTokenPrices } from "../hooks/useTokenPrices";
import { useSwapLogic } from "../hooks/useSwapLogic";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { PriceWarning } from "./PriceWarning";
import { TokenSection } from "./TokenSection";
import { SwapDirectionButton } from "./SwapDirectionButton";
import { ErrorMessage } from "./ErrorMessage";
import { SwapValueDisplay } from "./SwapValueDisplay";
import { SwapButton } from "./SwapButton";
import { TokenInfo } from "./TokenInfo";

export const SwapForm: React.FC = () => {
  // API integration for live prices
  const {
    prices,
    loading: pricesLoading,
    error: pricesError,
    refetch,
  } = useTokenPrices();

  // Create tokens with live prices
  const tokens = createTokensWithPrices(prices);

  // Swap logic hook
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    usdValue,
    errorMessage,
    isLoading,
    handleMaxClick,
    handleFromAmountChange,
    handleFromTokenSelect,
    handleToTokenSelect,
    handleSwapTokens,
    handleSwap,
    getAvailableFromTokens,
    getAvailableToTokens,
  } = useSwapLogic(tokens);

  // Show loading state while fetching prices
  if (pricesLoading) {
    return <LoadingState />;
  }

  // Show error state if API fails and no cached data
  if (pricesError && tokens.length === 0) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-colors">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
          Crypto Swap
        </h2>

        {/* Show warning if using cached prices */}
        {pricesError && tokens.length > 0 && (
          <PriceWarning onRefresh={refetch} />
        )}
      </div>

      <div className="space-y-4">
        {/* From Token Section */}
        <TokenSection
          label="From"
          token={fromToken}
          tokens={getAvailableFromTokens()}
          amount={fromAmount}
          onTokenSelect={handleFromTokenSelect}
          onAmountChange={handleFromAmountChange}
          onMaxClick={handleMaxClick}
        />

        {/* Swap Direction Button */}
        <SwapDirectionButton
          onClick={handleSwapTokens}
          disabled={!fromToken || !toToken}
        />

        {/* To Token Section */}
        <TokenSection
          label="To"
          token={toToken}
          tokens={getAvailableToTokens()}
          amount={toAmount}
          onTokenSelect={handleToTokenSelect}
          readonly
        />

        {/* Error Message */}
        {errorMessage && <ErrorMessage message={errorMessage} />}

        {/* USD Value Display */}
        {fromToken && toToken && (
          <SwapValueDisplay
            usdValue={usdValue}
            fromToken={fromToken}
            toToken={toToken}
          />
        )}

        {/* Swap Button */}
        <div className="pt-2">
          <SwapButton
            onClick={handleSwap}
            loading={isLoading}
            disabled={
              !fromToken ||
              !toToken ||
              !fromAmount ||
              parseFloat(fromAmount) <= 0
            }
          />
        </div>
      </div>

      {/* Token Info */}
      {fromToken && toToken && (
        <TokenInfo fromToken={fromToken} toToken={toToken} />
      )}
    </div>
  );
};
