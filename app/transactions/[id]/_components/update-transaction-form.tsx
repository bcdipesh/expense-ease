"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type Transaction } from "@/app/transactions/_lib/types";
import { updateTransaction } from "@/app/transactions/_actions/update-transaction";

const formSchema = z.object({
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  }),
  amount: z.coerce.number(),
});

interface UpdateTransactionFormProps {
  transaction: Transaction;
}

export function UpdateTransactionForm({
  transaction,
}: UpdateTransactionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: transaction.description,
      amount: transaction.amount,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.promise(
      updateTransaction({
        ...values,
        id: transaction.id,
        userId: transaction.userId,
        createdAt: transaction.createdAt,
      }),
      {
        loading: "Updating transaction...",
        success: "Transaction updated successfully",
        error: "There was an error updating transaction",
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Expense description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Enter -ve for expense, +ve for income
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Transaction</Button>
      </form>
    </Form>
  );
}
