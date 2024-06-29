import express from 'express';
import { authMiddleware } from '../../middleware';
import post from './post';
import get from './get';

console.debug('Registering event controllers');

const eventRouter = express.Router();

console.debug('\tevent\t\tPOST:/');
eventRouter.post('/', authMiddleware, post);

console.debug('\tevent\t\tGET:/');
eventRouter.get('/', authMiddleware, get);

console.debug('\tevent\t\tGET:/:eventId');
eventRouter.get('/:eventId', authMiddleware, get);

export default eventRouter;