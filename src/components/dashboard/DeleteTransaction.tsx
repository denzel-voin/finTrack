import { TrendingDown, TrendingUpIcon, X } from "lucide-react";
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
import { useState } from "react";
import type { Transaction } from "@/types/finance";
import { formatCurrency } from "@/utils/finance";

interface DeleteTransactionProps {
  transaction: Transaction;
}

export const DeleteTransaction = ({ transaction }: DeleteTransactionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button className="text-rose-800 cursor-pointer md:max-w-1 max-w-0.5 bg-transparent">
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
        <DialogFooter className="bg-black">
          <Button
            className="text-rose-600 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Да, удалить
          </Button>
          <Button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            Нет
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
