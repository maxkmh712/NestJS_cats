import { ArgumentMetadata, Injectable, PipeTransform, HttpException } from '@nestjs/common';
// 이 파일의 역할
// 무조건 정수형으로 걸러주는 역할

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    // console.log(value);
    if (value < 0) {
      throw new HttpException('value > 0', 400);
    }
    return value
  }
}