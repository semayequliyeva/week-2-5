'use client';

import React from 'react';
import { DataPoint } from '../types/dashboard';

interface SparklineProps {
  data: DataPoint[];
  color?: string;
  height?: number;
}

const SparklineChart: React.FC<SparklineProps> = React.memo(({ data, color = '#3b82f6', height = 48 }) => {
  if (!data || data.length < 2) return <div style={{ height }} className="w-full bg-gray-100 dark:bg-gray-800 rounded" />;

  const width = 280;
  const maxVal = Math.max(...data.map((d) => d.value), 100);
  const minVal = Math.min(...data.map((d) => d.value), 0);

  const points = data
    .map((dp, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((dp.value - minVal) / (maxVal - minVal || 1)) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-12 overflow-visible">
        <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
      </svg>
    </div>
  );
});

SparklineChart.displayName = 'SparklineChart';
export default SparklineChart;