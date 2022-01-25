import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
@Injectable()
export class QueryValidationPipe implements PipeTransform {
  transform(value: any) {
      const  { offset, limit } = value;
      // if (!isValidObjectId(category)) throw new BadRequestException('카테고리 파라미터 오류!! from query.validation.pipe')

      if (offset < 0) throw new BadRequestException('오프셋 오류! from query.validation.pipe')
      if (limit < 0) throw new BadRequestException('리밋 오류! from query.validation.pipe')
      return value
  }
}