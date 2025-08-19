import { useState, useEffect, useCallback } from 'react';
import { tokenPricesService, ApiError, NetworkError } from '../services/api';
import type { PriceData } from '../types';

export interface UseTokenPricesState {
  prices: PriceData[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface UseTokenPricesReturn extends UseTokenPricesState {
  refetch: () => Promise<void>;
  getPrice: (currency: string) => number | null;
  clearError: () => void;
}

/**
 * Custom hook for managing token prices from API
 */
export const useTokenPrices = (autoFetch: boolean = true): UseTokenPricesReturn => {
  const [state, setState] = useState<UseTokenPricesState>({
    prices: [],
    loading: false,
    error: null,
    lastUpdated: null,
  });

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const fetchPrices = useCallback(async (useCache: boolean = true) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const prices = await tokenPricesService.fetchPrices(useCache);
      setState(prev => ({
        ...prev,
        prices,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      }));
    } catch (error) {
      let errorMessage = 'Failed to fetch token prices';
      
      if (error instanceof ApiError) {
        errorMessage = `API Error: ${error.message}`;
      } else if (error instanceof NetworkError) {
        errorMessage = `Network Error: ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  const refetch = useCallback(() => fetchPrices(false), [fetchPrices]);

  const getPrice = useCallback((currency: string): number | null => {
    const tokenPrice = state.prices.find(
      price => price.currency.toUpperCase() === currency.toUpperCase()
    );
    return tokenPrice ? tokenPrice.price : null;
  }, [state.prices]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchPrices();
    }
  }, [autoFetch, fetchPrices]);

  return {
    ...state,
    refetch,
    getPrice,
    clearError,
  };
};

/**
 * Hook for getting a specific token price
 */
export const useTokenPrice = (currency: string) => {
  const { loading, error, getPrice } = useTokenPrices();
  
  return {
    price: getPrice(currency),
    loading,
    error,
  };
};
