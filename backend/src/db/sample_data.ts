import {pizzas, toppings, work_days} from "./schema";
import {PizzaDatabase} from "./index";

function getNextWorkDay(): { start_time: Date, end_time: Date } {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(17, 0, 0, 0);

    const end = new Date(tomorrow);
    end.setHours(21, 0, 0, 0);

    return { start_time: tomorrow, end_time: end };
}

export async function insertTestData(db: PizzaDatabase) {

    await db.transaction(async (trx) => {
        //insert a pizza to pizzas table
        await trx.insert(pizzas).values([
            {
                id: 'margherita',
                name: 'Margherita',
                price: 1399,
                description: 'Classic tomato and mozzarella',
                image_url: 'margherita.avif'
            }
        ]);
        await trx.insert(pizzas).values([
            {
                id: 'pepperoni',
                name: 'Pepperoni',
                price: 1499,
                description: 'Pepperoni pizza with tomato and mozzarella',
                image_url: 'pepperoni_pizza.avif'
            }
        ]);
        await trx.insert(pizzas).values([
            {
                id: 'hot_one',
                name: 'Hot One',
                price: 1499,
                description: 'Spicy pepperoni and salami with nduja and jalapeños',
                image_url: 'hot_one.avif'
            }
        ]);
        await trx.insert(pizzas).values([
            {
                id: 'vegetarian',
                name: 'Leaf lovers',
                price: 1499,
                description: 'Vegatarian pizza with ricotta, mushrooms, basil, and olives.',
                image_url: 'vegetarian.avif'
            }
        ]);


        //insert toppings
        await trx.insert(toppings).values([
            {
                id: 'cheese',
                name: 'Cheese',
                description: 'More cheese'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'vegan_cheese',
                name: 'Vegan Cheese',
                description: 'Vegan cheese'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'bacon',
                name: 'Bacon',
                description: 'Bacon'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'chorizo',
                name: 'Chorizo',
                description: 'Chorizo'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'jalapeno',
                name: 'Jalapeno',
                description: 'Jalapeno'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'mushrooms',
                name: 'Mushrooms',
                description: 'Mushrooms'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'onions',
                name: 'Onions',
                description: 'Onions'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'pepperoni',
                name: 'Pepperoni',
                description: 'Pepperoni'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'peppers',
                name: 'Peppers',
                description: 'Peppers'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'pineapple',
                name: 'Pineapple',
                description: 'Pineapple'
            }
        ]);
        await trx.insert(toppings).values([
            {
                id: 'sweetcorn',
                name: 'Sweetcorn',
                description: 'Sweetcorn'
            }
        ]);

        //insert a work day
        const workdayId = "test_workday_id";
        const { start_time, end_time } = getNextWorkDay();
        await trx.insert(work_days).values([
            {
                id: workdayId,
                start_time,
                end_time,
            }
        ]);
    });
}