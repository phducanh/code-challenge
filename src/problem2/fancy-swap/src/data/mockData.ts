import type { Token, PriceData } from '../types';
import marketData from './market.json';
import userBalances from './userBalances.json';


// Base tokens without prices (prices will be fetched from API)
const baseTokens: Omit<Token, 'price'>[] = marketData.coinList.map(coin => ({
  symbol: coin.symbol,
  name: coin.name,
  balance: userBalances.balances[coin.symbol as keyof typeof userBalances.balances] || 0,
  icon: coin.logo
}));

// Fallback prices in case API fails (approximate market prices)
const FALLBACK_PRICES: Record<string, number> = {
  BTC: 60000,
  ETH: 2600,
  USDT: 1.0,
  USDC: 1.0,
  BNB: 300,
  SOL: 100,
  XRP: 0.6,
  DOGE: 0.08,
  ADA: 0.5,
  AVAX: 35,
  LINK: 15,
  MATIC: 0.8,
  LTC: 90,
  SHIB: 0.000025,
  UNI: 7,
  WBTC: 60000,
  DAI: 1.0,
  ATOM: 12,
  DOT: 6,
  ARB: 1.2,
  OP: 2.5,
  NEAR: 3,
  APE: 4,
  FIL: 8,
  FTM: 0.4
};

export const createTokensWithPrices = (apiPrices: PriceData[]): Token[] => {
  return baseTokens.map((baseToken: Omit<Token, 'price'>) => {
    // Find price from API data
    const apiPrice = apiPrices.find(
      price => price.currency.toUpperCase() === baseToken.symbol.toUpperCase()
    );
    
    // Use API price if available, otherwise fallback to mock price
    const price = apiPrice ? apiPrice.price : FALLBACK_PRICES[baseToken.symbol] || 0;
    
    return {
      ...baseToken,
      price,
    };
  });
};

// Export fallback tokens with static prices for when API is not available
export const MOCK_TOKENS: Token[] = createTokensWithPrices([]);

export const getTokenBySymbol = (tokens: Token[], symbol: string): Token | undefined => {
  return tokens.find(token => token.symbol.toUpperCase() === symbol.toUpperCase());
};

export const calculateUSDValue = (amount: string, token: Token): string => {
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    return '0';
  }
  
  return (amountNum * token.price).toFixed(2);
};

export const calculateSwapAmount = (
  fromAmount: string,
  fromToken: Token,
  toToken: Token
): { toAmount: string; usdValue: string } => {
  const amount = parseFloat(fromAmount);
  if (isNaN(amount) || amount <= 0) {
    return { toAmount: '0', usdValue: '0' };
  }

  // Convert from token to USD, then to destination token
  const fromValueInUSD = amount * fromToken.price;
  const toAmount = fromValueInUSD / toToken.price;
  
  return {
    toAmount: toAmount.toFixed(6),
    usdValue: fromValueInUSD.toFixed(2)
  };
};

export const getExchangeRate = (fromToken: Token, toToken: Token): number => {
  return fromToken.price / toToken.price;
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  });
};
