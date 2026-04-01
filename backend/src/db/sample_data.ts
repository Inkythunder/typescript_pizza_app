import {pizzas, toppings} from "./schema";
import {PizzaDatabase} from "./index";

export async function insertTestData(db: PizzaDatabase) {

    await db.transaction(async (trx) => {
        //insert a pizza to pizzas table
        const pizzaId1 = "test_pizza_id";
        await trx.insert(pizzas).values([
            {
                id: pizzaId1,
                name: 'Test Margherita',
                price: 1499,
                description: 'Classic tomato and mozzarella',
                image_url: 'https://example.com/margherita.jpg'
            }
        ]);

        //insert topping
        const toppingId = "test_topping_id";
        await trx.insert(toppings).values([
            {
                id: toppingId,
                name: 'Cheese',
                description: 'More cheese'
            }
        ]);
    });
}