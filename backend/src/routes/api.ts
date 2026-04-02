import {Router} from 'express';
import {pizzas, toppings, orders, order_items, work_days} from '../db/schema';
import {v4 as uuidv4} from 'uuid';
import {PizzaDatabase} from "../db";
import {gt} from "drizzle-orm";

function associateById<E extends { id: string }>(arr: E[]) {
  let result: Record<string, E> = {};
  for (const element of arr) {
    result[element.id] = element;
  }
  return result;
}

export function createApiRoutes(db: PizzaDatabase): Router {

  const router = Router();

//get all pizzas and toppings
  router.get('/pizzas', async (req, res) => {
    try {
      const allPizzas = await db.select().from(pizzas);
      const allToppings = await db.select().from(toppings);
      res.json({
        allPizzas: associateById(allPizzas),
        allToppings: associateById(allToppings),
      });
    } catch (error) {
      console.error('Error getting pizzas', error);
      res.status(500).send('Error getting pizzas');
    }
  })

//place an order
  router.post('/place_order', async (req, res) => {

    //insert into order
    //then into order items as well in a for loop

    try {
      const id = uuidv4();

      //order for the order table
      const newOrder = await db.insert(orders).values({
        id: id,
        total_price: req.body.total_price,
        customer_name: req.body.customer_name,
        email: req.body.email,
        phone: req.body.phone,
        timeslot: new Date(req.body.timeslot)
      })
        .returning();

      //order items for the order items table
      for (const item of req.body.order_items) {
        const order_item = await db.insert(order_items).values({
          id: item.id,
          order_id: id,
          base_pizza_id: item.base_pizza_id,
          extra_toppings: item.extra_toppings
        });
      }
      res.status(201).json(newOrder[0]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  })

//list available timeslots
  router.get("/get_timeslots", async (req, res) => {

    //make an array of active shop time windows (eg. 17:00 - 21:00)
    //TODO where start time is gt now
    const workDays = await db
      .select()
      .from(work_days)
      .where(gt(work_days.start_time, new Date()));

    //get timeslots that are already booked as an array of UNIX times (eg. 17:10, 17:20)
    //TODO where orders.timeslot gt now
    const bookedSlots = (await db
      .select({timeslot: orders.timeslot})
      .from(orders)
      .where(gt(orders.timeslot, new Date())))
      .map(x => x.timeslot.getTime());

    //loop through time windows to build array of timeslots
    const allSlots: Date[] = [];
    for (const day of workDays) {
      const lowerBound = day.start_time;
      const upperBound = day.end_time;

      let currentTime = new Date(lowerBound);
      while (currentTime < upperBound) {
        allSlots.push(new Date(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + 10);
      }
    }

    //get remaining available timeslots (eg. 17:10, 17:20)
    const availableTimeSlots: Date[] = [];
    for (const slot of allSlots) {
      if (!bookedSlots.includes(slot.getTime())) {
        availableTimeSlots.push(slot);
      }
    }

    res.json(availableTimeSlots);
  })

  return router;
}