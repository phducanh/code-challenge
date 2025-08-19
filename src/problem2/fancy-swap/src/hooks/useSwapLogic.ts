import { useState, useEffect } from "react";
import type { Token } from "../types";
import { calculateSwapAmount } from "../data/mockData";

export const useSwapLogic = (tokens: Token[]) => {
  // Two-token swap state
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("0");
  const [usdValue, setUsdValue] = useState<string>("0");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Set default tokens when tokens are loaded
  useEffect(() => {
    if (tokens.length > 0 && !fromToken && !toToken) {
      setFromToken(tokens[0]); // Default to ETH
      setToToken(tokens[1] || tokens[0]); // Default to BTC or ETH if only one token
    }
  }, [tokens, fromToken, toToken]);

  // Calculate swap amounts when inputs change
  useEffect(() => {
    if (fromAmount && fromToken && toToken) {
      const swapResult = calculateSwapAmount(fromAmount, fromToken, toToken);
      setToAmount(swapResult.toAmount);
      setUsdValue(swapResult.usdValue);
    } else {
      setToAmount("0");
      setUsdValue("0");
    }
  }, [fromAmount, fromToken, toToken]);

  // Validation function
  const validateSwap = (): string => {
    if (!fromToken || !toToken) return "Please select both tokens";
    if (!fromAmount || parseFloat(fromAmount) <= 0)
      return "Please enter a valid amount";
    if (parseFloat(fromAmount) > fromToken.balance) {
      return `Insufficient balance. Available: ${fromToken.balance} ${fromToken.symbol}`;
    }
    if (fromToken.symbol === toToken.symbol) {
      return "Cannot swap the same token";
    }
    return "";
  };

  // Handle max button click
  const handleMaxClick = () => {
    if (!fromToken) return;
    setFromAmount(fromToken.balance.toString());
  };

  // Handle amount input change
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setErrorMessage("");
  };

  // Handle token selection
  const handleFromTokenSelect = (token: Token) => {
    setFromToken(token);
    // If selected token is same as toToken, clear toToken
    if (toToken && token.symbol === toToken.symbol) {
      setToToken(null);
    }
    setErrorMessage("");
  };

  const handleToTokenSelect = (token: Token) => {
    setToToken(token);
    // If selected token is same as fromToken, clear fromToken
    if (fromToken && token.symbol === fromToken.symbol) {
      setFromToken(null);
    }
    setErrorMessage("");
  };

  // Filter tokens to prevent duplicate selection
  const getAvailableFromTokens = () => {
    return tokens.filter(token => !toToken || token.symbol !== toToken.symbol);
  };

  const getAvailableToTokens = () => {
    return tokens.filter(token => !fromToken || token.symbol !== fromToken.symbol);
  };

  // Handle swap tokens (flip from/to)
  const handleSwapTokens = () => {
    if (!fromToken || !toToken) return;

    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    // Clear amounts to recalculate
    setFromAmount("");
    setToAmount("0");
    setUsdValue("0");
    setErrorMessage("");
  };

  // Handle swap submission
  const handleSwap = async () => {
    if (!fromToken || !toToken) return;

    const validationError = validateSwap();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    // Simulate API call with 1 second delay as specified in doc.md
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful swap
      alert(
        `Successfully swapped ${fromAmount} ${
          fromToken.symbol
        } for ${parseFloat(toAmount).toFixed(6)} ${toToken.symbol}!`
      );

      // Reset form
      setFromAmount("");
      setToAmount("0");
      setUsdValue("0");
    } catch (error) {
      setErrorMessage("Swap failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update error message when validation changes
  useEffect(() => {
    if (fromAmount && fromToken && toToken) {
      const validationError = validateSwap();
      setErrorMessage(validationError);
    } else {
      setErrorMessage("");
    }
  }, [fromAmount, fromToken, toToken]);

  return {
    // State
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    usdValue,
    errorMessage,
    isLoading,
    
    // Handlers
    handleMaxClick,
    handleFromAmountChange,
    handleFromTokenSelect,
    handleToTokenSelect,
    handleSwapTokens,
    handleSwap,
    
    // Computed values
    getAvailableFromTokens,
    getAvailableToTokens,
    validateSwap,
  };
};
