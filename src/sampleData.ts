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