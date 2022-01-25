import { isValidObjectId } from 'mongoose';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!isValidObjectId(value)) throw new BadRequestException('에러!!! from common.pipe.objectId.validation.pipe');
    return value
  }
}