import React, { useMemo } from 'react';
import { BoxProps } from './BoxProps'; // Assume BoxProps is defined somewhere

// Define clear types
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo' | string;

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number;
}

interface Prices {
  [currency: string]: number;
}

// Assume hooks are already defined with types
interface WalletPageProps extends BoxProps {}

const WalletPage: React.FC<WalletPageProps> = ({ ...rest }) => {
  const balances = useWalletBalances(); // Assume returns WalletBalance[]
  const prices = usePrices(); // Assume returns Prices

  // getPriority function with clear types
  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  // Calculate sortedBalances with clear and optimized logic
  const sortedBalances = useMemo(() => {
    return balances
      .map((balance: WalletBalance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      }))
      .filter((balance: FormattedWalletBalance) => balance.priority > -99 && balance.amount > 0)
      .sort((lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) => {
        if (lhs.priority > rhs.priority) return -1;
        if (lhs.priority < rhs.priority) return 1;
        return lhs.currency.localeCompare(rhs.currency); // Secondary criteria for stable sorting
      });
  }, [balances]);

  // Handle loading and empty states
  if (!balances || balances.length === 0) {
    return <div {...rest}>No balances available</div>;
  }

  // Create rows directly, eliminating intermediate formattedBalances
  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency]
      ? prices[balance.currency] * balance.amount
      : 0;
    return (
      <WalletRow
        key={balance.currency} // Use currency as unique key
        className="wallet-row" // Assume using CSS modules or fixed class
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed(2)} // Format with 2 decimal places
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

// Mock hooks
const useWalletBalances = () => {
  // Mock data
  return [] as WalletBalance[];
};

const usePrices = () => {
  // Mock data
  return {} as Prices;
};

// Mock WalletRow component
const WalletRow: React.FC<{
  className: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}> = ({ className, amount, usdValue, formattedAmount }) => {
  return (
    <div className={className}>
      {formattedAmount} ({usdValue} USD)
    </div>
  );
};