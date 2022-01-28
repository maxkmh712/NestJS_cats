import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
@Injectable()
export class QueryValidationPipe implements PipeTransform {
  transform(value: any) {
      const  { offset, limit } = value;

      if (offset < 0) throw new BadRequestException('offset Error! from query.validation.pipe')
      if (limit < 0) throw new BadRequestException('limit Error! from query.validation.pipe')
      return value
  }
}