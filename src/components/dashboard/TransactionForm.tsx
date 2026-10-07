import type { TransactionFormData } from "../schemas/transaction";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "../schemas/transaction";
import { Field } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TrendingUpIcon, TrendingDown } from 'lucide-react';
import { Button } from "../ui/button";
import { useCategories } from "@/hooks/useCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCreateTransaction } from "@/hooks/useTransactions";

interface TransactionFormProps {
    onSuccess: () => void;
}

export const TransactionForm = ({ onSuccess }: TransactionFormProps) => {
    const { data: categories = [] } = useCategories();
    const categorieItems = categories.map(c => ({ value: String(c.id), label: c.name, action: c.action }));
    const { mutateAsync: createTransaction, isPending } = useCreateTransaction();

    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            amount: 0,
            timestamp: new Date().toISOString().slice(0, 16),
            action: 'EXPENSE',
            categoryId: 1
        },
    });

    const currentAction = watch('action');
    const selectedCategoryId = watch('categoryId');
    const filteredCategories = categorieItems.filter(category => category.action === currentAction);
    const isSelectedPresent = filteredCategories.some(c => c.value === String(selectedCategoryId));
    const currentValue = isSelectedPresent ? String(selectedCategoryId) : null;

    const onSubmit = async (data: TransactionFormData) => {
        try {
            await createTransaction(data);
            reset();
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field>
                <Label htmlFor="amount">Сумма</Label>
                <Input {...register('amount')} id="amount" type="number" />
                {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
            </Field>
            <Field>
                <Label htmlFor="timestamp">Дата</Label>
                <Input {...register('timestamp')} id="timestamp" type="datetime-local" />
                {errors.timestamp && <p className="text-sm text-destructive">{errors.timestamp.message}</p>}
            </Field>
            <Field>
                <Label htmlFor="action">Тип</Label>
                <Tabs
                    defaultValue="EXPENSE"
                    onValueChange={(value) => {
                        const nextAction = value as 'INCOME' | 'EXPENSE';
                        setValue('action', nextAction);

                        const firstValidCategory = categorieItems.find(c => c.action === nextAction);
                        if (firstValidCategory) {
                            setValue('categoryId', Number(firstValidCategory.value));
                        }
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="INCOME">
                            <TrendingUpIcon />
                            Доход
                        </TabsTrigger>
                        <TabsTrigger value="EXPENSE">
                            <TrendingDown />
                            Расход
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </Field>
            <Field>
                <Select
                    items={filteredCategories}
                    value={currentValue}
                    onValueChange={(val) => {
                        if (val !== null) {
                            setValue('categoryId', Number(val), { shouldValidate: true });
                        }
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                        {filteredCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId.message}</p>}
            </Field>
            <Button type="submit" disabled={isPending}>{isPending ? 'Отправка...' : 'Добавить'}</Button>
        </form>
    )
}