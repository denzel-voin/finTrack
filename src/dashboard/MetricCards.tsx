import { formatCurrency, type FinanceMetrics } from "@/utils/finance";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardsProps {
  metrics: FinanceMetrics;
  isPending?: boolean;
}

export const MetricCards = ({ metrics, isPending }: MetricCardsProps) => {

  return (
    <div className="grid md:grid-cols-3 gap-4 xs:grid-cols-1">
      {isPending ? <Skeleton className="h-22 w-20 rounded-xl" /> :
        <Card className="text-green-900">
          <CardTitle>Доходы</CardTitle>
          <CardContent>{formatCurrency(metrics.income)}</CardContent>
        </Card>}
      {isPending ? <Skeleton className="h-22 w-20 rounded-xl" /> :
        <Card className="text-red-900">
          <CardTitle>Расходы</CardTitle>
          <CardContent>{formatCurrency(metrics.expense)}</CardContent>
        </Card>}
      {isPending ? <Skeleton className="h-22 w-20 rounded-xl" /> :
        <Card>
          <CardTitle>Баланс</CardTitle>
          <CardContent>{formatCurrency(metrics.balance)}</CardContent>
        </Card>}
    </div>
  )
}