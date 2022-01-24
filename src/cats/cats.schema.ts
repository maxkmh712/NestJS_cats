import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Comments } from 'src/comments/comments.schema';

const options: SchemaOptions = {
  timestamps: true,
}

// npm i --save class-validator class-transformer 로 설치

@Schema(options)
//스키마 데코레이션을 통해서 모델링하는 것!
export class Cat extends Document {
  // Document를 상속받은 것
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string; 

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
  readonly comments: Comments[];
}

export const _CatSchema = SchemaFactory.createForClass(Cat);
// Cat이라는 클래스를 스키마로 만들어주기 => CatSchema 이게 실제 스키마

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  // 여기서 this 는 모델 Cat
  // 이 버츄얼을 통해서 데이터를 가공해준다고 생각하면 된다
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});
_CatSchema.set('toObject', {virtuals: true});
_CatSchema.set('toJSON', {virtuals: true})

export const CatSchema = _CatSchema;