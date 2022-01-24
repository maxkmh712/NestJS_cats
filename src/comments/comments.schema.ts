import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose'

const options: SchemaOptions = {
  timestamps: true,
}

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 id! from comments.schema',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats' 
    // 참조할 테이블
  })
  @IsNotEmpty()
  author: Types.ObjectId;
  // 댓글을 쓴 사람


  @ApiProperty({
    description: '댓글 내용! from comments.schema',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;


  @ApiProperty({
    description: '좋아요 수!!',
  })
  @Prop({
    default: 0,
  })
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: '댓글을 누구한테 썼는지!',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats' 
    // 참조할 테이블
  })
  @IsNotEmpty()
  info: Types.ObjectId;
  // 누구한테 썼는지에 해당하는 부분 = 댓글을 받은 사람
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
// Comments라는 클래스를 스키마로 만들어주는것! 

