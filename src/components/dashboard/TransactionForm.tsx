import type { TransactionFormData } from "../schemas/transaction";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "../schemas/transaction";
import { Field } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs } from "../ui/tabs";

interface TransactionFormProps {
    onSubmit: (data: TransactionFormData) => void;
}

export const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            amount: 0,
            timestamp: new Date().toISOString().slice(0, 16),
            action: 'EXPENSE',
            categoryId: 1
        },
    });
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field>
                <Label htmlFor="amount">Сумма</Label>
                <Input {...register('amount')} id="amount" step={0.01} type="number" />
                {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
            </Field>
            <Field>
                <Label htmlFor="timestamp">Дата</Label>
                <Input {...register('timestamp')} id="timestamp" type="datetime-local" />
                {errors.timestamp && <p className="text-sm text-destructive">{errors.timestamp.message}</p>}
            </Field>
            <Field>
                <Label htmlFor="action">Тип</Label>
                <Tabs></Tabs>
            </Field>
        </form>
    )
}