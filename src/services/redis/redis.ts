import { createClient } from 'redis';

class RedisService {
  private _client;
  private _holdDuration = process.env.HOLD_DURATION ?? '60';

  constructor() {
    this._client = createClient({
      url: `redis://:${process.env.REDIS_PASS ?? 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'}@${process.env.REDIS_HOST ?? 'localhost'}:${process.env.REDIS_PORT ?? 18081}/${process.env.REDIS_DB ?? 0}`
    });

    this._client.on('error', (err) => console.log('Redis Client Error', err));

    this.connect();
  }

  async connect() {
    try {
      await this._client.connect();
    } catch(e) {
      console.error(e);
    }
  }

  async getHoldCount(eventId : string) {
    const holds = await this._client.keys(`event-${eventId}:*`);
    const heldSeats = holds.map((hold) => {
      return this._client.sInter(hold);
    });

    const heldCount = (await Promise.all(heldSeats)).reduce((acc, hold) => {
      try {
        return acc + parseInt(hold?.at(0) ?? '0');
      } catch(e) {
        return acc;
      }
    }, 0);

    return heldCount;
  }

  async setHold(userId : string, eventId : string, seatCount : number) {
    await this._client.sAdd(this.generateHoldKey(userId, eventId), seatCount.toString());
    await this._client.expire(this.generateHoldKey(userId, eventId), parseInt(this._holdDuration));
  }

  private generateHoldKey(userId : string, eventId : string) {
    return `event-${eventId}:user-${userId}`;
  }

  async test() {
    try {
      await this._client.set('test', 'REDIS up and running');
      console.debug(await this._client.get('test'));
      await this._client.del('test');
    } catch(e) {
      console.error(e);
    }
  }
}

Object.freeze(RedisService);
export default new RedisService();
