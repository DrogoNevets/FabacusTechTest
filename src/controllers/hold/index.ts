import express from 'express';
import { authMiddleware } from '../../middleware';
import post from './post';
import get from './get';

console.debug('Registering hold controllers');

const holdRouter = express.Router();

console.debug('\thold\t\tPOST::/');
holdRouter.post('/', authMiddleware, post);
// holdRouter.get('/', authMiddleware, get);

export default holdRouter;