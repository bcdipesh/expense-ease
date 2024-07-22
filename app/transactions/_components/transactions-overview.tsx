import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Transaction } from "@/app/transactions/_lib/types";

interface TransactionsOverviewProps {
  transactions: Transaction[];
}

export function TransactionsOverview({
  transactions,
}: TransactionsOverviewProps) {
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const totalIncome = transactions
    .filter((transaction) => transaction.amount >= 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const netBalance = totalIncome + totalExpense;

  return (
    <div className="flex space-x-4">
      <Card className="transition-colors hover:bg-secondary">
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
          <CardDescription>The total amount earned up to now.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {numberFormat.format(totalIncome)}
          </p>
        </CardContent>
      </Card>
      <Card className="transition-colors hover:bg-secondary">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>The total amount spent up to now.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {numberFormat.format(totalExpense)}
          </p>
        </CardContent>
      </Card>
      <Card className="transition-colors hover:bg-secondary">
        <CardHeader>
          <CardTitle>Net Balance</CardTitle>
          <CardDescription>Your current remaining balance.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {numberFormat.format(netBalance)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
