export interface Pizza {
	name: string;
	description: string;
	price: number;
}

export interface PizzaDetails extends Pizza {
	id: number;
}