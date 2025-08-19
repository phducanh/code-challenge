export interface Token {
  symbol: string;
  name: string;
  price: number;
  balance: number;
  icon: string; // SVG placeholder
}

export interface SwapData {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  usdValue: string;
}

export interface PriceData {
  currency: string;
  date: string;
  price: number;
}
