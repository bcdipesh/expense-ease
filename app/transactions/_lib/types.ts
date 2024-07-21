export interface Transaction {
  id: string;
  description: string;
  amount: number;
  userId: string;
  createdAt: Date;
}
