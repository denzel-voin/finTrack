import { MetricCards } from './dashboard/MetricCards';
import { useTransactions } from './hooks/useTransactions';
import { financeMetrics } from './utils/finance';
import {TransactionTable} from "@/dashboard/TransactionTable.tsx";

export function App() {
  const { data: transactions, isPending, error } = useTransactions();

  const metrics = financeMetrics(transactions || []);
  console.log('Состояние запроса:', { isPending, transactionsCount: transactions?.length, transactions });

  return (
    <main className="p-6 space-y-4">
      <MetricCards metrics={metrics} isPending={isPending} />
      <TransactionTable transactions={transactions} />
    </main>
  );
}

export default App;