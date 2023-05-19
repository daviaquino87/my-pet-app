export interface ISpending {
  created_at: string;
  date: string;
  id: string;
  price: number;
  user_id: string;
}

export interface ISpendingResponse {
  spendings: ISpending[];
}
