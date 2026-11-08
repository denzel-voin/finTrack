import { AlertCircleIcon, TrendingDown, TrendingUpIcon, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import type { Transaction } from "@/types/finance";
import { formatCurrency } from "@/utils/finance";
import { useDeleteTransaction } from "@/hooks/useTransactions";
import { Spinner } from "../ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

interface DeleteTransactionProps {
  transaction: Transaction;
}

export const DeleteTransaction = ({ transaction }: DeleteTransactionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    mutateAsync: deleteTransaction,
    isPending,
    isError,
    error,
    reset,
  } = useDeleteTransaction();

  const onDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (open) reset();
    setIsOpen(open);
  };

  useEffect(() => reset(), [reset]);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          <Button
            aria-label="Удалить транзакцию"
            className="text-rose-800 cursor-pointer md:max-w-1 max-w-0.5 bg-transparent"
          >
            <X />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[625px] bg-black">
        <DialogHeader>
          <DialogTitle>Уверены что хотите удалить транзакцию?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex justify-between">
          <span>
            {new Date(transaction.timestamp).toLocaleDateString("ru")}
          </span>
          <span>{transaction.category?.name}</span>
          <span>{transaction.owner.name}</span>
          <span>
            {formatCurrency(transaction.amount)}
            {transaction.action === "INCOME" ? (
              <TrendingUpIcon className="inline-block text-emerald-500 ml-1 mr-2" />
            ) : (
              <TrendingDown className="inline-block text-rose-400 ml-1 mr-2" />
            )}
          </span>
        </DialogDescription>
        {isError && (
          <Alert variant="destructive" className="bg-black">
            <AlertCircleIcon />
            <AlertTitle>Ошибка удаления</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <DialogFooter className="bg-black">
          <Button
            variant="destructive"
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => onDelete(transaction.id)}
          >
            {isPending ? <Spinner data-icon="inline-start" /> : "Да, удалить"}
          </Button>
          <Button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            Нет
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
