import express from 'express';
import parser from 'body-parser';
import event from './controllers/event';
import hold from './controllers/hold';

import { database, redis } from './services';

const app = express();
const port = process.env.PORT ?? 80;

app.use(parser.json());

app.use('/event', event);
app.use('/hold', hold);

app.listen(port, async () => {
  console.log(`app listening on: ${port}`);

  await database.test();
  await redis.test();
});