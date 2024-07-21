"use server";

import { revalidatePath } from "next/cache";

export async function deleteTransaction(id: string) {
  await fetch(`${process.env.EXPENSE_TRACKER_API_URL}/transactions/${id}`, {
    method: "DELETE",
  });

  revalidatePath("/transactions");
}
