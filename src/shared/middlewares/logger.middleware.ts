import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const date = new Date();
    const logger = `Registro log de acesso ${date.toLocaleString()}`;
    console.log(logger);
    next();
  }
}
