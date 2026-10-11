'use client';

import React, { useRef } from 'react';
import { TransactionItem } from '../../types/dashboard';

interface TransactionWidgetProps {
  transactions: TransactionItem[];
  onClear: () => void;
}

const TransactionWidget: React.FC<TransactionWidgetProps> = React.memo(({ transactions, onClear }) => {
  const renderCountRef = useRef(1);
  renderCountRef.current++;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">Live Transaction Stream</h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
          Renders: {renderCountRef.current}
        </span>
      </div>

      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-xs"
          >
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{tx.user}</p>
              <p className="text-[10px] text-gray-400">{tx.timestamp}</p>
            </div>
            <div className="text-right">
              <span className="font-bold font-mono text-gray-900 dark:text-white">${tx.amount}</span>
              <span
                className={`block text-[10px] capitalize ${
                  tx.status === 'completed' ? 'text-emerald-500' : tx.status === 'pending' ? 'text-amber-500' : 'text-red-500'
                }`}
              >
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs">
        <span className="text-gray-400">Total: {transactions.length} items</span>
        <button
          onClick={onClear}
          className="text-red-500 hover:text-red-600 font-medium transition"
        >
          Clear Stream
        </button>
      </div>
    </div>
  );
});

TransactionWidget.displayName = 'TransactionWidget';
export default TransactionWidget;