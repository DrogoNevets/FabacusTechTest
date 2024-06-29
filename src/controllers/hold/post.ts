import { Request, Response } from 'express';
import { redis } from '../../services';

type PostBody = {
  user_id : string;
  event_id : string;
  seat_count : number;
}

export default async (req : Request, res : Response) => {
  const body = req.body as PostBody ;

  if(!('event_id' in body)) {
    throw new Error('`event_id` property missing from body');
  }

  if(!('seat_count' in body)) {
    throw new Error('`seat_count` property missing from body');
  }

  if(!('user_id' in body)) {
    throw new Error('`seat_count` property missing from body');
  }

  try {
    await redis.setHold(body.user_id, body.event_id, body.seat_count);
  } catch(e) {
    console.error(e);
    return res.send(e).status(500).end();
  }

  res.send('heelo').end();
};