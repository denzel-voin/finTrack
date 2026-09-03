import type { CreateTransactionDto, Transaction } from '../types/finance';

export async function getTransactions(): Promise<Transaction[]> {
    const res = await fetch('/api/transactions');

    if (!res.ok) {
        throw new Error(`Ошибка загрузки транзакции: ${res.statusText}`);
    }

    return res.json();
}

export async function createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
    const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
    });

    if (!res.ok) {
        throw new Error(`Ошибка отправки транзакции: ${res.statusText}`);
    }

    return res.json();
}