import type { Transaction } from "@/types/finance"

export interface FinanceMetrics { income: number, expense: number, balance: number };

export const financeMetrics = (transactions: Transaction[]): FinanceMetrics => {
    const metrics: FinanceMetrics = (transactions ?? []).reduce((acc, transaction) => {
        if (transaction.action === 'INCOME') acc.income += transaction.amount;
        else acc.expense += transaction.amount;
        return acc;
    }, { income: 0, expense: 0, balance: 0 })
    metrics.balance = metrics.income - metrics.expense;

    return metrics;
}

export const formatCurrency = (value: number) => {
    const isFractional = value % 1 !== 0;
    return value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: isFractional ? 2 : 0 });
} 