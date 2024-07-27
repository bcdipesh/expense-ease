import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { type Metadata } from "next";

import { type Transaction } from "@/app/transactions/_lib/types";
import { UpdateTransactionForm } from "@/app/transactions/[id]/_components/update-transaction-form";
import { getTransactionById } from "@/app/transactions/_actions/get-transaction";

export const metadata: Metadata = {
  title: "Transaction Detail",
};

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

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Update Transaction Details
      </h1>
      <p className="mb-10 leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
        Update the details of your income/expense for accurate tracking.
      </p>
      <UpdateTransactionForm transaction={transaction} />
    </>
  );
}
