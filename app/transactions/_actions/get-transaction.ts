"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { type Transaction } from "@/app/transactions/_lib/types";

export async function getTransactionById(id: string) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!isUserAuthenticated) {
    redirect("/api/auth/login");
  }

  try {
    const resp = await fetch(
      `${process.env.EXPENSE_EASE_API_URL}/transactions/${id}`,
    );
    const transaction = (await resp.json()) as Transaction;

    if (transaction.userId !== user?.id) {
      redirect("/api/auth/login");
    }

    return transaction;
  } catch (error) {
    console.error(error);
  }
}
