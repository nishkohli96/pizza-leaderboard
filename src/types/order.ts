export interface Order {
  user_id: string;
  pizza_id: number;
}

export interface OrderDetails extends Order {
  id: number;
  created_at: Date | string;
  isLogged: boolean;
  logged_at: Date | string | null;
}

export interface LogPizza {
  order_id: number;
}

export type UserOrderDetails = Omit<OrderDetails, 'user_id'>;

export type UserOrdersListResponse = {
  records: UserOrderDetails[];
};