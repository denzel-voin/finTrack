import type { Transaction } from "@/types/finance.ts";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { SkeletonTable } from "@/components/ui/SkeletonTable.tsx";
import { financeMetrics, formatCurrency } from "@/utils/finance.ts";
import { TrendingUpIcon, TrendingDown } from 'lucide-react';

interface TransactionTableProps {
    transactions?: Transaction[];
    isPending?: boolean;
}

export const TransactionTable = ({ transactions, isPending }: TransactionTableProps) => {
    const totalAmount = transactions ? financeMetrics(transactions).balance : 0;
    const isPositive = totalAmount >= 0;
    return (
        isPending ? <SkeletonTable /> :
            <Table>
                <TableHeader>
                    <TableRow className='hover:bg-muted/20'>
                        <TableHead className='text-muted-foreground'>Дата</TableHead>
                        <TableHead className='text-left text-muted-foreground'>Категория</TableHead>
                        <TableHead className='text-left text-muted-foreground'>Участник</TableHead>
                        <TableHead className="text-right text-muted-foreground">Стоимость</TableHead>
                    </TableRow>
                </TableHeader>
                {transactions ? (
                    <TableBody>
                        {transactions?.map(transaction => (
                            <TableRow key={transaction.id} className='text-left hover:bg-muted/20'>
                                <TableCell>{new Date(transaction.timestamp).toLocaleDateString('ru')}</TableCell>
                                <TableCell>{transaction.category?.name}</TableCell>
                                <TableCell>{transaction.owner.name}</TableCell>
                                <TableCell className='text-right'>{transaction.action === 'INCOME' ? <TrendingUpIcon className="inline-block text-emerald-500 ml-1 mr-2" /> : <TrendingDown className="inline-block text-rose-400 ml-1 mr-2" />}{formatCurrency(transaction.amount)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) :
                    <p>Операций пока не было</p>
                }
                <TableFooter className='bg-transparent'>
                    <TableRow className='hover:bg-muted/20'>
                        <TableCell colSpan={3} className='text-left'>Всего</TableCell>
                        <TableCell className={`text-right text-xl font-bold ${isPositive? 'text-emerald-400' : 'text-rose-600'}`}>{formatCurrency(totalAmount)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
    )
}