import { Request, Response } from 'express';
import { Event } from '../../models';
import { redis } from '../../services';

export default async (req : Request, res : Response) => {
  const { eventId } = req.params;
  
  try {
    let results;

    if(eventId) {
      const event = await Event.getById(eventId, true);

      const holds = await redis.getHoldCount(eventId);

      const retVal = {
        ...event,
        availableSeats: event.seatCount - (holds + (event.bookings ?? []).reduce((acc, booking) => {
          return acc + booking.seatCount;
        }, 0))
      };

      res.send(retVal).end();

      // results = {
      //   ...event,
      //   remainingSeats: event!.seat_count! - (await event!.bookings).reduce((acc, booking) => {
      //     return acc + booking!.seat_count;
      //   }, 0)
      // };
    } else {
      results = await Event.getAll();
    }

    return res.send(results).end();
  } catch(e) {
    console.error(e);
    return res.send(e).status(500).end();
  }

};