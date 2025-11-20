export const PIZZAS: Record<string, PizzaDetails> = {
  "margherita": {
    "name": "Margherita",
    "price": "14"
  },
  "spicy": {
    "name": "Spicy",
    "price": "15"
  }
};

export interface PizzaDetails {
  name: string;
  price: string;
}

export interface CartItemDetails {
  pizzaId: string;
  customisations?: string[];
}