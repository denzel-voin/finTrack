import { CreateTransactionDialog } from "./components/dashboard/CreateTransactionDialog";
import { MetricCards } from "./components/dashboard/MetricCards";
import { SkeletonTable } from "./components/ui/SkeletonTable";
import { useTransactions } from "./hooks/useTransactions";
import { TransactionTable } from "@/components/dashboard/TransactionTable";

export function App() {
  const { data: transactions, isPending, error } = useTransactions();

  return (
    <main className="p-6 space-y-4">
      {transactions ? (
        <MetricCards transactions={transactions} isPending={isPending} />
      ) : (
        error && <h2>Ошибка загрузки: {error.message}</h2>
      )}
      {isPending ? (
        <SkeletonTable />
      ) : transactions ? (
        <TransactionTable transactions={transactions} />
      ) : (
        error && <h2>Ошибка загрузки: {error.message}</h2>
      )}
      <CreateTransactionDialog />
      {error && <h2>Ошибка загрузки: {error.message}</h2>}
    </main>
  );
}

export default App;
