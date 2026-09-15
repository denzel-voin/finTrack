import type {Transaction} from "@/types/finance.ts";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {SkeletonTable} from "@/components/ui/SkeletonTable.tsx";
import {financeMetrics} from "@/utils/finance.ts";

interface TransactionTableProps {
    transactions?: Transaction[];
    isPending?: boolean;
}

export const TransactionTable = ({transactions, isPending}: TransactionTableProps) => {
    return (
            isPending ? <SkeletonTable/> :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-zinc-300 w-[100px]'>Дата</TableHead>
                            <TableHead className='text-zinc-300 text-center'>Категория</TableHead>
                            <TableHead className='text-zinc-300 text-center'>Участник</TableHead>
                            <TableHead className="text-right text-zinc-300">Стоимость</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions?.map(transaction => (
                            <TableRow key={transaction.id}>
                                <TableCell>{new Date(transaction.timestamp).toLocaleDateString('ru')}</TableCell>
                                <TableCell>{transaction.category.name}</TableCell>
                                <TableCell>{transaction.owner.name}</TableCell>
                                <TableCell  className="text-right">{transaction.amount.toLocaleString('ru')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className='bg-transparent'>
                        <TableRow>
                            <TableCell colSpan={3} className='text-left'>Всего</TableCell>
                            <TableCell className="text-right">{transactions ? financeMetrics(transactions).balance.toLocaleString('ru') : 0 }</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
    )
}