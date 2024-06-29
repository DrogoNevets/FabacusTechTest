import { Request, Response, NextFunction } from 'express';

export default (req : Request, res : Response, next : NextFunction) => {
  // do normal auth stuff here
  // not in brief and too time consuming for now

  next();
};