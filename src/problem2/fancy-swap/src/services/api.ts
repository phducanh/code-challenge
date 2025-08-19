import type { PriceData } from '../types';

// API Configuration
const API_CONFIG = {
  BASE_URL: 'https://interview.switcheo.com',
  ENDPOINTS: {
    PRICES: '/prices.json',
  },
  TIMEOUT: 10000, // 10 seconds
} as const;

// Custom error classes for better error handling
export class ApiError extends Error {
  status?: number;
  code?: string;
  
  constructor(
    message: string,
    status?: number,
    code?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network request failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

// Generic fetch wrapper with timeout and error handling
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = API_CONFIG.TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new NetworkError('Request timeout');
      }
      if (error instanceof ApiError) {
        throw error;
      }
    }
    
    throw new NetworkError('Failed to fetch data');
  }
}

// Token prices API service
export class TokenPricesService {
  private static instance: TokenPricesService;
  private cache: Map<string, { data: PriceData[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 60000; // 1 minute cache

  private constructor() {}

  public static getInstance(): TokenPricesService {
    if (!TokenPricesService.instance) {
      TokenPricesService.instance = new TokenPricesService();
    }
    return TokenPricesService.instance;
  }

  /**
   * Fetch token prices from the API
   * @param useCache - Whether to use cached data if available
   * @returns Promise<PriceData[]>
   */
  public async fetchPrices(useCache: boolean = true): Promise<PriceData[]> {
    const cacheKey = 'token_prices';
    const now = Date.now();

    // Check cache first
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (now - cached.timestamp < this.CACHE_DURATION) {
        console.log('🔄 Using cached token prices');
        return cached.data;
      }
    }

    try {
      console.log('🌐 Fetching token prices from API...');
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRICES}`;
      const response = await fetchWithTimeout(url);
      const data: PriceData[] = await response.json();

      // Validate response data
      if (!Array.isArray(data)) {
        throw new ApiError('Invalid response format: expected array');
      }

      // Cache the result
      this.cache.set(cacheKey, { data, timestamp: now });
      console.log(`✅ Fetched ${data.length} token prices successfully`);
      
      return data;
    } catch (error) {
      console.error('❌ Failed to fetch token prices:', error);
      
      // Return cached data as fallback if available
      if (this.cache.has(cacheKey)) {
        console.log('🔄 Using stale cached data as fallback');
        return this.cache.get(cacheKey)!.data;
      }
      
      throw error;
    }
  }

  /**
   * Get price for a specific token
   * @param currency - Token symbol (e.g., 'ETH', 'BTC')
   * @returns Promise<number | null>
   */
  public async getTokenPrice(currency: string): Promise<number | null> {
    try {
      const prices = await this.fetchPrices();
      const tokenPrice = prices.find(
        (price) => price.currency.toUpperCase() === currency.toUpperCase()
      );
      return tokenPrice ? tokenPrice.price : null;
    } catch (error) {
      console.error(`Failed to get price for ${currency}:`, error);
      return null;
    }
  }

  /**
   * Get prices for multiple tokens
   * @param currencies - Array of token symbols
   * @returns Promise<Record<string, number>>
   */
  public async getMultipleTokenPrices(
    currencies: string[]
  ): Promise<Record<string, number>> {
    try {
      const prices = await this.fetchPrices();
      const result: Record<string, number> = {};

      currencies.forEach((currency) => {
        const tokenPrice = prices.find(
          (price) => price.currency.toUpperCase() === currency.toUpperCase()
        );
        if (tokenPrice) {
          result[currency.toUpperCase()] = tokenPrice.price;
        }
      });

      return result;
    } catch (error) {
      console.error('Failed to get multiple token prices:', error);
      return {};
    }
  }

  /**
   * Clear the cache
   */
  public clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Token prices cache cleared');
  }
}

// Export singleton instance
export const tokenPricesService = TokenPricesService.getInstance();
