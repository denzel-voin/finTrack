import type { CreateTransactionDto, Transaction } from "../types/finance";

function isTransaction(data: unknown): data is Transaction[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        typeof item.id === "number" &&
        "timestamp" in item &&
        typeof item.timestamp === "string" &&
        "amount" in item &&
        typeof item.amount === "number" &&
        "action" in item &&
        "owner" in item &&
        "family" in item,
    )
  );
}

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch("/api/transactions");

  if (!res.ok) {
    throw new Error(`Ошибка загрузки транзакции: ${res.statusText}`);
  }

  const data = await res.json();

  if (!isTransaction(data)) return [];

  return data;
}

export async function createTransaction(
  dto: CreateTransactionDto,
): Promise<Transaction> {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    throw new Error(`Ошибка отправки транзакции: ${res.statusText}`);
  }

  return res.json();
}
