import { formatCurrency, type FinanceMetrics } from "@/utils/finance";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {TrendingUpIcon, TrendingDown, Wallet} from 'lucide-react';

interface MetricCardsProps {
  metrics: FinanceMetrics;
  isPending?: boolean;
}

export const MetricCards = ({ metrics, isPending }: MetricCardsProps) => {

  return (
    <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
      {isPending ? <Skeleton className="rounded-xl" /> :
        <Card>
          <CardHeader><CardTitle className="text-muted-foreground flex justify-center gap-1">Доходы <TrendingUpIcon className="text-emerald-500" /></CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold text-emerald-600">{formatCurrency(metrics.income)}</CardContent>
        </Card>}
      {isPending ? <Skeleton className="rounded-xl" /> :
        <Card>
          <CardHeader><CardTitle className="text-muted-foreground flex justify-center gap-1">Расходы <TrendingDown className="text-rose-400" /></CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold text-rose-600">{formatCurrency(metrics.expense)}</CardContent>
        </Card>}
      {isPending ? <Skeleton className="rounded-xl" /> :
        <Card>
          <CardHeader><CardTitle className="text-muted-foreground flex justify-center gap-1">Баланс <Wallet /></CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold text-mauve-600">{formatCurrency(metrics.balance)}</CardContent>
        </Card>}
    </div>
  )
}