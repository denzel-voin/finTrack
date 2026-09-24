import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { TransactionForm } from "./TransactionForm";

export const CreateTransactionDialog = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger render={
                <Button className="w-full max-w-48 justify-self-end">
                    Добавить транзакцию
                </Button>
            } />
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Добавить транзакцию</DialogTitle>
                    <DialogDescription>
                        Введите данные транзакции
                    </DialogDescription>
                </DialogHeader>
                <TransactionForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}