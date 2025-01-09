export interface Order {
  user_id: string;
  pizza_id: number;
}

export interface OrderDetails extends Order {
  id: number;
  isLogged: boolean;
  created_at: Date;
}
