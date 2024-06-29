import { database } from '../../services';

type RawBooking = {
  id : string;
  user_id : string;
  seat_count : number;
}

class Booking {
  id : string;
  userId : string;
  seatCount : number;

  constructor(raw : RawBooking) {
    if(!raw) {
      throw new Error('No booking details provided');
    }

    this.id = raw.id;
    this.userId = raw.user_id;
    this.seatCount = raw.seat_count;
  }

  static async fetchForEvent(eventId : string) {
    const query = {
      name: 'get-bookings-for-event',
      text: 'SELECT * FROM booking WHERE event_id = $1::uuid',
      values: [ eventId ],
      rowMode: 'object'
    };

    try {
      const res = database.query(query);

      const event = (await res).rows.map((booking) => new Booking(booking));

      return event;
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
}

Object.freeze(Booking);
export default Booking;