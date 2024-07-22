import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { type Transaction } from "@/app/transactions/_lib/types";
import { columns } from "@/app/transactions/_components/columns";
import { DataTable } from "@/app/transactions/_components/data-table";
import { TransactionsOverview } from "@/app/transactions/_components/transactions-overview";

export default async function TransactionPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!isUserAuthenticated) {
    redirect("/api/auth/login");
  }

  const resp = await fetch(
    `${process.env.EXPENSE_EASE_API_URL}/transactions/users/${user?.id}`,
  );
  const transactions = (await resp.json()) as Transaction[];

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Your Transaction History
          </h1>
          <p className="mb-10 leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
            Track your income/expense with a complete view of your transactions.
          </p>
        </div>
        <TransactionsOverview transactions={transactions} />
      </div>
      <DataTable columns={columns} data={transactions} />
    </>
  );
}
