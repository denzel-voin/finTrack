import { MetricCards } from './dashboard/MetricCards';
import { useTransactions, useCreateTransaction } from './hooks/useTransactions';
import { financeMetrics } from './utils/finance';

export function App() {
  const { data: transactions, isPending, error } = useTransactions();
  // const { mutate: addTransaction, isPending: isCreating } = useCreateTransaction();

  const metrics = financeMetrics(transactions);
  console.log(transactions);


  return (
    <main className="p-6 space-y-4">
      <MetricCards metrics={metrics} isPending={isPending} />
    </main>
  );
}

export default App;