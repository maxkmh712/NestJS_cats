import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Comments } from 'src/comments/comments.schema';

const options: SchemaOptions = {
  timestamps: true,
}

@Schema(options)
export class Cat extends Document {


  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;


  @Prop({ required: true })
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

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {

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