export interface PizzaDetails {
  id: string,
  name: string;
  price: string;
  description: string;
  image_url: string;
}

export interface ToppingDetails {
  id: string;
  name: string;
  description: string;
}

export interface CartItemDetails {
  pizzaId: string;
  customisations?: string[];
}

export interface ShoppingCart {
  [id: string]: CartItemDetails;
}