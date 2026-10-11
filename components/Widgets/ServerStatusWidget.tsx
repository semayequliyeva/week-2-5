'use client';

import React, { useRef } from 'react';
import { ServerMetric } from '../../types/dashboard';

interface ServerStatusWidgetProps {
  servers: ServerMetric[];
  onPingAll: () => void;
}

const ServerStatusWidget: React.FC<ServerStatusWidgetProps> = React.memo(({ servers, onPingAll }) => {
  const renderCountRef = useRef(1);
  renderCountRef.current++;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-gray-800 dark:text-gray-100">Server Health Nodes</h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
          Renders: {renderCountRef.current}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {servers.map((srv) => (
          <div key={srv.id} className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300 truncate max-w-[90px]">{srv.serverName}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  srv.status === 'healthy' ? 'bg-emerald-500' : srv.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                }`}
              />
            </div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>CPU:</span>
                <span className="font-mono font-semibold">{srv.cpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
                <div
                  className={`h-full ${srv.cpuUsage > 85 ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ width: `${srv.cpuUsage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onPingAll}
        className="w-full py-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
      >
        Ping All Clusters
      </button>
    </div>
  );
});

ServerStatusWidget.displayName = 'ServerStatusWidget';
export default ServerStatusWidget;