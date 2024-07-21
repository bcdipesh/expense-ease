"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { type Transaction } from "@/app/transactions/_lib/types";
import { revalidatePath } from "next/cache";

export async function updateTransaction(values: Transaction) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (!isUserAuthenticated || values.userId !== user?.id) {
    redirect("/api/auth/login");
  }

  try {
    await fetch(`${process.env.EXPENSE_EASE_API_URL}/transactions`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/transactions");
  redirect("/transactions");
}
