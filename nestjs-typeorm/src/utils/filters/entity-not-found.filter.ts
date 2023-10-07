import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const message: string = (exception as EntityNotFoundError).message;
        const code: number = (exception as any).code;
        const customResponse = {
            status: HttpStatus.NOT_FOUND,
            message: message,
            code: code,
            timestamp: new Date().toISOString(),
        };

        response.status(customResponse.status).json(customResponse);
    }
}
