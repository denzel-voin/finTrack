import type { Category, Transaction, UserPublic, FamilyGroup } from '@/types/finance';

export const categories: Category[] = [
    {
        id: 1,
        name: "Еда",
        action: "EXPENSE"
    },
    {
        id: 2,
        name: "Одежда",
        action: "EXPENSE"
    },
    {
        id: 3,
        name: "Подписки",
        action: "EXPENSE"
    },
    {
        id: 4,
        name: "Барбер",
        action: "EXPENSE"
    },
    {
        id: 5,
        name: "Зарплата",
        action: "INCOME"
    },
    {
        id: 6,
        name: "Кэшбек",
        action: "INCOME"
    }
];

export const currentUser: UserPublic = {
    id: 1,
    name: "Денис",
    email: "yammilton@exemple.com",
    avatar: "/public/image1.png"
};

export const familyGroups: FamilyGroup[] = [
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
];

export const transactions: Transaction[] = [
    {
        id: 1,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        amount: 1400,
        action: 'EXPENSE',
        category: {
            id: 4,
            name: "Барбер",
            action: "EXPENSE"
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
            name: "Зарплата",
            action: "INCOME"
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
];
