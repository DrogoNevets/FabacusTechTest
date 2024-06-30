import express from 'express';
import { authMiddleware } from '../../middleware';
import post from './post';

console.debug('Registering hold controllers');

const holdRouter = express.Router();

console.debug('\thold\t\tPOST::/');
holdRouter.post('/', authMiddleware, post);

export default holdRouter;