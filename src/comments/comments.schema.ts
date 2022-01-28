import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
}

@Schema(options)
export class Comments extends Document {

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats' 
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @Prop({
    default: 0,
  })
  @IsPositive()
  likeCount: number;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats' 
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);

