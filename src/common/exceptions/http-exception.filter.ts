import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // 실행환경에 대한 context
    const response = ctx.getResponse<Response>();
    // response를 가져오고
    const request = ctx.getRequest<Request>();
    // request도 가져온다
    const status = exception.getStatus();
    // exception 변수의 status 코드를 받아서 밑에 넣어줌
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    if (typeof error === 'string') {
      // 에러가 스트링일 경우
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      // 404 에러처럼 네스트 자체에서 발생시키는 에러는 여기서 이렇게 처리!
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error,
      })
    }

    // express에서 res.status(400).send({adsfadsf}) 이런식으로 보냈던 것!

  }
} 

// 미들웨어 - 컨트롤러 - 서비스 - exception