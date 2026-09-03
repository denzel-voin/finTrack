import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTransaction, getTransactions } from '../api/transactions';
import type { CreateTransactionDto } from '../types/finance';

export function useTransactions() {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions,
    });
}

export function useCreateTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateTransactionDto) => createTransaction(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
}
