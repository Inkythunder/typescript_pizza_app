export interface PizzaDetails {
  name: string;
  price: string;
}

export interface CartItemDetails {
  pizzaId: string;
  customisations?: string[];
}

export interface ShoppingCart {
  [id: string]: CartItemDetails;
}