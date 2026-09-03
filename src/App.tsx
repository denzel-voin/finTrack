import { useTransactions, useCreateTransaction } from './hooks/useTransactions';

export function App() {
  const { data: transactions, isPending, error } = useTransactions();
  const { mutate: addTransaction, isPending: isCreating } = useCreateTransaction();

  if (isPending) return <div className="p-6">Загрузка данных...</div>;
  if (error) return <div className="p-6 text-red-500">Ошибка: {error.message}</div>;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Транзакции</h1>
        <button
          disabled={isCreating}
          onClick={() =>
            addTransaction({
              amount: 2500,
              action: 'EXPENSE',
              categoryId: 1,
              timestamp: new Date().toISOString(),
            })
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isCreating ? 'Добавление...' : '+ Тестовый расход'}
        </button>
      </div>

      <ul className="space-y-2">
        {transactions?.map((item) => (
          <li key={item.id} className="p-3 border rounded flex justify-between">
            <span>{item.category.name} ({item.owner.name})</span>
            <span className={item.action === 'INCOME' ? 'text-green-600' : 'text-red-600'}>
              {item.action === 'INCOME' ? '+' : '-'}{item.amount} ₽
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;