export interface Pizza {
	name: string;
	slug: string;
	description: string;
	price: number;
}

export interface PizzaDetails extends Pizza {
	id: number;
}