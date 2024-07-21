import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { type Transaction } from "@/app/transactions/_lib/types";
import { UpdateTransactionForm } from "@/app/transactions/[id]/_components/update-transaction-form";
import { getTransactionById } from "@/app/transactions/_actions/get-transaction";

export default async function TransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const id = params.id;

  if (!isUserAuthenticated) {
    redirect("/api/auth/login");
  }

  const transaction = (await getTransactionById(id)) as Transaction;

  return <UpdateTransactionForm transaction={transaction} />;
}
