import { describe, it, expect } from "@jest/globals";
import type { Transaction } from "@/types/finance";
import { financeMetrics, formatCurrency } from "./finance";
import { transactions } from "@/mocks/data";

describe('financeMetrics', () => {
    it('Возвращает 0 при отсутствии транзакций', () => {
        const transactions: Transaction[] = [];
        expect(financeMetrics(transactions)).toEqual({ income: 0, expense: 0, balance: 0 });
    });
    it('Возвращает 0 при null', () => {
        const transactions = null as unknown as Transaction[];
        expect(financeMetrics(transactions)).toEqual({ income: 0, expense: 0, balance: 0 });
    });
    it('Возвращает 0 при undefined', () => {
        const transactions = undefined as unknown as Transaction[];
        expect(financeMetrics(transactions)).toEqual({ income: 0, expense: 0, balance: 0 });
    });
    it('Считает доходы и расходы', () => {
        expect(financeMetrics(transactions)).toEqual({ income: 1500, expense: 1400, balance: 100 });
    });
});

describe('formatCurrency', () => {
    it('Рублёвый вид строки', () => {
        expect(formatCurrency(1000).replace(/\s/g, ' ')).toBe('1 000 ₽');
    })
    it('Отрицательные числа', () => {
        expect(formatCurrency(-1000).replace(/\s/g, ' ')).toBe('-1 000 ₽');
    })
    it('Ноль', () => {
        expect(formatCurrency(0).replace(/\s/g, ' ')).toBe('0 ₽');
    })
    it('С копейками', () => {
        expect(formatCurrency(1000.56).replace(/\s/g, ' ')).toBe('1 000,56 ₽');
    })
})