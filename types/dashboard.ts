export interface DataPoint {
  id: string;
  timestamp: string;
  value: number;
}

export interface TransactionItem {
  id: string;
  user: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
}

export interface ServerMetric {
  id: string;
  serverName: string;
  cpuUsage: number;
  memoryUsage: number;
  status: 'healthy' | 'warning' | 'critical';
}

export interface WidgetConfig {
  refreshIntervalMs: number;
  maxDataPoints: number;
  accentColor: string;
}