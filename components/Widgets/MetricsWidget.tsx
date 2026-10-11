'use client';

import React, { useRef } from 'react';
import { DataPoint, WidgetConfig } from '../../types/dashboard';
import SparklineChart from '../SparklineChart';

interface MetricsWidgetProps {
  data: DataPoint[];
  config: WidgetConfig;
  onRefresh: () => void;
}

const MetricsWidget: React.FC<MetricsWidgetProps> = React.memo(({ data, config, onRefresh }) => {
  const renderCountRef = useRef(1);
  renderCountRef.current++;

  const latestVal = data[data.length - 1]?.value || 0;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">Live User Activity</h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
          Renders: {renderCountRef.current}
        </span>
      </div>

      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{latestVal}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">active req/sec</span>
      </div>

      <SparklineChart data={data} color={config.accentColor} />

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
        <span className="text-gray-400">Buffer: {data.length} pts</span>
        <button
          onClick={onRefresh}
          className="px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition"
        >
          Reset Stream
        </button>
      </div>
    </div>
  );
});

MetricsWidget.displayName = 'MetricsWidget';
export default MetricsWidget;