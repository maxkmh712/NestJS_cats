import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


const options: SchemaOptions = {
  timestamps: true,
}

@Schema(options)
export class Product extends Document {


  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;


  @Prop({ required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;


  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  color: string;


  readonly readOnlyData: { name: string; color: string; price: number };
  // readonly comments: Comments[];
}

export const _ProductSchema = SchemaFactory.createForClass(Product);

_ProductSchema.virtual('readOnlyData').get(function (this: Product) {
  return {
    id: this.id,
    name: this.name,
    color: this.color,
    price: this.price,
  };
});

// _ProductSchema.virtual('comments', {
//   ref: 'comments',
//   localField: '_id',
//   foreignField: 'info',
// });
// _ProductSchema.set('toObject', {virtuals: true});
// _ProductSchema.set('toJSON', {virtuals: true})

export const ProductSchema = _ProductSchema;