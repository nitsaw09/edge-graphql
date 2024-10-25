import { Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {

    const gqlHost = GqlArgumentsHost.create(host);

    let res: any = 'INTERNAL SERVER ERROR';
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      res = exception.getResponse();
      status = exception.getStatus();
    }
    this.logger.error(JSON.stringify(res));
    return exception;
  }
}