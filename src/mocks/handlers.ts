import { http, HttpResponse } from 'msw';
import type { Category, CreateTransactionDto, Transaction } from '../types/finance';

const categories: Category[] = [
    {
        id: 1,
        name: "Еда"
    },
    {
        id: 2,
        name: "Одежда",
    },
    {
        id: 3,
        name: "Подписки"
    },
    {
        id: 4,
        name: "Барбер"
    },
    {
        id: 5,
        name: "Зарплата"
    }
];

const currentUser = {
    id: 1,
    name: "Денис",
    email: "yammilton@exemple.com",
    avatar: "/public/image1.png"
};

const familyGroups = [
    {
        id: 1,
        name: "Семейный бюджет",
        members: [
            currentUser,
            {
                id: 2,
                name: "Настя",
                email: "yammilton@exemple.com",
                avatar: "/public/image2.png"
            }
        ]
    }
]

const transactions: Transaction[] = [
    {
        id: 1,
        timestamp: new Date().toISOString(),
        amount: 1500,
        action: 'EXPENSE',
        category: {
            id: 4,
            name: "Барбер"
        },
        owner: currentUser,
        family: {
            id: 1,
            name: "Семейный бюджет",
            members: [
                currentUser,
                {
                    id: 2,
                    name: "Настя",
                    email: "yammilton@exemple.com",
                    avatar: "/image2.png"
                }
            ]
        }
    },
    {
        id: 2,
        timestamp: new Date().toISOString(),
        amount: 1500,
        action: 'INCOME',
        category: {
            id: 5,
            name: "Зарплата"
        },
        owner: {
            id: 2,
            name: "Настя",
            email: "yammilton@exemple.com",
            avatar: "/image2.png"
        },
        family: {
            id: 1,
            name: "Семейный бюджет",
            members: [
                currentUser,
                {
                    id: 2,
                    name: "Настя",
                    email: "yammilton@exemple.com",
                    avatar: "/public/image2.png"
                }
            ]
        }
    }
]

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