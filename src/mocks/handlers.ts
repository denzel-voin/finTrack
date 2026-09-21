import { http, HttpResponse } from 'msw';
import type { CreateTransactionDto, Transaction } from '../types/finance';

import { categories, currentUser, familyGroups, transactions } from './data';

export { categories, currentUser, familyGroups, transactions };

export const handlers = [
    http.get('/api/categories', () => HttpResponse.json(categories)),
    http.get('/api/transactions', () => HttpResponse.json(transactions)),
    http.post('/api/transactions', async ({ request }) => {
        const data = (await request.json()) as CreateTransactionDto;
        const category = categories.find(item => item.id === data.categoryId);
        const family = familyGroups.find(item => item.id === data.familyId);
        const newTransaction: Transaction = {
            id: Date.now(),
            category,
            owner: currentUser,
            family: family || null,
            action: data.action,
            amount: data.amount,
            timestamp: data.timestamp
        }
        transactions.unshift(newTransaction);
        return HttpResponse.json(newTransaction, { status: 201 });
    })
]