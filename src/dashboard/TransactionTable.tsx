import type { Transaction } from "@/types/finance.ts";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { SkeletonTable } from "@/components/ui/SkeletonTable.tsx";
import { financeMetrics, formatCurrency } from "@/utils/finance.ts";
import { TrendingUpIcon, TrendingDown, Wallet } from 'lucide-react';

interface TransactionTableProps {
    transactions?: Transaction[];
    isPending?: boolean;
}

export const TransactionTable = ({ transactions, isPending }: TransactionTableProps) => {
    return (
        isPending ? <SkeletonTable /> :
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-zinc-100 w-[100px]'>Дата</TableHead>
                        <TableHead className='text-zinc-100 text-center'>Категория</TableHead>
                        <TableHead className='text-zinc-100 text-center'>Участник</TableHead>
                        <TableHead className="text-right text-zinc-100">Стоимость</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions?.map(transaction => (
                        <TableRow key={transaction.id} className={`text-white text-center ${transaction.action === 'INCOME' ? 'bg-emerald-600/30' : 'bg-rose-600/30'}`}>
                            <TableCell>{new Date(transaction.timestamp).toLocaleDateString('ru')}</TableCell>
                            <TableCell>{transaction.category.name}</TableCell>
                            <TableCell>{transaction.owner.name}</TableCell>
                            <TableCell className={`text-right`}>{formatCurrency(transaction.amount)}{transaction.action === 'INCOME' ? <TrendingUpIcon className="inline-block text-emerald-500 ml-1" /> : <TrendingDown className="inline-block text-rose-400 ml-1" />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter className='bg-transparent text-white'>
                    <TableRow>
                        <TableCell colSpan={3} className='text-left'>Всего</TableCell>
                        <TableCell className={`text-right font-bold ${financeMetrics(transactions).balance >= 0 ? 'text-emerald-400' : 'text-rose-600'}`}>{transactions ? formatCurrency(financeMetrics(transactions).balance) : 0}{<Wallet className="inline-block ml-1" />}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
    )
}