import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Document, SchemaOptions } from "mongoose";
import * as mongoose from 'mongoose';
import { Cat } from "src/cats/cats.schema";
import { Product } from "src/products/products.schema";


const options: SchemaOptions = {
  timestamps: true,
}

@Schema(options)
export class Like extends Document {

  @Prop({ 
    required: true,
    type: mongoose.Schema.Types.ObjectId, ref:'Cat'
  })
  @IsString()
  @IsNotEmpty()
  cat: Cat;
  catId: string;


  @Prop({ 
    required: true,
    type: mongoose.Schema.Types.ObjectId, ref:'Product'
  })
  @IsString()
  @IsNotEmpty()
  product: Product;
  productId: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

