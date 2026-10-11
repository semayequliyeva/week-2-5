'use client';

import React, { useState, useMemo, useRef } from 'react';
import { DataPoint } from '../../types/dashboard';
import { computeHeavyAggregate } from '../../utils/mockGenerator';

interface AnalyticsWidgetProps {
  data: DataPoint[];
  onThresholdChange: (newThreshold: number) => void;
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = React.memo(({ data, onThresholdChange }) => {
  const renderCountRef = useRef(1);
  renderCountRef.current++;

  const [filterThreshold, setFilterThreshold] = useState<number>(30);

  const metrics = useMemo(() => {
    return computeHeavyAggregate(data, filterThreshold);
  }, [data, filterThreshold]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFilterThreshold(val);
    onThresholdChange(val);
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">Analytics Aggregator</h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
          Renders: {renderCountRef.current}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Filter Threshold:</span>
          <span className="font-bold font-mono">{filterThreshold} pts</span>
        </div>
        <input
          type="range"
          min="10"
          max="80"
          value={filterThreshold}
          onChange={handleSliderChange}
          className="w-full accent-blue-600 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
        <div>
          <span className="text-gray-400 block">Avg Value</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">{metrics.average}</span>
        </div>
        <div>
          <span className="text-gray-400 block">Peak Value</span>
          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{metrics.peak}</span>
        </div>
        <div>
          <span className="text-gray-400 block">Filtered Count</span>
          <span className="font-mono font-semibold">{metrics.totalComputedItems}</span>
        </div>
        <div>
          <span className="text-gray-400 block">Current Trend</span>
          <span className={`font-semibold ${metrics.trend === 'up' ? 'text-emerald-500' : 'text-amber-500'}`}>
            {metrics.trend.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
});

AnalyticsWidget.displayName = 'AnalyticsWidget';
export default AnalyticsWidget;