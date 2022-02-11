import { AlreadyExistsException } from '../errors/AlreadyExistsException';
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
        if (error instanceof AlreadyExistsException) {
          error = new HttpException(error.message, HttpStatus.CONFLICT);
        }

        throw error;
      }),
    );
  }
}
