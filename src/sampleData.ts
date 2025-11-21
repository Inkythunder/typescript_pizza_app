import {PizzaDetails} from "./types.ts";

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

export const TOPPINGS: string[] = ["Cheese", "Vegan Cheese", "Bacon", "Chorizo", "Jalapeno", "Mushrooms", "Onions", "Pepperoni", "Peppers", "Pineapple", "Sweetcorn"];