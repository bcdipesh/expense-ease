import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { type Transaction } from "@/app/transactions/_lib/types";
import { columns } from "@/app/transactions/_components/columns";
import { DataTable } from "@/app/transactions/_components/data-table";

export default async function TransactionPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!isUserAuthenticated) {
    redirect("/api/auth/login");
  }

  const resp = await fetch(
    `${process.env.EXPENSE_TRACKER_API_URL}/transactions/users/${user?.id}`,
  );
  const transactions = (await resp.json()) as Transaction[];

  return (
    <div>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
