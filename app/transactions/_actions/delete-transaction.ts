"use server";

import { revalidatePath } from "next/cache";

export async function deleteTransaction(id: string) {
  try {
    await fetch(`${process.env.EXPENSE_EASE_API_URL}/transactions/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/transactions");
}
