import * as z from "zod";

export const transactionSchema = z.object({
    amount: z.coerce.number().positive('Сумма должна быть положительной'),
    timestamp: z.string().refine((val) => new Date(val).toString() !== 'Invalid Date'),
    categoryId: z.coerce.number().min(1, 'Выберите категорию'),
    action: z.enum(['INCOME', 'EXPENSE']),
    familyId: z.number().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;