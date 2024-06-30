import { Request, Response } from 'express';
import { Event } from '../../models';

type PostBody = {
  name : string;
  seat_count : number;
}

export default async (req : Request, res : Response) => {
  const body = req.body as PostBody ;

  if(!('name' in body)) {
    throw new Error('`name` property missing from body');
  }

  if(!('seat_count' in body)) {
    throw new Error('`seat_count` property missing from body');
  }

  try {
    console.log(await Event.create(body.name, body.seat_count).save());
  } catch(e) {
    console.error(e);
    return res.status(500).send(e).end();
  }

  return res.send('heelo').end();
};