import React, { useMemo } from 'react';
import { BoxProps } from './BoxProps'; // Giả sử BoxProps được định nghĩa ở đâu đó

// Định nghĩa các kiểu rõ ràng
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

// Giả sử các hook đã được định nghĩa với kiểu
interface WalletPageProps extends BoxProps {}

const WalletPage: React.FC<WalletPageProps> = ({ ...rest }) => {
  const balances = useWalletBalances(); // Giả sử trả về WalletBalance[]
  const prices = usePrices(); // Giả sử trả về Prices

  // Hàm getPriority với kiểu rõ ràng
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

  // Tính toán sortedBalances với logic rõ ràng và tối ưu
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
        return lhs.currency.localeCompare(rhs.currency); // Tiêu chí phụ để sắp xếp ổn định
      });
  }, [balances]);

  // Xử lý trạng thái loading và rỗng
  if (!balances || balances.length === 0) {
    return <div {...rest}>No balances available</div>;
  }

  // Tạo rows trực tiếp, loại bỏ formattedBalances trung gian
  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency]
      ? prices[balance.currency] * balance.amount
      : 0;
    return (
      <WalletRow
        key={balance.currency} // Sử dụng currency làm key duy nhất
        className="wallet-row" // Giả sử sử dụng CSS modules hoặc class cố định
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed(2)} // Định dạng với 2 chữ số thập phân
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

// Giả định các hook
const useWalletBalances = () => {
  // Giả lập dữ liệu
  return [] as WalletBalance[];
};

const usePrices = () => {
  // Giả lập dữ liệu
  return {} as Prices;
};

// Giả định WalletRow component
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