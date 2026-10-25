import { CreateTransactionDialog } from "./components/dashboard/CreateTransactionDialog";
import { MetricCards } from "./components/dashboard/MetricCards";
import { SkeletonCards } from "./components/ui/SkeletonCards";
import { SkeletonTable } from "./components/ui/SkeletonTable";
import { useTransactions } from "./hooks/useTransactions";
import { TransactionTable } from "@/components/dashboard/TransactionTable";

export function App() {
  const { data: transactions, isPending, error } = useTransactions();

  return (
    <main className="p-6 space-y-4">
      {isPending && (
        <>
          <SkeletonCards />
          <SkeletonTable />
        </>
      )}
      {error && <h2>Ошибка загрузки: {error.message}</h2>}
      {transactions && (
        <>
          <MetricCards transactions={transactions} />
          <TransactionTable transactions={transactions} />
        </>
      )}
      <CreateTransactionDialog />
    </main>
  );
}

export default App;
