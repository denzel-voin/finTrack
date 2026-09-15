import type {Transaction} from "@/types/finance.ts";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {SkeletonTable} from "@/components/ui/SkeletonTable.tsx";

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
                            <TableHead className='text-zinc-300'>дата</TableHead>
                            <TableHead className='text-zinc-300'>категория</TableHead>
                            <TableHead className='text-zinc-300'>участник</TableHead>
                            <TableHead className="text-right text-zinc-300">сумма</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions?.map(transaction => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.timestamp}</TableCell>
                                <TableCell>{transaction.category.name}</TableCell>
                                <TableCell>{transaction.owner.name}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Всего</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
    )
}