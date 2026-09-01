export type Action = 'INCOME' | 'EXPENSE';

export interface Category {
    id: number;
    name: string;
}

export interface Account {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export type UserPublic = Omit<Account, 'password'>;

export interface FamilyGroup {
    id: number;
    name: string;
    members: UserPublic[];
}

export interface Transaction {
    id: number;
    timestamp: string;
    amount: number;
    action: Action;
    category: Category;
    owner: UserPublic;
    family: FamilyGroup | null;
}

export interface CreateTransactionDto {
    amount: number;
    timestamp: string;
    action: Action;
    categoryId: number;
    familyId?: number;
}