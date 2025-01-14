export interface Order {
  user_id: string;
  pizza_id: number;
}

export interface OrderDetails extends Order {
  id: number;
  created_at: Date;
  isLogged: boolean;
  logged_at: Date | null;
}

export interface LogPizza {
  order_id: number;
}

export type UserOrdersListResponse = {
  records: Omit<OrderDetails, 'user_id'>[];
};