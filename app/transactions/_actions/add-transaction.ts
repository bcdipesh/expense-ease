"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { type Transaction } from "@/app/transactions/_lib/types";
import { revalidatePath } from "next/cache";

export async function addTransaction(
  values: Omit<Transaction, "id" | "createdAt" | "userId">,
) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/api/auth/login");
  }

  const user = await getUser();

  try {
    const resp = await fetch(
      `${process.env.EXPENSE_TRACKER_API_URL}/transactions`,
      {
        method: "POST",
        body: JSON.stringify({ ...values, userId: user?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const transaction = await resp.json();

    console.log(transaction);

    revalidatePath("/transactions");
  } catch (error) {
    console.error(error);
  }
}
