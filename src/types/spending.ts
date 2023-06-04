export interface ISpending {
  created_at: string;
  date: string;
  id: string;
  // TODO: remove this string
  price: number | string;
  user_id: string;
}

export interface ISpendingResponse {
  spendings: ISpending[];
}
