import { AlreadyExistsError } from './../errors/AlreadyExistsError';
import { MongoServerError } from 'mongodb';

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class UniqueValueInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Error> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof AlreadyExistsError) {
          error = new HttpException(error.message, HttpStatus.CONFLICT);
        }

        if (error instanceof MongoServerError) {
          const field = error.message.split('index: ');
          if (error.code.toString() === '11000') {
            error = new HttpException(field[1], HttpStatus.CONFLICT);
          }
        }

        throw error;
      }),
    );
  }
}
