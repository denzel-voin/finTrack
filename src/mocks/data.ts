import type { Category, Transaction, UserPublic, FamilyGroup } from '@/types/finance';

export const categories: Category[] = [
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
];
