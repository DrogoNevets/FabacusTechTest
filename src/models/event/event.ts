import { randomUUID } from 'crypto';
import { database } from '../../services';
import Booking from '../booking';

type RawEvent = {
  id : string;
  name : string;
  seat_count : number;
}

class Event {
  id : string;
  name : string;
  seatCount : number;
  bookings ?: Booking[];

  private constructor(raw ?: RawEvent) {
    if(!raw) {
      throw new Error('No event details given');
    }

    this.id = raw.id;
    this.name = raw.name;
    this.seatCount = raw.seat_count;
  }

  async getBookings() {
    this.bookings = await Booking.fetchForEvent(this.id!);
  }

  async save() {
    const query = {
      name: 'upsert-event',
      text: `
      INSERT INTO event (id, name, seat_count) VALUES ($1::uuid, $2::text, $3::integer)
      ON CONFLICT (id) DO UPDATE SET
        name = $2::text,
        seat_count = $3::integer
      RETURNING *
      `,
      values: [ this.id, this.name, this.seatCount ],
      rowMode: 'object'
    };

    const res = await database.query(query);

    return res.rows.at(0);
  }

  static create(name : string, seatCount : number) {
    return new Event({
      id: randomUUID(),
      seat_count: seatCount,
      name
    });
  }

  static async getById(id : string, includeBookings = false) {
    const query = {
      name: 'get-event',
      text: 'SELECT * FROM event WHERE id = $1::uuid',
      values: [ id ],
      rowMode: 'object'
    };

    try {
      const res = database.query(query);

      const event = new Event((await res).rows.at(0));

      if(includeBookings) {
        await event.getBookings();
      }

      return event;
    } catch(e) {
      console.error(e);
      throw e;
    }
  }

  static async getAll() {
    const query = {
      name: 'get-all-events',
      text: 'SELECT * FROM event',
      rowMode: 'object'
    };

    try {
      const res = database.query(query);

      const event = (await res).rows.map((event) => new Event(event));

      return event;
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
}

Object.freeze(Event);
export default Event;