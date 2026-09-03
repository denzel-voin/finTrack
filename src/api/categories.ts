import type { Category } from '../types/finance';

export async function getCategories(): Promise<Category[]> {
    const res = await fetch('/api/categories');

    if (!res.ok) {
        throw new Error(`Ошибка загрузки категорий: ${res.statusText}`);
    }

    return res.json();
}