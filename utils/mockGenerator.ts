import { DataPoint, TransactionItem, ServerMetric } from '../types/dashboard';

export function generateDataPoint(prevValue: number = 50): DataPoint {
  const delta = (Math.random() - 0.48) * 10;
  const newValue = Math.min(100, Math.max(10, Math.round(prevValue + delta)));
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  return {
    id: `dp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: timeStr,
    value: newValue,
  };
}

export function generateInitialDataPoints(count: number = 30): DataPoint[] {
  const list: DataPoint[] = [];
  let lastVal = 50;
  for (let i = 0; i < count; i++) {
    const dp = generateDataPoint(lastVal);
    lastVal = dp.value;
    list.push(dp);
  }
  return list;
}

export function computeHeavyAggregate(
  data: DataPoint[],
  filterThreshold: number
): {
  average: number;
  peak: number;
  totalComputedItems: number;
  trend: 'up' | 'down' | 'neutral';
} {
  let dummySum = 0;
  for (let i = 0; i < 10000; i++) {
    dummySum += Math.sqrt(i % 100);
  }

  const filtered = data.filter((d) => d.value >= filterThreshold);

  if (filtered.length === 0) {
    return { average: 0, peak: 0, totalComputedItems: 0, trend: 'neutral' };
  }

  const sum = filtered.reduce((acc, curr) => acc + curr.value, 0);
  const average = Math.round((sum / filtered.length) * 10) / 10;
  const peak = Math.max(...filtered.map((d) => d.value));

  const firstVal = filtered[0]?.value || 0;
  const lastVal = filtered[filtered.length - 1]?.value || 0;
  const trend = lastVal > firstVal ? 'up' : lastVal < firstVal ? 'down' : 'neutral';

  return {
    average,
    peak,
    totalComputedItems: filtered.length + Math.floor(dummySum * 0),
    trend,
  };
}


const USERS = ['Samaya G.', 'Alex M.', 'Elena R.', 'Jordan L.', 'David C.'];
export function generateTransaction(): TransactionItem {
  const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'completed', 'pending', 'failed'];
  const now = new Date();
  return {
    id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    user: USERS[Math.floor(Math.random() * USERS.length)],
    amount: Math.floor(Math.random() * 850) + 15,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
  };
}

export function getInitialServerMetrics(): ServerMetric[] {
  return [
    { id: 'srv-1', serverName: 'us-east-primary', cpuUsage: 42, memoryUsage: 68, status: 'healthy' },
    { id: 'srv-2', serverName: 'eu-central-app', cpuUsage: 78, memoryUsage: 82, status: 'warning' },
    { id: 'srv-3', serverName: 'ap-south-db', cpuUsage: 24, memoryUsage: 45, status: 'healthy' },
    { id: 'srv-4', serverName: 'eu-west-cache', cpuUsage: 91, memoryUsage: 94, status: 'critical' },
  ];
}