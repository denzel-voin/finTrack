import { CreateTransactionDialog } from "./components/dashboard/CreateTransactionDialog";
import { MetricCards } from "./components/dashboard/MetricCards";
import { SkeletonTable } from "./components/ui/SkeletonTable";
import { useTransactions } from "./hooks/useTransactions";
import { financeMetrics } from "./utils/finance";
import { TransactionTable } from "@/components/dashboard/TransactionTable";

export function App() {
  const { data: transactions, isPending, error } = useTransactions();

  const metrics = financeMetrics(transactions || []);

  return (
    <main className="p-6 space-y-4">
      <MetricCards metrics={metrics} isPending={isPending} />
      {transactions ? (
        <TransactionTable transactions={transactions} error={error} />
      ) : (
        <SkeletonTable />
      )}
      <CreateTransactionDialog />
      {error && <h2>Ошибка загрузки: {error.message}</h2>}
    </main>
  );
}

export default App;
